"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { servicesContent } from "@/content/services";
import { SERVICE_SELECTED_EVENT, type ServiceSelectedDetail } from "@/lib/service-selection";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

export function ServicesSection() {
  const items = servicesContent.items ?? [];
  const [openServiceId, setOpenServiceId] = useState<string>("");
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const { fadeUp, stagger } = useRevealMotion();
  const serviceIds = useMemo(() => new Set(items.map((item) => item.id)), [items]);
  const serviceIndexById = useMemo(() => new Map(items.map((item, index) => [item.id, index])), [items]);

  useEffect(() => {
    function handleServiceSelected(event: Event) {
      const customEvent = event as CustomEvent<ServiceSelectedDetail>;
      const serviceId = customEvent.detail?.serviceId;
      if (serviceId && serviceIds.has(serviceId)) {
        setOpenServiceId(serviceId);
      }
    }

    window.addEventListener(SERVICE_SELECTED_EVENT, handleServiceSelected);

    return () => {
      window.removeEventListener(SERVICE_SELECTED_EVENT, handleServiceSelected);
    };
  }, [serviceIds]);

  useEffect(() => {
    if (!carouselApi || !openServiceId) {
      return;
    }

    const targetIndex = serviceIndexById.get(openServiceId);
    if (typeof targetIndex !== "number") {
      return;
    }

    if (targetIndex !== carouselApi.selectedScrollSnap()) {
      carouselApi.scrollTo(targetIndex);
    }
  }, [carouselApi, openServiceId, serviceIndexById]);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }

    function handleSlideChange() {
      if (!openServiceId) {
        return;
      }

      const selectedIndex = carouselApi.selectedScrollSnap();
      const selectedServiceId = items[selectedIndex]?.id ?? "";
      if (selectedServiceId !== openServiceId) {
        setOpenServiceId("");
      }
    }

    carouselApi.on("select", handleSlideChange);
    carouselApi.on("reInit", handleSlideChange);

    return () => {
      carouselApi.off("select", handleSlideChange);
      carouselApi.off("reInit", handleSlideChange);
    };
  }, [carouselApi, items, openServiceId]);

  function handleServiceValueChange(nextValue: string) {
    setOpenServiceId(nextValue);

    if (!carouselApi || !nextValue) {
      return;
    }

    const targetIndex = serviceIndexById.get(nextValue);
    if (typeof targetIndex === "number" && targetIndex !== carouselApi.selectedScrollSnap()) {
      carouselApi.scrollTo(targetIndex);
    }
  }

  function resetAccordionAndNavigate(navigate: (() => void) | undefined) {
    setOpenServiceId("");

    if (!navigate) {
      return;
    }

    if (typeof window === "undefined") {
      navigate();
      return;
    }

    window.requestAnimationFrame(() => {
      navigate();
    });
  }

  function handlePreviousSlide() {
    resetAccordionAndNavigate(() => carouselApi?.scrollPrev());
  }

  function handleNextSlide() {
    resetAccordionAndNavigate(() => carouselApi?.scrollNext());
  }

  return (
    <ScrollRevealSection id="servicos" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 space-y-2 md:mb-8">
        {servicesContent.badge ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{servicesContent.badge}</p> : null}
        {servicesContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{servicesContent.title}</h2> : null}
        {servicesContent.description ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{servicesContent.description}</p> : null}
      </div>

      {items.length > 0 ? (
        <motion.div variants={fadeUp} className="relative">
          <Accordion type="single" collapsible value={openServiceId} onValueChange={handleServiceValueChange}>
            <Carousel opts={{ align: "start", loop: false }} setApi={setCarouselApi} className="w-full">
              <CarouselContent className="-ml-0">
                {items.map((item) => (
                  <CarouselItem key={item.id} className="pl-0">
                    <Card className="border-border/70 bg-card/70 px-6 transition-colors duration-200 hover:border-primary/30">
                      <AccordionItem value={item.id} className="border-none">
                        <AccordionTrigger className="hover:no-underline">
                          <div className="space-y-1 text-left">
                            {item.title ? <CardTitle className="text-lg">{item.title}</CardTitle> : null}
                            {item.summary ? <CardDescription>{item.summary}</CardDescription> : null}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-3 pb-1">
                            <p className="text-sm text-muted-foreground">{item.details || servicesContent.emptyStateLabel}</p>
                            {item.highlights && item.highlights.length > 0 ? (
                              <ul className="space-y-1">
                                {item.highlights.map((highlight) => (
                                  <li key={`${item.id}-${highlight}`} className="text-sm text-foreground">
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>

              {items.length > 1 ? (
                <div className="mt-4 flex items-center justify-end gap-2">
                  <CarouselPrevious
                    className="static left-auto right-auto top-auto h-9 w-9 translate-x-0 translate-y-0"
                    onClick={handlePreviousSlide}
                  />
                  <CarouselNext
                    className="static left-auto right-auto top-auto h-9 w-9 translate-x-0 translate-y-0"
                    onClick={handleNextSlide}
                  />
                </div>
              ) : null}
            </Carousel>
          </Accordion>
        </motion.div>
      ) : null}
    </ScrollRevealSection>
  );
}
