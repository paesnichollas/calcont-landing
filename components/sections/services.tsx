"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Calculator,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  TrendingUp,
  type LucideIcon
} from "lucide-react";
import { ScrollRevealSection } from "@/components/motion/scroll-reveal-section";
import { useRevealMotion } from "@/components/motion/reveal";
import { useMounted } from "@/components/hooks/use-mounted";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eyebrow } from "@/components/typography/eyebrow";
import { landingCopy } from "@/content/copy";
import { servicesContent, type ServiceItem } from "@/content/services";
import { SERVICE_SELECTED_EVENT, type ServiceSelectedDetail } from "@/lib/service-selection";

const serviceIconMap: Record<string, LucideIcon> = {
  calculator: Calculator,
  "shield-check": ShieldCheck,
  "briefcase-business": BriefcaseBusiness,
  "key-round": KeyRound,
  "trending-up": TrendingUp
};

type ServicePanelProps = {
  item: ServiceItem;
  emptyStateLabel: string;
  benefitLabel: string;
};

function resolveShortDescription(item: ServiceItem, emptyStateLabel: string) {
  return item.shortDescription?.trim() || item.summary?.trim() || emptyStateLabel;
}

function resolveBullets(item: ServiceItem) {
  const normalizedBullets = item.bullets?.map((bullet) => bullet.trim()).filter((bullet) => bullet.length > 0) ?? [];
  if (normalizedBullets.length > 0) {
    return normalizedBullets;
  }

  return item.highlights?.map((highlight) => highlight.trim()).filter((highlight) => highlight.length > 0) ?? [];
}

function resolveBenefit(item: ServiceItem, emptyStateLabel: string) {
  return item.benefit?.trim() || item.details?.trim() || emptyStateLabel;
}

