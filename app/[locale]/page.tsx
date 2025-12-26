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

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Features Section */}
        <BentoSection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* AI Features */}
        <AIFeaturesSection />

        {/* Large Testimonial */}
        <LargeTestimonial />

        {/* Pricing Section */}
        <PricingSection />

        {/* Benefits Grid */}
        <TestimonialGridSection />

        {/* FAQ Section */}
        <FAQSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}
