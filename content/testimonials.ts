export type Testimonial = {
  id: string;
  author: string;
  role: string;
  company?: string;
  text?: string;
  rating?: number;
  videoUrl?: string;
};

export type TestimonialsContent = {
  eyebrow: string;
  title: string;
  description: string;
  videoLinkLabel: string;
  carouselAriaLabel: string;
  dotsAriaLabel: string;
  goToSlideAriaPrefix: string;
  previousAriaLabel: string;
  nextAriaLabel: string;
  previousButtonLabel: string;
  nextButtonLabel: string;
  fallbackAuthorLabel: string;
  fallbackMetaLabel: string;
  emptyTextLabel: string;
  items: Testimonial[];
};

export const testimonialsContent: TestimonialsContent = {
  eyebrow: "Depoimentos",
  title: "Prova social",
  description: "Depoimentos em texto e vídeo para reforçar confiança.",
  videoLinkLabel: "Ver vídeo",
  carouselAriaLabel: "Depoimentos de clientes",
  dotsAriaLabel: "Selecionar depoimento",
  goToSlideAriaPrefix: "Ir para depoimento",
  previousAriaLabel: "Depoimento anterior",
  nextAriaLabel: "Próximo depoimento",
  previousButtonLabel: "Anterior",
  nextButtonLabel: "Próximo",
  fallbackAuthorLabel: "Cliente Calcont",
  fallbackMetaLabel: "Cliente Calcont",
  emptyTextLabel: "Depoimento em atualização.",
  items: [
    {
      id: "dep-1",
      author: "Cliente Placeholder 1",
      role: "Diretoria Financeira",
      company: "Comércio local",
      rating: 5,
      text: "Atendimento consistente e apoio técnico para decisões importantes."
    },
    {
      id: "dep-2",
      author: "Cliente Placeholder 2",
      role: "Gestão Administrativa",
      company: "Empresa de serviços",
      rating: 5,
      text: "A equipe trouxe mais previsibilidade para nossa rotina fiscal.",
      videoUrl: "https://example.com/video-placeholder"
    },
    {
      id: "dep-3",
      author: "Cliente Placeholder 3",
      role: "Controladoria",
      company: "Indústria regional",
      rating: 4,
      text: "Com orientação clara, conseguimos organizar processos internos com mais segurança."
    }
  ]
};

