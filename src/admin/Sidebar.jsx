import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBoxOpen, FaGift, FaUtensils, FaClock, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = ({ active }) => {
  const menuItems = [
    { icon: <FaBoxOpen />, label: "Dashboard", link: "/dashboard" },
    { icon: <FaGift />, label: "Products", link: "/product" },
    { icon: <FaGift />, label: "Period Kits", link: "/periodkits" },
    { icon: <FaUser />, label: "Users", link: "/users" },
    { icon: <FaBoxOpen />, label: "Orders", link: "/orderpage" },
    { icon: <FaUtensils />, label: "Diet Content", link: "/dietcontent" },
    { icon: <FaClock />, label: "Delay Reasons", link: "/delayreasons" },
    { icon: <FaFileAlt />, label: "Prescriptions", link: "/prescriptions" },
    { icon: <FaCog />, label: "Settings", link: "/settings" },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <div className="text-2xl font-bold mb-10">
        FemCare <span className="text-sm font-light block">Admin Panel</span>
      </div>
      <ul className="space-y-4 flex-1">
        {menuItems.map((item) => (
          <li key={item.label} className={`flex items-center gap-3 cursor-pointer p-2 rounded ${active === item.label ? "bg-pink-400/20 text-pink-400" : "hover:text-pink-400"}`}>
            <Link to={item.link || "#"} className="flex items-center gap-3 w-full">
              {item.icon} {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3 hover:text-red-500 cursor-pointer mt-4">
        <FaSignOutAlt /> Logout
      </div>
    </div>
  );
};

export default Sidebar;
