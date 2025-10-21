"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

  console.log('PricingSection render - isAnnual:', isAnnual)

  const pricingPlans = [
    {
      name: "رایگان",
      monthlyPrice: "۰",
      annualPrice: "۰",
      description: "برای شروع کار و آشنایی با پرومال",
      features: ["تا ۱۰ محصول", "سفارش‌های محدود", "گزارش‌های ساده", "پشتیبانی ایمیلی"],
      buttonText: "همین الان شروع کنید",
      popular: false,
    },
    {
      name: "حرفه‌ای",
      monthlyPrice: "۲۰۰,۰۰۰",
      annualPrice: "۱۶۰,۰۰۰",
      description: "بهترین انتخاب برای فروشگاه‌های متوسط",
      features: [
        "محصولات نامحدود",
        "مدیریت کامل سفارش‌ها",
        "کنترل انبار",
        "چاپ خودکار",
        "درگاه پرداخت",
        "گزارش‌های پیشرفته",
        "پشتیبانی سریع",
      ],
      buttonText: "الان خریدش کنید",
      popular: true,
    },
    {
      name: "سازمانی",
      monthlyPrice: "تماس بگیرید",
      annualPrice: "تماس بگیرید",
      description: "راهکار ویژه برای کسب‌وکارهای بزرگ",
      features: ["پشتیبانی ۲۴/۷", "چند فروشگاه", "مدیریت تیم", "امنیت بالا", "سفارشی‌سازی کامل"],
      buttonText: "با ما تماس بگیرید",
      popular: false,
    },
  ]

  return (
    <section id="pricing-section" className="relative w-full py-20 md:py-32 bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-20 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/30 shadow-glow-primary animate-fade-in-up">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm md:text-base font-black text-primary tracking-tight">قیمت‌گذاری</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            یه پلن مناسب برای
            <br />
            <span className="text-primary">هر کسب‌وکاری داریم</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            رایگان شروع کنید و هر وقت خواستید ارتقا بدید
          </p>

          {/* Toggle - Enhanced */}
          <div className="inline-flex p-1.5 bg-card/60 backdrop-blur-sm rounded-full border border-primary/30 shadow-medium animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button
              onClick={() => setIsAnnual(false)}
              className={`relative px-8 py-3 rounded-full font-bold text-base transition-all duration-300 ${
                !isAnnual
                  ? "bg-primary text-primary-foreground shadow-glow-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ماهانه
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`relative px-8 py-3 rounded-full font-bold text-base transition-all duration-300 ${
                isAnnual
                  ? "bg-primary text-primary-foreground shadow-glow-primary scale-105"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              سالانه
              <span className="mr-2 text-xs bg-primary-foreground/30 px-2.5 py-1 rounded-full font-black">۲۰٪ تخفیف</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.name}
              className={`group relative rounded-3xl p-8 md:p-10 flex flex-col transition-all duration-500 hover-lift ${
                plan.popular
                  ? "bg-primary border-2 border-primary shadow-galaxy hover:shadow-galaxy-hover scale-105 hover:scale-110"
                  : "bg-card/50 backdrop-blur-sm border-2 border-border/60 hover:border-primary/50 shadow-medium hover:shadow-strong"
              }`}
              style={{ animationDelay: `${index * 0.1 + 0.4}s` }}
            >
              {/* Gradient Overlay for Non-Popular */}
              {!plan.popular && (
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              )}

              {plan.popular && (
                <div className="absolute -top-4 right-1/2 translate-x-1/2 px-6 py-2 bg-primary-foreground text-primary text-sm font-black rounded-full shadow-strong animate-bounce" style={{ animationIterationCount: '3', animationDuration: '1s' }}>
                  محبوب‌ترین
                </div>
              )}

              <div className="relative mb-8">
                <h3
                  className={`text-2xl md:text-3xl font-black mb-3 ${plan.popular ? "text-primary-foreground" : "text-foreground group-hover:text-primary transition-colors"}`}
                >
                  {plan.name}
                </h3>
                <p className={`text-base ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground group-hover:text-foreground/80 transition-colors"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="relative mb-8 md:mb-10">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-4xl md:text-5xl font-black transition-all duration-300 ${plan.popular ? "text-primary-foreground" : "text-foreground group-hover:text-primary"}`}
                  >
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.name !== "سازمانی" && (
                    <span
                      className={`text-lg font-bold ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                    >
                      تومان/ماه
                    </span>
                  )}
                </div>
              </div>

              <Button
                className={`relative w-full mb-10 py-7 rounded-full font-black text-lg overflow-hidden transition-all duration-500 ${
                  plan.popular
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-strong hover:scale-105"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow-primary hover:shadow-galaxy-hover hover:scale-105"
                }`}
              >
                <span className="relative z-10">{plan.buttonText}</span>
                {!plan.popular && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                )}
              </Button>

              <div className="relative space-y-5">
                {plan.features.map((feature, idx) => (
                  <div
                    key={feature}
                    className="flex items-start gap-4 transition-all duration-300 hover:translate-x-1"
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${plan.popular ? "bg-primary-foreground/20" : "bg-primary/15"}`}>
                      <Check
                        className={`w-4 h-4 ${plan.popular ? "text-primary-foreground" : "text-primary"}`}
                      />
                    </div>
                    <span
                      className={`text-base font-medium ${plan.popular ? "text-primary-foreground/95" : "text-foreground/80"}`}
                    >
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
