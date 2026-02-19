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
  description: "Depoimentos em texto e vídeo para reforçar confiança.",
  videoLinkLabel: "Ver vídeo",
  items: [
    {
      id: "dep-1",
      author: "Cliente Placeholder 1",
      role: "Comércio",
      text: "Atendimento consistente e apoio técnico para decisões importantes."
    },
    {
      id: "dep-2",
      author: "Cliente Placeholder 2",
      role: "Serviço",
      text: "A equipe trouxe mais previsibilidade para nossa rotina fiscal.",
      videoUrl: "https://example.com/video-placeholder"
    },
    {
      id: "dep-3",
      author: "Cliente Placeholder 3",
      role: "Indústria",
      text: "Com orientação clara, conseguimos organizar processos internos com mais segurança."
    }
  ]
};
