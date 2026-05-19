import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaInstagram, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import { regg } from "../api/api";

const PasswordField = ({ placeholder, name, value, onChange, show, toggleShow }) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-xl bg-[#F9F6F4]
                 border border-gray-200 text-gray-700
                 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
    />
    <button
      type="button"
      onClick={toggleShow}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
    >
      {show ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
);

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const validateForm = () => {
  const { name, email, password, confirmPassword } = formData;

  if (!name.trim()) {
    toast.error("Name is required");
    return false;
  }

  if (name.length < 3) {
    toast.error("Name must be at least 3 characters");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    toast.error("Enter a valid email address");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

  if (!strongPassword.test(password)) {
    toast.error("Password must contain uppercase, lowercase and number");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  return true;
};
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const dataWithUserType = {
    ...formData,
    usertype: "user",
  };
    try {
      const response = await regg(dataWithUserType);
      console.log(response);
      toast.success("Registered Successfully");
      setTimeout(() => {
        navigate("/option");
      }, 3000);
    } catch (error) {
      console.error(error.message);
    }
    console.log(formData);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-100 via-purple-50 to-emerald-50 relative flex items-center justify-center overflow-hidden px-4 md:px-0">

      {/* Floating shapes */}
<div className="absolute top-10 left-4 w-12 h-12 bg-pink-200 rounded-full opacity-50 sm:top-16 sm:left-8 md:top-20 md:left-10 md:w-24 md:h-24" />

<div className="absolute bottom-20 left-6 w-10 h-10 bg-purple-200 rounded-full opacity-50 sm:bottom-24 sm:left-16 md:bottom-32 md:left-40 md:w-16 md:h-16" />

<div className="absolute top-12 right-6 w-10 h-10 bg-pink-300/70 rounded-full opacity-50 sm:w-12 sm:h-12 md:top-10 md:right-20 animate-bounce" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-200 rounded-full opacity-60 hidden md:block" />
      <div className="absolute bottom-20 right-10 w-8 h-8 bg-purple-300/50 rounded-full opacity-50 animate-pulse hidden md:block" />
      <div className="absolute top-1/2 left-1/2 w-10 h-10 text-pink-400 animate-spin-slow hidden md:flex items-center justify-center" />
      <div className="absolute bottom-1/4 left-1/2 w-12 h-12 bg-purple-200/50 rounded-full opacity-50 animate-bounce hidden md:block" />
      <div className="absolute top-2/3 left-10 w-6 h-6 bg-pink-300/60 rounded-full opacity-60 animate-ping hidden md:block" />
      <div className="absolute top-1/5 right-1/5 w-8 h-8 text-pink-400 animate-spin-slow hidden md:flex items-center justify-center" />
      <div className="absolute bottom-10 left-1/4 w-6 h-6 bg-emerald-300/60 rounded-full opacity-60 animate-bounce hidden md:block" />

      {/* Centered card */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full max-w-6xl">

        {/* LEFT TEXT */}
        <div className="flex flex-col justify-center text-center md:text-left px-4 md:px-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Your Wellness Journey
            <span className="block text-pink-800 mt-2">
              Starts Here
            </span>
          </h1>
          <p className="mt-4 sm:mt-6 text-gray-600 max-w-md text-base sm:text-lg mx-auto md:mx-0">
            Track your cycle, nurture your body, and embrace every phase of womanhood with care and confidence.
          </p>
        </div>

        {/* RIGHT FORM */}
        <form onSubmit={handleSubmit} className="flex justify-center md:justify-end px-4 md:px-0">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-xl">

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
              <p className="text-gray-500 text-sm mt-1">Begin your wellness journey</p>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 mb-5 justify-center flex-wrap">
              {[FaInstagram, FaFacebookF, FaGoogle].map((Icon, i) => (
                <button
                  key={i}
                  className="p-3 w-20 sm:w-28 rounded-full flex items-center justify-center
                             bg-pink-200/30 backdrop-blur-lg 
                             hover:bg-pink-200/50 
                             text-black text-lg shadow-md
                             border border-pink-100/50"
                  style={{ backgroundColor: 'rgba(248, 203, 211, 0.3)' }}
                >
                  <Icon />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-gray-400 text-xs mb-5">
              <span className="flex-1 h-px bg-gray-200" />
              or
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F6F4]
                           border border-gray-200 text-gray-700
                            focus:outline-none focus:ring-2 focus:ring-pink-300"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-[#F9F6F4]
                           border border-gray-200 text-gray-700
                           placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />

              <PasswordField
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                show={showPassword}
                toggleShow={() => setShowPassword(!showPassword)}
              />

              <PasswordField
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                show={showConfirm}
                toggleShow={() => setShowConfirm(!showConfirm)}
              />
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "rgba(224, 133, 148, 1)",
                backdropFilter: "blur(10px)"
              }}
              className="w-full mt-4 px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              Register
            </button>

            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?
              <Link to="/login" className="ml-1 text-pink-400 hover:underline">
                Login
              </Link>
            </p>

          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
