import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaBoxOpen, FaGift, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const Sidebar = ({ active }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // mobile toggle

  const menuItems = [
    { icon: <FaBoxOpen />, label: "Dashboard", link: "/dashboard" },
    { icon: <FaGift />, label: "add product", link: "/addproduct" },
    { icon: <FaGift />, label: "Products", link: "/product" },
    { icon: <FaUser />, label: "Users", link: "/AdminUsers" },
    { icon: <FaBoxOpen />, label: "Orders", link: "/orderpage" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center bg-gray-900 text-white p-4">
        <button onClick={() => setIsOpen(!isOpen)} className="mr-3">
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
        <div className="text-xl font-bold">
          Moon<span className="text-[#e08594]">ly</span>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative z-50
          w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col
          ${isOpen ? "left-0" : "-left-full"} md:left-0
          transition-left duration-300
        `}
      >
        <div className="text-2xl font-bold mb-10">
          <span className="text-3xl font-extrabold tracking-wide ">
            <span className="text-white">Moon</span>
            <span className="text-[#e08594]">ly</span>
          </span>
          <span className="text-sm font-light block">Admin Panel</span>
        </div>

        <ul className="space-y-4 flex-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.link || "#"}
                className={`flex items-center gap-3 p-2 rounded w-full transition ${
                  active === item.label
                    ? "bg-pink-400/20 text-[#e08594] font-semibold"
                    : "text-white hover:text-[#e08594]"
                }`}
              >
                {item.icon} {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div
          onClick={handleLogout}
          className="flex items-center gap-3 hover:text-red-600 cursor-pointer mt-4"
        >
          <FaSignOutAlt /> Logout
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/30 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;