"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ctaContent } from "@/content/landing";
import { siteLinks } from "@/content/links";
import { trackEvent } from "@/lib/analytics";

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
            <a
              href={siteLinks.clientPortalLoginUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("click_ja_sou_cliente", { source: "cta" })}
            >
              {ctaContent.primaryCtaLabel}
            </a>
          </Button>
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <a
              href={siteLinks.clientPortalSignupUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("click_ainda_nao_sou_cliente", { source: "cta" })}
            >
              {ctaContent.secondaryCtaLabel}
            </a>
          </Button>
          <Button asChild variant="ghost" className="w-full sm:w-auto">
            <a
              href={siteLinks.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent("click_whatsapp", { source: "cta" })}
            >
              {ctaContent.tertiaryCtaLabel}
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
