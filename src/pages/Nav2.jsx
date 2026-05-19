import React, { useState } from "react";
import {
  FiHome,
  FiInfo,
  FiPhone,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import logoImg from "../images/love.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Nav2 = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: <FiHome />, label: "Home", link: "/home2" },
    { icon: <FiInfo />, label: "About", link: "/about" },
    { icon: <FiPhone />, label: "Contact", link: "/contact" },
    { icon: <FiShoppingCart />, label: "Cart", link: "/addcart" },
  ];

const handleLogout = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?._id) {
    try {
      const res = await axios.put("http://localhost:4000/user/logout", {
        userId: user._id,
      });

      // Update user locally with trackerType = null
      localStorage.setItem("user", JSON.stringify(res.data.user));
    } catch (err) {
      console.error("Error resetting tracker:", err);
    }
  }

  // Only remove token, keep user object for tracker selection
  localStorage.removeItem("token");

  navigate("/login"); // send user to tracker selection
};
 return (
    <nav className="bg-white/70 backdrop-blur shadow-sm fixed top-0 w-full z-50">
      <div className="w-full px-4 md:px-8 lg:px-12 py-4 flex items-center">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-default">
          <img src={logoImg} alt="Moonly logo" className="w-8 h-8 object-contain" />
          <span className="text-3xl font-extrabold tracking-wide">
            <span className="text-[#3f2d2d]">Moon</span>
            <span className="text-[#e08594]">ly</span>
          </span>
        </div>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-10">

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 font-medium">
            {menuItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `group flex items-center gap-2 text-sm tracking-wide cursor-pointer ${
                      isActive
                        ? "text-[#e08594]"
                        : "text-[#3f2d2d] hover:text-[#e08594] transition-colors duration-300"
                    }`
                  }
                >
                  <span className="flex items-center gap-1">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
                    <button
                      className="hidden md:block text-[#3f2d2d] hover:text-[#e08594]"
                      onClick={() => navigate("/userr")}
                    >
                      <FiUser size={20} />
                    </button>
          

          {/* Logout Desktop */}
          <button
            className="hidden md:block cursor-pointer text-[#ff3b3b] hover:text-red-600 transition-colors duration-300"
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut size={16} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#3f2d2d] hover:text-[#620313]"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white/90 backdrop-blur px-6 pb-4">
          <ul className="flex flex-col gap-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.link}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-sm ${
                      isActive ? "text-[#e08594]" : "text-[#3f2d2d]"
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            ))}
              <button
                          className="flex items-center gap-3 text-sm"
                          onClick={() => navigate("/user")}
                        >
                          <FiUser />
                          Profile
                        </button>
            {/* Logout Mobile */}
            <button
              className="flex items-center gap-3 text-sm text-[#ff3b3b] hover:text-red-600"
              onClick={() => {
                setOpen(false);
                handleLogout();
              }}
            >
              <FiLogOut />
              Logout
            </button>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Nav2;