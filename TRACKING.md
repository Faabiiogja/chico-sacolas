# Tracking & Schema — Chico Sacolas

Referência completa do sistema de rastreamento e dados estruturados da landing page.
Usar este arquivo ao integrar Claude com Google Ads, Meta Ads ou qualquer ferramenta de analytics.

---

## 1. Arquivo de configuração central

**`src/config/company.ts`** — edite aqui para atualizar todos os schemas de uma vez.

```ts
export const COMPANY = {
  name: 'Chico Sacolas',
  description: 'Sacolas personalizadas para lojas, eventos e empresas.',
  telephone: 'INSERIR_TELEFONE',       // "+55-13-99764-6549"
  email: 'oi@chicosacolas.com',
  url: 'INSERIR_URL',                  // "https://chicosacolas.com.br"
  address: {
    streetAddress: 'INSERIR_ENDERECO',
    addressLocality: 'Guarujá',
    addressRegion: 'SP',
    postalCode: 'INSERIR_CEP',
    addressCountry: 'BR',
  },
  areaServed: ['Guarujá', 'Santos', 'Baixada Santista'],
  sameAs: ['INSERIR_INSTAGRAM', 'INSERIR_WHATSAPP'],
  logo: 'INSERIR_URL/logo.png',
};

export const GTM_ID       = 'INSERIR_GTM_ID';    // "GTM-XXXXXXX"
export const GA4_ID       = 'INSERIR_GA4_ID';    // "G-XXXXXXXXXX"
export const META_PIXEL_ID = 'INSERIR_PIXEL_ID'; // "1234567890"
```

Os schemas JSON-LD e o snippet do GTM são gerados automaticamente a partir desses valores.

---

## 2. Dados estruturados (JSON-LD)

Componente: **`src/components/StructuredData.astro`**
Incluído em: `src/layouts/Layout.astro` → `<head>`

### 2.1 LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Chico Sacolas",
  "description": "Sacolas personalizadas para lojas, eventos e empresas.",
  "telephone": "<COMPANY.telephone>",
  "email": "<COMPANY.email>",
  "url": "<COMPANY.url>",
  "logo": "<COMPANY.logo>",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "<COMPANY.address.streetAddress>",
    "addressLocality": "Guarujá",
    "addressRegion": "SP",
    "postalCode": "<COMPANY.address.postalCode>",
    "addressCountry": "BR"
  },
  "areaServed": [
    { "@type": "City", "name": "Guarujá" },
    { "@type": "City", "name": "Santos" },
    { "@type": "City", "name": "Baixada Santista" }
  ],
  "sameAs": ["<COMPANY.sameAs>"]
}
```

### 2.2 Organization

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Chico Sacolas",
  "url": "<COMPANY.url>",
  "logo": "<COMPANY.logo>",
  "email": "<COMPANY.email>",
  "telephone": "<COMPANY.telephone>",
  "address": { "...igual ao LocalBusiness..." },
  "sameAs": ["<COMPANY.sameAs>"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "<COMPANY.telephone>",
    "contactType": "customer service",
    "areaServed": "BR",
    "availableLanguage": "Portuguese"
  }
}
```

### 2.3 Service

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Sacolas Personalizadas com Serigrafia",
  "provider": { "@type": "LocalBusiness", "name": "Chico Sacolas" },
  "description": "Sacolas personalizadas para lojas, eventos e empresas.",
  "areaServed": ["Guarujá", "Santos", "Baixada Santista"],
  "serviceType": "Serigrafia em Sacolas Personalizadas",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Sacolas Personalizadas",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Sacolas kraft personalizadas" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Ecobags personalizadas" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Sacolas para eventos" } },
      { "@type": "Offer", "itemOffered": { "@type": "Product", "name": "Sacolas com logo" } }
    ]
  }
}
```

### 2.4 FAQPage

Edite as perguntas e respostas em `COMPANY` → array `FAQ` em `src/config/company.ts`.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Qual é o pedido mínimo de sacolas personalizadas?",
      "acceptedAnswer": { "@type": "Answer", "text": "A partir de 100 unidades." }
    },
    {
      "@type": "Question",
      "name": "Quais tipos de sacola personalizada vocês produzem?",
      "acceptedAnswer": { "@type": "Answer", "text": "Papel kraft, ecobags, promocionais e formatos especiais." }
    },
    {
      "@type": "Question",
      "name": "Qual o prazo de produção?",
      "acceptedAnswer": { "@type": "Answer", "text": "7 a 15 dias úteis após aprovação da arte." }
    },
    {
      "@type": "Question",
      "name": "Vocês atendem fora do Guarujá?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sim, Baixada Santista completa e envio para todo o Brasil." }
    },
    {
      "@type": "Question",
      "name": "Como solicitar um orçamento?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pelo WhatsApp ou formulário na página. Resposta em até 48h." }
    }
  ]
}
```

> **Atenção:** Para o FAQPage gerar rich snippets no Google, as perguntas precisam aparecer também **visivelmente na página**. Criar componente `FAQ.astro` quando pronto.

