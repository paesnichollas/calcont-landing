export type Testimonial = {
  id: string;
  author: string;
  role: string;
  text?: string;
  videoUrl?: string;
};

export type TestimonialsContent = {
  title: string;
  description: string;
  videoLinkLabel: string;
  items: Testimonial[];
};

export const testimonialsContent: TestimonialsContent = {
  title: "Prova social",
  description: "Depoimentos em texto e video para reforcar confianca.",
  videoLinkLabel: "Ver video",
  items: [
    {
      id: "dep-1",
      author: "Cliente Placeholder 1",
      role: "Comercio",
      text: "Atendimento consistente e apoio tecnico para decisoes importantes."
    },
    {
      id: "dep-2",
      author: "Cliente Placeholder 2",
      role: "Servico",
      text: "A equipe trouxe mais previsibilidade para nossa rotina fiscal.",
      videoUrl: "https://example.com/video-placeholder"
    },
    {
      id: "dep-3",
      author: "Cliente Placeholder 3",
      role: "Industria",
      text: "Com orientacao clara, conseguimos organizar processos internos com mais seguranca."
    }
  ]
};
