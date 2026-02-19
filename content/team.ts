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
  description: "Profissionais distribuidos por unidade para garantir atendimento proximo e execucao consistente.",
  emptyStateLabel: "Equipe em atualizacao.",
  fallbackDescription: "Profissional da equipe Calcont com atuacao na area.",
  fallbackImageSrc: "/team/placeholder.jpg",
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
        description: "Coordena o planejamento operacional e conecta as frentes contabil, fiscal e trabalhista com foco em previsibilidade.",
        imageSrc: "/team/cleiton.jpg",
        imageAlt: "Retrato profissional de Cleiton"
      },
      {
        name: "Joeline",
        role: "Gerencia",
        description: "Atua na gestao de processos internos e no acompanhamento de entregas para manter o padrao de qualidade da equipe.",
        imageSrc: "/team/joeline.jpg",
        imageAlt: "Retrato profissional de Joeline"
      },
      {
        name: "Niure",
        role: "Fiscal",
        description: "Responsavel pela rotina fiscal e pelo monitoramento de obrigacoes, mantendo conformidade e seguranca tributaria.",
        imageSrc: "/team/niure.jpg",
        imageAlt: "Retrato profissional de Niure"
      },
      {
        name: "Jurandir",
        role: "Trabalhista",
        description: "Conduz processos trabalhistas e orienta clientes na administracao de folha e encargos com eficiencia e controle.",
        imageSrc: "/team/jurandir.jpg",
        imageAlt: "Retrato profissional de Jurandir"
      },
      {
        name: "Edson",
        role: "Contabil",
        description: "Cuida da consistencia contabil e apoia analises gerenciais para decisoes financeiras mais seguras.",
        imageSrc: "/team/edson-maceio.jpg",
        imageAlt: "Retrato profissional de Edson na unidade Maceio"
      }
    ],
    marechal: [
      {
        name: "Ruan",
        role: "Gerencia",
        description: "Lidera a unidade de Marechal e organiza a execucao diaria com foco em relacionamento e resultado.",
        imageSrc: "/team/ruan.jpg",
        imageAlt: "Retrato profissional de Ruan"
      },
      {
        name: "Antonio Carlos",
        role: "Fiscal",
        description: "Atua no acompanhamento fiscal e na validacao das obrigacoes para manter regularidade e estabilidade operacional.",
        imageSrc: "/team/antonio-carlos.jpg",
        imageAlt: "Retrato profissional de Antonio Carlos"
      },
      {
        name: "Stefani",
        role: "Trabalhista",
        description: "Conduz rotinas trabalhistas e assegura cumprimento de prazos, documentos e orientacoes legais no dia a dia.",
        imageSrc: "/team/stefani.jpg",
        imageAlt: "Retrato profissional de Stefani"
      },
      {
        name: "Edson",
        role: "Contabil",
        description: "Apoia a rotina contabil da unidade com organizacao tecnica e acompanhamento continuo de indicadores.",
        imageSrc: "/team/edson-marechal.jpg",
        imageAlt: "Retrato profissional de Edson na unidade Marechal"
      }
    ]
  }
};
