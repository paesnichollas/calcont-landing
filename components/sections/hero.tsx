"use client";

import { type ReactNode, useRef } from "react";
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
import { Eyebrow } from "@/components/typography/eyebrow";
import { landingCopy } from "@/content/copy";
import { heroContent } from "@/content/landing";
import { siteLinks } from "@/content/links";
import { track } from "@/lib/analytics";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

function normalizeCopyItems(items?: string[]) {
  return (items ?? []).map((item) => item.trim()).filter((item) => item.length > 0);
}

function escapeForRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderTitleWithEmphasis(title: string, keywords: string[]): ReactNode {
  const normalizedKeywords = normalizeCopyItems(keywords);

  if (!title || normalizedKeywords.length === 0) {
    return title;
  }

  const uniqueKeywords = [...new Set(normalizedKeywords)].sort((first, second) => second.length - first.length);
  const titleMatchPattern = new RegExp(`(${uniqueKeywords.map(escapeForRegex).join("|")})`, "gi");

  return title.split(titleMatchPattern).map((chunk, index) => {
    const isKeyword = uniqueKeywords.some((keyword) => keyword.toLowerCase() === chunk.toLowerCase());

    if (!isKeyword) {
      return <span key={`${chunk}-${index}`}>{chunk}</span>;
    }

    return (
      <span key={`${chunk}-${index}`} className="font-semibold text-primary [text-shadow:0_0_18px_hsl(var(--primary)/0.2)]">
        {chunk}
      </span>
    );
  });
}

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

  const heroCopy = landingCopy.hero;
  const eyebrow = heroCopy.eyebrow.trim() || heroContent.eyebrow;
  const title = heroCopy.title.trim() || heroContent.title;
  const description = heroCopy.description.trim() || heroContent.description;
  const primaryCtaLabel = heroCopy.primaryCtaLabel.trim() || heroContent.primaryCtaLabel;
  const secondaryCtaLabel = heroCopy.secondaryCtaLabel.trim() || heroContent.secondaryCtaLabel;
  const tertiaryCtaLabel = heroCopy.tertiaryCtaLabel.trim() || heroContent.tertiaryCtaLabel;
  const copyBenefits = normalizeCopyItems(heroCopy.benefits);
  const fallbackBenefits = normalizeCopyItems(heroContent.benefits);
  const benefits = copyBenefits.length > 0 ? copyBenefits : fallbackBenefits;
  const copyTitleEmphasisKeywords = normalizeCopyItems(heroCopy.titleEmphasisKeywords);
  const fallbackTitleEmphasisKeywords = normalizeCopyItems(heroContent.titleEmphasisKeywords);
  const titleEmphasisKeywords = copyTitleEmphasisKeywords.length > 0 ? copyTitleEmphasisKeywords : fallbackTitleEmphasisKeywords;
  const socialProof = heroCopy.socialProof.trim() || heroContent.socialProof;

  return (
    <ScrollRevealSection id="inicio" className="relative isolate overflow-x-clip border-b border-border/70" variants={stagger}>
      <motion.div
        className="pointer-events-none absolute inset-x-0 -top-8 -bottom-24 z-0 md:-bottom-36"
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
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-b from-transparent to-background md:h-48" />
      </motion.div>

      <div ref={heroRef} className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-14 pt-12 md:px-6 md:pb-20 md:pt-20">
        <div className="pointer-events-none absolute left-1/2 top-3 h-72 w-72 -translate-x-1/2 rounded-full bg-hero-glow blur-3xl md:top-0 md:h-96 md:w-96" />

        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <motion.div
            variants={fadeUp}
            whileHover={shouldReduceMotion ? undefined : { y: -2 }}
            transition={shouldReduceMotion ? undefined : { type: "spring", stiffness: 280, damping: 24, mass: 0.9 }}
          >
            <div className="HeroCardRoot relative isolate">
              <div
                className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_18%_18%,hsl(var(--primary)/0.22)_0%,hsl(var(--primary)/0)_68%)] blur-3xl"
                aria-hidden
              />

              <Card className="hero-card-premium relative overflow-hidden rounded-2xl border-transparent bg-transparent shadow-none hover:border-transparent hover:bg-transparent hover:shadow-none focus-within:border-transparent focus-within:bg-transparent focus-within:shadow-none">
                <CardHeader className="HeroCardHeader relative z-10 space-y-0 p-6 md:p-8">
                  {eyebrow ? <Eyebrow className="mb-4 text-primary/92">{eyebrow}</Eyebrow> : null}
                  {title ? (
                    <CardTitle className="HeroCardTitle mb-4 text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-[2.85rem]">
                      {renderTitleWithEmphasis(title, titleEmphasisKeywords)}
                    </CardTitle>
                  ) : null}
                  {description ? (
                    <CardDescription className="HeroCardSubtitle max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {description}
                    </CardDescription>
                  ) : null}
                </CardHeader>

                <CardContent className="relative z-10 flex flex-col gap-5 p-6 pt-0 md:p-8 md:pt-0">
                  {benefits.length > 0 ? (
                    <ul className="HeroCardBullets grid gap-2.5 text-sm text-foreground/90 lg:grid-cols-2" aria-label="Benefícios estratégicos">
                      {benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2 rounded-md border border-border/65 bg-background/25 px-3 py-2.5 leading-snug"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/90" aria-hidden />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="HeroCardCTAs flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    <Button
                      asChild
                      className="group relative w-full justify-center overflow-hidden rounded-lg border border-primary/45 bg-gradient-to-r from-primary via-primary to-primary/80 px-5 text-primary-foreground shadow-[0_16px_34px_-18px_hsl(var(--primary)/0.95),0_1px_0_hsl(var(--primary)/0.5)_inset] transition-[transform,box-shadow,filter] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:brightness-105 motion-safe:hover:shadow-[0_22px_42px_-18px_hsl(var(--primary)/0.95),0_1px_0_hsl(var(--primary)/0.65)_inset] motion-safe:active:translate-y-0 motion-safe:active:brightness-100 motion-safe:active:shadow-[0_12px_24px_-18px_hsl(var(--primary)/0.95),0_1px_0_hsl(var(--primary)/0.42)_inset] focus-visible:ring-primary/70 focus-visible:ring-offset-background sm:w-auto sm:min-w-56"
                    >
                      <a
                        href={siteLinks.clientPortalSignupUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Falar com um especialista da Calcont"
                        onClick={() => track("click_ainda_nao_sou_cliente", { source: "hero" })}
                      >
                        <span className="relative z-10">{primaryCtaLabel}</span>
                        <span
                          aria-hidden
                          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-primary-foreground/30 to-transparent opacity-0 transition-[transform,opacity] duration-500 ease-out motion-safe:group-hover:translate-x-[320%] motion-safe:group-hover:opacity-100"
                        />
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full rounded-lg border-border/70 bg-background/30 px-5 text-foreground shadow-[0_14px_28px_-22px_hsl(var(--foreground)/0.9)] transition-[transform,border-color,background-color,box-shadow] duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:border-primary/45 motion-safe:hover:bg-primary/10 motion-safe:hover:shadow-[0_18px_34px_-24px_hsl(var(--foreground)/0.95)] motion-safe:active:translate-y-0 focus-visible:ring-primary/60 focus-visible:ring-offset-background sm:w-auto sm:min-w-44"
                    >
                      <a
                        href={siteLinks.clientPortalLoginUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Acessar área de cliente da Calcont"
                        onClick={() => track("click_ja_sou_cliente", { source: "hero" })}
                      >
                        {secondaryCtaLabel}
                      </a>
                    </Button>
                  </div>

                  <div className="HeroCardMeta flex flex-col gap-2 border-t border-border/60 pt-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="h-auto w-fit rounded-md px-0 py-0.5 text-sm font-medium text-foreground/90 underline-offset-4 transition-colors duration-200 hover:bg-transparent hover:text-primary hover:underline focus-visible:ring-primary/60 focus-visible:ring-offset-background"
                    >
                      <a
                        href={siteLinks.whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Falar no WhatsApp com a Calcont"
                        onClick={() => track("click_whatsapp", { source: "hero" })}
                      >
                        {tertiaryCtaLabel}
                      </a>
                    </Button>

                    {socialProof ? (
                      <p className="max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">{socialProof}</p>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/85 p-3 shadow-soft backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-border hover:shadow-lift focus-within:-translate-y-0.5 focus-within:border-border focus-within:shadow-lift supports-[backdrop-filter]:bg-card/72">
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
