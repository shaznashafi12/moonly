import React, { useState } from "react";
import {
  FaBaby,
  FaFileMedical,
  FaUserFriends,
  FaHeart,
  FaArrowLeft
} from "react-icons/fa";
import Nav2 from "./Nav2";
import Footer from "./Footer";
import { useEffect } from "react";
import { saveChecklist, getChecklist } from "../api/api.js";
import { useNavigate } from "react-router-dom";

/* ------------------ Reusable Checklist Card ------------------ */
const ChecklistCard = ({ title, icon: Icon, items, color, category }) => {

  const [checked, setChecked] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {

    const fetchData = async () => {

      try {

        if (!userId) return;

        const res = await getChecklist(userId);

        if (res.data.data.length) {
          const data = res.data.data[0];
          setChecked(data[category] || []);
        }

      } catch (err) {
        console.log(err);
      }

    };

    fetchData();

  }, [userId, category]);


  useEffect(() => {

    const saveData = async () => {

      try {

        if (!userId) return;

        await saveChecklist({
          userId,
          [category]: checked
        });

      } catch (err) {
        console.log(err);
      }

    };

    saveData();

  }, [checked]);


  const toggleItem = (item) => {

    setChecked((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );

  };

  const markAll = () => setChecked(items);
  return (

    <div className={`rounded-2xl border p-5 mt-5 bg-white/60 backdrop-blur-xl shadow-sm hover:shadow-md transition ${color}`}>

      <div className="flex items-center gap-2 mb-4">
        <Icon className="text-gray-600" />
        <h3 className="font-semibold text-gray-800 tracking-wide">
          {title}
        </h3>
      </div>

      <ul className="space-y-3">

        {items.map((item) => (

          <li key={item} className="flex items-center gap-3 text-sm text-gray-700">

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
  const navigate = useNavigate();

  const cSectionItems = [
    "Abdominal binder",
    "Extra maternity nightwear",
    "High-waist underwear",
    "Pain relief cream"
  ];
  useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  if(!userId) return;

  const saveCSection = async () => {

    await saveChecklist({
      userId,
      cSectionIncluded: includeCSection
    });

  };

  saveCSection();

}, [includeCSection]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white mt-15">
      <Nav2 />

      <div className="px-4 sm:px-6 py-8 sm:py-10">
        <div className="max-w-6xl mx-auto bg-white/70 backdrop-blur-2xl rounded-3xl p-5 sm:p-8 shadow-xl">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
              {/* Back Arrow + Title Row */}
  <div>
    <div className="flex items-center gap-2 mb-1">
      <button onClick={() => navigate(-1)} aria-label="Go back">
        <FaArrowLeft className="md:-ml-4 -ml-3 text-black text-base" />
      </button>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
        Hospital Bag Checklist
      </h1>
    </div>

    <p className="text-sm md:ml-2 ml-3 text-gray-600 mt-1">
      Be prepared for delivery day with all essentials packed.
    </p>
    <span className="inline-block md:ml-1 ml-2 mt-3 px-4 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-medium">
      Pack by Week 36
    </span>
  </div>

  <div className="flex items-center gap-2 ml-1 text-green-600 bg-green-50 px-4 py-2 rounded-full text-sm self-start sm:self-auto">
    <FaHeart />
    Week 36+ Ready
  </div>
</div>

          {/* Checklist Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">

<ChecklistCard
  title="Mother's Essentials"
  icon={FaHeart}
  color="border-pink-200"
  category="motherItems"
  items={[
    "Maternity nightwear",
    "Slippers & socks",
    "Toiletries (toothbrush, lip balm)",
    "Sanitary pads / adult diapers",
    "Water bottle"
  ]}
/>

<ChecklistCard
  title="Baby Essentials"
  icon={FaBaby}
  color="border-rose-200"
  category="babyItems"
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
  category="newbornCare"
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
  category="documents"
  items={[
    "ID proof",
    "Insurance card",
    "Medical reports & scans",
    "Doctor's contact details",
    "Birth plan (if any)"
  ]}
/>

<ChecklistCard
  title="Support Person Items"
  icon={FaUserFriends}
  color="border-teal-200"
  category="supportPerson"
  items={[
    "Change of clothes",
    "Phone charger / power bank",
    "Snacks",
    "Cash / cards"
  ]}
/>          </div>

          {/* C-Section Toggle */}
          

          {/* Disclaimer */}
          <div className="mt-6 text-xs text-gray-500 flex flex-col sm:flex-row sm:justify-between gap-2">
            <p>
              Checklist may vary based on hospital guidelines. Consult your healthcare provider.
            </p>
            <button className="text-sky-500 hover:underline self-start sm:self-auto">
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