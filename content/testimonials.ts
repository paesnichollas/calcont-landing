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
  description: "Placeholders para depoimentos em texto e video.",
  videoLinkLabel: "Ver video",
  items: [
    {
      id: "dep-1",
      author: "Cliente Placeholder 1",
      role: "Comercio",
      text: "Atendimento consistente e apoio tecnico nas decisoes."
    },
    {
      id: "dep-2",
      author: "Cliente Placeholder 2",
      role: "Servico",
      videoUrl: "https://example.com/video-placeholder"
    }
  ]
};
