import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import im from "../images/love.png";

import {
  FiCalendar,
  FiHeart,
  FiDroplet,
  FiSmile,
  FiShoppingBag as FiShoppingBagIcon,
  FiClock,
} from "react-icons/fi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { getCycle } from "../api/api.js";
// Images
import img1 from "../images/h3.png";
import img2 from "../images/h4.png";
import img3 from "../images/bg3.jfif";
import img4 from "../images/pad.jfif";
import img5 from "../images/tampons.jfif";
import img6 from "../images/hotbag.jfif";
import img7 from "../images/kits.jfif";

// Home cards
const homeCards = [
  { icon: FiCalendar, link: "/period", title: "Period Tracking", desc: "Predict your cycle with accuracy", bg: "bg-pink-100", iconColor: "text-pink-500" },
  { icon: FiSmile, title: "Diet Guide", desc: "Diet guidance", bg: "bg-purple-100", iconColor: "text-purple-500", link: "/diet" },
  { icon: FiDroplet, title: "Water Tracker", link: "/water", desc: "Stay hydrated every day", bg: "bg-green-100", iconColor: "text-green-500" },
  { icon: FiShoppingBagIcon, title: "Wellness Store", link: "/cart", desc: "Quality products for you", bg: "bg-orange-100", iconColor: "text-orange-500" },
  { icon: FiHeart, title: "Mood Tracker", link: "/tracker", desc: "Understand your emotional rhythm", bg: "bg-rose-100", iconColor: "text-rose-500" },
  { icon: FiClock, title: "Period Delay Finder", link: "/delay", desc: "Explore possible cycle delays", bg: "bg-indigo-100", iconColor: "text-indigo-500" },
];

// Products
const products = [
  { id: 1, img: img4, title: "Sanitary Pads", desc: "Soft, breathable pads for all-day comfort and protection.", price: "$5.99", oldPrice: "$7.99", offer: "25% OFF", rating: 4.6, reviews: 320 },
  { id: 2, img: img5, title: "Tampons", desc: "Comfortable internal protection with high absorbency.", price: "$6.99", oldPrice: "$8.99", offer: "20% OFF", rating: 4.4, reviews: 210 },
  { id: 3, img: img6, title: "Hot Bag", desc: "Soothing heat relief for cramps and muscle pain.", price: "$12.99", oldPrice: "$15.99", offer: "18% OFF", rating: 4.7, reviews: 180 },
  { id: 4, img: img7, title: "Period Kit", desc: "All-in-one essentials for stress-free period care.", price: "$18.99", oldPrice: "$22.99", offer: "17% OFF", rating: 4.8, reviews: 95 },
];

// Carousel slides
const slides = [
  { text: "Your cycle is not a flaw, it’s a rhythm your body knows by heart.", image: img1 },
  { text: "Every phase carries its own strength. Honor it, nurture it, trust it.", image: img2 },
];

