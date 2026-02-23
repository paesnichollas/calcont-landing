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
  eyebrow: string;
  title: string;
  description: string;
  emptyStateLabelNoCity: string;
  emptyStateLabelCityWithoutMembers: string;
  fallbackMemberName: string;
  fallbackMemberRole: string;
  fallbackDescription: string;
  fallbackImageSrc: string;
  fallbackBenefitLine: string;
  fallbackBenefits: string[];
  benefitsTitle: string;
  membersCountSuffix: string;
  cityLabels: Record<TeamCity, string>;
  cityHighlights: Record<TeamCity, string>;
  membersByCity: Record<TeamCity, TeamMember[]>;
};

export const teamContent: TeamContent = {
  eyebrow: "Equipe",
  title: "Equipe por cidade",
  description: "Profissionais distribuídos por unidade para garantir atendimento próximo e execução consistente.",
  emptyStateLabelNoCity: "Selecione uma cidade para ver a equipe.",
  emptyStateLabelCityWithoutMembers: "Equipe em atualização para esta cidade.",
  fallbackMemberName: "Integrante Calcont",
  fallbackMemberRole: "Equipe Calcont",
  fallbackDescription: "Profissional da equipe Calcont com atuação na área.",
  fallbackImageSrc: "/team/placeholder.svg",
  fallbackBenefitLine: "Acompanhamento próximo da equipe Calcont.",
  fallbackBenefits: [
    "Orientação técnica aplicada ao seu contexto.",
    "Mais previsibilidade para decisões mensais.",
    "Acompanhamento próximo de prazos e obrigações."
  ],
  benefitsTitle: "Benefícios para o cliente",
  membersCountSuffix: "especialistas",
  cityLabels: {
    maceio: "Maceió",
    marechal: "Marechal"
  },
  cityHighlights: {
    maceio: "Operação central com foco estratégico e integração entre frentes.",
    marechal: "Atendimento regional com execução fiscal, contábil e trabalhista dedicada."
  },
  membersByCity: {
    maceio: [
      {
        name: "Cleiton",
        role: "Gerência",
        description:
          "Coordena o planejamento operacional e conecta as frentes contábil, fiscal e trabalhista com foco em previsibilidade.",
        imageSrc: "/team/cleiton.jpg",
        imageAlt: "Retrato profissional de Cleiton",
        clientBenefits: [
          "Fluxo operacional alinhado entre setores.",
          "Mais previsibilidade de entregas mensais.",
          "Decisões com suporte de indicadores confiáveis."
        ]
      },
      {
        name: "Joeline",
        role: "Gerência",
        description:
          "Atua na gestão de processos internos e no acompanhamento de entregas para manter o padrão de qualidade da equipe.",
        imageSrc: "/team/joeline.jpg",
        imageAlt: "Retrato profissional de Joeline",
        clientBenefits: [
          "Padrão de atendimento mantido em cada etapa.",
          "Organização de prazos sem retrabalho.",
          "Resposta mais rápida para demandas do dia a dia."
        ]
      },
      {
        name: "Niure",
        role: "Fiscal",
        description:
          "Responsável pela rotina fiscal e pelo monitoramento de obrigações, mantendo conformidade e segurança tributária.",
        imageSrc: "/team/niure.jpg",
        imageAlt: "Retrato profissional de Niure",
        clientBenefits: [
          "Redução de riscos em obrigações fiscais.",
          "Acompanhamento contínuo de prazos legais.",
          "Mais segurança na apuração de tributos."
        ]
      },
      {
        name: "Jurandir",
        role: "Trabalhista",
        description:
          "Conduz processos trabalhistas e orienta clientes na administração de folha e encargos com eficiência e controle.",
        imageSrc: "/team/jurandir.jpg",
        imageAlt: "Retrato profissional de Jurandir",
        clientBenefits: [
          "Folha e encargos organizados com consistência.",
          "Orientação clara para rotinas de equipe.",
          "Menos risco em processos trabalhistas."
        ]
      },
      {
        name: "Edson",
        role: "Contábil",
        description:
          "Cuida da consistência contábil e apoia análises gerenciais para decisões financeiras mais seguras.",
        imageSrc: "/team/edson-maceio.jpg",
        imageAlt: "Retrato profissional de Edson na unidade Maceió",
        clientBenefits: [
          "Visão contábil mais clara para a gestão.",
          "Base técnica para decisões financeiras.",
          "Acompanhamento próximo da saúde do negócio."
        ]
      }
    ],
    marechal: [
      {
        name: "Ruan",
        role: "Gerência",
        description: "Lidera a unidade de Marechal e organiza a execução diária com foco em relacionamento e resultado.",
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
          "Atua no acompanhamento fiscal e na validação das obrigações para manter regularidade e estabilidade operacional.",
        imageSrc: "/team/antonio-carlos.jpg",
        imageAlt: "Retrato profissional de Antonio Carlos",
        clientBenefits: [
          "Obrigações fiscais monitoradas em tempo.",
          "Mais estabilidade para a operação mensal.",
          "Menor chance de penalidades por atraso."
        ]
      },
      {
        name: "Stefani",
        role: "Trabalhista",
        description:
          "Conduz rotinas trabalhistas e assegura cumprimento de prazos, documentos e orientações legais no dia a dia.",
        imageSrc: "/team/stefani.jpg",
        imageAlt: "Retrato profissional de Stefani",
        clientBenefits: [
          "Rotinas de pessoal conduzidas com precisão.",
          "Orientação objetiva para cumprimento legal.",
          "Apoio contínuo em demandas trabalhistas."
        ]
      },
      {
        name: "Edson",
        role: "Contábil",
        description:
          "Apoia a rotina contábil da unidade com organização técnica e acompanhamento contínuo de indicadores.",
        imageSrc: "/team/edson-marechal.jpg",
        imageAlt: "Retrato profissional de Edson na unidade Marechal",
        clientBenefits: [
          "Dados contábeis estruturados para análise.",
          "Mais controle sobre desempenho financeiro.",
          "Suporte técnico para decisões com segurança."
        ]
      }
    ]
  }
};
