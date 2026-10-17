import { ArrowUpRight } from "lucide-react";
import { ProjectStack } from "@/components/ProjectStack";
import { homepageProjects } from "@/data/portfolio";

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
        <ProjectStack projects={homepageProjects} />
        <a className="portfolio-more-link" href="/portfolio">
          Ver mais projetos <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
