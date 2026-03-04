import React, { useState, useRef } from "react";
import { FaLock } from "react-icons/fa";
import axios from "axios";

const Forgot = () => {

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const inputsRef = useRef([]);

  // Send OTP
  const handleSendOTP = async () => {
    try {
      await axios.post("http://localhost:4000/user/send-otp", { email });
      alert("OTP sent to your email");
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  // Handle OTP change with auto focus
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace move
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  // Verify OTP and reset password
  const handleVerifyOTP = async () => {
    try {
      const finalOtp = otp.join("");

      await axios.post("http://localhost:4000/user/verify-otp", {
        email,
        otp: finalOtp,
        newPassword,
      });

      alert("Password reset successful");
    } catch (error) {
      alert(error.response?.data?.message || "Invalid or expired OTP");
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-emerald-50 flex items-center justify-center relative overflow-hidden">

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-pink-200 rounded-full opacity-40 hidden md:block" />
      <div className="absolute bottom-32 left-40 w-16 h-16 bg-purple-200 rounded-full opacity-40 hidden md:block" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-200 rounded-full opacity-40 hidden md:block" />
      <div className="absolute top-10 right-10 w-12 h-12 bg-pink-300 rounded-full opacity-30 hidden md:block" />

      {/* Card */}
      <div className="w-[90%] max-w-md rounded-3xl bg-white/90 backdrop-blur-xl 
                      border border-pink-100/30 p-8 text-gray-800 shadow-xl relative z-10">

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full 
                          bg-pink-100/50 flex items-center justify-center">
            <FaLock className="text-pink-600 text-xl" />
          </div>

          <h2 className="text-2xl font-semibold">Forgot Password?</h2>
          <p className="text-sm text-gray-600 mt-1">
            Enter your email to receive a verification code
          </p>
        </div>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white
                     border border-gray-200 outline-none
                     placeholder-gray-400 focus:ring-2 focus:ring-pink-300"
        />

        {/* Send OTP Button */}
        <button
          onClick={handleSendOTP}
          style={{ 
            backgroundColor: "rgba(224, 133, 148, 1)",
            backdropFilter: "blur(10px)"
          }}
          className="w-full py-3 rounded-2xl text-white font-semibold 
                     hover:bg-pink-300 transition shadow-md mb-6"
        >
          Send OTP
        </button>

        {/* OTP Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200" />
          <span className="px-3 text-sm text-gray-500">OTP</span>
          <div className="flex-grow border-t border-gray-200" />
        </div>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleOtpChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-lg rounded-xl
                         bg-white border border-gray-200
                         outline-none focus:ring-2 focus:ring-pink-300"
            />
          ))}
        </div>

        {/* New Password Input */}
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-white
                     border border-gray-200 outline-none
                     placeholder-gray-400 focus:ring-2 focus:ring-pink-300"
        />

        {/* Verify OTP Button */}
        <button
          onClick={handleVerifyOTP}
          style={{ 
            backgroundColor: "rgba(224, 133, 148, 1)",
            backdropFilter: "blur(10px)"
          }}
          className="w-full py-3 rounded-2xl text-white font-semibold 
                     hover:bg-pink-300 transition shadow-md mb-4"
        >
          Verify OTP
        </button>

        <p className="mt-4 text-center text-gray-600 hover:text-pink-600 cursor-pointer transition">
          Back to Login
        </p>

      </div>
    </div>
  );
};

export default Forgot;