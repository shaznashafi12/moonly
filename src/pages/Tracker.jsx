import React, { useState } from "react";
import {
  FiSmile,
  FiMeh,
  FiFrown,
  FiHeart,
  FiCloud,
  FiBattery,
} from "react-icons/fi";
import Nav from "./Nav";
import Footer from "./Footer";

const moods = [
  { label: "Happy", icon: <FiSmile /> },
  { label: "Calm", icon: <FiHeart /> },
  { label: "Irritable", icon: <FiMeh /> },
  { label: "Sad", icon: <FiFrown /> },
  { label: "Anxious", icon: <FiCloud /> },
  { label: "Tired", icon: <FiBattery /> },
  { label: "Overwhelmed", icon: <FiCloud /> },
];

const symptoms = [
  "Mood swings",
  "Low energy",
  "Cravings",
  "Crying spells",
  "Anxiety",
  "Brain fog",
  "Sensitivity",
];

const Tracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [intensity, setIntensity] = useState(5);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  return (
    <div
      id="mood-page"
      className="min-h-screen w-screen bg-gradient-to-br from-[#fff5f9] via-[#fdebf1] to-white text-[#3f2d2d]"
    >
      <Nav />

      {/* Hero */}
      <section className="mt-10 text-center py-16 px-6">
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-[#6f1b29]">
          How are you feeling today?
        </h2>
        <p className="mt-4 text-sm max-w-xl mx-auto text-gray-600">
          Tracking your mood during your period helps you understand emotional
          patterns and care for yourself with compassion.
        </p>
        <p className="mt-2 text-sm text-[#a06b75]">
          Your emotions are valid. This space is judgment-free.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-6 pb-24 space-y-10">
        {/* Mood Selection */}
        <div className="backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4 ">
            Select your current mood
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 bg">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`flex flex-col items-center gap-2 p-4 bg-pink-100 rounded-2xl border transition
                  ${
                    selectedMood === mood.label
                      ? "border-[#e08594] shadow-md"
                      : "border-white/40"
                  }`}
              >
                <span className="text-xl text-[#6f1b29]">
                  {mood.icon}
                </span>
                <span className="text-sm">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Intensity */}
        <div className="backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4">
            How intense does this feel?
          </h3>
          <input
            type="range"
            min="1"
            max="10"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            className="w-full accent-[#e08594]"
          />
          <p className="text-sm mt-2 text-gray-600">
            Intensity: {intensity}/10
          </p>
        </div>

        {/* Symptoms */}
        <div className="backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4">
            Symptoms & feelings
          </h3>
          <div className="flex flex-wrap gap-3">
            {symptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`px-4 py-2  text-sm transition
                  ${
                    selectedSymptoms.includes(symptom)
                      ? "bg-[#c98199] text-white"
                      : "bg-transparent text-[#6f1b29] border border-white/40"
                  }`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        {/* Journal */}
        <div className="backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-3">Journal</h3>
          <textarea
            rows="4"
            placeholder="Would you like to write more about how you’re feeling today?"
            className="w-full rounded-2xl p-4 bg-transparent border border-white/40
            focus:outline-none focus:ring-2 focus:ring-[#e08594]"
          />
        </div>

        {/* Save Button */}
        <button
          className="w-full bg-gradient-to-r from-[#e08594] to-[#f2a7b5]
          text-white py-3 rounded-full font-medium text-lg
          hover:shadow-lg hover:scale-[1.02] transition"
        >
          Save Today’s Mood
        </button>

        <p className="text-xs text-center text-gray-500">
          Your data stays private and secure.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default Tracker;
