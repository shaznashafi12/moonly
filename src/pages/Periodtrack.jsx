import React from "react";
import im from '../images/love.png';
import {
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
} from "date-fns";
import { FiDroplet, FiSun, FiHeart, FiCalendar } from "react-icons/fi";
import Nav from "./Nav";

/* ===== COLOR DEFINITIONS ===== */
const DAY_COLORS = {
  normal: "bg-white text-gray-700 hover:bg-gray-100",
  outside: "bg-gray-50 text-gray-300",
  today: "border-2 border-pink-400 text-pink-600 font-semibold",
  period: "bg-pink-500 text-white ring-2 ring-pink-300 shadow-md",
  fertile: "bg-purple-300 text-white",
  ovulation: "bg-green-400 text-white",
};

/* ===== QUOTES FOR CYCLE ===== */
const QUOTES = [
  "Embrace your flow 🌸",
  "Self-care is power 💖",
  "Listen to your body today 🌷",
  "Your cycle, your rhythm 🌙",
];

const Periodtrack = () => {
  const lastPeriodStart = new Date(2024, 11, 1);
  const cycleLength = 28;
  const periodLength = 5;
  const viewMonth = new Date(2025, 11, 1);
  const today = new Date();

  const nextPeriod = addDays(lastPeriodStart, cycleLength);
  const daysToPeriod = Math.max(
    0,
    Math.ceil((nextPeriod - today) / (1000 * 60 * 60 * 24))
  );

  const ovulationDay = 15;
  const fertileStart = 10;
  const fertileEnd = 16;

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewMonth)),
    end: endOfWeek(endOfMonth(viewMonth)),
  });

  const isPeriodDay = (day) =>
    Array.from({ length: periodLength }, (_, i) =>
      addDays(lastPeriodStart, i)
    ).some((d) => isSameDay(d, day));

  const isOvulationDay = (day) =>
    isSameDay(addDays(lastPeriodStart, ovulationDay), day);

  const isFertileDay = (day) =>
    Array.from(
      { length: fertileEnd - fertileStart + 1 },
      (_, i) => addDays(lastPeriodStart, fertileStart + i)
    ).some((d) => isSameDay(d, day));

  const getDayClass = (day) => {
    if (!isSameMonth(day, viewMonth)) return DAY_COLORS.outside;
    if (isPeriodDay(day)) return DAY_COLORS.period;
    if (isOvulationDay(day)) return DAY_COLORS.ovulation;
    if (isFertileDay(day)) return DAY_COLORS.fertile;
    if (isSameDay(day, today)) return DAY_COLORS.today;
    return DAY_COLORS.normal;
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-50 via-purple-50 to-emerald-50 flex flex-col items-center justify-start overflow-auto py-10 relative">
<div className="w-full">
    <Nav />
  </div>
      <div className="grid mt-20 grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full">

        {/* LEFT PANEL */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl space-y-6 relative">
          {/* HEADING */}
          <h1 className="text-1xl font-serif md:text-2xl font-extrabold text-[#e08594] text-center mb-6">
            My Cycle Tracker
          </h1>

          {/* TOP CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card icon={FiDroplet} value={daysToPeriod} label="Days to Period" />
            <Card icon={FiSun} value="15" label="Ovulation Day" />
            <Card icon={FiHeart} value="10–16" label="Fertile Window" />
            <Card icon={FiCalendar} value="28" label="Cycle Length" />
          </div>

          {/* ELEGANT QUOTE LINE */}
          <p className="text-center text-gray-600 italic text-base md:text-lg font-light tracking-wide my-4 flex items-center justify-center gap-2">
            <span className="text-pink-400 text-xl">🌷</span>
            Your cycle looks regular this month
          </p>

          {/* CALENDAR */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
              {format(viewMonth, "MMMM yyyy")}
            </h2>

            <div className="grid grid-cols-7 text-xs text-center text-gray-400 mb-3">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 justify-center">
              {days.map((day, i) => (
                <div
                  key={i}
                  className={`relative w-12 h-12 flex items-center justify-center rounded-xl text-xs cursor-pointer transition-all duration-200 ${getDayClass(day)}`}
                >
                  {day.getDate()}
                  {isPeriodDay(day) && (
                    <span className="absolute -bottom-1 w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              ))}
            </div>

            {/* LEGEND */}
            <div className="flex flex-wrap gap-5 mt-6 text-sm justify-center">
              <Legend color="bg-pink-500" label="Period" />
              <Legend color="bg-green-400" label="Ovulation" />
              <Legend color="bg-purple-300" label="Fertile" />
              <Legend color="border-2 border-pink-400" label="Today" />
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-pink-50 via-purple-50 to-emerald-50 text-sm text-gray-600 text-center shadow-inner">
              Tip: Gentle movement & hydration help reduce cramps ✨
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white rounded-2xl p-6 shadow-xl h-fit">
          {/* Heading with image on the left */}
          <div className="flex items-center gap-4 mb-4">
            <img
              src={im}
              alt="self-care"
              className="w-10 h-10  object-cover"
            />
            <h3 className="font-semibold text-lg text-pink-600">
              Cycle Settings
            </h3>
          </div>

          {/* Labels */}
          <Label title="Last Period Start" value="01-12-2024" />
          <Label title="Cycle Length (days)" value="28" />
          <Label title="Period Length (days)" value="5" />
        </div>
      </div>
    </div>
  );
};

/* ===== SMALL COMPONENTS ===== */
const Card = ({ icon: Icon, value, label }) => (
  <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-emerald-50 rounded-2xl p-4 shadow-md text-center transition hover:shadow-xl cursor-pointer">
    <Icon className="mx-auto mb-2 text-pink-400" size={26} />
    <p className="text-xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

const Label = ({ title, value }) => (
  <div className="mb-4">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <div className="border rounded-lg px-3 py-2 bg-pink-50 text-gray-700">{value}</div>
  </div>
);

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <span className={`w-4 h-4 rounded ${color}`} />
    {label}
  </div>
);

export default Periodtrack;
