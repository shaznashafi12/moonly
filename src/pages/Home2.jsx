import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiFileText,
  FiShoppingBag,
  FiCheckSquare,
  FiCoffee,
  FiCalendar,
} from "react-icons/fi";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Nav2 from "./Nav2.jsx";

import img1 from "../images/prr.png";
import img2 from "../images/ch.png";
import bannerImg from "../images/bb.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const pregnancyCards = [
  {
    title: "Pregnancy Tracker",
    desc: "Weekly progress & baby growth",
    icon: FiActivity,
    link: "/pregnancy",
    bg: "bg-pink-100",
    color: "text-pink-600",
  },
  {
    title: "Medical Records",
    desc: "Prescriptions & scan reports",
    icon: FiFileText,
    link: "/medical",
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "Hospital Checklist",
    desc: "Last-month admission essentials",
    icon: FiCheckSquare,
    link: "/checklist",
    bg: "bg-rose-100",
    color: "text-rose-600",
  },
  {
    title: "Pregnancy Diet",
    desc: "Trimester-based nutrition guide",
    icon: FiCoffee,
    link: "/prdiet",
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    title: "Pregnancy Store",
    desc: "Safe products & essentials",
    icon: FiShoppingBag,
    link: "/cart2",
    bg: "bg-indigo-100",
    color: "text-indigo-600",
  },
  {
    title: "Checkup Reminder",
    desc: "Schedule doctor visits & scans",
    icon: FiCalendar,
    link: "/appointment",
    bg: "bg-green-100",
    color: "text-green-600",
  },
];

const slides = [
  {
    text: "Every tiny kick is a reminder of the miracle growing inside you.",
    image: img1,
  },
  {
    text: "Nurture yourself, nourish your soul, and trust the journey ahead.",
    image: img2,
  },
];

const getCheckupType = (title) => {
  const text = title.toLowerCase();
  if (text.includes("scan") || text.includes("ultrasound")) return "Ultrasound Scan";
  if (text.includes("doctor") || text.includes("checkup")) return "Doctor Checkup";
  if (text.includes("baby")) return "Baby Growth Check";
  return "General Appointment";
};

// Scroll animation hook
const useScrollAnimation = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
};

// Animated section wrapper
const AnimatedSection = ({ children, className = "", delay = 0, direction = "up" }) => {
  const [ref, isVisible] = useScrollAnimation();

  const directionMap = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    scale: "scale(0.85)",
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : directionMap[direction],
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const Home2 = () => {
  const [nextAppointment, setNextAppointment] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;
  const [reportReminder, setReportReminder] = useState(null);

const location = useLocation();
  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 50);
  }, []);
useEffect(() => {
  if (!userId) return;
  const saved = JSON.parse(localStorage.getItem(`report_reminder_${userId}`));
  if (saved) setReportReminder(saved);
}, [userId]);

  useEffect(() => {
    if (!userId) return;
    const saved = JSON.parse(localStorage.getItem(`appointments_${userId}`)) || [];
    if (saved.length === 0) return;
    const sorted = saved.sort((a, b) => new Date(a.date) - new Date(b.date));
    const today = new Date();
    const upcoming = sorted.find((a) => {
      const appointmentDate = new Date(a.date);
      const diffTime = appointmentDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays >= 0 && diffDays <= 3;
    });
    setNextAppointment(upcoming || null);
  }, [userId]);
