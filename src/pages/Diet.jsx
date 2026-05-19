import React from "react";
import Nav from "./Nav";
import { Link } from "react-router-dom";

const Diet = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#f6eef2] via-[#f2e7ec] to-[#f9f4f6] text-[#3f3439] overflow-x-hidden px-2 sm:px-0">

      <Nav />

     <Link
  to="/home"
  className="fixed top-16 md:top-20 left-4 z-50 w-10 h-10 flex items-center justify-center
             rounded-full bg-white/70 backdrop-blur-md
             shadow-md text-black text-lg
             hover:scale-105 transition"
>
  ←
</Link>
      {/* Hero */}
      <section className="relative px-4 sm:px-6 pt-28 md:pt-40 pb-12 md:pb-32">
        <div className="max-w-5xl mx-auto text-center relative">
          <h1 className="text-2xl mt-12 md:mt-24 sm:text-4xl md:text-6xl leading-tight font-semibold font-serif tracking-tight text-[#a55562] mb-6 md:mb-10">
            Nourishment During   <span className="block md:inline">Your Cycle</span>

          </h1>
          <p className="text-sm sm:text-base md:text-lg px-2 text-[#81787c] md:-mt-6 max-w-3xl mx-auto leading-relaxed">
            Thoughtful nutrition can ease discomfort, support hormonal balance, and gently restore energy during menstruation.
It becomes a quiet form of self-care, where every nourishing choice helps the body feel heard, supported, and stronger from within.
          </p>
        </div>
      </section>

      {/* Recommended Foods */}
      <section className="py-12 md:py-28 px-4 mt-8 md:mt-24 sm:px-6">
        <h2 className="text-2xl mt-10 md:text-3xl font-bold text-center mb-10 md:mb-20 text-[#a55562] tracking-wide">
          Recommended Foods
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10">
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
                rounded-2xl md:rounded-[32px] px-5 py-6 sm:px-6 sm:py-7 md:px-9 md:py-11
                border border-white/60
                shadow-[0_30px_80px_rgba(120,46,74,0.18)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_40px_100px_rgba(120,46,74,0.26)]
              "
            >
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-white/45 via-white/10 to-transparent pointer-events-none" />
              <div className="absolute inset-[1px] rounded-[31px] border border-white/40 pointer-events-none" />
              <h3 className="relative text-base md:text-lg font-medium text-[#6a243f] mb-4">
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
      <section className="py-16 md:py-32 px-4 sm:px-6 bg-white/30 backdrop-blur-xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-20 text-[#a55562] tracking-wide">
          Foods to Avoid
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
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
                rounded-[30px] px-6 py-8 md:px-9 md:py-11
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
              <p className="relative text-xs sm:text-sm text-[#66575f] leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Recipes */}
      <section className="py-16 md:py-32 px-4 sm:px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-20 text-[#a55562] tracking-wide">
          Recipes to Ease Period Cramps
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
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
              className="relative bg-white/35 backdrop-blur-2xl rounded-[32px] px-6 py-8 md:px-9 md:py-11 border border-white/60 shadow-[0_30px_80px_rgba(120,46,74,0.18)]"
            >
              <h3 className="text-lg font-medium text-[#6a243f] mb-3">{recipe.title}</h3>
              <p className="text-sm text-[#66575f]">{recipe.text}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Diet;