const Extra = () => {
  return (
    <div className="relative h-[680px] overflow-hidden bg-black">
      {/* Background Image with subtle slow zoom */}
      <div
        className="absolute inset-0 bg-[url('/src/assets/home-page/mercado-5.jpg')] bg-cover bg-center scale-105 transition-transform duration-[12000ms]"
        aria-hidden="true"
      />

      {/* Rich Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />

      {/* Center Content - Modern Glassmorphic Card */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-lg w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 shadow-2xl text-center">

          {/* Decorative Accent */}
          <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-golden to-transparent" />

          <h2 className="text-4xl md:text-5xl font-bold text-mercadoPrimary leading-none tracking-tighter mb-6">
            Where Beauty<br />Meets Meaning
          </h2>

          <p className="text-white/70 text-[17px] leading-relaxed tracking-wide">
            Our jewelry is more than an accessory — it’s an expression of identity,
            emotion, and timeless elegance. Each piece is thoughtfully designed to
            celebrate life’s most precious moments with grace and sophistication.
          </p>

          {/* Subtle CTA */}
          <button className="mt-10 group inline-flex items-center gap-3 text-white text-sm font-medium tracking-widest uppercase">
            Discover the Story
            <span className="transition-transform group-hover:translate-x-1 text-lg">→</span>
          </button>
        </div>
      </div>

      {/* Bottom Golden Accent Line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-golden to-transparent" />
    </div>
  );
};

export default Extra;