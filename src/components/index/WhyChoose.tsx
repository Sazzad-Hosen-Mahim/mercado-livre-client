const WhyChoose = () => {
  const stats = [
    {
      number: "50K+",
      label: "Happy Customers",
    },
    {
      number: "10K+",
      label: "Products Delivered",
    },
    {
      number: "4.9",
      label: "Average Rating",
    },
    {
      number: "24/7",
      label: "Customer Support",
    },
  ];

  return (
    <div className="bg-black py-12 px-6">
      <div className="max-w-md mx-auto">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-white font-bold text-3xl tracking-tight">
            Why Choose{" "}
            <span className="text-golden">Mercado Livre</span>?
          </h2>
          <p className="text-white/70 mt-3 text-lg">
            Trusted by thousands across the country
          </p>
        </div>

        {/* Stats Grid - Perfect for mobile */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-zinc-900/70 border border-white/10 rounded-2xl p-6 text-center transition-all hover:border-golden/30 hover:scale-105 active:scale-95"
            >
              <div className="text-4xl font-extrabold text-mercadoPrimary mb-2 tracking-tighter">
                {stat.number}
              </div>
              <div className="text-white/80 text-base font-medium leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Optional subtle divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-12" />
      </div>
    </div>
  );
};

export default WhyChoose;