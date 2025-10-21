import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="w-full py-32 md:py-40 px-4 md:px-5 relative flex flex-col justify-center items-center overflow-visible">
      {/* Glass card container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <div
          className="relative backdrop-blur-2xl bg-background/40 
                     border border-primary/20 rounded-3xl md:rounded-[40px] p-8 md:p-12 lg:p-16
                     shadow-[0_8px_32px_0_rgba(183,209,171,0.15)]
                     hover:shadow-[0_12px_48px_0_rgba(183,209,171,0.25)]
                     transition-all duration-500"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-3xl md:rounded-[40px] bg-white/5" />

          <div className="relative flex flex-col justify-center items-center gap-8 md:gap-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/30">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">شروع رایگان، بدون نیاز به کارت اعتباری</span>
            </div>

            {/* Heading */}
            <div className="flex flex-col gap-4 md:gap-6">
              <h2 className="text-foreground text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                آماده‌اید شروع کنید؟
              </h2>
              <p className="text-muted-foreground text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                همین الان به جمع هزاران فروشنده موفق بپیوندید و فروشگاه‌تان را با پرومال حرفه‌ای مدیریت کنید
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
                <Button
                  className="px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground text-base md:text-xl font-black 
                           rounded-full shadow-lg hover:shadow-xl
                           hover:scale-110 transition-all duration-500"
                  size="lg"
                >
                  ورود به اپلیکیشن
                  <Sparkles className="w-6 h-6 mr-3" />
                </Button>
              </Link>
              <Button
                variant="outline"
                className="px-8 py-6 bg-background/50 backdrop-blur-xl border-primary/30 hover:bg-primary/10 
                         text-foreground text-base md:text-lg font-semibold rounded-full
                         hover:scale-105 transition-all duration-300"
                size="lg"
              >
                مشاهده دمو
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>نصب در ۲ دقیقه</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>پشتیبانی ۲۴/۷</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span>بدون محدودیت</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
