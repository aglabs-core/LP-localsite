import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { portfolioProjects } from "./src/data/portfolio";
import { portfolioMeta, portfolioSeo } from "./src/data/portfolio-seo";

// Crawlers and social previews need route metadata in the initial HTML.
function portfolioHtml(): Plugin {
  return {
    name: "portfolio-html",
    enforce: "post" as const,
    generateBundle(_options, bundle) {
      const index = bundle["index.html"];
      if (!index || index.type !== "asset" || typeof index.source !== "string") return;
      let html = index.source.replace(/<title>.*?<\/title>/s, `<title>${portfolioSeo.title}</title>`);
      for (const [key, content] of Object.entries(portfolioMeta)) {
        const attribute = key.startsWith("og:") ? "property" : "name";
        const pattern = new RegExp(`<meta\\s+${attribute}="${key}"\\s+content="[^"]*"\\s*\/?>`, "g");
        html = html.replace(pattern, `<meta ${attribute}="${key}" content="${content}" />`);
      }
      html = html.replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${portfolioSeo.url}" />`);
      html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: portfolioSeo.title,
        description: portfolioSeo.description,
        url: portfolioSeo.url,
        inLanguage: "pt-BR",
        image: portfolioSeo.image,
        isPartOf: { "@type": "WebSite", name: "AG LABS", url: "https://lp.aglabs.ia.br/" },
      };
      const projects = portfolioProjects.map((project) =>
        `<li>${project.url ? `<a href="${project.url}">${project.title}</a>` : project.title} — ${project.format}</li>`,
      ).join("");
      html = html.replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript><main><h1>Portfólio AG LABS</h1><p>${portfolioSeo.description}</p><ul>${projects}</ul><a href="/">Conheça a AG LABS</a></main></noscript>`);
      html = html.replace("</head>", `<script type="application/ld+json">${JSON.stringify(structuredData)}</script></head>`);
      this.emitFile({ type: "asset", fileName: "portfolio.html", source: html });
      this.emitFile({ type: "asset", fileName: "portfolio/index.html", source: html });
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), portfolioHtml()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
});
