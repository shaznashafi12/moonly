import React, { useState, useEffect, useCallback } from "react";
import im from "../images/love.png";
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
import { saveCycle, getCycle } from "../api/api.js";
import { Link } from "react-router-dom";

const DAY_COLORS = {
  normal: "bg-white/40",
  outside: "bg-slate-50",
  today: "ring-2 ring-pink-400 bg-white/50 font-semibold",
  period: "bg-pink-200",
  fertile: "bg-purple-300/90",
  ovulation: "bg-green-300/90",
};

const Periodtrack = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;

  const today = new Date();

  const [lastPeriodStart, setLastPeriodStart] = useState(new Date());
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);

  const [draftLastPeriodStart, setDraftLastPeriodStart] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [draftCycleLength, setDraftCycleLength] = useState(28);
  const [draftPeriodLength, setDraftPeriodLength] = useState(5);

  const fetchData = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await getCycle(userId);
      const data = res.data.cycle;
      if (!data) return;
      const parsedDate = new Date(data.lastPeriodStart);
      setLastPeriodStart(parsedDate);
      setCycleLength(data.cycleLength);
      setPeriodLength(data.periodLength);
      setDraftLastPeriodStart(parsedDate.toISOString().slice(0, 10));
      setDraftCycleLength(data.cycleLength);
      setDraftPeriodLength(data.periodLength);
    } catch (error) {
      console.log("No existing cycle data");
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSubmit = async () => {
    try {
      if (!userId) { alert("User not logged in"); return; }
      if (!draftLastPeriodStart || !draftCycleLength || !draftPeriodLength) {
        alert("Please fill all fields"); return;
      }
      const payload = {
        userId,
        lastPeriodStart: draftLastPeriodStart,
        cycleLength: Number(draftCycleLength),
        periodLength: Number(draftPeriodLength),
      };
      await saveCycle(payload);
      await fetchData();
      alert("Saved successfully!");
    } catch (error) {
      console.error("SAVE ERROR:", error.response?.data || error.message);
      alert("Something went wrong. Check backend.");
    }
  };

  const safeLastPeriod = new Date(lastPeriodStart);

  const getFuturePeriods = (count = 3) => {
    let periods = [];
    let baseDate = safeLastPeriod;
    for (let i = 0; i < count; i++) {
      baseDate = addDays(baseDate, cycleLength);
      periods.push(new Date(baseDate));
    }
    return periods;
  };

  const futurePeriods = getFuturePeriods(2);

  const getCycleDay = (day) => {
    const diff = Math.floor((day - safeLastPeriod) / (1000 * 60 * 60 * 24));
    if (diff < 0) return null;
    return diff % cycleLength;
  };

  const isPeriodDay = (day) => {
    const cycleDay = getCycleDay(day);
    if (cycleDay !== null && cycleDay < periodLength) return true;
    return futurePeriods.some((periodStart) => {
      const diff = Math.floor((day - periodStart) / (1000 * 60 * 60 * 24));
      return diff >= 0 && diff < periodLength;
    });
  };

  const ovulationDay = cycleLength - 14;
  const fertileStart = ovulationDay - 5;
  const fertileEnd = ovulationDay;

  const isOvulationDay = (day) => getCycleDay(day) === ovulationDay;

  const isFertileDay = (day) => {
    const cycleDay = getCycleDay(day);
    return cycleDay !== null && cycleDay >= fertileStart && cycleDay <= fertileEnd;
  };

  const nextPeriodDate = addDays(safeLastPeriod, cycleLength);
  const daysToPeriod = Math.max(
    0,
    Math.ceil((nextPeriodDate - today) / (1000 * 60 * 60 * 24))
  );

  const shouldShowNextMonth =
    safeLastPeriod.getMonth() === today.getMonth() &&
    safeLastPeriod.getFullYear() === today.getFullYear();

  const viewMonth = shouldShowNextMonth
    ? startOfMonth(nextPeriodDate)
    : startOfMonth(today);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewMonth)),
    end: endOfWeek(endOfMonth(viewMonth)),
  });

  return (
    <div className="min-h-screen w-full bg-[linear-gradient(to_bottom_right,#f0f9ff,#fdf2f8,#f3e8ff)] flex flex-col items-center justify-start overflow-auto py-6 px-0 lg:px-0  relative">
     <div className="w-full fixed top-0 left-0 z-50 lg:static">
  <Nav />
</div>

      {/* ===== MOBILE LAYOUT ===== */}
<div className="flex flex-col mt-10 gap-6 w-full max-w-md lg:hidden px-4">
        {/* BREADCRUMB — at top */}
        <p className="text-sm text-gray-500 -mb-4 mt-5">
          <Link to="/home" className="ml-2.5 hover:text-black   transition">
            Home
          </Link>{" "}
          &gt; Period tracker
        </p>

        {/* CYCLE SETTINGS — top on mobile */}
        <div className="bg-white/30 backdrop-blur-2xl rounded-[28px] p-6 shadow-[0_30px_80px_rgba(255,182,193,0.35)] border border-white/40">
         <div className="flex items-center gap-3 mb-5">
  <img src={im} alt="self-care" className="w-10 h-10 object-cover opacity-80" />

  <h3 className="font-semibold text-lg  text-[#e08594]">
    Cycle Settings
  </h3>
</div>

          <LabelInput
            title="Last Period Start"
            value={draftLastPeriodStart}
            onChange={(e) => setDraftLastPeriodStart(e.target.value)}
          />
          <LabelInput
            title="Cycle Length (days)"
            value={draftCycleLength}
            onChange={(e) => setDraftCycleLength(Number(e.target.value))}
          />
          <LabelInput
            title="Period Length (days)"
            value={draftPeriodLength}
            onChange={(e) => setDraftPeriodLength(Number(e.target.value))}
          />

          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-[#e08594] text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-200 shadow-md"
          >
            Submit
          </button>
        </div>

        {/* CALENDAR PANEL — below settings on mobile */}
        <div className="bg-white/30 backdrop-blur-2xl rounded-[32px] p-6 shadow-[0_40px_120px_rgba(255,182,193,0.45)] border border-white/40">
          <h1 className="text-xl font-serif font-extrabold text-[#e08594] text-center mb-5">
            My Cycle Tracker
          </h1>

          {/* Stat Cards — 2x2 grid on mobile with proper gap */}
          <div className="grid grid-cols-2 gap-4 mb-5">
            <Card icon={FiDroplet} value={daysToPeriod} label="Days to Period" />
            <Card icon={FiSun} value={ovulationDay} label="Ovulation Day" />
            <Card icon={FiHeart} value={`${fertileStart + 1}–${fertileEnd + 1}`} label="Fertile Window" />
            <Card icon={FiCalendar} value={cycleLength} label="Cycle Length" />
          </div>

          <p className="text-center text-gray-600 italic text-sm font-light tracking-wide mb-4">
            Your cycle looks regular this month
          </p>

          <h2 className="text-base font-semibold text-center text-gray-700 mb-3">
            {format(viewMonth, "MMMM yyyy")}
          </h2>

          <div className="grid grid-cols-7 text-xs text-center text-gray-400 mb-2">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {days.map((day, i) => {
              let dayBgClass = DAY_COLORS.normal;
              if (!isSameMonth(day, viewMonth)) dayBgClass = DAY_COLORS.outside;
              else if (isPeriodDay(day)) dayBgClass = DAY_COLORS.period;
              else if (isOvulationDay(day)) dayBgClass = DAY_COLORS.ovulation;
              else if (isFertileDay(day)) dayBgClass = DAY_COLORS.fertile;

              const isToday = isSameDay(day, today);
              if (isToday) dayBgClass = DAY_COLORS.today;

              return (
                <div
                  key={i}
                  className={`relative w-full aspect-square rounded-xl flex items-center justify-center text-xs font-medium ${dayBgClass} backdrop-blur-md shadow-sm transition-all duration-200`}
                >
                  <span className="text-black">{day.getDate()}</span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 mt-5 text-xs justify-center">
            <Legend color="bg-pink-200" label="Period" />
            <Legend color="bg-green-300/90" label="Ovulation" />
            <Legend color="bg-purple-300/90" label="Fertile" />
            <Legend color="ring-2 ring-pink-400" label="Today" />
          </div>

          <div className="mt-5 px-4 py-3 rounded-2xl bg-white/35 backdrop-blur-xl text-sm text-gray-600 shadow-inner text-center">
            Tip: Gentle movement & hydration help reduce cramps ✨
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT ===== */}
      <div className="hidden lg:flex lg:flex-col max-w-7xl w-full mt-16">
        {/* BREADCRUMB */}
        <p className="text-sm text-gray-500 mb-2">
          <Link to="/home" className="ml-2.5 hover:text-black transition">
            Home
          </Link>{" "}
          &gt; Period tracker
        </p>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">

        {/* LEFT PANEL */}
        <div className="lg:col-span-2 bg-white/30 backdrop-blur-2xl rounded-[32px] p-8 shadow-[0_40px_120px_rgba(255,182,193,0.45)] space-y-6 relative border border-white/40">
          <h1 className="text-1xl font-serif md:text-2xl font-extrabold text-[#e08594] text-center mb-6">
            My Cycle Tracker
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card icon={FiDroplet} value={daysToPeriod} label="Days to Period" />
            <Card icon={FiSun} value={ovulationDay} label="Ovulation Day" />
            <Card icon={FiHeart} value={`${fertileStart + 1}–${fertileEnd + 1}`} label="Fertile Window" />
            <Card icon={FiCalendar} value={cycleLength} label="Cycle Length" />
          </div>

          <p className="text-center text-gray-600 italic text-base md:text-sm font-light tracking-wide my-4">
            Your cycle looks regular this month
          </p>

          <div className="mt-4">
            <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
              {format(viewMonth, "MMMM yyyy")}
            </h2>

            <div className="grid grid-cols-7 text-xs text-center text-gray-400 mb-3">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 justify-center">
              {days.map((day, i) => {
                let dayBgClass = DAY_COLORS.normal;
                if (!isSameMonth(day, viewMonth)) dayBgClass = DAY_COLORS.outside;
                else if (isPeriodDay(day)) dayBgClass = DAY_COLORS.period;
                else if (isOvulationDay(day)) dayBgClass = DAY_COLORS.ovulation;
                else if (isFertileDay(day)) dayBgClass = DAY_COLORS.fertile;
                else if (isSameDay(day, today)) dayBgClass = DAY_COLORS.today;
                const isToday = isSameDay(day, today);
                if (isToday) dayBgClass = DAY_COLORS.today;

                return (
                  <div
                    key={i}
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center text-xs font-medium ${dayBgClass} backdrop-blur-md shadow-sm transition-all duration-200`}
                  >
                    <span className="text-black">{day.getDate()}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-5 mt-6 text-sm justify-center">
              <Legend color="bg-pink-200" label="Period" />
              <Legend color="bg-green-300/90" label="Ovulation" />
              <Legend color="bg-purple-300/90" label="Fertile" />
              <Legend color="ring-2 ring-pink-400" label="Today" />
            </div>

            <div className="mt-6 px-6 py-4 rounded-2xl bg-white/35 backdrop-blur-xl text-sm text-gray-600 shadow-inner">
              Tip: Gentle movement & hydration help reduce cramps ✨
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-white/10 backdrop-blur-2xl rounded-[28px] p-6 shadow-[0_30px_80px_rgba(255,182,193,0.35)] h-fit border border-white/40 relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <img src={im} alt="self-care" className="w-10 h-10 object-cover opacity-80" />
            <h3 className="font-semibold text-lg text-[#e08594]">Cycle Settings</h3>
          </div>

          <LabelInput
            title="Last Period Start"
            value={draftLastPeriodStart}
            onChange={(e) => setDraftLastPeriodStart(e.target.value)}
          />
          <LabelInput
            title="Cycle Length (days)"
            value={draftCycleLength}
            onChange={(e) => setDraftCycleLength(Number(e.target.value))}
          />
          <LabelInput
            title="Period Length (days)"
            value={draftPeriodLength}
            onChange={(e) => setDraftPeriodLength(Number(e.target.value))}
          />

          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-[#e08594] text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-200 shadow-md"
          >
            submit
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

const Card = ({ icon: Icon, value, label }) => (
  <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-4 shadow-[0_12px_30px_rgba(255,182,193,0.25)] text-center transition hover:scale-[1.02] cursor-pointer">
    <Icon className="mx-auto mb-2 text-pink-400" size={26} />
    <p className="text-xl font-bold text-gray-800">{value}</p>
    <p className="text-xs text-gray-500">{label}</p>
  </div>
);

const LabelInput = ({ title, value, onChange }) => (
  <div className="mb-4">
    <p className="text-sm text-gray-500 mb-1">{title}</p>
    <input
      type={title.includes("Start") ? "date" : "number"}
      value={value}
      onChange={onChange}
      className="border border-white/50 rounded-xl px-4 py-2 bg-white/40 backdrop-blur-lg text-gray-700 shadow-sm w-full"
    />
  </div>
);

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2 text-gray-600">
    <span className={`w-4 h-4 rounded-full ${color} shadow-sm`} />
    {label}
  </div>
); 

export default Periodtrack;
