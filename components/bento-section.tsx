import { Package, ShoppingCart, Warehouse, CreditCard, Printer, BarChart3 } from "lucide-react"

const BentoCard = ({ title, description, icon: Icon }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
    <div className="relative p-8 flex flex-col gap-6 h-full">
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
        <Icon className="w-7 h-7 text-primary" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
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
    <section id="features-section" className="w-full px-6 py-24 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">امکانات</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            همه‌چیزی که برای فروش آنلاین نیاز دارید
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            از لحظه‌ای که محصول رو اضافه می‌کنید تا زمانی که به دست مشتری می‌رسه، پرومال کنارتونه!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <BentoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
