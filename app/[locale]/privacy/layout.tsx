import type React from "react";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fa" ? "حریم خصوصی | پرومال" : "Privacy Policy | ProMall",
    robots: { index: false, follow: true },
  };
}

export default function PrivacyLayout({ children }: Props) {
  return children;
}
