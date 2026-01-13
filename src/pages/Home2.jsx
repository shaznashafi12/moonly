import React from "react";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiFileText,
  FiShoppingBag,
  FiHeart,
  FiCheckSquare,
  FiCoffee,
} from "react-icons/fi";
import Footer from "./Footer";
import img1 from '../images/prr.png';
import img2 from '../images/ch.png';
import bannerImg from '../images/bb.png'; // Add a banner image
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Nav2 from "./Nav2";

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
  // {
  //   title: "Kick Counter",
  //   desc: "Track baby movements daily",
  //   icon: FiHeart,
  //   link: "/pregnancy/kicks",
  //   bg: "bg-red-100",
  //   color: "text-red-600",
  // },
  {
    title: "Pregnancy Store",
    desc: "Safe products & essentials",
    icon: FiShoppingBag,
    link: "/cart2",
    bg: "bg-indigo-100",
    color: "text-indigo-600",
  },
];

const slides = [
  { text: "Every tiny kick is a reminder of the miracle growing inside you.", image: img1 },
  { text: "Nurture yourself, nourish your soul, and trust the journey ahead.", image: img2 },
];

const Home2 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Nav2 />

      {/* Carousel */}
      <main className="pt-4 ml-32">
        <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} interval={4000}>
          {slides.map((slide, index) => (
            <div key={index}>
              <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-14 items-center min-h-[90vh]">
                <div className="text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold text-[#3f2d2d] mb-6 leading-tight">
                    Embrace the Miracle of <span className="text-[#e08594]">Your Pregnancy Journey</span>
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

      {/* Banner Section */}
     
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
 <section className="max-w-7xl w-[1300px] mx-auto px-6 mt-20 mb-20">
        <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row items-center gap-6 p-10">
          <img
            src={bannerImg}
            alt="Baby growth illustration"
            className="w-[100px] -ml-20 md:w-1/2 h-[300px] object-contain"
          />
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#e08594] mb-4">
              Week-by-Week Growth
            </h2>
            <p className="text-[#4b5f66] text-lg md:text-xl mb-4">
              Stay informed about your baby's development and learn what to expect each week.
            </p>
            <Link
              to="/pregnancy/tracker"
              className="inline-block bg-[#e08594] text-white px-6 py-3 rounded-xl font-semibold hover:scale-105 transition-transform duration-300"
            >
              Track Now
            </Link>
          </div>
        </div>
      </section>

      {/* Option Cards */}
      <section className="max-w-7xl mx-auto px-6 pt-28 pb-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-semibold text-[#3f2d2d] mb-4">
          Pregnancy Care
        </h1>
        <p className="text-[#8a7f7f] max-w-xl mx-auto">
          A calm space designed to support you through every stage of pregnancy
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {pregnancyCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link key={index} to={item.link} className="group">
                <div className="bg-white rounded-[28px] p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(224,133,148,0.18)]">
                  <div className={`mx-auto mb-7 w-16 h-16 flex items-center justify-center rounded-2xl ${item.bg}`}>
                    <Icon className={`${item.color} text-2xl`} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#3f2d2d] mb-2">{item.title}</h3>
                  <p className="text-sm text-[#795e5e] leading-relaxed">{item.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home2;
