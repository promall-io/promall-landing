"use client"

import { useEffect, useRef, useState } from "react"
import { PA_BOLD, PA_LINEAR, type PaIconName } from "./app-replica-icons"
import "./app-replica.css"

const NATIVE_W = 1280
const NATIVE_H = 860

type PaTab = "dashboard" | "orders" | "products"

function PaIcon({
  name,
  variant = "linear",
  className,
}: {
  name: PaIconName
  variant?: "linear" | "bold"
  className?: string
}) {
  const svg = variant === "bold" ? PA_BOLD[name] : PA_LINEAR[name]
  return (
    <span
      aria-hidden="true"
      className={`pa-icon ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

const LOGO_BOWL =
  "M 190 42 L 392 42 A 150 150 0 0 1 538 192 L 538 300 C 538 372 496 426 410 456 L 214 458 L 398 268 L 402 248 C 402 210 398 192 378 182 L 120 176 C 92 175 78 170 70 162 L 190 42 Z"
const LOGO_STEM =
  "M 42 246 Q 42 234 54 234 L 179 234 Q 191 234 191 246 L 191 468 L 44 616 L 42 612 L 42 246 Z"

function PaLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round((size * 660) / 580)}
      viewBox="0 0 580 660"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d={LOGO_BOWL} fill="#f3f5f8" />
      <path d={LOGO_STEM} fill="var(--gold)" />
    </svg>
  )
}

type NavItem = { label: string; icon: PaIconName; tab?: PaTab }
type NavGroup = { label: string; items: NavItem[] }

const NAV_GROUPS: NavGroup[] = [
  {
    label: "فروشگاه",
    items: [
      { label: "داشبورد", icon: "Squares2X2Icon", tab: "dashboard" },
      { label: "سفارشات", icon: "QueueListIcon", tab: "orders" },
      { label: "محصولات", icon: "CubeIcon", tab: "products" },
      { label: "دسته‌ها", icon: "RectangleStackIcon" },
      { label: "انبارداری", icon: "CubeTransparentIcon" },
    ],
  },
  {
    label: "رشد",
    items: [
      { label: "مشتریان", icon: "UsersIcon" },
      { label: "کدهای تخفیف", icon: "TagIcon" },
      { label: "کمپین", icon: "SpeakerIcon" },
      { label: "گزارشات", icon: "ChartBarIcon" },
      { label: "دستیار هوش مصنوعی", icon: "SparklesIcon" },
    ],
  },
  {
    label: "حساب",
    items: [
      { label: "تنظیمات", icon: "Cog6ToothIcon" },
      { label: "اشتراک", icon: "CreditCardIcon" },
    ],
  },
]

const KPIS: Array<{
  label: string
  value: string
  unit?: string
  icon: PaIconName
  iconBg: string
  iconFg: string
  delta?: string
  note?: string
}> = [
  {
    label: "درآمد کل",
    value: "۸۴٬۲۵۰٬۰۰۰",
    unit: "تومان",
    icon: "WalletIcon",
    iconBg: "var(--gold-soft)",
    iconFg: "var(--gold)",
    delta: "۱۸٪",
  },
  {
    label: "کل سفارشات",
    value: "۱۲۶",
    icon: "ShoppingCartIcon",
    iconBg: "var(--info-soft)",
    iconFg: "var(--info)",
    note: "۹۸ تکمیل شده",
  },
  {
    label: "مشتریان",
    value: "۸۹",
    icon: "UsersIcon",
    iconBg: "var(--success-soft)",
    iconFg: "var(--success-ink)",
    note: "۱۴ مشتری جدید",
  },
  {
    label: "میانگین سفارش",
    value: "۶۶۸٬۰۰۰",
    unit: "تومان",
    icon: "ChartBarIcon",
    iconBg: "var(--warning-soft)",
    iconFg: "var(--warning-ink)",
    note: "نرخ تکمیل: ۷۸٪",
  },
]

const WEEK_BARS = [
  { value: "۸۵۰هزار", pct: 24, day: "ش" },
  { value: "۱٫۲م", pct: 34, day: "ی" },
  { value: "۹۸۰هزار", pct: 28, day: "د" },
  { value: "۱٫۶م", pct: 46, day: "س" },
  { value: "۱٫۴م", pct: 40, day: "چ" },
  { value: "۲٫۹م", pct: 83, day: "پ" },
  { value: "۳٫۵م", pct: 100, day: "ج" },
]

const RANK_BADGES = [
  { bg: "var(--gold)", fg: "var(--ink)" },
  { bg: "var(--slate)", fg: "#ffffff" },
  { bg: "#2f6ca2", fg: "#ffffff" },
  { bg: "var(--slate-soft)", fg: "#ffffff" },
  { bg: "var(--slate-soft)", fg: "#ffffff" },
]

const TOP_PRODUCTS = [
  { name: "مانتو کتان کرم", revenue: "۲۴٬۸۰۰٬۰۰۰ تومان", sold: "۳۲ فروش", pct: 100 },
  { name: "شومیز ساتن مشکی", revenue: "۱۸٬۲۰۰٬۰۰۰ تومان", sold: "۲۶ فروش", pct: 73 },
  { name: "شال نخی طوسی", revenue: "۱۲٬۶۰۰٬۰۰۰ تومان", sold: "۴۱ فروش", pct: 51 },
  { name: "سارافون لینن", revenue: "۹٬۸۰۰٬۰۰۰ تومان", sold: "۱۴ فروش", pct: 40 },
  { name: "دامن پلیسه", revenue: "۷٬۲۰۰٬۰۰۰ تومان", sold: "۱۹ فروش", pct: 29 },
]

type OrderRow = { id: string; name: string; amount: string; status: string; tone: string }

const RECENT_ORDERS: OrderRow[] = [
  { id: "#۱۰۸۷", name: "غزل محمدی", amount: "۱٬۲۸۰٬۰۰۰ تومان", status: "تایید شده", tone: "pm-opill--success" },
  { id: "#۱۰۸۶", name: "سارا احمدی", amount: "۸۹۰٬۰۰۰ تومان", status: "در حال پردازش", tone: "pm-opill--info" },
  { id: "#۱۰۸۵", name: "نگار کریمی", amount: "۲٬۱۴۰٬۰۰۰ تومان", status: "ارسال شده", tone: "pm-opill--brand" },
  { id: "#۱۰۸۴", name: "مریم رضایی", amount: "۶۴۰٬۰۰۰ تومان", status: "تکمیل شده", tone: "pm-opill--success" },
  { id: "#۱۰۸۳", name: "الهام موسوی", amount: "۱٬۷۵۰٬۰۰۰ تومان", status: "در انتظار پرداخت", tone: "pm-opill--warning" },
]

const ALL_ORDERS: OrderRow[] = [
  ...RECENT_ORDERS,
  { id: "#۱۰۸۲", name: "آیدا شریفی", amount: "۹۶۰٬۰۰۰ تومان", status: "تکمیل شده", tone: "pm-opill--success" },
  { id: "#۱۰۸۱", name: "رها کاظمی", amount: "۲٬۸۶۰٬۰۰۰ تومان", status: "ارسال شده", tone: "pm-opill--brand" },
  { id: "#۱۰۸۰", name: "ستاره امیری", amount: "۵۴۰٬۰۰۰ تومان", status: "لغو شده", tone: "pm-opill--danger" },
  { id: "#۱۰۷۹", name: "مهسا نادری", amount: "۱٬۱۲۰٬۰۰۰ تومان", status: "تکمیل شده", tone: "pm-opill--success" },
  { id: "#۱۰۷۸", name: "پریسا جلالی", amount: "۷۸۰٬۰۰۰ تومان", status: "تکمیل شده", tone: "pm-opill--success" },
  { id: "#۱۰۷۷", name: "شقایق طاهری", amount: "۱٬۹۶۰٬۰۰۰ تومان", status: "ارسال شده", tone: "pm-opill--brand" },
  { id: "#۱۰۷۶", name: "یاسمن قاسمی", amount: "۸۵۰٬۰۰۰ تومان", status: "تکمیل شده", tone: "pm-opill--success" },
]

const ORDER_STATS = [
  { label: "کل سفارشات", value: "۱۲۶" },
  { label: "در انتظار ارسال", value: "۳", tone: "pa-stat__value--warning" },
  { label: "تکمیل شده", value: "۹۸", tone: "pa-stat__value--success" },
  { label: "میانگین سفارش", value: "۶۶۸٬۰۰۰" },
]

const ORDER_FILTERS = ["همه", "در انتظار پرداخت", "تایید شده", "در حال پردازش", "ارسال شده", "تکمیل شده"]

const LOW_STOCK = [
  { name: "شال نخی طوسی", sku: "SH-TU-01", qty: "۲ عدد", critical: true },
  { name: "مانتو کتان کرم — سایز ۳۸", sku: "MK-CRM-38", qty: "۴ عدد", critical: true },
  { name: "شومیز ساتن مشکی", sku: "SM-SB-01", qty: "۵ عدد", critical: false },
  { name: "روسری ابریشم گلدار", sku: "RA-GL-02", qty: "۶ عدد", critical: false },
]

const PRODUCTS = [
  { name: "مانتو کتان کرم", meta: "۳ تنوع · MK-CRM", price: "۱٬۲۸۰٬۰۰۰ تومان", stock: "۲۴ عدد", active: true },
  { name: "شومیز ساتن مشکی", meta: "۲ تنوع · SM-SB", price: "۸۹۰٬۰۰۰ تومان", stock: "۵ عدد", active: true },
  { name: "شال نخی طوسی", meta: "۱ تنوع · SH-TU", price: "۴۲۰٬۰۰۰ تومان", stock: "۲ عدد", active: true },
  { name: "سارافون لینن", meta: "۴ تنوع · SF-LN", price: "۹۸۰٬۰۰۰ تومان", stock: "۱۸ عدد", active: true },
  { name: "کت تک لینن", meta: "۲ تنوع · KT-LN", price: "۱٬۸۴۰٬۰۰۰ تومان", stock: "۹ عدد", active: true },
  { name: "دامن پلیسه", meta: "۲ تنوع · DP-PL", price: "۷۶۰٬۰۰۰ تومان", stock: "۳۱ عدد", active: true },
  { name: "پیراهن نخی راه‌راه", meta: "۳ تنوع · PN-RR", price: "۹۲۰٬۰۰۰ تومان", stock: "۱۴ عدد", active: true },
  { name: "شلوار پارچه‌ای مشکی", meta: "۲ تنوع · SP-MK", price: "۱٬۱۶۰٬۰۰۰ تومان", stock: "۲۲ عدد", active: true },
  { name: "تاپ کبریتی", meta: "۱ تنوع · TP-KB", price: "۴۸۰٬۰۰۰ تومان", stock: "۲۷ عدد", active: true },
  { name: "کیف دوشی چرم", meta: "۱ تنوع · KF-CH", price: "۲٬۴۰۰٬۰۰۰ تومان", stock: "۷ عدد", active: true },
  { name: "روسری ابریشم گلدار", meta: "۱ تنوع · RA-GL", price: "۶۴۰٬۰۰۰ تومان", stock: "۶ عدد", active: false },
]

function Sidebar({ activeTab, onSelect }: { activeTab: PaTab; onSelect: (tab: PaTab) => void }) {
  return (
    <aside className="pa-sidebar">
      <span className="pa-sidebar-highlight" />
      <span className="pa-sidebar-overlay" />
      <div className="pa-sidebar-brand">
        <PaLogo size={32} />
        <div style={{ minWidth: 0 }}>
          <p className="pa-sidebar-brand-name">پرومال</p>
          <p className="pa-sidebar-brand-sub">پنل فروشگاه</p>
        </div>
      </div>
      <nav className="pa-sidebar-nav">
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="pa-sidebar-group">
            <p className="pa-sidebar-section-label">{group.label}</p>
            <div className="pa-sidebar-items">
              {group.items.map((item) => {
                const active = item.tab === activeTab
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.tab ? () => onSelect(item.tab as PaTab) : undefined}
                    aria-pressed={active}
                    className={`pa-sidebar-item ${active ? "pa-sidebar-item-active" : ""}`}
                  >
                    {active ? <span className="pa-sidebar-active-indicator" /> : null}
                    <PaIcon name={item.icon} variant={active ? "bold" : "linear"} />
                    <span className="pa-sidebar-item-label">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
      <div className="pa-sidebar-footer">
        <div className="pa-sidebar-profile">
          <span className="pa-sidebar-profile-avatar">ت</span>
          <div style={{ flex: 1, minWidth: 0, textAlign: "start" }}>
            <p className="pa-sidebar-profile-name">ترمه محمدی</p>
            <p className="pa-sidebar-profile-meta">رئیس · مزون ترمه</p>
          </div>
          <span className="pa-sidebar-logout">
            <PaIcon name="ArrowRightOnRectangleIcon" />
          </span>
        </div>
        <span className="pa-sidebar-collapse">
          <PaIcon name="ChevronLeftIcon" />
          جمع کردن
        </span>
      </div>
    </aside>
  )
}

const TAB_TITLES: Record<PaTab, string | null> = {
  dashboard: null,
  orders: "سفارشات",
  products: "محصولات",
}

function WindowHeader({
  activeTab,
  onToggleFullscreen,
}: {
  activeTab: PaTab
  onToggleFullscreen?: () => void
}) {
  const title = TAB_TITLES[activeTab]
  return (
    <div className="pa-header">
      <div className="pa-header-cluster">
        <span className="pa-header-primary-btn">
          <PaIcon name="PlusIcon" />
          <span>سفارش جدید</span>
        </span>
        <span className="pa-header-icon-btn">
          <PaIcon name="ChatBubbleDirectIcon" />
        </span>
      </div>
      <div className="pa-header-center">
        {title ? (
          <span className="pa-header-title">{title}</span>
        ) : (
          <>
            <span className="pa-header-greeting">صبح بخیر، ترمه</span>
            <span className="pa-header-date">یکشنبه، ۲۸ تیر ۱۴۰۵</span>
          </>
        )}
      </div>
      <div className="pa-header-cluster">
        <span className="pa-header-icon-btn">
          <PaIcon name="MagnifyingGlassIcon" />
        </span>
        <span className="pa-header-icon-btn">
          <PaIcon name="BellIcon" />
        </span>
        <span className="pa-header-icon-btn">
          <PaIcon name="MoonIcon" />
        </span>
        <button
          type="button"
          onClick={onToggleFullscreen}
          aria-label="تمام‌صفحه"
          className="pa-header-icon-btn"
        >
          <PaIcon name="ArrowsPointingOutIcon" />
        </button>
      </div>
    </div>
  )
}

function HeroBanner() {
  return (
    <section className="pm-hero">
      <span className="pm-hero__glow" />
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <span className="pm-hero__eyebrow">
            <PaIcon name="SparklesIcon" variant="bold" />
            خوش آمدی، ترمه
          </span>
          <h3 className="pm-hero__title" style={{ color: "#fff" }}>
            بیا کارهای امروزت رو تموم کنیم 🌿
          </h3>
          <p className="pm-hero__sub">{"یکشنبه، ۲۸ تیر ۱۴۰۵‏ · ‏۹ مورد نیاز به رسیدگی داره"}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
          <span className="pm-hero__cta pm-hero__cta--gold">
            <PaIcon name="QueueListIcon" variant="bold" />
            رسیدگی به سفارش‌ها
          </span>
          <span className="pm-hero__cta pm-hero__cta--ghost">
            <PaIcon name="PlusCircleIcon" />
            سفارش جدید
          </span>
        </div>
      </div>
      <div
        className="pm-hero__divider"
        style={{ position: "relative", marginTop: 20, paddingTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}
      >
        <span className="pm-hero__tile">
          <span className="pm-hero__tile-icon pm-hero__tile-icon--gold">
            <PaIcon name="ArchiveBoxIcon" variant="bold" />
          </span>
          <span style={{ minWidth: 0, flex: 1 }}>
            <span className="pm-hero__tile-value">۳ سفارش</span>
            <span className="pm-hero__tile-label">در انتظار ارسال</span>
          </span>
          <PaIcon name="ChevronLeftIcon" className="pm-hero__tile-chev" />
        </span>
        <span className="pm-hero__tile">
          <span className="pm-hero__tile-icon pm-hero__tile-icon--mint">
            <PaIcon name="ChatBubbleDirectIcon" variant="bold" />
          </span>
          <span style={{ minWidth: 0, flex: 1 }}>
            <span className="pm-hero__tile-value">۲ پیام</span>
            <span className="pm-hero__tile-label">بی‌پاسخ در دایرکت</span>
          </span>
          <PaIcon name="ChevronLeftIcon" className="pm-hero__tile-chev" />
        </span>
        <span className="pm-hero__tile">
          <span className="pm-hero__tile-icon pm-hero__tile-icon--rose">
            <PaIcon name="ExclamationTriangleIcon" variant="bold" />
          </span>
          <span style={{ minWidth: 0, flex: 1 }}>
            <span className="pm-hero__tile-value">۴ کالا</span>
            <span className="pm-hero__tile-label">رو به اتمام موجودی</span>
          </span>
          <PaIcon name="ChevronLeftIcon" className="pm-hero__tile-chev" />
        </span>
      </div>
    </section>
  )
}

function KpiRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, flex: "none" }}>
      {KPIS.map((kpi) => (
        <div key={kpi.label} className="pm-kpi">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <span className="pm-kpi__label">{kpi.label}</span>
            <span className="pm-kpi__icon" style={{ background: kpi.iconBg, color: kpi.iconFg }}>
              <PaIcon name={kpi.icon} variant="bold" />
            </span>
          </div>
          <p className="pm-kpi__value">
            {kpi.value}
            {kpi.unit ? <span className="pm-kpi__unit">{kpi.unit}</span> : null}
          </p>
          {kpi.delta ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span
                className="pm-kpi__delta"
                style={{ background: "var(--success-soft)", color: "var(--success-ink)" }}
              >
                <PaIcon name="ArrowTrendingUpIcon" />
                <span>{kpi.delta}</span>
              </span>
              <span className="pm-kpi__note">نسبت به ماه قبل</span>
            </div>
          ) : (
            <p className="pm-kpi__note">{kpi.note}</p>
          )}
        </div>
      ))}
    </div>
  )
}

function SalesAndTopProducts() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 20, flex: "none" }}>
      <div className="pm-dash-card" style={{ gridColumn: "span 7", padding: 20 }}>
        <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div className="pm-dash-card__title">روند فروش این هفته</div>
            <div className="pm-dash-card__sub">مجموع ۱۲٬۴۸۰٬۰۰۰ تومان</div>
          </div>
          <span className="pm-kpi__delta" style={{ background: "var(--success-soft)", color: "var(--success-ink)" }}>
            <PaIcon name="ArrowTrendingUpIcon" />
            ۱۲٪ رشد هفتگی
          </span>
        </div>
        <div style={{ display: "flex", height: 208, alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          {WEEK_BARS.map((bar) => (
            <div
              key={bar.day}
              style={{ display: "flex", height: "100%", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "flex-end", gap: 8 }}
            >
              <span className="pm-dash-bar-value">{bar.value}</span>
              <div className="pm-dash-bar" style={{ height: `${bar.pct}%` }} />
              <span className="pm-dash-bar-label">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="pm-dash-card" style={{ gridColumn: "span 5", padding: 20 }}>
        <div className="pm-dash-card__title" style={{ marginBottom: 16 }}>
          پرفروش‌ترین محصولات
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {TOP_PRODUCTS.map((item, index) => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="pm-rank" style={{ background: RANK_BADGES[index]!.bg, color: RANK_BADGES[index]!.fg }}>
                {["۱", "۲", "۳", "۴", "۵"][index]}
              </span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="pm-tp-name">{item.name}</div>
                <div className="pm-tp-track">
                  <div className="pm-tp-fill" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: "end" }}>
                <div className="pm-tp-rev">{item.revenue}</div>
                <div className="pm-tp-sold">{item.sold}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function OrdersTable({ rows }: { rows: OrderRow[] }) {
  return (
    <>
      <div className="pm-otable-head">
        <span className="pm-th">سفارش</span>
        <span className="pm-th">مشتری</span>
        <span className="pm-th">مبلغ</span>
        <span className="pm-th">وضعیت</span>
      </div>
      {rows.map((order) => (
        <div key={order.id} className="pm-otable-row">
          <span className="pm-td pm-td--id">{order.id}</span>
          <span className="pm-td pm-td--name">{order.name}</span>
          <span className="pm-td pm-td--amount">{order.amount}</span>
          <span className={`pm-opill ${order.tone}`}>
            <span className="pm-opill__dot" />
            {order.status}
          </span>
        </div>
      ))}
    </>
  )
}

function OrdersAndLowStock() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 20, flex: "none" }}>
      <div className="pm-dash-card" style={{ gridColumn: "span 7", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 12px" }}>
          <div className="pm-dash-card__title">سفارش‌های اخیر</div>
          <span className="pm-view-all">
            مشاهده همه
            <PaIcon name="ChevronLeftIcon" />
          </span>
        </div>
        <OrdersTable rows={RECENT_ORDERS} />
      </div>

      <div className="pm-dash-card" style={{ gridColumn: "span 5", padding: 20 }}>
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="pm-dash-card__title">موجودی کم</div>
          <span className="pm-badge" style={{ background: "var(--warning-soft)", color: "var(--warning-ink)" }}>
            ۴ کالا
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {LOW_STOCK.map((item) => (
            <div key={item.sku} className="pm-ls-row">
              <span
                className="pm-ls-icon"
                style={
                  item.critical
                    ? { background: "var(--danger-soft)", color: "var(--danger-ink)" }
                    : { background: "var(--warning-soft)", color: "var(--warning-ink)" }
                }
              >
                <PaIcon name="CubeIcon" variant="bold" />
              </span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="pm-ls-name">{item.name}</div>
                <div className="pm-ls-sku">{item.sku}</div>
              </div>
              <span className="pm-ls-qty" style={{ color: item.critical ? "var(--danger-ink)" : "var(--warning-ink)" }}>
                {item.qty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function DashboardPane() {
  return (
    <div className="pa-pane">
      <HeroBanner />
      <KpiRow />
      <SalesAndTopProducts />
      <OrdersAndLowStock />
    </div>
  )
}

function OrdersPane() {
  return (
    <div className="pa-pane">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div>
          <div className="pm-dash-card__title" style={{ fontSize: 20 }}>سفارشات</div>
          <div className="pm-dash-card__sub">۱۲۶ سفارش در ۳۰ روز گذشته</div>
        </div>
        <span className="pm-badge" style={{ background: "var(--gold-soft)", color: "var(--gold-ink)" }}>
          ۳ در انتظار ارسال
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, flex: "none" }}>
        {ORDER_STATS.map((stat) => (
          <div key={stat.label} className="pa-stat">
            <p className="pa-stat__label">{stat.label}</p>
            <p className={`pa-stat__value ${stat.tone ?? ""}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: "none" }}>
        {ORDER_FILTERS.map((filter, index) => (
          <span key={filter} className={`pm-chip ${index === 0 ? "pm-chip--active" : ""}`}>
            {filter}
          </span>
        ))}
      </div>
      <div className="pm-dash-card" style={{ overflow: "hidden", flex: "none" }}>
        <OrdersTable rows={ALL_ORDERS} />
        <div className="pa-table-footer">
          <span>نمایش ۱۲ از ۱۲۶ سفارش</span>
          <span className="pa-pagination">
            <span className="pa-page pa-page--active">۱</span>
            <span className="pa-page">۲</span>
            <span className="pa-page">۳</span>
            <span className="pa-page">…</span>
            <span className="pa-page">۱۱</span>
          </span>
        </div>
      </div>
    </div>
  )
}

