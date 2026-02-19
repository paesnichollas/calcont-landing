export type TeamCity = "maceio" | "marechal";

export type TeamMember = {
  name: string;
  role: string;
  city: TeamCity;
};

export type TeamContent = {
  title: string;
  description: string;
  emptyStateLabel: string;
  cityLabels: Record<TeamCity, string>;
  members: TeamMember[];
};

export const teamContent: TeamContent = {
  title: "Time por cidade",
  description: "Estrutura de equipe separada por unidade para facilitar manutencao dos dados.",
  emptyStateLabel: "Equipe em atualizacao.",
  cityLabels: {
    maceio: "Maceio",
    marechal: "Marechal"
  },
  members: [
    { name: "Cleiton", role: "Gerencia", city: "maceio" },
    { name: "Joeline", role: "Gerencia", city: "maceio" },
    { name: "Niure", role: "Fiscal", city: "maceio" },
    { name: "Jurandir", role: "Trabalhista", city: "maceio" },
    { name: "Edson", role: "Contabil", city: "maceio" },
    { name: "Ruan", role: "Gerencia", city: "marechal" },
    { name: "Antonio Carlos", role: "Fiscal", city: "marechal" },
    { name: "Stefani", role: "Trabalhista", city: "marechal" },
    { name: "Edson", role: "Contabil", city: "marechal" }
  ]
};
