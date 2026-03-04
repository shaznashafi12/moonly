import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import Nav from "./Nav";
import waterImg from "../images/www.png";
import Footer from "./Footer";

const DAILY_GOAL = 2000;
const GLASS_SIZE = 250;
const MAX_GLASSES = 8;

const getToday = () => new Date().toISOString().split("T")[0];

const Water = () => {
  const [intake, setIntake] = useState(0);
  const [selectedMl, setSelectedMl] = useState(250);

  /* 🔁 LOAD FROM LOCAL STORAGE (DAILY RESET LOGIC) */
  useEffect(() => {
    const savedIntake = Number(localStorage.getItem("water_intake")) || 0;
    const savedDate = localStorage.getItem("water_date");
    const today = getToday();

    if (savedDate === today) {
      setIntake(savedIntake);
    } else {
      setIntake(0);
      localStorage.setItem("water_date", today);
      localStorage.setItem("water_intake", "0");
    }
  }, []);

  /* 💾 SAVE ON CHANGE */
  useEffect(() => {
    localStorage.setItem("water_intake", intake.toString());
    localStorage.setItem("water_date", getToday());
  }, [intake]);

  const percentage = Math.min(
    Math.round((intake / DAILY_GOAL) * 100),
    100
  );

  const glasses = Math.min(
    Math.floor(intake / GLASS_SIZE),
    MAX_GLASSES
  );

  const addWater = () => {
    setIntake((prev) => Math.min(prev + selectedMl, DAILY_GOAL));
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#fdecef] via-[#fdf1f5] to-[#f9dfe8] text-[#3b2a35]">
      <Nav />

      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] px-6">
        <div className="relative w-full mt-20 mb-20 max-w-6xl bg-white/35 backdrop-blur-2xl rounded-[40px] px-24 py-20 shadow-[0_40px_90px_rgba(255,182,193,0.45)]">

          {/* HEADER */}
          <header className="text-center mb-20">
            <h1 className="text-[40px] -mt-10 font-semibold">
              Water Intake During Periods
            </h1>
            <p className="text-sm text-[#7a5f6a] mt-3 max-w-md mx-auto">
              Hydration helps ease bloating and keeps your energy steady today
            </p>
          </header>

          {/* MAIN ROW */}
          <div className="flex items-center justify-center gap-28">

            {/* LEFT CIRCLE */}
            <div className="relative w-44 h-44 rounded-full bg-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_30px_70px_rgba(255,182,193,0.5)] overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-x-0 bottom-0 transition-all duration-700"
                style={{ height: `${percentage}%` }}
              >
                <div className="absolute bottom-0 left-0 w-[200%] h-full bg-gradient-to-t from-[#f472b6] to-[#fbcfe8] rounded-b-full animate-wave1 opacity-90" />
                <div className="absolute bottom-0 left-0 w-[200%] h-full bg-gradient-to-t from-[#fde2f0] to-[#fdd6e8] rounded-b-full animate-wave2 opacity-70" />
              </div>

              <div className="relative z-10 text-center">
                <p className="text-3xl font-semibold">{percentage}%</p>
                <p className="text-xs text-[#6b4f5a] mt-1">hydrated</p>
              </div>
            </div>

            {/* CENTER BOTTLE */}
            <div className="relative w-[220px] h-[380px] rounded-[110px] bg-white/25 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_rgba(255,182,193,0.5)] overflow-hidden">
              <div
                className="absolute bottom-0 w-full transition-all duration-700"
                style={{ height: `${percentage}%` }}
              >
                <div className="absolute bottom-0 left-0 w-[200%] h-full bg-gradient-to-t from-[#df6a81] to-[#e699a2] rounded-b-[110px] animate-wave1" />
                <div className="absolute bottom-0 w-[200%] h-full bg-gradient-to-t from-[#fde2f0] to-[#fdd6e8] rounded-b-[110px] animate-wave2 opacity-70" />
              </div>

              <div className="absolute top-10 w-full text-center">
                <p className="text-sm text-[#6b4f5a]">Today’s Intake</p>
                <p className="text-lg font-semibold">{intake} ml</p>
              </div>

              <div className="absolute bottom-12 w-full text-center">
                <p className="text-xl font-semibold text-white">
                  {glasses} / {MAX_GLASSES}
                </p>
                <p className="text-xs text-white/80">Glasses</p>
              </div>
            </div>

            <img
              src={waterImg}
              alt="hydration"
              className="w-[330px] h-[360px] -mr-20"
            />
          </div>

          {/* ADD GLASS */}
          <div className="flex flex-col items-center mt-20">
            <button
              onClick={addWater}
              className="px-16 -ml-20 py-4 -mt-10 rounded-full bg-gradient-to-r from-[#e599a2] to-[#e58a95] text-white font-medium shadow-[0_12px_30px_rgba(244,114,182,0.45)] flex items-center gap-2 hover:scale-105 transition"
            >
              Add Glass <FiPlus />
            </button>

            <div className="flex gap-5 mt-6 -ml-20">
              {[100, 250, 500].map((ml) => (
                <button
                  key={ml}
                  onClick={() => setSelectedMl(ml)}
                  className={`px-7 py-3 rounded-full backdrop-blur-xl shadow-md transition hover:scale-105 ${
                    selectedMl === ml
                      ? "bg-pink-300 text-white"
                      : "bg-white/70"
                  }`}
                >
                  {ml} ml
                </button>
              ))}
            </div>
          </div>

          {/* BENEFITS */}
          <div className="grid grid-cols-3 gap-8 mt-20">
            {[
              ["Cramp Relief", "Warm water can help relax muscles."],
              ["Anti-Bloat", "Prevents the body from retaining water."],
              ["Skin Glow", "Maintain your natural radiance."]
            ].map(([title, desc]) => (
              <div
                key={title}
                className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 text-center shadow-md"
              >
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-[#6b4f5a]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* WATER WAVES */}
      <style>{`
        @keyframes wave1 {
          0% { transform: translateX(0); }
          50% { transform: translateX(-25%) translateY(-6px); }
          100% { transform: translateX(-50%); }
        }

        @keyframes wave2 {
          0% { transform: translateX(0); }
          50% { transform: translateX(-20%) translateY(-3px); }
          100% { transform: translateX(-50%); }
        }

        .animate-wave1 {
          animation: wave1 6s ease-in-out infinite;
        }

        .animate-wave2 {
          animation: wave2 9s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Water;
