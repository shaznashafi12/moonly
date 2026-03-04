import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaInstagram, FaFacebookF, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { logg } from "../api/api";

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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    toast.error("Email or password missing");
    return;
  }

  try {
    const response = await logg(formData);

    // Backend should send: { token, user }
    const { token, user } = response.data;

    if (!token || !user) {
      toast.error("Login failed");
      return;
    }

    // Store in localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect based on trackerType
    if (!user.trackerType) {
      navigate("/option");
    } 
    else if (user.trackerType === "period") {
      navigate("/home");
    } 
    else if (user.trackerType === "pregnancy") {
      navigate("/home2");
    }

  } catch (error) {
    console.error("LOGIN ERROR:", error.response || error);
    toast.error(error.response?.data?.message || "Invalid email or password");
  }
};

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-100 via-purple-50 to-emerald-50 relative flex items-center justify-center overflow-hidden px-4 md:px-0">

{/* Floating shapes */}
<div className="absolute top-10 left-4 w-12 h-12 bg-pink-200 rounded-full opacity-50 sm:top-16 sm:left-8 md:top-20 md:left-10 md:w-24 md:h-24" />

<div className="absolute bottom-20 left-6 w-10 h-10 bg-purple-200 rounded-full opacity-50 sm:bottom-24 sm:left-16 md:bottom-32 md:left-40 md:w-16 md:h-16" />

<div className="absolute top-12 right-6 w-10 h-10 bg-pink-300/70 rounded-full opacity-50 sm:w-12 sm:h-12 md:top-10 md:right-20 animate-bounce" />

<div className="absolute bottom-16 right-6 w-8 h-8 bg-purple-300/50 rounded-full opacity-50 animate-pulse" />

<div className="absolute top-1/2 left-1/2 w-8 h-8 bg-pink-300 rounded-full opacity-40 animate-spin" />
      {/* Centered grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full max-w-6xl">

        {/* LEFT TEXT */}
        <div className="flex flex-col justify-center text-center md:text-left space-y-3 px-2 sm:px-4 md:px-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Welcome Back
            <span className="block text-pink-800 mt-2">Continue Your Journey</span>
          </h1>
          <p className="mt-2 text-gray-400 max-w-md text-base sm:text-lg mx-auto md:mx-0">
            Empower your wellness, embrace every moment, and bloom gracefully.
          </p>
        </div>

        {/* RIGHT FORM */}
<div className="relative z-10 w-full max-w-md px-2 sm:px-6 md:px-0 md:ml-12">
          <div className="w-full rounded-3xl p-6 sm:p-8 shadow-xl bg-white/20 backdrop-blur-sm">

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
              <p className="text-gray-500 text-sm mt-1">We’re glad you’re back</p>
            </div>

            {/* Social buttons */}
            <div className="flex gap-3 mb-5 justify-center flex-wrap">
              {[FaInstagram, FaFacebookF, FaGoogle].map((Icon, i) => (
                <button
                  key={i}
                  className="p-3 w-20 sm:w-28 rounded-full flex items-center justify-center bg-pink-200/30 text-black text-lg shadow-md"
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

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
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
              </div>

              <div className="text-right mt-2">
                <Link to="/forgot" className="text-sm hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: "rgba(224, 133, 148, 1)" }}
                className="w-full mt-6 py-3 rounded-2xl text-white font-semibold shadow-md"
              >
                Login
              </button>
            </form>

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
