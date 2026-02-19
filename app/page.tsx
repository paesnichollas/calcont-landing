import { CtaSection } from "@/components/sections/cta";
import { FooterSection } from "@/components/sections/footer";
import { HeroSection } from "@/components/sections/hero";
import { NavbarSection } from "@/components/sections/navbar";
import { NumbersSection } from "@/components/sections/numbers";
import { ServicesSection } from "@/components/sections/services";
import { TeamByCitySection } from "@/components/sections/team-by-city";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarSection />
      <main>
        <HeroSection />
        <ServicesSection />
        <TeamByCitySection />
        <NumbersSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
