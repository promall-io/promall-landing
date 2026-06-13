import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ProMall — پرومال",
    short_name: "ProMall",
    description:
      "پنل مدیریت آنلاین شاپ و فروشگاه‌ساز اینستاگرام با هوش مصنوعی؛ مدیریت محصول، سفارش، پرداخت و انبار، همه تو یه پنل.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f6f7f9",
    lang: "fa",
    dir: "rtl",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
