import { lazy, Suspense } from "react";
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
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Suspense fallback={null}>
        <AuroraBackground />
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
