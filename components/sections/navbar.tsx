import Link from "next/link";
import { navbarContent } from "@/content/landing";
import { siteLinks } from "@/content/links";
import { Button } from "@/components/ui/button";

export function NavbarSection() {
  const navigation = navbarContent.navigation ?? [];

  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {navbarContent.brand}
        </Link>

        {navigation.length > 0 ? (
          <nav className="hidden items-center gap-4 md:flex">
            {navigation.map((item) => (
              <a key={item.id} href={item.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        <Button asChild size="sm">
          <a href={siteLinks.onvio} target="_blank" rel="noreferrer">
            {navbarContent.actionLabel}
          </a>
        </Button>
      </div>
    </header>
  );
}
