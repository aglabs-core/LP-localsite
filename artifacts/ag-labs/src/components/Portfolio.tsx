import { ArrowUpRight } from "lucide-react";
import { homepageProjects, type PortfolioProject } from "@/data/portfolio";

function ProjectCard({ project }: { project: PortfolioProject }) {
  const content = (
    <>
      <div className="project-image">
        <img
          src={project.image}
          alt={`Prévia de ${project.title}`}
          loading="lazy"
          decoding="async"
          width="1920"
          height="950"
          style={{ objectPosition: project.imagePosition ?? "top" }}
        />
        {project.url ? (
          <span className="project-arrow">
            <ArrowUpRight size={23} aria-hidden="true" />
          </span>
        ) : null}
      </div>
      <div className="project-meta">
        <div>
          <p>{project.categoryLabel}</p>
          <h3>{project.title}</h3>
        </div>
        <span>{project.format}</span>
      </div>
    </>
  );

  return (
    <article className="project">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Ver projeto ${project.title}, em nova aba`}
        >
          {content}
        </a>
      ) : (
        <div>{content}</div>
      )}
    </article>
  );
}

export function Portfolio() {
  return (
    <section
      className="portfolio-section"
      id="portfolio"
      aria-labelledby="portfolio-title"
    >
      <div className="section-shell">
        <div className="center-heading">
          <p className="eyebrow">Conheça nosso trabalho</p>
          <h2 id="portfolio-title">
            Projetos que <span>saíram do papel</span>
          </h2>
          <p>
            Aplicativos, plataformas e páginas que mostram diferentes formas de
            transformar uma ideia em experiência digital.
          </p>
        </div>
        <div className="project-grid">
          {homepageProjects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))}
        </div>
        <a className="portfolio-more-link" href="/portfolio">
          Ver mais projetos <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
