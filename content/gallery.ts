export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  label: string;
};

export type GalleryContent = {
  title: string;
  description: string;
  items: GalleryItem[];
};

export const galleryContent: GalleryContent = {
  title: "Galeria",
  description: "Espaço visual para apresentar equipe, estrutura e rotina de atendimento.",
  items: [
    { id: "gallery-1", src: "/gallery-1.svg", alt: "Equipe em reunião de alinhamento", label: "Atendimento consultivo" },
    { id: "gallery-2", src: "/gallery-2.svg", alt: "Análise de indicadores em escritório", label: "Análise gerencial" },
    { id: "gallery-3", src: "/gallery-3.svg", alt: "Time revisando documentos", label: "Conformidade" },
    { id: "gallery-4", src: "/gallery-4.svg", alt: "Profissional em chamada com cliente", label: "Canal direto" },
    { id: "gallery-5", src: "/gallery-5.svg", alt: "Painel de planejamento operacional", label: "Planejamento" },
    { id: "gallery-6", src: "/gallery-6.svg", alt: "Equipe no escritório da Calcont", label: "Estrutura" },
    { id: "gallery-7", src: "/gallery-7.svg", alt: "Reunião de equipe com foco em resultados", label: "Foco em resultados" },
    { id: "gallery-8", src: "/gallery-8.svg", alt: "Rotina contábil organizada", label: "Rotina eficiente" }
  ]
};
