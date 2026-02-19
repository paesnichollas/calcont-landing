"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { navbarContent } from "@/content/landing";
import { siteLinks } from "@/content/links";
import { servicesContent } from "@/content/services";
import { trackEvent } from "@/lib/analytics";
import { dispatchServiceSelectedEvent } from "@/lib/service-selection";

export function NavbarSection() {
  const navigation = navbarContent.navigation ?? [];
  const serviceItems = servicesContent.items ?? [];
  const linksWithoutServicesMenu = navigation.filter((item) => item.id !== "services-menu");

  function handleServiceSelect(serviceId: string) {
    dispatchServiceSelectedEvent(serviceId);
    document.getElementById("servicos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="#inicio" className="rounded-md text-lg font-semibold tracking-tight transition-colors hover:text-primary">
          {navbarContent.brand}
        </Link>

        <Button asChild size="sm">
          <a
            href={siteLinks.clientPortalLoginUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("click_ja_sou_cliente", { source: "navbar" })}
          >
            {navbarContent.actionLabel}
          </a>
        </Button>
      </div>

      <nav className="mx-auto w-full max-w-6xl px-4 pb-3 md:px-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {serviceItems.length > 0 ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="shrink-0">
                  {navbarContent.servicesMenuLabel}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>{navbarContent.servicesMenuHint}</DropdownMenuLabel>
                {serviceItems.map((service) => (
                  <DropdownMenuItem key={service.id} onSelect={() => handleServiceSelect(service.id)}>
                    {service.title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}

          {linksWithoutServicesMenu.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="shrink-0 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
