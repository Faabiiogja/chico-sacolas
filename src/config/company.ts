// ─── DADOS DA EMPRESA ────────────────────────────────────────────────────────
// Edite este arquivo para atualizar todas as referências de uma só vez.
// Substitua os valores "INSERIR_*" antes de publicar.

export const COMPANY = {
  name: 'Chico Sacolas',
  description: 'Sacolas personalizadas para lojas, eventos e empresas.',
  telephone: '+5513997646549',          // ex: "+55-13-99764-6549"
  email: 'contato@chicosacolas.com.br',
  url: 'https://chicosacolas.com.br',
  address: {
    streetAddress: 'Rua Projetada C, 24',
    addressLocality: 'Guarujá',
    addressRegion: 'SP',
    postalCode: '11460-540',
    addressCountry: 'BR',
  },
  geo: { latitude: -23.9477386, longitude: -46.2828105 },
  areaServed: ['Guarujá', 'Santos', 'São Vicente', 'Praia Grande', 'Cubatão', 'Bertioga', 'Mongaguá', 'Itanhaém', 'Peruíbe', 'Baixada Santista'],
  facebook: 'https://www.facebook.com/chicosacolas',
  instagram: 'https://www.instagram.com/oficial.chicosacolas/',
  googleMaps:
    'https://www.google.com/maps/place/Chico+Sacolas/@-23.9477386,-46.2828105,1089m/data=!3m2!1e3!4b1!4m6!3m5!1s0x94ce01a53b4f8c87:0x4926774ab97ac81d!8m2!3d-23.9477386!4d-46.2828105!16s%2Fg%2F11nhp3nhqw',
  // Exibido na página e no schema — mantenha igual ao Google Business Profile.
  openingHours: [
    { label: 'Seg a sex', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { label: 'Sábado', days: ['Saturday'], opens: '09:00', closes: '15:00' },
  ],
  priceRange: '$$',
  logo: 'https://chicosacolas.com.br/images/logo-chico-sacolas.png',
  image: 'https://chicosacolas.com.br/images/og-chico-sacolas.jpg',
} as const;

export const SAME_AS = [COMPANY.facebook, COMPANY.instagram, COMPANY.googleMaps];

// ─── IDs DE ANALYTICS ────────────────────────────────────────────────────────
// Substitua os valores abaixo pelos IDs reais das suas contas.

export const GTM_ID = 'GTM-TDXJ5RMG';
export const GA4_ID = 'G-YEL1GTK1ZT';
export const META_PIXEL_ID = '2638064056588787';

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
    detail:
      'Papel kraft resistente, com alça de papel torcido ou cordão. Ideal para lojas de roupa, padarias, cafés, farmácias e delivery que querem uma embalagem com cara de marca.',
  },
  {
    name: 'Ecobags personalizadas',
    description: 'Sacolas de tecido reutilizáveis com logo e estampa personalizada.',
    detail:
      'Ecobags de algodão cru e outros tecidos, estampadas em serigrafia. Seu cliente reutiliza no dia a dia e leva a sua marca para a rua por anos.',
  },
  {
    name: 'Sacolas para eventos',
    description: 'Sacolas promocionais e brindes corporativos para eventos e feiras.',
    detail:
      'Kits de boas-vindas, congressos, feiras, casamentos e ações promocionais. Produzimos tiragens pequenas ou grandes com prazo combinado para a data do evento.',
  },
  {
    name: 'Sacolas com logo',
    description: 'Produção de sacolas com logo da marca em serigrafia de 1 a 4 cores.',
    detail:
      'Impressão em serigrafia de 1 a 4 cores, com tintas à base de água ou plastisol curadas em alta temperatura: cor viva e sem desbotar.',
  },
] as const;
