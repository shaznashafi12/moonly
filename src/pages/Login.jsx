import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaInstagram, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";

const PasswordField = ({ placeholder, value, onChange, show, toggleShow }) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
  className="w-full px-4 py-3 rounded-xl bg-[#F9F6F4]
             border border-gray-200 text-gray-700
             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
      autoComplete="new-password"
    />
    <button
      type="button"
      onClick={toggleShow}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
      style={{ backgroundColor: 'rgba(249, 246, 244, 1)' }}
    >
      {show ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
);

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-100 via-purple-50 to-emerald-50 relative flex items-center justify-center overflow-hidden">

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-pink-200 rounded-full opacity-60 hidden md:block" />
      <div className="absolute bottom-32 left-40 w-16 h-16 bg-purple-200 rounded-full opacity-60 hidden md:block" />
      {/* <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-200 rounded-full opacity-60 hidden md:block" /> */}

      <div className="relative z-10 grid md:grid-cols-2 items-center px-6 md:px-16 gap-8 w-full max-w-6xl">
        <div className="absolute bottom-1/4 left-1/2 w-12 h-12 bg-purple-200/50 rounded-full opacity-50 animate-bounce hidden md:block" />
        <div className="absolute top-2/3 left-10 w-6 h-6 bg-pink-300/60 rounded-full opacity-60 animate-ping hidden md:block" />
        <div className="absolute top-1/5 right-1/5 w-8 h-8 text-pink-400 animate-spin-slow hidden md:flex items-center justify-center"></div>
        <div className="absolute bottom-10 left-1/4 w-6 h-6 bg-emerald-300/60 rounded-full opacity-60 animate-bounce hidden md:block" />

        {/* LEFT TEXT */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-3">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Welcome Back
            <span className="block text-pink-800 mt-2">
              Continue Your Journey
            </span>
          </h1>
          <p className="mt-2 text-gray-400 max-w-md text-lg mx-auto md:mx-0">
            Empower your wellness, embrace every moment, and bloom gracefully.
          </p>
        </div>

        {/* Centered card */}
        <div className="relative z-10 w-full max-w-md px-6 md:px-0">
          <div className="w-full rounded-3xl p-8 shadow-xl bg-white/20 backdrop-blur-sm">

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
              <p className="text-gray-500 text-sm mt-1">We’re glad you’re back</p>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3 mb-5 justify-center">
              {[FaInstagram, FaFacebookF, FaGoogle].map((Icon, i) => (
                <button
                  key={i}
                  className="p-3 w-28 rounded-full flex items-center justify-center bg-pink-200/30 text-black text-lg shadow-md focus:outline-none"
                  style={{ backgroundColor: 'rgba(248, 203, 211, 0.3)' }}
                >
                  <Icon />
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-400 text-xs mb-5">
              <span className="flex-1 h-px bg-gray-200" />
              or
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Input Fields */}
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email Address"
  className="w-full px-4 py-3 rounded-xl bg-[#F9F6F4]
             border border-gray-200 text-gray-700
             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <PasswordField
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                show={showPassword}
                toggleShow={() => setShowPassword(!showPassword)}
              />
            </div>

            {/* Forgot password */}
            <div className="text-right mt-2">
              <Link to="/forgot" className="text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <Link to='/option'>
              <button
                style={{ backgroundColor: "rgba(224, 133, 148, 1)" }}
                className="w-full mt-6 py-3 rounded-2xl text-white font-semibold shadow-md"
              >
                Login
              </button>
            </Link> 

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-500 mt-5">
              Don’t have an account?
              <Link to="/signup" className="ml-1 text-pink-400 hover:underline">
                Create one
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
