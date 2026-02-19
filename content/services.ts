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
  badge: "Servicos",
  title: "Solucoes completas para gestao contabil e tributaria",
  description: "Selecione um servico para visualizar detalhes operacionais, entregas e foco de atendimento.",
  emptyStateLabel: "Detalhes deste servico serao atualizados em breve.",
  items: [
    {
      id: "contabil",
      title: "Contabilidade",
      summary: "Escrituracao, demonstrativos e fechamento com previsibilidade.",
      details: "Rotina contabil completa com suporte para leitura de indicadores e tomada de decisao.",
      highlights: ["Fechamento mensal", "Demonstrativos gerenciais", "Acompanhamento consultivo"]
    },
    {
      id: "fiscal",
      title: "Fiscal",
      summary: "Gestao tributaria e obrigacoes acessorias com rotina organizada.",
      details: "Planejamento e execucao fiscal para reduzir riscos e manter conformidade continua.",
      highlights: ["Apuracao de tributos", "Obrigacoes acessorias", "Revisao fiscal periodica"]
    },
    {
      id: "trabalhista",
      title: "Trabalhista",
      summary: "Rotinas de folha, admissao, desligamento e conformidade.",
      details: "Gestao do departamento pessoal com processos padronizados e seguranca juridica.",
      highlights: ["Folha de pagamento", "Admissoes e rescisoes", "Encargos e eSocial"]
    },
    {
      id: "certificacao-digital",
      title: "Certificacao Digital",
      summary: "Emissao e renovacao de certificados para operacao segura e valida.",
      details: "Apoio completo para emissao, renovacao e uso correto do certificado digital da empresa.",
      highlights: ["Emissao assistida", "Renovacao programada", "Suporte para instalacao"]
    },
    {
      id: "planejamento-tributario",
      title: "Planejamento Tributario",
      summary: "Estrategias para eficiencia fiscal alinhadas ao perfil do negocio.",
      details: "Analise do enquadramento tributario e cenarios para melhorar margem e previsibilidade.",
      highlights: ["Analise de regime", "Projecoes tributarias", "Plano de adequacao"]
    }
  ]
};
