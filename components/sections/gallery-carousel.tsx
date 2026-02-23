"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/typography/eyebrow";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { galleryContent } from "@/content/gallery";

export function GalleryCarouselSection() {
  const items = galleryContent.items ?? [];
  const { fadeUp, stagger } = useRevealMotion();
  const sectionEyebrow = galleryContent.eyebrow.trim();

  if (items.length === 0) {
    return null;
  }

  return (
    <ScrollRevealSection id="galeria" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 md:mb-8">
        {sectionEyebrow ? <Eyebrow className="mb-3">{sectionEyebrow}</Eyebrow> : null}
        {galleryContent.title ? <h2 className="mb-4 text-2xl font-semibold md:text-3xl">{galleryContent.title}</h2> : null}
        {galleryContent.description ? (
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{galleryContent.description}</p>
        ) : null}
      </div>

      <motion.div variants={fadeUp} className="relative">
        <Carousel opts={{ align: "start", loop: false }} className="w-full">
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item, index) => (
              <CarouselItem key={item.id} className="basis-[84%] pl-2 sm:basis-[56%] md:pl-4 lg:basis-1/3">
                <Card className="overflow-hidden bg-card/70">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={item.src}
                      alt={item.alt || item.label || galleryContent.title || ""}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 56vw, 84vw"
                      priority={index === 0}
                      className="object-cover"
                    />

                    {item.label ? (
                      <div className="absolute inset-x-0 bottom-0 bg-background/75 px-3 py-2 backdrop-blur-sm">
                        <p className="text-sm font-medium text-foreground">{item.label}</p>
                      </div>
                    ) : null}
                  </div>
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
