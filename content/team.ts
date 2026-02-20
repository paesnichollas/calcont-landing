export type TeamCity = "maceio" | "marechal";

export type TeamMember = {
  name: string;
  role: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  clientBenefits?: string[];
};

export type TeamContent = {
  title: string;
  description: string;
  emptyStateLabelNoCity: string;
  emptyStateLabelCityWithoutMembers: string;
  fallbackDescription: string;
  fallbackImageSrc: string;
  fallbackBenefits: string[];
  benefitsTitle: string;
  cityLabels: Record<TeamCity, string>;
  cityHighlights: Record<TeamCity, string>;
  membersByCity: Record<TeamCity, TeamMember[]>;
};

export const teamContent: TeamContent = {
  title: "Equipe por cidade",
  description: "Profissionais distribuidos por unidade para garantir atendimento proximo e execucao consistente.",
  emptyStateLabelNoCity: "Selecione uma cidade para ver a equipe.",
  emptyStateLabelCityWithoutMembers: "Equipe em atualizacao para esta cidade.",
  fallbackDescription: "Profissional da equipe Calcont com atuacao na area.",
  fallbackImageSrc: "/team/placeholder.jpg",
  fallbackBenefits: [
    "Orientacao tecnica aplicada ao seu contexto.",
    "Mais previsibilidade para decisoes mensais.",
    "Acompanhamento proximo de prazos e obrigacoes."
  ],
  benefitsTitle: "Beneficios para o cliente",
  cityLabels: {
    maceio: "Maceio",
    marechal: "Marechal"
  },
  cityHighlights: {
    maceio: "Operacao central com foco estrategico e integracao entre frentes.",
    marechal: "Atendimento regional com execucao fiscal, contabil e trabalhista dedicada."
  },
  membersByCity: {
    maceio: [
      {
        name: "Cleiton",
        role: "Gerencia",
        description:
          "Coordena o planejamento operacional e conecta as frentes contabil, fiscal e trabalhista com foco em previsibilidade.",
        imageSrc: "/team/cleiton.jpg",
        imageAlt: "Retrato profissional de Cleiton",
        clientBenefits: [
          "Fluxo operacional alinhado entre setores.",
          "Mais previsibilidade de entregas mensais.",
          "Decisoes com suporte de indicadores confiaveis."
        ]
      },
      {
        name: "Joeline",
        role: "Gerencia",
        description:
          "Atua na gestao de processos internos e no acompanhamento de entregas para manter o padrao de qualidade da equipe.",
        imageSrc: "/team/joeline.jpg",
        imageAlt: "Retrato profissional de Joeline",
        clientBenefits: [
          "Padrao de atendimento mantido em cada etapa.",
          "Organizacao de prazos sem retrabalho.",
          "Resposta mais rapida para demandas do dia a dia."
        ]
      },
      {
        name: "Niure",
        role: "Fiscal",
        description:
          "Responsavel pela rotina fiscal e pelo monitoramento de obrigacoes, mantendo conformidade e seguranca tributaria.",
        imageSrc: "/team/niure.jpg",
        imageAlt: "Retrato profissional de Niure",
        clientBenefits: [
          "Reducao de riscos em obrigacoes fiscais.",
          "Acompanhamento continuo de prazos legais.",
          "Mais seguranca na apuracao de tributos."
        ]
      },
      {
        name: "Jurandir",
        role: "Trabalhista",
        description:
          "Conduz processos trabalhistas e orienta clientes na administracao de folha e encargos com eficiencia e controle.",
        imageSrc: "/team/jurandir.jpg",
        imageAlt: "Retrato profissional de Jurandir",
        clientBenefits: [
          "Folha e encargos organizados com consistencia.",
          "Orientacao clara para rotinas de equipe.",
          "Menos risco em processos trabalhistas."
        ]
      },
      {
        name: "Edson",
        role: "Contabil",
        description:
          "Cuida da consistencia contabil e apoia analises gerenciais para decisoes financeiras mais seguras.",
        imageSrc: "/team/edson-maceio.jpg",
        imageAlt: "Retrato profissional de Edson na unidade Maceio",
        clientBenefits: [
          "Visao contabil mais clara para a gestao.",
          "Base tecnica para decisoes financeiras.",
          "Acompanhamento proximo da saude do negocio."
        ]
      }
    ],
    marechal: [
      {
        name: "Ruan",
        role: "Gerencia",
        description: "Lidera a unidade de Marechal e organiza a execucao diaria com foco em relacionamento e resultado.",
        imageSrc: "/team/ruan.jpg",
        imageAlt: "Retrato profissional de Ruan",
        clientBenefits: [
          "Atendimento regional com proximidade real.",
          "Rotina operacional organizada por prioridades.",
          "Acompanhamento constante de resultados."
        ]
      },
      {
        name: "Antonio Carlos",
        role: "Fiscal",
        description:
          "Atua no acompanhamento fiscal e na validacao das obrigacoes para manter regularidade e estabilidade operacional.",
        imageSrc: "/team/antonio-carlos.jpg",
        imageAlt: "Retrato profissional de Antonio Carlos",
        clientBenefits: [
          "Obrigacoes fiscais monitoradas em tempo.",
          "Mais estabilidade para a operacao mensal.",
          "Menor chance de penalidades por atraso."
        ]
      },
      {
        name: "Stefani",
        role: "Trabalhista",
        description:
          "Conduz rotinas trabalhistas e assegura cumprimento de prazos, documentos e orientacoes legais no dia a dia.",
        imageSrc: "/team/stefani.jpg",
        imageAlt: "Retrato profissional de Stefani",
        clientBenefits: [
          "Rotinas de pessoal conduzidas com precisao.",
          "Orientacao objetiva para cumprimento legal.",
          "Apoio continuo em demandas trabalhistas."
        ]
      },
      {
        name: "Edson",
        role: "Contabil",
        description:
          "Apoia a rotina contabil da unidade com organizacao tecnica e acompanhamento continuo de indicadores.",
        imageSrc: "/team/edson-marechal.jpg",
        imageAlt: "Retrato profissional de Edson na unidade Marechal",
        clientBenefits: [
          "Dados contabeis estruturados para analise.",
          "Mais controle sobre desempenho financeiro.",
          "Suporte tecnico para decisoes com seguranca."
        ]
      }
    ]
  }
};
