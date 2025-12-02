import { Package, ShoppingCart, Warehouse, CreditCard, Printer, BarChart3 } from "lucide-react"
import { AnimatedList } from "@/components/animated-list"

const BentoCard = ({ title, description, icon: Icon }) => (
  <div
    className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/50 backdrop-blur-sm hover:border-primary/60 transition-all duration-500 hover:shadow-strong hover:shadow-primary/20 hover-lift hover-shine"
  >
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    {/* Shine Effect Border */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <div className="relative p-7 md:p-9 flex flex-col gap-6 h-full">
      {/* Icon Container - Enhanced */}
      <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary/15 flex items-center justify-center group-hover:bg-primary/25 group-hover:scale-110 transition-all duration-500 shadow-soft">
        <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <Icon className="relative w-7 h-7 md:w-8 md:h-8 text-primary group-hover:rotate-6 transition-transform duration-500" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xl md:text-2xl font-black text-foreground group-hover:text-primary transition-colors duration-300">{title}</h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{description}</p>
      </div>
    </div>
  </div>
)

export function BentoSection() {
  const cards = [
    {
      title: "مدیریت محصولات",
      description: "محصولاتتون رو با چند کلیک اضافه کنید، قیمت‌گذاری کنید و تخفیف بذارید. همه‌چیز ساده و سریع!",
      icon: Package,
    },
    {
      title: "کنترل سفارش‌ها",
      description: "تمام سفارش‌ها رو در یک جا ببینید، تایید کنید یا لغو کنید. دیگه هیچ سفارشی جا نمی‌مونه!",
      icon: ShoppingCart,
    },
    {
      title: "مدیریت انبار",
      description: "موجودی انبارتون رو لحظه‌ای ببینید و کنترل کنید. دیگه نگران کمبود یا اضافه موجودی نباشید!",
      icon: Warehouse,
    },
    {
      title: "پرداخت آسان و امن",
      description: "به راحتی به درگاه‌های پرداخت وصل بشید و پول‌تون رو با خیال راحت دریافت کنید.",
      icon: CreditCard,
    },
    {
      title: "چاپ خودکار",
      description: "فاکتور و برچسب ارسال به‌صورت خودکار چاپ میشه. دیگه وقت‌تون رو هدر ندید!",
      icon: Printer,
    },
    {
      title: "گزارش‌های کامل",
      description: "ببینید چقدر فروش داشتید، کدوم محصولات بیشتر فروش رفتن و مشتری‌هاتون چطور رفتار می‌کنن.",
      icon: BarChart3,
    },
  ]

  return (
    <section id="features-section" className="relative w-full py-20 md:py-32 bg-background overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 md:mb-20 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/30 shadow-glow-primary animate-fade-in-up">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm md:text-base font-black text-primary tracking-tight">امکانات</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            همه‌چیزی که برای فروش آنلاین
            <br />
            <span className="text-primary">نیاز دارید</span>
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            از لحظه‌ای که محصول رو اضافه می‌کنید تا زمانی که به دست مشتری می‌رسه،
            <span className="text-primary font-bold"> پرومال کنارتونه!</span>
          </p>
        </div>

        {/* Cards Grid - Staggered Animation */}
        <AnimatedList
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
          staggerDelay={100}
          variant="blur-up"
          duration={700}
        >
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </AnimatedList>
      </div>
    </section>
  )
}
