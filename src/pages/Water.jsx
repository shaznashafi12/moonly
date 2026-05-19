import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
import waterImg from "../images/www.png";
import Footer from "./Footer";
import { getWater, updateWater } from "../api/api.js";

const DAILY_GOAL = 2000;
const GLASS_SIZE = 250;
const MAX_GLASSES = 8;

const getToday = () => new Date().toISOString().split("T")[0];

const styles = `
  @keyframes slideWave {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .wave-svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200%;
    height: 100%;
  }
`;

const Water = () => {
  const [intake, setIntake] = useState(0);
  const [selectedMl, setSelectedMl] = useState(250);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const today = getToday();

  useEffect(() => {
    const fetchWater = async () => {
      try {
        const res = await getWater(userId, today);
        setIntake(res.data.intake);
      } catch (error) {
        console.error(error);
      }
    };
    if (userId) fetchWater();
  }, [userId]);

  const percentage = Math.min(Math.round((intake / DAILY_GOAL) * 100), 100);
  const glasses = Math.min(Math.floor(intake / GLASS_SIZE), MAX_GLASSES);

  const addWater = async () => {
    const newIntake = Math.min(intake + selectedMl, DAILY_GOAL);
    setIntake(newIntake);
    try {
      await updateWater(userId, today, newIntake);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#fdecef] via-[#fdf1f5] to-[#f9dfe8] text-[#3b2a35]">
      <style>{styles}</style>
      <Nav />

<div className="flex mt-10 justify-center items-start min-h-[calc(100vh-80px)] px-4 sm:px-6 pt-8 pb-10 md:pt-4">     <div className="relative w-full mt-4 mb-10 md:mt-16 md:mb-20 max-w-6xl bg-white/35 backdrop-blur-2xl rounded-[30px] md:rounded-[40px] px-5 sm:px-10 md:px-24 py-8 md:py-20 shadow-[0_40px_90px_rgba(255,182,193,0.45)]">

          {/* Back Button */}
{/* Back Button — desktop only absolute */}
<button
  onClick={() => navigate("/home")}
  className="hidden md:flex absolute top-6 left-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md shadow-md items-center justify-center hover:scale-105 transition text-[#3b2a35]"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
</button>

{/* Header */}
<header className="mb-6 md:mb-16 md:mt-0">

  {/* Mobile: arrow + title in same row */}
  <div className="flex items-center gap-3 md:hidden">
    <button
      onClick={() => navigate("/home")}
      className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center hover:scale-105 transition text-[#3b2a35] flex-shrink-0"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <div>
      <h1 className="text-xl font-semibold leading-tight">
        Water Intake During Periods
      </h1>
      <p className="text-xs text-[#7a5f6a] mt-1">
        Hydration helps ease bloating and keeps your energy steady today
      </p>
    </div>
  </div>

  {/* Desktop: centered title */}
  <div className="hidden md:block text-center">
    <h1 className="text-[40px] font-semibold leading-tight">
      Water Intake During Periods
    </h1>
    <p className="text-sm text-[#7a5f6a] mt-3 max-w-md mx-auto">
      Hydration helps ease bloating and keeps your energy steady today
    </p>
  </div>

</header>          {/* Illustration — visible on mobile at top, hidden on md+ (shown in row) */}
          <div className="flex justify-center mb-6 md:hidden">
            <img
              src={waterImg}
              alt="hydration"
              className="w-[180px] h-[190px] object-contain"
            />
          </div>

          {/* Main visual row */}
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-center md:gap-28">

            {/* Circular progress */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/30 backdrop-blur-2xl border border-white/60 shadow-[0_30px_70px_rgba(255,182,193,0.5)] overflow-hidden flex items-center justify-center flex-shrink-0">
              <div
                className="absolute inset-x-0 bottom-0 transition-all duration-700"
                style={{ height: `${percentage}%` }}
              >
                <svg
                  className="wave-svg"
                  style={{ animation: "slideWave 2s linear infinite" }}
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,15 C25,5 50,25 75,15 C100,5 125,25 150,15 C175,5 200,25 200,15 L200,100 L0,100 Z" fill="#f472b6" opacity="0.9" />
                </svg>
                <svg
                  className="wave-svg"
                  style={{ animation: "slideWave 3s linear infinite reverse", opacity: 0.6 }}
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,20 C25,8 50,30 75,20 C100,8 125,30 150,20 C175,8 200,30 200,20 L200,100 L0,100 Z" fill="#fbcfe8" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-[#df6a81]/60 to-transparent" />
              </div>
              <div className="relative z-10 text-center">
                <p className="text-2xl sm:text-3xl font-semibold">{percentage}%</p>
                <p className="text-xs text-[#6b4f5a] mt-1">hydrated</p>
              </div>
            </div>

            {/* Bottle */}
            <div className="relative w-[150px] h-[260px] sm:w-[190px] sm:h-[330px] md:w-[220px] md:h-[380px] rounded-[110px] bg-white/25 backdrop-blur-2xl border border-white/60 shadow-[0_25px_60px_rgba(255,182,193,0.5)] overflow-hidden flex-shrink-0">
              <div
                className="absolute bottom-0 w-full transition-all duration-700"
                style={{ height: `${percentage}%` }}
              >
                <svg
                  className="wave-svg"
                  style={{ animation: "slideWave 2.2s linear infinite" }}
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,15 C25,5 50,25 75,15 C100,5 125,25 150,15 C175,5 200,25 200,15 L200,100 L0,100 Z" fill="#df6a81" opacity="0.95" />
                </svg>
                <svg
                  className="wave-svg"
                  style={{ animation: "slideWave 3.2s linear infinite reverse", opacity: 0.6 }}
                  viewBox="0 0 200 100"
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0,20 C25,8 50,30 75,20 C100,8 125,30 150,20 C175,8 200,30 200,20 L200,100 L0,100 Z" fill="#fde2f0" />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-t from-[#df6a81]/60 to-transparent" />
              </div>
              <div className="absolute top-8 w-full text-center z-10">
                <p className="text-sm text-[#6b4f5a]">Today's Intake</p>
                <p className="text-lg font-semibold">{intake} ml</p>
              </div>
              <div className="absolute bottom-10 w-full text-center z-10">
                <p className="text-xl font-semibold text-white">{glasses} / {MAX_GLASSES}</p>
                <p className="text-xs text-white/80">Glasses</p>
              </div>
            </div>

            {/* Illustration — desktop only */}
            <img
              src={waterImg}
              alt="hydration"
              className="hidden md:block w-[330px] h-[360px] md:-mr-20 object-contain flex-shrink-0"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col items-center mt-8 md:mt-20 gap-5 md:gap-0">
            <button
              onClick={addWater}
              className="px-10 sm:px-16 py-4 md:-ml-20 md:-mt-10 rounded-full bg-gradient-to-r from-[#e599a2] to-[#e58a95] text-white font-medium shadow-[0_12px_30px_rgba(244,114,182,0.45)] flex items-center gap-2 hover:scale-105 transition"
            >
              Add Glass <FiPlus />
            </button>

            <div className="flex gap-3 sm:gap-5 mt-2 md:mt-6 md:-ml-20">
              {[100, 250, 500].map((ml) => (
                <button
                  key={ml}
                  onClick={() => setSelectedMl(ml)}
                  className={`px-5 sm:px-7 py-2.5 sm:py-3 rounded-full backdrop-blur-xl shadow-md transition hover:scale-105 text-sm sm:text-base ${
                    selectedMl === ml ? "bg-[#e58a95] text-white" : "bg-white/70"
                  }`}
                >
                  {ml} ml
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Water;