import { type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "@/data/content";
export function Quote() {
  function requestQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const business = String(data.get("business") ?? "").trim();
    const businessInput = form.elements.namedItem(
      "business",
    ) as HTMLInputElement;
    if (!business) {
      businessInput.setCustomValidity("Conte o nome do seu negócio.");
      businessInput.reportValidity();
      return;
    }
    const idea = String(data.get("idea") ?? "").trim();
    const message = [
      "Olá, AG LABS! Quero um orçamento para meu projeto.",
      `Negócio: ${business}`,
      `O que preciso: ${data.get("project")}`,
      ...(idea ? [`Sobre o projeto: ${idea}`] : []),
    ].join("\n\n");
    window.location.assign(
      `${whatsappUrl}?text=${encodeURIComponent(message)}`,
    );
  }
  return (
    <section
      className="quote-section"
      id="orcamento"
      aria-labelledby="quote-title"
    >
      <div className="section-shell quote-layout">
        <div className="quote-copy">
          <p className="eyebrow">Vamos tirar sua ideia do papel</p>
          <h2 id="quote-title">
            Vamos falar sobre
            <br />
            <em>o seu projeto?</em>
          </h2>
          <p>
            Conte o que você tem em mente. A gente entende o cenário e prepara
            um orçamento para o que o seu negócio realmente precisa.
          </p>
          <div className="quote-note">
            <span>Escopo definido com clareza.</span>
            <span>Prazo e investimento apresentados antes de começar.</span>
          </div>
        </div>
        <form className="quote-form" onSubmit={requestQuote}>
          <h3>Peça um orçamento rápido</h3>
          <p>Um breve resumo já ajuda a começar.</p>
          <label htmlFor="business">Qual é o seu negócio?</label>
          <input
            id="business"
            name="business"
            placeholder="Nome da empresa ou da sua marca"
            autoComplete="organization"
            required
            maxLength={120}
            onInput={(event) => event.currentTarget.setCustomValidity("")}
          />
          <label htmlFor="project">O que você precisa?</label>
          <select id="project" name="project" defaultValue="" required>
            <option value="" disabled>
              Selecione o tipo de projeto
            </option>
            <option>Um novo site</option>
            <option>Renovar meu site</option>
            <option>Uma landing page</option>
            <option>Uma loja online</option>
            <option>Um projeto sob medida</option>
            <option>Ainda preciso de orientação</option>
          </select>
          <label htmlFor="idea">
            Conte um pouco da sua ideia <span>(opcional)</span>
          </label>
          <textarea
            id="idea"
            name="idea"
            placeholder="Seu objetivo, uma referência ou o que precisa melhorar."
            rows={3}
            maxLength={1200}
          />
          <button className="button" type="submit">
            Continuar no WhatsApp <ArrowUpRight size={19} aria-hidden="true" />
          </button>
          <p className="form-note">
            Você revisa e envia a mensagem no WhatsApp.
            <br />O orçamento é preparado após a conversa.
          </p>
        </form>
      </div>
    </section>
  );
}
