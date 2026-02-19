"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { servicesContent } from "@/content/services";
import { SERVICE_SELECTED_EVENT, type ServiceSelectedDetail } from "@/lib/service-selection";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";

export function ServicesSection() {
  const items = servicesContent.items ?? [];
  const [activeServiceId, setActiveServiceId] = useState<string>("");
  const serviceIds = useMemo(() => new Set(items.map((item) => item.id)), [items]);
  const { fadeUp, stagger } = useRevealMotion();

  useEffect(() => {
    function handleServiceSelected(event: Event) {
      const customEvent = event as CustomEvent<ServiceSelectedDetail>;
      const serviceId = customEvent.detail?.serviceId;
      if (serviceId && serviceIds.has(serviceId)) {
        setActiveServiceId(serviceId);
      }
    }

    window.addEventListener(SERVICE_SELECTED_EVENT, handleServiceSelected);

    return () => {
      window.removeEventListener(SERVICE_SELECTED_EVENT, handleServiceSelected);
    };
  }, [serviceIds]);

  return (
    <ScrollRevealSection id="servicos" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
      <div className="mb-6 space-y-2 md:mb-8">
        {servicesContent.badge ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{servicesContent.badge}</p> : null}
        {servicesContent.title ? <h2 className="text-2xl font-semibold md:text-3xl">{servicesContent.title}</h2> : null}
        {servicesContent.description ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{servicesContent.description}</p> : null}
      </div>

      {items.length > 0 ? (
        <motion.div variants={stagger}>
          <Accordion type="single" collapsible value={activeServiceId} onValueChange={setActiveServiceId} className="space-y-3">
            {items.map((item) => (
              <motion.div key={item.id} variants={fadeUp}>
                <Card className="border-border/70 bg-card/70 px-6 transition-colors duration-200 hover:border-primary/30">
                  <AccordionItem value={item.id} className="border-none">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="space-y-1 text-left">
                        {item.title ? <CardTitle className="text-lg">{item.title}</CardTitle> : null}
                        {item.summary ? <CardDescription>{item.summary}</CardDescription> : null}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
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
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      ) : null}
    </ScrollRevealSection>
  );
}
