import type { MetadataRoute } from 'next';
import { defaultTheme, PAGE_BACKGROUND } from '@/lib/theme';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ProMall — پرومال',
    short_name: 'ProMall',
    description:
      'پنل مدیریت آنلاین شاپ؛ دایرکت اینستاگرامت رو با هوش مصنوعی جواب می‌ده، سفارش و فاکتور ثبت می‌کنه و محصول، انبار و گزارش فروش رو یه‌جا نگه می‌داره.',
    start_url: '/',
    display: 'standalone',
    background_color: PAGE_BACKGROUND[defaultTheme],
    theme_color: PAGE_BACKGROUND[defaultTheme],
    lang: 'fa',
    dir: 'rtl',
    icons: [
      {
        src: '/brand/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/brand/favicon.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
