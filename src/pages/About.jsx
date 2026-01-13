import React from "react";
import { FaCalendarAlt, FaHeart, FaBell, FaShieldAlt } from "react-icons/fa";
import Nav from "./Nav";
import Footer from "./Footer";
import imgg from '../images/about.png'
const About = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#f6e7f0] via-[#f4f1fb] to-[#fff1e6] text-[#2b2f42]">
      <Nav />

      {/* 🌷 HERO SECTION */}
      <section className="ml-[120px] max-w-7xl mx-auto px-6 pt-28 pb-28 grid md:grid-cols-2 gap-16 items-center">

  {/* Left Content */}
  <div className="relative">

    {/* Soft glass badge */}
    <span className="inline-flex items-center mb-8 px-6 py-2 rounded-full 
      bg-white/50 backdrop-blur-lg 
      border border-white/40 
      text-sm font-medium tracking-wide text-[#6b4b4b]
      shadow-sm">
      Your wellness companion
    </span>

    {/* Heading */}
    <h1 className="text-[34px] md:text-[42px] lg:text-[52px] 
      font-semibold leading-[1.15] text-[#3f2d2d] tracking-tight">
      Understanding your cycle,
      <br />
      <span className="text-[#e08594] font-semibold">
        one day at a time
      </span>
    </h1>



          <p className="mt-6 text-gray-600 max-w-lg mb-3">
  Our period tracker helps you understand your body with clarity and care.
  Track cycles, moods, symptoms, and wellness patterns so you feel informed,
  confident, and supported every single day.<br></br></p>
  <span className="mt-4 text-gray-600 max-w-lg"> By gently observing your natural
  rhythms, the app empowers you to anticipate changes, manage discomfort, and
  make mindful choices for your health. It’s not just about tracking dates,
  it’s about building a deeper connection with your body and creating a
  balanced, stress-free approach to menstrual wellness.
  </span>

<p className="mt-4 text-gray-600 max-w-lg">
  Designed with privacy, simplicity, and compassion at its core, our app
  creates a safe space where your personal health data stays truly yours.
  Gentle reminders, intuitive insights, and a soothing interface make daily
  tracking feel effortless and reassuring. Whether you’re planning ahead,
  listening to your mood shifts, or simply checking in with yourself, we’re
  here to support you at every stage of your cycle.
</p>


          <div className="mt-8 flex gap-4">
            <button                 style={{ backgroundColor: "rgba(224, 133, 148, 1)" }}

            className="px-6 py-3 rounded-full bg-[#e08594] text-white font-medium hover:scale-105 transition">
              Start Tracking
            </button>
          </div>
        </div>

        {/* Right Illustration Placeholder */}
          <img
            src={imgg}
            alt="Cycle illustration"
            className="ml-20 rounded- w-[400px] h-[600px]"
          />
      </section>

      {/* ✨ FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 -mt-10">
        {[
          {
            icon: <FaCalendarAlt />,
            title: "Simple Tracking",
            desc: "Log periods and cycles effortlessly without overwhelming details.",
          },
          {
            icon: <FaHeart />,
            title: "Mood Awareness",
            desc: "Understand emotional patterns and how your cycle affects them.",
          },
          {
            icon: <FaBell />,
            title: "Gentle Reminders",
            desc: "Soft notifications to help you stay prepared and relaxed.",
          },
          {
            icon: <FaShieldAlt />,
            title: "Privacy First",
            desc: "Your data stays private, secure, and always under your control.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/50 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
          >
            <div className="w-12 h-12 rounded-full bg-[#f3d1dc] text-[#e08594] flex items-center justify-center text-xl mb-4">
              {item.icon}
            </div>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 🌙 MISSION SECTION */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold">
          Your Body Speaks.{" "}
          <span className="text-[#e08594]">We Help You Listen.</span>
        </h2>

        <p className="mt-6 text-gray-600">
          We believe periods shouldn’t be confusing or stressful. Our mission is
          to create a safe, inclusive space where you can connect with your
          body, understand its rhythms, and take control of your wellness
          without judgment or pressure.
        </p>

        <button className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-[#e08594] to-[#cdb4db] text-white font-medium hover:scale-105 transition">
          Begin Your Journey →
        </button>
      </section>

      <Footer />
    </div>
  );
};

export default About;
