# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Donos e gestores de pequenos e médios negócios da Baixada Santista (lojas de roupa, boutiques, padarias, cafés, restaurantes, perfumarias, clínicas, organizadores de eventos, igrejas, marcas locais). Chegam pela maior parte via anúncio pago regional, geralmente no celular, querendo saber rápido se a Chico Sacolas faz o tipo de sacola que precisam, em que quantidade, em quanto tempo, e como pedir um orçamento.

## Product Purpose
A Chico Sacolas produz sacolas personalizadas em serigrafia (kraft, ecobag, sacolas para eventos e linha premium com alça de corda). A landing page existe para capturar leads qualificados de orçamento. Sucesso = formulário de orçamento enviado (conversão principal) ou clique no WhatsApp (alternativa).

## Positioning
Serigrafia própria, feita no Guarujá, desde 1985, com pedido mínimo baixo (100 unidades) — acessível para o pequeno negócio local que quer embalagem com cara de marca, com atendimento direto e próximo.

## Operating Context
- Fluxo de pedido: contato (formulário ou WhatsApp) → orçamento com preço, prazo e sugestão de material em até 48h → aprovação da arte → produção em 7 a 15 dias úteis → entrega na Baixada Santista ou envio para todo o Brasil.
- Formulários enviam para `/api/orcamento` (Cloudflare Worker → e-mail via Resend). WhatsApp: +55 13 99764-6549.
- Endereço: Rua Projetada C, 24, Guarujá - SP, 11460-540. Horário publicado: seg a sex 9h–18h, sáb 9h–15h.
- Área atendida: Guarujá, Santos, São Vicente, Praia Grande, Cubatão, Bertioga, Mongaguá, Itanhaém, Peruíbe.

## Capabilities and Constraints
- Produtos: sacolas kraft personalizadas, ecobags, sacolas para eventos/brindes, sacolas premium com alça de corda; serigrafia de 1 a 4 cores, tintas à base de água ou plastisol curadas em alta temperatura.
- Pedido mínimo: 100 unidades (confirmado).
- Prazo de produção: 7 a 15 dias úteis após aprovação da arte (confirmado). Resposta ao orçamento: até 48h.
- Stack: Astro 6 estático, CSS puro, deploy em Cloudflare Workers. Todo conteúdo em português do Brasil.
- Rastreamento: GTM, GA4 e Meta Pixel; eventos `data-event`/`data-location` nos CTAs e formulários.
- Captura de lead: formulário curto (nome, WhatsApp, tipo de sacola, quantidade) é a ação principal; WhatsApp é a alternativa sempre visível.

## Brand Commitments
- Nome: Chico Sacolas. Logo existente em `public/images/logo-chico-sacolas.png` (sacola + quadro de serigrafia, "Personalizadas • Silk Screen").
- Voz: próxima, direta, local; profissional sem ser luxuosa.
- Existe desde 1985 (41 anos em 2026) — confirmado.

## Evidence on Hand
- Fatos confirmados: desde 1985, mínimo de 100 unidades, produção em 7 a 15 dias úteis.
- Fotos reais de trabalhos existem e serão enviadas pelo cliente; as fotos atuais em `src/assets/images/` são mockups e devem ser tratadas como provisórias.
- NÃO confirmados — não publicar: número de clientes ("500+"), depoimentos, avaliações, logos de clientes.

## Product Principles
1. Pedir orçamento tem de ser mais fácil do que pesquisar outro fornecedor: poucos campos, resposta prometida e cumprida.
2. Só publicar fatos confirmados; prova real vale mais do que adjetivo.
3. Mostrar o produto e o processo antes de falar da empresa.
4. Ser local de verdade: cidades, endereço e prazos concretos.
