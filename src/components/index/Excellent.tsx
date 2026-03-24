import { Star } from "lucide-react";

const Excellent = () => {
  return (
    <div className="relative h-[620px] overflow-hidden bg-black">
      {/* Background Image with subtle movement */}
      <div
        className="absolute inset-0 bg-[url('/src/assets/home-page/mercado-4.jpg')] bg-cover bg-center scale-105 transition-transform duration-[10000ms]"
        aria-hidden="true"
      />

      {/* Sophisticated Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Center Testimonial Card - Glassmorphic & Modern */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          {/* Quote Icon */}
          <div className="flex justify-center mb-6">
            <div className="text-6xl text-golden/80 leading-none">“</div>
          </div>

          {/* Rating Stars */}
          <div className="flex justify-center gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={28}
                fill="#facc15"
                strokeWidth={0}
                className="drop-shadow-sm"
              />
            ))}
          </div>

          {/* Testimonial Text */}
          <p className="text-white/95 text-[17px] leading-relaxed text-center font-light tracking-wide">
            Absolutely stunning craftsmanship and exceptional quality. The jewelry
            exceeded my expectations and feels truly luxurious. A brand I trust and
            recommend with confidence.
          </p>

          {/* Author / Trust Signal */}
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-col items-center">
            <div className="text-white font-semibold">— Sarah Chen</div>
            <div className="text-white/60 text-sm mt-1">Verified Customer • Verified Purchase</div>

            {/* Small Trust Badges */}
            <div className="flex gap-4 mt-5 opacity-75">
              <div className="text-xs uppercase tracking-widest text-white/70">5-Star Rated</div>
              <div className="h-3 w-px bg-white/30" />
              <div className="text-xs uppercase tracking-widest text-white/70">Premium Quality</div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-golden via-amber-400 to-transparent" />
    </div>
  );
};

export default Excellent;