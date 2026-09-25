/** Curated public portfolio. Keep this list short; VibeKit has its own catalog. */
export type PortfolioCategory =
  "sites" | "landing-pages" | "plataformas" | "lojas" | "ia" | "blogs";

export type PortfolioProject = {
  id: string;
  title: string;
  category: PortfolioCategory;
  categoryLabel: string;
  format: string;
  image: string;
  url?: string;
  homepage?: boolean;
  featured?: boolean;
  imagePosition?: string;
};

export const portfolioCategories: {
  id: PortfolioCategory;
  title: string;
  note: string;
}[] = [
  { id: "sites", title: "Sites", note: "Presença digital" },
  { id: "landing-pages", title: "Landing Pages", note: "Páginas de conversão" },
  { id: "plataformas", title: "Plataformas", note: "Produtos e sistemas" },
  { id: "lojas", title: "Lojas online", note: "E-commerce" },
  { id: "ia", title: "IA aplicada", note: "Experiências com IA" },
  { id: "blogs", title: "Blogs", note: "Projetos editoriais" },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "ag-labs-app",
    title: "AG LABS App",
    category: "ia",
    categoryLabel: "IA generativa",
    format: "Aplicativo web",
    image: "/images/app-aglabs-interface.webp",
    url: "https://aglabs.app.br/",
    homepage: true,
    featured: true,
  },
  {
    id: "viajeki",
    title: "Viajeki",
    category: "plataformas",
    categoryLabel: "Viagens e planejamento",
    format: "Aplicativo web",
    image: "/images/viajeki-home.webp",
    url: "https://viajeki.com.br/",
    homepage: true,
    featured: true,
  },
  {
    id: "members",
    title: "Members",
    category: "plataformas",
    categoryLabel: "Educação e criadores",
    format: "Plataforma web",
    image: "/images/members-home.webp",
    url: "https://members.ia.br/",
    homepage: true,
    featured: true,
  },
  {
    id: "ag-labs-app-lp",
    title: "AG LABS App — LP",
    category: "landing-pages",
    categoryLabel: "IA generativa",
    format: "Landing page",
    image: "/images/app-aglabs-landing.webp",
    url: "https://lp.aglabs.app.br/",
    homepage: true,
  },
  {
    id: "fonte-viva",
    title: "Fonte Viva",
    category: "blogs",
    categoryLabel: "Conteúdo cristão",
    format: "Blog editorial",
    image: "/images/fonte-viva-blog.webp",
    url: "https://systems-blog-cristao.jwjtxw.easypanel.host/",
  },
  {
    id: "ag-labs-blog",
    title: "Blog AG LABS",
    category: "blogs",
    categoryLabel: "IA e tecnologia",
    format: "Blog editorial",
    image: "/images/ag-labs-blog.webp",
    url: "https://aglabs.ia.br/blog/",
  },
  {
    id: "gabrielle-garcia",
    title: "Gabrielle Garcia",
    category: "landing-pages",
    categoryLabel: "Saúde e bem-estar",
    format: "Site profissional",
    image: "/images/lp-nutri.png",
    url: "https://gabinutri.com.br/",
  },
  {
    id: "barber-pro",
    title: "Barber Pro",
    category: "plataformas",
    categoryLabel: "Beleza e serviços",
    format: "Plataforma web",
    image: "/images/barber-pro.png",
    url: "https://barberias.com.br/",
  },
  {
    id: "ag-labs",
    title: "AG LABS",
    category: "sites",
    categoryLabel: "Tecnologia",
    format: "Site institucional",
    image: "/images/aglabs-insitucional.png",
    url: "https://aglabs.ia.br/",
  },
  {
    id: "ag-books",
    title: "AG Books",
    category: "lojas",
    categoryLabel: "Produtos digitais",
    format: "Loja online",
    image: "/images/agbooks-store-current.webp",
    // Public URL previously used by AGBooks did not resolve on 2026-09-24.
    // Restore a link after verifying the current public destination.
  },
];

export const homepageProjects = portfolioProjects.filter(
  (project) => project.homepage,
);

/** Mobile-first projects presented separately from the main work filters. */
export const portfolioBioProjects = [
  {
    title: "AG LABS",
    label: "Bio da marca",
    description: "Produtos, serviços e caminhos de contato em um só lugar.",
    image: "/images/bio-aglabs.webp",
    url: "https://bio.aglabs.ia.br/",
  },
  {
    title: "Antonio Garcia",
    label: "Bio pessoal",
    description: "Uma apresentação compacta entre tecnologia e música.",
    image: "/images/bio-antonio.webp",
    url: "https://bio.agmusic.ia.br/",
  },
];
