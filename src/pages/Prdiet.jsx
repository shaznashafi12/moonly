import React from "react";
import { Link } from "react-router-dom";
import {
  FaAppleAlt,
  FaCarrot,
  FaSeedling,
  FaBan,
  FaLeaf,
  FaWalking
} from "react-icons/fa";
import exerciseImg from "../images/yoga.png";
import Nav2 from "./Nav2";
import Footer from "./Footer";
import fud from "../images/fud1.png";
import fudd from "../images/fudd1.png";

/* ── Animation keyframes injected once ── */
const AnimStyles = () => (
  <style>{`
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-8px); }
    }
    @keyframes softPulse {
      0%, 100% { transform: scale(1); }
      50%       { transform: scale(1.12); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes popIn {
      0%   { opacity: 0; transform: scale(0.85); }
      70%  { transform: scale(1.04); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes floatHeart {
      0%   { transform: translateY(0) scale(1);   opacity: .7; }
      50%  { transform: translateY(-14px) scale(1.2); opacity: 1; }
      100% { transform: translateY(0) scale(1);   opacity: .7; }
    }

    .anim-fadeUp   { animation: fadeUp   0.7s ease both; }
    .anim-float    { animation: float    3s ease-in-out infinite; }
    .anim-pulse-icon { animation: softPulse 2.2s ease-in-out infinite; }
    .anim-popIn    { animation: popIn    0.6s ease both; }
    .delay-100 { animation-delay: .10s; }
    .delay-200 { animation-delay: .20s; }
    .delay-300 { animation-delay: .30s; }
    .delay-400 { animation-delay: .40s; }
    .delay-500 { animation-delay: .50s; }

    .shimmer-text {
      background: linear-gradient(90deg,#c96b82,#a78bfa,#f9a8d4,#c96b82);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: shimmer 3s linear infinite;
    }

    .heart-float { animation: floatHeart 2.8s ease-in-out infinite; }
    .heart-float.d2 { animation-delay: .6s; }
    .heart-float.d3 { animation-delay: 1.2s; }
  `}</style>
);

/* ── Floating decorative hearts ── */

const Prdiet = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-pink-50 to-purple-100 relative">
      <AnimStyles />
      <Nav2 />

      {/* Header */}
      <div className="pt-28 pb-12 text-center px-4 relative">

        {/* Back Button */}
       <div className="absolute top-19 left-2 md:top-auto md:-mt-9 md:left-2">
  <Link
    to="/home2"
    className="flex items-center justify-center w-9 h-9 rounded-full bg-white shadow-md hover:shadow-lg transition group"
  >
    <span className="text-[#6b4b5a] text-base">←</span>
  </Link>
</div>

<h1 className="text-3xl mt-10 sm:text-4xl font-semibold text-gray-800 anim-fadeUp">
  Pregnancy Diet Guide
</h1>
        <p className="text-gray-500 mt-2 anim-fadeUp delay-200 text-sm sm:text-base">
          Nourish yourself and your baby with balanced meals
        </p>

        {/* Decorative emoji row */}
        
      </div>

      {/* Trimester Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4">
        <div className="anim-fadeUp delay-100">
          <TrimesterCard
            bg="bg-sky-100"
            icon={<FaAppleAlt />}
            title="First Trimester (0–12 weeks)"
            items={[
              "Folic acid-rich foods (spinach, oranges, lentils)",
              "Light meals to manage nausea",
              "Plenty of fluids and coconut water",
              "Whole grains and fresh fruits"
            ]}
          />
        </div>

        <div className="anim-fadeUp delay-200">
          <TrimesterCard
            bg="bg-rose-100"
            icon={<FaCarrot />}
            title="Second Trimester (13–27 weeks)"
            items={[
              "Protein-rich foods (eggs, legumes, dairy)",
              "Calcium sources (milk, curd, ragi)",
              "Iron-rich foods (dates, beetroot, greens)",
              "Healthy fats (nuts, seeds)"
            ]}
          />
        </div>

        <div className="anim-fadeUp delay-300">
          <TrimesterCard
            bg="bg-green-100"
            icon={<FaSeedling />}
            title="Third Trimester (28–40 weeks)"
            items={[
              "High-fiber foods to prevent constipation",
              "Small, frequent meals",
              "Omega-3 rich foods (walnuts, flax seeds)",
              "Limit salt and processed foods"
            ]}
          />
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-4xl mx-auto mt-10 space-y-6 px-4">

        <div className="anim-fadeUp delay-200">
          <WideCard
            icon={<FaBan />}
            title="Foods to Avoid During Pregnancy"
            bg="bg-sky-50"
            border="border-sky-200"
            image={fudd}
            items={[
              "Raw or undercooked meat and eggs",
              "Unpasteurized milk and cheese",
              "High-caffeine drinks",
              "Street & processed junk food",
              "Raw or semi-ripe papaya",
              "Alcohol and smoking"
            ]}
          />
        </div>

        <div className="anim-fadeUp delay-300">
          <WideCard
            icon={<FaLeaf />}
            title="High-Fiber Foods"
            bg="bg-rose-50"
            border="border-rose-200"
            image={fud}
            items={[
              "Oats, brown rice, whole wheat",
              "Fruits: apple, pear, berries",
              "Vegetables: broccoli, carrots, beans",
              "Seeds: flaxseed, chia seeds"
            ]}
          />
        </div>

        {/* Exercise Card */}
        <div className="anim-fadeUp delay-400 bg-green-50 border border-green-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaWalking className="text-green-500 text-xl anim-pulse-icon" />
              <h2 className="text-lg font-semibold text-gray-800">
                Safe Exercises for Pregnancy
              </h2>
            </div>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
              <li>Walking (20–30 minutes daily)</li>
              <li>Prenatal yoga and stretching</li>
              <li>Pelvic floor (Kegel) exercises</li>
              <li>Breathing & relaxation exercises</li>
            </ul>
          </div>

          <img
            src={exerciseImg}
            alt="Exercise"
            className="w-36 h-36 sm:w-40 sm:h-40 object-cover rounded-xl anim-float"
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto my-10 px-4 sm:px-6 anim-fadeUp delay-500">
        <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-2xl shadow-sm">
          <p className="font-medium text-sm sm:text-base">
            ⚠️ Note: This guide is for general information only. Please consult your doctor or a certified nutritionist for personalized diet instructions during pregnancy.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

/* Trimester Card */
const TrimesterCard = ({ icon, title, items, bg }) => (
  <div className={`${bg} rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 h-full`}>
    <div className="flex items-center gap-3 mb-3">
      <div className="p-3 bg-white rounded-full text-pink-500 anim-pulse-icon">
        {icon}
      </div>
      <h2 className="font-semibold text-gray-800 text-sm sm:text-base">{title}</h2>
    </div>
    <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

/* Wide Card */
const WideCard = ({ icon, title, items, bg, border, image }) => (
  <div
    className={`${bg} ${border} border rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow duration-300`}
  >
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 bg-white rounded-full text-pink-500 anim-pulse-icon">
          {icon}
        </div>
        <h2 className="font-semibold text-gray-800 text-sm sm:text-base">{title}</h2>
      </div>
      <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    {image && (
      <img
        src={image}
        alt={title}
        className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-2xl shrink-0 anim-float"
      />
    )}
  </div>
);

export default Prdiet;