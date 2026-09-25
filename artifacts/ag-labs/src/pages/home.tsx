import {
  ArrowDown,
  ArrowUpRight,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Quote } from "@/components/Quote";
import { Footer } from "@/components/Footer";
import { faqs } from "@/data/content";

const features = [
  {
    icon: "/images/benefits/responsive.webp",
    title: "Funciona em qualquer tela",
    text: "Navegação clara no celular, tablet e computador.",
  },
  {
    icon: "/images/benefits/brand-design.webp",
    title: "Design da sua marca",
    text: "Um visual criado para o seu negócio, sem cara de modelo pronto.",
  },
  {
    icon: "/images/benefits/search.webp",
    title: "Estrutura para o Google",
    text: "Páginas e conteúdos organizados para os buscadores.",
  },
  {
    icon: "/images/benefits/contact.webp",
    title: "Contato sem complicação",
    text: "WhatsApp e formulários fáceis de encontrar e usar.",
  },
  {
    icon: "/images/benefits/commerce.webp",
    title: "Sua loja online",
    text: "Catálogo, carrinho e pagamentos conforme sua operação.",
  },
  {
    icon: "/images/benefits/domain.webp",
    title: "Domínio e publicação",
    text: "Ajuda com endereço, hospedagem e lançamento.",
  },
  {
    icon: "/images/benefits/security.webp",
    title: "Segurança na conexão",
    text: "HTTPS e cuidado com formulários e integrações.",
  },
  {
    icon: "/images/benefits/support.webp",
    title: "Suporte para continuar",
    text: "Orientação na entrega e opções de manutenção.",
  },
];
const steps = [
  {
    title: "Conversa e orçamento",
    text: "Entendemos seu objetivo e enviamos uma proposta com as páginas, funcionalidades, investimento e prazo.",
  },
  {
    title: "Conteúdo e criação",
    text: "Reunimos os materiais e desenvolvemos o visual e a navegação para apresentar seu negócio.",
  },
  {
    title: "Prévia e aprovação",
    text: "Você navega pelo site, avalia o resultado e participa da rodada de ajustes prevista no escopo.",
  },
  {
    title: "Publicação e entrega",
    text: "Revisamos o funcionamento, publicamos após sua aprovação e orientamos o uso e os próximos passos.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Hero />
        <section
          className="services-section"
          id="solucoes"
          aria-labelledby="services-title"
        >
          <div className="section-shell">
            <div className="services-intro">
              <p className="eyebrow">01 / Uma presença que faz sentido</p>
              <h2 id="services-title">
                A primeira impressão
                <br />
                <span>precisa dizer algo.</span>
              </h2>
              <p>
                Mais que estar na internet: uma página que deixa claro o que
                você faz, mostra o valor do seu trabalho e facilita o próximo
                passo de quem chegou até você.
              </p>
            </div>
            <div className="services-layout">
              <figure className="service-visual">
                <div className="service-visual-stage">
                  <span className="service-visual-label">PROJETO REAL / 01</span>
                  <div className="service-browser">
                    <div className="service-browser-bar" aria-hidden="true">
                      <span />
                      <span />
                      <span />
                      <p>gabinutri.com.br</p>
                    </div>
                    <img
                      src="/images/lp-nutri.png"
                      alt="Projeto de site profissional desenvolvido para Gabrielle Garcia"
                      width="1912"
                      height="947"
                      loading="lazy"
                    />
                  </div>
                </div>
                <figcaption>
                  <strong>Gabrielle Garcia</strong>
                  <span>Site profissional · Saúde e bem-estar</span>
                </figcaption>
              </figure>
              <div className="services-copy">
                <p className="services-copy-kicker">O que muda na prática</p>
                <h3>
                  Design bonito é o começo. A experiência precisa trabalhar por
                  você.
                </h3>
                <div className="service-outcomes">
                  <div>
                    <span>01</span>
                    <div>
                      <h4>Entender em segundos</h4>
                      <p>Serviços, diferenciais e mensagem organizados para quem chega.</p>
                    </div>
                  </div>
                  <div>
                    <span>02</span>
                    <div>
                      <h4>Reconhecer a sua marca</h4>
                      <p>Visual e conteúdo criados para o seu negócio, sem cara de modelo pronto.</p>
                    </div>
                  </div>
                  <div>
                    <span>03</span>
                    <div>
                      <h4>Saber como avançar</h4>
                      <p>Contato, agendamento ou compra no lugar certo da jornada.</p>
                    </div>
                  </div>
                </div>
                <a className="services-link" href="#orcamento">
                  Vamos construir o seu{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section
          className="features-section section-shell"
          aria-labelledby="features-title"
        >
          <div className="center-heading">
            <p className="eyebrow">Visual, conteúdo e funcionamento</p>
            <h2 id="features-title">
              O que podemos fazer <span>pelo seu site</span>
            </h2>
            <p>
              Recursos que facilitam a vida de quem visita e de quem está à
              frente do negócio.
            </p>
          </div>
          <div className="features-grid">
            {features.map(({ icon, title, text }) => (
              <article className="feature" key={title}>
                <div className="feature-icon">
                  <img src={icon} alt="" width="256" height="256" loading="lazy" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="features-action">
            <p>
              As funcionalidades e os serviços são definidos na proposta do seu
              projeto.
            </p>
            <a className="button" href="#orcamento">
              Montar meu projeto <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
        <section
          className="process-section"
          id="processo"
          aria-labelledby="process-title"
        >
          <div className="section-shell">
            <div className="center-heading">
              <p className="eyebrow">Você participa de cada etapa</p>
              <h2 id="process-title">
                Como funciona a <span>criação do seu site</span>
              </h2>
              <p>
                Do primeiro contato até a publicação, você sabe o que vem a
                seguir.
              </p>
            </div>
            <ol className="process-grid">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="step-number">0{index + 1}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
            <div className="scope-note">
              <div>
                <h3>Cada projeto tem o seu investimento.</h3>
                <p>
                  Quantidade de páginas, conteúdo e integrações fazem diferença.
                  Por isso, a proposta é feita para o que você precisa
                  construir.
                </p>
              </div>
              <a className="text-link" href="#orcamento">
                Pedir um orçamento <ArrowUpRight size={19} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <Portfolio />
        <section className="agency-section" aria-labelledby="agency-title">
          <div className="section-shell agency-layout">
            <div className="agency-copy">
              <p className="eyebrow">Conheça a AG LABS</p>
              <h2 id="agency-title">
                Experiência em sites.
                <br />
                <span>Visão de negócio.</span>
              </h2>
              <p>
                Desenvolvemos sites, aplicações e automações. Também criamos
                nossos próprios produtos digitais, lidando com os desafios de
                colocar uma ideia no ar e fazê-la funcionar no dia a dia.
              </p>
              <p>
                Essa experiência entra no seu projeto: da apresentação da
                empresa às integrações que conectam o site à operação.
              </p>
              <a
                className="text-link"
                href="https://aglabs.ia.br/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Saiba mais sobre a AG LABS{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="agency-capabilities">
              <article>
                <span>01</span>
                <div>
                  <h3>Design e desenvolvimento</h3>
                  <p>Conteúdo, interface e tecnologia trabalhando juntos.</p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Integrações e automações</h3>
                  <p>Conexões com as ferramentas que a sua empresa usa.</p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Evolução do projeto</h3>
                  <p>Novas páginas e recursos conforme o negócio cresce.</p>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section
          className="faq-section section-shell"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="center-heading">
            <p className="eyebrow">Antes de contratar</p>
            <h2 id="faq-title">
              Perguntas <span>frequentes</span>
            </h2>
            <p>
              Entenda como planejamos, desenvolvemos e entregamos seu projeto.
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <ArrowDown size={18} aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <Quote />
      </main>
      <Footer />
    </>
  );
}
