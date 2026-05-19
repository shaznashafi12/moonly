import { Link, useNavigate } from "react-router-dom";
import { MdOutlineShoppingBag } from "react-icons/md";
import im from "../images/love.png";
import { getProducts } from "../api/api.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer.jsx";
import Nav from "./Nav.jsx";
import { getCycle } from "../api/api.js";

import img1 from "../images/h3.png";
import img2 from "../images/h4.png";
import img3 from "../images/bg3.jfif";

// ── Animation Styles ──────────────────────────────────────────
const animationStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-30px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes floatBadge {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-5px); }
  }
  @keyframes pulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(224,133,148,0.4); }
    70%  { box-shadow: 0 0 0 10px rgba(224,133,148,0); }
    100% { box-shadow: 0 0 0 0 rgba(224,133,148,0); }
  }
  @keyframes shimmerStat {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes cardEntrance {
    from { opacity: 0; transform: translateY(24px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes reminderPop {
    0%   { opacity: 0; transform: translateX(40px) scale(0.9); }
    60%  { transform: translateX(-6px) scale(1.02); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
  }
  @keyframes productSlideUp {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ✅ 3D ANIMATIONS */
  @keyframes flip3d {
    0%   { transform: rotateY(0deg) rotateX(5deg); }
    50%  { transform: rotateY(180deg) rotateX(-5deg); }
    100% { transform: rotateY(360deg) rotateX(5deg); }
  }

  @keyframes float3d {
    0%, 100% { transform: translateY(0px) rotateX(2deg) rotateZ(1deg); }
    50%      { transform: translateY(-12px) rotateX(-2deg) rotateZ(-1deg); }
  }

  @keyframes tilt3d {
    0%, 100% { transform: perspective(1200px) rotateX(0deg) rotateY(0deg); }
    50%      { transform: perspective(1200px) rotateX(3deg) rotateY(5deg); }
  }

  @keyframes glow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(224,133,148,0.3), inset 0 0 20px rgba(224,133,148,0.1);
    }
    50% { 
      box-shadow: 0 0 40px rgba(224,133,148,0.6), inset 0 0 30px rgba(224,133,148,0.2);
    }
  }

  @keyframes slideInRotate {
    from {
      opacity: 0;
      transform: translateX(-40px) rotateY(-25deg) translateZ(0);
    }
    to {
      opacity: 1;
      transform: translateX(0) rotateY(0deg) translateZ(0);
    }
  }

  @keyframes slideInScale {
    from {
      opacity: 0;
      transform: scale(0.85) translateY(20px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes shimmer3d {
    0% {
      background-position: -200% center;
      transform: skewX(-5deg);
    }
    50% {
      transform: skewX(0deg);
    }
    100% {
      background-position: 200% center;
      transform: skewX(5deg);
    }
  }

  .anim-fade-up     { opacity: 0; }
  .anim-fade-in     { opacity: 0; }
  .anim-slide-right { opacity: 0; }
  .anim-scale-in    { opacity: 0; }

  .is-visible.anim-fade-up {
    animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .is-visible.anim-fade-in {
    animation: fadeIn 0.6s ease forwards;
  }
  .is-visible.anim-slide-right {
    animation: slideRight 0.65s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .is-visible.anim-scale-in {
    animation: scaleIn 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  .stagger-1 { animation-delay: 0.05s !important; }
  .stagger-2 { animation-delay: 0.12s !important; }
  .stagger-3 { animation-delay: 0.19s !important; }
  .stagger-4 { animation-delay: 0.26s !important; }
  .stagger-5 { animation-delay: 0.33s !important; }
  .stagger-6 { animation-delay: 0.40s !important; }

  .float-badge {
    animation: floatBadge 3s ease-in-out infinite;
  }

  .pulse-ring {
    animation: pulseRing 2.2s ease-out infinite;
  }

  .shimmer-num {
    background: linear-gradient(90deg, #e08594 0%, #c96879 30%, #b97cc4 60%, #e08594 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer3d 4s linear infinite;
  }

  .reminder-pop {
    animation: reminderPop 0.55s cubic-bezier(0.22,1,0.36,1) forwards;
  }

  .home-card-hover {
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.35s cubic-bezier(0.22,1,0.36,1);
    perspective: 1200px;
  }
  .home-card-hover:hover {
    transform: translateY(-8px) scale(1.02) rotateX(3deg);
    box-shadow: 0 24px 60px rgba(224,133,148,0.28), 0 0 30px rgba(224,133,148,0.15);
  }

  .product-card-hover {
    transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.35s ease;
    perspective: 1200px;
  }
  .product-card-hover:hover {
    transform: translateY(-8px) rotateX(2deg);
    box-shadow: 0 25px 55px rgba(224,133,148,0.25), 0 0 25px rgba(224,133,148,0.12);
  }

  .icon-spin {
    transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
  }
  .home-card-hover:hover .icon-spin {
    animation: flip3d 0.8s cubic-bezier(0.22,1,0.36,1);
  }

  .cart-btn {
    transition: background 0.3s cubic-bezier(0.22,1,0.36,1), 
                transform 0.25s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.3s;
  }
  .cart-btn:hover {
    background: #1a3a5c !important;
    transform: scale(1.05) translateY(-2px);
    box-shadow: 0 10px 25px rgba(5, 26, 47, 0.3);
  }
  .cart-btn:active {
    transform: scale(0.98) translateY(0px);
  }

  .stat-card-anim {
    opacity: 0;
    perspective: 1200px;
  }
  .stat-card-anim.is-visible {
    animation: cardEntrance 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
  }
  .stat-card-anim:hover {
    animation: tilt3d 0.6s ease-in-out infinite;
  }

  .card-3d {
    perspective: 1200px;
    transform-style: preserve-3d;
  }
  .card-3d:hover {
    animation: float3d 2s ease-in-out infinite;
  }

  .stat-glow:hover {
    animation: glow 2s ease-in-out infinite;
  }

  .carousel-text {
    animation: slideInRotate 0.9s cubic-bezier(0.22,1,0.36,1) both;
  }
  .carousel-img {
    animation: slideInScale 0.85s cubic-bezier(0.22,1,0.36,1) both;
  }

  @media (max-width: 768px) {
    main.carousel-section {
      padding-top: 1rem !important;
      padding-bottom: 0.5rem !important;
    }
    section.stats-section {
      padding-top: 0.5rem !important;
      padding-bottom: 0.5rem !important;
    }
    section.cards-section {
      margin-top: -0.5rem !important;
    }
  }
`;

function useScrollReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const homeCards = [
  { icon: FiCalendar, link: "/period", title: "Period Tracking", desc: "Predict your cycle with accuracy", bg: "bg-pink-100", iconColor: "text-pink-500" },
  { icon: FiSmile, title: "Diet Guide", desc: "Diet guidance", bg: "bg-purple-100", iconColor: "text-purple-500", link: "/diet" },
  { icon: FiDroplet, title: "Water Tracker", link: "/water", desc: "Stay hydrated every day", bg: "bg-green-100", iconColor: "text-green-500" },
  { icon: FiShoppingBagIcon, title: "Wellness Store", link: "/cart", desc: "Quality products for you", bg: "bg-orange-100", iconColor: "text-orange-500" },
  { icon: FiHeart, title: "Mood Tracker", link: "/tracker", desc: "Understand your emotional rhythm", bg: "bg-rose-100", iconColor: "text-rose-500" },
  { icon: FiClock, title: "Period Delay Finder", link: "/delay", desc: "Explore possible cycle delays", bg: "bg-indigo-100", iconColor: "text-indigo-500" },
];

const slides = [
  { text: "Your cycle is not a flaw, it's a rhythm your body knows by heart.", image: img1 },
  { text: "Every phase carries its own strength. Honor it, nurture it, trust it.", image: img2 },
];

const Reveal = ({ children, className = "", delay = 0, animClass = "anim-fade-up" }) => {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`${animClass} ${className}`}
      style={delay ? { animationDelay: `${delay}s` } : {}}
    >
      {children}
    </div>
  );
};

const Home = () => {
  const [showReminder, setShowReminder] = useState(false);
  const [daysToPeriod, setDaysToPeriod] = useState(null);
  const [reminderMessage, setReminderMessage] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const statsRef = useScrollReveal();
  const cardsHeadRef = useScrollReveal();
  const productsHeadRef = useScrollReveal();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        const periodProducts = res.data.filter(
          (item) => item.category?.toLowerCase().includes("period")
        );
        setProducts(periodProducts);
      } catch (error) {
        console.log("Product fetch error:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart_periods")) || [];
    const index = cart.findIndex((item) => item._id === product._id);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart_periods", JSON.stringify(cart));
    toast.success("Product added to cart 🛒");
  };

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
        const diff = Math.ceil((nextPeriodDate - today) / (1000 * 60 * 60 * 24));
        setDaysToPeriod(diff);
        if (diff <= 5 && diff > 2) setReminderMessage("Your period is approaching");
        else if (diff <= 2 && diff > 0) setReminderMessage("Almost here. Take care 💗");
        else if (diff === 0) setReminderMessage("Your period may start today 🩸");
      } catch (err) {
        console.log("Cycle fetch failed", err);
      }
    };
    fetchCycle();
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <style>{animationStyles}</style>

      <Nav />

      {/* ✅ CAROUSEL — REDUCED SPACING ON MOBILE */}
      <main className="carousel-section pt-2 sm:pt-6 px-4 sm:px-6 lg:px-10 pb-0 sm:pb-6">
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
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 md:gap-14 items-center min-h-[50vh] sm:min-h-[70vh] md:min-h-[85vh] md:pl-16 lg:pl-24">

                {/* Text */}
                <div
                  className="carousel-text text-center md:text-left px-2 py-2 sm:py-0"
                  style={{ animation: "slideRight 0.7s cubic-bezier(0.22,1,0.36,1) both" }}
                >
                  <span className="inline-block  mb-3 sm:mb-4 mt-52 sm:mt-8 px-4 py-1 rounded-full bg-pink-100 text-[#e58a95] text-xs sm:text-sm font-medium float-badge">
                    Your wellness companion
                  </span>

                  <h1
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#3f2d2d] mb-4 sm:mb-6 leading-tight"
                    style={{ animation: "fadeUp 0.8s 0.15s cubic-bezier(0.22,1,0.36,1) both" }}
                  >
                    Embrace Every Phase of{" "}
                    <span className="text-[#e08594]">Your Wellness Journey</span>
                  </h1>

                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl text-[#795e5e]/60 max-w-md mx-auto md:mx-0 leading-relaxed"
                    style={{ animation: "fadeUp 0.8s 0.28s cubic-bezier(0.22,1,0.36,1) both" }}
                  >
                    {slide.text}
                  </p>
                </div>

                {/* Image */}
                <img
                  src={slide.image}
                  alt={`slide-${index}`}
                  className="carousel-img h-[180px] sm:h-[240px] md:h-[300px] lg:h-[380px] object-contain mx-auto w-full"
                  style={{ animation: "scaleIn 0.85s 0.1s cubic-bezier(0.22,1,0.36,1) both" }}
                />
              </div>
            </div>
          ))}
        </Carousel>
      </main>

      {/* ✅ CYCLE REMINDER */}
      {daysToPeriod !== null && daysToPeriod <= 5 && daysToPeriod >= 0 && (
        <div className="fixed top-20 right-4 z-50 reminder-pop px-2">
          <div className="flex items-center gap-3 sm:gap-4 bg-white/90 backdrop-blur-xl border border-gray-200 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.15)] pulse-ring">
            <img src={im} alt="love" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            <div>
              <h3 className="font-semibold text-[#e08594] text-base sm:text-lg">Cycle Reminder</h3>
              <p className="text-xs sm:text-sm text-gray-600">{reminderMessage}</p>
              <p className="text-xs text-gray-500">
                {daysToPeriod} day{daysToPeriod !== 1 && "s"} remaining
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ✅ STATISTICS — WITH 3D HOVER */}
      <section className="stats-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 text-center">
          {[
            { value: "2M+", label: "Active Users" },
            { value: "98%", label: "Accuracy Rate" },
            { value: "4.9★", label: "App Rating" },
          ].map((stat, i) => (
            <div
              key={i}
              className="stat-card-anim stat-glow card-3d bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-lg"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 shimmer-num">
                {stat.value}
              </h2>
              <p className="text-[#4b5f66] text-base sm:text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ HOME CARDS — REDUCED TOP MARGIN */}
      <section className="cards-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 sm:mt-4 lg:mt-6 mb-16 sm:mb-24 lg:mb-32 text-center">
        <div ref={cardsHeadRef} className="anim-fade-up">
          <h2 className="text-2xl  sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold tracking-tight text-[#3f2d2d] mb-6">
            Your Wellness,{" "}
            <span className="text-[#e08594]">Thoughtfully Curated</span>
          </h2>
          <p className="mt-2 text-[#b9aeae] max-w-xl mx-auto text-base leading-relaxed">
            A gentle collection of tools designed to support your body, mind, and rhythm at every phase.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mt-10 sm:mt-12">
          {homeCards.map((item, index) => {
            const Icon = item.icon;
            return (
              <CardReveal key={index} delay={index * 0.07}>
                <Link to={item.link} className="group block h-full">
                  <div className="home-card-hover card-3d bg-white rounded-[28px] p-6 sm:p-8 lg:p-10 text-center shadow-[0_10px_40px_rgba(0,0,0,0.03)] h-full">
                    <div className={`mx-auto mb-4 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center rounded-2xl ${item.bg} icon-spin`}>
                      <Icon className={`${item.iconColor} text-lg sm:text-xl lg:text-2xl`} />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#3f2d2d] mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-[#795e5e] leading-relaxed">{item.desc}</p>
                  </div>
                </Link>
              </CardReveal>
            );
          })}
        </div>
      </section>

      {/* ✅ BANNER — NO ANIMATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 lg:mt-20 mb-8 sm:mb-16">
        <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] rounded-3xl overflow-hidden shadow-lg">
          <img
            src={img3}
            alt="Wellness banner"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
            style={{ transition: "transform 0.6s ease" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />
          <div className="relative z-10 flex items-center justify-center h-full text-center px-4 sm:px-6">
            <div className="max-w-xl">
              <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 lg:mb-6 text-[#e08594]">
                Strong in Silence, Gentle by Choice
              </h1>
              <p className="text-[#4b5f66] text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed italic">
                "Every phase you move through is a reminder of your strength, your balance, and your beautiful resilience."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div ref={productsHeadRef} className="anim-fade-up flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-14 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#051a2f]">
            Period Wellness Essentials
          </h2>
          <span
            onClick={() => navigate("/cart")}
            className="text-[#0c0c0c] text-xs sm:text-sm lg:text-base font-medium cursor-pointer hover:underline hover:text-gray-700 transition-all duration-200 whitespace-nowrap"
          >
            Explore All Essentials →
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {products.map((item, index) => (
            <ProductCard key={item._id} item={item} index={index} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <Footer />
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

const CardReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = `cardEntrance 0.6s ${delay}s cubic-bezier(0.22,1,0.36,1) forwards`;
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
};

const ProductCard = ({ item, index, onAddToCart }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = `productSlideUp 0.6s ${index * 0.08}s cubic-bezier(0.22,1,0.36,1) forwards`;
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} style={{ opacity: 0 }} className="product-card-hover card-3d bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 sm:h-48 md:h-52 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
        <p className="text-xs sm:text-sm text-gray-500">{item.description}</p>
        <span className="text-lg sm:text-xl font-bold">₹{item.price}</span>
        <button
          onClick={() => onAddToCart(item)}
          className="cart-btn w-full bg-[#051a2f] text-white px-3 sm:px-4 py-2 sm:py-3 rounded-xl mt-2 sm:mt-3 flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <MdOutlineShoppingBag className="text-lg sm:text-xl" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Home;