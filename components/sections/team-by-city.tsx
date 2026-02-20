"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useEmblaDeckEffects } from "@/components/motion/use-embla-deck-effects";
import { useRevealMotion } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { teamContent, type TeamCity, type TeamMember } from "@/content/team";
import { cn } from "@/lib/utils";

type TeamMemberCardProps = {
  member: TeamMember;
  isActive: boolean;
  fallbackDescription: string;
  fallbackImageSrc: string;
  fallbackBenefits: string[];
  benefitsTitle: string;
};

function TeamMemberCard({
  member,
  isActive,
  fallbackDescription,
  fallbackImageSrc,
  fallbackBenefits,
  benefitsTitle
}: TeamMemberCardProps) {
  const initialImageSrc = member.imageSrc?.trim() ? member.imageSrc : fallbackImageSrc;
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const memberName = member.name?.trim() ? member.name : "Integrante Calcont";
  const memberRole = member.role?.trim() ? member.role : "Equipe Calcont";
  const description = member.description?.trim() || fallbackDescription?.trim() || "Profissional da equipe Calcont.";
  const imageAlt = member.imageAlt?.trim() || memberName;
  const availableBenefits =
    member.clientBenefits?.filter((benefit) => benefit.trim().length > 0).slice(0, 4) ?? [];
  const fallbackBenefitsSafe = fallbackBenefits.filter((benefit) => benefit.trim().length > 0);
  const benefits =
    availableBenefits.length > 0
      ? availableBenefits
      : fallbackBenefitsSafe.length > 0
        ? fallbackBenefitsSafe
        : ["Acompanhamento proximo da equipe Calcont."];
  const safeBenefitsTitle = benefitsTitle.trim() ? benefitsTitle : "Beneficios para o cliente";

  useEffect(() => {
    setImageSrc(initialImageSrc);
  }, [initialImageSrc]);

  return (
    <Card
      className={cn(
        "h-full min-h-[25rem] overflow-hidden bg-gradient-to-b from-card to-card/80",
        isActive
          ? "border-primary/35 shadow-[0_1.6rem_3rem_-1.9rem_hsl(var(--primary)/0.48)]"
          : "border-border/70 shadow-[0_1.2rem_2.3rem_-1.9rem_hsl(var(--background)/0.9)]"
      )}
    >
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 74vw, 320px"
          className="object-cover"
          onError={() => {
            if (imageSrc !== fallbackImageSrc) {
              setImageSrc(fallbackImageSrc);
            }
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />
      </div>

      <CardHeader className="space-y-3 p-4 pb-0 sm:p-5 sm:pb-0">
        <div className="space-y-2">
          <CardTitle className="text-lg leading-tight sm:text-xl">{memberName}</CardTitle>
          <Badge variant="secondary">{memberRole}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4 pt-3 sm:p-5 sm:pt-3">
        <p className="max-h-[4.5rem] overflow-hidden text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary/90">{safeBenefitsTitle}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {benefits.map((benefit, index) => (
              <li key={`${memberName}-${memberRole}-${index}`} className="flex items-start gap-2">
                <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" aria-hidden />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}

export function TeamByCitySection() {
  const cities = useMemo(() => Object.keys(teamContent.cityLabels) as TeamCity[], []);
  const [selectedCity, setSelectedCity] = useState<TeamCity | null>(() => cities[0] ?? null);
  const [activeMemberIndex, setActiveMemberIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const { fadeUp, stagger } = useRevealMotion();
  const shouldReduceMotion = useReducedMotion();

  const splitTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: 0.3, ease: [0.2, 0.65, 0.3, 0.9] as const };

  const activeMembers = selectedCity ? teamContent.membersByCity[selectedCity] ?? [] : [];
  const activeCityLabel = selectedCity ? teamContent.cityLabels[selectedCity] ?? selectedCity : "";
  const { bindSlideRef, resetSlideRefs, applyNow } = useEmblaDeckEffects({
    emblaApi: carouselApi,
    slideCount: activeMembers.length,
    reducedMotion: Boolean(shouldReduceMotion),
    maxParallaxPx: 11,
    maxRotateDeg: 2,
    inactiveScaleMin: 0.93,
    inactiveOpacityMin: 0.68
  });

  useEffect(() => {
    if (selectedCity !== null || cities.length === 0) {
      return;
    }

    setSelectedCity(cities[0] ?? null);
  }, [cities, selectedCity]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const handleSelect = () => {
      setActiveMemberIndex(carouselApi.selectedScrollSnap());
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    handleSelect();
    carouselApi.on("select", handleSelect);
    carouselApi.on("reInit", handleSelect);

    return () => {
      carouselApi.off("select", handleSelect);
      carouselApi.off("reInit", handleSelect);
    };
  }, [carouselApi]);

  useEffect(() => {
    if (selectedCity === null) {
      setActiveMemberIndex(0);
      setCanScrollPrev(false);
      setCanScrollNext(false);
      return;
    }

    setActiveMemberIndex(0);
  }, [selectedCity]);

  useEffect(() => {
    if (!carouselApi || selectedCity === null) {
      return;
    }

    carouselApi.scrollTo(0, true);
    applyNow();
  }, [applyNow, carouselApi, selectedCity]);

  return (
    <ScrollRevealSection id="equipe" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 space-y-2 md:mb-8">
        {teamContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{teamContent.title}</h2> : null}
        {teamContent.description ? (
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">{teamContent.description}</p>
        ) : null}
      </div>

      <Tabs
        value={selectedCity ?? ""}
        onValueChange={(value) => {
          const nextCity = cities.find((city) => city === value);

          if (!nextCity) {
            return;
          }

          resetSlideRefs();
          setSelectedCity(nextCity);
          setCarouselApi(undefined);
          setActiveMemberIndex(0);
          setCanScrollPrev(false);
          setCanScrollNext(false);
        }}
        className="w-full space-y-6"
      >
        <TabsList className="flex h-auto w-full gap-3 bg-transparent p-0">
          {cities.map((city) => {
            const isActive = selectedCity === city;
            const isIdle = selectedCity === null;
            const cityLabel = teamContent.cityLabels[city] || city;
            const cityHighlight = teamContent.cityHighlights[city];
            const splitAnimate = shouldReduceMotion
              ? { flex: 1, opacity: 1 }
              : {
                  flex: isIdle ? 1 : isActive ? 1.25 : 0.75,
                  opacity: isIdle ? 1 : isActive ? 1 : 0.62
                };

            return (
              <motion.div key={city} className="min-w-0" animate={splitAnimate} transition={splitTransition}>
                <TabsTrigger
                  value={city}
                  className="h-full w-full whitespace-normal rounded-2xl border border-border/70 bg-card/55 px-4 py-4 text-left transition-[border-color,background-color,box-shadow,opacity] duration-300 data-[state=active]:border-primary/45 data-[state=active]:bg-card data-[state=active]:opacity-100 data-[state=active]:shadow-[0_1.2rem_2.4rem_-1.7rem_hsl(var(--primary)/0.45)]"
                >
                  <div className="flex w-full flex-col gap-1">
                    <span className="text-base font-semibold text-foreground">{cityLabel}</span>
                    {cityHighlight ? (
                      <span className="text-xs leading-relaxed text-muted-foreground">{cityHighlight}</span>
                    ) : null}
                  </div>
                </TabsTrigger>
              </motion.div>
            );
          })}
        </TabsList>

        {selectedCity === null ? (
          <motion.div variants={fadeUp} className="rounded-2xl border border-border/70 bg-card/40 p-6">
            <p className="text-sm text-muted-foreground">{teamContent.emptyStateLabelNoCity}</p>
          </motion.div>
        ) : activeMembers.length === 0 ? (
          <motion.div variants={fadeUp} className="rounded-2xl border border-border/70 bg-card/40 p-6">
            <p className="text-sm text-muted-foreground">{teamContent.emptyStateLabelCityWithoutMembers}</p>
          </motion.div>
        ) : (
          <motion.div
            key={selectedCity}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 0.28, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{activeCityLabel}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground" aria-live="polite">
                  {Math.min(activeMemberIndex + 1, activeMembers.length)}/{activeMembers.length}
                </span>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  aria-label="Ver integrante anterior"
                  className="h-9 w-9 border-border/70 bg-background/70"
                  disabled={!canScrollPrev}
                  onClick={() => carouselApi?.scrollPrev()}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  aria-label="Ver proximo integrante"
                  className="h-9 w-9 border-border/70 bg-background/70"
                  disabled={!canScrollNext}
                  onClick={() => carouselApi?.scrollNext()}
                >
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </div>

            <Carousel
              key={selectedCity}
              setApi={setCarouselApi}
              opts={{ align: "center", loop: false, containScroll: "trimSnaps" }}
              className="mx-auto w-full max-w-[760px] rounded-2xl border border-border/60 bg-card/35 p-2 [perspective:950px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:p-3 md:p-4"
              aria-label={`Integrantes da equipe de ${activeCityLabel}`}
              tabIndex={0}
            >
              <CarouselContent className="-ml-3 px-6 [transform-style:preserve-3d] sm:-ml-4 sm:px-10 lg:px-14">
                {activeMembers.map((member, memberIndex) => {
                  const distanceToActive = Math.abs(memberIndex - activeMemberIndex);
                  const isActiveMember = distanceToActive === 0;

                  return (
                    <CarouselItem
                      key={`${selectedCity}-${member.name}-${member.role}`}
                      className="basis-[82%] pl-3 sm:basis-[62%] sm:pl-4 lg:basis-[52%]"
                    >
                      <div ref={bindSlideRef(memberIndex)} className="relative h-full [transform-style:preserve-3d] will-change-transform">
                        <TeamMemberCard
                          member={member}
                          isActive={isActiveMember}
                          fallbackDescription={teamContent.fallbackDescription}
                          fallbackImageSrc={teamContent.fallbackImageSrc}
                          fallbackBenefits={teamContent.fallbackBenefits}
                          benefitsTitle={teamContent.benefitsTitle}
                        />
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
            </Carousel>
          </motion.div>
        )}
      </Tabs>
    </ScrollRevealSection>
  );
}
