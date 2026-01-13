import React from 'react'
import {
  FiHome,
  FiInfo,
  FiPhone,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import logoImg from "../images/love.png";
import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <div><nav className="bg-white/70 backdrop-blur shadow-sm fixed top-0 w-full z-50">
            <div className="max-w-7xl -ml-2 mx-auto px-6 py-4 flex items-center justify-between">
    
              {/* Logo */}
             {/* Logo (also not clickable now) */}
    <div className="flex items-center gap-2 cursor-default">
      <img
        src={logoImg}
        alt="Moonly logo"
        className="w-8 h-8 object-contain"
      />
      <span className="text-3xl font-extrabold tracking-wide">
        <span className="text-[#3f2d2d]">Moon</span>
        <span className="text-[#e08594]">ly</span>
      </span>
    </div>
    
    {/* Menu */}
   <ul className="flex items-center gap-10 font-medium -mr-52">
  {[
    { icon: <FiHome />, label: "Home", link: "/" },
    { icon: <FiInfo />, label: "About", link: "/about" },
    { icon: <FiPhone />, label: "Contact", link: "/contact" },
    { icon: <FiShoppingCart />, label: "Cart", link: "/cart" },
    { icon: <FiUser />, label: "Login", link: "/login" },
  ].map((item) => (
    <li key={item.label}>
      <Link
        to={item.link}
        className="group flex items-center gap-2 text-sm tracking-wide cursor-pointer"
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

    
            </div>
          </nav>
    </div>
  )
}

export default Nav