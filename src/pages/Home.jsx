import React from "react";
import { Link } from "react-router-dom";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdOutlineShoppingBag } from "react-icons/md";
import {
  FiCalendar,
  FiHeart,
  FiDroplet,
  FiSmile,
  FiShoppingBag as FiShoppingBagIcon,
  FiClock,
} from "react-icons/fi";

// Images
import img1 from "../images/h3.png";
import img2 from "../images/h4.png";
import img3 from "../images/bg3.jfif";
import img4 from "../images/pad.jfif";
import img5 from "../images/tampons.jfif";
import img6 from "../images/hotbag.jfif";
import img7 from "../images/kits.jfif";
import Footer from "./Footer";
import Nav from "./Nav";

// Home cards
const homeCards = [
  { icon: FiCalendar,    link: "/period",   
 title: "Period Tracking",  desc: "Predict your cycle with accuracy", bg: "bg-pink-100", iconColor: "text-pink-500" },
  { icon: FiSmile, title: "Diet Guide ", desc: "diet guidance", bg: "bg-purple-100", iconColor: "text-purple-500",link:"/diet" },
  { icon: FiDroplet, title: "Water Tracker",link: "/water", desc: "Stay hydrated every day", bg: "bg-green-100", iconColor: "text-green-500" },
  { icon: FiShoppingBagIcon, title: "Wellness Store",link:"/cart", desc: "Quality products for you", bg: "bg-orange-100", iconColor: "text-orange-500" },
  { icon: FiHeart, title: "Mood Tracker",link:"/tracker", desc: "Understand your emotional rhythm", bg: "bg-rose-100", iconColor: "text-rose-500" },
  { icon: FiClock, title: "Period Delay Finder",link:"/delay", desc: "Explore possible cycle delays", bg: "bg-indigo-100", iconColor: "text-indigo-500" },
];

// Products
const products = [
  { img: img4, title: "Sanitary Pads", desc: "Soft, breathable pads for all-day comfort and protection.", price: "$5.99", originalPrice: "$7.99", offer: "25% OFF", rating: 4.6, reviews: 320 },
  { img: img5, title: "Tampons", desc: "Comfortable internal protection with high absorbency.", price: "$6.99", originalPrice: "$8.99", offer: "20% OFF", rating: 4.4, reviews: 210 },
  { img: img6, title: "Hot Bag", desc: "Soothing heat relief for cramps and muscle pain.", price: "$12.99", originalPrice: "$15.99", offer: "18% OFF", rating: 4.7, reviews: 180 },
  { img: img7, title: "Period Kit", desc: "All-in-one essentials for stress-free period care.", price: "$18.99", originalPrice: "$22.99", offer: "17% OFF", rating: 4.8, reviews: 95 },
];

// Carousel slides (HEIGHT FIXED)
const slides = [
  { text: "Your cycle is not a flaw, it’s a rhythm your body knows by heart.", image: img1 },
  { text: "Every phase carries its own strength. Honor it, nurture it, trust it.", image: img2 },
];

