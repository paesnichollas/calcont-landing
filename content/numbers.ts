export type NumberStat = {
  id: string;
  label: string;
  value: string;
};

export type NumbersContent = {
  title: string;
  description: string;
  items: NumberStat[];
};

export const numbersContent: NumbersContent = {
  title: "Autoridade em números",
  description: "Indicadores institucionais para reforçar confiança e posicionamento corporativo.",
  items: [
    { id: "anos", label: "Anos de empresa", value: "10 anos" },
    { id: "clientes", label: "Clientes ativos", value: "000+" },
    { id: "cidades", label: "Cidades atendidas", value: "02" }
  ]
};
