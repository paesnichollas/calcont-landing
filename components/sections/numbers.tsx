"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eyebrow } from "@/components/typography/eyebrow";
import { landingCopy } from "@/content/copy";
import { numbersContent } from "@/content/numbers";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

export function NumbersSection() {
  const numbersCopy = landingCopy.sections.numbers;
  const items = numbersContent.items ?? [];
  const { fadeUp, stagger } = useRevealMotion();
  const sectionEyebrow = numbersCopy.eyebrow.trim() || numbersContent.eyebrow.trim();
  const sectionTitle = numbersCopy.title.trim() || numbersContent.title;
  const sectionDescription = numbersCopy.subtitle.trim() || numbersContent.description;

  return (
    <ScrollRevealSection id="numeros" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 md:mb-8">
        {sectionEyebrow ? <Eyebrow className="mb-3">{sectionEyebrow}</Eyebrow> : null}
        {sectionTitle ? <h2 className="mb-4 text-2xl font-semibold md:text-3xl">{sectionTitle}</h2> : null}
        {sectionDescription ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{sectionDescription}</p> : null}
      </div>

      {items.length > 0 ? (
        <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <Card className="bg-card/70">
                <CardHeader>
                  {item.label ? <CardTitle className="text-sm uppercase tracking-[0.08em] text-muted-foreground">{item.label}</CardTitle> : null}
                </CardHeader>
                <CardContent>
                  {item.value ? <p className="text-3xl font-semibold tracking-tight">{item.value}</p> : null}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </ScrollRevealSection>
  );
}
