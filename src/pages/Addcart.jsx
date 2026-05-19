import React, { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaStar, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Addcart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Load Pregnancy cart from localStorage
useEffect(() => {
  const savedCart = JSON.parse(localStorage.getItem("cart_pregnancy")) || [];
  setCart(savedCart);
}, []);
const increaseQty = (index) => {
  const updated = [...cart];
  updated[index].quantity += 1;

  setCart(updated);
  localStorage.setItem("cart_pregnancy", JSON.stringify(updated));
};

const decreaseQty = (index) => {
  const updated = [...cart];

  if (updated[index].quantity > 1) {
    updated[index].quantity -= 1;

    setCart(updated);
    localStorage.setItem("cart_pregnancy", JSON.stringify(updated));
  }
};
const removeItem = (index) => {
  const updatedCart = cart.filter((_, i) => i !== index);

  setCart(updatedCart);
  localStorage.setItem("cart_pregnancy", JSON.stringify(updatedCart));
};
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.05;
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + delivery;

 if (cart.length === 0) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#051a2f] mb-4 text-center">
          Your cart is empty
        </h2>
        <p className="text-sm sm:text-base text-gray-500 text-center max-w-md">
          Looks like you haven’t added anything yet. Browse our store and add your favorites to the cart.
        </p>
        <button
          onClick={() => navigate("/cart2")}
          className="mt-6 bg-[#051a2f] text-white py-2.5 px-6 rounded-lg hover:bg-[#3b1d2a] transition text-sm sm:text-base"
        >
          Continue Shopping
        </button>
      </main>

      <Footer />
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#fff7fb] overflow-x-hidden">
      <Nav />

      <div className="max-w-6xl mx-auto px-4 py-10 mt-16">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold">Your Cart</h2>
<p className="text-sm text-gray-500">
  <Link to="/home2" className="hover:text-[#e08594]">
    Home
  </Link>{" "}
  &gt;{" "}
  <Link to="/cart2" className="hover:text-[#e08594]">
    Wellness Store
  </Link>{" "}
  &gt; Cart
</p>  
      </div>

        <div className="grid md:grid-cols-[2fr_1fr] gap-8">
          {/* Products */}
          <div className="space-y-6">
           
            {cart.map((item, index) => (
<div key={index} className="bg-white rounded-2xl shadow p-6 relative">        
          <button
  onClick={() => removeItem(index)}
  className="absolute top-4 right-4 text-red-500 hover:text-red-700"
>
  <FaTrash />
</button>
          <div className="flex gap-6">
                  <img
                    src={item.img || item.image}
                    alt={item.name}
                    className="w-[160px] h-[160px] md:w-[220px] md:h-[220px] object-contain rounded-2xl"
                  />
                  <div className="flex-1 space-y-3">
                    <h1 className="text-xl font-semibold text-[#3b1d2a]">{item.name}</h1>
                    <p className="text-sm text-gray-600">{item.description}</p>

                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                    </div>

                    <div className="text-xl font-bold text-[#051a2f]">
                      ₹{item.price * item.quantity}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex border rounded-lg overflow-hidden">
                        <button onClick={() => decreaseQty(index)} className="px-3 py-2 hover:bg-gray-100">
                          <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-2 font-semibold">{item.quantity}</span>
                        <button onClick={() => increaseQty(index)} className="px-3 py-2 hover:bg-gray-100">
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Price Details */}
          <div className="bg-white rounded-2xl shadow p-6 h-fit">
            <h2 className="font-semibold text-lg mb-4 text-gray-800">Price Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Price ({cart.length} items)</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Discount (5%)</span>
                <span>- ₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
              </div>
              <hr />
              <div className="flex justify-between font-semibold text-base">
                <span>Total Amount</span>
                <span>₹{total}</span>
              </div>
              <p className="text-xs text-green-600">You saved ₹{discount} on this order 🎉</p>

              <div className="mt-4">
                <button
                  onClick={() => navigate("/checkout2")}
                  className="w-full bg-[#3b1d2a] text-white py-3 rounded-lg hover:bg-[#5a2c42] transition"
                >
                  Checkout
                </button>
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