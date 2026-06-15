"use client"

import { motion } from "framer-motion"
import { BadgeCheck, CreditCard, Printer, ShieldCheck } from "@/components/icons"
import { EASE } from "@/components/motion"

function TypingDots() {
  return (
    <span className="flex items-center gap-1 px-1" aria-hidden="true">
      {[0, 1, 2].map((dot) => (
        <motion.span
          key={dot}
          className="size-1.5 rounded-full bg-primary/50"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: dot * 0.18 }}
        />
      ))}
    </span>
  )
}

export function ChatMini() {
  const bubble = (delay: number) => ({
    initial: { opacity: 0, y: 14, scale: 0.96 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.6, ease: EASE, delay },
  })

  return (
    <div dir="rtl" className="flex h-full flex-col justify-end gap-2.5">
      <motion.div
        {...bubble(0.1)}
        className="w-fit max-w-[85%] rounded-2xl rounded-tr-md bg-ice/80 px-4 py-2.5 text-sm text-foreground"
      >
        سلام! این شومیز ساتن مشکی موجوده؟
      </motion.div>
      <motion.div
        {...bubble(0.5)}
        className="mr-auto w-fit max-w-[85%] rounded-2xl rounded-tl-md bg-primary px-4 py-2.5 text-sm leading-6 text-white"
      >
        سلام 👋 آره موجوده! شومیز ساتن مشکی ۸۹۰٬۰۰۰ تومن. همین الان برات
        بذارمش کنار؟
      </motion.div>
      <motion.div
        {...bubble(0.9)}
        className="flex w-fit items-center gap-2 rounded-2xl rounded-tr-md bg-ice/80 px-4 py-2.5 text-sm text-foreground"
      >
        آره لطفاً
        <TypingDots />
      </motion.div>
      <motion.div
        {...bubble(1.3)}
        className="mr-auto flex w-fit items-center gap-2 rounded-full border border-success/30 bg-success-soft px-3.5 py-1.5 text-xs font-semibold text-[var(--success-ink)]"
      >
        <BadgeCheck className="size-4" />
        سفارش ثبت شد — لینک پرداخت رفت
      </motion.div>
    </div>
  )
}

const MINI_ORDERS = [
  { name: "سفارش #۱۰۸۴", state: "پرداخت شد", tone: "bg-success-soft text-[var(--success-ink)]" },
  { name: "سفارش #۱۰۸۵", state: "آماده‌سازی", tone: "bg-warning-soft text-[var(--warning-ink)]" },
  { name: "سفارش #۱۰۸۶", state: "ارسال شد", tone: "bg-info-soft text-info" },
]

export function OrdersMini() {
  return (
    <div dir="rtl" className="space-y-2">
      {MINI_ORDERS.map((order, index) => (
        <motion.div
          key={order.name}
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: EASE, delay: index * 0.12 }}
          className="flex items-center justify-between rounded-xl border border-border bg-card px-3.5 py-2.5"
        >
          <span className="text-xs font-semibold text-foreground">{order.name}</span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${order.tone}`}
          >
            {order.state}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

export function PaymentMini() {
  return (
    <div dir="rtl" className="space-y-2">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3">
        <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <CreditCard className="size-4" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-foreground">درگاه بانکی</p>
          <p className="text-[10px] text-muted-foreground">اتصال مستقیم سپ</p>
        </div>
        <ShieldCheck className="size-4 text-success" />
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gold/40 text-gold-deep">
          <BadgeCheck className="size-4" />
        </span>
        <div className="flex-1">
          <p className="text-xs font-semibold text-foreground">کارت‌به‌کارت</p>
          <p className="text-[10px] text-muted-foreground">تأیید رسید در پنل</p>
        </div>
      </div>
    </div>
  )
}

const REPORT_BARS = [34, 52, 44, 68, 58, 84]

export function ReportsMini() {
  return (
    <div className="flex h-24 items-end gap-2">
      {REPORT_BARS.map((value, index) => (
        <motion.div
          key={index}
          className={`flex-1 rounded-t-lg ${
            index === REPORT_BARS.length - 1 ? "bg-primary" : "bg-ice"
          }`}
          initial={{ height: 0 }}
          whileInView={{ height: `${value}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE, delay: index * 0.07 }}
        />
      ))}
    </div>
  )
}

const STOCK_ROWS = [
  { name: "مانتو کتان کرم", level: 78, tone: "bg-primary" },
  { name: "شومیز ساتن مشکی", level: 46, tone: "bg-primary" },
  { name: "شال نخی", level: 12, tone: "bg-warning", low: true },
]

export function InventoryMini() {
  return (
    <div dir="rtl" className="space-y-2.5">
      {STOCK_ROWS.map((row, index) => (
        <div key={row.name}>
          <div className="mb-1 flex items-center justify-between text-[10px]">
            <span className="font-medium text-foreground">{row.name}</span>
            {row.low ? (
              <span className="rounded-full bg-warning-soft px-2 py-px font-semibold text-[var(--warning-ink)]">
                رو به اتمام
              </span>
            ) : (
              <span className="text-muted-foreground">{`٪${row.level}`}</span>
            )}
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-ice/70">
            <motion.div
              className={`h-full rounded-full ${row.tone}`}
              initial={{ width: 0 }}
              whileInView={{ width: `${row.level}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: EASE, delay: index * 0.1 }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function PrintMini() {
  return (
    <div dir="rtl" className="flex items-start gap-3">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-ink text-white">
        <Printer className="size-5" />
      </span>
      <div className="w-full max-w-[150px] overflow-hidden">
        <motion.div
          initial={{ y: "-100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="rounded-b-lg border border-dashed border-border bg-card px-3 py-2.5 text-[9px] leading-5 text-muted-foreground shadow-soft"
        >
          <p className="font-bold text-foreground">فاکتور #۱۰۸۶</p>
          <p>مانتو کتان کرم × ۱</p>
          <p className="font-semibold text-foreground">۱٬۲۸۰٬۰۰۰ تومان</p>
        </motion.div>
      </div>
    </div>
  )
}
