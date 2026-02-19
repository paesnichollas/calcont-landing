export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  details?: string;
  highlights?: string[];
};

export type ServicesContent = {
  badge: string;
  title: string;
  description: string;
  emptyStateLabel: string;
  items: ServiceItem[];
};

export const servicesContent: ServicesContent = {
  badge: "Serviços",
  title: "Soluções completas para gestão contábil e tributária",
  description: "Selecione um serviço para visualizar detalhes operacionais, entregas e foco de atendimento.",
  emptyStateLabel: "Detalhes deste serviço serão atualizados em breve.",
  items: [
    {
      id: "contabil",
      title: "Contabilidade",
      summary: "Escrituração, demonstrativos e fechamento com previsibilidade.",
      details: "Rotina contábil completa com suporte para leitura de indicadores e tomada de decisão.",
      highlights: ["Fechamento mensal", "Demonstrativos gerenciais", "Acompanhamento consultivo"]
    },
    {
      id: "fiscal",
      title: "Fiscal",
      summary: "Gestão tributária e obrigações acessórias com rotina organizada.",
      details: "Planejamento e execução fiscal para reduzir riscos e manter conformidade contínua.",
      highlights: ["Apuração de tributos", "Obrigações acessórias", "Revisão fiscal periódica"]
    },
    {
      id: "trabalhista",
      title: "Trabalhista",
      summary: "Rotinas de folha, admissão, desligamento e conformidade.",
      details: "Gestão do departamento pessoal com processos padronizados e segurança jurídica.",
      highlights: ["Folha de pagamento", "Admissões e rescisões", "Encargos e eSocial"]
    },
    {
      id: "certificacao-digital",
      title: "Certificação Digital",
      summary: "Emissão e renovação de certificados para operação segura e válida.",
      details: "Apoio completo para emissão, renovação e uso correto do certificado digital da empresa.",
      highlights: ["Emissão assistida", "Renovação programada", "Suporte para instalação"]
    },
    {
      id: "planejamento-tributario",
      title: "Planejamento Tributário",
      summary: "Estratégias para eficiência fiscal alinhadas ao perfil do negócio.",
      details: "Análise do enquadramento tributário e cenários para melhorar margem e previsibilidade.",
      highlights: ["Análise de regime", "Projeções tributárias", "Plano de adequação"]
    }
  ]
};
