"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamContent, type TeamCity } from "@/content/team";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

const cities: TeamCity[] = ["maceio", "marechal"];

function getMembersByCity(city: TeamCity) {
  return teamContent.members.filter((member) => member.city === city);
}

export function TeamByCitySection() {
  const [selectedCity, setSelectedCity] = useState<TeamCity>("maceio");
  const { fadeUp, stagger, shouldReduceMotion } = useRevealMotion();

  return (
    <ScrollRevealSection id="equipe" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 space-y-2 md:mb-8">
        {teamContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{teamContent.title}</h2> : null}
        {teamContent.description ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{teamContent.description}</p> : null}
      </div>

      <Tabs value={selectedCity} onValueChange={(value) => setSelectedCity(value as TeamCity)} className="w-full">
        <TabsList className="grid h-auto w-full grid-cols-2">
          <TabsTrigger value="maceio">{teamContent.cityLabels.maceio}</TabsTrigger>
          <TabsTrigger value="marechal">{teamContent.cityLabels.marechal}</TabsTrigger>
        </TabsList>

        {cities.map((city) => {
          const members = getMembersByCity(city);
          const isActive = selectedCity === city;
          const animateState = shouldReduceMotion ? "show" : isActive ? "show" : "hidden";

          return (
            <TabsContent key={city} value={city}>
              <motion.div
                variants={fadeUp}
                initial={shouldReduceMotion ? "show" : "hidden"}
                animate={animateState}
                className="w-full"
              >
                <Card className="border-border/70 bg-card/70">
                  <CardHeader>
                    <CardTitle className="text-lg">{teamContent.cityLabels[city]}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {members.length > 0 ? (
                      members.map((member) => (
                        <p key={`${member.city}-${member.name}-${member.role}`} className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">{member.name}</span> - {member.role}
                        </p>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">{teamContent.emptyStateLabel}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          );
        })}
      </Tabs>
    </ScrollRevealSection>
  );
}
