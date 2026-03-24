const TopPicks = () => {
  return (
    <div className="relative h-[720px] overflow-hidden bg-black">
      {/* Background Image - Kept clean and prominent */}
      <div
        className="absolute inset-0 bg-[url('/src/assets/home-page/mercado-6.jpg')] bg-cover bg-center scale-[1.08] transition-transform duration-[14000ms]"
        aria-hidden="true"
      />

      {/* Soft gradient overlays for better text contrast without hiding the image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/30" />

      <div className="relative z-10 h-full flex flex-col justify-between p-6">

        {/* Top Left Text - Clean & Elegant */}
        <div className="max-w-xs pt-8">
          <div className="inline-block mb-3 px-4 py-1 bg-white/10 backdrop-blur-md border border-white/30 rounded-full">
            <span className="text-golden text-xs font-medium tracking-[2px] uppercase">Handpicked</span>
          </div>

          <h3 className="text-3xl font-bold text-white leading-tight tracking-tight">
            Our Top Picks
          </h3>
          <p className="mt-4 text-white/90 text-[15.5px] leading-relaxed">
            Hand-selected pieces that define elegance and sophistication.
            Each design reflects our commitment to beauty, quality, and timeless style.
          </p>
        </div>

        {/* Bottom Right Text - Clean & Elegant */}
        <div className="self-end max-w-xs text-right pb-12">
          <h3 className="text-3xl font-bold text-white leading-tight tracking-tight">
            Signature Selections
          </h3>
          <p className="mt-4 text-white/90 text-[15.5px] leading-relaxed">
            Discover jewelry loved by our customers for its refined craftsmanship
            and enduring charm — pieces made to be treasured.
          </p>
        </div>
      </div>

      {/* Thin elegant golden accent at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-golden to-transparent" />
    </div>
  );
};

export default TopPicks;