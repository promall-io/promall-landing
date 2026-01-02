"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { useTranslations } from "next-intl"

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
  index: number
}

function FAQItem({ question, answer, isOpen, onToggle, index }: FAQItemProps) {
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
      className={`
        group relative rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer
        opacity-0 animate-fade-in-up
        ${isOpen ? "ring-1 ring-primary/30" : "hover:ring-1 hover:ring-border/50"}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      style={{
        animationDelay: `${200 + index * 80}ms`,
        animationFillMode: "forwards"
      }}
    >
      {/* Background */}
      <div className={`absolute inset-0 card-feature transition-all duration-500 ${isOpen ? "border-primary/20" : ""}`} />

      {/* Gradient on open */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/3 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`} />

      {/* Content */}
      <div className="relative">
        {/* Question */}
        <div className="flex items-center justify-between p-6 gap-4">
          <h3 className={`text-lg font-semibold transition-colors duration-300 ${
            isOpen ? "text-primary" : "text-foreground group-hover:text-primary"
          }`}>
            {question}
          </h3>
          <div className={`
            shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
            bg-gradient-to-br from-primary/10 to-accent/5 border border-primary/15
            transition-all duration-500
            ${isOpen ? "rotate-180 shadow-glow border-primary/25" : "group-hover:border-primary/20"}
          `}>
            <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
              isOpen ? "text-primary" : "text-muted-foreground group-hover:text-primary"
            }`} />
          </div>
        </div>

        {/* Answer */}
        <div className={`overflow-hidden transition-all duration-500 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="px-6 pb-6">
            <div className="h-px w-full bg-gradient-to-r from-primary/20 via-border/50 to-transparent mb-4" />
            <p className="text-base text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const t = useTranslations("faq")

  const faqData = [
    {
      id: "faq-what-is-promall",
      question: t("items.whatIsPromall.question"),
      answer: t("items.whatIsPromall.answer"),
    },
    {
      id: "faq-manage-products",
      question: t("items.manageProducts.question"),
      answer: t("items.manageProducts.answer"),
    },
    {
      id: "faq-integrations",
      question: t("items.integrations.question"),
      answer: t("items.integrations.answer"),
    },
    {
      id: "faq-free-plan",
      question: t("items.freePlan.question"),
      answer: t("items.freePlan.answer"),
    },
    {
      id: "faq-track-orders",
      question: t("items.trackOrders.question"),
      answer: t("items.trackOrders.answer"),
    },
    {
      id: "faq-security",
      question: t("items.security.question"),
      answer: t("items.security.answer"),
    },
  ]

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
    <section id="faq-section" className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/3 rounded-full blur-[180px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-primary/20 mb-8 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {t("badge")}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-headline text-foreground mb-6 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <span className="block">{t("title.line1")}</span>
            <span className="block gradient-text">{t("title.line2")}</span>
          </h2>

          {/* Description */}
          <p
            className="text-body-large text-muted-foreground max-w-xl mx-auto opacity-0 animate-fade-in-up"
            style={{ animationDelay: "150ms", animationFillMode: "forwards" }}
          >
            {t("description")}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openItems.has(faq.id)}
              onToggle={() => toggleItem(faq.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
