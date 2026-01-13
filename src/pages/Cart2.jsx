import React from "react";
import { FiFilter } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";

import im from "../images/babaybottle.jfif";
import im1 from "../images/baby3.jfif";
import im2 from "../images/blanket.jfif";
import im3 from "../images/diaper.jfif";
import im4 from "../images/creammo.jfif";
import im5 from "../images/hood.jfif";
import im6 from "../images/pillow.jfif";
import im8 from "../images/stretch.jfif";
import im9 from "../images/test.jfif";
import im10 from "../images/bar.jfif";
import im11 from "../images/bbg.jfif";
import im12 from "../images/babylotion.jfif";

import Nav from "./Nav";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Baby Feeding Bottle",
    desc: "Safe, BPA-free feeding bottle designed for newborns and infants.",
    price: "₹299",
    oldPrice: "₹349",
    img: im,
    link:'/addcart'
  },
  {
    id: 2,
    name: "Baby Hooded Towel",
    desc: "Soft and absorbent hooded towel to keep babies warm after bath.",
    price: "₹499",
    oldPrice: "₹599",
    img: im5,
  },
  {
    id: 3,
    name: "Pregnancy Test Kit",
desc: "Accurate and easy-to-use home pregnancy testing kit.\nQuick results you can trust at home.",
    price: "₹899",
    oldPrice: "₹1,099",
    img: im9,
  },
  {
    id: 4,
    name: "CeraVe Moisturizing Cream",
    desc: "Dermatologist-approved cream for deep hydration and skin repair.",
    price: "₹199",
    oldPrice: "₹249",
    img: im4,
  },
  {
    id: 5,
    name: "Baby Muslin Top and Bloomer Set",
    desc: "Soft muslin cotton outfit set designed for baby comfort.",
    price: "₹349",
    oldPrice: "₹399",
    img: im11,
  },
  {
    id: 6,
    name: "Baby Body Lotion",
    desc: "Gentle moisturizing lotion to keep baby skin soft and nourished.",
    price: "₹249",
    oldPrice: "₹299",
    img: im12,
  },
  {
    id: 7,
    name: "Cotton Baby Sleepsuit (Pack of 3)",
    desc: "Soft cotton sleepsuits with snap buttons for easy changing.",
    price: "₹329",
    oldPrice: "₹379",
    img: im1,
  },
  {
    id: 8,
    name: "Baby Diapers",
    desc: "Highly absorbent diapers for all-day and overnight protection.",
    price: "₹599",
    oldPrice: "₹699",
    img: im3,
  },
  {
    id: 9,
    name: "Maternity Support Pillow",
    desc: "Full body support pillow for better sleep during pregnancy.",
    price: "₹299",
    oldPrice: "₹349",
    img: im6,
  },
  {
    id: 10,
    name: "Baby Swaddle Blanket",
    desc: "Soft and breathable swaddle blanket for newborn comfort.",
    price: "₹1,499",
    oldPrice: "₹1,799",
    img: im2,
  },
  {
    id: 11,
    name: "Anti Stretch Mark Lotion",
    desc: "Moisturizing lotion to help reduce and prevent stretch marks.",
    price: "₹199",
    oldPrice: "₹249",
    img: im8,
  },
  {
    id: 12,
    name: "Baby Skincare Kit",
    desc: "Complete baby care kit with lotion, cream, and soap essentials.",
    price: "₹279",
    oldPrice: "₹329",
    img: im10,
  },
];


const Cart2 = () => {
  return (
    <div className="min-h-screen w-screen bg-[#fff7fb] text-[#4a2c3a]">
      <Nav />

      <div className="pt-5">
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

<div className="p-6 space-y-2 ">
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

           <Link to={product.link || "/addcart"}>
  <button
    className="w-full mt-3 bg-[#051a2f] text-white py-3 rounded-xl font-medium 
               flex items-center justify-center gap-2
               hover:scale-[1.03] transition"
  >
    <MdOutlineShoppingBag className="text-xl" />
    Add to Cart
  </button>
</Link>

</div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Cart2;
