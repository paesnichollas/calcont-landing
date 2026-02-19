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
  heroImageSrc: string;
  heroImageAlt: string;
};

export type CtaContent = {
  title: string;
  description: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
};

export type FooterContent = {
  brand: string;
  legal: string;
};

export const navbarContent: {
  brand: string;
  navigation: NavigationItem[];
  actionLabel: string;
} = {
  brand: "Calcont",
  navigation: [
    { id: "servicos", label: "Servicos", href: "#servicos" },
    { id: "equipe", label: "Equipe", href: "#equipe" },
    { id: "numeros", label: "Numeros", href: "#numeros" },
    { id: "depoimentos", label: "Depoimentos", href: "#depoimentos" }
  ],
  actionLabel: "Ja sou cliente"
};

export const heroContent: HeroContent = {
  eyebrow: "Contabilidade consultiva para crescimento real",
  title: "Landing Calcont em construcao com base escalavel",
  description:
    "Estrutura inicial pronta para receber conteudo semanal, com performance mobile e arquitetura orientada a conversao.",
  primaryCtaLabel: "Ja sou cliente",
  secondaryCtaLabel: "Ainda nao sou cliente",
  heroImageSrc: "/hero-placeholder.svg",
  heroImageAlt: "Ilustracao institucional da Calcont"
};

export const ctaContent: CtaContent = {
  title: "Pronto para avancar com apoio contabil estrategico?",
  description: "Use os botoes abaixo para seguir para atendimento ou para o portal de clientes.",
  primaryCtaLabel: "Ja sou cliente",
  secondaryCtaLabel: "Ainda nao sou cliente"
};

export const footerContent: FooterContent = {
  brand: "Calcont",
  legal: "Todos os direitos reservados."
};
