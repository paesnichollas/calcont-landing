"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/typography/eyebrow";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { landingCopy } from "@/content/copy";
import { testimonialsContent, type Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

function getRatingValue(item: Testimonial) {
  if (typeof item.rating !== "number") {
    return 0;
  }

  return Math.max(0, Math.min(5, Math.round(item.rating)));
}

function getAuthorMeta(item: Testimonial) {
  const role = item.role?.trim() ?? "";
  const company = item.company?.trim() ?? "";
  const parts = [role, company].filter((part) => part.length > 0);

  return parts.length > 0 ? parts.join(" - ") : testimonialsContent.fallbackMetaLabel;
}

export function TestimonialsSection() {
  const testimonialsCopy = landingCopy.sections.testimonials;
  const items = testimonialsContent.items ?? [];
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(items.length);
  const { fadeUp, stagger } = useRevealMotion();
  const sectionEyebrow = testimonialsCopy.eyebrow.trim() || testimonialsContent.eyebrow.trim();
  const sectionTitle = testimonialsCopy.title.trim() || testimonialsContent.title;
  const sectionDescription = testimonialsCopy.subtitle.trim() || testimonialsContent.description;
  const ratingAriaLabelPrefix = testimonialsCopy.ratingAriaLabelPrefix.trim();
  const ratingAriaLabelSuffix = testimonialsCopy.ratingAriaLabelSuffix.trim();

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    const syncState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setSnapCount(carouselApi.scrollSnapList().length || items.length);
    };

    syncState();
    carouselApi.on("select", syncState);
    carouselApi.on("reInit", syncState);

    return () => {
      carouselApi.off("select", syncState);
      carouselApi.off("reInit", syncState);
    };
  }, [carouselApi, items.length]);

  if (items.length === 0) {
    return null;
  }

  return (
    <ScrollRevealSection id="depoimentos" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 md:mb-8">
        {sectionEyebrow ? <Eyebrow className="mb-3">{sectionEyebrow}</Eyebrow> : null}
        {sectionTitle ? <h2 className="mb-4 text-2xl font-semibold md:text-3xl">{sectionTitle}</h2> : null}
        {sectionDescription ? (
          <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{sectionDescription}</p>
        ) : null}
      </div>

      <motion.div variants={fadeUp} className="space-y-4">
        <Carousel
          opts={{ align: "start", loop: false }}
          setApi={setCarouselApi}
          className="w-full"
          aria-label={testimonialsContent.carouselAriaLabel}
          tabIndex={0}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item) => {
              const testimonialText = item.text?.trim() || testimonialsContent.emptyTextLabel;
              const authorName = item.author?.trim() || testimonialsContent.fallbackAuthorLabel;
              const authorMeta = getAuthorMeta(item);
              const rating = getRatingValue(item);

              return (
                <CarouselItem key={item.id} className="basis-[90%] pl-2 sm:basis-[62%] md:pl-4 lg:basis-1/3">
                  <Card className="flex h-full flex-col border-border/70 bg-card/70 shadow-soft">
                    <CardHeader className="space-y-3 pb-3">
                      <Quote className="h-5 w-5 text-muted-foreground" aria-hidden />
                      <p className="text-sm leading-relaxed text-foreground">{testimonialText}</p>
                    </CardHeader>

                    <CardContent className="space-y-4 pt-0">
                      {rating > 0 ? (
                        <div className="flex items-center gap-1" aria-label={`${ratingAriaLabelPrefix} ${rating} ${ratingAriaLabelSuffix}`}>
                          {Array.from({ length: 5 }, (_, index) => (
                            <Star
                              key={`${item.id}-star-${index}`}
                              className={cn(
                                "h-3.5 w-3.5",
                                index < rating ? "fill-primary text-primary" : "fill-transparent text-muted-foreground"
                              )}
                              aria-hidden
                            />
                          ))}
                        </div>
                      ) : null}

                      {item.videoUrl ? (
                        <Button asChild size="sm" variant="secondary" className="w-fit">
                          <a href={item.videoUrl} target="_blank" rel="noreferrer">
                            {testimonialsContent.videoLinkLabel}
                          </a>
                        </Button>
                      ) : null}
                    </CardContent>

                    <CardFooter className="mt-auto border-t border-border/60 pt-4">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{authorName}</CardTitle>
                        <p className="text-xs text-muted-foreground">{authorMeta}</p>
                      </div>
                    </CardFooter>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          {items.length > 1 ? (
            <>
              <CarouselPrevious
                className="hidden md:inline-flex md:-top-14 md:left-auto md:right-12 md:translate-y-0"
                aria-label={testimonialsContent.previousAriaLabel}
              />
              <CarouselNext
                className="hidden md:inline-flex md:-top-14 md:right-2 md:translate-y-0"
                aria-label={testimonialsContent.nextAriaLabel}
              />
            </>
          ) : null}
        </Carousel>

        {snapCount > 1 ? (
          <div className="flex items-center justify-center gap-2" role="group" aria-label={testimonialsContent.dotsAriaLabel}>
            {Array.from({ length: snapCount }).map((_, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={`testimonial-dot-${index}`}
                  type="button"
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border border-border/80 transition-colors",
                    isActive ? "bg-accent" : "bg-muted"
                  )}
                  aria-label={`${testimonialsContent.goToSlideAriaPrefix} ${index + 1}`}
                  aria-pressed={isActive}
                  onClick={() => carouselApi?.scrollTo(index)}
                />
              );
            })}
          </div>
        ) : null}

        {items.length > 1 ? (
          <div className="flex items-center justify-end gap-2 md:hidden">
            <Button type="button" size="sm" variant="outline" onClick={() => carouselApi?.scrollPrev()}>
              {testimonialsContent.previousButtonLabel}
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={() => carouselApi?.scrollNext()}>
              {testimonialsContent.nextButtonLabel}
            </Button>
          </div>
        ) : null}
      </motion.div>
    </ScrollRevealSection>
  );
}
