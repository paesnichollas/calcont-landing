"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { teamContent, type TeamCity, type TeamMember } from "@/content/team";

const cities: TeamCity[] = ["maceio", "marechal"];

type TeamMemberCardProps = {
  member: TeamMember;
  fallbackDescription: string;
  fallbackImageSrc: string;
};

function TeamMemberCard({ member, fallbackDescription, fallbackImageSrc }: TeamMemberCardProps) {
  const initialImageSrc = member.imageSrc?.trim() ? member.imageSrc : fallbackImageSrc;
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const description = member.description?.trim() ? member.description : fallbackDescription;
  const imageAlt = member.imageAlt?.trim() ? member.imageAlt : member.name;

  return (
    <Card className="h-full overflow-hidden border-border/70 bg-card/85 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_1.35rem_2.7rem_-1.7rem_hsl(var(--primary)/0.45)]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={720}
        height={520}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="h-44 w-full object-cover"
        onError={() => {
          if (imageSrc !== fallbackImageSrc) {
            setImageSrc(fallbackImageSrc);
          }
        }}
      />
      <CardHeader className="space-y-3 p-5">
        <div className="space-y-2">
          <CardTitle className="text-lg">{member.name}</CardTitle>
          <Badge variant="secondary">{member.role}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <p className="max-h-[4.8rem] overflow-hidden text-sm leading-relaxed text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function TeamByCitySection() {
  const [selectedCity, setSelectedCity] = useState<TeamCity>("maceio");
  const { fadeUp, stagger, shouldReduceMotion } = useRevealMotion();
  const splitTransition = shouldReduceMotion
    ? { duration: 0.01 }
    : { duration: 0.32, ease: [0.2, 0.65, 0.3, 0.9] as const };

  return (
    <ScrollRevealSection id="equipe" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 space-y-2 md:mb-8">
        {teamContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{teamContent.title}</h2> : null}
        {teamContent.description ? (
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">{teamContent.description}</p>
        ) : null}
      </div>

      <Tabs value={selectedCity} onValueChange={(value) => setSelectedCity(value as TeamCity)} className="w-full space-y-6">
        <TabsList className="flex h-auto w-full gap-3 bg-transparent p-0">
          {cities.map((city) => {
            const isActive = selectedCity === city;
            const cityLabel = teamContent.cityLabels[city] || city;
            const cityHighlight = teamContent.cityHighlights[city];
            const splitAnimate = shouldReduceMotion
              ? { flex: 1, opacity: 1 }
              : { flex: isActive ? 1.25 : 0.75, opacity: isActive ? 1 : 0.62 };

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

        {cities.map((city) => {
          const members = teamContent.membersByCity[city] ?? [];

          return (
            <TabsContent key={city} value={city} className="mt-0">
              <motion.div
                variants={stagger}
                initial={shouldReduceMotion ? "show" : "hidden"}
                animate="show"
                className="space-y-4"
              >
                {members.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {members.map((member) => (
                      <motion.div key={`${city}-${member.name}-${member.role}`} variants={fadeUp}>
                        <TeamMemberCard
                          member={member}
                          fallbackDescription={teamContent.fallbackDescription}
                          fallbackImageSrc={teamContent.fallbackImageSrc}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.p variants={fadeUp} className="text-sm text-muted-foreground">
                    {teamContent.emptyStateLabel}
                  </motion.p>
                )}
              </motion.div>
            </TabsContent>
          );
        })}
      </Tabs>
    </ScrollRevealSection>
  );
}
