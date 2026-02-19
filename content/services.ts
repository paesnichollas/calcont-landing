export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  details?: string;
};

export type ServicesContent = {
  badge: string;
  title: string;
  description: string;
  items: ServiceItem[];
};

export const servicesContent: ServicesContent = {
  badge: "Servicos",
  title: "Base de servicos pronta para expansao",
  description: "Os cards abaixo sao placeholders e serao detalhados na etapa de implementacao completa.",
  items: [
    {
      id: "contabil",
      title: "Contabilidade",
      summary: "Escrituracao, demonstrativos e fechamento com previsibilidade.",
      details: "Placeholder para detalhe expandido por servico."
    },
    {
      id: "fiscal",
      title: "Fiscal",
      summary: "Gestao tributaria e obrigacoes acessorias com rotina organizada.",
      details: "Placeholder para detalhe expandido por servico."
    },
    {
      id: "trabalhista",
      title: "Trabalhista",
      summary: "Rotinas de folha, admissao, desligamento e conformidade.",
      details: "Placeholder para detalhe expandido por servico."
    }
  ]
};
