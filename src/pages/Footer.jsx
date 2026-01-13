import React from 'react'
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <div><footer className="relative bg-black pt-20 pb-10 text-white">
  
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

    {/* About */}
    <div >
    <span className="text-3xl font-extrabold tracking-wide ">
  <span className="text-white">Moon</span>
  <span className="text-[#e08594] ">
    ly
  </span>
</span>

      <p className="text-sm text-white/70 leading-relaxed mt-4">
        Thoughtfully designed wellness tools to support your body,
        emotions, and rhythm through every phase.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Explore
      </h3>
      <ul className="space-y-3 text-sm text-white/70">
        {["Home", "About", "Products", "Period Tracker", "Pregnancy Mode"].map(
          (link, i) => (
            <li
              key={i}
              className="hover:text-white transition cursor-pointer"
            >
              {link}
            </li>
          )
        )}
      </ul>
    </div>

    {/* Support */}
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Support
      </h3>
      <ul className="space-y-3 text-sm text-white/70">
        {["FAQs", "Privacy Policy", "Terms & Conditions", "Help Center"].map(
          (item, i) => (
            <li
              key={i}
              className="hover:text-white transition cursor-pointer"
            >
              {item}
            </li>
          )
        )}
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-lg font-semibold mb-4">
        Contact
      </h3>
      <ul className="space-y-3 text-sm text-white/70">
        <li>hello@moonly.com</li>
        <li>+91 98765 43210</li>
      </ul>

      {/* Social */}
      <div className="flex gap-4 mt-5">
        {[FiInstagram, FiFacebook, FiTwitter].map((Icon, i) => (
          <div
            key={i}
            className="w-10 h-10 rounded-full border border-white/20
                       flex items-center justify-center
                       hover:bg-white hover:text-black
                       transition cursor-pointer"
          >
            <Icon />
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Bottom */}
  <div className="mt-14 border-t border-white/20 pt-6 text-center text-sm text-white/50">
    © {new Date().getFullYear()} Moonly. All rights reserved.
  </div>
</footer>
</div>
  )
}

export default Footer