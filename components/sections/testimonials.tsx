"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { testimonialsContent } from "@/content/testimonials";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

export function TestimonialsSection() {
  const items = testimonialsContent.items ?? [];
  const { fadeUp, stagger } = useRevealMotion();

  return (
    <ScrollRevealSection
      id="depoimentos"
      className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16"
      variants={stagger}
    >
      <div className="mb-6 space-y-2 md:mb-8">
        {testimonialsContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{testimonialsContent.title}</h2> : null}
        {testimonialsContent.description ? (
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{testimonialsContent.description}</p>
        ) : null}
      </div>

      {items.length > 0 ? (
        <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <Card className="border-border/70 bg-card/70 transition-colors duration-200 hover:border-primary/30">
                <CardHeader>
                  {item.author ? <CardTitle className="text-lg">{item.author}</CardTitle> : null}
                  {item.role ? <CardDescription>{item.role}</CardDescription> : null}
                </CardHeader>
                <CardContent className="space-y-3">
                  {item.text ? <p className="text-sm text-muted-foreground">{item.text}</p> : null}
                  {item.videoUrl ? (
                    <a className="text-sm font-medium text-primary hover:underline" href={item.videoUrl} target="_blank" rel="noreferrer">
                      {testimonialsContent.videoLinkLabel}
                    </a>
                  ) : null}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : null}
    </ScrollRevealSection>
  );
}
