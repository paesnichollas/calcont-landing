"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { heroContent } from "@/content/landing";
import { siteLinks } from "@/content/links";
import { trackEvent } from "@/lib/analytics";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

export function HeroSection() {
  const { fadeUp, stagger } = useRevealMotion();

  return (
    <ScrollRevealSection
      id="inicio"
      className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 md:px-6 md:pb-16 md:pt-16"
      variants={stagger}
    >
      <div className="grid gap-6 md:grid-cols-2 md:items-center">
        <motion.div variants={fadeUp}>
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
                <a
                  href={siteLinks.clientPortalLoginUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("click_ja_sou_cliente", { source: "hero" })}
                >
                  {heroContent.primaryCtaLabel}
                </a>
              </Button>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <a
                  href={siteLinks.clientPortalSignupUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("click_ainda_nao_sou_cliente", { source: "hero" })}
                >
                  {heroContent.secondaryCtaLabel}
                </a>
              </Button>
              <Button asChild variant="ghost" className="w-full sm:w-auto">
                <a
                  href={siteLinks.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("click_whatsapp", { source: "hero" })}
                >
                  {heroContent.tertiaryCtaLabel}
                </a>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeUp}>
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
        </motion.div>
      </div>
    </ScrollRevealSection>
  );
}
