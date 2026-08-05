import type { Locale } from '@/i18n/config';

export type ReplicaOrderStatus =
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'completed'
  | 'awaitingPayment'
  | 'cancelled';

export type ReplicaKpiId = 'revenue' | 'orders' | 'customers' | 'averageOrder';

type ReplicaOrder = {
  id: string;
  name: string;
  amount: string;
  status: ReplicaOrderStatus;
};

type ReplicaBar = {
  value: string;
  pct: number;
  day: string;
};

type ReplicaTopProduct = {
  name: string;
  revenue: string;
  sold: string;
  pct: number;
};

type ReplicaLowStockItem = {
  name: string;
  sku: string;
  qty: string;
  critical: boolean;
};

type ReplicaProduct = {
  name: string;
  meta: string;
  price: string;
  stock: string;
  active: boolean;
};

type ReplicaStat = {
  label: string;
  value: string;
};

export type ReplicaCopy = {
  brand: { name: string; sub: string };
  mobile: { statusTime: string; more: string; attention: string; viewOrders: string };
  navGroups: { shop: string; growth: string; account: string };
  nav: {
    dashboard: string;
    orders: string;
    products: string;
    categories: string;
    inventory: string;
    customers: string;
    discountCodes: string;
    campaigns: string;
    reports: string;
    aiAssistant: string;
    settings: string;
    subscription: string;
  };
  profile: { avatar: string; name: string; meta: string; collapse: string };
  header: { newOrder: string; greeting: string; date: string };
  tabTitles: { orders: string; products: string };
  hero: {
    eyebrow: string;
    title: string;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
    tiles: [ReplicaStat, ReplicaStat, ReplicaStat];
  };
  kpis: Record<ReplicaKpiId, { label: string; value: string; unit?: string; delta?: string; note?: string }>;
  kpiDeltaNote: string;
  sales: { title: string; sub: string; badge: string; bars: ReplicaBar[] };
  topProducts: { title: string; ranks: string[]; items: ReplicaTopProduct[] };
  orderColumns: { order: string; customer: string; amount: string; status: string };
  orderStatuses: Record<ReplicaOrderStatus, string>;
  recentOrders: { title: string; viewAll: string; rows: ReplicaOrder[] };
  lowStock: { title: string; badge: string; items: ReplicaLowStockItem[] };
  ordersPane: {
    title: string;
    sub: string;
    badge: string;
    stats: [ReplicaStat, ReplicaStat, ReplicaStat, ReplicaStat];
    filters: string[];
    extraRows: ReplicaOrder[];
    footer: string;
    pages: string[];
  };
  productsPane: {
    title: string;
    sub: string;
    newProduct: string;
    search: string;
    filters: string[];
    columns: { item: string; price: string; stock: string; status: string };
    statusActive: string;
    statusDraft: string;
    rows: ReplicaProduct[];
  };
};

