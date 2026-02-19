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
  title: "Destaques da Calcont",
  description: "Diferenciais que combinam governança contábil, velocidade operacional e atendimento consultivo.",
  items: [
    {
      id: "highlight-1",
      title: "Governança e conformidade",
      description: "Processos padronizados para reduzir risco e manter previsibilidade fiscal.",
      icon: "ShieldCheck",
      emphasis: "Menos risco operacional"
    },
    {
      id: "highlight-2",
      title: "Leitura gerencial clara",
      description: "Informações objetivas para apoiar decisões financeiras com mais confiança.",
      icon: "TrendingUp",
      emphasis: "Decisão com dados"
    },
    {
      id: "highlight-3",
      title: "Prazos sob controle",
      description: "Ritmo de entrega consistente para manter sua operação em dia com o calendário.",
      icon: "Clock3",
      emphasis: "Rotina previsível"
    },
    {
      id: "highlight-4",
      title: "Equipe especializada",
      description: "Atendimento próximo com profissionais experientes em diferentes segmentos.",
      icon: "Users",
      emphasis: "Apoio consultivo"
    },
    {
      id: "highlight-5",
      title: "Documentação organizada",
      description: "Fluxo de documentos com rastreabilidade para auditoria e acompanhamento.",
      icon: "FileCheck",
      emphasis: "Controle e histórico"
    },
    {
      id: "highlight-6",
      title: "Canal direto",
      description: "Contato rápido para resolver dúvidas e agilizar demandas prioritárias.",
      icon: "MessageCircle",
      emphasis: "Resposta objetiva"
    }
  ]
};
