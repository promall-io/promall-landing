"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatedList } from "@/components/animated-list"

const faqData = [
  {
    id: "faq-what-is-promall",
    question: "پرومال چیه و برای کی مناسبه؟",
    answer:
      "پرومال یه اپلیکیشن هوشمنده که به شما کمک می‌کنه فروشگاه آنلاین‌تون رو راحت‌تر مدیریت کنید. برای هر کسی که می‌خواد آنلاین بفروشه، از فروشنده‌های کوچک تا کسب‌وکارهای بزرگ، مناسبه!",
  },
  {
    id: "faq-manage-products",
    question: "چطوری محصولاتم رو مدیریت کنم؟",
    answer:
      "خیلی راحته! محصولاتتون رو اضافه کنید، قیمت و تخفیف بذارید، موجودی رو کنترل کنید و همه‌چیز رو در یک جا ببینید. همه‌چیز ساده و سریعه!",
  },
  {
    id: "faq-integrations",
    question: "میشه پرومال رو با ابزارهای دیگه وصل کرد؟",
    answer:
      "بله! پرومال با درگاه‌های پرداخت، سیستم‌های حسابداری و خیلی ابزارهای دیگه کار می‌کنه. همه‌چیز رو به هم وصل کنید و راحت کار کنید!",
  },
  {
    id: "faq-free-plan",
    question: "پلن رایگان چی داره؟",
    answer:
      "با پلن رایگان می‌تونید تا ۱۰ محصول اضافه کنید، سفارش‌های محدود ثبت کنید و گزارش‌های ساده ببینید. برای شروع کار و آشنایی با پرومال عالیه!",
  },
  {
    id: "faq-track-orders",
    question: "چطوری سفارش‌ها رو پیگیری کنم؟",
    answer:
      "تمام سفارش‌ها رو در یک داشبورد می‌بینید، وضعیت‌شون رو تغییر می‌دید، مرجوعی‌ها رو مدیریت می‌کنید و موجودی به‌صورت خودکار کم میشه. همه‌چیز خودکاره!",
  },
  {
    id: "faq-security",
    question: "اطلاعات فروشگاهم امنه؟",
    answer:
      "کاملاً! ما از بهترین استانداردهای امنیتی استفاده می‌کنیم. اطلاعاتتون رمزنگاری میشه، به‌صورت امن منتقل میشه و پشتیبان‌گیری منظم داریم. خیالتون راحت باشه!",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      className={`group w-full bg-card/60 backdrop-blur-sm border-2 overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer hover-lift ${
        isOpen
          ? "border-primary/60 shadow-strong shadow-primary/20"
          : "border-border/60 hover:border-primary/50 shadow-medium hover:shadow-strong"
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
    >
      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <div className="relative w-full px-6 md:px-8 py-6 md:py-7 flex justify-between items-center gap-6 text-right">
        <div
          className={`flex-1 text-base md:text-xl font-black transition-colors duration-300 ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary"}`}
        >
          {question}
        </div>
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isOpen ? "bg-primary/20 rotate-180" : "bg-primary/10 group-hover:bg-primary/15 rotate-0"}`}
        >
          <ChevronDown
            className={`w-6 h-6 transition-all duration-500 ${isOpen ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
          />
        </div>
      </div>

      <div
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className={`px-6 md:px-8 pb-6 md:pb-7 transition-all duration-300 ${isOpen ? "pt-0" : "pt-0"}`}>
          <div className="text-foreground/90 text-sm md:text-lg leading-relaxed font-medium border-t border-border/40 pt-6">
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="relative w-full py-20 md:py-32 overflow-hidden">
      {/* Add smooth gradient at the top for seamless transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none z-10" />

      {/* Background Effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />

      <div className="relative max-w-4xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-20 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/30 shadow-glow-primary animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm md:text-base font-black text-primary tracking-tight">سوالات متداول</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight animate-fade-in-up [animation-delay:100ms] opacity-0 [animation-fill-mode:forwards]">
            سوالی دارید؟
            <br />
            <span className="text-primary">جوابش رو اینجا پیدا کنید!</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]">
            پاسخ سوالات رایج درباره پرومال و امکاناتش
          </p>
        </div>

        <AnimatedList
          className="flex flex-col gap-4 md:gap-5"
          staggerDelay={120}
          variant="fade-up"
          duration={600}
        >
          {faqData.map((faq) => (
            <FAQItem key={faq.id} {...faq} isOpen={openItems.has(faq.id)} onToggle={() => toggleItem(faq.id)} />
          ))}
        </AnimatedList>
      </div>
    </section>
  )
}
