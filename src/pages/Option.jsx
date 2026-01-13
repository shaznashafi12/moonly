import { useNavigate } from "react-router-dom";

const Option = () => {
  const navigate = useNavigate();

  const handlePeriod = () => {
    localStorage.setItem("mode", "period");
    navigate("/home");
  };

  const handlePregnancy = () => {
    localStorage.setItem("mode", "pregnancy");
    navigate("/home2");
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-100 via-purple-50 to-emerald-50 flex flex-col items-center px-4 py-6">

      <div className="mt-20 relative w-full max-w-5xl h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src="https://i.pinimg.com/736x/ac/30/7a/ac307afecdec26a4dbf13d876097f044.jpg"
          alt="Women's wellness"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-pink-200/60 via-purple-100/40 to-emerald-50/60"></div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col md:flex-row gap-6 px-4 w-full max-w-4xl">
          
          <div className="bg-white rounded-3xl shadow-2xl flex-1 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">📅 Period Tracker</h2>
            <ul className="text-gray-700 text-sm space-y-1 mb-4">
              <li>• Cycle predictions & reminders</li>
              <li>• Ovulation & fertile window</li>
              <li>• Mood & symptom tracking</li>
              <li>• Period diet guide</li>
            <li>• Period Delay Reasons</li>
              <li>• Product Purchase Options</li>
          

            </ul>
            <button
              onClick={handlePeriod}
              style={{ backgroundColor: "rgba(224, 133, 148, 0.9)" }}
              className="w-full text-white py-3 rounded-xl font-medium"
            >
              Start Period Tracking →
            </button>
          </div>

          {/* PREGNANCY TRACKER CARD */}
          <div className="bg-white rounded-3xl shadow-2xl flex-1 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🤰 Pregnancy Tracker</h2>
            <ul className="text-gray-700 text-sm space-y-1 mb-4">
              <li>• Weekly pregnancy progress</li>
              <li>• Baby growth & trimester info</li>
              <li>• Doctor notes & prescriptions</li>
              <li>• Pregnancy diet guide</li>
             <li>• Product Purchase Options</li>
            </ul>
            <button
              onClick={handlePregnancy}
              style={{ backgroundColor: "rgba(224, 133, 148, 0.9)" }}
              className="mt-5 w-full text-white py-3 rounded-xl font-medium"
            >
              Start Pregnancy Tracking →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Option;
