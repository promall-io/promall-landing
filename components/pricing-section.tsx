"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true)

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
    <section id="pricing-section" className="w-full px-6 py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">قیمت‌گذاری</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">یه پلن مناسب برای هر کسب‌وکاری داریم</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            رایگان شروع کنید و هر وقت خواستید ارتقا بدید
          </p>

          <div className="inline-flex p-1 bg-muted rounded-full border border-border">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${!isAnnual ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground"}`}
            >
              ماهانه
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${isAnnual ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground"}`}
            >
              سالانه
              <span className="mr-2 text-xs bg-primary-foreground/20 px-2 py-1 rounded-full">۲۰٪ تخفیف</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.popular
                  ? "bg-primary border-2 border-primary shadow-2xl shadow-primary/20 scale-105"
                  : "bg-card border border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 right-1/2 translate-x-1/2 px-4 py-1 bg-primary-foreground text-primary text-sm font-bold rounded-full">
                  محبوب‌ترین
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-2xl font-bold mb-2 ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-5xl font-bold ${plan.popular ? "text-primary-foreground" : "text-foreground"}`}
                  >
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  {plan.name !== "سازمانی" && (
                    <span
                      className={`text-lg ${plan.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      تومان/ماه
                    </span>
                  )}
                </div>
              </div>

              <Button
                className={`w-full mb-8 py-6 rounded-full font-bold text-lg ${
                  plan.popular
                    ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {plan.buttonText}
              </Button>

              <div className="space-y-4">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check
                      className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? "text-primary-foreground" : "text-primary"}`}
                    />
                    <span
                      className={`text-sm ${plan.popular ? "text-primary-foreground/90" : "text-muted-foreground"}`}
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
