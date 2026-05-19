import { useNavigate } from "react-router-dom";
import axios from "axios";

const Option = () => {
  const navigate = useNavigate();

  const chooseTracker = async (type) => {
    try {
      // Safely get user from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");

      if (!storedUser?._id) {
        console.error("User not found in localStorage");
        navigate("/login");
        return;
      }

      // Update tracker in database
      const response = await axios.put(
        `http://localhost:4000/user/set-tracker/${storedUser._id}`,
        { trackerType: type }
      );

      // Make sure backend returns { user: updatedUser }
      if (!response.data?.user) {
        console.error("Invalid response from backend");
        return;
      }

      // Update localStorage with updated user
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Redirect based on selection
      if (type === "period") {
        navigate("/home");
      } else if (type === "pregnancy") {
        navigate("/home2");
      }

    } catch (error) {
      console.error("Error saving tracker:", error.response || error);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-100 via-purple-50 to-emerald-50 flex justify-center px-4 py-6">

      <div className="mt-22 relative w-full max-w-5xl h-[600px] rounded-3xl overflow-hidden shadow-2xl">

        <img
          src="https://i.pinimg.com/736x/ac/30/7a/ac307afecdec26a4dbf13d876097f044.jpg"
          alt="Women's wellness"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-pink-200/60 via-purple-100/40 to-emerald-50/60" />

        <div className="absolute inset-x-0 bottom-6 flex flex-col gap-6 px-4 md:flex-row md:justify-center">

          {/* PERIOD TRACKER CARD */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 backdrop-blur-sm w-full md:w-[420px]">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              📅 Period Tracker
            </h2>
            <ul className="text-gray-700 text-sm space-y-1 mb-4">
              <li>• Cycle predictions & reminders</li>
              <li>• Ovulation & fertile window</li>
              <li>• Mood & symptom tracking</li>
              <li>• Period diet guide</li>
              <li>• Period Delay Reasons</li>
              <li>• Product Purchase Options</li>
            </ul>
            <button
              onClick={() => chooseTracker("period")}
              style={{ backgroundColor: "rgba(224, 133, 148, 0.9)" }}
              className="w-full text-white py-3 rounded-xl font-medium"
            >
              Start Period Tracking →
            </button>
          </div>

          {/* PREGNANCY TRACKER CARD */}
          <div className="bg-white rounded-3xl shadow-2xl p-6 backdrop-blur-sm w-full md:w-[420px]">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              🤰 Pregnancy Tracker
            </h2>
            <ul className="text-gray-700 text-sm space-y-1 mb-4">
              <li>• Weekly pregnancy progress</li>
              <li>• Baby growth & trimester info</li>
              <li>• Doctor notes & prescriptions</li>
              <li>• Pregnancy diet guide</li>
              <li>• Product Purchase Options</li>
            </ul>
            <button
              onClick={() => chooseTracker("pregnancy")}
              style={{ backgroundColor: "rgba(224, 133, 148, 0.9)" }}
              className="w-full mt-6 text-white py-3 rounded-xl font-medium"
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
