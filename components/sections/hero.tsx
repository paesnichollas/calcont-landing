"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { heroContent } from "@/content/landing";
import { siteLinks } from "@/content/links";
import { trackEvent } from "@/lib/analytics";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { fadeUp, stagger, shouldReduceMotion } = useRevealMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.05]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const backgroundTranslateY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroSlides = heroContent.heroSlides ?? [];
  const firstSlideId = heroSlides[0]?.id;
  const backgroundSrc = heroContent.heroBackgroundSrc || heroContent.heroImageSrc;
  const backgroundAlt = heroContent.heroBackgroundAlt || heroContent.heroImageAlt;

  return (
    <ScrollRevealSection id="inicio" className="relative isolate overflow-hidden border-b border-border/70" variants={stagger}>
      <motion.div
        className="absolute inset-0"
        aria-hidden
        style={
          shouldReduceMotion
            ? undefined
            : {
                opacity: backgroundOpacity,
                scale: backgroundScale,
                y: backgroundTranslateY
              }
        }
      >
        <Image
          src={backgroundSrc}
          alt={backgroundAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/75" />
        <div className="absolute inset-0 bg-hero-vignette" />
      </motion.div>

      <div ref={heroRef} className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-10 md:px-6 md:pb-16 md:pt-16">
        <div className="pointer-events-none absolute left-1/2 top-2 h-64 w-64 -translate-x-1/2 rounded-full bg-hero-glow blur-3xl md:top-0 md:h-80 md:w-80" />

        <div className="relative grid gap-6 md:grid-cols-2 md:items-center">
          <motion.div variants={fadeUp}>
            <Card className="border-border/60 bg-card/80 backdrop-blur-sm transition-colors duration-200 hover:border-primary/35 supports-[backdrop-filter]:bg-card/65">
              <CardHeader className="space-y-4">
                {heroContent.eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{heroContent.eyebrow}</p>
                ) : null}
                {heroContent.title ? <CardTitle className="text-2xl leading-tight md:text-4xl">{heroContent.title}</CardTitle> : null}
                {heroContent.description ? (
                  <CardDescription className="text-sm md:text-base">{heroContent.description}</CardDescription>
                ) : null}
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
            <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/80 p-3 backdrop-blur-sm transition-colors duration-200 hover:border-primary/35 supports-[backdrop-filter]:bg-card/65">
              {heroSlides.length > 0 ? (
                <Carousel opts={{ align: "start", loop: false }} className="w-full">
                  <CarouselContent className="-ml-0">
                    {heroSlides.map((slide) => (
                      <CarouselItem key={slide.id} className="pl-0">
                        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                          <Image
                            src={slide.src}
                            alt={slide.alt}
                            fill
                            sizes="(min-width: 768px) 42vw, 92vw"
                            priority={slide.id === firstSlideId}
                            className="object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>

                  {heroSlides.length > 1 ? (
                    <>
                      <CarouselPrevious className="left-3 top-auto bottom-3 h-9 w-9 translate-y-0" />
                      <CarouselNext className="left-14 right-auto top-auto bottom-3 h-9 w-9 translate-y-0" />
                    </>
                  ) : null}
                </Carousel>
              ) : (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={heroContent.heroImageSrc}
                    alt={heroContent.heroImageAlt}
                    fill
                    sizes="(min-width: 768px) 42vw, 92vw"
                    priority
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </ScrollRevealSection>
  );
}
