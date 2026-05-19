import React, { useState, useEffect } from "react";
import Nav2 from "./Nav2";
import Footer from "./Footer";

import {
  FaCalendarAlt,
  FaHeartbeat,
  FaStethoscope,
  FaBaby,
} from "react-icons/fa";

import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const Appointment = () => {
const storedUser = JSON.parse(localStorage.getItem("user"));
const userId = storedUser?._id;
  const [appointments, setAppointments] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

useEffect(() => {
  if (!userId) return;

  const saved =
    JSON.parse(localStorage.getItem(`appointments_${userId}`)) || [];

  setAppointments(saved);
}, [userId]);
  // icon selection based on title
  const getIcon = (title) => {

    const text = title.toLowerCase();

    if (text.includes("scan") || text.includes("ultrasound"))
      return <FaHeartbeat className="text-purple-500 text-3xl" />;

    if (text.includes("doctor") || text.includes("checkup"))
      return <FaStethoscope className="text-pink-500 text-3xl" />;

    if (text.includes("baby"))
      return <FaBaby className="text-indigo-500 text-3xl" />;

    return <FaCalendarAlt className="text-pink-500 text-3xl" />;
  };

  // add appointment
  const addAppointment = () => {

    if (!title || !date) return;

    const newAppointment = {
      id: Date.now(),
      title,
      date,
    };

    const updated = [...appointments, newAppointment];

    updated.sort((a, b) => new Date(a.date) - new Date(b.date));

    setAppointments(updated);
localStorage.setItem(
  `appointments_${userId}`,
  JSON.stringify(updated)
);
    setTitle("");
    setDate("");
  };

  // delete appointment
  const deleteAppointment = (id) => {

    const updated = appointments.filter((a) => a.id !== id);

    setAppointments(updated);
localStorage.setItem(
  `appointments_${userId}`,
  JSON.stringify(updated)
);  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">

      <Nav2 />

      <div className="max-w-5xl  mx-auto px-6 py-16">
<Link
  to="/home2"
className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white md:-ml-65 -ml-4 mt-3 shadow-md hover:shadow-lg transition group mb-4">
  <span className="text-[#3f2d2d] text-base transform  ">
    ←
  </span>
</Link>
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#3f2d2d] mb-4 ml-2 mt-10  text-left">
          Appointment & Checkup Reminder
        </h1>

        {/* Form Section */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-lg mb-14">

          <div className="space-y-6">

            {/* Appointment Name */}
            <div>
              <label className="block text-sm font-semibold text-[#3f2d2d] mb-2">
                Appointment Name
              </label>

              <input
                type="text"
                placeholder="Doctor Checkup / Ultrasound Scan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-[#3f2d2d] mb-2">
                Appointment Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
            </div>

            {/* Button */}
            <button
              onClick={addAppointment}
              className="w-full bg-[#e08594] text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Add Appointment
            </button>

          </div>

        </div>

        {/* Upcoming Section */}

        <section>

          <h2 className="text-xl font-semibold text-[#9B7E8D] mb-6">
            Upcoming Appointments
          </h2>

          <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8">

            {appointments.length === 0 && (
              <p className="text-gray-500">No appointments scheduled</p>
            )}

            {appointments.map((item) => {

              const icon = getIcon(item.title);

              return (

                <div
                  key={item.id}
                  className="relative bg-gradient-to-br from-pink-100/70 to-white/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl flex items-center justify-between"
                >

                  <div className="flex items-center gap-6">

                    {/* Icon */}
                    <div className="w-16 h-16 rounded-2xl bg-pink-200/70 flex items-center justify-center shadow-md">
                      {icon}
                    </div>

                    {/* Text */}
                    <div>

                      <p className="text-lg font-semibold text-gray-800">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        Scheduled pregnancy appointment
                      </p>

                      <p className="mt-3 text-sm font-medium text-pink-600">
                        {item.date}
                      </p>

                    </div>

                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => deleteAppointment(item.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <FiTrash2 size={20} />
                  </button>

                </div>

              );

            })}

          </div>

        </section>

      </div>

      <Footer />

    </div>
  );
};

export default Appointment;