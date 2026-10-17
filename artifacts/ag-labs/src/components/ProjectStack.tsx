import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioProject } from "@/data/portfolio";

function ProjectCard({ project }: { project: PortfolioProject }) {
  const content = (
    <>
      <img
        src={project.image}
        alt={`Prévia de ${project.title}`}
        loading="lazy"
        decoding="async"
        width="1920"
        height="950"
        style={{ objectPosition: project.imagePosition ?? "top" }}
      />
      <div className="stack-overlay">
        <div>
          <p>
            {project.categoryLabel} · {project.format}
          </p>
          <h3>{project.title}</h3>
        </div>
        {project.url ? (
          <span className="project-arrow">
            <ArrowUpRight size={21} aria-hidden="true" />
          </span>
        ) : null}
      </div>
    </>
  );

  return project.url ? (
    <a
      className="stack-card"
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver projeto ${project.title}, em nova aba`}
    >
      {content}
    </a>
  ) : (
    <div className="stack-card">{content}</div>
  );
}

function StackRow({
  i,
  projects,
  progress,
  range,
  targetScale,
}: {
  i: number;
  projects: PortfolioProject[];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}) {
  const reduceMotion = useReducedMotion();
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="stack-row" style={{ top: `calc(90px + ${i * 18}px)` }}>
      <motion.div
        className="stack-row-inner"
        style={{ scale: reduceMotion ? 1 : scale }}
      >
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </motion.div>
    </div>
  );
}

/** Two-column rows that stick and shrink as the next row scrolls over them. */
export function ProjectStack({ projects }: { projects: PortfolioProject[] }) {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });
  const rows: PortfolioProject[][] = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }

  return (
    <div
      className={`project-stack${rows.length > 1 ? " is-stacked" : ""}`}
      ref={stackRef}
    >
      {rows.map((row, i) => (
        <StackRow
          key={row[0].id}
          i={i}
          projects={row}
          progress={scrollYProgress}
          range={[i / rows.length, 1]}
          targetScale={Math.max(0.8, 1 - (rows.length - i - 1) * 0.05)}
        />
      ))}
    </div>
  );
}
