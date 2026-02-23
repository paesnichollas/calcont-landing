export type HeroCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  tertiaryCtaLabel: string;
  titleEmphasisKeywords: string[];
  benefits: string[];
  socialProof: string;
};

export type NavCopy = {
  defaultActionLabel: string;
  servicesMenuLabel: string;
  servicesMenuHint: string;
  themeMenuLabel: string;
  themeOptionLight: string;
  themeOptionDark: string;
  themeOptionSystem: string;
  itemsById: Record<string, string>;
};

export type DifferentialsCopy = {
  title: string;
  description: string;
  items: string[];
};

export type ServicesCopy = {
  title: string;
  description: string;
  benefitsLabel: string;
};

export type HowItWorksCopy = {
  title: string;
  steps: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCopy = {
  title: string;
  items: FaqItem[];
};

export type ClosingCtaCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  tertiaryCtaLabel: string;
};

export type ServicesSectionCopy = {
  eyebrow: string;
  badge: string;
  title: string;
  subtitle: string;
  emptyStateLabel: string;
  benefitLabel: string;
};

export type TeamSectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type TestimonialsSectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ratingAriaLabelPrefix: string;
  ratingAriaLabelSuffix: string;
};

export type NumbersSectionCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type SectionsCopy = {
  services: ServicesSectionCopy;
  team: TeamSectionCopy;
  testimonials: TestimonialsSectionCopy;
  numbers: NumbersSectionCopy;
};

export type CommonCopy = {
  backToTopAriaLabel: string;
};

export type LandingCopy = {
  nav: NavCopy;
  hero: HeroCopy;
  differentials: DifferentialsCopy;
  services: ServicesCopy;
  howItWorks: HowItWorksCopy;
  faq: FaqCopy;
  closingCta: ClosingCtaCopy;
  sections: SectionsCopy;
  common: CommonCopy;
};

export const landingCopy: LandingCopy = {
  nav: {
    defaultActionLabel: "Já sou cliente",
    servicesMenuLabel: "Serviços",
    servicesMenuHint: "Escolha um serviço para abrir o detalhe.",
    themeMenuLabel: "Tema",
    themeOptionLight: "Claro",
    themeOptionDark: "Escuro",
    themeOptionSystem: "Sistema",
    itemsById: {
      "services-menu": "Serviços",
      inicio: "Início",
      assinatura: "Assinatura",
      destaques: "Destaques",
      equipe: "Equipe",
      numeros: "Números",
      galeria: "Galeria",
      depoimentos: "Depoimentos",
      contato: "Contato"
    }
  },
  hero: {
    eyebrow: "Decisão, controle e crescimento com base em dados",
    title: "Cresça com controle.\nDecida com dados.\nEscale com segurança fiscal.",
    description:
      "Transformamos rotinas contábeis e fiscais em inteligência prática para reduzir riscos, proteger seu caixa e dar previsibilidade ao crescimento.",
    primaryCtaLabel: "Quero estruturar minha empresa",
    secondaryCtaLabel: "Já sou cliente",
    tertiaryCtaLabel: "Falar no WhatsApp",
    titleEmphasisKeywords: ["controle", "dados", "segurança fiscal"],
    benefits: [
      "Redução estratégica de riscos fiscais",
      "Previsibilidade financeira e organizacional",
      "Decisões mais rápidas com visão de caixa"
    ],
    socialProof: "Atendimento consultivo | Resposta ágil no WhatsApp"
  },
  differentials: {
    title: "Diferenciais que sustentam sua operação",
    description: "Método claro, execução constante e equipe próxima para manter sua empresa no ritmo certo.",
    items: [
      "Acompanhamento consultivo com linguagem objetiva",
      "Processo fiscal e contábil com rotina previsível",
      "Visão de risco e oportunidades para tomada de decisão"
    ]
  },
  services: {
    title: "Serviços essenciais para crescer com segurança",
    description: "Soluções de contabilidade, fiscal e trabalhista alinhadas ao momento da sua empresa.",
    benefitsLabel: "Resultado prático para a sua empresa"
  },
  howItWorks: {
    title: "Como funciona o atendimento",
    steps: [
      "Diagnóstico inicial para mapear riscos, prazos e prioridades",
      "Plano de execução com rotinas, entregas e acompanhamento",
      "Evolução contínua com revisões periódicas e orientação consultiva"
    ]
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      {
        question: "A Calcont atende empresas de quais portes?",
        answer: "Atendemos empresas em diferentes estágios, com plano ajustado ao volume e ao nível de complexidade da operação."
      },
      {
        question: "Como funciona para quem já tem contador?",
        answer: "Conduzimos a transição com checklist documental e cronograma para manter continuidade e evitar interrupções."
      },
      {
        question: "Vocês apoiam planejamento tributário?",
        answer: "Sim. Avaliamos enquadramento e cenários para melhorar eficiência com segurança jurídica e operacional."
      },
      {
        question: "Qual é o primeiro passo para contratar?",
        answer: "Você escolhe um canal de contato e iniciamos com um diagnóstico rápido para definir o melhor fluxo de atendimento."
      }
    ]
  },
  closingCta: {
    eyebrow: "Contato",
    title: "Pronto para tomar decisões com mais clareza contábil e fiscal?",
    description: "Escolha o fluxo ideal e fale com a Calcont para organizar sua operação com previsibilidade.",
    primaryCtaLabel: "Já sou cliente",
    secondaryCtaLabel: "Quero Estruturar minha empresa",
    tertiaryCtaLabel: "Falar no WhatsApp"
  },
  sections: {
    services: {
      eyebrow: "Serviços",
      badge: "Serviços",
      title: "Soluções completas para gestão contábil e tributária",
      subtitle: "Selecione um serviço para visualizar detalhes operacionais, entregas e foco de atendimento.",
      emptyStateLabel: "Detalhes deste serviço serão atualizados em breve.",
      benefitLabel: "Resultado para sua empresa"
    },
    team: {
      eyebrow: "Equipe",
      title: "Equipe por cidade",
      subtitle: "Profissionais distribuídos por unidade para garantir atendimento próximo e execução consistente."
    },
    testimonials: {
      eyebrow: "Depoimentos",
      title: "Prova social",
      subtitle: "Depoimentos em texto e vídeo para reforçar confiança.",
      ratingAriaLabelPrefix: "Avaliação",
      ratingAriaLabelSuffix: "de 5"
    },
    numbers: {
      eyebrow: "Números",
      title: "Autoridade em números",
      subtitle: "Indicadores institucionais para reforçar confiança e posicionamento corporativo."
    }
  },
  common: {
    backToTopAriaLabel: "Voltar ao topo"
  }
};
