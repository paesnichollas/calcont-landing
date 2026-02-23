export type NavigationItem = {
  id: string;
  label: string;
  href: string;
};

export type NavbarContent = {
  brand: string;
  navigation: NavigationItem[];
  actionLabel: string;
  servicesMenuLabel: string;
  servicesMenuHint: string;
  themeMenuLabel: string;
  themeOptionLight: string;
  themeOptionDark: string;
  themeOptionSystem: string;
};

export type HeroSlide = {
  id: string;
  src: string;
  alt: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  tertiaryCtaLabel: string;
  titleEmphasisKeywords: string[];
  benefits: string[];
  socialProof: string;
  heroImageSrc: string;
  heroImageAlt: string;
  heroBackgroundSrc: string;
  heroBackgroundAlt: string;
  heroSlides: HeroSlide[];
};

export type CtaContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  tertiaryCtaLabel: string;
};

export type FooterContent = {
  brand: string;
  legal: string;
};

export const navbarContent: NavbarContent = {
  brand: "Calcont",
  navigation: [
    { id: "services-menu", label: "Serviços", href: "#servicos" },
    { id: "inicio", label: "Início", href: "#inicio" },
    { id: "assinatura", label: "Assinatura", href: "#assinatura" },
    { id: "destaques", label: "Destaques", href: "#destaques" },
    { id: "equipe", label: "Equipe", href: "#equipe" },
    { id: "numeros", label: "Números", href: "#numeros" },
    { id: "galeria", label: "Galeria", href: "#galeria" },
    { id: "depoimentos", label: "Depoimentos", href: "#depoimentos" },
    { id: "contato", label: "Contato", href: "#contato" }
  ],
  actionLabel: "Já sou cliente",
  servicesMenuLabel: "Serviços",
  servicesMenuHint: "Escolha um serviço para abrir o detalhe.",
  themeMenuLabel: "Tema",
  themeOptionLight: "Claro",
  themeOptionDark: "Escuro",
  themeOptionSystem: "Sistema"
};

export const heroContent: HeroContent = {
  eyebrow: "Decisão, controle e crescimento com base em dados",
  title: "Cresça com controle. Decida com dados. Escale com segurança fiscal.",
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
  socialProof: "Atendimento consultivo | Resposta ágil no WhatsApp",
  heroImageSrc: "/hero-slide-1.svg",
  heroImageAlt: "Imagem institucional da Calcont",
  heroBackgroundSrc: "/hero-bg-placeholder.svg",
  heroBackgroundAlt: "Fundo institucional da Calcont",
  heroSlides: [
    { id: "hero-slide-1", src: "/hero-slide-1.svg", alt: "Time da Calcont em reunião" },
    { id: "hero-slide-2", src: "/hero-slide-2.svg", alt: "Análise financeira em andamento" },
    { id: "hero-slide-3", src: "/hero-slide-3.svg", alt: "Atendimento consultivo com cliente" }
  ]
};

export const ctaContent: CtaContent = {
  eyebrow: "Contato",
  title: "Pronto para avançar com apoio contábil estratégico?",
  description: "Escolha o fluxo ideal: acesso ao portal, cadastro de novo cliente ou contato rápido no WhatsApp.",
  primaryCtaLabel: "Já sou cliente",
  secondaryCtaLabel: "Ainda não sou cliente",
  tertiaryCtaLabel: "Falar no WhatsApp"
};

export const footerContent: FooterContent = {
  brand: "Calcont",
  legal: "Todos os direitos reservados."
};