function ServicePanel({ item, emptyStateLabel, benefitLabel }: ServicePanelProps) {
  const Icon = (item.icon && serviceIconMap[item.icon]) || CheckCircle2;
  const description = resolveShortDescription(item, emptyStateLabel);
  const bullets = resolveBullets(item);
  const benefit = resolveBenefit(item, emptyStateLabel);

  return (
    <div className="space-y-5">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-accent/10 p-2 text-accent" aria-hidden>
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>

      <Separator className="bg-border/60" />

      {bullets.length > 0 ? (
        <ul className="space-y-2.5">
          {bullets.map((bullet) => (
            <li key={`${item.id}-${bullet}`} className="flex items-start gap-2.5 text-sm text-foreground">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyStateLabel}</p>
      )}

      <div className="rounded-xl border border-border/70 bg-accent/10 p-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-accent">{benefitLabel}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground">{benefit}</p>
      </div>
    </div>
  );
}

export function ServicesSection() {
  const servicesCopy = landingCopy.sections.services;
  const items = servicesContent.items ?? [];
  const serviceIds = useMemo(() => new Set(items.map((item) => item.id)), [items]);
  const firstServiceId = items[0]?.id ?? "";
  const [selectedServiceId, setSelectedServiceId] = useState(firstServiceId);
  const [openMobileServiceId, setOpenMobileServiceId] = useState(firstServiceId);
  const mounted = useMounted();
  const { fadeUp, stagger, shouldReduceMotion } = useRevealMotion();
  const shouldAnimatePanel = mounted && !shouldReduceMotion;

  useEffect(() => {
    if (items.length === 0) {
      setSelectedServiceId("");
      setOpenMobileServiceId("");
      return;
    }

    if (!selectedServiceId || !serviceIds.has(selectedServiceId)) {
      setSelectedServiceId(firstServiceId);
    }

    if (openMobileServiceId && !serviceIds.has(openMobileServiceId)) {
      setOpenMobileServiceId(firstServiceId);
    }
  }, [firstServiceId, items.length, openMobileServiceId, selectedServiceId, serviceIds]);

  useEffect(() => {
    function handleServiceSelected(event: Event) {
      const customEvent = event as CustomEvent<ServiceSelectedDetail>;
      const serviceId = customEvent.detail?.serviceId;
      if (!serviceId || !serviceIds.has(serviceId)) {
        return;
      }

      setSelectedServiceId(serviceId);
      setOpenMobileServiceId(serviceId);
    }

    window.addEventListener(SERVICE_SELECTED_EVENT, handleServiceSelected);

    return () => {
      window.removeEventListener(SERVICE_SELECTED_EVENT, handleServiceSelected);
    };
  }, [serviceIds]);

  const panelTransition = shouldAnimatePanel
    ? { duration: 0.24, ease: [0.2, 0.65, 0.3, 0.9] as const }
    : { duration: 0.01 };
  const sectionEyebrow =
    servicesCopy.eyebrow.trim() || servicesCopy.badge.trim() || servicesContent.eyebrow.trim() || servicesContent.badge;
  const sectionTitle = servicesCopy.title.trim() || servicesContent.title;
  const sectionDescription = servicesCopy.subtitle.trim() || servicesContent.description;
  const emptyStateLabel = servicesCopy.emptyStateLabel.trim() || servicesContent.emptyStateLabel;
  const benefitLabel = servicesCopy.benefitLabel.trim() || servicesContent.benefitLabel;

  return (
    <ScrollRevealSection id="servicos" className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16" variants={stagger}>
      <div className="mb-6 md:mb-8">
        {sectionEyebrow ? <Eyebrow className="mb-3">{sectionEyebrow}</Eyebrow> : null}
        {sectionTitle ? <h2 className="mb-4 text-2xl font-semibold md:text-3xl">{sectionTitle}</h2> : null}
        {sectionDescription ? <p className="max-w-2xl text-sm text-muted-foreground md:text-base">{sectionDescription}</p> : null}
      </div>

      {items.length > 0 ? (
        <motion.div variants={fadeUp} className="space-y-4">
          <Tabs
            value={selectedServiceId}
            onValueChange={(nextValue) => {
              setSelectedServiceId(nextValue);
              setOpenMobileServiceId(nextValue);
            }}
            orientation="vertical"
            className="hidden min-h-0 md:grid md:grid-cols-[280px_1fr] md:gap-6"
          >
            <TabsList className="min-h-0 h-fit w-full flex-col items-stretch gap-2 rounded-2xl border border-border/70 bg-card/45 p-2.5">
              {items.map((item) => {
                const shortLabel = resolveShortDescription(item, emptyStateLabel);

                return (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="h-auto w-full min-w-0 flex-col items-start gap-1 rounded-xl border border-transparent px-3.5 py-3 text-left text-foreground whitespace-normal break-words data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:shadow-soft"
                  >
                    <span className="block w-full text-sm font-semibold">{item.title}</span>
                    <span className="block w-full text-xs font-normal leading-relaxed text-muted-foreground">{shortLabel}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="min-h-0">
              {items.map((item) => (
                <TabsContent key={item.id} value={item.id} className="mt-0 min-h-0">
                  <motion.div
                    initial={shouldAnimatePanel ? { opacity: 0, y: 8 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={panelTransition}
                    className="relative flex min-h-0 flex-col gap-4"
                  >
                    <Card className="relative flex flex-col gap-4 border-border/70 bg-card/65 p-6 shadow-soft">
                      <ServicePanel
                        item={item}
                        emptyStateLabel={emptyStateLabel}
                        benefitLabel={benefitLabel}
                      />
                    </Card>
                  </motion.div>
                </TabsContent>
              ))}
            </div>
          </Tabs>

          <Accordion
            type="single"
            collapsible
            value={openMobileServiceId}
            onValueChange={(nextValue) => {
              setOpenMobileServiceId(nextValue);
              if (nextValue) {
                setSelectedServiceId(nextValue);
              }
            }}
            className="space-y-3 md:hidden"
          >
            {items.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="rounded-2xl border border-border/70 bg-card/65 px-4 shadow-soft">
                <AccordionTrigger className="py-4 hover:no-underline">
                  <div className="space-y-1 text-left">
                    <p className="text-base font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs leading-relaxed text-muted-foreground">{resolveShortDescription(item, emptyStateLabel)}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <motion.div
                    initial={shouldAnimatePanel ? { opacity: 0, y: 6 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={panelTransition}
                    className="pb-1"
                  >
                    <ServicePanel
                      item={item}
                      emptyStateLabel={emptyStateLabel}
                      benefitLabel={benefitLabel}
                    />
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      ) : (
        <motion.div variants={fadeUp} className="rounded-2xl border border-border/70 bg-card/45 p-5">
          <p className="text-sm text-muted-foreground">{emptyStateLabel}</p>
        </motion.div>
      )}
    </ScrollRevealSection>
  );
}