---

## 3. Analytics — GTM / GA4 / Google Ads / Meta Pixel

Componente: **`src/components/Analytics.astro`**
Incluído em: `src/layouts/Layout.astro` → `<head>`

### 3.1 Configuração

| Plataforma | Campo em `company.ts` | Onde inserir no GTM |
|---|---|---|
| Google Tag Manager | `GTM_ID` | Container → todas as tags abaixo |
| GA4 | `GA4_ID` | Tag GA4 dentro do GTM |
| Google Ads | — | Tag de conversão dentro do GTM |
| Meta Pixel | `META_PIXEL_ID` | Tag Meta Pixel dentro do GTM |

O snippet do GTM é injetado automaticamente no `<head>` e o `<noscript>` no `<body>`.

### 3.2 dataLayer — todos os eventos disparados

Todos os eventos chegam no `window.dataLayer` e podem ser capturados via GTM → Trigger → Custom Event.

| Evento | Quando dispara | Campos extras |
|---|---|---|
| `click_whatsapp` | Clique em qualquer botão WhatsApp | `event_location` |
| `click_phone` | Clique no número de telefone | `event_location` |
| `form_start` | Primeiro foco em campo de formulário | `event_location` |
| `form_submit` | Submit de formulário | `event_location` |
| `quote_request` | Dispara junto com `click_whatsapp` e `form_submit` | `event_location` |
| `click_gallery` | Clique em item da galeria | `event_location`, `event_label` |
| `scroll_75` | Usuário rolou 75% da página | — |

Formato do objeto pushado:
```js
window.dataLayer.push({
  event: 'click_whatsapp',
  event_location: 'hero',
  event_label: undefined  // presente em click_gallery
});
```

### 3.3 Mapa de elementos rastreáveis

| Elemento | `data-event` | `data-location` | `data-label` |
|---|---|---|---|
| CTA hero | `click_whatsapp` | `hero` | — |
| Botão WhatsApp flutuante | `click_whatsapp` | `floating_button` | — |
| Botão submit contato | `click_whatsapp` | `final_cta` | — |
| Formulário de orçamento rápido | `form_submit` | `lead_form` | — |
| Formulário de contato | `form_submit` | `contact_form` | — |
| Telefone (link `tel:`) | `click_phone` | `contact` | — |
| Item de galeria 1 | `click_gallery` | `gallery` | `sacola-premium-corda-preta` |
| Item de galeria 2 | `click_gallery` | `gallery` | `sacola-kraft-acabamento-fino` |
| Item de galeria 3 | `click_gallery` | `gallery` | `colecao-luxo-serigrafia` |
| Item de galeria 4 | `click_gallery` | `gallery` | `estampa-total-full-print` |
| Item de galeria 5 | `click_gallery` | `gallery` | `tecido-4-cores` |
| Item de galeria 6 | `click_gallery` | `gallery` | `formato-especial` |

### 3.4 Como adicionar um novo elemento rastreável

Basta adicionar os atributos no HTML do componente correspondente:

```html
<a
  href="..."
  data-event="click_whatsapp"
  data-location="nome_do_local"
>Texto</a>
```

O script em `Analytics.astro` captura automaticamente qualquer `[data-event]` na página.

---

## 4. Configuração do GTM para Google Ads

Quando integrar com Google Ads, criar no GTM:

### Tag — Google Ads Conversion Tracking
- **Trigger:** Custom Event → `quote_request`
- **Conversion label:** gerado no Google Ads
- **Conversion value:** opcional (ex: valor médio do pedido)

### Tag — GA4 Event
- **Trigger:** Custom Event → `click_whatsapp`
- **Event name:** `generate_lead`
- **Parameters:** `event_location: {{DLV - event_location}}`

### Tag — Meta Pixel Lead
- **Trigger:** Custom Event → `form_submit`
- **Event:** `Lead`
- **Parameters:** `content_name: {{DLV - event_location}}`

### Variáveis do dataLayer a criar no GTM
| Variável GTM | Chave no dataLayer |
|---|---|
| `DLV - event_location` | `event_location` |
| `DLV - event_label` | `event_label` |

---

## 5. Checklist de ativação

- [ ] Substituir `INSERIR_GTM_ID` em `src/config/company.ts`
- [ ] Substituir `INSERIR_TELEFONE` com o telefone real
- [ ] Substituir `INSERIR_URL` com a URL de produção
- [ ] Substituir `INSERIR_ENDERECO_SE_HOUVER` se houver endereço físico
- [ ] Substituir `INSERIR_INSTAGRAM` e `INSERIR_WHATSAPP` nas redes sociais
- [ ] Publicar site e validar schemas em: https://search.google.com/test/rich-results
- [ ] Publicar site e validar LocalBusiness em: https://validator.schema.org
- [ ] Criar tags no GTM conforme seção 4
- [ ] Testar eventos no GTM Preview antes de publicar
- [ ] Criar componente `FAQ.astro` para ativar FAQPage rich snippets
