import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Zap, ArrowLeft } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[150px] animate-pulse" />

      {/* Glass Card Container - Enhanced */}
      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <div
          className="relative glass-card rounded-[48px] p-12 md:p-16 lg:p-20
                     shadow-galaxy hover:shadow-galaxy-hover
                     transition-all duration-700 hover:scale-[1.02] group"
        >
          {/* Animated Border Gradient */}
          <div className="absolute inset-0 rounded-[48px] bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          {/* Shine Effect */}
          <div className="absolute inset-0 rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          </div>

          <div className="relative flex flex-col justify-center items-center gap-10 md:gap-12 text-center">
            {/* Badge - Enhanced */}
            <div className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-primary/25 backdrop-blur-md border border-primary/50 shadow-glow-primary animate-fade-in-up">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-sm md:text-base font-black text-foreground">شروع رایگان، بدون نیاز به کارت اعتباری</span>
            </div>

            {/* Heading - Enhanced */}
            <div className="flex flex-col gap-6 md:gap-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-foreground text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                آماده‌اید
                <br />
                <span className="text-primary">شروع کنید؟</span>
              </h2>
              <p className="text-foreground/80 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto font-medium">
                همین الان به جمع <span className="text-primary font-black">هزاران فروشنده موفق</span> بپیوندید و فروشگاه‌تان را با پرومال حرفه‌ای مدیریت کنید
              </p>
            </div>

            {/* CTA Buttons - Enhanced */}
            <div className="flex flex-col sm:flex-row items-center gap-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
                <Button
                  className="group relative px-14 py-8 bg-primary hover:bg-primary/90 text-primary-foreground text-xl font-black
                           rounded-full shadow-galaxy hover:shadow-galaxy-hover
                           hover:scale-110 active:scale-95 transition-all duration-500 overflow-hidden"
                  size="lg"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
                  <span className="relative flex items-center gap-3">
                    ورود به اپلیکیشن
                    <Zap className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                  </span>
                </Button>
              </Link>
              <Button
                variant="outline"
                className="group px-12 py-8 bg-background/60 backdrop-blur-md border-2 border-primary/40 hover:bg-primary/10 hover:border-primary/70
                         text-foreground text-lg font-bold rounded-full
                         hover:scale-105 active:scale-95 transition-all duration-500 hover-shine shadow-medium"
                size="lg"
              >
                <span className="flex items-center gap-3">
                  مشاهده دمو
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>

            {/* Trust Indicators - Enhanced */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 pt-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {[
                { text: "نصب در ۲ دقیقه", icon: "⚡" },
                { text: "پشتیبانی ۲۴/۷", icon: "💬" },
                { text: "بدون محدودیت", icon: "🚀" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 group cursor-default">
                  <div className="w-3 h-3 rounded-full bg-primary shadow-glow-primary group-hover:scale-125 transition-transform" />
                  <span className="text-base font-bold text-foreground/80 group-hover:text-primary transition-colors">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
