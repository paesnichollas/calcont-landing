import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { servicesContent } from "@/content/services";

export function ServicesSection() {
  const items = servicesContent.items ?? [];

  return (
    <section id="servicos" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-6 space-y-2 md:mb-8">
        {servicesContent.badge ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{servicesContent.badge}</p> : null}
        {servicesContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{servicesContent.title}</h2> : null}
        {servicesContent.description ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{servicesContent.description}</p> : null}
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="border-border/70 bg-card/70">
              <CardHeader className="space-y-2">
                {item.title ? <CardTitle className="text-lg">{item.title}</CardTitle> : null}
                {item.summary ? <CardDescription>{item.summary}</CardDescription> : null}
              </CardHeader>
              {item.details ? (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.details}</p>
                </CardContent>
              ) : null}
            </Card>
          ))}
        </div>
      ) : null}
    </section>
  );
}
