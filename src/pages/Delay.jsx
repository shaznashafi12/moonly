import { FiDroplet, FiMoon, FiActivity, FiCoffee } from "react-icons/fi";
import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";

const faqs = [
  {
    question: "What is a normal cycle length?",
    answer:
      "A typical menstrual cycle ranges from 21 to 35 days. Every individual is different, so cycles may vary slightly.",
  },
  {
    question: "When should I be concerned about a late period?",
    answer:
      "If your period is more than a few days late or you notice unusual symptoms, consider consulting a healthcare professional.",
  },
  {
    question: "What can cause period delays?",
    answer:
      "Stress, hormonal imbalances, travel, diet changes, and medical conditions can all affect your cycle.",
  },
  {
    question: "Is my data stored anywhere?",
    answer:
      "No! All calculations happen locally in your browser. Your privacy is our priority.",
  },
];

const wellnessTips = [
  {
    icon: <FiDroplet size={24} className="text-[#e58a95]" />,
    title: "Stay Hydrated",
    description:
      "Drinking plenty of water can help reduce bloating and cramps during your cycle.",
  },
  {
    icon: <FiMoon size={24} className="text-[#e58a95]" />,
    title: "Rest Well",
    description:
      "Quality sleep helps regulate hormones and supports your overall cycle health.",
  },
  {
    icon: <FiCoffee size={24} className="text-[#e58a95]" />,
    title: "Balanced Diet",
    description:
      "Foods rich in iron and omega-3s can help ease period symptoms naturally.",
  },
  {
    icon: <FiActivity size={24} className="text-[#e58a95]" />,
    title: "Gentle Movement",
    description:
      "Light exercise like yoga or walking can improve mood and reduce discomfort.",
  },
];

function Delay() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [cycleLength, setCycleLength] = useState("");
  const [notes, setNotes] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const navigate = useNavigate();