const fa: ReplicaCopy = {
  brand: { name: 'پرومال', sub: 'پنل فروشگاه' },
  mobile: {
    statusTime: '۹:۴۱',
    more: 'بیشتر',
    attention: 'نیاز به رسیدگی',
    viewOrders: 'رسیدگی کن',
  },
  navGroups: { shop: 'فروشگاه', growth: 'رشد', account: 'حساب' },
  nav: {
    dashboard: 'داشبورد',
    orders: 'سفارشات',
    products: 'محصولات',
    categories: 'دسته‌ها',
    inventory: 'انبارداری',
    customers: 'مشتریان',
    discountCodes: 'کدهای تخفیف',
    campaigns: 'کمپین',
    reports: 'گزارشات',
    aiAssistant: 'دستیار هوش مصنوعی',
    settings: 'تنظیمات',
    subscription: 'اشتراک',
  },
  profile: {
    avatar: 'ت',
    name: 'ترمه محمدی',
    meta: 'مالک · مزون ترمه',
    collapse: 'جمع کردن',
  },
  header: {
    newOrder: 'سفارش جدید',
    greeting: 'صبح بخیر، ترمه',
    date: 'یکشنبه، ۲۸ تیر ۱۴۰۵',
  },
  tabTitles: { orders: 'سفارشات', products: 'محصولات' },
  hero: {
    eyebrow: 'خوش آمدی، ترمه',
    title: 'بیا کارهای امروزت رو تموم کنیم 🌿',
    sub: 'یکشنبه، ۲۸ تیر ۱۴۰۵‏ · ‏۹ مورد نیاز به رسیدگی داره',
    primaryCta: 'رسیدگی به سفارش‌ها',
    secondaryCta: 'سفارش جدید',
    tiles: [
      { value: '۳ سفارش', label: 'در انتظار ارسال' },
      { value: '۲ پیام', label: 'بی‌پاسخ در دایرکت' },
      { value: '۴ کالا', label: 'رو به اتمام موجودی' },
    ],
  },
  kpis: {
    revenue: { label: 'درآمد کل', value: '۸۴٬۲۵۰٬۰۰۰', unit: 'تومان', delta: '۱۸٪' },
    orders: { label: 'کل سفارشات', value: '۱۲۶', note: '۹۸ تکمیل شده' },
    customers: { label: 'مشتریان', value: '۸۹', note: '۱۴ مشتری جدید' },
    averageOrder: { label: 'میانگین سفارش', value: '۶۶۸٬۰۰۰', unit: 'تومان', note: 'نرخ تکمیل: ۷۸٪' },
  },
  kpiDeltaNote: 'نسبت به ماه قبل',
  sales: {
    title: 'روند فروش این هفته',
    sub: 'مجموع ۱۲٬۴۸۰٬۰۰۰ تومان',
    badge: '۱۲٪ رشد هفتگی',
    bars: [
      { value: '۸۵۰هزار', pct: 24, day: 'ش' },
      { value: '۱٫۲م', pct: 34, day: 'ی' },
      { value: '۹۸۰هزار', pct: 28, day: 'د' },
      { value: '۱٫۶م', pct: 46, day: 'س' },
      { value: '۱٫۴م', pct: 40, day: 'چ' },
      { value: '۲٫۹م', pct: 83, day: 'پ' },
      { value: '۳٫۵م', pct: 100, day: 'ج' },
    ],
  },
  topProducts: {
    title: 'پرفروش‌ترین محصولات',
    ranks: ['۱', '۲', '۳', '۴', '۵'],
    items: [
      { name: 'مانتو کتان کرم', revenue: '۲۴٬۸۰۰٬۰۰۰ تومان', sold: '۳۲ فروش', pct: 100 },
      { name: 'شومیز ساتن مشکی', revenue: '۱۸٬۲۰۰٬۰۰۰ تومان', sold: '۲۶ فروش', pct: 73 },
      { name: 'شال نخی طوسی', revenue: '۱۲٬۶۰۰٬۰۰۰ تومان', sold: '۴۱ فروش', pct: 51 },
      { name: 'سارافون لینن', revenue: '۹٬۸۰۰٬۰۰۰ تومان', sold: '۱۴ فروش', pct: 40 },
      { name: 'دامن پلیسه', revenue: '۷٬۲۰۰٬۰۰۰ تومان', sold: '۱۹ فروش', pct: 29 },
    ],
  },
  orderColumns: { order: 'سفارش', customer: 'مشتری', amount: 'مبلغ', status: 'وضعیت' },
  orderStatuses: {
    confirmed: 'تایید شده',
    processing: 'در حال پردازش',
    shipped: 'ارسال شده',
    completed: 'تکمیل شده',
    awaitingPayment: 'در انتظار پرداخت',
    cancelled: 'لغو شده',
  },
  recentOrders: {
    title: 'سفارش‌های اخیر',
    viewAll: 'مشاهده همه',
    rows: [
      { id: '#۱۰۸۷', name: 'غزل محمدی', amount: '۱٬۲۸۰٬۰۰۰ تومان', status: 'confirmed' },
      { id: '#۱۰۸۶', name: 'سارا احمدی', amount: '۸۹۰٬۰۰۰ تومان', status: 'processing' },
      { id: '#۱۰۸۵', name: 'نگار کریمی', amount: '۲٬۱۴۰٬۰۰۰ تومان', status: 'shipped' },
      { id: '#۱۰۸۴', name: 'مریم رضایی', amount: '۶۴۰٬۰۰۰ تومان', status: 'completed' },
      { id: '#۱۰۸۳', name: 'الهام موسوی', amount: '۱٬۷۵۰٬۰۰۰ تومان', status: 'awaitingPayment' },
    ],
  },
  lowStock: {
    title: 'موجودی کم',
    badge: '۴ کالا',
    items: [
      { name: 'شال نخی طوسی', sku: 'SH-TU-01', qty: '۲ عدد', critical: true },
      { name: 'مانتو کتان کرم — سایز ۳۸', sku: 'MK-CRM-38', qty: '۴ عدد', critical: true },
      { name: 'شومیز ساتن مشکی', sku: 'SM-SB-01', qty: '۵ عدد', critical: false },
      { name: 'روسری ابریشم گلدار', sku: 'RA-GL-02', qty: '۶ عدد', critical: false },
    ],
  },
  ordersPane: {
    title: 'سفارشات',
    sub: '۱۲۶ سفارش در ۳۰ روز گذشته',
    badge: '۳ در انتظار ارسال',
    stats: [
      { label: 'کل سفارشات', value: '۱۲۶' },
      { label: 'در انتظار ارسال', value: '۳' },
      { label: 'تکمیل شده', value: '۹۸' },
      { label: 'میانگین سفارش', value: '۶۶۸٬۰۰۰' },
    ],
    filters: ['همه', 'در انتظار پرداخت', 'تایید شده', 'در حال پردازش', 'ارسال شده', 'تکمیل شده'],
    extraRows: [
      { id: '#۱۰۸۲', name: 'آیدا شریفی', amount: '۹۶۰٬۰۰۰ تومان', status: 'completed' },
      { id: '#۱۰۸۱', name: 'رها کاظمی', amount: '۲٬۸۶۰٬۰۰۰ تومان', status: 'shipped' },
      { id: '#۱۰۸۰', name: 'ستاره امیری', amount: '۵۴۰٬۰۰۰ تومان', status: 'cancelled' },
      { id: '#۱۰۷۹', name: 'مهسا نادری', amount: '۱٬۱۲۰٬۰۰۰ تومان', status: 'completed' },
      { id: '#۱۰۷۸', name: 'پریسا جلالی', amount: '۷۸۰٬۰۰۰ تومان', status: 'completed' },
      { id: '#۱۰۷۷', name: 'شقایق طاهری', amount: '۱٬۹۶۰٬۰۰۰ تومان', status: 'shipped' },
      { id: '#۱۰۷۶', name: 'یاسمن قاسمی', amount: '۸۵۰٬۰۰۰ تومان', status: 'completed' },
    ],
    footer: 'نمایش ۱۲ از ۱۲۶ سفارش',
    pages: ['۱', '۲', '۳', '…', '۱۱'],
  },
  productsPane: {
    title: 'محصولات',
    sub: '۴۲ محصول فعال · ۴ کالا رو به اتمام',
    newProduct: 'محصول جدید',
    search: 'جست‌وجو تو محصولات…',
    filters: ['همه', 'فعال', 'پیش‌نویس', 'رو به اتمام'],
    columns: { item: 'کالا', price: 'قیمت', stock: 'موجودی', status: 'وضعیت' },
    statusActive: 'فعال',
    statusDraft: 'پیش‌نویس',
    rows: [
      { name: 'مانتو کتان کرم', meta: '۳ تنوع · MK-CRM', price: '۱٬۲۸۰٬۰۰۰ تومان', stock: '۲۴ عدد', active: true },
      { name: 'شومیز ساتن مشکی', meta: '۲ تنوع · SM-SB', price: '۸۹۰٬۰۰۰ تومان', stock: '۵ عدد', active: true },
      { name: 'شال نخی طوسی', meta: '۱ تنوع · SH-TU', price: '۴۲۰٬۰۰۰ تومان', stock: '۲ عدد', active: true },
      { name: 'سارافون لینن', meta: '۴ تنوع · SF-LN', price: '۹۸۰٬۰۰۰ تومان', stock: '۱۸ عدد', active: true },
      { name: 'کت تک لینن', meta: '۲ تنوع · KT-LN', price: '۱٬۸۴۰٬۰۰۰ تومان', stock: '۹ عدد', active: true },
      { name: 'دامن پلیسه', meta: '۲ تنوع · DP-PL', price: '۷۶۰٬۰۰۰ تومان', stock: '۳۱ عدد', active: true },
      { name: 'پیراهن نخی راه‌راه', meta: '۳ تنوع · PN-RR', price: '۹۲۰٬۰۰۰ تومان', stock: '۱۴ عدد', active: true },
      { name: 'شلوار پارچه‌ای مشکی', meta: '۲ تنوع · SP-MK', price: '۱٬۱۶۰٬۰۰۰ تومان', stock: '۲۲ عدد', active: true },
      { name: 'تاپ کبریتی', meta: '۱ تنوع · TP-KB', price: '۴۸۰٬۰۰۰ تومان', stock: '۲۷ عدد', active: true },
      { name: 'کیف دوشی چرم', meta: '۱ تنوع · KF-CH', price: '۲٬۴۰۰٬۰۰۰ تومان', stock: '۷ عدد', active: true },
      { name: 'روسری ابریشم گلدار', meta: '۱ تنوع · RA-GL', price: '۶۴۰٬۰۰۰ تومان', stock: '۶ عدد', active: false },
    ],
  },
};

