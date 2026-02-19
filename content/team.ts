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
  title: "Equipe por cidade",
  description: "Estrutura de equipe separada por unidade para facilitar a manutenção dos dados.",
  emptyStateLabel: "Equipe em atualização.",
  cityLabels: {
    maceio: "Maceió",
    marechal: "Marechal"
  },
  members: [
    { name: "Cleiton", role: "Gerência", city: "maceio" },
    { name: "Joeline", role: "Gerência", city: "maceio" },
    { name: "Niure", role: "Fiscal", city: "maceio" },
    { name: "Jurandir", role: "Trabalhista", city: "maceio" },
    { name: "Edson", role: "Contábil", city: "maceio" },
    { name: "Ruan", role: "Gerência", city: "marechal" },
    { name: "Antonio Carlos", role: "Fiscal", city: "marechal" },
    { name: "Stefani", role: "Trabalhista", city: "marechal" },
    { name: "Edson", role: "Contábil", city: "marechal" }
  ]
};
