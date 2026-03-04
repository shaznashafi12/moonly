// PregnancyTracker.jsx
import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaHeartbeat, FaMoon, FaSpa, FaHeart, FaBrain } from "react-icons/fa";
import babyBanner from "../images/bbb.png";
import trimester1Img from "../images/firsttri.png";
import trimester2Img from "../images/scndtri.png";
import trimester3Img from "../images/thirdtri.png";
import Nav2 from "./Nav2";
import Footer from "./Footer";
import imgg from "../images/bb1.png";
import { createPregnancy, getLatestPregnancy } from "../api/api.js";

const PregnancyTracker = () => {
  const [lmp, setLmp] = useState("");
  const [week, setWeek] = useState("Week 0 of 40");
  const [weekNumber, setWeekNumber] = useState(0);
  const [trimester, setTrimester] = useState("First Trimester");
  const [dueMonth, setDueMonth] = useState("");
  const [developmentImage, setDevelopmentImage] = useState(babyBanner);
  const [babySizeText, setBabySizeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatest = async () => {
      
      try {
        const res = await getLatestPregnancy();
        const data = res.data?.data;
        console.log("Week from DB after refresh:", data.weekNumber);

        if (!data) return;

        setLmp(data.lmp?.split("T")[0]);
        setWeek(data.week);
        setWeekNumber(data.weekNumber);
        setTrimester(data.trimester);
        setDueMonth(data.dueMonth);
        setBabySizeText(data.babySizeText);

// Use REAL weekNumber from DB
if (calculatedWeek > 40) {
  setDevelopmentImage(babyBanner);
}
else if (currentWeek <= 13) {
  setDevelopmentImage(trimester1Img);
}
else if (currentWeek <= 27) {
  setDevelopmentImage(trimester2Img);
}
else {
  setDevelopmentImage(trimester3Img);
}


      } catch (err) {
        console.log("No previous pregnancy found");
      }
    };

    fetchLatest();
  }, []);

  const handleCheck = async () => {
    if (!lmp) return;

    const lmpDate = new Date(lmp);
    const today = new Date();
    const diffInDays = (today - lmpDate) / (1000 * 60 * 60 * 24);

    if (diffInDays < 0) return;

    // ✅ REMOVED 40 WEEK LIMIT

// Lock at 40 weeks
let calculatedWeek = Math.floor(diffInDays / 7) + 1;

// Lock visible week at 40
const currentWeek = calculatedWeek > 40 ? 40 : calculatedWeek;

// Check if overdue (41+)
const isOverdue = calculatedWeek > 40;

// Week text
const weekText = `Week ${currentWeek} of 40`;

// Trimester logic
const trimesterText =
  currentWeek <= 13
    ? "First Trimester"
    : currentWeek <= 27
    ? "Second Trimester"
    : "Third Trimester";

const dueDate = new Date(lmpDate);
dueDate.setDate(dueDate.getDate() + 280);
const options = { month: "long", year: "numeric" };
const dueMonthText = dueDate.toLocaleDateString(undefined, options);

let sizeText = "";

if (isOverdue) {
  sizeText =
"The world is about to meet someone very special 🌍👣💫"}
else if (currentWeek <= 8)
  sizeText = "Your baby is about the size of a raspberry 🍇";
else if (currentWeek <= 12)
  sizeText = "Your baby is about the size of a lime 🍋";
else if (currentWeek <= 16)
  sizeText = "Your baby is about the size of an avocado 🥑";
else if (currentWeek <= 20)
  sizeText = "Your baby is about the size of a banana 🍌";
else if (currentWeek <= 24)
  sizeText = "Your baby is about the size of corn 🌽";
else if (currentWeek <= 28)
  sizeText = "Your baby is about the size of an eggplant 🍆";
else if (currentWeek <= 32)
  sizeText = "Your baby is about the size of a pineapple 🍍";
else if (currentWeek <= 36)
  sizeText = "Your baby is about the size of a papaya 🥭";
else
  sizeText = "Your baby is about the size of a watermelon 🍉";

setWeekNumber(currentWeek);
setWeek(weekText);
setTrimester(trimesterText);
setDueMonth(dueMonthText);
setBabySizeText(sizeText);

// Image logic
// Image logic (USE calculatedWeek, NOT data)
// Image logic (use calculated values only)
// Image logic based ONLY on stored weekNumber
if (!data.weekNumber || data.weekNumber === 0) {
  setDevelopmentImage(babyBanner);
}
else if (data.weekNumber > 40) {
  setDevelopmentImage(babyBanner);
}
else if (data.weekNumber <= 13) {
  setDevelopmentImage(trimester1Img);
}
else if (data.weekNumber <= 27) {
  setDevelopmentImage(trimester2Img);
}
else {
  setDevelopmentImage(trimester3Img);
}    try {
      setLoading(true);
      setError("");

await createPregnancy({
  lmp,
  week: weekText,
  weekNumber: calculatedWeek,  // ✅ keep this
  trimester: trimesterText,
  dueMonth: dueMonthText,
  babySizeText: sizeText,
});

    } catch (err) {
      setError(err?.message || "Failed to save pregnancy data");
    } finally {
      setLoading(false);
    }
  };

  let careTips = { rest: "", comfort: "", health: "", emotional: "" };

  if (trimester === "First Trimester") {
    careTips = {
      rest: "Get plenty of rest as your body adjusts to hormonal changes.",
      comfort: "Eat small frequent meals to manage nausea and stay hydrated.",
      health: "Start prenatal vitamins and schedule your first doctor visit.",
      emotional: "Mood swings are normal. Talk openly and seek support when needed."
    };
  } else if (trimester === "Second Trimester") {
    careTips = {
      rest: "Maintain a consistent sleep routine and support your growing belly.",
      comfort: "Wear comfortable clothing and practice light stretching.",
      health: "Keep up with prenatal appointments and monitor baby movements.",
      emotional: "Enjoy the energy boost and connect with your baby through bonding."
    };
  } else {
    careTips = {
      rest: "Sleep on your side with pillows for support. Nap when possible.",
      comfort: "Stay hydrated to reduce swelling. Warm baths can ease back pain.",
      health: "Prepare your hospital bag. Know the early signs of labor.",
      emotional: "It’s normal to feel anxious. Practice breathing exercises and stay positive."
    };
  }
    return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Nav2 />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto mt-24 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#dd727f] leading-tight text-center">
          A Tiny Heartbeat, A Growing Miracle,
          <span className="block text-lg text-[#e67885] md:text-xl font-light mt-1">
            And A Journey You’ll Cherish Forever.
          </span>
        </h1>
      </div>

      {/* Baby Overview Card */}
      <div className="max-w-6xl mx-auto mt-14 px-4">
        <div className="relative bg-white/40 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-12 flex flex-col items-center text-center">
          <div className="absolute -top-12 w-44 h-44 bg-pink-300/30 blur-3xl rounded-full"></div>

          <img src={imgg} className="w-[200px] h-[200px]" alt="baby" />

          <h2 className="text-4xl font-bold text-[#9B7E8D]">
            {week}
          </h2>

          <p className="text-lg text-gray-600 mt-2">
            {trimester}
          </p>

          <p className="mt-4 text-sm text-gray-600 max-w-md">
            {weekNumber === 0
              ? "Every beautiful journey begins with a single heartbeat waiting to happen 💕"
              : "Your baby is growing stronger every day. This phase brings gentle movements, connection, and reassurance."}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-20 px-4 mt-24">

        {/* Pregnancy Overview */}
        <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-semibold text-[#9B7E8D] mb-6">
            Pregnancy Overview
          </h2>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input
              type="date"
              value={lmp}
              onChange={(e) => setLmp(e.target.value)}
              className="flex-1 px-5 py-3 rounded-xl bg-white/70 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              onClick={handleCheck}
              className="px-8 py-3 rounded-xl bg-[#e58a95] text-white font-medium shadow-md hover:bg-[#ad626a] transition"
            >
              Check
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Pregnancy Week</p>
              <div className="bg-white/60 rounded-xl px-5 py-3 font-medium text-gray-800 shadow-sm">
                {week}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Current Trimester</p>
              <div className="bg-white/60 rounded-xl px-5 py-3 font-medium text-gray-800 shadow-sm">
                {trimester}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Estimated Due Month</p>
              <div className="bg-white/60 rounded-xl px-5 py-3 font-medium text-gray-800 shadow-sm">
                {dueMonth || "-"}
              </div>
            </div>
          </div>
        </div>

        {/* Baby Development */}
        <section>
          <h2 className="text-xl font-semibold text-[#9B7E8D] mb-6">
            Baby Development
          </h2>

          <div className="bg-white/35 backdrop-blur-lg rounded-3xl shadow-xl p-8 mb-10">
            <img
              src={developmentImage}
              alt="Baby development illustration"
              className="w-full max-h-[300px] object-contain mx-auto transition-all duration-500"
            />
{babySizeText && (
  <p className="text-center mt-6 text-lg font-bold text-[#c05a6d] tracking-wide leading-relaxed">
    {babySizeText}
  </p>
)}

          </div>

          <div className="flex gap-6 overflow-x-auto pb-3">
            {[16,17,18,19].map((w) => {
              let text = "";
              if(w===16) text="Baby starts moving more actively";
              else if(w===17) text="Fat layers begin forming";
              else if(w===18) text="Baby can hear sounds";
              else text="Skin develops protective coating";

              return (
                <div
                  key={w}
                  className={`min-w-[260px] rounded-2xl p-6 shadow-lg backdrop-blur-md transition hover:scale-[1.03]
                  ${weekNumber === w ? "bg-pink-200/40 ring-2 ring-pink-300" : "bg-white/35"}`}
                >
                  <h3 className="font-semibold text-[#9B7E8D] mb-2">
                    Week {w}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Care Tips */}
        <section>
          <div className="bg-white/35 backdrop-blur-lg rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-semibold text-[#6b4b5a] mb-1">
              Care Tips for This Trimester
            </h2>
            <p className="text-sm text-gray-500 mb-8">
              {trimester || "Third Trimester"} (Weeks 28–40)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="bg-white/60 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                    <FaMoon className="text-pink-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Rest</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
{careTips.rest}
                </p>
              </div>

              <div className="bg-white/60 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                    <FaSpa className="text-rose-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Comfort</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
{careTips.comfort}
                </p>
              </div>

              <div className="bg-white/60 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                    <FaHeart className="text-pink-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Health</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
{careTips.health}
                </p>
              </div>

              <div className="bg-white/60 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <FaBrain className="text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Emotional</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
{careTips.emotional }
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* Upcoming Appointments */}
        <section>
          <h2 className="text-xl font-semibold text-[#9B7E8D] mb-6">
            Upcoming Appointments
          </h2>

          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="relative bg-gradient-to-br from-pink-100/70 to-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-pink-200/70 flex items-center justify-center shadow-md">
                <FaCalendarAlt className="text-pink-500 text-3xl" />
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Doctor Checkup
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Routine prenatal consultation
                </p>
                <p className="mt-3 text-sm font-medium text-pink-600">
                  25 February 2025
                </p>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-purple-100/70 to-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-purple-200/70 flex items-center justify-center shadow-md">
                <FaHeartbeat className="text-purple-500 text-3xl" />
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-800">
                  Ultrasound Scan
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Baby growth & heartbeat check
                </p>
                <p className="mt-3 text-sm font-medium text-purple-600">
                  05 March 2025
                </p>
              </div>
            </div>

          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
};

export default PregnancyTracker;
