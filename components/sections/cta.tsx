"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow } from "@/components/typography/eyebrow";
import { landingCopy } from "@/content/copy";
import { ctaContent } from "@/content/landing";
import { siteLinks } from "@/content/links";
import { track } from "@/lib/analytics";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

export function CtaSection() {
  const { fadeUp, stagger, shouldReduceMotion } = useRevealMotion();
  const hoverMotion = shouldReduceMotion ? undefined : { y: -2, scale: 1.01 };

  const closingCtaCopy = landingCopy.closingCta;
  const eyebrow = closingCtaCopy.eyebrow.trim() || ctaContent.eyebrow.trim();
  const title = closingCtaCopy.title.trim() || ctaContent.title;
  const description = closingCtaCopy.description.trim() || ctaContent.description;
  const primaryCtaLabel = closingCtaCopy.primaryCtaLabel.trim() || ctaContent.primaryCtaLabel;
  const secondaryCtaLabel = closingCtaCopy.secondaryCtaLabel.trim() || ctaContent.secondaryCtaLabel;
  const tertiaryCtaLabel = closingCtaCopy.tertiaryCtaLabel.trim() || ctaContent.tertiaryCtaLabel;

  return (
    <ScrollRevealSection id="contato" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <motion.div
        variants={fadeUp}
        whileHover={hoverMotion}
        whileFocus={hoverMotion}
        transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Card className="bg-card/70">
          <CardHeader className="space-y-0">
            {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
            {title ? <CardTitle className="mb-4 text-2xl md:text-3xl">{title}</CardTitle> : null}
            {description ? (
              <CardDescription className="max-w-2xl text-sm text-muted-foreground md:text-base">{description}</CardDescription>
            ) : null}
          </CardHeader>
          <CardContent className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="w-full sm:w-auto">
              <a
                href={siteLinks.clientPortalLoginUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("click_ja_sou_cliente", { source: "cta" })}
              >
                {primaryCtaLabel}
              </a>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <a
                href={siteLinks.clientPortalSignupUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("click_ainda_nao_sou_cliente", { source: "cta" })}
              >
                {secondaryCtaLabel}
              </a>
            </Button>
            <Button asChild variant="ghost" className="w-full sm:w-auto">
              <a
                href={siteLinks.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => track("click_whatsapp", { source: "cta" })}
              >
                {tertiaryCtaLabel}
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </ScrollRevealSection>
  );
}
