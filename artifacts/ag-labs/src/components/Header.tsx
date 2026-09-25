import { useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function Brand() {
  return (
    <a href="/#inicio" className="brand" aria-label="AG LABS — início">
      <img src="/android-chrome-192x192.png" alt="" width="48" height="48" />
      <span>LABS</span>
    </a>
  );
}
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  return (
    <header
      className="site-header"
      id="inicio"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="header-inner section-shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#portfolio">Projetos</a>
          <a href="#processo">Como trabalhamos</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <a className="button button-small header-cta" href="#orcamento">
          Pedir orçamento <ArrowUpRight size={17} aria-hidden="true" />
        </a>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label="Navegação no celular"
        hidden={!menuOpen}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) setMenuOpen(false);
        }}
      >
        <a href="#portfolio">Projetos</a>
        <a href="#processo">Como trabalhamos</a>
        <a href="#faq">Dúvidas</a>
        <a href="#orcamento">
          Pedir orçamento <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
