import React from "react";
import { FiMail, FiMapPin, FiShield } from "react-icons/fi";
import Nav from "./Nav";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fff5f9] via-[#fdebf1] to-[#ffffff] text-[#3f2d2d]">
      <Nav />

      {/* Main Section */}
      <section className="mt-2 pb-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Content */}
        <div>
          {/* Glass badge */}
          <span className="inline-block mb-6 px-5 py-1.5 rounded-full 
            bg-white/50 backdrop-blur-lg border border-white/40
            text-sm text-[#6b4b4b] shadow-sm">
            We’re here for you
          </span>

          <h1 className="text-4xl font-serif md:text-5xl font-bold text-[#e08594] leading-tight">
            Get in Touch
          </h1>

          <p className="mt-6 text-gray-600 max-w-lg">
            We believe conversations around menstrual health should feel safe,
            respectful, and supportive. Whether you have feedback, questions,
            or simply need guidance, our team is always ready to listen.
          </p>

          <p className="mt-4 text-gray-600 max-w-lg">
            Your messages are handled with care and confidentiality. This space
            exists to support your journey, without judgment, pressure, or
            unnecessary complexity.
          </p>

          {/* Info icons */}
          <div className="mt-8 space-y-4 text-sm text-[#6b4b4b]">
            <div className="flex items-center gap-3">
              <FiMail className="text-[#e08594]" />
              support@moonly.app
            </div>
            <div className="flex items-center gap-3">
              <FiMapPin className="text-[#e08594]" />
              Designed with care, wherever you are
            </div>
            <div className="flex items-center gap-3">
              <FiShield className="text-[#e08594]" />
              Your privacy always comes first
            </div>
          </div>
        </div>

        {/* Right Form */}
        <div className="mt-20 bg-white/50 backdrop-blur-xl border border-white/40 
          rounded-3xl shadow-lg p-6 md:p-7">

          
          <form className="space-y-6">
            <div>
              <label className="text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-2 w-full px-4 py-3 rounded-xl bg-white/70 
                border border-white/50 focus:outline-none 
                focus:ring-2 focus:ring-[#e08594]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-3 rounded-xl bg-white/70 
                border border-white/50 focus:outline-none 
                focus:ring-2 focus:ring-[#e08594]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <input
                type="text"
                placeholder="How can we help?"
                className="mt-2 w-full px-4 py-3 rounded-xl bg-white/70 
                border border-white/50 focus:outline-none 
                focus:ring-2 focus:ring-[#e08594]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message here..."
                className="mt-2 w-full px-4 py-3 rounded-xl bg-white/70 
                border border-white/50 focus:outline-none 
                focus:ring-2 focus:ring-[#e08594]"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-[#e08594] text-white 
              py-3 rounded-xl font-medium 
              hover:shadow-lg hover:scale-[1.02] transition"
            >
              Send Message
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
              We respect your privacy. Your information is never shared.
            </p>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
