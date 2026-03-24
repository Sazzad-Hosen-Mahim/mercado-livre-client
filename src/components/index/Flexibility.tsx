const Flexibility = () => {
  return (
    <div className="relative h-[680px] overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-[url('/src/assets/home-page/mercado-1.jpg')] bg-cover bg-center"
        aria-hidden="true"
      />

      {/* Sophisticated Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full items-center justify-end pb-16 px-6 text-center">
        <div className="max-w-md space-y-6">
          {/* Badge / Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-1.5 rounded-full">
            <span className="text-golden text-sm font-medium tracking-widest">PREMIUM COLLECTION</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl leading-[1.1] font-bold text-mercadoPrimary tracking-tighter drop-shadow-xl">
            Crafted to Shine,<br />Designed to Last
          </h2>

          {/* Description */}
          <p className="text-white/90 text-[17px] leading-relaxed max-w-sm mx-auto">
            Each piece of our jewelry is a celebration of elegance, precision,
            and timeless beauty. Designed to reflect your unique story and style.
          </p>

          {/* Modern CTA Button */}
          <button
            className="mt-8 group relative inline-flex items-center justify-center px-10 py-4 bg-white text-black font-semibold text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Collection
              <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </span>

            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </div>
      </div>

      {/* Subtle bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default Flexibility;