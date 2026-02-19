export type TeamCity = "maceio" | "marechal";

export type TeamMember = {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export type TeamContent = {
  title: string;
  description: string;
  emptyStateLabel: string;
  fallbackDescription: string;
  fallbackImageSrc: string;
  cityLabels: Record<TeamCity, string>;
  cityHighlights: Record<TeamCity, string>;
  membersByCity: Record<TeamCity, TeamMember[]>;
};

export const teamContent: TeamContent = {
  title: "Equipe por cidade",
  description: "Profissionais distribuídos por unidade para garantir atendimento próximo e execução consistente.",
  emptyStateLabel: "Equipe em atualização.",
  fallbackDescription: "Profissional da equipe Calcont com atuação na área.",
  fallbackImageSrc: "/team/placeholder.jpg",
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
        description: "Coordena o planejamento operacional e conecta as frentes contábil, fiscal e trabalhista com foco em previsibilidade.",
        imageSrc: "/team/cleiton.jpg",
        imageAlt: "Retrato profissional de Cleiton"
      },
      {
        name: "Joeline",
        role: "Gerência",
        description: "Atua na gestão de processos internos e no acompanhamento de entregas para manter o padrão de qualidade da equipe.",
        imageSrc: "/team/joeline.jpg",
        imageAlt: "Retrato profissional de Joeline"
      },
      {
        name: "Niure",
        role: "Fiscal",
        description: "Responsável pela rotina fiscal e pelo monitoramento de obrigações, mantendo conformidade e segurança tributária.",
        imageSrc: "/team/niure.jpg",
        imageAlt: "Retrato profissional de Niure"
      },
      {
        name: "Jurandir",
        role: "Trabalhista",
        description: "Conduz processos trabalhistas e orienta clientes na administração de folha e encargos com eficiência e controle.",
        imageSrc: "/team/jurandir.jpg",
        imageAlt: "Retrato profissional de Jurandir"
      },
      {
        name: "Edson",
        role: "Contábil",
        description: "Cuida da consistência contábil e apoia análises gerenciais para decisões financeiras mais seguras.",
        imageSrc: "/team/edson-maceio.jpg",
        imageAlt: "Retrato profissional de Edson na unidade Maceió"
      }
    ],
    marechal: [
      {
        name: "Ruan",
        role: "Gerência",
        description: "Lidera a unidade de Marechal e organiza a execução diária com foco em relacionamento e resultado.",
        imageSrc: "/team/ruan.jpg",
        imageAlt: "Retrato profissional de Ruan"
      },
      {
        name: "Antonio Carlos",
        role: "Fiscal",
        description: "Atua no acompanhamento fiscal e na validação das obrigações para manter regularidade e estabilidade operacional.",
        imageSrc: "/team/antonio-carlos.jpg",
        imageAlt: "Retrato profissional de Antonio Carlos"
      },
      {
        name: "Stefani",
        role: "Trabalhista",
        description: "Conduz rotinas trabalhistas e assegura cumprimento de prazos, documentos e orientações legais no dia a dia.",
        imageSrc: "/team/stefani.jpg",
        imageAlt: "Retrato profissional de Stefani"
      },
      {
        name: "Edson",
        role: "Contábil",
        description: "Apoia a rotina contábil da unidade com organização técnica e acompanhamento contínuo de indicadores.",
        imageSrc: "/team/edson-marechal.jpg",
        imageAlt: "Retrato profissional de Edson na unidade Marechal"
      }
    ]
  }
};
