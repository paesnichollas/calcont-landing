import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ctaContent } from "@/content/landing";
import { siteLinks } from "@/content/links";

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <Card className="border-border/70 bg-card/70">
        <CardHeader className="space-y-2">
          {ctaContent.title ? <CardTitle className="text-2xl md:text-3xl">{ctaContent.title}</CardTitle> : null}
          {ctaContent.description ? <CardDescription className="text-sm md:text-base">{ctaContent.description}</CardDescription> : null}
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="w-full sm:w-auto">
            <a href={siteLinks.onvio} target="_blank" rel="noreferrer">
              {ctaContent.primaryCtaLabel}
            </a>
          </Button>
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <a href={siteLinks.whatsapp} target="_blank" rel="noreferrer">
              {ctaContent.secondaryCtaLabel}
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
