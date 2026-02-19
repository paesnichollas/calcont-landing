import { CtaSection } from "@/components/sections/cta";
import { FooterSection } from "@/components/sections/footer";
import { GalleryCarouselSection } from "@/components/sections/gallery-carousel";
import { HeroSection } from "@/components/sections/hero";
import { HighlightsCarouselSection } from "@/components/sections/highlights-carousel";
import { NavbarSection } from "@/components/sections/navbar";
import { NumbersSection } from "@/components/sections/numbers";
import { ServicesSection } from "@/components/sections/services";
import { SignatureBandSection } from "@/components/sections/signature-band";
import { TeamByCitySection } from "@/components/sections/team-by-city";
import { TestimonialsSection } from "@/components/sections/testimonials";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarSection />
      <main>
        <HeroSection />
        <SignatureBandSection />
        <HighlightsCarouselSection />
        <ServicesSection />
        <TeamByCitySection />
        <NumbersSection />
        <GalleryCarouselSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <FooterSection />
    </div>
  );
}