function ProductsPane() {
  return (
    <div className="pa-pane">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div>
          <div className="pm-dash-card__title" style={{ fontSize: 20 }}>محصولات</div>
          <div className="pm-dash-card__sub">۴۲ محصول فعال · ۴ کالا رو به اتمام</div>
        </div>
        <span className="pa-header-primary-btn" style={{ height: 40 }}>
          <PaIcon name="PlusIcon" />
          <span>محصول جدید</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "none" }}>
        <span className="pa-search">
          <PaIcon name="MagnifyingGlassIcon" />
          جست‌وجو تو محصولات…
        </span>
        <span className="pm-chip pm-chip--active">همه</span>
        <span className="pm-chip">فعال</span>
        <span className="pm-chip">پیش‌نویس</span>
        <span className="pm-chip">رو به اتمام</span>
      </div>
      <div className="pm-dash-card" style={{ overflow: "hidden", flex: "none" }}>
        <div className="pm-otable-head" style={{ gridTemplateColumns: "2.2fr 0.9fr 0.9fr 0.9fr" }}>
          <span className="pm-th">کالا</span>
          <span className="pm-th">قیمت</span>
          <span className="pm-th">موجودی</span>
          <span className="pm-th">وضعیت</span>
        </div>
        {PRODUCTS.map((product) => (
          <div key={product.name} className="pa-product-row">
            <div className="pa-product-main">
              <span className="pa-product-thumb">
                <PaIcon name="CubeIcon" variant="bold" />
              </span>
              <div style={{ minWidth: 0 }}>
                <div className="pa-product-name">{product.name}</div>
                <div className="pa-product-sku">{product.meta}</div>
              </div>
            </div>
            <span className="pm-td pm-td--amount">{product.price}</span>
            <span className="pm-td" style={{ color: "var(--text-body)" }}>{product.stock}</span>
            <span className={`pm-opill ${product.active ? "pm-opill--success" : "pm-opill--warning"}`}>
              <span className="pm-opill__dot" />
              {product.active ? "فعال" : "پیش‌نویس"}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AppReplica({
  fill = false,
  onToggleFullscreen,
}: {
  fill?: boolean
  onToggleFullscreen?: () => void
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [layout, setLayout] = useState({ scale: 0, x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState<PaTab>("dashboard")

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      const { width, height } = entry.contentRect
      if (!width || !height) return
      const scale = Math.min(width / NATIVE_W, height / NATIVE_H)
      setLayout({
        scale,
        x: (width - NATIVE_W * scale) / 2,
        y: (height - NATIVE_H * scale) / 2,
      })
    })
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={hostRef}
      aria-label="پیش‌نمایش زنده پنل مدیریت پرومال"
      style={
        fill
          ? { position: "relative", width: "100%", height: "100%", overflow: "hidden" }
          : { position: "relative", width: "100%", aspectRatio: `${NATIVE_W} / ${NATIVE_H}`, overflow: "hidden" }
      }
    >
      <div
        className="pmapp"
        style={{
          transform: `translate(${layout.x}px, ${layout.y}px) scale(${layout.scale || 1})`,
          transformOrigin: "top left",
          visibility: layout.scale ? "visible" : "hidden",
        }}
      >
        <Sidebar activeTab={activeTab} onSelect={setActiveTab} />

        <main className="pa-window">
          <span className="pa-window-border" />
          <span className="pa-window-highlight" />
          <span className="pa-window-glow" />
          <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, position: "relative", zIndex: 10, height: "100%" }}>
            <WindowHeader activeTab={activeTab} onToggleFullscreen={onToggleFullscreen} />
            <div className="pa-content">
              {activeTab === "dashboard" ? <DashboardPane key="dashboard" /> : null}
              {activeTab === "orders" ? <OrdersPane key="orders" /> : null}
              {activeTab === "products" ? <ProductsPane key="products" /> : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