const Home = () => {
  const [showReminder, setShowReminder] = useState(false);
const [daysToPeriod, setDaysToPeriod] = useState(null);
const [reminderMessage, setReminderMessage] = useState("");
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser?._id) return;

  const fetchCycle = async () => {
    try {
      const res = await getCycle(storedUser._id);
      const data = res.data.cycle;
      if (!data) return;

      const today = new Date();
      const safeLastPeriod = new Date(data.lastPeriodStart);
      const nextPeriodDate = new Date(
        safeLastPeriod.getTime() + data.cycleLength * 24 * 60 * 60 * 1000
      );

      const diff = Math.ceil(
        (nextPeriodDate - today) / (1000 * 60 * 60 * 24)
      );
      

      setDaysToPeriod(diff);

        if (diff <= 5 && diff > 2) {
          setReminderMessage("Your period is approaching ");
        } else if (diff <= 2 && diff > 0) {
          setReminderMessage("Almost here. Take care 💗");
        } else if (diff === 0) {
          setReminderMessage("Your period may start today 🩸");
        } else {
          setReminderMessage("");
        }
      } catch (err) {
        console.log("Cycle fetch failed", err);
      }
    };


  fetchCycle();
}, []);
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Nav />

      {/* Carousel */}
      <main className="pt-6 px-4 sm:px-6 md:px-10">
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
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center min-h-[70vh] md:min-h-[90vh]">
                
                <div className="text-center md:text-left px-2">
                  <span className="inline-block mb-4 mt-8 px-4 py-1 rounded-full bg-pink-100 text-[#e58a95] text-sm font-medium">
                    Your wellness companion
                  </span>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3f2d2d] mb-6 leading-tight">
                    Embrace Every Phase of{" "}
                    <span className="text-[#e08594]">
                      Your Wellness Journey
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-[#795e5e]/60 max-w-md mx-auto md:mx-0">
                    {slide.text}
                  </p>
                </div>

                <img
                  src={slide.image}
                  alt={`slide-${index}`}
                  className="h-[240px] sm:h-[300px] md:h-[350px] lg:h-[380px] object-contain mx-auto w-full"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </main>
       {/* Glass Reminder Section */}
      {daysToPeriod !== null &&
        daysToPeriod <= 5 &&
        daysToPeriod >= 0 && (
          <section className="w-full flex justify-center mt-20 ">
<div className="w-full max-w-7xl 
  bg-white/30 backdrop-blur-2xl 
  border border-white/40 
  rounded-3xl mb-32
  px-10 h-[180px] 
  shadow-[0_30px_80px_rgba(0,0,0,0.15)] 
  relative overflow-hidden 
  flex items-center">
              {/* Glow blobs */}
              <div className="absolute -top-12 -right-12 w-52 h-52 
                bg-pink-300 rounded-full blur-3xl opacity-30"></div>

              <div className="absolute -bottom-12 -left-12 w-52 h-52 
                bg-purple-300 rounded-full blur-3xl opacity-30"></div>

<div className="relative z-10 flex w-full items-center">  <div className="flex-1">

  {/* Line 1: Image + Title (No Bottom Gap) */}
  <div className="flex items-center gap-2">
    <img
      src={im}
      alt="love"
      className="w-10 h-10 object-contain"
    />
    <h2 className="text-3xl font-bold text-[#e08594] leading-none">
      Cycle Reminder
    </h2>
  </div>

  {/* Line 2: Message (small top margin + slight left padding) */}
  <p className="text-gray-700 text-lg mt-2 pl-16">
    {reminderMessage}
  </p>

  {/* Line 3: Remaining text directly below */}
  <p className="text-sm text-gray-600 mt-1 pl-16">
    {daysToPeriod} day
    {daysToPeriod !== 1 && "s"} remaining
  </p>

</div>

  {/* RIGHT SIDE DAYS CARD */}
  <div className="bg-white/40 backdrop-blur-md 
    border border-white/50 
    px-10 py-6 rounded-2xl 
    shadow-xl text-center h-fit">

    <div className="text-4xl font-bold text-[#e08594]">
      {daysToPeriod}
    </div>
    <div className="text-xs text-gray-600 mt-1">
      DAYS LEFT
    </div>

                </div>

              </div>
            </div>
          </section>
        )}
      
      {/* Statistics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 text-center">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e08594] mb-2">
              2M+
            </h2>
            <p className="text-[#4b5f66] text-base sm:text-lg">
              Active Users
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e08594] mb-2">
              98%
            </h2>
            <p className="text-[#4b5f66] text-base sm:text-lg">
              Accuracy Rate
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e08594] mb-2">
              4.9★
            </h2>
            <p className="text-[#4b5f66] text-base sm:text-lg">
              App Rating
            </p>
          </div>
        </div>
      </section>



      {/* Home Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 sm:mt-24 lg:mt-32 mb-16 sm:mb-24 lg:mb-32 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight text-[#3f2d2d] mb-6">
          Your Wellness,{" "}
          <span className="text-[#e08594]">Thoughtfully Curated</span>
        </h2>

        <p className="mt-2 text-[#b9aeae] max-w-xl mx-auto text-base leading-relaxed">
          A gentle collection of tools designed to support your body, mind, and rhythm at every phase.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-12">
          {homeCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} to={item.link} className="group">
                <div className="bg-white rounded-[28px] p-8 sm:p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(224,133,148,0.18)]">
                  <div className={`mx-auto mb-6 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl ${item.bg}`}>
                    <Icon className={`${item.iconColor} text-xl sm:text-2xl`} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#3f2d2d] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#795e5e] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-20">
        <div className="relative h-[250px] sm:h-[300px] md:h-[350px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={img3}
            alt="Wellness banner"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          />
          <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
            <div className="max-w-xl">
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-[#e08594]">
                Strong in Silence, Gentle by Choice
              </h1>
              <p className="text-[#4b5f66] text-sm sm:text-base md:text-lg leading-relaxed italic">
                “Every phase you move through is a reminder of your strength, your balance, and your beautiful resilience.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-start text-[#e08594] mb-10 sm:mb-14">
          Period Wellness Essentials
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
          {products.map((item) => (
            <div
              key={item.id}
              className="relative bg-white/70 backdrop-blur-xl rounded-3xl border border-white/60 shadow-[0_25px_60px_rgba(180,83,106,0.18)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_35px_80px_rgba(180,83,106,0.26)]"
            >
              <span className="absolute top-4 left-4 bg-[#ec6f88] text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                {item.offer}
              </span>

              <img
                src={item.img}
                alt={item.title}
                className="w-full h-52 sm:h-56 object-cover"
              />

              <div className="p-5 sm:p-6 space-y-2">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>

                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={14}
                      className={i < Math.round(item.rating) ? "" : "text-gray-300"}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-lg sm:text-xl font-bold text-black">
                    {item.price}
                  </span>
                  <span className="text-sm line-through text-gray-400">
                    {item.oldPrice}
                  </span>
                </div>

                <button className="w-full bg-[#051a2f] text-white px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(217,76,106,0.35)] transition-all duration-300 hover:shadow-[0_14px_40px_rgba(217,76,106,0.45)] hover:scale-[1.02]">
                  <MdOutlineShoppingBag className="text-xl" /> Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;