"use client"

import { useState } from "react"
import { PA_BOLD, PA_LINEAR, type PaIconName } from "./app-replica-icons"
import {
  REPLICA_COPY,
  type ReplicaCopy,
  type ReplicaKpiId,
  type ReplicaOrderStatus,
} from "./app-replica-copy"
import type { Locale } from "@/i18n/config"
import "./app-replica.css"

type PaTab = "dashboard" | "orders" | "products"

const MIRRORED_ICONS: readonly PaIconName[] = ["ChevronLeftIcon", "ArrowRightOnRectangleIcon"]

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
  const mirrored = MIRRORED_ICONS.includes(name) ? " pa-icon--mirror" : ""
  return (
    <span
      aria-hidden="true"
      className={`pa-icon${mirrored} ${className ?? ""}`}
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

function navGroups(copy: ReplicaCopy): NavGroup[] {
  return [
    {
      label: copy.navGroups.shop,
      items: [
        { label: copy.nav.dashboard, icon: "Squares2X2Icon", tab: "dashboard" },
        { label: copy.nav.orders, icon: "QueueListIcon", tab: "orders" },
        { label: copy.nav.products, icon: "CubeIcon", tab: "products" },
        { label: copy.nav.categories, icon: "RectangleStackIcon" },
        { label: copy.nav.inventory, icon: "CubeTransparentIcon" },
      ],
    },
    {
      label: copy.navGroups.growth,
      items: [
        { label: copy.nav.customers, icon: "UsersIcon" },
        { label: copy.nav.discountCodes, icon: "TagIcon" },
        { label: copy.nav.campaigns, icon: "SpeakerIcon" },
        { label: copy.nav.reports, icon: "ChartBarIcon" },
        { label: copy.nav.aiAssistant, icon: "SparklesIcon" },
      ],
    },
    {
      label: copy.navGroups.account,
      items: [
        { label: copy.nav.settings, icon: "Cog6ToothIcon" },
        { label: copy.nav.subscription, icon: "CreditCardIcon" },
      ],
    },
  ]
}

const KPI_VISUALS: Array<{ id: ReplicaKpiId; icon: PaIconName; iconBg: string; iconFg: string }> = [
  { id: "revenue", icon: "WalletIcon", iconBg: "var(--gold-soft)", iconFg: "var(--gold)" },
  { id: "orders", icon: "ShoppingCartIcon", iconBg: "var(--info-soft)", iconFg: "var(--info)" },
  { id: "customers", icon: "UsersIcon", iconBg: "var(--success-soft)", iconFg: "var(--success-ink)" },
  {
    id: "averageOrder",
    icon: "ChartBarIcon",
    iconBg: "var(--warning-soft)",
    iconFg: "var(--warning-ink)",
  },
]

const RANK_BADGES = [
  { bg: "var(--gold)", fg: "var(--ink)" },
  { bg: "var(--slate)", fg: "#ffffff" },
  { bg: "#2f6ca2", fg: "#ffffff" },
  { bg: "var(--slate-soft)", fg: "#ffffff" },
  { bg: "var(--slate-soft)", fg: "#ffffff" },
]

const ORDER_STATUS_TONE: Record<ReplicaOrderStatus, string> = {
  confirmed: "pm-opill--success",
  processing: "pm-opill--info",
  shipped: "pm-opill--brand",
  completed: "pm-opill--success",
  awaitingPayment: "pm-opill--warning",
  cancelled: "pm-opill--danger",
}

const ORDER_STAT_TONES = ["", "pa-stat__value--warning", "pa-stat__value--success", ""]

type OrderRow = { id: string; name: string; amount: string; status: ReplicaOrderStatus }

function Sidebar({
  copy,
  activeTab,
  onSelect,
}: {
  copy: ReplicaCopy
  activeTab: PaTab
  onSelect: (tab: PaTab) => void
}) {
  return (
    <div className="pa-sidebar">
      <span className="pa-sidebar-highlight" />
      <span className="pa-sidebar-overlay" />
      <div className="pa-sidebar-brand">
        <PaLogo size={32} />
        <div style={{ minWidth: 0 }}>
          <p className="pa-sidebar-brand-name">{copy.brand.name}</p>
          <p className="pa-sidebar-brand-sub">{copy.brand.sub}</p>
        </div>
      </div>
      <div className="pa-sidebar-nav">
        {navGroups(copy).map((group) => (
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
      </div>
      <div className="pa-sidebar-footer">
        <div className="pa-sidebar-profile">
          <span className="pa-sidebar-profile-avatar">{copy.profile.avatar}</span>
          <div style={{ flex: 1, minWidth: 0, textAlign: "start" }}>
            <p className="pa-sidebar-profile-name">{copy.profile.name}</p>
            <p className="pa-sidebar-profile-meta">{copy.profile.meta}</p>
          </div>
          <span className="pa-sidebar-logout">
            <PaIcon name="ArrowRightOnRectangleIcon" />
          </span>
        </div>
        <span className="pa-sidebar-collapse">
          <PaIcon name="ChevronLeftIcon" />
          {copy.profile.collapse}
        </span>
      </div>
    </div>
  )
}

function WindowHeader({ copy, activeTab }: { copy: ReplicaCopy; activeTab: PaTab }) {
  const title = activeTab === "dashboard" ? null : copy.tabTitles[activeTab]
  return (
    <div className="pa-header">
      <div className="pa-header-cluster">
        <span className="pa-header-primary-btn">
          <PaIcon name="PlusIcon" />
          <span>{copy.header.newOrder}</span>
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
            <span className="pa-header-greeting">{copy.header.greeting}</span>
            <span className="pa-header-date">{copy.header.date}</span>
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
      </div>
    </div>
  )
}

const HERO_TILE_ICONS: Array<{ icon: PaIconName; tone: string }> = [
  { icon: "ArchiveBoxIcon", tone: "pm-hero__tile-icon--gold" },
  { icon: "ChatBubbleDirectIcon", tone: "pm-hero__tile-icon--mint" },
  { icon: "ExclamationTriangleIcon", tone: "pm-hero__tile-icon--rose" },
]

function HeroBanner({ copy }: { copy: ReplicaCopy }) {
  return (
    <div className="pm-hero">
      <span className="pm-hero__glow" />
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28 }}>
        <div style={{ minWidth: 0, flex: 1 }}>
          <span className="pm-hero__eyebrow">
            <PaIcon name="SparklesIcon" variant="bold" />
            {copy.hero.eyebrow}
          </span>
          <p className="pm-hero__title" style={{ color: "#fff" }}>
            {copy.hero.title}
          </p>
          <p className="pm-hero__sub">{copy.hero.sub}</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
          <span className="pm-hero__cta pm-hero__cta--gold">
            <PaIcon name="QueueListIcon" variant="bold" />
            {copy.hero.primaryCta}
          </span>
          <span className="pm-hero__cta pm-hero__cta--ghost">
            <PaIcon name="PlusCircleIcon" />
            {copy.hero.secondaryCta}
          </span>
        </div>
      </div>
      <div
        className="pm-hero__divider"
        style={{ position: "relative", marginTop: 20, paddingTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}
      >
        {copy.hero.tiles.map((tile, index) => (
          <span key={tile.label} className="pm-hero__tile">
            <span className={`pm-hero__tile-icon ${HERO_TILE_ICONS[index]!.tone}`}>
              <PaIcon name={HERO_TILE_ICONS[index]!.icon} variant="bold" />
            </span>
            <span style={{ minWidth: 0, flex: 1 }}>
              <span className="pm-hero__tile-value">{tile.value}</span>
              <span className="pm-hero__tile-label">{tile.label}</span>
            </span>
            <PaIcon name="ChevronLeftIcon" className="pm-hero__tile-chev" />
          </span>
        ))}
      </div>
    </div>
  )
}

function KpiRow({ copy }: { copy: ReplicaCopy }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, flex: "none" }}>
      {KPI_VISUALS.map((visual) => {
        const kpi = copy.kpis[visual.id]

        return (
          <div key={visual.id} className="pm-kpi">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
              <span className="pm-kpi__label">{kpi.label}</span>
              <span className="pm-kpi__icon" style={{ background: visual.iconBg, color: visual.iconFg }}>
                <PaIcon name={visual.icon} variant="bold" />
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
                <span className="pm-kpi__note">{copy.kpiDeltaNote}</span>
              </div>
            ) : (
              <p className="pm-kpi__note">{kpi.note}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

function SalesAndTopProducts({ copy }: { copy: ReplicaCopy }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 20, flex: "none" }}>
      <div className="pm-dash-card" style={{ gridColumn: "span 7", padding: 20 }}>
        <div style={{ marginBottom: 20, display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div className="pm-dash-card__title">{copy.sales.title}</div>
            <div className="pm-dash-card__sub">{copy.sales.sub}</div>
          </div>
          <span className="pm-kpi__delta" style={{ background: "var(--success-soft)", color: "var(--success-ink)" }}>
            <PaIcon name="ArrowTrendingUpIcon" />
            {copy.sales.badge}
          </span>
        </div>
        <div style={{ display: "flex", height: 208, alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          {copy.sales.bars.map((bar) => (
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
          {copy.topProducts.title}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {copy.topProducts.items.map((item, index) => (
            <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span className="pm-rank" style={{ background: RANK_BADGES[index]!.bg, color: RANK_BADGES[index]!.fg }}>
                {copy.topProducts.ranks[index]}
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

function OrdersTable({ copy, rows }: { copy: ReplicaCopy; rows: OrderRow[] }) {
  return (
    <>
      <div className="pm-otable-head">
        <span className="pm-th">{copy.orderColumns.order}</span>
        <span className="pm-th">{copy.orderColumns.customer}</span>
        <span className="pm-th">{copy.orderColumns.amount}</span>
        <span className="pm-th">{copy.orderColumns.status}</span>
      </div>
      {rows.map((order) => (
        <div key={order.id} className="pm-otable-row">
          <span className="pm-td pm-td--id">{order.id}</span>
          <span className="pm-td pm-td--name">{order.name}</span>
          <span className="pm-td pm-td--amount">{order.amount}</span>
          <span className={`pm-opill ${ORDER_STATUS_TONE[order.status]}`}>
            <span className="pm-opill__dot" />
            {copy.orderStatuses[order.status]}
          </span>
        </div>
      ))}
    </>
  )
}

function OrdersAndLowStock({ copy }: { copy: ReplicaCopy }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 20, flex: "none" }}>
      <div className="pm-dash-card" style={{ gridColumn: "span 7", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 12px" }}>
          <div className="pm-dash-card__title">{copy.recentOrders.title}</div>
          <span className="pm-view-all">
            {copy.recentOrders.viewAll}
            <PaIcon name="ChevronLeftIcon" />
          </span>
        </div>
        <OrdersTable copy={copy} rows={copy.recentOrders.rows} />
      </div>

      <div className="pm-dash-card" style={{ gridColumn: "span 5", padding: 20 }}>
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="pm-dash-card__title">{copy.lowStock.title}</div>
          <span className="pm-badge" style={{ background: "var(--warning-soft)", color: "var(--warning-ink)" }}>
            {copy.lowStock.badge}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {copy.lowStock.items.map((item) => (
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

function DashboardPane({ copy }: { copy: ReplicaCopy }) {
  return (
    <div className="pa-pane">
      <HeroBanner copy={copy} />
      <KpiRow copy={copy} />
      <SalesAndTopProducts copy={copy} />
      <OrdersAndLowStock copy={copy} />
    </div>
  )
}

function OrdersPane({ copy }: { copy: ReplicaCopy }) {
  const rows = [...copy.recentOrders.rows, ...copy.ordersPane.extraRows]

  return (
    <div className="pa-pane">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div>
          <div className="pm-dash-card__title" style={{ fontSize: 20 }}>{copy.ordersPane.title}</div>
          <div className="pm-dash-card__sub">{copy.ordersPane.sub}</div>
        </div>
        <span className="pm-badge" style={{ background: "var(--gold-soft)", color: "var(--gold-ink)" }}>
          {copy.ordersPane.badge}
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, flex: "none" }}>
        {copy.ordersPane.stats.map((stat, index) => (
          <div key={stat.label} className="pa-stat">
            <p className="pa-stat__label">{stat.label}</p>
            <p className={`pa-stat__value ${ORDER_STAT_TONES[index] ?? ""}`}>{stat.value}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: "none" }}>
        {copy.ordersPane.filters.map((filter, index) => (
          <span key={filter} className={`pm-chip ${index === 0 ? "pm-chip--active" : ""}`}>
            {filter}
          </span>
        ))}
      </div>
      <div className="pm-dash-card" style={{ overflow: "hidden", flex: "none" }}>
        <OrdersTable copy={copy} rows={rows} />
        <div className="pa-table-footer">
          <span>{copy.ordersPane.footer}</span>
          <span className="pa-pagination">
            {copy.ordersPane.pages.map((page, index) => (
              <span key={page} className={`pa-page ${index === 0 ? "pa-page--active" : ""}`}>
                {page}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  )
}

function ProductsPane({ copy }: { copy: ReplicaCopy }) {
  return (
    <div className="pa-pane">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flex: "none" }}>
        <div>
          <div className="pm-dash-card__title" style={{ fontSize: 20 }}>{copy.productsPane.title}</div>
          <div className="pm-dash-card__sub">{copy.productsPane.sub}</div>
        </div>
        <span className="pa-header-primary-btn" style={{ height: 40 }}>
          <PaIcon name="PlusIcon" />
          <span>{copy.productsPane.newProduct}</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: "none" }}>
        <span className="pa-search">
          <PaIcon name="MagnifyingGlassIcon" />
          {copy.productsPane.search}
        </span>
        {copy.productsPane.filters.map((filter, index) => (
          <span key={filter} className={`pm-chip ${index === 0 ? "pm-chip--active" : ""}`}>
            {filter}
          </span>
        ))}
      </div>
      <div className="pm-dash-card" style={{ overflow: "hidden", flex: "none" }}>
        <div className="pm-otable-head" style={{ gridTemplateColumns: "2.2fr 0.9fr 0.9fr 0.9fr" }}>
          <span className="pm-th">{copy.productsPane.columns.item}</span>
          <span className="pm-th">{copy.productsPane.columns.price}</span>
          <span className="pm-th">{copy.productsPane.columns.stock}</span>
          <span className="pm-th">{copy.productsPane.columns.status}</span>
        </div>
        {copy.productsPane.rows.map((product) => (
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
              {product.active ? copy.productsPane.statusActive : copy.productsPane.statusDraft}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AppReplica({ label, locale }: { label: string; locale: Locale }) {
  const [activeTab, setActiveTab] = useState<PaTab>("dashboard")
  const copy = REPLICA_COPY[locale]

  return (
    <div role="group" aria-label={label} className="pmapp-fit">
      <div className={`pmapp ${locale === "fa" ? "pmapp--rtl" : "pmapp--ltr"}`}>
        <Sidebar copy={copy} activeTab={activeTab} onSelect={setActiveTab} />

        <div className="pa-window">
          <span className="pa-window-border" />
          <span className="pa-window-highlight" />
          <span className="pa-window-glow" />
          <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, position: "relative", zIndex: 10, height: "100%" }}>
            <WindowHeader copy={copy} activeTab={activeTab} />
            <div className="pa-content">
              {activeTab === "dashboard" ? <DashboardPane key="dashboard" copy={copy} /> : null}
              {activeTab === "orders" ? <OrdersPane key="orders" copy={copy} /> : null}
              {activeTab === "products" ? <ProductsPane key="products" copy={copy} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
