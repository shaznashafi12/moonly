import React from "react";
import {
  FaAppleAlt,
  FaCarrot,
  FaSeedling,
  FaBan,
  FaLeaf,
  FaWalking
} from "react-icons/fa";
import exerciseImg from "../images/yoga.png";
// import pregnancyImg from "../images/yoga.png"; // circular image
import Nav2 from "./Nav2";
import Footer from "./Footer";
import fud from "../images/fud1.png"
import fudd from "../images/fudd1.png"

const Prdiet = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-pink-50 to-purple-100">
      <Nav2 />

      {/* Header */}
      <div className="pt-28 pb-12 text-center px-4">
        <h1 className="text-4xl font-semibold text-gray-800">
          Pregnancy Diet Guide
        </h1>
        <p className="text-gray-500 mt-2">
          Nourish yourself and your baby with balanced meals
        </p>
      </div>

      {/* Trimester Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
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

      {/* Info Section */}
      <div className="max-w-4xl mx-auto mt-10 space-y-6 px-4">
        <WideCard
          icon={<FaBan />}
          title="Foods to Avoid During Pregnancy"
          bg="bg-sky-50"
          border="border-sky-200"
            image={fudd}   // ✅ image added

         items={[
  "Raw or undercooked meat and eggs",
  "Unpasteurized milk and cheese",
  "High-caffeine drinks",
  "Street & processed junk food",
  "Raw or semi-ripe papaya",
  "Alcohol and smoking"
]}

        />

        <WideCard
          icon={<FaLeaf />}
          title="High-Fiber Foods"
          bg="bg-rose-50"
          border="border-rose-200"
            image={fud}   // ✅ image added

          items={[
            "Oats, brown rice, whole wheat",
            "Fruits: apple, pear, berries",
            "Vegetables: broccoli, carrots, beans",
            "Seeds: flaxseed, chia seeds"
          ]}
        />

        {/* Exercise Card */}
        <div className="bg-green-50 border border-green-200 rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <FaWalking className="text-green-500 text-xl" />
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
            className="w-40 h-40 object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Side Image */}
      {/* <div className="flex justify-center mt-12">
        <img
          src={pregnancyImg}
          alt="Pregnancy"
          className="w-52 h-52 rounded-full object-cover shadow-md"
        />
      </div> */}
<div className="max-w-4xl mx-auto my-10 px-6">
  <div className="bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-2xl shadow-sm">
    <p className="font-medium">
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
  <div className={`${bg} rounded-3xl p-6 shadow-sm`}>
    <div className="flex items-center gap-3 mb-3">
      <div className="p-3 bg-white rounded-full text-pink-500">
        {icon}
      </div>
      <h2 className="font-semibold text-gray-800">{title}</h2>
    </div>
    <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}
        </li>
        
      ))}
    </ul>
    
  </div>
);

/* Wide Card */
const WideCard = ({ icon, title, items, bg, border, image }) => (
  <div
    className={`${bg} ${border} border rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 `}
  >
    {/* Left Content */}
    <div className="flex-1">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-3 bg-white rounded-full text-pink-500 m">
          {icon}
        </div>
        <h2 className="font-semibold text-gray-800">{title}</h2>
      </div>

      <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Right Image */}
    {image && (
      <img
        src={image}
        alt={title}
        className="w-36 h-36 object-cover rounded-2xl shrink-0"
      />
    )}
    
  </div>
);


export default Prdiet;
