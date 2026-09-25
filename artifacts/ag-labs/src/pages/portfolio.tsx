import { useEffect, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUpRight, Search } from "lucide-react";
import {
  portfolioBioProjects,
  portfolioCategories,
  portfolioProjects,
  type PortfolioCategory,
  type PortfolioProject,
} from "@/data/portfolio";
import "./portfolio.css";

const corners = [
  "top-left",
  "top-middle",
  "top-right",
  "middle-left",
  "middle-right",
  "bottom-left",
  "bottom-middle",
  "bottom-right",
];

type SelectionFrameProps = { children: React.ReactNode; className?: string };
function SelectionFrame({ children, className = "" }: SelectionFrameProps) {
  return (
    <div className={`selection-frame ${className}`}>
      {corners.map((corner) => (
        <i
          key={corner}
          className={`selection-handle ${corner}`}
          aria-hidden="true"
        />
      ))}
      {children}
    </div>
  );
}

function WorkCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const content = (
    <>
      <div className="pf-project-image">
        <img
          src={project.image}
          alt={`Prévia do projeto ${project.title}`}
          loading="lazy"
          decoding="async"
          width="1920"
          height="950"
          style={{ objectPosition: project.imagePosition ?? "top" }}
        />
        <span>0{index + 1}</span>
      </div>
      <div className="pf-project-caption">
        <div>
          <p>
            {project.categoryLabel} / {project.format}
          </p>
          <h3>{project.title}</h3>
        </div>
        {project.url ? <ArrowUpRight size={20} aria-hidden="true" /> : null}
      </div>
    </>
  );
  return (
    <article className="pf-project">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Abrir projeto ${project.title}, em nova aba`}
        >
          {content}
        </a>
      ) : (
        <div>{content}</div>
      )}
    </article>
  );
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<
    PortfolioCategory | "todos"
  >("todos");
  const [searchQuery, setSearchQuery] = useState("");
  const categoryProjects =
    activeCategory === "todos"
      ? portfolioProjects
      : portfolioProjects.filter(
          (project) => project.category === activeCategory,
        );
  const normalizedQuery = searchQuery
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
  const visibleProjects = normalizedQuery
    ? categoryProjects.filter((project) =>
        [project.title, project.category, project.categoryLabel, project.format]
          .join(" ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase()
          .includes(normalizedQuery),
      )
    : categoryProjects;

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    const previousDescription = description?.content;
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const previousCanonical = canonical?.href;
    document.title = "Portfólio de sites e projetos — AG LABS";
    if (description)
      description.content =
        "Explore aplicativos, landing pages, plataformas, blogs e sites desenvolvidos pela AG LABS.";
    if (canonical) canonical.href = "https://lp.aglabs.ia.br/portfolio";
    return () => {
      document.title = previousTitle;
      if (description && previousDescription)
        description.content = previousDescription;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, []);

  return (
    <div className="portfolio-page">
      <a className="skip-link" href="#portfolio-intro">
        Pular para o conteúdo
      </a>
      <main>
        <section
          className="pf-opening pf-noise-dark"
          aria-labelledby="portfolio-page-title"
        >
          <div className="pf-opening-inner">
            <a href="/" className="pf-back">
              <ArrowLeft size={17} aria-hidden="true" /> AG LABS <span>/</span>{" "}
              Portfólio
            </a>
            <SelectionFrame className="pf-title-frame">
              <p className="pf-overline">Design &amp; desenvolvimento web</p>
              <h1 id="portfolio-page-title" aria-label="Portfólio">
                <span aria-hidden="true">Portf</span>
                <span className="pf-globe" aria-hidden="true">
                  <img src="/images/hands-globe.webp" alt="" />
                </span>
                <span aria-hidden="true">lio</span>
              </h1>
              <span className="pf-signature">AG LABS</span>
            </SelectionFrame>
            <form
              className="pf-search-bar"
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                document.getElementById("trabalhos")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              <Search size={17} aria-hidden="true" />
              <input
                type="search"
                aria-label="Buscar projetos"
                placeholder="Uma coleção de projetos com identidade..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <span className="pf-search-caret" aria-hidden="true" />
              <button type="submit">
                Buscar <ArrowUpRight size={16} aria-hidden="true" />
              </button>
            </form>
            <a
              href="#portfolio-intro"
              className="pf-scroll"
              aria-label="Ir para a apresentação"
            >
              <ArrowDown size={19} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="pf-about pf-paper"
          id="portfolio-intro"
          aria-labelledby="pf-about-title"
        >
          <div className="pf-about-inner">
            <div className="pf-about-copy">
              <p className="pf-section-label">01 / QUEM CRIA</p>
              <h2 id="pf-about-title">
                Olá<span>!</span>
              </h2>
              <p className="pf-person">
                Eu sou Antonio Garcia. <span>fundador da AG LABS</span>
              </p>
              <p className="pf-intro-strong">
                Ideias claras, design com identidade e tecnologia feita para
                funcionar.
              </p>
              <p className="pf-intro-text">
                Crio experiências digitais que ajudam marcas a mostrar o que
                fazem de um jeito próprio. Aqui você encontra sites, sistemas,
                produtos e experimentos feitos em diferentes momentos do meu
                trabalho.
              </p>
              <p className="pf-intro-text">
                Cada projeto começa com uma pergunta: o que precisa mudar para a
                experiência fazer sentido para quem usa?
              </p>
              <a href="#indice" className="pf-inline-link">
                Veja o que tem por aqui{" "}
                <ArrowDown size={17} aria-hidden="true" />
              </a>
            </div>
            <img
              className="pf-portrait"
              src="/images/antonio-pencil-portrait.webp"
              alt="Ilustração a lápis de Antonio Garcia, criada a partir de uma foto dele"
              width="1774"
              height="887"
              fetchPriority="high"
            />
            <span className="pf-photo-note" aria-hidden="true">
              feito com intenção.
            </span>
          </div>
        </section>

        <section
          className="pf-contents pf-paper"
          id="indice"
          aria-labelledby="pf-contents-title"
        >
          <div className="pf-contents-inner">
            <p className="pf-handwriting pf-contents-kicker">Table of</p>
            <h2 id="pf-contents-title">
              Contents<span>.</span>
            </h2>
            <SelectionFrame className="pf-contents-frame">
              <div className="pf-contents-grid">
                {portfolioCategories.map((category, index) => (
                  <a
                    href="#trabalhos"
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="pf-contents-item"
                  >
                    <span className="pf-contents-number">0{index + 1}</span>
                    <span className="pf-contents-name">{category.title}</span>
                    <span className="pf-contents-note">{category.note}</span>
                  </a>
                ))}
              </div>
            </SelectionFrame>
          </div>
        </section>

        <section
          className="pf-folio pf-noise-dark"
          aria-labelledby="pf-folio-title"
        >
          <div className="pf-folio-inner">
            <p className="pf-section-label">02 / TRABALHOS SELECIONADOS</p>
            <SelectionFrame className="pf-folio-frame">
              <h2 id="pf-folio-title">
                Web <span>Folio</span>
              </h2>
            </SelectionFrame>
            <p>
              Uma seleção de projetos criados para diferentes marcas, ideias e
              necessidades.
            </p>
            <a href="#trabalhos" className="pf-folio-scroll">
              Explorar os projetos <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="pf-work pf-paper"
          id="trabalhos"
          aria-labelledby="pf-work-title"
        >
          <div className="pf-work-inner">
            <p className="pf-section-label">03 / SELEÇÃO</p>
            <div className="pf-work-heading">
              <h2 id="pf-work-title">
                Projetos que falam por si<span>.</span>
              </h2>
              <p>
                Uma curadoria do que criamos. Novos projetos entram aqui
                conforme ficam prontos para mostrar.
              </p>
            </div>
            <div
              className="pf-filters"
              role="group"
              aria-label="Filtrar projetos"
            >
              <button
                type="button"
                className={activeCategory === "todos" ? "active" : ""}
                aria-pressed={activeCategory === "todos"}
                onClick={() => setActiveCategory("todos")}
              >
                Todos <span>{portfolioProjects.length}</span>
              </button>
              {portfolioCategories.map((category) => (
                <button
                  type="button"
                  key={category.id}
                  className={activeCategory === category.id ? "active" : ""}
                  aria-pressed={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.title}
                </button>
              ))}
            </div>
            {visibleProjects.length ? (
              <div className="pf-project-grid" aria-live="polite">
                {visibleProjects.map((project, index) => (
                  <WorkCard project={project} index={index} key={project.id} />
                ))}
              </div>
            ) : (
              <p className="pf-empty" role="status">
                Nenhum projeto encontrado. Tente outra busca ou categoria.
              </p>
            )}
            <div className="pf-templates-link">
              <p>
                Procurando mais ideias de visual? O catálogo VibeKit reúne os
                nossos modelos e experimentos de site.
              </p>
              <a
                href="https://templates.aglabs.ia.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Explorar os templates{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className="pf-bios pf-paper"
          id="links-na-bio"
          aria-labelledby="pf-bios-title"
        >
          <div className="pf-bios-inner">
            <div className="pf-bios-copy">
              <p className="pf-section-label">04 / LINKS NA BIO</p>
              <h2 id="pf-bios-title">
                Pequenas páginas.
                <br />
                <span>Conexões diretas.</span>
              </h2>
              <p>
                Um cartão de visita digital reúne os destinos importantes da
                marca em uma página feita para o celular. Dois projetos, duas
                identidades e um caminho claro para quem chega pelas redes.
              </p>
              <a className="pf-inline-link" href="/#orcamento">
                Quero uma página assim
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="pf-bios-showcase">
              {portfolioBioProjects.map((project) => (
                <a
                  className="pf-bio-card"
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${project.label} de ${project.title}, em nova aba`}
                  key={project.url}
                >
                  <div className="pf-bio-device">
                    <img
                      src={project.image}
                      alt={`Prévia da página ${project.label.toLowerCase()} de ${project.title}`}
                      width="375"
                      height="844"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pf-bio-caption">
                    <span>
                      <strong>{project.title}</strong>
                      <small>{project.label}</small>
                    </span>
                    <ArrowUpRight size={19} aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          className="pf-closing pf-noise-dark"
          aria-labelledby="pf-closing-title"
        >
          <div className="pf-closing-inner">
            <div className="pf-closing-note" aria-hidden="true">
              <span>o próximo pode ser seu</span>
              <svg viewBox="0 0 110 88" fill="none">
                <path d="M100 4C51 8 14 39 19 67c2 11 16 15 31 7" />
                <path d="m36 57 14 17-20 6" />
              </svg>
            </div>
            <SelectionFrame className="pf-closing-frame">
              <span className="pf-closing-cube pf-closing-cube--top" aria-hidden="true" />
              <h2 id="pf-closing-title">Vamos criar juntos?</h2>
              <span className="pf-closing-cube pf-closing-cube--bottom" aria-hidden="true" />
            </SelectionFrame>
            <p>
              Um site, uma landing page ou uma experiência sob medida. Conte o
              que você precisa e vamos encontrar a melhor forma de construir.
            </p>
            <a className="pf-closing-action" href="/#orcamento">
              Pedir um orçamento <ArrowUpRight size={20} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <footer className="pf-footer">
        <div>
          <a href="/">AG LABS</a>
          <span>Portfólio · Rio Verde, GO</span>
        </div>
        <a href="/">
          Voltar ao site <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
