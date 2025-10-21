"use client"

import { Twitter, Github, Linkedin } from "lucide-react"

export function FooterSection() {
  return (
    <footer className="w-full max-w-[1320px] mx-auto px-5 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 py-10 md:py-[70px]">
      <div className="flex flex-col justify-start items-start gap-8 p-4 md:p-8">
        <div className="flex gap-3 items-stretch justify-center">
          <div className="text-center text-foreground text-xl font-semibold leading-4">پرومال</div>
        </div>
        <p className="text-foreground/90 text-sm font-medium leading-[18px] text-right">
          مدیریت فروشگاه آنلاین، ساده و دوستانه!
        </p>
        <div className="flex justify-start items-start gap-3">
          <a href="#" aria-label="توییتر" className="w-4 h-4 flex items-center justify-center">
            <Twitter className="w-full h-full text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a href="#" aria-label="گیت‌هاب" className="w-4 h-4 flex items-center justify-center">
            <Github className="w-full h-full text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a href="#" aria-label="لینکدین" className="w-4 h-4 flex items-center justify-center">
            <Linkedin className="w-full h-full text-muted-foreground hover:text-primary transition-colors" />
          </a>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 p-4 md:p-8 w-full md:w-auto">
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">محصول</h3>
          <div className="flex flex-col justify-end items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              امکانات
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              قیمت‌گذاری
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              یکپارچه‌سازی
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              مدیریت محصولات
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              گزارش‌گیری
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">شرکت</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              درباره ما
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              تیم ما
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              فرصت‌های شغلی
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              برند
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              تماس با ما
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-3">
          <h3 className="text-muted-foreground text-sm font-medium leading-5">منابع</h3>
          <div className="flex flex-col justify-center items-start gap-2">
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              شرایط استفاده
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              مستندات
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              راهنما
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              انجمن کاربران
            </a>
            <a href="#" className="text-foreground text-sm font-normal leading-5 hover:text-primary transition-colors">
              پشتیبانی
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