const handleCheckDelay = () => {
  if (!lastPeriod) {
    alert("Please enter Last Period Date.");
    return;
  }

  const cycle = parseInt(cycleLength) || 28; // default cycle

  const lastDate = new Date(lastPeriod);
  const today = new Date();

  // remove time
  lastDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);

  // days passed since last period
  const daysPassed = Math.floor(
    (today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const delay = daysPassed - cycle;

  const expectedDate = new Date(lastDate);
  expectedDate.setDate(lastDate.getDate() + cycle);

  let resultMessage = "";
  let reasonsArray = [];
  let doctorAdvice = "";

  if (delay < 0) {
    resultMessage = `Your next period is expected on ${expectedDate.toDateString()}. Your cycle is normal and there is no need to worry.`;
  }

  else if (delay >= 0 && delay <= 5) {
    resultMessage = `Your period is about ${delay} day${delay !== 1 ? "s" : ""} late. A delay of up to 5 days is considered normal and there is no need to worry.`;
  }

  else if (delay > 5 && delay <= 15) {
    resultMessage = `Your period is ${delay} days late.`;

    reasonsArray = [
      "Stress or emotional changes",
      "Travel or sleep disruption",
      "Minor hormonal fluctuation",
      "Dietary changes",
      "Temporary sleep imbalance"
    ];
  }

  else if (delay > 15 && delay <= 30) {
    resultMessage = `Your period is ${delay} days late.`;

    reasonsArray = [
      "Hormonal imbalance",
      "Weight changes",
      "PCOS",
      "Thyroid issues",
      "Excessive exercise",
      "Anxiety or mental stress",
      "Sudden routine change"
    ];

    doctorAdvice =
      "If the delay continues, consider consulting a healthcare professional.";
  }

  else {
    resultMessage = `Your period is significantly delayed (${delay} days).`;

    reasonsArray = [
      "Pregnancy possibility",
      "PCOS",
      "Thyroid disorders",
      "High prolactin levels",
      "Severe stress impact",
      "Underlying hormonal disorder"
    ];

    doctorAdvice =
      "Please consult a healthcare professional.";
  }

  navigate("/check", {
    state: {
      result: resultMessage,
      reasons: reasonsArray,
      doctorAdvice: doctorAdvice,
      expectedDate: expectedDate.toDateString()
    }
  });
};

  const toggleFaq = (index) =>
    setOpenFaqIndex(openFaqIndex === index ? null : index);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#fff5f9] via-[#fdebf1] to-[#ffffff] text-[#3f2d2d]">
      <Nav />
      
      {/* Desktop Back Button - Below Nav, Top Left */}
      <div className="hidden md:block mt-14 max-w-7xl mx-auto px-4 md:px-6 pt-6">
        <Link
          to="/home"
          className="w-10 h-10 flex items-center justify-center 
                     rounded-full bg-white/70 backdrop-blur-md 
                     shadow-md text-black text-lg
                     hover:text-[#444343] -ml-32 hover:scale-105 transition"
        >
          ←
        </Link>
      </div>
      

      <main className="flex-1 flex flex-col items-center justify-start px-4 md:px-10 max-w-[1200px] mx-auto w-full">

        <section className="flex flex-col lg:flex-row justify-between items-center w-full mb-20 gap-12">

          <div className="flex-1 text-center lg:text-left w-full">
            {/* Mobile: Arrow + Heading on same line */}
            <div className="md:hidden mt-20 flex items-start gap-3 mb-6">
             <Link
  to="/home"
  className="md:hidden  -mt-4 left-1.5 -ml-2  z-50 w-13 h-12 flex items-center justify-center 
             rounded-full bg-white/70 backdrop-blur-md 
             shadow-md text-black text-lg
             hover:text-[#444343] hover:scale-105 transition"
>
  ←
              </Link>
              <h1 className="text-3xl mt-20 -ml-10 font-bold leading-tight" style={{ color: "#e58a95" }}>
                Check Your Period Delay Easily
              </h1>
            </div>

            {/* Desktop: Heading only */}
            <h1 className="hidden md:block text-4xl font-bold mb-6" style={{ color: "#e58a95" }}>
              Check Your Period <br />Delay Easily
            </h1>
            
            <p className="text-gray-500 text-sm -mt-2 max-w-lg mx-auto lg:mx-0">
              Know when your period is due or late with ease.
              <br />Support your menstrual wellness and track your
              <br /> cycle effortlessly.
            </p>
          </div>

          <div className="flex-1 mt-20 max-w-md w-full">
            <div className="bg-white/30 backdrop-blur-md rounded-3xl p-10 shadow-lg flex flex-col gap-4">

              <label className="flex flex-col">
                Last Period Date
                <input
                  type="date"
                  value={lastPeriod}
                  onChange={(e) => setLastPeriod(e.target.value)}
                  className="mt-1 p-3 border border-pink-400 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#e58a95]"
                />
              </label>

              <label className="flex flex-col">
                Average Cycle Length (days)
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  className="mt-1 p-3 border border-pink-400 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#e58a95]"
                />
              </label>

              <label className="flex flex-col">
                Optional Notes
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-1 p-3 border border-pink-400 rounded-lg bg-white/70 focus:outline-none focus:ring-2 focus:ring-[#e58a95]"
                />
              </label>

              <button
                onClick={handleCheckDelay}
                className="mt-4 w-full text-white font-semibold py-3 rounded-xl hover:scale-105 transition-transform duration-200 shadow-md"
                style={{ background: "linear-gradient(to right, #e58a95, #f8d5da)" }}
              >
                Check Delay
              </button>

              <p className="text-xs mt-2 text-center text-gray-500">
                Your data is private and secure
              </p>
            </div>
          </div>
        </section>

        {/* Wellness Tips */}
        <section className="w-full mb-20">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ color: "#e58a95" }}>
            Wellness Tips
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {wellnessTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-md text-center flex flex-col items-center hover:scale-105 transition-transform duration-300"
              >
                <div className="bg-[#f8d5da] rounded-full w-10 h-10 flex items-center justify-center mb-4">
                  {tip.icon}
                </div>

                <h3
                  className="font-semibold mb-2"
                  style={{ color: "#e58a95" }}
                >
                  {tip.title}
                </h3>

                <p className="text-gray-700 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full mb-20 max-w-3xl mx-auto space-y-6">
          <h2
            className="text-3xl font-bold text-center mb-6"
            style={{ color: "#e58a95" }}
          >
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

                <span
                  className="font-bold"
                  style={{ color: "#e58a95" }}
                >
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

      <Footer />
    </div>
  );
}

export default Delay;