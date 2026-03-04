import React, { useState } from "react";
import {
  FaBaby,
  FaFileMedical,
  FaUserFriends,
  FaHeart
} from "react-icons/fa";
import Nav2 from "./Nav2";
import Footer from "./Footer";
import { useEffect } from "react";
import { saveChecklist, getChecklist } from "../api/api.js";

/* ------------------ Reusable Checklist Card ------------------ */
const ChecklistCard = ({ title, icon: Icon, items, color }) => {
  const [checked, setChecked] = useState([]);
  const userId = "123"; // replace with real logged-in user id
const [loaded, setLoaded] = useState(false);

  // Load saved checklist when component mounts
 useEffect(() => {
  const loadData = async () => {
    try {
      const res = await getChecklist(userId);
      const saved = res.data.data.find((c) => c.title === title);
      if (saved) {
        setChecked(saved.checkedItems);
      }
      setLoaded(true);   // 👈 important
    } catch (err) {
      console.log(err);
    }
  };

  loadData();
}, [title]);


  // Save whenever checked changes
 useEffect(() => {
  if (!loaded) return;   // 👈 prevents early save

  const saveData = async () => {
    try {
      await saveChecklist({
        userId,
        title,
        checkedItems: checked
      });
    } catch (err) {
      console.log(err);
    }
  };

  saveData();
}, [checked, loaded]);

  const toggleItem = (item) => {
    setChecked((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };
  if (!userId || !title) {
  return res.status(400).json({ message: "Missing required fields" });
}


  const markAll = () => setChecked(items);

  return (
    <div
      className={`rounded-2xl border p-5 mt-5 bg-white/60 backdrop-blur-xl shadow-sm hover:shadow-md transition ${color}`}
    >
      <div className="flex items-center gap-2 mb-4">
        <Icon className="text-gray-600" />
        <h3 className="font-semibold text-gray-800 tracking-wide">
          {title}
        </h3>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 text-sm text-gray-700"
          >
            <input
              type="checkbox"
              checked={checked.includes(item)}
              onChange={() => toggleItem(item)}
              className="accent-pink-400 scale-110"
            />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>{checked.length}/{items.length} packed</span>
        <button
          onClick={markAll}
          className="px-3 py-1 rounded-full bg-white border shadow-sm hover:bg-gray-50"
        >
          Mark All Packed
        </button>
      </div>
    </div>
  );
};

/* ------------------ Main Checklist Page ------------------ */
const Checklist = () => {
  const [includeCSection, setIncludeCSection] = useState(false);

  const cSectionItems = [
    "Abdominal binder",
    "Extra maternity nightwear",
    "High-waist underwear",
    "Pain relief cream"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white mt-15">
      <Nav2 />

      <div className="px-6 py-10">
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-8 shadow-xl">

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Hospital Bag Checklist
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Be prepared for delivery day with all essentials packed.
              </p>
              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-medium">
                Pack by Week 36
              </span>
            </div>

            <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm">
              <FaHeart />
              Week 36+ Ready
            </div>
          </div>

          {/* Checklist Grid */}
          <div className="grid md:grid-cols-3 gap-6">

            <ChecklistCard
              title="Mother’s Essentials"
              icon={FaHeart}
              color="border-pink-200"
              items={[
                "Maternity nightwear",
                "Slippers & socks",
                "Toiletries (toothbrush, lip balm)",
                "Sanitary pads / adult diapers",
                "Water bottle",
                ...(includeCSection ? cSectionItems : [])
              ]}
            />

            <ChecklistCard
              title="Baby Essentials"
              icon={FaBaby}
              color="border-rose-200"
              items={[
                "Newborn clothes",
                "Soft daily wear",
                "Baby cream",
                "Baby towel",
                "Gentle baby soap"
              ]}
            />

            <ChecklistCard
              title="Newborn Care"
              icon={FaBaby}
              color="border-emerald-200"
              items={[
                "Newborn clothes (2)",
                "Swaddle / blanket",
                "Mittens & cap",
                "Baby diapers",
                "Wet wipes",
                "Rash cream"
              ]}
            />

            <ChecklistCard
              title="Documents & Medical"
              icon={FaFileMedical}
              color="border-indigo-200"
              items={[
                "ID proof",
                "Insurance card",
                "Medical reports & scans",
                "Doctor’s contact details",
                "Birth plan (if any)"
              ]}
            />

            <ChecklistCard
              title="Support Person Items"
              icon={FaUserFriends}
              color="border-teal-200"
              items={[
                "Change of clothes",
                "Phone charger / power bank",
                "Snacks",
                "Cash / cards"
              ]}
            />

          </div>

          {/* C-Section Toggle */}
          <div className="flex items-center justify-end mt-10 gap-4">
            <span className="text-sm text-gray-600">
              Include C-Section Items
            </span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={includeCSection}
                onChange={() => setIncludeCSection(!includeCSection)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-pink-400 transition"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
            </label>
          </div>

          {/* Disclaimer */}
          <div className="mt-6 text-xs text-gray-500 flex justify-between">
            <p>
              Checklist may vary based on hospital guidelines. Consult your healthcare provider.
            </p>
            <button className="text-sky-500 hover:underline">
              View Hospital Guidelines
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checklist;
