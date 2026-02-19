export type HighlightIconName = "ShieldCheck" | "TrendingUp" | "Clock3" | "Users" | "FileCheck" | "MessageCircle";

export type HighlightItem = {
  id: string;
  title: string;
  description: string;
  icon: HighlightIconName;
  emphasis?: string;
};

export type HighlightsContent = {
  title: string;
  description: string;
  items: HighlightItem[];
};

export const highlightsContent: HighlightsContent = {
  title: "Destaques Calcont",
  description: "Diferenciais que combinam governanca contabil, velocidade operacional e atendimento consultivo.",
  items: [
    {
      id: "highlight-1",
      title: "Governanca e conformidade",
      description: "Processos padronizados para reduzir risco e manter previsibilidade fiscal.",
      icon: "ShieldCheck",
      emphasis: "Menos risco operacional"
    },
    {
      id: "highlight-2",
      title: "Leitura gerencial clara",
      description: "Informacoes objetivas para apoiar decisoes financeiras com mais confianca.",
      icon: "TrendingUp",
      emphasis: "Decisao com dados"
    },
    {
      id: "highlight-3",
      title: "Prazos sob controle",
      description: "Ritmo de entrega consistente para manter sua operacao em dia com o calendario.",
      icon: "Clock3",
      emphasis: "Rotina previsivel"
    },
    {
      id: "highlight-4",
      title: "Equipe especializada",
      description: "Atendimento proximo com profissionais experientes em diferentes segmentos.",
      icon: "Users",
      emphasis: "Apoio consultivo"
    },
    {
      id: "highlight-5",
      title: "Documentacao organizada",
      description: "Fluxo de documentos com rastreabilidade para auditoria e acompanhamento.",
      icon: "FileCheck",
      emphasis: "Controle e historico"
    },
    {
      id: "highlight-6",
      title: "Canal direto",
      description: "Contato rapido para resolver duvidas e agilizar demandas prioritarias.",
      icon: "MessageCircle",
      emphasis: "Resposta objetiva"
    }
  ]
};
