import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { BentoSection } from "@/components/bento-section"
import { LargeTestimonial } from "@/components/large-testimonial"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialGridSection } from "@/components/testimonial-grid-section"
import { FAQSection } from "@/components/faq-section"
import { CTASection } from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"
import { AnimatedSection } from "@/components/animated-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Header با موقعیت ثابت */}
      <Header />

      {/* محتوای اصلی */}
      <div className="relative z-10">
        {/* Hero Section - Full width without container */}
        <main className="w-full">
          <HeroSection />
        </main>

        {/* Features Section با فاصله استاندارد */}
        <AnimatedSection
          id="features-section"
          className="relative z-10 w-full mt-32 sm:mt-40 md:mt-48 lg:mt-56"
          delay={0.1}
        >
          <BentoSection />
        </AnimatedSection>

        {/* Large Testimonial */}
        <AnimatedSection
          className="relative z-10 w-full mt-24 sm:mt-32 lg:mt-40"
          delay={0.15}
        >
          <LargeTestimonial />
        </AnimatedSection>

        {/* Pricing Section */}
        <AnimatedSection
          id="pricing-section"
          className="relative z-10 w-full mt-24 sm:mt-32 lg:mt-40"
          delay={0.2}
        >
          <PricingSection />
        </AnimatedSection>

        {/* Testimonials Grid */}
        <AnimatedSection
          id="testimonials-section"
          className="relative z-10 w-full mt-24 sm:mt-32 lg:mt-40"
          delay={0.15}
        >
          <TestimonialGridSection />
        </AnimatedSection>

        {/* FAQ Section */}
        <AnimatedSection
          id="faq-section"
          className="relative z-10 w-full mt-24 sm:mt-32 lg:mt-40"
          delay={0.2}
        >
          <FAQSection />
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection
          className="relative z-10 w-full mt-24 sm:mt-32 lg:mt-40"
          delay={0.15}
        >
          <CTASection />
        </AnimatedSection>

        {/* Footer - بدون padding برای full-width background */}
        <AnimatedSection
          className="relative z-10 mt-24 sm:mt-32 lg:mt-40"
          delay={0.1}
        >
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  )
}
