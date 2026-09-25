import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/Header";
import { whatsappUrl } from "@/data/content";
export function Footer() {
  return (
    <footer className="site-footer section-shell">
      <div className="footer-main">
        <div>
          <Brand />
          <p>Design e tecnologia para o seu próximo passo.</p>
        </div>
        <nav aria-label="Links do rodapé">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            WhatsApp <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            href="https://www.instagram.com/ag_labs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <a
            href="https://aglabs.ia.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conheça a AG LABS <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} AG LABS. Todos os direitos reservados.
        </p>
        <p>Rio Verde, GO · Projetos para todo o Brasil.</p>
      </div>
    </footer>
  );
}
