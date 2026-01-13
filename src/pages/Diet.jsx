import React from "react";
import Nav from "./Nav";

const Diet = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#f6eef2] via-[#f2e7ec] to-[#f9f4f6] text-[#3f3439] overflow-x-hidden">
<Nav/>
      {/* Hero */}
      <section className="relative px-6 pt-40 pb-36">
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-6xl font-semibold font-serif tracking-tight text-[#a55562] mb-10">
            Nourishment During Your Cycle
          </h1>

          <p className="text-lg text-[#81787c] -mt-6  max-w-3xl mx-auto leading-relaxed">
            Thoughtful nutrition can ease discomfort, support hormonal balance,
            and gently restore energy during menstruation.
          </p>
        </div>
      </section>

      {/* Recommended Foods */}
      <section className="py-32 px-6">
        <h2 className="text-3xl font-bold  text-center mb-20 text-[#a55562] tracking-wide">
          Recommended Foods
        </h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { title: "Iron Support", items: "Spinach, beetroot, lentils, dates" },
            { title: "Magnesium Balance", items: "Bananas, nuts, seeds, dark chocolate" },
            { title: "Omega-3 Fatty Acids", items: "Flax seeds, walnuts, chia seeds" },
            { title: "Warm Nourishment", items: "Soups, porridge, oatmeal" },
          ].map((card, i) => (
            <div
              key={i}
              className="
                relative bg-white/35 backdrop-blur-2xl
                rounded-[32px] px-9 py-11
                border border-white/60
                shadow-[0_30px_80px_rgba(120,46,74,0.18)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_40px_100px_rgba(120,46,74,0.26)]
              "
            >
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/45 via-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-[1px] rounded-[31px] border border-white/40 pointer-events-none" />

              <h3 className="relative text-lg font-medium text-[#6a243f] mb-4">
                {card.title}
              </h3>

              <p className="relative text-sm text-[#66575f] leading-relaxed">
                {card.items}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Foods to Avoid */}
      <section className="py-32 px-6 bg-white/30 backdrop-blur-xl">
        <h2 className="text-3xl font-bold  text-center mb-20 text-[#a55562] tracking-wide">
          Foods to Avoid
        </h2>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Excess Sugar & Salt",
              text: "Triggers bloating, fatigue, and water retention.",
            },
            {
              title: "Caffeine & Fizzy Drinks",
              text: "Can intensify cramps and disrupt sleep cycles.",
            },
            {
              title: "Ultra-Processed Foods",
              text: "Increase inflammation and digestive discomfort.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="
                relative bg-white/30 backdrop-blur-2xl
                rounded-[30px] px-9 py-11
                border border-white/60
                shadow-[0_28px_70px_rgba(120,46,74,0.18)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_36px_90px_rgba(120,46,74,0.24)]
              "
            >
              <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

              <h3 className="relative font-medium text-[#6a243f] mb-4">
                {item.title}
              </h3>
              <p className="relative text-sm text-[#66575f] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recipes to Reduce Period Cramps */}
      <section className="py-32 px-6">
        <h2 className="text-3xl font-bold  text-center mb-20 text-[#a55562] tracking-wide">
          Recipes to Ease Period Cramps
        </h2>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              title: "Ginger Turmeric Tea",
              text: "Reduces inflammation and relaxes uterine muscles.",
            },
            {
              title: "Spinach & Lentil Stew",
              text: "Rich in iron and magnesium to reduce fatigue and cramps.",
            },
            {
              title: "Banana Nut Smoothie",
              text: "Potassium and vitamin B6 help ease muscle tension.",
            },
            {
              title: "Oatmeal with Flax & Honey",
              text: "Supports hormone balance and improves digestion.",
            },
            {
              title: "Warm Vegetable Soup",
              text: "Soothes bloating and improves circulation.",
            },
            {
              title: "Dark Chocolate & Almond Bites",
              text: "Magnesium-rich comfort to calm cramps naturally.",
            },
          ].map((recipe, i) => (
            <div
              key={i}
              className="
                relative bg-white/35 backdrop-blur-2xl
                rounded-[32px] px-9 py-11
                border border-white/60
                shadow-[0_30px_80px_rgba(120,46,74,0.18)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_40px_100px_rgba(120,46,74,0.26)]
              "
            >
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/45 via-white/10 to-transparent pointer-events-none" />

              <h3 className="relative text-lg font-medium text-[#6a243f] mb-3">
                {recipe.title}
              </h3>

              <p className="relative text-sm text-[#66575f] leading-relaxed">
                {recipe.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Balanced Day */}
      <section className="py-32 px-6">
        <h2 className="text-3xl font-bold  text-center mb-20 text-[#a55562] tracking-wide">
          A Balanced Day
        </h2>

        <div className="max-w-4xl mx-auto grid gap-10">
          {[
            { time: "Morning", meal: "Warm oatmeal with seasonal fruit" },
            { time: "Midday", meal: "Lentil curry with steamed rice" },
            { time: "Afternoon", meal: "Banana, nuts, dark chocolate" },
            { time: "Evening", meal: "Vegetable soup with whole-grain toast" },
          ].map((item, i) => (
            <div
              key={i}
              className="
                relative bg-white/35 backdrop-blur-2xl
                rounded-[30px] px-9 py-8
                border border-white/60
                shadow-[0_26px_65px_rgba(120,46,74,0.18)]
                flex items-center justify-between
              "
            >
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[#8b5a6f] mb-2">
                  {item.time}
                </p>
                <p className="text-base text-[#3f3439]">
                  {item.meal}
                </p>
              </div>

              <span className="w-9 h-9 rounded-full bg-white/60 backdrop-blur-md text-[#7a2e4a] flex items-center justify-center text-sm font-medium border border-white/60">
                {i + 1}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Wellness */}
      <section className="py-36 px-6 text-center">
        <h2 className="text-3xl font-bold  text-center mb-20 text-[#a55562] tracking-wide">
          Gentle Wellness Notes
        </h2>

        <p className="max-w-2xl mx-auto mb-10 text-[#66575f] leading-relaxed">
          Light movement, restorative rest, and mindful nourishment allow
          the body to regulate naturally during this phase.
        </p>

        <p className="italic text-[#7a2e4a] text-lg">
          Your body responds best to patience, not pressure.
        </p>
      </section>

    </div>
  );
};

export default Diet;
