import { Button } from "@/components/ui/button"
import { Header } from "./header"
import Link from "next/link"
import { Zap, Play, Package, TrendingUp, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col bg-background pt-24 overflow-hidden">
      <div className="relative z-10 w-full">
        <Header />
      </div>

      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="flex flex-col items-center text-center gap-8 sm:gap-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 backdrop-blur-xl border border-primary/40">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-foreground">اولین پلتفرم هوشمند مدیریت فروشگاه در ایران</span>
          </div>

          {/* متن اصلی */}
          <div className="flex flex-col gap-6 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] text-balance">
              <span className="text-foreground">فروشگاه آنلاینتون رو</span>
              <br />
              <span className="text-primary">به سطح بعدی ببرید</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed max-w-3xl mx-auto text-pretty font-medium">
              با پرومال، مدیریت محصولات، سفارش‌ها و موجودی فروشگاهتون خیلی ساده‌تر میشه.
              <span className="text-primary font-bold"> تجربه‌ای متفاوت، نتیجه‌ای باورنکردنی!</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <Link href="https://app.promall.io" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 rounded-full font-black text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95">
                <span className="flex items-center gap-3">
                  ورود به اپلیکیشن
                  <Zap className="w-6 h-6" />
                </span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-2 border-primary/50 text-foreground hover:bg-primary/20 hover:border-primary px-10 py-7 rounded-full font-bold text-lg sm:text-xl bg-background/50 backdrop-blur-xl transition-all duration-300 hover:scale-105"
            >
              <Play className="w-6 h-6 ml-3" />
              تماشای ویدیو معرفی
            </Button>
          </div>

          {/* موبایل مدرن و تمیز */}
          <div className="relative mt-12 sm:mt-16">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px]" />

            {/* iPhone 16 Pro Frame */}
            <div className="relative w-[300px] sm:w-[360px] md:w-[400px] aspect-[9/19.5] mx-auto transform hover:scale-105 transition-transform duration-700">
              {/* Dynamic Island - iPhone 16 Pro style */}
              <div className="absolute top-[14px] left-1/2 -translate-x-1/2 w-[120px] md:w-[130px] h-[36px] md:h-[38px] bg-black rounded-full z-20 shadow-[0_2px_10px_rgba(0,0,0,0.8)_inset]" />

              {/* Screen with ProMall App UI */}
              <div className="relative w-full h-full bg-primary rounded-[50px] md:rounded-[54px] overflow-hidden shadow-2xl">
                {/* Multi-layer liquid glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

                {/* ProMall App Interface */}
                <div className="relative h-full p-6 md:p-7 pt-16 md:pt-18">
                  {/* App Header with glass morphism */}
                  <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 md:w-13 md:h-13 bg-white/50 rounded-2xl backdrop-blur-2xl shadow-lg border border-white/60 flex items-center justify-center">
                        <Package className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="h-3.5 w-24 bg-white/70 rounded-lg mb-1.5 shadow-sm" />
                        <div className="h-2.5 w-16 bg-white/50 rounded-lg shadow-sm" />
                      </div>
                    </div>
                    <div className="w-11 h-11 md:w-12 md:h-12 bg-white/40 rounded-full backdrop-blur-2xl shadow-lg border border-white/50" />
                  </div>

                  {/* Stats Cards with premium glass */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
                    <div className="h-28 md:h-32 bg-white/40 rounded-3xl backdrop-blur-3xl p-4 shadow-lg border border-white/50 hover:scale-105 transition-transform">
                      <TrendingUp className="w-5 h-5 text-primary-foreground mb-2" />
                      <div className="h-7 md:h-8 w-20 bg-white/80 rounded-xl mt-2 shadow-sm" />
                      <div className="h-2.5 w-14 bg-white/60 rounded-lg mt-2" />
                    </div>
                    <div className="h-28 md:h-32 bg-white/40 rounded-3xl backdrop-blur-3xl p-4 shadow-lg border border-white/50 hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5 text-primary-foreground mb-2" />
                      <div className="h-7 md:h-8 w-20 bg-white/80 rounded-xl mt-2 shadow-sm" />
                      <div className="h-2.5 w-14 bg-white/60 rounded-lg mt-2" />
                    </div>
                  </div>

                  {/* Product List with glass morphism */}
                  <div className="space-y-3 md:space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-18 md:h-20 bg-white/35 rounded-2xl backdrop-blur-2xl shadow-md border border-white/40 p-3 flex items-center gap-3 hover:bg-white/45 transition-all"
                      >
                        <div className="w-12 h-12 bg-white/50 rounded-xl shadow-sm" />
                        <div className="flex-1 space-y-2">
                          <div className="h-3 w-28 bg-white/60 rounded-lg" />
                          <div className="h-2.5 w-20 bg-white/50 rounded-lg" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Floating Action Button */}
                  <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 w-16 h-16 md:w-18 md:h-18 bg-white/95 backdrop-blur-3xl rounded-full shadow-xl border-2 border-white/70 flex items-center justify-center hover:scale-110 transition-transform">
                    <div className="w-7 h-7 bg-primary-foreground rounded-xl shadow-lg" />
                  </div>

                  {/* Premium Badge */}
                  <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 bg-white/95 backdrop-blur-3xl rounded-full px-5 py-2.5 shadow-xl border-2 border-white/70">
                    <span className="text-sm font-black text-primary-foreground">پرومال</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* آمار */}
          <div className="grid grid-cols-3 gap-8 sm:gap-12 lg:gap-16 pt-16 border-t border-primary/30 w-full max-w-4xl">
            <div className="flex flex-col items-center group hover:scale-110 transition-transform">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-2">+۵۰۰</div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">فروشگاه فعال</div>
            </div>
            <div className="flex flex-col items-center group hover:scale-110 transition-transform">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-2">+۱۰K</div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">سفارش روزانه</div>
            </div>
            <div className="flex flex-col items-center group hover:scale-110 transition-transform">
              <div className="text-4xl sm:text-5xl md:text-6xl font-black text-primary mb-2">۹۹٪</div>
              <div className="text-sm sm:text-base text-muted-foreground font-medium">رضایت کاربران</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
