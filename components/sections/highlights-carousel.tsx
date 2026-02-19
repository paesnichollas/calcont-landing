"use client";

import { motion } from "framer-motion";
import {
  Clock3,
  FileCheck,
  MessageCircle,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
  Users
} from "lucide-react";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { highlightsContent, type HighlightIconName } from "@/content/highlights";

const highlightIcons: Record<HighlightIconName, LucideIcon> = {
  ShieldCheck,
  TrendingUp,
  Clock3,
  Users,
  FileCheck,
  MessageCircle
};

export function HighlightsCarouselSection() {
  const items = highlightsContent.items ?? [];
  const { fadeUp, stagger } = useRevealMotion();

  if (items.length === 0) {
    return null;
  }

  return (
    <ScrollRevealSection id="destaques" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 space-y-2 md:mb-8">
        {highlightsContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{highlightsContent.title}</h2> : null}
        {highlightsContent.description ? (
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{highlightsContent.description}</p>
        ) : null}
      </div>

      <motion.div variants={fadeUp} className="relative">
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item) => {
              const Icon = highlightIcons[item.icon] ?? ShieldCheck;

              return (
                <CarouselItem key={item.id} className="basis-[86%] pl-2 sm:basis-[58%] md:pl-4 lg:basis-1/3">
                  <Card className="h-full border-border/70 bg-card/70 transition-colors duration-200 hover:border-primary/30">
                    <CardHeader className="space-y-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      {item.title ? <CardTitle className="text-lg leading-tight">{item.title}</CardTitle> : null}
                      {item.description ? <CardDescription className="text-sm md:text-base">{item.description}</CardDescription> : null}
                    </CardHeader>
                    {item.emphasis ? (
                      <CardContent>
                        <p className="text-sm font-medium text-foreground">{item.emphasis}</p>
                      </CardContent>
                    ) : null}
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {items.length > 1 ? (
            <>
              <CarouselPrevious className="hidden md:inline-flex md:-top-14 md:left-auto md:right-12 md:translate-y-0" />
              <CarouselNext className="hidden md:inline-flex md:-top-14 md:right-2 md:translate-y-0" />
            </>
          ) : null}
        </Carousel>
      </motion.div>
    </ScrollRevealSection>
  );
}
