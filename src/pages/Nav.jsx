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
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: <FiHome />, label: "Home", link: "/" },
    { icon: <FiInfo />, label: "About", link: "/about" },
    { icon: <FiPhone />, label: "Contact", link: "/contact" },
    { icon: <FiShoppingCart />, label: "Cart", link: "/cart" },
    { icon: <FiUser />, label: "Login", link: "/login" },
  ];

  return (
    <nav className="bg-white/70 backdrop-blur shadow-sm fixed top-0 w-full z-50">
      <div className="w-full px-4 md:px-8 py-4 flex items-center">

        {/* Logo (left end) */}
        <div className="flex items-center gap-2 cursor-default">
          <img src={logoImg} alt="Moonly logo" className="w-8 h-8 object-contain" />
          <span className="text-3xl font-extrabold tracking-wide">
            <span className="text-[#3f2d2d]">Moon</span>
            <span className="text-[#e08594]">ly</span>
          </span>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-10">

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 font-medium">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.link}
                  className="group flex items-center gap-2 text-sm tracking-wide"
                >
                  <span className="text-[#795e5e] group-hover:text-[#e08594] transition-colors duration-300">
                    {item.icon}
                  </span>
                  <span className="text-[#3f2d2d] group-hover:text-[#e08594] transition-colors duration-300">
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Logout (desktop) */}
          <button
            className="hidden md:block text-[#3f2d2d] hover:text-[#e08594] transition-colors duration-300"
            onClick={() => navigate("/login")}
            title="Logout"
          >
            <FiLogOut size={15} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#3f2d2d]"
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
                <Link
                  to={item.link}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 text-sm"
                >
                  <span className="text-[#795e5e]">{item.icon}</span>
                  <span className="text-[#3f2d2d]">{item.label}</span>
                </Link>
              </li>
            ))}
            <button
              className="flex items-center gap-3 text-sm text-[#3f2d2d]"
              onClick={() => {
                setOpen(false);
                navigate("/login");
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

export default Nav;