const en: ReplicaCopy = {
  brand: { name: 'ProMall', sub: 'Shop panel' },
  mobile: {
    statusTime: '9:41',
    more: 'More',
    attention: 'Needs attention',
    viewOrders: 'Handle them',
  },
  navGroups: { shop: 'Shop', growth: 'Growth', account: 'Account' },
  nav: {
    dashboard: 'Dashboard',
    orders: 'Orders',
    products: 'Products',
    categories: 'Categories',
    inventory: 'Inventory',
    customers: 'Customers',
    discountCodes: 'Discount codes',
    campaigns: 'Campaigns',
    reports: 'Reports',
    aiAssistant: 'AI assistant',
    settings: 'Settings',
    subscription: 'Subscription',
  },
  profile: {
    avatar: 'T',
    name: 'Termeh Mohammadi',
    meta: 'Owner · Termeh Atelier',
    collapse: 'Collapse',
  },
  header: {
    newOrder: 'New order',
    greeting: 'Good morning, Termeh',
    date: 'Sunday, 19 July 2026',
  },
  tabTitles: { orders: 'Orders', products: 'Products' },
  hero: {
    eyebrow: 'Welcome back, Termeh',
    title: "Let's clear today's work 🌿",
    sub: 'Sunday, 19 July 2026 · 9 things need your attention',
    primaryCta: 'Handle orders',
    secondaryCta: 'New order',
    tiles: [
      { value: '3 orders', label: 'Awaiting shipment' },
      { value: '2 messages', label: 'Unanswered in DMs' },
      { value: '4 items', label: 'Running low on stock' },
    ],
  },
  kpis: {
    revenue: { label: 'Total revenue', value: '84,250,000', unit: 'Toman', delta: '18%' },
    orders: { label: 'Total orders', value: '126', note: '98 completed' },
    customers: { label: 'Customers', value: '89', note: '14 new customers' },
    averageOrder: { label: 'Average order', value: '668,000', unit: 'Toman', note: 'Completion rate: 78%' },
  },
  kpiDeltaNote: 'vs. last month',
  sales: {
    title: "This week's sales trend",
    sub: '12,480,000 Toman total',
    badge: '12% weekly growth',
    bars: [
      { value: '850K', pct: 24, day: 'Sat' },
      { value: '1.2M', pct: 34, day: 'Sun' },
      { value: '980K', pct: 28, day: 'Mon' },
      { value: '1.6M', pct: 46, day: 'Tue' },
      { value: '1.4M', pct: 40, day: 'Wed' },
      { value: '2.9M', pct: 83, day: 'Thu' },
      { value: '3.5M', pct: 100, day: 'Fri' },
    ],
  },
  topProducts: {
    title: 'Best sellers',
    ranks: ['1', '2', '3', '4', '5'],
    items: [
      { name: 'Cream linen coat', revenue: '24,800,000 Toman', sold: '32 sold', pct: 100 },
      { name: 'Black satin blouse', revenue: '18,200,000 Toman', sold: '26 sold', pct: 73 },
      { name: 'Grey cotton scarf', revenue: '12,600,000 Toman', sold: '41 sold', pct: 51 },
      { name: 'Linen pinafore', revenue: '9,800,000 Toman', sold: '14 sold', pct: 40 },
      { name: 'Pleated skirt', revenue: '7,200,000 Toman', sold: '19 sold', pct: 29 },
    ],
  },
  orderColumns: { order: 'Order', customer: 'Customer', amount: 'Amount', status: 'Status' },
  orderStatuses: {
    confirmed: 'Confirmed',
    processing: 'Processing',
    shipped: 'Shipped',
    completed: 'Completed',
    awaitingPayment: 'Awaiting payment',
    cancelled: 'Cancelled',
  },
  recentOrders: {
    title: 'Recent orders',
    viewAll: 'View all',
    rows: [
      { id: '#1087', name: 'Ghazal Mohammadi', amount: '1,280,000 Toman', status: 'confirmed' },
      { id: '#1086', name: 'Sara Ahmadi', amount: '890,000 Toman', status: 'processing' },
      { id: '#1085', name: 'Negar Karimi', amount: '2,140,000 Toman', status: 'shipped' },
      { id: '#1084', name: 'Maryam Rezaei', amount: '640,000 Toman', status: 'completed' },
      { id: '#1083', name: 'Elham Mousavi', amount: '1,750,000 Toman', status: 'awaitingPayment' },
    ],
  },
  lowStock: {
    title: 'Low stock',
    badge: '4 items',
    items: [
      { name: 'Grey cotton scarf', sku: 'SH-TU-01', qty: '2 left', critical: true },
      { name: 'Cream linen coat — size 38', sku: 'MK-CRM-38', qty: '4 left', critical: true },
      { name: 'Black satin blouse', sku: 'SM-SB-01', qty: '5 left', critical: false },
      { name: 'Floral silk headscarf', sku: 'RA-GL-02', qty: '6 left', critical: false },
    ],
  },
  ordersPane: {
    title: 'Orders',
    sub: '126 orders in the last 30 days',
    badge: '3 awaiting shipment',
    stats: [
      { label: 'Total orders', value: '126' },
      { label: 'Awaiting shipment', value: '3' },
      { label: 'Completed', value: '98' },
      { label: 'Average order', value: '668,000' },
    ],
    filters: ['All', 'Awaiting payment', 'Confirmed', 'Processing', 'Shipped', 'Completed'],
    extraRows: [
      { id: '#1082', name: 'Aida Sharifi', amount: '960,000 Toman', status: 'completed' },
      { id: '#1081', name: 'Raha Kazemi', amount: '2,860,000 Toman', status: 'shipped' },
      { id: '#1080', name: 'Setareh Amiri', amount: '540,000 Toman', status: 'cancelled' },
      { id: '#1079', name: 'Mahsa Naderi', amount: '1,120,000 Toman', status: 'completed' },
      { id: '#1078', name: 'Parisa Jalali', amount: '780,000 Toman', status: 'completed' },
      { id: '#1077', name: 'Shaghayegh Taheri', amount: '1,960,000 Toman', status: 'shipped' },
      { id: '#1076', name: 'Yasaman Ghasemi', amount: '850,000 Toman', status: 'completed' },
    ],
    footer: 'Showing 12 of 126 orders',
    pages: ['1', '2', '3', '…', '11'],
  },
  productsPane: {
    title: 'Products',
    sub: '42 active products · 4 running low',
    newProduct: 'New product',
    search: 'Search products…',
    filters: ['All', 'Active', 'Draft', 'Low stock'],
    columns: { item: 'Item', price: 'Price', stock: 'Stock', status: 'Status' },
    statusActive: 'Active',
    statusDraft: 'Draft',
    rows: [
      { name: 'Cream linen coat', meta: '3 variants · MK-CRM', price: '1,280,000 Toman', stock: '24 in stock', active: true },
      { name: 'Black satin blouse', meta: '2 variants · SM-SB', price: '890,000 Toman', stock: '5 in stock', active: true },
      { name: 'Grey cotton scarf', meta: '1 variant · SH-TU', price: '420,000 Toman', stock: '2 in stock', active: true },
      { name: 'Linen pinafore', meta: '4 variants · SF-LN', price: '980,000 Toman', stock: '18 in stock', active: true },
      { name: 'Linen blazer', meta: '2 variants · KT-LN', price: '1,840,000 Toman', stock: '9 in stock', active: true },
      { name: 'Pleated skirt', meta: '2 variants · DP-PL', price: '760,000 Toman', stock: '31 in stock', active: true },
      { name: 'Striped cotton shirt', meta: '3 variants · PN-RR', price: '920,000 Toman', stock: '14 in stock', active: true },
      { name: 'Black tailored trousers', meta: '2 variants · SP-MK', price: '1,160,000 Toman', stock: '22 in stock', active: true },
      { name: 'Ribbed tank top', meta: '1 variant · TP-KB', price: '480,000 Toman', stock: '27 in stock', active: true },
      { name: 'Leather shoulder bag', meta: '1 variant · KF-CH', price: '2,400,000 Toman', stock: '7 in stock', active: true },
      { name: 'Floral silk headscarf', meta: '1 variant · RA-GL', price: '640,000 Toman', stock: '6 in stock', active: false },
    ],
  },
};

export const REPLICA_COPY: Record<Locale, ReplicaCopy> = { fa, en };
