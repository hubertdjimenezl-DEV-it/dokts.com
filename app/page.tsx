import { SiteHeader } from "@/components/landing/site-header";
import { HeroSection } from "@/components/landing/hero-section";
import {
  ListenShowcase,
  SolutionsGrid,
  TimeCalculator,
  TrustSection,
  AudienceSection,
  SiteFooter,
} from "@/components/landing/body-sections";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroSection />
      <ListenShowcase />
      <SolutionsGrid />
      <TimeCalculator />
      <TrustSection />
      <AudienceSection />
      <SiteFooter />
    </>
  );
}
