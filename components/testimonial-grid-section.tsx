import Image from "next/image"
import { Star, Smartphone, Zap, Shield, TrendingUp, Users, Sparkles } from "lucide-react"

const testimonials = [
  {
    quote:
      "پرومال واقعاً کار ما رو راحت کرده. مدیریت محصولات و سفارش‌ها خیلی ساده‌تر شده و مشتری‌هامون هم از اپلیکیشن راضی هستن.",
    name: "سارا احمدی",
    company: "فروشگاه مد و پوشاک آرمانی",
    avatar: "/placeholder.svg?height=48&width=48",
    rating: 5,
    type: "large-green",
  },
  {
    quote: "با پرومال فروش آنلاینمون ۳ برابر شده. واقعاً عالیه!",
    name: "رضا کریمی",
    company: "لوازم خانگی رضوان",
    avatar: "/placeholder.svg?height=36&width=36",
    rating: 5,
    type: "small-dark",
  },
  {
    quote: "رابط کاربری خیلی ساده و کاربردیه. همه چیز سر جاشه.",
    name: "مریم نوری",
    company: "آرایشی و بهداشتی گلرنگ",
    avatar: "/placeholder.svg?height=36&width=36",
    rating: 5,
    type: "small-dark",
  },
  {
    quote: "پشتیبانی فوق‌العاده‌ای دارن. هر مشکلی رو سریع حل می‌کنن.",
    name: "علی محمدی",
    company: "کتاب و لوازم‌التحریر دانش",
    avatar: "/placeholder.svg?height=36&width=36",
    rating: 5,
    type: "small-dark",
  },
  {
    quote: "بهترین اپلیکیشن برای مدیریت فروشگاه آنلاین. پیشنهاد می‌کنم!",
    name: "فاطمه رضایی",
    company: "صنایع دستی ایران زمین",
    avatar: "/placeholder.svg?height=36&width=36",
    rating: 5,
    type: "small-dark",
  },
  {
    quote: "از وقتی پرومال رو شروع کردیم، کارمون خیلی منظم‌تر شده.",
    name: "حسین جعفری",
    company: "سوپرمارکت آنلاین بارکد",
    avatar: "/placeholder.svg?height=36&width=36",
    rating: 5,
    type: "small-dark",
  },
  {
    quote:
      "امکانات پرومال واقعاً کامله. از مدیریت موجودی تا ارسال سفارش، همه چیز یکجا هست. مشتری‌هامون هم از تجربه خرید راضی هستن و این باعث افزایش فروش ما شده.",
    name: "نیلوفر صادقی",
    company: "فروشگاه زنجیره‌ای کالای دیجیتال",
    avatar: "/placeholder.svg?height=48&width=48",
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

const TestimonialCard = ({ quote, name, company, avatar, rating, type }) => {
  const isLargeCard = type.startsWith("large")
  const avatarSize = isLargeCard ? 48 : 36
  const avatarBorderRadius = isLargeCard ? "rounded-full" : "rounded-full"
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
            <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <div className={`font-normal break-words ${quoteClasses}`}>"{quote}"</div>
      </div>
      <div className="relative z-10 flex justify-start items-center gap-3 mt-4">
        <Image
          src={avatar || "/placeholder.svg"}
          alt={`${name}`}
          width={avatarSize}
          height={avatarSize}
          className={`${avatarBorderRadius} border-2 border-primary/20`}
        />
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
    <section className="w-full px-4 md:px-6 lg:px-8 overflow-hidden flex flex-col justify-start py-16 md:py-24 lg:py-32">
      {/* Header */}
      <div className="self-stretch pb-12 md:pb-16 lg:pb-20 flex flex-col justify-center items-center gap-6">
        <div className="flex flex-col justify-start items-center gap-5 max-w-4xl">
          <h2 className="text-center text-foreground text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            چرا پرومال؟
          </h2>
          <p className="text-center text-muted-foreground text-lg md:text-xl lg:text-2xl font-normal leading-relaxed px-4">
            همه چیزی که برای موفقیت فروشگاه آنلاین خود نیاز دارید
          </p>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-[1400px] mx-auto">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <div
              key={index}
              className="group relative flex flex-col justify-start items-start p-8 md:p-10 rounded-3xl bg-card/40 backdrop-blur-xl border border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
            >
              {/* Content */}
              <div className="relative z-10 flex flex-col gap-6 w-full">
                {/* Icon */}
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-primary/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform transition-transform">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-primary" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-foreground text-xl md:text-2xl font-bold leading-tight">{benefit.title}</h3>
                  <p className="text-muted-foreground text-base md:text-lg font-normal leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-primary/5 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-center items-center mt-16 md:mt-20 lg:mt-24">
        <div className="flex flex-col items-center gap-4 text-center max-w-2xl px-4">
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            آماده‌اید تا فروشگاه خود را به سطح بعدی ببرید؟
          </p>
        </div>
      </div>
    </section>
  )
}
