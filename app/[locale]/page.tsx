import { setRequestLocale } from "next-intl/server";
import { HeroGlass } from "@/components/hero-glass";
import { MarqueeBand } from "@/components/marquee-band";
import { ShowcaseSection } from "@/components/showcase-section";
import { InstagramAiSection } from "@/components/instagram-ai-section";
import { StatsSection } from "@/components/stats-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { PricingSection } from "@/components/pricing-section";
import { FAQSection } from "@/components/faq-section";
import { CTASection } from "@/components/cta-section";
import { FooterSection } from "@/components/footer-section";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LandingPage({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroGlass />
        <MarqueeBand />
        <ShowcaseSection />
        <InstagramAiSection />
        <StatsSection />
        <HowItWorksSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  );
}