useEffect(() => {
  const saved = sessionStorage.getItem("homeScroll");

  if (saved) {
    setTimeout(() => {
      window.scrollTo({
        top: parseInt(saved),
        behavior: "auto",
      });
    }, 200); // wait till page fully renders
  }
}, [location]);
useEffect(() => {
  const handleScroll = () => {
    sessionStorage.setItem("homeScroll", window.scrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
  const getCheckupType = (title) => {
    const text = title.toLowerCase();
    if (text.includes("scan") || text.includes("ultrasound")) return "Ultrasound Scan";
    if (text.includes("doctor") || text.includes("checkup")) return "Doctor Checkup";
    if (text.includes("baby")) return "Baby Growth Check";
    return "General Appointment";
  };

  const getDaysLeft = (date) => {
    const today = new Date();
    const appointmentDate = new Date(date);
    const diffTime = appointmentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">

      <style>{`
        /* Page load fade in */
        @keyframes pageFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* Slide in from right */
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(80px); }
          to { opacity: 1; transform: translateX(0); }
        }

        /* Floating blob background */
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -20px) scale(1.05); }
          66% { transform: translate(-15px, 15px) scale(0.97); }
        }

        /* Soft image float */
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        /* Sparkle spin */
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Shimmer on stats */
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        /* Pulse ring */
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        /* Card icon bounce */
        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        /* Gradient shift background */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* Ripple on button */
        @keyframes ripple {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(4); opacity: 0; }
        }

        .page-load {
          animation: pageFadeIn 0.8s ease forwards;
        }

        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.25;
          animation: blobFloat 8s ease-in-out infinite;
          pointer-events: none;
        }

        .blob-1 {
          width: 400px; height: 400px;
          background: #f9a8d4;
          top: -100px; left: -100px;
          animation-delay: 0s;
        }

        .blob-2 {
          width: 300px; height: 300px;
          background: #c4b5fd;
          top: 200px; right: -80px;
          animation-delay: 2s;
        }

        .blob-3 {
          width: 250px; height: 250px;
          background: #fda4af;
          bottom: 100px; left: 30%;
          animation-delay: 4s;
        }

        .float-image {
          animation: floatY 4s ease-in-out infinite;
        }

        .appointment-card {
          animation: slideInRight 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .pulse-dot::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: #e08594;
          animation: pulseRing 1.5s ease-out infinite;
        }

        .stat-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,240,245,0.8));
          backdrop-filter: blur(20px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 24px 48px rgba(224, 133, 148, 0.25);
        }

        .stat-value {
          background: linear-gradient(90deg, #e08594, #c084fc, #e08594);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        .feature-card {
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(224,133,148,0.08), rgba(192,132,252,0.08));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover::before { opacity: 1; }

        .feature-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 28px 50px rgba(224, 133, 148, 0.2);
        }

        .feature-card:hover .card-icon {
          animation: iconBounce 0.6s ease;
        }

        .banner-section {
          background: linear-gradient(135deg, rgba(255,255,255,0.85), rgba(255,228,230,0.6));
          backdrop-filter: blur(20px);
          transition: box-shadow 0.4s ease;
        }

        .banner-section:hover {
          box-shadow: 0 30px 60px rgba(224, 133, 148, 0.2);
        }

        .track-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .track-btn:hover {
          transform: scale(1.06);
          box-shadow: 0 10px 25px rgba(224, 133, 148, 0.4);
        }

        .track-btn::after {
          content: '';
          position: absolute;
          width: 10px; height: 10px;
          background: rgba(255,255,255,0.5);
          border-radius: 50%;
          top: 50%; left: 50%;
          transform: scale(0);
          animation: none;
        }

        .track-btn:active::after {
          animation: ripple 0.5s ease forwards;
        }

        .section-heading {
          position: relative;
          display: inline-block;
        }

        .section-heading::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: linear-gradient(90deg, #e08594, #c084fc);
          border-radius: 2px;
          transition: width 0.6s ease 0.3s;
        }

        .heading-visible .section-heading::after {
          width: 60%;
        }

        .animated-bg {
          background: linear-gradient(270deg, #fce7f3, #f3e8ff, #ffe4e6, #fce7f3);
          background-size: 400% 400%;
          animation: gradientShift 10s ease infinite;
        }

        /* Stagger cards */
        .card-0 { transition-delay: 0ms; }
        .card-1 { transition-delay: 80ms; }
        .card-2 { transition-delay: 160ms; }
        .card-3 { transition-delay: 240ms; }
        .card-4 { transition-delay: 320ms; }
        .card-5 { transition-delay: 400ms; }
      `}</style>

      <Nav2 />

      {/* Background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Floating Appointment Reminder */}
  {nextAppointment && (
  <div className="fixed top-20 right-6 z-50">
    <div className="appointment-card bg-white shadow-xl rounded-2xl px-5 py-4 flex items-center gap-4 border border-pink-100 relative">
      <button
        onClick={() => setNextAppointment(null)}
        className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 text-xs leading-none"
      >
        ✕
      </button>
      <div className="relative w-10 h-10">
        <div className="pulse-dot absolute inset-0 rounded-full" />
        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-lg relative z-10">
          📅
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-[#3f2d2d]">Upcoming Appointment</p>
        <p className="text-xs text-gray-700 font-medium">{getCheckupType(nextAppointment.title)}</p>
        <p className="text-xs text-gray-500">{nextAppointment.title}</p>
        <p className="text-xs text-[#e08594] font-medium">
          {nextAppointment.date} ({getDaysLeft(nextAppointment.date)} days left)
        </p>
      </div>
    </div>
  </div>
)}

{reportReminder && (
  <div className="fixed top-46 right-6 z-50">
    <div className="appointment-card bg-white shadow-xl rounded-2xl px-5 py-4 flex items-center gap-4 border border-pink-100 relative">
      <button
        onClick={() => {
          const storedUser = JSON.parse(localStorage.getItem("user"));
          localStorage.removeItem(`report_reminder_${storedUser?._id}`);
          setReportReminder(null);
        }}
        className="absolute top-2 right-2 text-gray-300 hover:text-gray-500 text-xs leading-none"
      >
        ✕
      </button>
      <div className="relative w-10 h-10 flex-shrink-0">
        <div className="pulse-dot absolute inset-0 rounded-full" />
        <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-lg relative z-10">
          📋
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-[#3f2d2d]">Report Reminder</p>
        <p className="text-xs text-gray-700 font-medium">Blood Report Review</p>
        <p className="text-xs text-gray-500">Check your latest report</p>
        <p className="text-xs text-[#e08594] font-medium">Review before your next visit</p>
      </div>
    </div>
  </div>
)}
      {/* Carousel */}
      <main className="pt-6 px-4 sm:px-6 lg:px-10 relative z-10">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          interval={4000}
        >
          {slides.map((slide, index) => (
            <div key={index}>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center min-h-[70vh] md:min-h-[85vh] md:pl-16 lg:pl-24">

                <div
                  className="text-center md:text-left"
                  style={{
                    opacity: pageLoaded ? 1 : 0,
                    transform: pageLoaded ? "none" : "translateX(-50px)",
                    transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
                  }}
                >
                  <h1 className="text-2xl md:mt-28 mt-32 sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3f2d2d] mb-6 leading-tight">
                    Embrace the Miracle of{" "}
                    <span className="text-[#e08594]">Your Pregnancy Journey</span>
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-[#795e5e]/60 max-w-md mx-auto md:mx-0">
                    {slide.text}
                  </p>
                </div>

                <div
                  style={{
                    opacity: pageLoaded ? 1 : 0,
                    transform: pageLoaded ? "none" : "translateX(50px)",
                    transition: "opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s",
                  }}
                >
                  <img
                    src={slide.image}
                    alt={`slide-${index}`}
                    className="h-[220px] sm:h-[280px] md:h-[320px] lg:h-[380px] object-contain mx-auto w-full float-image"
                  />
                </div>

              </div>
            </div>
          ))}
        </Carousel>
      </main>

      {/* Statistics */}
      <section className="max-w-7xl mt-48 mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          {[
            { value: "2M+", label: "Active Users" },
            { value: "98%", label: "Accuracy Rate" },
            { value: "4.9★", label: "App Rating" },
          ].map((stat, i) => (
            <AnimatedSection key={i} direction="up" delay={i * 120}>
              <div className="stat-card rounded-3xl p-8 shadow-lg">
                <h2 className="text-3xl font-bold stat-value mb-2">{stat.value}</h2>
                <p className="text-[#4b5f66]">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-6 mt-20 mb-20 relative z-10">
        <AnimatedSection direction="up" delay={0}>
          <div className="banner-section rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row items-center gap-10 p-10">

            <AnimatedSection direction="left" delay={150} className="w-full md:w-1/2">
              <img
                src={bannerImg}
                alt="Baby growth"
                className="w-full h-[260px] md:h-[300px] object-contain float-image"
              />
            </AnimatedSection>

            <AnimatedSection direction="right" delay={250} className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#e08594] mb-4">
                Week-by-Week Growth
              </h2>
              <p className="text-[#4b5f66] text-lg mb-4">
                Stay informed about your baby's development and learn what to expect each week.
              </p>
              <Link
                to="/pregnancy"
                className="track-btn inline-block bg-[#e08594] text-white px-6 py-3 rounded-xl font-semibold"
              >
                Track Now
              </Link>
            </AnimatedSection>

          </div>
        </AnimatedSection>
      </section>

      {/* Option Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-20 text-center relative z-10">

        <AnimatedSection direction="up" delay={0}>
          <h1 className="text-4xl font-serif font-semibold text-[#3f2d2d] mb-4">
            Pregnancy Care
          </h1>
          <p className="text-[#8a7f7f] max-w-xl mx-auto">
            A calm space designed to support you through every stage of pregnancy
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {pregnancyCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <AnimatedSection key={index} direction="up" delay={index * 90}>
                <Link to={item.link}>
                  <div className={`feature-card rounded-[28px] p-8 shadow-lg card-${index}`}>
                    <div className={`card-icon mx-auto mb-6 w-16 h-16 flex items-center justify-center rounded-2xl ${item.bg}`}>
                      <Icon className={`${item.color} text-2xl`} />
                    </div>
                    <h3 className="text-lg font-semibold text-[#3f2d2d] mb-2">{item.title}</h3>
                    <p className="text-sm text-[#795e5e]">{item.desc}</p>
                  </div>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default Home2;