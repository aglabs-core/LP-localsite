import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// The procedural silk shader is adapted from the component supplied for this page.
const SIMPLEX = /* glsl */ `
vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 mod289(vec4 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x){ return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`

const VERT = /* glsl */ `
${SIMPLEX}

uniform float uTime;
uniform float uAmp;
uniform float uFreq;

varying vec3  vWorld;
varying vec3  vNormal;
varying vec2  vUv;
varying float vH;

/**
 * One dominant low-frequency fold plus decaying detail. A textbook fbm gives
 * every octave similar visual weight, which reads as rough terrain; fabric is
 * a few long folds with fine creases riding on top.
 *
 * The x/y anisotropy is what makes it cloth rather than dunes — real folds run
 * in a direction, they do not form a lumpy field.
 */
float surface(vec2 xy, float t){
  vec2 q = xy * vec2(uFreq * 0.55, uFreq * 1.75);
  float h = snoise(vec3(q, t));
#if OCTAVES > 1
  h += 0.26 * snoise(vec3(q * 2.15 + 17.0, t * 1.35));
#endif
#if OCTAVES > 2
  h += 0.085 * snoise(vec3(q * 4.4 + 31.0, t * 1.9));
#endif
  return h;
}

void main(){
  vUv = uv;
  vec3 p = position;

  float t = uTime * 0.075;

  // Settle the near edge so the sheet meets the viewport cleanly instead of
  // clipping through the camera.
  float settle = smoothstep(0.0, 0.30, vUv.y);
  float amp = uAmp * settle;

  float h = surface(p.xy, t);
  p.z += h * amp;
  vH = h;

  // Finite-difference normal. Screen-space derivatives are cheaper but they
  // shade the flat triangle rather than the surface, which is exactly what
  // made the first pass look like faceted rock.
  float e = 0.18;
  float hx = surface(p.xy + vec2(e, 0.0), t) * amp;
  float hy = surface(p.xy + vec2(0.0, e), t) * amp;
  vec3 tx = vec3(e, 0.0, hx - h * amp);
  vec3 ty = vec3(0.0, e, hy - h * amp);
  vNormal = normalize(normalMatrix * normalize(cross(tx, ty)));

  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorld = world.xyz;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`

const FRAG = /* glsl */ `
uniform vec3  uA;
uniform vec3  uB;
uniform vec3  uC;
uniform vec3  uBg;
uniform float uTime;
uniform float uSheen;

varying vec3  vWorld;
varying vec3  vNormal;
varying vec2  vUv;
varying float vH;

vec3 ramp(float t){
  t = clamp(t, 0.0, 1.0);
  return t < 0.5 ? mix(uA, uB, t * 2.0) : mix(uB, uC, (t - 0.5) * 2.0);
}

void main(){
  vec3 n = normalize(vNormal);
  vec3 v = normalize(cameraPosition - vWorld);
  float ndv = abs(dot(n, v));

  float fres = pow(1.0 - ndv, 2.6);

  // Thin-film banding. Weighted toward view angle rather than height so the
  // hue sweeps in broad continuous bands along each fold — height-dominant
  // banding just speckles the noise back onto the surface.
  //
  // The 0.62 phase offset matters: fres sits near zero across most of a sheet
  // facing the camera, so without it the ramp parks on its middle stop and the
  // first colour never appears at all.
  float phase = fres * 1.35 + vH * 0.20 + uTime * 0.02 + 0.62;
  float band  = 0.5 + 0.5 * sin(6.2831 * phase);
  vec3 col = ramp(band);

  // Two lights at opposing rakes. One sheen line reads as plastic; the second,
  // dimmer and colder, is what suggests a fabric weave catching the room.
  vec3 l1 = normalize(vec3(0.30, 0.86, 0.42));
  vec3 l2 = normalize(vec3(-0.55, 0.42, 0.72));
  float s1 = pow(max(dot(reflect(-l1, n), v), 0.0), 52.0);
  float s2 = pow(max(dot(reflect(-l2, n), v), 0.0), 22.0);
  col += s1 * uSheen + s2 * uSheen * 0.30;

  // Diffuse wrap keeps the troughs from going flat black.
  float wrap = clamp(dot(n, l1) * 0.5 + 0.5, 0.0, 1.0);
  col *= 0.34 + 0.58 * wrap;

  // Distance haze — the far edge dissolves into the page instead of ending.
  float depth = smoothstep(-13.0, 1.0, vWorld.z);
  col = mix(uBg, col, depth);

  float edge = smoothstep(0.0, 0.16, vUv.y) * smoothstep(1.0, 0.72, vUv.y);
  float alpha = edge * depth;

  gl_FragColor = vec4(col, alpha);
  #include <colorspace_fragment>
}
`

type Quality = { segments: number; octaves: number; maxDpr: number; sheen: number };

function getQuality(): Quality {
  const mobile = window.innerWidth < 768;
  const restrained = navigator.hardwareConcurrency <= 4;
  if (mobile || restrained) return { segments: 92, octaves: 2, maxDpr: 1.2, sheen: 0.28 };
  if (window.innerWidth < 1440) return { segments: 144, octaves: 3, maxDpr: 1.4, sheen: 0.32 };
  return { segments: 192, octaves: 3, maxDpr: 1.5, sheen: 0.36 };
}

function Silk({ quality, reduced }: { quality: Quality; reduced: boolean }) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();
  const portrait = size.height > size.width;
  const uniforms = useMemo(() => ({
    uTime: { value: 3.5 },
    uAmp: { value: 0.68 },
    uFreq: { value: 0.16 },
    uSheen: { value: quality.sheen },
    uA: { value: new THREE.Color("#dce8ff") },
    uB: { value: new THREE.Color("#8fb2ff") },
    uC: { value: new THREE.Color("#2454e6") },
    uBg: { value: new THREE.Color("#ffffff") },
  }), [quality.sheen]);

  useFrame((_, delta) => {
    if (material.current && !reduced) {
      material.current.uniforms.uTime.value += Math.min(delta, 0.05);
    }
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={portrait ? [0, -2.35, -8.5] : [0, -1.85, -6]}
    >
      <planeGeometry args={[30, 22, quality.segments, quality.segments]} />
      <shaderMaterial
        ref={material}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        defines={{ OCTAVES: quality.octaves }}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function AuroraBackground() {
  const host = useRef<HTMLDivElement>(null);
  const [quality, setQuality] = useState(getQuality);
  const [visible, setVisible] = useState(true);
  const [supported] = useState(() => {
    try {
      const probe = document.createElement("canvas");
      return Boolean(probe.getContext("webgl2") || probe.getContext("webgl"));
    } catch {
      return false;
    }
  });
  const [reduced, setReduced] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setReduced(media.matches);
    const onResize = () => setQuality(getQuality());
    media.addEventListener("change", onMotionChange);
    window.addEventListener("resize", onResize);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "120px",
    });
    if (host.current) observer.observe(host.current);
    return () => {
      media.removeEventListener("change", onMotionChange);
      window.removeEventListener("resize", onResize);
      observer.disconnect();
    };
  }, []);

  if (!supported) return null;

  return (
    <div ref={host} className="hero-aurora" aria-hidden="true">
      <Canvas
        dpr={[1, quality.maxDpr]}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        camera={{ position: [0, 2.05, 3.4], fov: 40 }}
        frameloop={visible && !reduced ? "always" : "demand"}
      >
        <Silk quality={quality} reduced={reduced} />
      </Canvas>
    </div>
  );
}
