import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBoxOpen, FaGift, FaCog, FaSignOutAlt, FaHospital, FaNotesMedical } from "react-icons/fa";

const Sidebar = ({ active }) => {
  const menuItems = [
    { icon: <FaBoxOpen />, label: "Dashboard", link: "/dashboard" },
         { icon: <FaGift />, label: "add product", link: "/addproduct" },
   
    { icon: <FaGift />, label: "Products", link: "/product" },
    // { icon: <FaGift />, label: "Period Kits", link: "/periodkits" },
    { icon: <FaUser />, label: "Users", link: "/AdminUsers" },
    { icon: <FaBoxOpen />, label: "Orders", link: "/orderpage" },
    // { icon: <FaUtensils />, label: "Diet Content", link: "/addiet" },
    // { icon: <FaClock />, label: "Delay Reasons", link: "/addelay" },
    { icon: <FaHospital />, label: "Hospital Checklists", link: "/addcheck" },
    { icon: <FaNotesMedical />, label: "Medical Records", link: "/adminmed" },

    { icon: <FaCog />, label: "Settings", link: "/setting" },
];

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6 flex flex-col">
      <div className="text-2xl font-bold mb-10">
        <span className="text-3xl font-extrabold tracking-wide ">
  <span className="text-white">Moon</span>
  <span className="text-[#e08594] ">
    ly
  </span>
</span> <span className="text-sm font-light block">Admin Panel</span>
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

      <div className="flex items-center gap-3 hover:text-red-500 cursor-pointer mt-4">
        <FaSignOutAlt /> Logout
      </div>
    </div>
  );
};

export default Sidebar;
