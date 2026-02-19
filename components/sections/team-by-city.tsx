import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamContent, type TeamCity } from "@/content/team";

function getMembersByCity(city: TeamCity) {
  return teamContent.members.filter((member) => member.city === city);
}

export function TeamByCitySection() {
  const maceioTeam = getMembersByCity("maceio");
  const marechalTeam = getMembersByCity("marechal");

  return (
    <section id="equipe" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-6 space-y-2 md:mb-8">
        {teamContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{teamContent.title}</h2> : null}
        {teamContent.description ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{teamContent.description}</p> : null}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/70 bg-card/70">
          <CardHeader>
            <CardTitle className="text-lg">{teamContent.cityLabels.maceio}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {maceioTeam.length > 0 ? (
              maceioTeam.map((member) => (
                <p key={`${member.city}-${member.name}-${member.role}`} className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{member.name}</span> - {member.role}
                </p>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">{teamContent.emptyStateLabel}</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/70 bg-card/70">
          <CardHeader>
            <CardTitle className="text-lg">{teamContent.cityLabels.marechal}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {marechalTeam.length > 0 ? (
              marechalTeam.map((member) => (
                <p key={`${member.city}-${member.name}-${member.role}`} className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">{member.name}</span> - {member.role}
                </p>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">{teamContent.emptyStateLabel}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
