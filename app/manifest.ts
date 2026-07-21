import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ProMall — پرومال",
    short_name: "ProMall",
    description:
      "پنل مدیریت آنلاین شاپ و فروشگاه‌ساز اینستاگرام با هوش مصنوعی؛ مدیریت محصول، سفارش، پرداخت و انبار، همه تو یه پنل.",
    start_url: "/",
    display: "standalone",
    background_color: "#080d17",
    theme_color: "#080d17",
    lang: "fa",
    dir: "rtl",
    icons: [
      {
        src: "/brand/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/brand/favicon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
