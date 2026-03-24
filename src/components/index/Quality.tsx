const Quality = () => {
  return (
    <div className="relative h-[620px] overflow-hidden bg-black">
      {/* Background Image with subtle zoom effect */}
      <div
        className="absolute inset-0 bg-[url('/src/assets/home-page/mercado-3.jpg')] bg-cover bg-center scale-105 transition-transform duration-[8000ms] hover:scale-110"
        aria-hidden="true"
      />

      {/* Modern Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      <div className="relative z-10 h-full flex flex-col justify-between p-6">

        {/* Top Left - Glassmorphic Card */}
        <div className="max-w-[280px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-2xl bg-golden/20 flex items-center justify-center">
              <span className="text-golden text-xl">✦</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Uncompromising Quality
            </h3>
          </div>
          <p className="text-white/90 text-[15.5px] leading-relaxed">
            Every piece is crafted with exceptional attention to detail, using
            ethically sourced materials and refined techniques to ensure lasting
            brilliance and strength.
          </p>
        </div>

        {/* Bottom Right - Glassmorphic Card */}
        <div className="self-end max-w-[280px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-7 shadow-2xl text-right">
          <div className="flex items-center justify-end gap-3 mb-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Designed for a Lifetime
            </h3>
            <div className="w-8 h-8 rounded-2xl bg-golden/20 flex items-center justify-center">
              <span className="text-golden text-xl">∞</span>
            </div>
          </div>
          <p className="text-white/90 text-[15.5px] leading-relaxed">
            Our jewelry is made to be worn, cherished, and passed on — timeless
            designs that remain beautiful through every chapter of life.
          </p>
        </div>
      </div>

      {/* Trending Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-golden via-amber-400 to-yellow-300" />

      {/* Subtle floating particles / sparkle effect (CSS only) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[25%] left-[15%] w-1 h-1 bg-white rounded-full animate-pulse opacity-40" />
        <div className="absolute top-[45%] right-[20%] w-1.5 h-1.5 bg-golden rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-[35%] left-[25%] w-1 h-1 bg-white rounded-full animate-pulse delay-1000" />
      </div>
    </div>
  );
};

export default Quality;