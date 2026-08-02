import { setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import { Nav } from '@/components/Nav';
import { StructuredData } from '@/components/StructuredData';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/sections/Hero';
import { Intro } from '@/components/sections/Intro';
import { InstagramDemo } from '@/components/sections/InstagramDemo';
import { Features } from '@/components/sections/Features';
import { Why } from '@/components/sections/Why';
import { About } from '@/components/sections/About';
import { Integrations } from '@/components/sections/Integrations';
import { Changelog } from '@/components/sections/Changelog';
import { Numbers } from '@/components/sections/Numbers';
import { Pricing } from '@/components/sections/Pricing';
import { Faq } from '@/components/sections/Faq';
import { Blog } from '@/components/sections/Blog';
import { Cta } from '@/components/sections/Cta';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <StructuredData locale={locale} />
      <Nav />
      <main id="main">
        <Hero />
        <Intro />
        <InstagramDemo />
        <Features />
        <Why />
        <About />
        <Integrations />
        <Changelog />
        <Numbers />
        <Pricing />
        <Faq />
        <Blog />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
