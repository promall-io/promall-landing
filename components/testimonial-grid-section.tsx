import { Star, Smartphone, Zap, Shield, TrendingUp, Users, Sparkles } from "lucide-react"

const testimonials = [
  {
    id: "testimonial-sara-ahmadi",
    quote:
      "پرومال واقعاً کار ما رو راحت کرده. مدیریت محصولات و سفارش‌ها خیلی ساده‌تر شده و مشتری‌هامون هم از اپلیکیشن راضی هستن.",
    name: "سارا احمدی",
    company: "فروشگاه مد و پوشاک آرمانی",
    initials: "س",
    rating: 5,
    type: "large-green",
  },
  {
    id: "testimonial-reza-karimi",
    quote: "با پرومال فروش آنلاینمون ۳ برابر شده. واقعاً عالیه!",
    name: "رضا کریمی",
    company: "لوازم خانگی رضوان",
    initials: "ر",
    rating: 5,
    type: "small-dark",
  },
  {
    id: "testimonial-maryam-noori",
    quote: "رابط کاربری خیلی ساده و کاربردیه. همه چیز سر جاشه.",
    name: "مریم نوری",
    company: "آرایشی و بهداشتی گلرنگ",
    initials: "م",
    rating: 5,
    type: "small-dark",
  },
  {
    id: "testimonial-ali-mohammadi",
    quote: "پشتیبانی فوق‌العاده‌ای دارن. هر مشکلی رو سریع حل می‌کنن.",
    name: "علی محمدی",
    company: "کتاب و لوازم‌التحریر دانش",
    initials: "ع",
    rating: 5,
    type: "small-dark",
  },
  {
    id: "testimonial-fatemeh-rezaei",
    quote: "بهترین اپلیکیشن برای مدیریت فروشگاه آنلاین. پیشنهاد می‌کنم!",
    name: "فاطمه رضایی",
    company: "صنایع دستی ایران زمین",
    initials: "ف",
    rating: 5,
    type: "small-dark",
  },
  {
    id: "testimonial-hosein-jafari",
    quote: "از وقتی پرومال رو شروع کردیم، کارمون خیلی منظم‌تر شده.",
    name: "حسین جعفری",
    company: "سوپرمارکت آنلاین بارکد",
    initials: "ح",
    rating: 5,
    type: "small-dark",
  },
  {
    id: "testimonial-niloofar-sadeghi",
    quote:
      "امکانات پرومال واقعاً کامله. از مدیریت موجودی تا ارسال سفارش، همه چیز یکجا هست. مشتری‌هامون هم از تجربه خرید راضی هستن و این باعث افزایش فروش ما شده.",
    name: "نیلوفر صادقی",
    company: "فروشگاه زنجیره‌ای کالای دیجیتال",
    initials: "ن",
    rating: 5,
    type: "large-light",
  },
]

const benefits = [
  {
    icon: Smartphone,
    title: "طراحی مدرن و کاربرپسند",
    description: "رابط کاربری زیبا و ساده که استفاده از اپلیکیشن را لذت‌بخش می‌کند",
  },
  {
    icon: Zap,
    title: "سرعت بی‌نظیر",
    description: "عملکرد فوق‌سریع برای مدیریت فروشگاه در هر زمان و مکان",
  },
  {
    icon: Shield,
    title: "امنیت تضمین شده",
    description: "حفاظت کامل از اطلاعات شما و مشتریانتان با بالاترین استانداردها",
  },
  {
    icon: TrendingUp,
    title: "افزایش فروش",
    description: "ابزارهای هوشمند برای رشد کسب‌وکار و جذب مشتریان بیشتر",
  },
  {
    icon: Users,
    title: "پشتیبانی ۲۴/۷",
    description: "تیم پشتیبانی حرفه‌ای همیشه در کنار شما برای حل هر مشکلی",
  },
  {
    icon: Sparkles,
    title: "به‌روزرسانی مداوم",
    description: "امکانات جدید و بهبودهای مستمر برای تجربه بهتر",
  },
]

const TestimonialCard = ({ quote, name, company, initials, rating, type }) => {
  const isLargeCard = type.startsWith("large")
  const avatarSize = isLargeCard ? "w-12 h-12" : "w-9 h-9"
  const padding = isLargeCard ? "p-6 md:p-8" : "p-5 md:p-6"

  let cardClasses = `flex flex-col justify-between items-start overflow-hidden rounded-2xl relative ${padding} backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]`
  let quoteClasses = ""
  let nameClasses = ""
  let companyClasses = ""
  let backgroundElements = null
  let cardHeight = ""
  const cardWidth = "w-full"

  if (type === "large-green") {
    cardClasses += " bg-primary/90 shadow-lg shadow-primary/20"
    quoteClasses += " text-primary-foreground text-xl md:text-2xl font-medium leading-relaxed"
    nameClasses += " text-primary-foreground text-base font-semibold"
    companyClasses += " text-primary-foreground/70 text-sm font-normal"
    cardHeight = "min-h-[400px] md:min-h-[450px]"
    backgroundElements = <div className="absolute inset-0 bg-primary/10 opacity-20" />
  } else if (type === "large-light") {
    cardClasses += " bg-card/80 border border-border/50 shadow-lg"
    quoteClasses += " text-foreground text-xl md:text-2xl font-medium leading-relaxed"
    nameClasses += " text-foreground text-base font-semibold"
    companyClasses += " text-muted-foreground text-sm font-normal"
    cardHeight = "min-h-[400px] md:min-h-[450px]"
    backgroundElements = <div className="absolute inset-0 bg-primary/5 opacity-50" />
  } else {
    cardClasses += " bg-card/60 border border-border/30 shadow-md hover:shadow-lg hover:border-primary/30"
    quoteClasses += " text-foreground/90 text-base md:text-lg font-normal leading-relaxed"
    nameClasses += " text-foreground text-sm font-semibold"
    companyClasses += " text-muted-foreground text-xs font-normal"
    cardHeight = "min-h-[220px] md:min-h-[240px]"
  }

  return (
    <div className={`${cardClasses} ${cardWidth} ${cardHeight}`}>
      {backgroundElements}
      <div className="relative z-10 flex flex-col gap-4 flex-1">
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star key={`star-${i}`} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <div className={`font-normal break-words ${quoteClasses}`}>"{quote}"</div>
      </div>
      <div className="relative z-10 flex justify-start items-center gap-3 mt-4">
        <div
          className={`${avatarSize} rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center border-2 border-primary/20`}
        >
          <span className={`${isLargeCard ? "text-xl" : "text-base"} font-bold text-primary`}>{initials}</span>
        </div>
        <div className="flex flex-col justify-start items-start gap-1">
          <div className={nameClasses}>{name}</div>
          <div className={companyClasses}>{company}</div>
        </div>
      </div>
    </div>
  )
}

export function TestimonialGridSection() {
  return (
    <section className="w-full px-4 py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            چرا پرومال؟
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            همه چیزی که برای موفقیت فروشگاه آنلاین خود نیاز دارید
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="group relative flex flex-col p-6 md:p-8 rounded-2xl bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 overflow-hidden"
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col gap-5">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-foreground text-xl md:text-2xl font-bold">{benefit.title}</h3>
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                {/* Shine effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
