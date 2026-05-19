import React, { useState, useEffect } from "react";
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

const Nav = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const menuItems = [
    { icon: <FiHome />, label: "Home", link: "/home" },
    { icon: <FiInfo />, label: "About", link: "/about" },
    { icon: <FiPhone />, label: "Contact", link: "/contact" },
    { icon: <FiShoppingCart />, label: "Cart", link: "/addcart2" },
  ];

  const handleLogout = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
      try {
        const res = await axios.put("http://localhost:4000/user/logout", {
          userId: user._id,
        });
        localStorage.setItem("user", JSON.stringify(res.data.user));
      } catch (err) {
        console.error("Error resetting tracker:", err);
      }
    }
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white/70 backdrop-blur shadow-sm fixed top-0 w-full z-50">
        <div className="w-full px-4 md:px-8 py-3 md:py-4 flex items-center">

          {/* Logo */}
          <div className="flex items-center gap-2 cursor-default flex-shrink-0">
            <img
              src={logoImg}
              alt="Moonly logo"
              className="w-7 h-7 md:w-8 md:h-8 object-contain"
            />
            <span className="text-2xl md:text-3xl font-extrabold tracking-wide">
              <span className="text-[#3f2d2d]">Moon</span>
              <span className="text-[#e08594]">ly</span>
            </span>
          </div>

          <div className="ml-auto flex items-center gap-4 md:gap-8">

            {/* Desktop Menu */}
            <ul className="hidden md:flex items-center gap-8 font-medium">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm transition-colors duration-200 ${
                        isActive
                          ? "text-[#e08594]"
                          : "text-[#3f2d2d] hover:text-[#e08594]"
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Desktop: User Profile Icon */}
            <button
              className="hidden md:block text-[#3f2d2d] hover:text-[#e08594] transition-colors duration-200"
              onClick={() => navigate("/userr")}
            >
              <FiUser size={20} />
            </button>

            {/* Desktop: Logout */}
            <button
              className="hidden md:block text-[#fb0404] hover:text-red-600 transition-colors duration-200"
              onClick={handleLogout}
            >
              <FiLogOut size={18} />
            </button>

            {/* Mobile: Hamburger */}
            <button
              className="md:hidden text-[#3f2d2d] p-1 rounded-lg hover:bg-pink-50 transition-colors duration-200"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur border-t border-pink-100 px-6 py-4">
            <ul className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.link}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 text-sm px-3 py-2.5 rounded-xl transition-colors duration-200 ${
                        isActive
                          ? "text-[#e08594] bg-pink-50"
                          : "text-[#3f2d2d] hover:text-[#e08594] hover:bg-pink-50"
                      }`
                    }
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {/* Divider */}
              <li className="my-1 border-t border-pink-100" />

              {/* Profile */}
              <li>
                <button
                  className="w-full flex items-center gap-3 text-sm px-3 py-2.5 rounded-xl text-[#3f2d2d] hover:text-[#e08594] hover:bg-pink-50 transition-colors duration-200"
                  onClick={() => { setOpen(false); navigate("/userr"); }}
                >
                  <FiUser className="text-base" />
                  Profile
                </button>
              </li>

              {/* Logout */}
              <li>
                <button
                  className="w-full flex items-center gap-3 text-sm px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors duration-200"
                  onClick={() => { setOpen(false); handleLogout(); }}
                >
                  <FiLogOut className="text-base" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile backdrop overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/10 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Nav;
