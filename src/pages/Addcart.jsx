import React, { useState } from "react";
import { FaStar, FaPlus, FaMinus, FaShieldAlt } from "react-icons/fa";
import Nav from "./Nav";
import Footer from "./Footer";
import im from "../images/babaybottle.jfif";

const Addcart = () => {
  const [qty, setQty] = useState(1);

  return (
  <div className="min-h-screen bg-[#fff7fb]">
  <Nav />
    <div className="flex justify-start ml-20 mb-20 ">

   <div className="mt-20">
            <h2 className="text-3xl font-semibold"> Products</h2>
            <p className="text-sm text-gray-500 ">
              Home &gt; wellness store &gt;Add to Cart
            </p>
          </div>

    
    <div className="bg-white rounded-2xl shadow p-5 w-[800px] relative top-20 mb-20 mt-20 -ml-[230px]">
        
      <div className="flex gap-5 items-start">

        <img
          src={im}
          alt="Baby Feeding Bottle"
          className="w-[300px] h-[300px] object-contain rounded-3xl "
        />

      <div className="flex-1 space-y-3">
        <h1 className="text-xl font-semibold text-[#3b1d2a]">
          Baby Feeding Bottle
        </h1>

        <p className="text-sm text-gray-600 leading-snug">
          Accurate and safe feeding bottle designed for newborns.
          <br />
          BPA-free material ensures healthy feeding every time.
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} size={13} />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.9)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#051a2f]">₹299</span>
          <span className="line-through text-xs text-gray-400">₹349</span>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-3">

  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
    {/* Decrease Button */}
    <button
      onClick={() => qty > 1 && setQty(qty - 1)}
      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
    >
      <FaMinus size={12} />
    </button>

    {/* Quantity Display */}
    <span className="px-4 text-sm font-semibold text-gray-800">{qty}</span>

    {/* Increase Button */}
    <button
      onClick={() => setQty(qty + 1)}
      className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
    >
      <FaPlus size={12} />
    </button>
  </div>
</div>


        {/* Buttons */}
        <div className="flex gap-3 pt-1">
          <button className="bg-[#051a2f] text-white w-[200px] px-5 py-2 rounded-lg text-sm font-medium">
            Add to Cart
          </button>
          <button className="bg-[#e08594] w-[200px] text-white px-5 py-2 rounded-lg text-sm font-medium">
            Buy Now
          </button>
        </div>

        {/* Trust */}
        <div className="flex items-center gap-2 pt-2 text-xs text-gray-600">
          <FaShieldAlt className="text-green-500" />
          BPA Free • Safe for Newborns
        </div>
      </div>

    </div>
  </div>
</div>


      <Footer />
    </div>
  );
};

export default Addcart;
