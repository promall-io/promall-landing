"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"
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
      className={`opacity-0 animate-fade-in-up rounded-2xl border transition-all duration-300 cursor-pointer ${
        isOpen
          ? "border-primary/30 bg-white/5"
          : "border-white/10 hover:border-white/20"
      }`}
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
      <div className="flex items-center justify-between p-6 gap-4">
        <h3 className={`text-lg font-medium transition-colors duration-200 ${
          isOpen ? "text-primary" : "text-foreground"
        }`}>
          {question}
        </h3>
        <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-primary/20 rotate-180" : "bg-white/5"
        }`}>
          <ChevronDown className={`w-4 h-4 transition-colors duration-200 ${
            isOpen ? "text-primary" : "text-muted-foreground"
          }`} />
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}>
        <div className="px-6 pb-6">
          <p className="text-base text-muted-foreground leading-relaxed">
            {answer}
          </p>
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
    <section id="faq-section" className="relative w-full py-24 md:py-32 lg:py-40">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6 opacity-0 animate-fade-in-up"
            style={{ animationFillMode: "forwards" }}
          >
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
            <span className="block text-primary">{t("title.line2")}</span>
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
        <div className="space-y-3">
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
