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
  const doctorAdvice = location.state?.doctorAdvice || ""; // ✅ ADDED

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
        <div className="bg-white/30 backdrop-blur-2xl rounded-3xl p-10 shadow-lg text-center max-w-md w-full">

          <div className="flex justify-center mb-4">
            <FiDroplet className="text-pink-400 text-4xl animate-bounce" />
          </div>

          <h1 className="text-2xl font-bold mb-4 text-[#e58a95]">
            Period Delay Result
          </h1>

          <p className="text-2xl font-extrabold mb-4 text-gray-800">
            {result}
          </p>

          <p className="text-sm text-gray-600 mb-6 italic">
            {motivationalMessage}
          </p>

          {reasons.length > 0 && (
            <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 mb-6 text-left shadow-inner">
              <h3 className="font-semibold text-gray-800 mb-2">
                Possible Reasons:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
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

          {/* ✅ DOCTOR ADVICE SECTION ADDED */}
          {doctorAdvice && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-2xl shadow-inner mb-6">
              <p className="text-sm font-semibold">
                ⚠️ {doctorAdvice}
              </p>
            </div>
          )}

          <button
            onClick={() => navigate("/delay")}
            className="mt-2 px-6 w-full py-3 rounded-xl font-semibold text-white shadow-md"
            style={{
              background: "linear-gradient(to right, #e58a95, #f8d5da)",
            }}
          >
            Back
          </button>
        </div>

        <div className="mt-8 mb-8 max-w-md w-full bg-yellow-100 border-l-4 border-yellow-400 text-yellow-700 p-4 rounded-2xl shadow-inner">
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
