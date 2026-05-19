import React, { useEffect, useState } from "react";
import {
  FiSmile, FiMeh, FiFrown, FiHeart, FiCloud, FiBattery,
} from "react-icons/fi";
import Nav from "./Nav";
import Footer from "./Footer";
import { createTrack, getTracks } from "../api/api.js";
import { Link } from "react-router-dom";

const moods = [
  { label: "Happy", icon: <FiSmile /> },
  { label: "Calm", icon: <FiHeart /> },
  { label: "Irritable", icon: <FiMeh /> },
  { label: "Sad", icon: <FiFrown /> },
  { label: "Anxious", icon: <FiCloud /> },
  { label: "Tired", icon: <FiBattery /> },
];

const symptoms = [
  "Mood swings", "Low energy", "Cravings", "Crying spells",
  "Anxiety", "Brain fog", "Sensitivity",
];

const moodQuotes = {
  Happy: "Carry this energy forward.\nDo one small thing that matters.",
  Calm: "Clarity lives in stillness.\nMove gently, but move.",
  Irritable: "Something needs care, not force.\nChoose one task, then stop.",
  Sad: "Progress can be quiet.\nShowing up today is enough.",
  Anxious: "Focus on the next right step.\nThe rest can wait.",
  Tired: "Rest fuels momentum.\nRecover now, continue later.",
};

const Tracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [impact, setImpact] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [journal, setJournal] = useState("");
  const [entries, setEntries] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupEntry, setPopupEntry] = useState(null);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const fetchTracks = async () => {
    try {
      const response = await getTracks();
      console.log("Tracks:", response.data);
      setEntries(response.data || []);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  useEffect(() => { fetchTracks(); }, []);

  const saveMood = async () => {
    if (!selectedMood || !impact) return;
    try {
      const response = await createTrack({ mood: selectedMood, impact, symptoms: selectedSymptoms, journal });
      const newEntry = response.data;
      setPopupEntry(newEntry);
      setShowPopup(true);
      setSelectedMood(null);
      setImpact(null);
      setSelectedSymptoms([]);
      setJournal("");
    } catch (error) {
      console.error("Error saving mood:", error);
    }
  };

  const handleScreenClick = () => {
    if (showPopup && popupEntry) {
      setEntries((prev) => [popupEntry, ...prev]);
      setShowPopup(false);
      setPopupEntry(null);
    }
  };

  return (
    <div
      onClick={handleScreenClick}
      className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#fff5f9] via-[#fdebf1] to-white text-[#3f2d2d]"
    >
      <Nav />

      {/* ✅ Back button — fixed top-left, just like Diet page */}
     <Link
  to="/home"
  className="block md:fixed mt-16 ml-2 md:mt-0 md:top-20 md:left-4 z-50 w-10 h-10 flex items-center justify-center 
             rounded-full bg-white/70 backdrop-blur-md 
             shadow-md text-black text-lg
             hover:scale-105 transition"
>
  ←
</Link>

      <section className="  text-center py-10 md:py-16 px-4 sm:px-6">
        <h2 className="text-2xl mt-0 md:mt-10 sm:text-3xl md:text-4xl font-bold text-[#6f1b29]">
          How are you feeling today?
        </h2>
        <p className="mt-2 md:mt-4 text-sm max-w-xl mx-auto text-gray-600">
          This space helps you notice emotional patterns with compassion.
        </p>
      </section>

     

      <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-24 space-y-10">
            <div className="backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium -mt-2 mb-4">Select your mood</h3>
          {/* ✅ FIX 3: grid-cols-3 on mobile fits 6 moods cleanly */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
            {moods.map((mood) => (
              <button
                key={mood.label}
                onClick={() => setSelectedMood(mood.label)}
                className={`flex flex-col items-center gap-2 p-3 md:p-4 rounded-2xl transition
                ${selectedMood === mood.label ? "bg-[#e08594] text-white shadow-md" : "bg-pink-100"}`}
              >
                <span className="text-xl">{mood.icon}</span>
                <span className="text-xs md:text-sm">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4">How is this affecting your day?</h3>
          {/* ✅ FIX 4: grid-cols-1 on mobile so impact buttons don't squish */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: "Barely noticeable", emoji: "🌤" },
              { label: "Manageable", emoji: "🌥" },
              { label: "Draining", emoji: "🌧" },
              { label: "Overwhelming", emoji: "🌪" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => setImpact(item.label)}
                className={`p-4 rounded-2xl flex items-center gap-2 transition
                ${impact === item.label ? "bg-[#e08594] text-white shadow-md" : "bg-white/30 border border-white/40"}`}
              >
                <span>{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-4">Symptoms & feelings</h3>
          <div className="flex flex-wrap gap-3">
            {symptoms.map((symptom) => (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`px-4 py-2 text-sm rounded-full transition
                ${selectedSymptoms.includes(symptom) ? "bg-[#e08594] text-white" : "border border-white/40"}`}
              >
                {symptom}
              </button>
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-lg">
          <h3 className="text-lg font-medium mb-3">Journal</h3>
          <textarea
            rows="4"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            placeholder="Write anything you want to remember today..."
            className="w-full rounded-2xl p-4 bg-transparent border border-white/40 focus:outline-none"
          />
        </div>

        <button
          onClick={saveMood}
          className="w-full bg-gradient-to-r from-[#e08594] to-[#f2a7b5]
          text-white py-3 rounded-full font-medium text-lg hover:scale-[1.02] transition"
        >
          Save Today's Mood
        </button>

        {entries.map((entry) => (
          <div
            key={entry._id}
            className="mt-10 bg-pink-200/40 backdrop-blur-xl rounded-3xl p-6 shadow-lg text-center"
          >
            <h3 className="text-lg font-semibold text-[#6f1b29]">
              {entry.mood} • {new Date(entry.createdAt).toLocaleDateString()}
            </h3>
            <p className="mt-2 text-sm text-gray-700">Impact: {entry.impact}</p>
            {entry.symptoms?.length > 0 && (
              <p className="mt-2 text-sm">Symptoms: {entry.symptoms.join(", ")}</p>
            )}
            {entry.journal && (
              <p className="mt-2 text-sm text-gray-700">Journal: {entry.journal}</p>
            )}
            <p className="mt-4 italic text-[#6f1b29] whitespace-pre-line">
              "{moodQuotes[entry.mood]}"
            </p>
          </div>
        ))}
      </section>

      {showPopup && popupEntry && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
          <div className="bg-white backdrop-blur-xl rounded-3xl p-8 shadow-2xl text-center animate-[popup_0.4s_ease] max-w-sm mx-4">
            <h3 className="text-xl font-semibold text-[#6f1b29]">Mood Saved</h3>
            <p className="mt-3 text-gray-600">{popupEntry.mood} • {popupEntry.impact}</p>
            <p className="mt-4 italic text-[#6f1b29] whitespace-pre-line text-sm">
              "{moodQuotes[popupEntry.mood]}"
            </p>
            <p className="mt-4 text-sm text-gray-500">Click anywhere to view it in your journal</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Tracker;