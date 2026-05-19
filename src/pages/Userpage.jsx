import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Userpage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [showTracker, setShowTracker] = useState(false);

  const [name, setName] = useState("");
  const [tracker, setTracker] = useState("");

  /* LOAD USER */
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && storedUser._id) {
        setUser(storedUser);
        setName(storedUser.name || "");
        setTracker(storedUser.trackerType || "");
      } else {
        toast.error("User data missing. Please login again.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load user");
    }
  }, []);

  /* UPDATE PROFILE */
  const updateProfile = async () => {
    if (!user?._id) {
      toast.error("User not loaded properly");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:4000/user/update-profile/${user._id}`,
        { name }
      );

      setUser(res.data.user);
      setName(res.data.user.name);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setEdit(false);

      toast.success("Your profile is updated");
    } catch (err) {
      console.log(err);
      toast.error("Profile update failed");
    }
  };

  /* CHANGE TRACKER */
  const changeTracker = async (type) => {
    if (!user?._id) {
      toast.error("User not loaded properly");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:4000/user/set-tracker/${user._id}`,
        { trackerType: type }
      );

      setTracker(type);
      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setShowTracker(false);

      toast.success(`Tracker changed to ${type}`);
    } catch (err) {
      console.log(err);
      toast.error("Failed to change tracker");
    }
  };

  /* NAVIGATION */
  const goHome = () => {
    if (tracker === "period") {
      navigate("/home");
    } else if (tracker === "pregnancy") {
      navigate("/home2");
    } else {
      navigate("/option");
    }
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-xl w-[420px] p-8">
        
        {/* Back Button */}
        <button
          onClick={goHome}
          className="flex items-center text-gray-500 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </button>

        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-[#0e072d] text-white flex items-center justify-center text-2xl font-bold">
            {name ? name.charAt(0).toUpperCase() : "U"}
          </div>
        </div>

        <h2 className="text-center text-xl font-semibold mb-6">
          My Profile
        </h2>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Full Name</label>

          <input
            type="text"
            value={name}
            disabled={!edit}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-md outline-none"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Email Address</label>

          <input
            type="text"
            value={user.email || ""}
            disabled
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-md"
          />

          <p className="text-xs text-gray-400 mt-1">
            Email cannot be changed
          </p>
        </div>

        {/* CURRENT TRACKER */}
        <div className="mb-4">
          <label className="text-sm text-gray-500">Current Tracker</label>

          <input
            type="text"
            value={tracker || "Not selected"}
            disabled
            className="w-full mt-1 px-3 py-2 bg-gray-100 rounded-md capitalize"
          />
        </div>

        {/* CHANGE TRACKER BUTTON */}
        <button
          onClick={() => setShowTracker(!showTracker)}
          className="w-full bg-[#1f0636] text-white py-2 rounded-md mb-3"
        >
          Change Tracker
        </button>

        {/* TRACKER OPTIONS */}
        {showTracker && (
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => changeTracker("period")}
              className="flex-1 bg-gray-200 py-2 rounded-md hover:bg-gray-300"
            >
              Period Tracker
            </button>

            <button
              onClick={() => changeTracker("pregnancy")}
              className="flex-1 bg-gray-200 py-2 rounded-md hover:bg-gray-300"
            >
              Pregnancy Tracker
            </button>
          </div>
        )}

        {/* EDIT / UPDATE BUTTON */}
        {edit ? (
          <button
            onClick={updateProfile}
            className="w-full bg-[#0e072d] text-white py-2 rounded-md"
          >
            Update
          </button>
        ) : (
          <button
            onClick={() => setEdit(true)}
            className="w-full bg-[#0e072d] text-white py-2 rounded-md"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Userpage;