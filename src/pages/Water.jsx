import React from "react";
import { FiDroplet, FiPlus, FiClock } from "react-icons/fi";
import Nav from "./Nav";
// import wat from '../images/water.png';
import water from '../images/drp.png';

const Water = () => {
  return (
    <div className="min-h-screen w-screen bg-[#fdf1f5] flex flex-col items-center justify-start text-[#4a3b45] overflow-x-hidden relative">
      
      {/* NAV */}
      <div className="w-full z-30">
        <Nav />
      </div>

      {/* LEFT SIDE BACKGROUND IMAGE (wat.png) */}
{/* LEFT SIDE BACKGROUND IMAGE */}
  {/* <div className="absolute top-0 left-0 h-full w-1/3">
        <img
          src={wat}
          alt="water background"
          className="mt-[100px] ml-16 h-[500px] w-[500px] object-cover opacity-70"
        />
      </div> */}
        {/* Optional: Labeling the image area as seen in your mockup */}
        <div className="absolute inset-0 flex items-center justify-center">
             <span className="text-4xl font-bold text-[#4a3b45]/20 uppercase tracking-tighter">wat.png</span>
        </div>
      {/* HEADER */}
      <header className="text-center mt-28">
        <h1 style={{ fontSize: "35px", lineHeight: "1.1" }} className="font-semibold text-gray-800">
          Water Tracker
        </h1>
        <p style={{ fontSize: "8px", lineHeight: "1" }} className="text-gray-500 mt-1">
          Friday, January 2
        </p>
      </header>
<main className="mt-4 w-[full] max-w-3xl bg-white/50 backdrop-blur-2xl rounded-2xl px-6 py-6 flex items-start shadow-[0_15px_35px_rgba(255,182,193,0.35)]">
      {/* MAIN CARD CONTAINER */}
<div className="flex flex-col items-center gap-4">
   
    
    {/* PROGRESS CIRCLE */}
    <div className="relative w-28 h-28 rounded-full border border-pink-200 flex items-center justify-center mb-2 overflow-hidden">
      <div className="absolute bottom-0 w-full h-full">
        <div className="absolute bottom-0 w-[200%] h-[35%] bg-gradient-to-t from-[#f9a8d4] to-[#fbcfe8] rounded-b-full opacity-80 animate-wave1"></div>
        <div className="absolute bottom-0 w-[200%] h-[35%] bg-gradient-to-t from-[#fdd6e8] to-[#fce7f3] rounded-b-full opacity-60 animate-wave2"></div>
      </div>
      <div className="text-center relative z-10">
        <p className="text-2xl font-semibold text-[#3b2a35]">43%</p>
        <p className="text-[10px] text-gray-500 mt-0.5">of daily goal</p>
      </div>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-2 gap-2 w-full">
      <div className="bg-white/70 backdrop-blur-xl rounded-lg p-3 text-center shadow-sm">
        <FiDroplet className="mx-auto mb-1 text-pink-400" />
        <p className="text-md font-semibold text-[#3b2a35]">850</p>
        <p className="text-[10px] text-gray-500">ml current</p>
      </div>
      <div className="bg-white/70 backdrop-blur-xl rounded-lg p-3 text-center shadow-sm">
        <FiClock className="mx-auto mb-1 text-rose-400" />
        <p className="text-md font-semibold text-[#3b2a35]">1,150</p>
        <p className="text-[10px] text-gray-500">ml remaining</p>
      </div>
    </div>

    {/* TRACKER INFO */}
    <div className="w-full bg-white/60 backdrop-blur-xl rounded-lg px-3 py-2 shadow-sm flex justify-between items-center text-xs mt-2">
      <div className="flex items-center gap-1 text-[#3b2a35]">
        <FiClock className="text-pink-400" />
        <span>Last drink: <span className="font-medium">10:30 AM</span></span>
      </div>
      <div className="flex items-center gap-1 text-[#3b2a35]">
        <FiDroplet className="text-pink-400" />
        <span>Streak: <span className="font-medium">5 days</span></span>
      </div>
    </div>

    {/* QUICK ADD */}
    <p className="text-xs text-gray-500 mt-2 mb-1">Quick Add</p>
    <div className="flex gap-2">
      {["100", "200", "250", "300"].map((ml) => (
        <button
          key={ml}
          className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#f9f8f9] to-[#f0efef] border-2 border-white shadow-[0_3px_8px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center font-medium text-[#3b2a35] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <FiDroplet className="mb-1 text-pink-400" />
          {ml}ml
        </button>
      ))}
    </div>
    </div>
        <div className="flex flex-col w-48 bg-white/30 backdrop-blur-xl rounded-2xl p-4 shadow-sm ml-6">
          <p className="text-sm font-bold text-gray-800 mb-4 text-center">Today's Intake</p>

          <div className="space-y-3">
            {[{ amount: 200, type: "Water" }, { amount: 100, type: "Water" }].map((entry, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-white/80 rounded-2xl p-3 shadow-sm border border-white/50"
              >
                <div className="flex flex-col items-start">
                  <span className="text-sm font-bold text-[#3b2a35]">{entry.amount}ml</span>
                  <span className="text-[10px] text-pink-400 font-medium">{entry.type}</span>
                </div>
                <div className="w-10 h-10 bg-[#fce7f3] rounded-full flex items-center justify-center">
                  <FiDroplet className="text-pink-400" />
               
                </div>
              </div>
              
            ))}
          </div>
                             <img
          src={water}
          alt="water background"
          className="mt-[50px] ml-2 h-[180px] w-[180px] object-cover opacity-70"
        />
        </div>
      

      </main>

      {/* FLOATING ADD BUTTON */}
      <button className="fixed bottom-12 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#f472b6] to-[#f9a8d4] text-white shadow-[0_10px_25px_rgba(244,114,182,0.5)] flex items-center justify-center">
        <FiPlus size={20} />
      </button>

      {/* WAVES ANIMATION */}
      <style>
        {`
          @keyframes wave1 {
            0% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(-25%) translateY(-3px); }
            100% { transform: translateX(-50%) translateY(0); }
          }
          @keyframes wave2 {
            0% { transform: translateX(0) translateY(0); }
            50% { transform: translateX(-25%) translateY(-1.5px); }
            100% { transform: translateX(-50%) translateY(0); }
          }
          .animate-wave1 { animation: wave1 4s linear infinite; }
          .animate-wave2 { animation: wave2 6s linear infinite; }
        `}
      </style>
    </div>
  );
};

export default Water;