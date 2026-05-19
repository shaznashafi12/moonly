import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { FiDroplet } from "react-icons/fi";

function Check() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state?.result || "No data available.";
  const reasons = location.state?.reasons || [];
  const doctorAdvice = location.state?.doctorAdvice || "";

  const motivationalMessage =
    result.includes("late")
      ? "Stay calm 🌸 Your body knows its rhythm!"
      : result.includes("early")
      ? "Small timing shifts are normal 💖"
      : "";

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-[#fff5f9] via-[#fdebf1] to-[#ffffff] flex flex-col text-[#3f2d2d]">
      <Nav />

      <main className="flex-1 flex flex-col items-center justify-center pt-20 px-6 w-full">

        {/* Glass Card */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/40 rounded-3xl p-10 shadow-xl text-center max-w-md w-full transition hover:shadow-2xl">

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-white/50 backdrop-blur-md p-4 rounded-full shadow-md">
              <FiDroplet className="text-pink-400 text-3xl animate-pulse" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-4 text-[#e58a95] tracking-wide">
            Period Delay Result
          </h1>

          <p className="text-xl font-extrabold mb-4 text-gray-800 leading-relaxed">
            {result}
          </p>

          <p className="text-sm text-gray-600 mb-6 italic">
            {motivationalMessage}
          </p>

          {reasons.length > 0 && (
            <div className="bg-white/50 backdrop-blur-md border border-white/30 rounded-2xl p-4 mb-6 text-left shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">
                Possible Reasons:
              </h3>

              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {reasons.map((reason, i) => (
                  <li
                    key={i}
                    className={
                      reason.includes("CONSULT")
                        ? "font-bold text-red-600"
                        : ""
                    }
                  >
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {doctorAdvice && (
            <div className="bg-red-50/80 backdrop-blur-md border border-red-200 text-red-700 p-4 rounded-2xl shadow-sm mb-6">
              <p className="text-sm font-semibold">
                ⚠️ {doctorAdvice}
              </p>
            </div>
          )}

          <button
            onClick={() => navigate("/delay")}
            className="mt-2 px-6 w-full py-3 rounded-xl font-semibold text-white shadow-md transition hover:scale-[1.02]"
            style={{
              background: "linear-gradient(to right, #e58a95, #f8d5da)",
            }}
          >
            Back
          </button>

        </div>

        {/* Info Notice */}
        <div className="mt-8 mb-8 max-w-md w-full bg-yellow-50/90 backdrop-blur-md border border-yellow-200 text-yellow-700 p-4 rounded-2xl shadow-sm">
          <p className="text-sm">
            This tool provides general guidance only. If you are concerned
            about a late period or unusual symptoms, please consult a healthcare professional.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Check;