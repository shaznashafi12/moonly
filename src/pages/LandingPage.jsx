import React, { useState, useEffect } from "react";
import {
  FaShoppingCart, FaHeartbeat, FaStar, FaQuoteLeft,
  FaArrowRight, FaCheck, FaPlay
} from "react-icons/fa";
import { GiWaterDrop, GiMoon } from "react-icons/gi";
import { MdPregnantWoman } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";
import logoImg from "../images/love.png";
import girlimg from "../images/girls1.png";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

const Stars = ({ n = 5 }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className={`text-xs ${i < n ? "text-amber-400" : "text-gray-200"}`} />
    ))}
  </div>
);

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 bg-pink-50 border border-pink-200 text-pink-600 rounded-full px-3.5 py-1 text-xs font-bold tracking-widest uppercase">
    <IoSparkles className="text-[10px]" />{children}
  </span>
);

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHow, setActiveHow] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = ["Features", "How It Works", "Testimonials"];

  const problems = [
    { icon: "😰", title: "Unpredictable Cycles", desc: "Without tracking, menstrual cycles become a source of stress and surprise — making it hard to plan your life confidently." },
    { icon: "🔍", title: "Missed Health Insights", desc: "You may be overlooking vital patterns in symptoms, moods, and physical changes that your body is trying to communicate." },
    { icon: "😣", title: "Struggling with Symptoms", desc: "Cramps, fatigue, mood swings — without data, it's hard to manage or predict the symptoms that affect your daily life." },
    { icon: "💊", title: "No Expert Guidance", desc: "Most women navigate reproductive health alone, without personalised insights or professional-grade recommendations." },
  ];

  const howSteps = [
    { step: "01", title: "Log Your Cycle", desc: "Record your period start and end dates. Moonly learns from every entry and gets smarter the more you use it.", icon: "📅", color: "#e08594", activeBg: "bg-pink-500", softBg: "bg-pink-50", border: "border-pink-200" },
    { step: "02", title: "Track Daily Wellness", desc: "Add mood, symptoms, water intake, and energy levels in seconds with our beautifully intuitive daily log.", icon: "📊", color: "#b97cc4", activeBg: "bg-purple-400", softBg: "bg-purple-50", border: "border-purple-200" },
    { step: "03", title: "Get Smart Predictions", desc: "Our AI analyses your data to predict your next cycle, ovulation window, and PMS symptoms accurately.", icon: "🔮", color: "#6ab8d8", activeBg: "bg-sky-400", softBg: "bg-sky-50", border: "border-sky-200" },
    { step: "04", title: "Shop Curated Wellness", desc: "Receive product recommendations personalised to your cycle phase and unique health needs.", icon: "🛍️", color: "#f0a060", activeBg: "bg-orange-400", softBg: "bg-orange-50", border: "border-orange-200" },
  ];

  const features = [
    { icon: <FaHeartbeat size={20} />, title: "Period Tracker", desc: "Predict cycles, ovulation and PMS symptoms with AI-powered accuracy.", color: "text-pink-500", bg: "bg-pink-50" },
    { icon: <MdPregnantWoman size={20} />, title: "Pregnancy Tracker", desc: "Week-by-week baby growth milestones and personalised updates.", color: "text-purple-400", bg: "bg-purple-50" },
    { icon: "😊", title: "Mood Tracker", desc: "Log emotions and uncover mental wellness patterns over time.", color: "text-orange-400", bg: "bg-orange-50", isEmoji: true },
    { icon: <GiWaterDrop size={20} />, title: "Water Tracker", desc: "Personalised hydration goals and smart cycle-aware reminders.", color: "text-sky-400", bg: "bg-sky-50" },
  ];

  const reviews = [
    { name: "Priya S.", loc: "Mumbai", av: "P", rating: 5, text: "Moonly completely changed how I understand my body. The cycle predictions are spot-on and the mood tracker helped me connect patterns I'd never noticed." },
    { name: "Ananya R.", loc: "Bangalore", av: "A", rating: 5, text: "I used it throughout my pregnancy — the weekly updates were so detailed and calming. The wellness store has amazing curated products too!" },
    { name: "Deepa M.", loc: "Chennai", av: "D", rating: 5, text: "I love how everything is in one place. The hydration reminders have made a huge difference in my daily energy and focus." },
    { name: "Meera K.", loc: "Kochi", av: "M", rating: 5, text: "Moonly guided me through every week of my pregnancy. The baby growth updates felt so personal and comforting." },
    { name: "Aishwarya P.", loc: "Trivandrum", av: "A", rating: 5, text: "As a first-time mom, I was anxious. Moonly made everything feel calm and manageable. The reminders were a lifesaver." },
    { name: "Neha V.", loc: "Mumbai", av: "N", rating: 5, text: "Tracking my pregnancy journey in Moonly felt magical. Every milestone felt celebrated. I truly loved the experience." },
  ];

  const avatarGradients = [
    "from-pink-400 to-rose-500",
    "from-purple-400 to-violet-500",
    "from-orange-400 to-amber-500",
    "from-sky-400 to-blue-500",
    "from-pink-400 to-rose-500",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

        html { scroll-behavior: smooth; }
        body { font-family: 'Outfit', sans-serif; background: #fdf5f6; color: #2a1a1e; overflow-x: hidden; }

        @keyframes floatEmoji {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33%       { transform: translateY(-20px) rotate(5deg); }
          66%       { transform: translateY(-9px) rotate(-4deg); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -300% center; }
          100% { background-position: 300% center; }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .fade-up { animation: fadeUp 0.65s ease both; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.22s; }
        .d3 { animation-delay: 0.36s; }
        .d4 { animation-delay: 0.5s; }

        .cormorant { font-family: 'Cormorant Garamond', serif; }

        .shimmer-text {
          background: linear-gradient(90deg, #e08594 0%, #c96879 30%, #b97cc4 60%, #e08594 100%);
          background-size: 300% auto;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        .btn-main {
          background: linear-gradient(135deg, #e08594, #c96879);
          color: #fff; border: none;
          font-family: 'Outfit'; font-weight: 600; font-size: 15px;
          cursor: pointer; display: inline-flex; align-items: center; gap: 8px;
          transition: all 0.25s; box-shadow: 0 8px 28px rgba(224,133,148,0.42);
        }
        .btn-main:hover { transform: translateY(-3px); box-shadow: 0 14px 40px rgba(224,133,148,0.55); }

        .btn-ghost {
          background: transparent; color: #c96879;
          border: 2px solid rgba(224,133,148,0.45);
          font-family: 'Outfit'; font-weight: 600; font-size: 15px;
          cursor: pointer; transition: all 0.25s;
        }
        .btn-ghost:hover { background: rgba(224,133,148,0.08); transform: translateY(-2px); }

        .card-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-lift:hover { transform: translateY(-7px); box-shadow: 0 24px 60px rgba(224,133,148,0.2) !important; }

        .marquee-inner { display: flex; animation: marquee 24s linear infinite; width: max-content; }
        .marquee-inner:hover { animation-play-state: paused; }

        .nav-link {
          color: #5a3d42; font-weight: 500; font-size: 14px;
          cursor: pointer; text-decoration: none; transition: color 0.2s;
          position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -4px; left: 0;
          width: 0; height: 2px; background: #e08594;
          border-radius: 2px; transition: width 0.25s;
        }
        .nav-link:hover { color: #e08594; }
        .nav-link:hover::after { width: 100%; }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #fdf5f6; }
        ::-webkit-scrollbar-thumb { background: #e8b0bb; border-radius: 99px; }
      `}</style>

      <div className="relative z-10 min-h-screen flex flex-col bg-[#fdf5f6]">

        {/* ════════ NAVBAR ════════ */}
        <nav className="sticky top-0 z-50 bg-white border-b border-pink-100 h-[70px] flex items-center justify-between px-4 md:px-8 transition-all duration-300">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-default">
            <img src={logoImg} alt="Moonly logo" className="w-7 h-7 object-contain" />
            <span className="text-2xl font-extrabold tracking-wide">
              <span className="text-[#3f2d2d]">Moon</span>
              <span className="text-[#e08594]">ly</span>
            </span>
          </div>

          {/* Center nav links - hidden on mobile */}
          <div className="hidden md:flex gap-8">
            {navLinks.map(l => (
              <a key={l} className="nav-link" href={`#${l.replace(/\s+/g, "").toLowerCase()}`}>{l}</a>
            ))}
          </div>

          {/* Right buttons */}
          <div className="flex items-center gap-3">
            {/* Hamburger - visible on mobile only */}
            <button
              className="md:hidden text-2xl text-[#5a3d42] focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✕" : "☰"}
            </button>

            {/* Desktop buttons */}
            <Link to="/login" className="hidden md:block">
              <button className="text-[#5a3d42] font-medium text-sm bg-transparent border-none cursor-pointer hover:text-[#e08594] transition-colors">
                Login
              </button>
            </Link>
            <Link to="/register" className="hidden md:block">
              <button className="btn-main px-5 py-2.5 rounded-full text-sm">
                Sign Up
              </button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-[70px] left-0 w-full bg-white shadow-xl z-40 flex flex-col gap-4 px-6 py-5">
            {navLinks.map(l => (
              <a
                key={l}
                href={`#${l.replace(/\s+/g, "").toLowerCase()}`}
                className="text-[#5a3d42] font-medium text-sm hover:text-[#e08594] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            ))}
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <span className="text-[#5a3d42] font-medium text-sm">Login</span>
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)}>
              <button className="btn-main px-5 py-2.5 rounded-full text-sm w-fit">
                Sign Up
              </button>
            </Link>
          </div>
        )}

        {/* ════════ HERO ════════ */}
        <section className="px-6 md:px-[6%] py-16 md:py-20 max-w-[1240px] mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[70px] items-center">

            {/* Left content */}
            <div>
              <div className="fade-up d1 mb-4"><Pill>Trusted by 2M+ Women Worldwide</Pill></div>
              <h1 className="cormorant fade-up d2 text-[clamp(40px,5.5vw,68px)] font-bold leading-[1.1] text-[#2a1a1e] mb-5">
                Your Personal<br />
                <span className="shimmer-text">Women's Health</span><br />
                Companion
              </h1>
              <p className="fade-up d3 text-[#7a5a60] text-base leading-[1.85] mb-9 max-w-[430px]">
                Track cycles, pregnancy, mood and daily wellness — all in one beautifully designed app made for women, by women.
              </p>
              <div className="fade-up d4 flex gap-3.5 mb-11">
                <Link to="/register">
                  <button className="btn-main px-8 py-4 rounded-full">
                    Get Started <FaArrowRight className="text-xs" />
                  </button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="fade-up d4 flex items-center gap-4">
                <div className="flex">
                  {["P", "A", "D", "N", "S"].map((l, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full border-[2.5px] border-[#fdf5f6] flex items-center justify-center text-white text-[11px] font-bold bg-gradient-to-br ${avatarGradients[i]}`}
                      style={{ marginLeft: i === 0 ? 0 : -8 }}
                    >{l}</div>
                  ))}
                </div>
                <div>
                  <Stars n={5} />
                  <div className="text-xs text-[#9a7a80] mt-0.5">4.9 · Loved by 2M+ women</div>
                </div>
              </div>
            </div>

            {/* Hero image */}
            <div className="relative">
              <div className="aspect-[4/5]">
                <img
                  src={girlimg}
                  alt="Women wellness"
                  className="w-full h-full object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ════════ MARQUEE BAR ════════ */}
        <div className="py-4 overflow-hidden" style={{ background: "linear-gradient(135deg,#e08594,#c96879,#b97cc4)" }}>
          <div className="marquee-inner">
            {[...Array(2)].map((_, ri) =>
              ["2M+ Active Users ✨", "98% Prediction Accuracy 🎯", "4.9★ App Rating 💗", "50+ Wellness Products 🌿", "Trusted Worldwide 🌸", "Free Forever 🦋"].map((t, i) => (
                <span key={`${ri}-${i}`} className="text-white text-sm font-semibold px-10 whitespace-nowrap opacity-95">{t}</span>
              ))
            )}
          </div>
        </div>

        {/* ════════ WHY TRACKING MATTERS ════════ */}
        <section className="py-24 md:py-28 px-6 md:px-[6%] bg-white" id="features">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <Pill>Why It Matters</Pill>
              <h2 className="cormorant text-[clamp(32px,4.5vw,52px)] font-bold text-[#2a1a1e] mt-4 leading-[1.15]">
                Why Tracking Your<br /><span className="shimmer-text">Cycle Matters</span>
              </h2>
              <p className="text-[#7a5a60] text-base mt-4 max-w-[460px] mx-auto">
                Millions of women navigate reproductive health blind. Moonly changes that.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {problems.map((p, i) => (
                <div key={i} className="card-lift bg-[#fdf5f6] rounded-[26px] p-8 border border-pink-100 shadow-sm">
                  <div className="w-[62px] h-[62px] rounded-[18px] bg-white shadow-md flex items-center justify-center text-4xl mb-5">
                    {p.icon}
                  </div>
                  <h4 className="cormorant text-xl font-bold text-[#2a1a1e] mb-2.5">{p.title}</h4>
                  <p className="text-[#7a5a60] text-sm leading-[1.75]">{p.desc}</p>
                </div>
              ))}
            </div>

            {/* Solution bridge */}
            <div className="mt-16 text-center rounded-[34px] p-12 md:p-16 border border-pink-100" style={{ background: "linear-gradient(135deg, #fde6ea, #f8f0fc)" }}>
              <div className="text-5xl mb-4">💡</div>
              <h3 className="cormorant text-[clamp(26px,4vw,44px)] font-bold text-[#2a1a1e] leading-[1.2]">
                We know all your problems,<br />
                <span className="text-[#e08594] italic">and we have the solution.</span>
              </h3>
              <p className="text-[#7a5a60] text-base mt-4 max-w-[500px] mx-auto mb-8 leading-[1.75]">
                Moonly brings together intelligent tracking, expert insights, and curated wellness products — all in one beautiful place.
              </p>
              <button className="btn-main px-8 py-4 rounded-full">Discover Moonly <FaArrowRight className="text-xs" /></button>
            </div>
          </div>
        </section>

        {/* ════════ HOW IT WORKS ════════ */}
        <section className="py-24 md:py-28 px-6 md:px-[6%] bg-[#fdf5f6]" id="howitworks">
          <div className="max-w-[1100px] mx-auto">
            <div className="text-center mb-16">
              <Pill>Simple Process</Pill>
              <h2 className="cormorant text-[clamp(30px,4vw,50px)] font-bold text-[#2a1a1e] mt-4">
                How It Works
              </h2>
              <p className="text-[#7a5a60] text-base mt-3 max-w-[420px] mx-auto">
                Getting started takes under 2 minutes. Here's your path to better health.
              </p>
            </div>

            {/* Step selectors */}
            <div className="flex justify-center gap-2.5 mb-12 flex-wrap">
              {howSteps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHow(i)}
                  className={`px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all duration-300 cursor-pointer ${
                    activeHow === i
                      ? `${s.activeBg} text-white border-transparent shadow-lg`
                      : "bg-transparent text-[#7a5a60] border-pink-200 hover:border-pink-300"
                  }`}
                >
                  {s.icon} Step {s.step}
                </button>
              ))}
            </div>

            {/* Active step panel */}
            <div className="bg-white rounded-[36px] p-8 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center border border-pink-100 shadow-sm">
              <div>
                <div
                  className={`w-[70px] h-[70px] rounded-[22px] ${howSteps[activeHow].softBg} ${howSteps[activeHow].border} border-2 flex items-center justify-center text-4xl mb-6`}
                >
                  {howSteps[activeHow].icon}
                </div>
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: howSteps[activeHow].color }}>
                  Step {howSteps[activeHow].step}
                </div>
                <h3 className="cormorant text-[38px] font-bold text-[#2a1a1e] mb-4 leading-[1.15]">
                  {howSteps[activeHow].title}
                </h3>
                <p className="text-[#7a5a60] text-base leading-[1.85]">{howSteps[activeHow].desc}</p>
              </div>

              {/* Visual mockup */}
              <div
                className={`${howSteps[activeHow].softBg} rounded-[26px] p-7 min-h-[260px] flex items-center justify-center ${howSteps[activeHow].border} border`}
              >
                {activeHow === 0 && (
                  <div>
                    <div className="cormorant text-xl font-bold text-[#2a1a1e] mb-4 text-center">March 2026</div>
                    <div className="grid grid-cols-7 gap-1 max-w-[270px]">
                      {["S","M","T","W","T","F","S"].map((d, i) => (
                        <div key={i} className="text-center text-[10px] text-[#9a7a80] font-bold pb-1">{d}</div>
                      ))}
                      {Array.from({length: 31}, (_, i) => i + 1).map(d => {
                        const isPeriod = d >= 1 && d <= 5;
                        const isOvul = d === 14;
                        const isToday = d === 16;
                        return (
                          <div key={d} className={`text-center text-[11px] px-0.5 py-1.5 rounded-lg font-normal border
                            ${isPeriod ? "bg-[#e08594] text-white border-transparent" :
                              isOvul ? "bg-[#b97cc4] text-white border-transparent" :
                              isToday ? "bg-pink-50 text-[#e08594] font-bold border-[#e08594]" :
                              "bg-transparent text-[#5a3d42] border-transparent"}`}
                          >{d}</div>
                        );
                      })}
                    </div>
                    <div className="flex gap-3 mt-3.5 justify-center">
                      {[{c:"#e08594",l:"Period"},{c:"#b97cc4",l:"Ovulation"}].map(x=>(
                        <div key={x.l} className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-sm" style={{ background: x.c }} />
                          <span className="text-[10px] text-[#9a7a80]">{x.l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeHow === 1 && (
                  <div className="w-full max-w-[270px]">
                    <div className="cormorant text-lg font-bold text-[#2a1a1e] mb-4">How are you today?</div>
                    {[{m:"😊",l:"Happy",sel:true},{m:"😌",l:"Calm"},{m:"🤩",l:"Amazing"},{m:"😔",l:"Low"},{m:"😤",l:"Anxious"}].map((x, i) => (
                      <div key={i} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-[13px] mb-2 border ${x.sel ? "bg-purple-50 border-purple-300" : "bg-white border-gray-100"}`}>
                        <span className="text-xl">{x.m}</span>
                        <span className={`text-sm ${x.sel ? "font-semibold text-purple-500" : "font-normal text-[#5a3d42]"}`}>{x.l}</span>
                        {x.sel && <FaCheck className="ml-auto text-purple-400 text-xs" />}
                      </div>
                    ))}
                  </div>
                )}

                {activeHow === 2 && (
                  <div className="w-full max-w-[250px] text-center">
                    <div className="text-5xl mb-2.5">🔮</div>
                    <div className="cormorant text-xl font-bold text-[#2a1a1e] mb-4">AI Predictions</div>
                    {[{label:"Next Period",val:"Mar 24",c:"#e08594"},{label:"Ovulation",val:"Apr 7",c:"#b97cc4"},{label:"PMS starts",val:"Mar 21",c:"#f0a060"}].map(pr=>(
                      <div key={pr.label} className="flex justify-between items-center px-4 py-3 rounded-[13px] mb-2 bg-white shadow-sm">
                        <span className="text-sm text-[#7a5a60]">{pr.label}</span>
                        <span className="text-sm font-bold" style={{ color: pr.c }}>{pr.val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeHow === 3 && (
                  <div className="w-full max-w-[270px]">
                    <div className="cormorant text-lg font-bold text-[#2a1a1e] mb-4">Recommended for You</div>
                    {[{name:"Period Care Pack",price:"₹499",tag:"Cycle Day 14"},{name:"Herbal Wellness Tea",price:"₹399",tag:"Mood support"},{name:"Magnesium Gummies",price:"₹349",tag:"PMS relief"}].map((pr, i) => (
                      <div key={i} className="flex items-center gap-3 px-3.5 py-3 rounded-[13px] mb-2 bg-white shadow-sm">
                        <span className="text-xl">🛍️</span>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-[#2a1a1e]">{pr.name}</div>
                          <div className="text-[11px] text-orange-400">{pr.tag}</div>
                        </div>
                        <span className="text-sm font-bold text-[#e08594]">{pr.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Step dots */}
            <div className="flex justify-center gap-2 mt-7">
              {howSteps.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveHow(i)}
                  className={`h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${activeHow === i ? "w-7" : "w-2 bg-pink-200"}`}
                  style={activeHow === i ? { background: s.color } : {}}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ════════ FEATURES ════════ */}
        <section className="py-24 md:py-28 px-6 md:px-[6%] bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
              <Pill>Smart Tracking</Pill>
              <h2 className="cormorant text-[clamp(30px,4vw,50px)] font-bold text-[#2a1a1e] mt-4 leading-[1.2]">
                Everything You Need,<br />In One Beautiful App
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
                <div key={i} className="card-lift bg-[#fdf5f6] rounded-[28px] p-9 border border-pink-100 shadow-sm relative overflow-hidden">
                  <div className={`absolute -top-5 -right-5 w-20 h-20 rounded-full ${f.bg} opacity-70`} />
                  <div className={`w-14 h-14 rounded-[18px] ${f.bg} ${f.color} flex items-center justify-center mb-5 relative text-xl shadow-md`}>
                    {f.isEmoji ? <span className="text-2xl">{f.icon}</span> : f.icon}
                  </div>
                  <h4 className="cormorant text-[22px] font-bold text-[#2a1a1e] mb-2.5">{f.title}</h4>
                  <p className="text-[#7a5a60] text-sm leading-[1.75]">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ PREGNANCY SECTION ════════ */}
        <section className="py-24 md:py-28 px-6 md:px-[6%] bg-[#fff7fb]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <Pill>For Moms-to-be</Pill>
              <h2 className="cormorant text-[clamp(30px,4vw,50px)] font-bold text-[#2a1a1e] mt-4 leading-[1.2]">
                Your Pregnancy,<br />
                <span className="shimmer-text">Beautifully Guided</span>
              </h2>
              <p className="text-[#7a5a60] text-base mt-3 max-w-[500px] mx-auto">
                From first heartbeat to delivery day, Moonly supports you with insights, care, and calm.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🤰", title: "Week-by-Week Growth", desc: "Track your baby's development with beautifully explained milestones every week." },
                { icon: "🧠", title: "Emotional Support", desc: "Understand mood changes and get gentle guidance through every phase." },
                { icon: "🥗", title: "Nutrition Guidance", desc: "Personalised diet tips to keep both you and your baby healthy." },
                { icon: "📅", title: "Doctor Reminders", desc: "Never miss checkups, scans, or important medical milestones." },
              ].map((item, i) => (
                <div key={i} className="card-lift bg-white rounded-[26px] p-8 border border-pink-100 shadow-sm">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="cormorant text-[22px] font-bold mb-2.5">{item.title}</h4>
                  <p className="text-[#7a5a60] text-sm leading-[1.75]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════ TESTIMONIALS ════════ */}
        <section className="py-24 md:py-28 px-6 md:px-[6%] bg-[#fdf5f6]" id="testimonials">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <Pill>Real Stories</Pill>
              <h2 className="cormorant text-[clamp(30px,4vw,50px)] font-bold text-[#2a1a1e] mt-4">
                Loved by Women Everywhere
              </h2>
              <div className="flex justify-center items-center gap-2 mt-3">
                <Stars n={5} />
                <span className="text-[#5a3d42] font-semibold text-sm">4.9 out of 5</span>
                <span className="text-[#9a7a80] text-[13px]">· 2,400+ reviews</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {reviews.map((r, i) => (
                <div key={i} className="card-lift bg-white rounded-[26px] p-8 border border-pink-100 shadow-sm">
                  <FaQuoteLeft className="text-pink-200 text-2xl mb-3.5" />
                  <Stars n={r.rating} />
                  <p className="text-[#5a3d42] text-sm leading-[1.85] my-3.5 italic">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white font-bold text-base">
                      {r.av}
                    </div>
                    <div>
                      <div className="font-semibold text-[#2a1a1e] text-sm">{r.name}</div>
                      <div className="text-xs text-[#9a7a80]">{r.loc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
