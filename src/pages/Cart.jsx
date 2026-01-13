import React from "react";
import { FiFilter } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

import im from "../images/pad.jfif";
import im1 from "../images/tampons.jfif";
import im2 from "../images/iron.jfif";
import im3 from "../images/jrnl.jfif";
import im4 from "../images/kits.jfif";
import im5 from "../images/mencup.jfif";
import im6 from "../images/wipes.jfif";
import im8 from "../images/dark.jfif";
import im9 from "../images/heat.jfif";
import im10 from "../images/btl.jfif";
import im11 from "../images/herbal.jfif";
import im12 from "../images/hotbag.jfif";

import Nav from "./Nav";
import Footer from "./Footer";

const products = [
  {
    id: 1,
    name: "Organic Sanitary Pads",
    desc: "Chemical-free, breathable pads designed for gentle daily comfort.",
    price: "₹299",
    oldPrice: "₹349",
    img: im,
  },
  {
    id: 2,
    name: "Reusable Menstrual Cup",
    desc: "Eco-friendly silicone cup offering up to 12 hours of protection.",
    price: "₹499",
    oldPrice: "₹599",
    img: im5,
  },
  {
    id: 3,
    name: "Electric Heating Pad",
    desc: "Soothing heat therapy to relieve menstrual cramps instantly.",
    price: "₹899",
    oldPrice: "₹1,099",
    img: im9,
  },
  {
    id: 4,
    name: "Period Care Kit",
    desc: "All-in-one essentials kit for complete period wellness.",
    price: "₹199",
    oldPrice: "₹249",
    img: im4,
  },
  {
    id: 5,
    name: "Herbal Period Tea",
    desc: "Natural herbs to ease cramps and balance hormones.",
    price: "₹349",
    oldPrice: "₹399",
    img: im11,
  },
  {
    id: 6,
    name: "Cramp Relief Hot Bag",
    desc: "Reusable hot water bag for deep muscle relaxation.",
    price: "₹249",
    oldPrice: "₹299",
    img: im12,
  },
  {
    id: 7,
    name: "Tampons",
    desc: "High-absorbency tampons for discreet and active days.",
    price: "₹329",
    oldPrice: "₹379",
    img: im1,
  },
  {
    id: 8,
    name: "Period Journal Kit",
    desc: "Track cycles, moods, and self-care routines mindfully.",
    price: "₹599",
    oldPrice: "₹699",
    img: im3,
  },
  {
    id: 9,
    name: "Unscented Intimate Wipes",
    desc: "Gentle, alcohol-free wipes for on-the-go freshness.",
    price: "₹299",
    oldPrice: "₹349",
    img: im6,
  },
  {
    id: 10,
    name: "Iron Supplements",
    desc: "Supports iron levels and reduces period fatigue.",
    price: "₹1,499",
    oldPrice: "₹1,799",
    img: im2,
  },
  {
    id: 11,
    name: "Dark Chocolate",
    desc: "Rich magnesium treat to lift mood during periods.",
    price: "₹199",
    oldPrice: "₹249",
    img: im8,
  },
  {
    id: 12,
    name: "Hot Water Bottle",
    desc: "Classic comfort companion for period pain relief.",
    price: "₹279",
    oldPrice: "₹329",
    img: im10,
  },
];

const Cart = () => {
  return (
    <div className="min-h-screen w-screen bg-[#fff7fb] text-[#4a2c3a]">
      <Nav />

      <div className="pt-5">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-6 py-10 mt-6 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-3xl font-semibold"> Products</h2>
            <p className="text-sm text-gray-500 mt-1">
              Home &gt; wellness store
            </p>
          </div>

           <div className="flex items-center space-x-6 mt-6 md:mt-0 text-sm">
                      <span className="font-medium">Sort By:</span>
                      <span className="text-[#051a2f] font-semibold cursor-pointer">
                        Relevance
                      </span>
                      <span className="cursor-pointer hover:text-[#363f47]">
                        Newest First
                      </span>
                      <span className="cursor-pointer hover:text-[#363f47]">
                        Popularity
                      </span>
                      <span className="cursor-pointer hover:text-[#363f47]">
                        Price ↑
                      </span>
                      <span className="cursor-pointer hover:text-[#363f47]">
                        Price ↓
                      </span>
          
                      <button className="flex items-center gap-2 bg-[#051a2f] text-white px-4 py-2 rounded-lg hover:bg-[#949da4]">
                        <FiFilter /> Filter
                      </button>
                    </div>
                  </div>
                </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-15">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
          >
            <img
              src={product.img}
              alt={product.name}
className="h-[350px] w-full object-cover rounded-t-3xl"
            />

            <div className="p-6 space-y-2">
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.desc}</p>

              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xl font-bold text-black">
                  {product.price}
                </span>
                <span className="text-sm line-through text-gray-400">
                  {product.oldPrice}
                </span>
              </div>

             <button
  className="w-full mt-3 bg-[#051a2f] text-white py-3 rounded-xl font-medium 
             flex items-center justify-center gap-2
             hover:scale-[1.03] transition"
>
  <MdOutlineShoppingBag className="text-xl" />
  Add to Cart
</button>
</div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
