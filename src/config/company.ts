// ─── DADOS DA EMPRESA ────────────────────────────────────────────────────────
// Edite este arquivo para atualizar todas as referências de uma só vez.
// Substitua os valores "INSERIR_*" antes de publicar.

export const COMPANY = {
  name: 'Chico Sacolas',
  description: 'Sacolas personalizadas para lojas, eventos e empresas.',
  telephone: '+5513997646549',          // ex: "+55-13-99764-6549"
  email: 'oi@chicosacolas.com',
  url: 'https://chicosacolas.com.br',
  address: {
    streetAddress: 'Rua Projetada C, 24',
    addressLocality: 'Guarujá',
    addressRegion: 'SP',
    postalCode: '11460-540',
    addressCountry: 'BR',
  },
  areaServed: ['Guarujá', 'Santos', 'São Vicente', 'Praia Grande', 'Cubatão', 'Bertioga', 'Mongaguá', 'Itanhaém', 'Peruíbe', 'Baixada Santista'],
  sameAs: [
    'https://www.facebook.com/chicosacolas',
    'https://wa.me/5513997646549?text=Ol%C3%A1%2C%20gostaria%20de%20um%20or%C3%A7amento%20de%20sacolas%20personalizadas!',
  ],
  logo: 'https://chicosacolas.com.br/images/logo-chico-sacolas.png',
} as const;

// ─── IDs DE ANALYTICS ────────────────────────────────────────────────────────
// Substitua os valores abaixo pelos IDs reais das suas contas.

export const GTM_ID = 'GTM-TDXJ5RMG';
export const GA4_ID = 'G-YEL1GTK1ZT';            // ex: "G-XXXXXXXXXX" (se não usar GTM)
export const META_PIXEL_ID = 'INSERIR_PIXEL_ID'; // ex: "1234567890"   (se não usar GTM)

// ─── FAQ ─────────────────────────────────────────────────────────────────────
// Usado no FAQPage schema. Para gerar rich snippets no Google, o conteúdo
// destas perguntas deve também aparecer visivelmente na página.

export const FAQ = [
  {
    question: 'Qual é o pedido mínimo de sacolas personalizadas?',
    answer:
      'Trabalhamos com tiragens a partir de 100 unidades — ideal para pequenos negócios, lojas e eventos.',
  },
  {
    question: 'Quais tipos de sacola personalizada vocês produzem?',
    answer:
      'Produzimos sacolas de papel kraft personalizadas, ecobags de tecido, sacolas promocionais e formatos especiais, todas com serigrafia de alta qualidade.',
  },
  {
    question: 'Qual o prazo de produção?',
    answer:
      'Em geral, entre 7 e 15 dias úteis após aprovação da arte. O prazo exato varia conforme quantidade e complexidade.',
  },
  {
    question: 'Vocês atendem fora do Guarujá?',
    answer:
      'Sim! Atendemos toda a Baixada Santista — Santos, São Vicente, Praia Grande, Cubatão, Bertioga, Mongaguá, Itanhaém, Peruíbe e região — e enviamos para todo o Brasil.',
  },
  {
    question: 'Como faço para pedir um orçamento de sacolas personalizadas?',
    answer:
      'É simples: clique no botão de WhatsApp ou preencha o formulário na página. Respondemos em até 48 h com orçamento, prazo e sugestão de material, sem compromisso.',
  },
] as const;

// ─── SERVIÇOS ─────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    name: 'Sacolas kraft personalizadas',
    description: 'Sacolas de papel kraft com serigrafia para lojas e varejo.',
  },
  {
    name: 'Ecobags personalizadas',
    description: 'Sacolas de tecido reutilizáveis com logo e estampa personalizada.',
  },
  {
    name: 'Sacolas para eventos',
    description: 'Sacolas promocionais e brindes corporativos para eventos e feiras.',
  },
  {
    name: 'Sacolas com logo',
    description: 'Produção de sacolas com logo da marca em serigrafia de 1 a 4 cores.',
  },
] as const;
