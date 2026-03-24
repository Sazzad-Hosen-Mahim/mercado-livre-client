import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import img1 from "@/assets/hero/1.jpg"
import img2 from "@/assets/hero/2.jpg"
import img3 from "@/assets/hero/3.jpg"
import img4 from "@/assets/hero/4.jpg"

const backgroundImages = [
  img1,
  img2,
  img3,
  img4,
  // Add more images if you want (recommended 3–5 for best effect)
];

const Grab = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleGrabOrder = () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    navigate("/task");
  };

  return (
    <div className="relative h-[480px] w-full overflow-hidden bg-black">
      {/* Background Images with smooth cross-fade */}
      {backgroundImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          style={{
            backgroundImage: `url('${img}')`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Gradient Overlay - Clear top, dark bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

      {/* Content at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 flex flex-col items-center text-center z-10">
        <div className="max-w-sm w-full space-y-4">
          <h1 className="text-4xl leading-none font-extrabold text-white tracking-tighter drop-shadow-md">
            Do more with{" "}
            <span className="text-mercadoPrimary uppercase ">Mercado Livre</span>
          </h1>

          <p className="text-lg text-white/90 font-light drop-shadow-sm">
            Browse and purchase products in various styles and materials.
          </p>

          {/* Egg-shaped modern button */}
          <button
            onClick={handleGrabOrder}
            className="group relative cursor-pointer mx-auto mt-6 block w-44 h-28 overflow-hidden rounded-[50%] bg-white/10 backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/40"
            aria-label="Snatch Order"
          >
            {/* Mercado Logo */}
            <div
              className="absolute inset-0 bg-[url('/src/assets/mercado-logo-new1.png')] bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundSize: "78%" }}
              aria-hidden="true"
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/85 transition-all duration-300 group-hover:via-black/55" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {/* Text */}
            <span className="relative z-10 flex h-full flex-col items-center justify-center text-white font-extrabold text-[21px] tracking-wider drop-shadow-md">
              Nova Order
            </span>
          </button>

          <button>

          </button>
        </div>
      </div>

      {/* Optional: Small dots indicator at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentImageIndex
              ? "bg-white scale-125"
              : "bg-white/50 hover:bg-white/70"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Grab;