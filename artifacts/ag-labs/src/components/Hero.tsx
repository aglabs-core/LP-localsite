import { lazy, Suspense, useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";

const AuroraBackground = lazy(() => import("@/components/AuroraBackground"));

const featuredProjects = ["ag-labs-app", "viajeki", "members"]
  .map((id) => portfolioProjects.find((project) => project.id === id))
  .filter(
    (project): project is PortfolioProject =>
      Boolean(project?.featured && project.url),
  );

export function Hero() {
  const [showAurora, setShowAurora] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 761px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;

    const syncAurora = () => {
      if (timer) clearTimeout(timer);
      if (!desktop.matches || motion.matches) {
        setShowAurora(false);
        return;
      }
      if (document.readyState !== "complete") return;
      timer = setTimeout(() => setShowAurora(true), 2500);
    };
    if (document.readyState === "complete") syncAurora();
    else window.addEventListener("load", syncAurora, { once: true });
    desktop.addEventListener("change", syncAurora);
    motion.addEventListener("change", syncAurora);

    return () => {
      window.removeEventListener("load", syncAurora);
      desktop.removeEventListener("change", syncAurora);
      motion.removeEventListener("change", syncAurora);
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <Suspense fallback={null}>
        {showAurora && <AuroraBackground />}
      </Suspense>
      <div className="hero-copy section-shell">
        <p className="eyebrow">Design e desenvolvimento web</p>
        <h1 id="hero-title">
          Um site à altura
          <br />
          <span>do seu negócio.</span>
        </h1>
        <p className="hero-description">
          Design que representa sua marca. Uma experiência que aproxima
          clientes. Seu próximo site começa aqui.
        </p>
        <div className="hero-actions">
          <a href="#orcamento" className="button">
            Faça um orçamento rápido{" "}
            <ArrowUpRight size={19} aria-hidden="true" />
          </a>
          <a href="#portfolio" className="text-link">
            Conheça nosso trabalho <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <p className="hero-note">
          Projetos sob medida. Do primeiro esboço à publicação.
        </p>
      </div>
      <div
        className="hero-showcase section-shell"
        aria-label="Projetos em destaque"
      >
        {featuredProjects.map((project, index) => (
          <a
            className="hero-case"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar ${project.title}, em nova aba`}
            key={project.title}
          >
            <figure>
              <div className="hero-case-image">
                <img
                  src={project.image}
                  alt={`Prévia de ${project.title}`}
                  width="1920"
                  height="950"
                  fetchPriority={index === 1 ? "high" : "auto"}
                />
              </div>
              <figcaption>
                <span>
                  {project.title}
                  <small>{project.format}</small>
                </span>
                <ArrowUpRight size={18} aria-hidden="true" />
              </figcaption>
            </figure>
          </a>
        ))}
      </div>
    </section>
  );
}
