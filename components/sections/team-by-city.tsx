"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMounted } from "@/components/hooks/use-mounted";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/typography/eyebrow";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { landingCopy } from "@/content/copy";
import { teamContent, type TeamCity, type TeamMember } from "@/content/team";

type TeamMemberCardProps = {
  member: TeamMember;
  fallbackMemberName: string;
  fallbackMemberRole: string;
  fallbackDescription: string;
  fallbackImageSrc: string;
  fallbackBenefitLine: string;
  fallbackBenefits: string[];
  benefitsTitle: string;
};

function TeamMemberCard({
  member,
  fallbackMemberName,
  fallbackMemberRole,
  fallbackDescription,
  fallbackImageSrc,
  fallbackBenefitLine,
  fallbackBenefits,
  benefitsTitle
}: TeamMemberCardProps) {
  const initialImageSrc = member.imageSrc?.trim() ? member.imageSrc : fallbackImageSrc;
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const memberName = member.name?.trim() ? member.name : fallbackMemberName;
  const memberRole = member.role?.trim() ? member.role : fallbackMemberRole;
  const description = member.description?.trim() || fallbackDescription?.trim() || fallbackMemberRole;
  const imageAlt = member.imageAlt?.trim() || memberName;
  const normalizedBenefits = member.clientBenefits?.map((benefit) => benefit.trim()).filter((benefit) => benefit.length > 0) ?? [];
  const fallbackBenefitsSafe = fallbackBenefits.map((benefit) => benefit.trim()).filter((benefit) => benefit.length > 0);
  const highlightedBenefit = normalizedBenefits[0] || fallbackBenefitsSafe[0] || fallbackBenefitLine;
  const safeBenefitsTitle = benefitsTitle.trim() ? benefitsTitle : fallbackMemberRole;

  useEffect(() => {
    setImageSrc(initialImageSrc);
  }, [initialImageSrc]);

  return (
    <Card className="h-full border-border/70 bg-card/70">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={640}
        height={420}
        sizes="(max-width: 767px) 78vw, (max-width: 1279px) 48vw, 24vw"
        className="h-44 w-full rounded-t-xl object-cover"
        onError={() => {
          if (imageSrc !== fallbackImageSrc) {
            setImageSrc(fallbackImageSrc);
          }
        }}
      />

      <CardHeader className="space-y-2 p-4 pb-2 sm:p-6 sm:pb-2">
        <CardTitle className="text-lg leading-tight">{memberName}</CardTitle>
        <Badge variant="secondary" className="w-fit">
          {memberRole}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 px-4 pb-4 pt-0 sm:px-6 sm:pb-6">
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div className="rounded-xl border border-border/70 bg-accent/10 p-3.5">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">{safeBenefitsTitle}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground">{highlightedBenefit}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function TeamByCitySection() {
  const teamCopy = landingCopy.sections.team;
  const cities = useMemo(() => Object.keys(teamContent.cityLabels) as TeamCity[], []);
  const [selectedCity, setSelectedCity] = useState<TeamCity | null>(() => cities[0] ?? null);
  const mounted = useMounted();
  const { stagger, shouldReduceMotion } = useRevealMotion();
  const shouldAnimatePanel = mounted && !shouldReduceMotion;

  useEffect(() => {
    if (selectedCity !== null || cities.length === 0) {
      return;
    }

    setSelectedCity(cities[0] ?? null);
  }, [cities, selectedCity]);

  const activeMembers = selectedCity ? teamContent.membersByCity[selectedCity] ?? [] : [];
  const activeCityLabel = selectedCity ? teamContent.cityLabels[selectedCity] ?? selectedCity : "";

  const panelTransition = shouldAnimatePanel
    ? { duration: 0.28, ease: [0.2, 0.65, 0.3, 0.9] as const }
    : { duration: 0.01 };

  const panelInitial = shouldAnimatePanel
    ? { opacity: 0, y: 8 }
    : false;
  const panelExit = shouldAnimatePanel ? { opacity: 0, y: -6 } : { opacity: 1, y: 0 };
  const membersGridVariants = shouldAnimatePanel
    ? {
        hidden: {},
        show: {
          transition: { staggerChildren: 0.05, delayChildren: 0.03 }
        }
      }
    : {
        hidden: {},
        show: {
          transition: { staggerChildren: 0, delayChildren: 0 }
        }
      };
  const memberCardVariants = shouldAnimatePanel
    ? {
        hidden: { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.24, ease: [0.2, 0.65, 0.3, 0.9] as const }
        }
      }
    : {
        hidden: { opacity: 1, y: 0 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.01 }
        }
      };
  const sectionEyebrow = teamCopy.eyebrow.trim() || teamContent.eyebrow.trim();
  const sectionTitle = teamCopy.title.trim() || teamContent.title;
  const sectionDescription = teamCopy.subtitle.trim() || teamContent.description;

  return (
    <ScrollRevealSection id="equipe" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 md:mb-8">
        {sectionEyebrow ? <Eyebrow className="mb-3">{sectionEyebrow}</Eyebrow> : null}
        {sectionTitle ? <h2 className="mb-4 text-2xl font-semibold md:text-3xl">{sectionTitle}</h2> : null}
        {sectionDescription ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{sectionDescription}</p> : null}
      </div>

      <Tabs
        value={selectedCity ?? ""}
        onValueChange={(value) => {
          const nextCity = cities.find((city) => city === value);
          if (nextCity) {
            setSelectedCity(nextCity);
          }
        }}
        className="w-full space-y-6"
      >
        <TabsList className="grid h-auto w-full grid-cols-1 gap-3 bg-transparent p-0 sm:grid-cols-2">
          {cities.map((city) => {
            const cityLabel = teamContent.cityLabels[city] || city;
            const cityHighlight = teamContent.cityHighlights[city];

            return (
              <TabsTrigger
                key={city}
                value={city}
                className="h-auto w-full min-h-[5.25rem] min-w-0 flex-col items-start justify-start rounded-2xl border border-border/70 bg-card/55 p-4 text-left text-foreground whitespace-normal transition-[border-color,background-color,box-shadow] duration-300 ease-out hover:bg-accent/10 hover:border-border/80 hover:shadow-sm data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-soft sm:p-6"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="min-w-0 w-full">
                    <span className="block w-full text-base font-semibold leading-snug break-words">{cityLabel}</span>
                    {cityHighlight ? <span className="mt-1 block w-full text-xs leading-relaxed text-muted-foreground break-words">{cityHighlight}</span> : null}
                  </div>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <AnimatePresence mode="wait" initial={false}>
          {selectedCity === null ? (
            <motion.div
              key="team-empty-no-city"
              className="rounded-2xl border border-border/70 bg-card/40 p-6"
              initial={panelInitial}
              animate={{ opacity: 1, y: 0 }}
              exit={panelExit}
              transition={panelTransition}
            >
              <p className="text-sm text-muted-foreground">{teamContent.emptyStateLabelNoCity}</p>
            </motion.div>
          ) : activeMembers.length === 0 ? (
            <motion.div
              key={`team-empty-${selectedCity}`}
              className="rounded-2xl border border-border/70 bg-card/40 p-6"
              initial={panelInitial}
              animate={{ opacity: 1, y: 0 }}
              exit={panelExit}
              transition={panelTransition}
            >
              <p className="text-sm text-muted-foreground">{teamContent.emptyStateLabelCityWithoutMembers}</p>
            </motion.div>
          ) : (
            <motion.div
              key={selectedCity}
              initial={panelInitial}
              animate={{ opacity: 1, y: 0 }}
              exit={panelExit}
              transition={panelTransition}
              className="space-y-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">{activeCityLabel}</p>
                <span className="text-xs text-muted-foreground">{`${activeMembers.length} ${teamContent.membersCountSuffix}`}</span>
              </div>

              <motion.div
                variants={membersGridVariants}
                initial="hidden"
                animate="show"
                className="flex gap-4 overflow-x-auto overflow-y-visible snap-x snap-mandatory pt-2 pb-2 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:pt-2 md:pb-0 xl:grid-cols-4"
              >
                {activeMembers.map((member, memberIndex) => (
                  <motion.div
                    key={`${selectedCity}-${member.name}-${member.role}-${memberIndex}`}
                    variants={memberCardVariants}
                    className="min-w-[260px] max-w-[300px] shrink-0 snap-center md:min-w-0 md:max-w-none"
                  >
                    <TeamMemberCard
                      member={member}
                      fallbackMemberName={teamContent.fallbackMemberName}
                      fallbackMemberRole={teamContent.fallbackMemberRole}
                      fallbackDescription={teamContent.fallbackDescription}
                      fallbackImageSrc={teamContent.fallbackImageSrc}
                      fallbackBenefitLine={teamContent.fallbackBenefitLine}
                      fallbackBenefits={teamContent.fallbackBenefits}
                      benefitsTitle={teamContent.benefitsTitle}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Tabs>
    </ScrollRevealSection>
  );
}

