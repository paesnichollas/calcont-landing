export type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  shortDescription?: string;
  details?: string;
  benefit?: string;
  highlights?: string[];
  bullets?: string[];
  icon?: string;
};

export type ServicesContent = {
  eyebrow: string;
  badge: string;
  title: string;
  description: string;
  emptyStateLabel: string;
  benefitLabel: string;
  items: ServiceItem[];
};

export const servicesContent: ServicesContent = {
  eyebrow: "Serviços",
  badge: "Serviços",
  title: "Soluções completas para gestão contábil e tributária",
  description: "Selecione um serviço para visualizar detalhes operacionais, entregas e foco de atendimento.",
  emptyStateLabel: "Detalhes deste serviço serão atualizados em breve.",
  benefitLabel: "Resultado para sua empresa",
  items: [
    {
      id: "contabil",
      title: "Contabilidade",
      summary: "Escrituração, demonstrativos e fechamento com previsibilidade.",
      shortDescription: "Rotina contábil organizada para manter sua empresa em dia com visão clara de resultados.",
      details: "Rotina contábil completa com suporte para leitura de indicadores e tomada de decisão.",
      benefit: "Mais clareza financeira para decidir com segurança e menos retrabalho no fechamento.",
      highlights: ["Fechamento mensal", "Demonstrativos gerenciais", "Acompanhamento consultivo"],
      bullets: ["Fechamento mensal", "Demonstrativos gerenciais", "Acompanhamento consultivo"],
      icon: "calculator"
    },
    {
      id: "fiscal",
      title: "Fiscal",
      summary: "Gestão tributária e obrigações acessórias com rotina organizada.",
      shortDescription: "Execução fiscal contínua para reduzir riscos e manter conformidade tributária.",
      details: "Planejamento e execução fiscal para reduzir riscos e manter conformidade contínua.",
      benefit: "Menos exposição a multas com apuração consistente e prazos acompanhados de perto.",
      highlights: ["Apuração de tributos", "Obrigações acessórias", "Revisão fiscal periódica"],
      bullets: ["Apuração de tributos", "Obrigações acessórias", "Revisão fiscal periódica"],
      icon: "shield-check"
    },
    {
      id: "trabalhista",
      title: "Trabalhista",
      summary: "Rotinas de folha, admissão, desligamento e conformidade.",
      shortDescription: "Gestão de departamento pessoal com processos padronizados e orientação objetiva.",
      details: "Gestão do departamento pessoal com processos padronizados e segurança jurídica.",
      benefit: "Mais tranquilidade em folha e encargos com orientação para cumprir obrigações legais.",
      highlights: ["Folha de pagamento", "Admissões e rescisões", "Encargos e eSocial"],
      bullets: ["Folha de pagamento", "Admissões e rescisões", "Encargos e eSocial"],
      icon: "briefcase-business"
    },
    {
      id: "certificacao-digital",
      title: "Certificação Digital",
      summary: "Emissão e renovação de certificados para operação segura e válida.",
      shortDescription: "Apoio completo para emitir, renovar e usar certificado digital sem bloqueios.",
      details: "Apoio completo para emissão, renovação e uso correto do certificado digital da empresa.",
      benefit: "Continuidade operacional com autenticação válida para assinar documentos e cumprir exigências.",
      highlights: ["Emissão assistida", "Renovação programada", "Suporte para instalação"],
      bullets: ["Emissão assistida", "Renovação programada", "Suporte para instalação"],
      icon: "key-round"
    },
    {
      id: "planejamento-tributario",
      title: "Planejamento Tributário",
      summary: "Estratégias para eficiência fiscal alinhadas ao perfil do negócio.",
      shortDescription: "Análise de enquadramento e cenários para buscar eficiência com segurança.",
      details: "Análise do enquadramento tributário e cenários para melhorar margem e previsibilidade.",
      benefit: "Economia tributária sustentável com plano claro para reduzir custo e aumentar previsibilidade.",
      highlights: ["Análise de regime", "Projeções tributárias", "Plano de adequação"],
      bullets: ["Análise de regime", "Projeções tributárias", "Plano de adequação"],
      icon: "trending-up"
    }
  ]
};

