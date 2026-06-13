import type React from "react";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fa" ? "قوانین استفاده | پرومال" : "Terms of Service | ProMall",
    robots: { index: false, follow: true },
  };
}

export default function TermsLayout({ children }: Props) {
  return children;
}
