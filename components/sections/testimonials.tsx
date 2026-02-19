"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { testimonialsContent } from "@/content/testimonials";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

export function TestimonialsSection() {
  const items = testimonialsContent.items ?? [];
  const { fadeUp, stagger } = useRevealMotion();

  if (items.length === 0) {
    return null;
  }

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

      <motion.div variants={fadeUp} className="relative">
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item) => (
              <CarouselItem key={item.id} className="basis-[90%] pl-2 sm:basis-[60%] md:pl-4 lg:basis-1/3">
                <Card className="h-full border-border/70 bg-card/70 transition-colors duration-200 hover:border-primary/30">
                  <CardHeader>
                    {item.author ? <CardTitle className="text-lg">{item.author}</CardTitle> : null}
                    {item.role ? <CardDescription>{item.role}</CardDescription> : null}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {item.text ? <p className="text-sm text-muted-foreground">{item.text}</p> : null}
                    {item.videoUrl ? (
                      <Button asChild size="sm" variant="secondary">
                        <a href={item.videoUrl} target="_blank" rel="noreferrer">
                          {testimonialsContent.videoLinkLabel}
                        </a>
                      </Button>
                    ) : null}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
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
