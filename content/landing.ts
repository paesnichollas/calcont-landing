export type NavigationItem = {
  id: string;
  label: string;
  href: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  tertiaryCtaLabel: string;
  heroImageSrc: string;
  heroImageAlt: string;
};

export type CtaContent = {
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

export const navbarContent: {
  brand: string;
  navigation: NavigationItem[];
  actionLabel: string;
  servicesMenuLabel: string;
  servicesMenuHint: string;
} = {
  brand: "Calcont",
  navigation: [
    { id: "services-menu", label: "Servicos", href: "#servicos" },
    { id: "equipe", label: "Equipe", href: "#equipe" },
    { id: "numeros", label: "Numeros", href: "#numeros" },
    { id: "depoimentos", label: "Depoimentos", href: "#depoimentos" }
  ],
  actionLabel: "Ja sou cliente",
  servicesMenuLabel: "Servicos",
  servicesMenuHint: "Escolha um servico para abrir o detalhe"
};

export const heroContent: HeroContent = {
  eyebrow: "Contabilidade corporativa para decisao e crescimento",
  title: "Calcont: estrutura contabil estrategica para empresas que querem escalar",
  description: "Direcionamento claro para clientes atuais e novos clientes, com atendimento consultivo e foco em conversao.",
  primaryCtaLabel: "Ja sou cliente",
  secondaryCtaLabel: "Ainda nao sou cliente",
  tertiaryCtaLabel: "Falar no WhatsApp",
  heroImageSrc: "/hero-placeholder.svg",
  heroImageAlt: "Ilustracao institucional da Calcont"
};

export const ctaContent: CtaContent = {
  title: "Pronto para avancar com apoio contabil estrategico?",
  description: "Escolha o fluxo ideal: acesso ao portal, cadastro de novo cliente ou contato rapido no WhatsApp.",
  primaryCtaLabel: "Ja sou cliente",
  secondaryCtaLabel: "Ainda nao sou cliente",
  tertiaryCtaLabel: "Falar no WhatsApp"
};

export const footerContent: FooterContent = {
  brand: "Calcont",
  legal: "Todos os direitos reservados."
};