const Home = () => {
  return (

    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
    <Nav/>      


      <main className="pt-4 ml-32">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} interval={4000}>
          {slides.map((slide, index) => (
            <div key={index}>
              <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center min-h-[90vh]">
                <div className="text-center md:text-left">
                  <span className="inline-block mb-5 px-4 py-1 rounded-full bg-pink-100 text-[#e58a95] text-sm font-medium">
                    Your wellness companion
                  </span>
                  <h1 className="text-4xl md:text-5xl font-bold text-[#3f2d2d] mb-6 leading-tight">
                    Embrace Every Phase of <span className="text-[#e08594]">Your Wellness Journey</span>
                  </h1>
                  <p className="text-lg md:text-xl text-[#795e5e]/60 max-w-md">
                    {slide.text}
                  </p>
                </div>
                <img
                  src={slide.image}
                  alt={`slide-${index}`}
                  className="h-[350px] lg:h-[380px] object-contain mx-auto"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </main>
        
      {/* Statistics / Metrics Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-[#e08594] mb-2">2M+</h2>
            <p className="text-[#4b5f66] text-lg">Active Users</p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-[#e08594] mb-2">98%</h2>
            <p className="text-[#4b5f66] text-lg">Accuracy Rate</p>
          </div>
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-[#e08594] mb-2">4.9★</h2>
            <p className="text-[#4b5f66] text-lg">App Rating</p>
          </div>
        </div>
      </section>

      {/* Home Cards */}
     <section className="max-w-7xl mx-auto px-6 mt-32 mb-32 text-center">
  <h2 className="text-4xl md:text-5xl font-serif font-semibold tracking-tight text-[#3f2d2d] mb-6">
    Your Wellness,{" "}
    <span className="text-[#e08594]">Thoughtfully Curated</span>
  </h2>

  <p className="mt-2 text-[#b9aeae] max-w-xl mx-auto text-base leading-relaxed">
    A gentle collection of tools designed to support your body, mind, and rhythm
    at every phase.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
    {homeCards.map((item, index) => {
      const Icon = item.icon;

      return (
        <Link
          key={index}
          to={item.link}
          className="group"
        >
          <div className="bg-white rounded-[28px] p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(224,133,148,0.18)]">
            
            <div
              className={`mx-auto mb-7 w-16 h-16 flex items-center justify-center rounded-2xl ${item.bg}`}
            >
              <Icon className={`${item.iconColor} text-2xl`} />
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
      <section className="max-w-7xl mx-auto px-6 mt-20">
        <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-lg">
          <img src={img3} alt="Wellness banner" className="absolute inset-0 w-full h-full object-cover rounded-3xl mb-10" style={{ boxShadow: '0 0 20px 5px rgba(0,0,0,0.3)' }} />
          <div className="relative z-10 flex items-center justify-center h-full text-center px-6">
            <div className="max-w-xl">
<h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-[#e08594] text-center">
  Strong in Silence, Gentle by Choice
</h1>
              <p className="text-[#4b5f66] text-base md:text-lg leading-relaxed italic">
                “Every phase you move through is a reminder of your strength, your balance, and your beautiful resilience.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
    <section className="max-w-7xl mx-auto px-6 py-20">
  <h2 className="text-3xl md:text-4xl font-bold text-start text-[#e08594] mb-14">
    Period Wellness Essentials
  </h2>

  <div
    className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-10
    "
  >
    {products.map((item, index) => (
      <div
        key={index}
        className="
          relative
          bg-white/70 backdrop-blur-xl
          rounded-3xl
          border border-white/60
          shadow-[0_25px_60px_rgba(180,83,106,0.18)]
          overflow-hidden
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[0_35px_80px_rgba(180,83,106,0.26)]
        "
      >
        {/* Offer Badge */}
        <span className="absolute top-4 left-4 bg-[#ec6f88] text-white text-xs font-medium px-3 py-1 rounded-full shadow">
          {item.offer}
        </span>

        {/* Product Image */}
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-56 object-cover"
        />

        {/* Content */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-[#3f3439] mb-1">
            {item.title}
          </h3>

          <div className="flex items-center gap-2 text-sm text-[#7a6a72] mb-3">
            <span className="text-yellow-500">★★★★★</span>
            <span>
              {item.rating} • {item.reviews} reviews
            </span>
          </div>

          <p className="text-sm text-[#6b5b63] leading-relaxed mb-4">
            {item.desc}
          </p>

          <div className="flex items-center gap-3 mb-5">
            <span className="text-xl font-bold text-[#070707]">
              {item.price}
            </span>
            <span className="text-sm line-through text-[#a8a0a4]">
              {item.originalPrice}
            </span>
          </div>

          <button
            // style={{ backgroundColor: "rgba(224, 133, 148, 1)" }}
            className="
              w-full bg-[#051a2f]
              text-white
              px-4 py-3
              rounded-xl
              font-medium
              flex items-center justify-center gap-2
              shadow-[0_10px_30px_rgba(217,76,106,0.35)]
              transition-all duration-300
              hover:shadow-[0_14px_40px_rgba(217,76,106,0.45)]
              hover:scale-[1.02]
            "
          >
            <MdOutlineShoppingBag className="text-xl" />
            Add to Bag
          </button>
        </div>
      </div>
    ))}
  </div>
</section>


    <Footer/>

    </div>
  );
};

export default Home;
