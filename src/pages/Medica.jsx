import { useState, useEffect } from "react";
import { FaFilePdf, FaUpload, FaBell, FaLock, FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getReports } from "../api/api.js";

const statusStyle = {
  Normal: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  Review: "bg-amber-50 text-amber-700 border border-amber-100",
  Critical: "bg-rose-50 text-rose-700 border border-rose-100"
};

const Medica = () => {
  const [reports, setReports] = useState([]);

const setReminder = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?._id;
  if (!userId) {
    alert("Please log in to set a reminder.");
    return;
  }

  const reminder = {
    message: "Review your blood report before your next appointment",
    date: new Date().toISOString(),
  };

  localStorage.setItem(`report_reminder_${userId}`, JSON.stringify(reminder));
  alert("Reminder set! You'll see it on your home page.");
};
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getReports();
        setReports(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-lilac-50 to-white px-6 py-8">

      {/* Header */}
      <div className="flex justify-between items-end mb-7">
        <div>
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight flex items-center gap-2">
  <Link to="/home2" className="flex-shrink-0 flex items-center">
    <FaArrowLeft className="text-black text-2xl pt-1 pr-2 hover:text-[#504f50] cursor-pointer" />
  </Link>
  <span className="leading-none md:text-4xl text-2xl">Medical Reports</span>
</h1>
          <p className="text-sm text-gray-400 mt-1">
            Securely store and access all your health documents
          </p>
        </div>

        <Link to="/upload">
          <button className="flex items-center gap-2 bg-[#e58a95] text-white px-6 py-3 rounded-2xl shadow-md hover:bg-pink-600 transition">
            <FaUpload /> Upload Report
          </button>
        </Link>
      </div>

      {/* Privacy Note */}
      <div className="mb-8 rounded-3xl bg-white/80 backdrop-blur-md border border-pink-100 px-6 py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-pink-100">
            <FaLock className="text-[#e58a95] text-lg" />
          </div>
          <p className="text-sm text-black font-medium">
            Your medical data is private and secure.
          </p>
        </div>
      </div>

      {/* Reminder Card */}
      <div className="mb-8 rounded-3xl bg-white/80 backdrop-blur-md border border-pink-100 px-6 py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-pink-100">
            <FaBell className="text-[#e58a95] text-lg" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
              Upcoming Reminder
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Review your blood report before the next appointment
            </p>
          </div>
        </div>

        <button
          onClick={setReminder}
          className="text-xs px-4 py-2 rounded-full bg-[#e58a95] text-white font-medium hover:bg-[#c66470] transition"
        >
          Set Reminder
        </button>
      </div>

      {/* Reports */}
      <div className="space-y-5">
        {reports.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No reports uploaded yet.
          </div>
        ) : (
          reports.map(report => (
            <div
              key={report._id}
              className="bg-white rounded-3xl border border-gray-100 px-6 py-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">

                {/* Left */}
                <div className="flex gap-5">
                  <div className="p-4 rounded-2xl bg-pink-50">
                    <FaFilePdf className="text-[#e58a95] text-2xl mt-3" />
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-gray-800">
                      {report.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {report.type} • {report.date}
                    </p>

                    <span
                      className={`inline-block mt-3 text-xs px-3 py-1 rounded-full font-medium ${
                        statusStyle[report.status] || ""
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>
                </div>

                {/* Right */}
                <a
                  href={report.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm px-5 py-2.5 rounded-xl border border-pink-200 text-[#e58a95] font-medium hover:bg-pink-50 transition"
                >
                  Download
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Medica;