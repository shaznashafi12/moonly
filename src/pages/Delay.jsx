import { FiDroplet, FiMoon, FiActivity, FiCoffee } from "react-icons/fi";
import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const faqs = [
  { question: "What is a normal cycle length?", answer: "A typical menstrual cycle ranges from 21 to 35 days. Every individual is different, so cycles may vary slightly." },
  { question: "When should I be concerned about a late period?", answer: "If your period is more than a few days late or you notice unusual symptoms, consider consulting a healthcare professional." },
  { question: "What can cause period delays?", answer: "Stress, hormonal imbalances, travel, diet changes, and medical conditions can all affect your cycle." },
  { question: "Is my data stored anywhere?", answer: "No! All calculations happen locally in your browser. Your privacy is our priority." },
];

const wellnessTips = [
  { icon: <FiDroplet size={24} className="text-[#e58a95]" />, title: "Stay Hydrated", description: "Drinking plenty of water can help reduce bloating and cramps during your cycle." },
  { icon: <FiMoon size={24} className="text-[#e58a95]" />, title: "Rest Well", description: "Quality sleep helps regulate hormones and supports your overall cycle health." },
  { icon: <FiCoffee size={24} className="text-[#e58a95]" />, title: "Balanced Diet", description: "Foods rich in iron and omega-3s can help ease period symptoms naturally." },
  { icon: <FiActivity size={24} className="text-[#e58a95]" />, title: "Gentle Movement", description: "Light exercise like yoga or walking can improve mood and reduce discomfort." },
];

function Delay() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleCheckDelay = () => {
    if (!lastPeriod || !cycleLength) {
      alert("Please fill in Last Period Date and Cycle Length.");
      return;
    }
    const lastDate = new Date(lastPeriod);
    const today = new Date();
    const diffTime = today - lastDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const delay = diffDays - parseInt(cycleLength);

    setResult(
      delay > 0 ? `Your period is ${delay} day${delay > 1 ? "s" : ""} late` : `Your cycle is on track!`
    );
  };

  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
<div
  className="min-h-screen w-screen bg-gradient-to-br from-[#fff5f9] via-[#fdebf1] to-[#ffffff] text-[#3f2d2d]"
  style={{ background: "linear-gradient(135deg, #fff5f9 0%, #fdebf1 50%, #ffffff 100%)" }}
>
      <Nav />

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-start pt-20 px-10 max-w-[1200px] mx-auto w-full">
        {/* Hero + Form */}
        <section className="flex flex-col lg:flex-row justify-between items-center w-full mb-20 gap-12">
          {/* Hero */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-6" style={{ color: "#e58a95" }}>
              Check Your Period <br></br>Delay Easily
            </h1>
            <p className="text-gray-500 text-sm -mt-2 max-w-lg">
Know when your period is due or late with ease. 
<br></br>Support your menstrual wellness and track your<br></br> cycle effortlessly.            </p>
          </div>

          {/* Form Card */}
          <div className="flex-1 max-w-md w-full mt-20">
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-10 shadow-lg flex flex-col gap-4">
              <label className="flex flex-col">
                Last Period Date
                <input
                  type="date"
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
className="mt-1 p-3 border border-pink-400 rounded-lg bg-white/70 placeholder-[#e58a95] focus:outline-none focus:ring-2 focus:ring-[#e58a95]"
                />
              </label>
              <label className="flex flex-col">
                Average Cycle Length (days)
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="mt-1 p-3 border border-pink-400 rounded-lg bg-white/70 placeholder-[#e58a95] focus:outline-none focus:ring-2 focus:ring-[#e58a95]"
                />
              </label>
              <label className="flex flex-col">
                Optional Notes
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                //   placeholder="Any additional info"
                  className="mt-1 p-3 border border-pink-400 rounded-lg bg-white/70 placeholder-[#e58a95] focus:outline-none focus:ring-2 focus:ring-[#e58a95]"
                />
              </label>

              <button
                onClick={handleCheckDelay}
                className="mt-4 hover: border border-pink-900 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-200 shadow-md"
                style={{ background: "linear-gradient(to right, #e58a95, #f8d5da)" }}
              >
                Check Delay
              </button>

              <p className="text-xs mt-2 text-center " style={{ color: "gray" }}>
                Your data is private and secure
              </p>
            </div>
          </div>
        </section>

        {/* Result Card */}
        {result && (
          <div className="w-full flex justify-center mb-20">
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-6 shadow-lg w-full max-w-md text-center font-semibold text-lg"
                 style={{ color: "#e58a95" }}>
              {result}
            </div>
          </div>
        )}

        {/* Wellness Tips */}
        <section className="w-full mb-20">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: "#e58a95" }}>
            Wellness Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wellnessTips.map((tip, index) => (
              <div key={index} className="bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-md text-center flex flex-col items-center hover:scale-105 transition-transform duration-300">
                <div className="bg-[#f8d5da] rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  {tip.icon}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "#e58a95" }}>{tip.title}</h3>
                <p className="text-gray-700 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full mb-20 max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center mb-6" style={{ color: "#e58a95" }}>
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-md cursor-pointer"
              onClick={() => toggleFaq(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{faq.question}</h3>
                <span className="font-bold" style={{ color: "#e58a95" }}>
                  {openFaqIndex === index ? "−" : "+"}
                </span>
              </div>
              {openFaqIndex === index && (
                <p className="mt-4 text-gray-700">{faq.answer}</p>
              )}
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}

export default Delay;
