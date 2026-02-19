import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { heroContent } from "@/content/landing";
import { siteLinks } from "@/content/links";

export function HeroSection() {
  return (
    <section id="inicio" className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 md:px-6 md:pb-16 md:pt-16">
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <Card className="border-border/70 bg-card/70">
          <CardHeader className="space-y-4">
            {heroContent.eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{heroContent.eyebrow}</p>
            ) : null}
            {heroContent.title ? <CardTitle className="text-2xl md:text-4xl">{heroContent.title}</CardTitle> : null}
            {heroContent.description ? <CardDescription className="text-sm md:text-base">{heroContent.description}</CardDescription> : null}
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <a href={siteLinks.onvio} target="_blank" rel="noreferrer">
                {heroContent.primaryCtaLabel}
              </a>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <a href={siteLinks.whatsapp} target="_blank" rel="noreferrer">
                {heroContent.secondaryCtaLabel}
              </a>
            </Button>
          </CardContent>
        </Card>

        <div className="relative overflow-hidden rounded-xl border border-border/70 bg-card/60 p-3">
          <Image
            src={heroContent.heroImageSrc}
            alt={heroContent.heroImageAlt}
            width={960}
            height={720}
            priority
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
