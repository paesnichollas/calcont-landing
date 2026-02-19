"use client";

import { motion } from "framer-motion";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { signatureContent } from "@/content/signature";
import { siteLinks } from "@/content/links";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

function resolveSignatureCta() {
  if (signatureContent.ctaTarget === "portal_login") {
    return {
      href: siteLinks.clientPortalLoginUrl,
      eventName: "click_ja_sou_cliente" as AnalyticsEventName
    };
  }

  return {
    href: siteLinks.whatsappUrl,
    eventName: "click_whatsapp" as AnalyticsEventName
  };
}

export function SignatureBandSection() {
  const { fadeUp } = useRevealMotion();
  const cta = resolveSignatureCta();

  if (!signatureContent.text && !signatureContent.ctaLabel) {
    return null;
  }

  return (
    <ScrollRevealSection id="assinatura" className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <motion.div variants={fadeUp} className="rounded-xl border border-primary/35 bg-primary px-4 py-4 md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {signatureContent.text ? (
            <p className="text-sm font-medium text-primary-foreground md:text-base">{signatureContent.text}</p>
          ) : null}

          <Button
            asChild
            size="sm"
            variant="outline"
            className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
          >
            <a
              href={cta.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent(cta.eventName, { source: "signature_band" })}
            >
              {signatureContent.ctaLabel}
            </a>
          </Button>
        </div>
      </motion.div>
    </ScrollRevealSection>
  );
}
