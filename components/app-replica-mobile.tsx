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
import "./app-replica-mobile.css"

type PmTab = "dashboard" | "orders" | "products"

const MIRRORED_ICONS: readonly PaIconName[] = ["ChevronLeftIcon", "ArrowRightOnRectangleIcon"]

function PmIcon({
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

const ORDER_STATUS_TONE: Record<ReplicaOrderStatus, string> = {
  confirmed: "pm-opill--success",
  processing: "pm-opill--info",
  shipped: "pm-opill--brand",
  completed: "pm-opill--success",
  awaitingPayment: "pm-opill--warning",
  cancelled: "pm-opill--danger",
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

const ATTENTION_TONES = ["pm-mtile--gold", "pm-mtile--mint", "pm-mtile--rose"]
const ATTENTION_ICONS: PaIconName[] = [
  "ArchiveBoxIcon",
  "ChatBubbleDirectIcon",
  "ExclamationTriangleIcon",
]

/* The dock mirrors promall-ui's MobileBottomDock: the four mobileTab entries of
   SHOP_NAV_ITEMS, then "more". Only the three that have a pane here are
   pressable — the rest are chrome, exactly as a first-run screenshot would be. */
const DOCK_ITEMS: Array<{ icon: PaIconName; key: keyof ReplicaCopy["nav"]; tab?: PmTab }> = [
  { icon: "Squares2X2Icon", key: "dashboard", tab: "dashboard" },
  { icon: "QueueListIcon", key: "orders", tab: "orders" },
  { icon: "CubeIcon", key: "products", tab: "products" },
  { icon: "UsersIcon", key: "customers" },
]

function StatusBar({ copy }: { copy: ReplicaCopy }) {
  return (
    <div className="pm-status" aria-hidden="true">
      <span className="pm-status__time">{copy.mobile.statusTime}</span>
      <span className="pm-status__island" />
      <span className="pm-status__glyphs">
        <svg viewBox="0 0 18 12" width="17" height="11" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0.5" width="3" height="11.5" rx="1" opacity="0.4" />
        </svg>
        <svg viewBox="0 0 16 12" width="15" height="11" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M1 4.2a10 10 0 0 1 14 0" />
          <path d="M3.8 7a6 6 0 0 1 8.4 0" />
          <path d="M6.6 9.7a2 2 0 0 1 2.8 0" />
        </svg>
        <svg viewBox="0 0 26 12" width="24" height="11" fill="none">
          <rect x="0.6" y="0.6" width="21" height="10.8" rx="3.2" stroke="currentColor" strokeOpacity="0.5" />
          <rect x="2.2" y="2.2" width="16" height="7.6" rx="2" fill="currentColor" />
          <path d="M23.4 4.2v3.6a2 2 0 0 0 0-3.6Z" fill="currentColor" fillOpacity="0.5" />
        </svg>
      </span>
    </div>
  )
}

function MobileHeader({ copy, title }: { copy: ReplicaCopy; title: string | null }) {
  return (
    <div className="pm-mhead">
      <div className="pm-mhead__row">
        <span className="pm-mhead__dm">
          <PmIcon name="ChatBubbleDirectIcon" />
        </span>
        <span className="pm-mhead__compact">{title ?? copy.brand.name}</span>
        <span className="pm-mhead__actions">
          <span className="pm-mhead__action">
            <PmIcon name="BellIcon" />
            <span className="pm-mhead__dot" />
          </span>
          <span className="pm-mhead__action">
            <PmIcon name="MoonIcon" />
          </span>
        </span>
      </div>
    </div>
  )
}

function LargeTitle({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="pm-mtitle">
      <p className="pm-mtitle__text">{title}</p>
      <p className="pm-mtitle__sub">{sub}</p>
    </div>
  )
}

function AttentionCard({ copy }: { copy: ReplicaCopy }) {
  return (
    <div className="pm-mhero">
      <span className="pm-mhero__glow" />
      <div className="pm-mhero__head">
        <span className="pm-mhero__eyebrow">
          <PmIcon name="SparklesIcon" variant="bold" />
          {copy.mobile.attention}
        </span>
        <span className="pm-mhero__cta">
          {copy.mobile.viewOrders}
          <PmIcon name="ChevronLeftIcon" />
        </span>
      </div>
      <div className="pm-mhero__tiles">
        {copy.hero.tiles.map((tile, index) => (
          <span key={tile.label} className="pm-mtile">
            <span className={`pm-mtile__icon ${ATTENTION_TONES[index]}`}>
              <PmIcon name={ATTENTION_ICONS[index]!} variant="bold" />
            </span>
            <span className="pm-mtile__body">
              <span className="pm-mtile__value">{tile.value}</span>
              <span className="pm-mtile__label">{tile.label}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

function KpiGrid({ copy }: { copy: ReplicaCopy }) {
  return (
    <div className="pm-mkpis">
      {KPI_VISUALS.map((visual) => {
        const kpi = copy.kpis[visual.id]

        return (
          <div key={visual.id} className="pm-mkpi">
            <span className="pm-mkpi__icon" style={{ background: visual.iconBg, color: visual.iconFg }}>
              <PmIcon name={visual.icon} variant="bold" />
            </span>
            <p className="pm-mkpi__label">{kpi.label}</p>
            <p className="pm-mkpi__value">
              {kpi.value}
              {kpi.unit ? <span className="pm-mkpi__unit">{kpi.unit}</span> : null}
            </p>
            {kpi.delta ? (
              <span className="pm-mkpi__delta">
                <PmIcon name="ArrowTrendingUpIcon" />
                {kpi.delta}
              </span>
            ) : (
              <p className="pm-mkpi__note">{kpi.note}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

function SalesCard({ copy }: { copy: ReplicaCopy }) {
  return (
    <div className="pm-mcard">
      <div className="pm-mcard__head">
        <div>
          <p className="pm-mcard__title">{copy.sales.title}</p>
          <p className="pm-mcard__sub">{copy.sales.sub}</p>
        </div>
        <span className="pm-mbadge pm-mbadge--success">
          <PmIcon name="ArrowTrendingUpIcon" />
          {copy.sales.badge}
        </span>
      </div>
      <div className="pm-mbars">
        {copy.sales.bars.map((bar) => (
          <div key={bar.day} className="pm-mbar">
            <span className="pm-mbar__fill" style={{ height: `${bar.pct}%` }} />
            <span className="pm-mbar__day">{bar.day}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function OrderList({
  copy,
  rows,
}: {
  copy: ReplicaCopy
  rows: ReplicaCopy["recentOrders"]["rows"]
}) {
  return (
    <div className="pm-mlist">
      {rows.map((order) => (
        <div key={order.id} className="pm-mrow">
          <span className="pm-mrow__avatar">{order.name.slice(0, 1)}</span>
          <span className="pm-mrow__body">
            <span className="pm-mrow__name">{order.name}</span>
            <span className="pm-mrow__meta">
              {order.id} · {order.amount}
            </span>
          </span>
          <span className={`pm-opill ${ORDER_STATUS_TONE[order.status]}`}>
            <span className="pm-opill__dot" />
            {copy.orderStatuses[order.status]}
          </span>
        </div>
      ))}
    </div>
  )
}

function DashboardPane({ copy }: { copy: ReplicaCopy }) {
  return (
    <>
      <LargeTitle title={copy.header.greeting} sub={copy.header.date} />
      <AttentionCard copy={copy} />
      <KpiGrid copy={copy} />
      <SalesCard copy={copy} />
      <div className="pm-mcard">
        <div className="pm-mcard__head">
          <p className="pm-mcard__title">{copy.recentOrders.title}</p>
          <span className="pm-mviewall">
            {copy.recentOrders.viewAll}
            <PmIcon name="ChevronLeftIcon" />
          </span>
        </div>
        <OrderList copy={copy} rows={copy.recentOrders.rows} />
      </div>
    </>
  )
}

function OrdersPane({ copy }: { copy: ReplicaCopy }) {
  return (
    <>
      <LargeTitle title={copy.ordersPane.title} sub={copy.ordersPane.sub} />
      <div className="pm-mstats">
        {copy.ordersPane.stats.map((stat) => (
          <div key={stat.label} className="pm-mstat">
            <p className="pm-mstat__value">{stat.value}</p>
            <p className="pm-mstat__label">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="pm-mchips">
        {copy.ordersPane.filters.map((filter, index) => (
          <span key={filter} className={`pm-mchip ${index === 0 ? "pm-mchip--active" : ""}`}>
            {filter}
          </span>
        ))}
      </div>
      <div className="pm-mcard">
        <OrderList
          copy={copy}
          rows={[...copy.recentOrders.rows, ...copy.ordersPane.extraRows].slice(0, 8)}
        />
      </div>
    </>
  )
}

function ProductsPane({ copy }: { copy: ReplicaCopy }) {
  return (
    <>
      <LargeTitle title={copy.productsPane.title} sub={copy.productsPane.sub} />
      <span className="pm-msearch">
        <PmIcon name="MagnifyingGlassIcon" />
        {copy.productsPane.search}
      </span>
      <div className="pm-mchips">
        {copy.productsPane.filters.map((filter, index) => (
          <span key={filter} className={`pm-mchip ${index === 0 ? "pm-mchip--active" : ""}`}>
            {filter}
          </span>
        ))}
      </div>
      <div className="pm-mcard">
        <div className="pm-mlist">
          {copy.productsPane.rows.slice(0, 7).map((product) => (
            <div key={product.name} className="pm-mrow">
              <span className="pm-mrow__thumb">
                <PmIcon name="CubeIcon" variant="bold" />
              </span>
              <span className="pm-mrow__body">
                <span className="pm-mrow__name">{product.name}</span>
                <span className="pm-mrow__meta">
                  {product.price} · {product.stock}
                </span>
              </span>
              <span className={`pm-opill ${product.active ? "pm-opill--success" : "pm-opill--warning"}`}>
                <span className="pm-opill__dot" />
                {product.active ? copy.productsPane.statusActive : copy.productsPane.statusDraft}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function Dock({
  copy,
  activeTab,
  onSelect,
}: {
  copy: ReplicaCopy
  activeTab: PmTab
  onSelect: (tab: PmTab) => void
}) {
  return (
    <div className="pm-mdock">
      <span className="pm-mfab">
        <PmIcon name="PlusIcon" />
        {copy.header.newOrder}
      </span>
      <div className="pm-mdock__bar">
        {DOCK_ITEMS.map((item) => {
          const active = item.tab === activeTab
          return (
            <button
              key={item.key}
              type="button"
              onClick={item.tab ? () => onSelect(item.tab as PmTab) : undefined}
              aria-pressed={active}
              className={`pm-mdock__item ${active ? "pm-mdock__item--active" : ""}`}
            >
              <PmIcon name={item.icon} variant={active ? "bold" : "linear"} />
              <span className="pm-mdock__label">{copy.nav[item.key]}</span>
            </button>
          )
        })}
        <span className="pm-mdock__item">
          <span className="pm-mdock__ellipsis" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="pm-mdock__label">{copy.mobile.more}</span>
        </span>
      </div>
    </div>
  )
}

export function AppReplicaMobile({ label, locale }: { label: string; locale: Locale }) {
  const [activeTab, setActiveTab] = useState<PmTab>("dashboard")
  const copy = REPLICA_COPY[locale]

  const headerTitle = activeTab === "dashboard" ? null : copy.tabTitles[activeTab]

  return (
    <div role="group" aria-label={label} className="pmphone-fit">
      <div className={`pmphone ${locale === "fa" ? "pmphone--rtl" : "pmphone--ltr"}`}>
        <StatusBar copy={copy} />
        <MobileHeader copy={copy} title={headerTitle} />

        <div className="pm-mscroll">
          {activeTab === "dashboard" ? <DashboardPane key="dashboard" copy={copy} /> : null}
          {activeTab === "orders" ? <OrdersPane key="orders" copy={copy} /> : null}
          {activeTab === "products" ? <ProductsPane key="products" copy={copy} /> : null}
        </div>

        <Dock copy={copy} activeTab={activeTab} onSelect={setActiveTab} />
      </div>
    </div>
  )
}
