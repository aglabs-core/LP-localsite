# Curadoria do portfólio

O site principal mostra quatro trabalhos. A página `/portfolio` mostra uma seleção curta, organizada por Sites, Landing Pages, Plataformas, Lojas online, IA aplicada e Blogs. O catálogo VibeKit mantém seus próprios modelos e demonstrações; não copie todos para esta página.

As páginas de link na bio e a vitrine móvel ficam em um capítulo próprio no final do portfólio, apresentado em formato de celular. Edite `portfolioBioProjects` em `src/data/portfolio.ts` para atualizar os quatro exemplos sem duplicá-los no filtro de trabalhos. Descreva a vitrine de produtos como tal, pois ela tem busca e catálogo. O encerramento leva ao formulário de orçamento da página principal.

A arte de compartilhamento da home está em `public/opengraph.jpg`; sua composição editável está em `scripts/og-source.html`. Para gerar outra versão, copie o HTML temporariamente para `public/`, abra-o em 1280 × 720 e exporte a captura como JPEG. Os metadados OG e Twitter em `index.html` apontam para essa imagem.

## Para adicionar ou atualizar um trabalho

1. Confirme que há uma prévia ou demo que possa ser mostrada publicamente e que o link abre sem login. Se o endereço público não estiver disponível, deixe `url` sem valor; o card continua visível sem um link quebrado.
2. Escolha um nome, uma categoria e uma descrição de formato precisos. Um produto próprio não deve ser apresentado como trabalho de cliente, e uma imagem do catálogo da loja não deve representar sua hero.
3. Capture uma imagem atual da página em desktop, revise visualmente e salve em `public/images/` com um nome estável. Use WebP quando possível. Atualize `image` em `src/data/portfolio.ts`.
4. Adicione ou edite um único registro em `src/data/portfolio.ts`. O `id` é estável. `homepage: true` coloca o card entre os quatro destaques da página inicial; retire essa marca de outro item quando for trocar um destaque. A página completa lê o mesmo catálogo.
5. Revise o link, a imagem, os filtros e o layout no desktop e no celular. Se o projeto mudar visualmente, atualize a captura; não altere o histórico do produto só para combinar com uma imagem antiga.

Mantenha por volta de 8 a 12 trabalhos diversos na seleção pública. Priorize qualidade visual, funcionamento do link, variedade de área e relevância comercial. O app AG LABS e sua landing page são dois trabalhos distintos e devem ter capturas próprias. Ao entrar um trabalho melhor, substitua um menos representativo ou mova o exemplo para o catálogo de modelos. Os 69 demos listados em `LP-VibeKit-Templates/artifacts/vibekit-landing/src/pages/templates.tsx` têm destino próprio em `https://templates.aglabs.ia.br/`.

## Fontes de candidatos vistas nesta revisão

- `D:\projetos github` contém o projeto atual, AG LABS, Loja Labs, Builders Club e outros repositórios. Cada candidato precisa de revisão de publicação e permissão antes de entrar no portfólio.
- `C:\Users\antonio\Desktop\antonio garcia landingpage` contém AGBooks, Barber Pro, Gabi Nutri, LP-VibeKit-Templates e outros projetos.
- `AGBooks` usa tema claro no código local. A imagem `agbooks-store-current.webp` foi capturada do servidor local; a URL pública antiga `https://loja.agmusic.cloud/` não resolveu nesta revisão. Validar o destino antes de restaurar o link.
