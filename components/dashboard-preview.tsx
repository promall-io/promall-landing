export function DashboardPreview() {
  return (
    <div className="w-full max-w-[1000px] mx-auto px-4 py-16 md:py-24">
      {/* iOS 18 Liquid Glass Container with enhanced effects */}
      <div className="relative">
        {/* Multi-layer glass morphism background */}
        <div className="absolute inset-0 bg-primary/20 rounded-[48px] blur-[80px] animate-pulse-slow" />
        <div className="absolute inset-0 bg-primary/10 rounded-[48px] blur-[60px]" />

        {/* Main premium glass container */}
        <div className="relative backdrop-blur-3xl bg-white/[0.05] border border-white/20 rounded-[48px] p-8 md:p-12 shadow-[0_8px_32px_0_rgba(183,209,171,0.15),0_0_0_1px_rgba(255,255,255,0.1)_inset] overflow-hidden">
          {/* Ambient light effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-[120px] animate-float-delayed" />

          {/* iPhone 16 showcase - 3 phones with dynamic island */}
          <div className="relative flex items-center justify-center gap-6 md:gap-12 perspective-[2000px]">
            <div className="transform rotate-[-12deg] translate-y-8 scale-[0.85] opacity-75 hover:scale-90 hover:opacity-95 hover:rotate-[-8deg] transition-all duration-700 ease-out">
              {/* Dynamic Island - iPhone 16 style */}
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[100px] md:w-[120px] h-[32px] md:h-[36px] bg-black rounded-full z-20 shadow-inner" />

              {/* Screen with liquid glass effect */}
              <div className="relative w-full h-full bg-primary/40 rounded-[42px] md:rounded-[50px] overflow-hidden backdrop-blur-xl">
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-white/5" />

                <div className="relative p-4 md:p-6 pt-12 md:pt-14 space-y-3 md:space-y-4">
                  <div className="h-10 md:h-14 bg-white/20 rounded-2xl backdrop-blur-md shadow-lg border border-white/30" />
                  <div className="h-20 md:h-28 bg-white/15 rounded-2xl backdrop-blur-md shadow-lg border border-white/20" />
                  <div className="h-14 md:h-20 bg-white/10 rounded-2xl backdrop-blur-md shadow-lg border border-white/10" />
                </div>
              </div>
            </div>

            <div className="transform scale-100 hover:scale-[1.05] transition-all duration-700 ease-out z-20 drop-shadow-2xl">
              {/* Dynamic Island - larger for main phone */}
              <div className="absolute top-[12px] left-1/2 -translate-x-1/2 w-[110px] md:w-[130px] h-[34px] md:h-[38px] bg-black rounded-full z-20 shadow-[0_2px_10px_rgba(0,0,0,0.8)_inset]" />

              {/* Premium screen with app preview */}
              <div className="relative w-full h-full bg-primary rounded-[46px] md:rounded-[54px] overflow-hidden">
                {/* Liquid glass overlay */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />

                {/* App UI mockup with glass morphism */}
                <div className="relative h-full p-5 md:p-7 pt-14 md:pt-16">
                  {/* Header with glass effect */}
                  <div className="flex items-center justify-between mb-5 md:mb-7">
                    <div className="h-10 md:h-12 w-28 md:w-36 bg-white/30 rounded-2xl backdrop-blur-xl shadow-lg border border-white/40" />
                    <div className="h-10 md:h-12 w-10 md:w-12 bg-white/30 rounded-full backdrop-blur-xl shadow-lg border border-white/40" />
                  </div>

                  {/* Stats cards with premium glass */}
                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-5 md:mb-7">
                    <div className="h-20 md:h-28 bg-white/25 rounded-3xl backdrop-blur-2xl p-3 md:p-4 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] border border-white/30">
                      <div className="h-3 md:h-4 w-14 md:w-18 bg-white/50 rounded-lg mb-2" />
                      <div className="h-5 md:h-7 w-18 md:w-24 bg-white/60 rounded-lg" />
                    </div>
                    <div className="h-20 md:h-28 bg-white/25 rounded-3xl backdrop-blur-2xl p-3 md:p-4 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] border border-white/30">
                      <div className="h-3 md:h-4 w-14 md:w-18 bg-white/50 rounded-lg mb-2" />
                      <div className="h-5 md:h-7 w-18 md:w-24 bg-white/60 rounded-lg" />
                    </div>
                  </div>

                  {/* List items with glass morphism */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="h-14 md:h-18 bg-white/20 rounded-2xl backdrop-blur-xl shadow-lg border border-white/25" />
                    <div className="h-14 md:h-18 bg-white/20 rounded-2xl backdrop-blur-xl shadow-lg border border-white/25" />
                    <div className="h-14 md:h-18 bg-white/20 rounded-2xl backdrop-blur-xl shadow-lg border border-white/25" />
                    <div className="h-14 md:h-18 bg-white/15 rounded-2xl backdrop-blur-xl shadow-lg border border-white/20" />
                  </div>
                </div>

                {/* Floating premium badge */}
                <div className="absolute bottom-5 md:bottom-7 right-5 md:right-7 bg-white/95 backdrop-blur-2xl rounded-full px-4 md:px-5 py-2 md:py-2.5 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border border-white/50">
                  <span className="text-xs md:text-sm font-bold text-primary">پرومال</span>
                </div>
              </div>
            </div>

            <div className="transform rotate-[12deg] translate-y-8 scale-[0.85] opacity-75 hover:scale-90 hover:opacity-95 hover:rotate-[8deg] transition-all duration-700 ease-out">
              {/* Dynamic Island */}
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[100px] md:w-[120px] h-[32px] md:h-[36px] bg-black rounded-full z-20 shadow-inner" />

              {/* Screen with liquid glass */}
              <div className="relative w-full h-full bg-primary/40 rounded-[42px] md:rounded-[50px] overflow-hidden backdrop-blur-xl">
                {/* Glass overlay */}
                <div className="absolute inset-0 bg-white/5" />

                <div className="relative p-4 md:p-6 pt-12 md:pt-14 space-y-3 md:space-y-4">
                  <div className="h-14 md:h-20 bg-white/10 rounded-2xl backdrop-blur-md shadow-lg border border-white/10" />
                  <div className="h-20 md:h-28 bg-white/15 rounded-2xl backdrop-blur-md shadow-lg border border-white/20" />
                  <div className="h-10 md:h-14 bg-white/20 rounded-2xl backdrop-blur-md shadow-lg border border-white/30" />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced decorative glass orbs */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/25 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
        </div>
      </div>
    </div>
  )
}
