import { setRequestLocale } from "next-intl/server";
import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { BentoSection } from "@/components/bento-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { AIFeaturesSection } from "@/components/ai-features-section";
import { LargeTestimonial } from "@/components/large-testimonial";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialGridSection } from "@/components/testimonial-grid-section";
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
      <Header />
      <main>
        <HeroSection />
        <BentoSection />
        <HowItWorksSection />
        <AIFeaturesSection />
        <LargeTestimonial />
        <PricingSection />
        <TestimonialGridSection />
        <FAQSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  );
}
