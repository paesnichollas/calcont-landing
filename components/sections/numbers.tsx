"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { numbersContent } from "@/content/numbers";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

export function NumbersSection() {
  const items = numbersContent.items ?? [];
  const { fadeUp, stagger } = useRevealMotion();

  return (
    <ScrollRevealSection id="numeros" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 space-y-2 md:mb-8">
        {numbersContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{numbersContent.title}</h2> : null}
        {numbersContent.description ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{numbersContent.description}</p> : null}
      </div>

      {items.length > 0 ? (
        <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <Card className="border-border/70 bg-card/70 transition-colors duration-200 hover:border-primary/30">
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
