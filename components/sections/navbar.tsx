"use client";

import { type MouseEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { brandingContent } from "@/content/branding";
import { ThemeToggle } from "@/components/theme-toggle";
import { landingCopy } from "@/content/copy";
import { navbarContent } from "@/content/landing";
import { siteLinks } from "@/content/links";
import { servicesContent } from "@/content/services";
import { track } from "@/lib/analytics";
import { dispatchServiceSelectedEvent } from "@/lib/service-selection";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const NAVBAR_SELECTOR = "[data-navbar-root]";

const navItemClassName =
  "shrink-0 rounded-md border border-transparent px-3 py-2 text-sm font-medium tracking-[0.01em] text-muted-foreground transition-[color,background-color,border-color,box-shadow] duration-200 hover:bg-accent/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const activeNavItemClassName = "border border-border/60 bg-accent/15 text-accent hover:bg-accent/15 hover:text-accent";

function getSectionIdFromHref(href: string) {
  if (!href.startsWith("#")) {
    return null;
  }

  const sectionId = href.slice(1).trim();
  return sectionId || null;
}

function getNavbarHeight() {
  if (typeof document === "undefined") {
    return 0;
  }

  const navbar = document.querySelector<HTMLElement>(NAVBAR_SELECTOR);
  if (!navbar) {
    return 0;
  }

  return navbar.getBoundingClientRect().height;
}

export function NavbarSection() {
  const brandLabel = brandingContent.brandName.trim() || navbarContent.brand.trim() || "Calcont";
  const logoAlt = brandingContent.logoAlt.trim() || brandLabel;
  const actionLabel =
    landingCopy.nav.defaultActionLabel.trim() || navbarContent.actionLabel.trim() || landingCopy.hero.primaryCtaLabel.trim();
  const servicesMenuLabel = landingCopy.nav.servicesMenuLabel.trim() || navbarContent.servicesMenuLabel.trim();
  const servicesMenuHint = landingCopy.nav.servicesMenuHint.trim() || navbarContent.servicesMenuHint.trim();
  const navigation = navbarContent.navigation ?? [];
  const serviceItems = servicesContent.items ?? [];
  const servicesMenuNavigationItem = navigation.find((item) => item.id === "services-menu");
  const servicesSectionId = getSectionIdFromHref(servicesMenuNavigationItem?.href ?? "#servicos") ?? "servicos";
  const linksWithoutServicesMenu = navigation.filter((item) => item.id !== "services-menu");

  const sectionIds = useMemo(
    () =>
      Array.from(
        new Set(
          navigation
            .map((item) => getSectionIdFromHref(item.href))
            .filter((sectionId): sectionId is string => Boolean(sectionId))
        )
      ),
    [navigation]
  );

  const defaultActiveSectionId = useMemo(() => {
    const homeSectionId = getSectionIdFromHref(navigation.find((item) => item.id === "inicio")?.href ?? "#inicio");
    return homeSectionId ?? sectionIds[0] ?? "inicio";
  }, [navigation, sectionIds]);

  const [activeSectionId, setActiveSectionId] = useState(defaultActiveSectionId);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const isServicesActive = servicesMenuOpen || activeSectionId === servicesSectionId;

  useEffect(() => {
    setActiveSectionId((currentSectionId) => currentSectionId || defaultActiveSectionId);
  }, [defaultActiveSectionId]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined" || sectionIds.length === 0) {
      return;
    }

    const sectionIdSet = new Set(sectionIds);
    const visibilityBySection = new Map<string, number>(sectionIds.map((sectionId) => [sectionId, 0]));

    const syncActiveSectionFromHash = () => {
      const hashedSectionId = getSectionIdFromHref(window.location.hash);
      if (hashedSectionId && sectionIdSet.has(hashedSectionId)) {
        setActiveSectionId(hashedSectionId);
      }
    };

    syncActiveSectionFromHash();
    window.addEventListener("hashchange", syncActiveSectionFromHash);

    const navbarHeight = getNavbarHeight();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (!sectionIdSet.has(sectionId)) {
            return;
          }

          visibilityBySection.set(sectionId, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let nextActiveId = "";
        let highestVisibilityRatio = 0;

        sectionIds.forEach((sectionId) => {
          const visibilityRatio = visibilityBySection.get(sectionId) ?? 0;
          if (visibilityRatio <= highestVisibilityRatio) {
            return;
          }

          nextActiveId = sectionId;
          highestVisibilityRatio = visibilityRatio;
        });

        if (!nextActiveId) {
          return;
        }

        setActiveSectionId((currentSectionId) => (currentSectionId === nextActiveId ? currentSectionId : nextActiveId));
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: `-${Math.round(navbarHeight + 12)}px 0px -52% 0px`
      }
    );

    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => Boolean(section));

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("hashchange", syncActiveSectionFromHash);
      observer.disconnect();
    };
  }, [sectionIds]);

  function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>, href: string) {
    if (!href.startsWith("#")) {
      return;
    }

    const targetId = href.slice(1);
    if (!targetId) {
      return;
    }

    event.preventDefault();
    setActiveSectionId(targetId);
    scrollToId(targetId);
  }

  function handleServiceSelect(serviceId: string) {
    dispatchServiceSelectedEvent(serviceId);
    setActiveSectionId(servicesSectionId);
    setServicesMenuOpen(false);
    scrollToId(servicesSectionId);
  }

  function getNavigationLabel(itemId: string, fallbackLabel: string) {
    return landingCopy.nav.itemsById[itemId]?.trim() || fallbackLabel;
  }

  return (
    <header
      data-navbar-root
      className="sticky top-0 z-30 border-b border-border/70 bg-background/88 backdrop-blur-xl supports-[backdrop-filter]:bg-background/72"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3.5 md:px-6 md:py-4">
        <Link
          href="#inicio"
          scroll={false}
          className="group flex items-center gap-3 rounded-md pr-1 text-base font-semibold tracking-[0.08em] text-foreground transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          onClick={(event) => handleAnchorClick(event, "#inicio")}
        >
          <Image
            src={brandingContent.logoSrc}
            alt={logoAlt}
            width={28}
            height={28}
            className="h-7 w-7 rounded-md border border-border/70 bg-card/80 p-1 shadow-soft transition-colors group-hover:border-border"
          />
          <span className="whitespace-nowrap uppercase">{brandLabel}</span>
        </Link>

        <div className="flex items-center gap-2.5">
          <ThemeToggle
            menuLabel={landingCopy.nav.themeMenuLabel.trim() || navbarContent.themeMenuLabel}
            optionLight={landingCopy.nav.themeOptionLight.trim() || navbarContent.themeOptionLight}
            optionDark={landingCopy.nav.themeOptionDark.trim() || navbarContent.themeOptionDark}
            optionSystem={landingCopy.nav.themeOptionSystem.trim() || navbarContent.themeOptionSystem}
          />
          <Button asChild size="sm" className="font-medium tracking-[0.02em]">
            <a
              href={siteLinks.clientPortalLoginUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("click_ja_sou_cliente", { source: "navbar" })}
            >
              {actionLabel}
            </a>
          </Button>
        </div>
      </div>

      <nav className="mx-auto w-full max-w-6xl overflow-visible px-4 pb-3 md:px-6">
        <div className="flex items-center gap-1.5 overflow-x-auto overflow-y-visible py-2">
          {serviceItems.length > 0 ? (
            <DropdownMenu open={servicesMenuOpen} onOpenChange={setServicesMenuOpen}>
              <DropdownMenuTrigger
                className={cn(
                  navItemClassName,
                  "data-[state=open]:bg-accent/15 data-[state=open]:text-accent data-[state=open]:hover:bg-accent/15 data-[state=open]:hover:text-accent",
                  isServicesActive && activeNavItemClassName
                )}
                aria-current={activeSectionId === servicesSectionId ? "page" : undefined}
              >
                {servicesMenuLabel}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>{servicesMenuHint}</DropdownMenuLabel>
                {serviceItems.map((service) => (
                  <DropdownMenuItem key={service.id} onSelect={() => handleServiceSelect(service.id)}>
                    {service.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}

          {linksWithoutServicesMenu.map((item) => {
            const sectionId = getSectionIdFromHref(item.href);
            const isActive = Boolean(sectionId && sectionId === activeSectionId);

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(event) => handleAnchorClick(event, item.href)}
                className={cn(navItemClassName, isActive && activeNavItemClassName)}
                aria-current={isActive ? "page" : undefined}
              >
                {getNavigationLabel(item.id, item.label)}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
