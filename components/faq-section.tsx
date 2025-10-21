"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "پرومال چیه و برای کی مناسبه؟",
    answer:
      "پرومال یه اپلیکیشن هوشمنده که به شما کمک می‌کنه فروشگاه آنلاین‌تون رو راحت‌تر مدیریت کنید. برای هر کسی که می‌خواد آنلاین بفروشه، از فروشنده‌های کوچک تا کسب‌وکارهای بزرگ، مناسبه!",
  },
  {
    question: "چطوری محصولاتم رو مدیریت کنم؟",
    answer:
      "خیلی راحته! محصولاتتون رو اضافه کنید، قیمت و تخفیف بذارید، موجودی رو کنترل کنید و همه‌چیز رو در یک جا ببینید. همه‌چیز ساده و سریعه!",
  },
  {
    question: "میشه پرومال رو با ابزارهای دیگه وصل کرد؟",
    answer:
      "بله! پرومال با درگاه‌های پرداخت، سیستم‌های حسابداری و خیلی ابزارهای دیگه کار می‌کنه. همه‌چیز رو به هم وصل کنید و راحت کار کنید!",
  },
  {
    question: "پلن رایگان چی داره؟",
    answer:
      "با پلن رایگان می‌تونید تا ۱۰ محصول اضافه کنید، سفارش‌های محدود ثبت کنید و گزارش‌های ساده ببینید. برای شروع کار و آشنایی با پرومال عالیه!",
  },
  {
    question: "چطوری سفارش‌ها رو پیگیری کنم؟",
    answer:
      "تمام سفارش‌ها رو در یک داشبورد می‌بینید، وضعیت‌شون رو تغییر می‌دید، مرجوعی‌ها رو مدیریت می‌کنید و موجودی به‌صورت خودکار کم میشه. همه‌چیز خودکاره!",
  },
  {
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
  return (
    <div
      className={`w-full bg-[rgba(231,236,235,0.08)] shadow-[0px_2px_4px_rgba(0,0,0,0.16)] overflow-hidden rounded-[10px] outline outline-1 outline-border outline-offset-[-1px] transition-all duration-500 ease-out cursor-pointer`}
      onClick={handleClick}
    >
      <div className="w-full px-5 py-[18px] pr-4 flex justify-between items-center gap-5 text-right transition-all duration-300 ease-out">
        <div className="flex-1 text-foreground text-base font-medium leading-6 break-words">{question}</div>
        <div className="flex justify-center items-center">
          <ChevronDown
            className={`w-6 h-6 text-muted-foreground-dark transition-all duration-500 ease-out ${isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
          />
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          transitionProperty: "max-height, opacity, padding",
          transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          className={`px-5 transition-all duration-500 ease-out ${isOpen ? "pb-[18px] pt-2 translate-y-0" : "pb-0 pt-0 -translate-y-2"}`}
        >
          <div className="text-foreground/80 text-sm font-normal leading-6 break-words text-right">{answer}</div>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="w-full pt-[66px] pb-20 md:pb-40 px-5 relative flex flex-col justify-center items-center">
      <div className="w-[300px] h-[500px] absolute top-[150px] left-1/2 -translate-x-1/2 origin-top-left rotate-[-33.39deg] bg-primary/10 blur-[100px] z-0" />
      <div className="self-stretch pt-8 pb-8 md:pt-14 md:pb-14 flex flex-col justify-center items-center gap-2 relative z-10">
        <div className="flex flex-col justify-start items-center gap-4">
          <h2 className="w-full max-w-[435px] text-center text-foreground text-4xl font-semibold leading-10 break-words">
            سوالات متداول
          </h2>
          <p className="self-stretch text-center text-muted-foreground text-sm font-medium leading-[18.20px] break-words">
            سوالی دارید؟ جوابش رو اینجا پیدا کنید!
          </p>
        </div>
      </div>
      <div className="w-full max-w-[600px] pt-0.5 pb-10 flex flex-col justify-start items-start gap-4 relative z-10">
        {faqData.map((faq, index) => (
          <FAQItem key={index} {...faq} isOpen={openItems.has(index)} onToggle={() => toggleItem(index)} />
        ))}
      </div>
    </section>
  )
}
