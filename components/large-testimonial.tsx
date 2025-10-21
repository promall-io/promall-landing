export function LargeTestimonial() {
  return (
    <section className="w-full px-4 py-16 md:py-24 overflow-hidden flex justify-center items-center">
      <div className="w-full max-w-6xl mx-auto">
        <div className="px-6 md:px-12 py-12 md:py-16 rounded-2xl bg-card/30 border border-border/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-8 md:gap-10 text-center">
            <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-relaxed max-w-4xl">
              "با پرومال، مدیریت فروشگاه از یک کار پیچیده به یک تجربه ساده و روان تبدیل شد"
            </p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center">
                <span className="text-xl font-bold text-primary">ع</span>
              </div>
              <div className="flex flex-col items-start">
                <div className="text-foreground text-base font-semibold">علی محمدی</div>
                <div className="text-muted-foreground text-sm">مدیرعامل فروشگاه دیجی‌استایل</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
