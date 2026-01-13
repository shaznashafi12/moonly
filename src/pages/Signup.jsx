import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
             placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-pink-300"
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
const Signup = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
   
    <div className="h-screen w-screen bg-gradient-to-br from-pink-100 via-purple-50 to-emerald-50 relative flex items-center justify-center overflow-hidden">

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-pink-200 rounded-full opacity-60 hidden md:block" />
      <div className="absolute bottom-32 left-40 w-16 h-16 bg-purple-200 rounded-full opacity-60 hidden md:block" />
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-emerald-200 rounded-full opacity-60 hidden md:block" />
<div className="absolute top-10 right-20 w-12 h-12 bg-pink-300/70 rounded-full opacity-50 animate-bounce-slow hidden md:block" />
<div className="absolute bottom-20 right-10 w-8 h-8 bg-purple-300/50 rounded-full opacity-50 animate-pulse hidden md:block" />
<div className="absolute top-1/2 left-1/2 w-10 h-10 text-pink-400 animate-spin-slow hidden md:flex items-center justify-center">
</div>
<div className="absolute bottom-1/4 left-1/2 w-12 h-12 bg-purple-200/50 rounded-full opacity-50 animate-bounce hidden md:block" />
<div className="absolute top-2/3 left-10 w-6 h-6 bg-pink-300/60 rounded-full opacity-60 animate-ping hidden md:block" />
<div className="absolute top-1/5 right-1/5 w-8 h-8 text-pink-400 animate-spin-slow hidden md:flex items-center justify-center"></div>
<div className="absolute bottom-10 left-1/4 w-6 h-6 bg-emerald-300/60 rounded-full opacity-60 animate-bounce hidden md:block" />
      {/* Centered card */}
      <div className="relative z-10 grid md:grid-cols-2 items-center px-6 md:px-16 gap-8 w-full max-w-6xl">

        {/* LEFT TEXT */}
        <div className="flex flex-col justify-center text-center md:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
            Your Wellness Journey
            <span className="block text-pink-800 mt-2">
              Starts Here
            </span>
          </h1>
          <p className="mt-6 text-gray-600 max-w-md text-lg mx-auto md:mx-0">
            Track your cycle, nurture your body, and embrace every phase of womanhood with care and confidence.
          </p>
        </div>

        {/* RIGHT FORM */}
        <div className="flex justify-center md:justify-end">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-xl">

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Create Account</h2>
              <p className="text-gray-500 text-sm mt-1">Begin your wellness journey</p>
            </div>

            {/* Social Buttons - Guaranteed Glassy Pink */}
  {/* Social Buttons - Guaranteed Glassy Pink */}
<div className="flex gap-3 mb-5 justify-center">
  {[FaInstagram, FaFacebookF, FaGoogle].map((Icon, i) => (
    <button
      key={i}
      className="p-3 w-28 rounded-full flex items-center justify-center
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
  placeholder="Full Name"
  className="w-full px-4 py-3 rounded-xl bg-[#F9F6F4]
             border border-gray-200 text-gray-700
             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-300"
/>

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
              <PasswordField
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                show={showConfirm}
                toggleShow={() => setShowConfirm(!showConfirm)}
              />
            </div>

           <button
  style={{ 
    backgroundColor: "rgba(224, 133, 148, 1)",
    backdropFilter: "blur(10px)"
  }}
  className="w-full mt-4 px-4 py-3 rounded-xl bg-[#F9F6F4]
             border border-gray-200 text-white
             placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-200"
>
  Register
</button>


              
            {/* Login Link */}
            <p className="text-center text-sm text-gray-500 mt-5">
              Already have an account?
               <Link to="/login" className="ml-1 text-pink-400 hover:underline">
Login                          </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
