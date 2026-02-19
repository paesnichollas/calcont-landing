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
  description: "Placeholders para depoimentos em texto e vídeo.",
  videoLinkLabel: "Ver vídeo",
  items: [
    {
      id: "dep-1",
      author: "Cliente Placeholder 1",
      role: "Comércio",
      text: "Atendimento consistente e apoio técnico nas decisões."
    },
    {
      id: "dep-2",
      author: "Cliente Placeholder 2",
      role: "Serviço",
      videoUrl: "https://example.com/video-placeholder"
    }
  ]
};
