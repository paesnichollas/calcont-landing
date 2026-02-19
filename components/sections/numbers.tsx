import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numbersContent } from "@/content/numbers";

export function NumbersSection() {
  const items = numbersContent.items ?? [];

  return (
    <section id="numeros" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-6 space-y-2 md:mb-8">
        {numbersContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{numbersContent.title}</h2> : null}
        {numbersContent.description ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{numbersContent.description}</p> : null}
      </div>

      {items.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Card key={item.id} className="border-border/70 bg-card/70">
              <CardHeader>
                {item.label ? <CardTitle className="text-sm uppercase tracking-[0.08em] text-muted-foreground">{item.label}</CardTitle> : null}
              </CardHeader>
              <CardContent>
                {item.value ? <p className="text-3xl font-semibold tracking-tight">{item.value}</p> : null}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : null}
    </section>
  );
}
