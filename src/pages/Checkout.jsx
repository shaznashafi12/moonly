import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCreditCard, FaUniversity, FaWallet } from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";
import { createOrder } from "../api/api.js";

const Checkout = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
  });
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart_periods")) || [];
    setCart(savedCart);
  }, []);

  // Totals
  const subtotal = cart.reduce((acc, item) => {
    const price = typeof item.price === "string" ? parseInt(item.price.replace(/[^0-9]/g, "")) : item.price;
    return acc + price * item.quantity;
  }, 0);
  const discount = subtotal * 0.05;
  const delivery = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + delivery;

  // Place order
  const handlePlaceOrder = async () => {
  // Shipping validation
if (!shipping.fullName.trim()) {
  alert("Please enter your full name");
  return;
}

if (shipping.fullName.trim().length < 3) {
  alert("Name must be at least 3 characters");
  return;
}

const phoneRegex = /^[6-9]\d{9}$/;

if (!phoneRegex.test(shipping.phone)) {
  alert("Enter a valid 10-digit phone number");
  return;
}

if (!shipping.address.trim()) {
  alert("Please enter your address");
  return;
}

if (!shipping.city.trim()) {
  alert("Please enter your city");
  return;
}

if (!shipping.state.trim()) {
  alert("Please enter your state");
  return;
}

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      setLoading(true);

      const items = cart.map(item => {
        const price = typeof item.price === "string" ? parseInt(item.price.replace(/[^0-9]/g, "")) : item.price;
        return {
          _id: item._id,
          name: item.name,
          price,
          quantity: item.quantity,
          totalPrice: price * item.quantity,
          image: item.img || item.image,
          category: item.category || "unknown",
        };
      });

      await createOrder({
        items,
        paymentMethod: payment,
        shippingDetails: shipping,
        total,
      });

      
      localStorage.removeItem("cart_periods");
      setCart([]);
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
      alert(error?.message || "Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff7fb]">
      <Nav />
      <div className="max-w-6xl mx-auto px-6 py-12 mt-10">
        <h1 className="text-4xl font-bold text-[#e08594] mb-6">Checkout</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

         {/* Shipping Details */}
<div className="bg-white h-[650px] rounded-2xl shadow p-6 space-y-4">
  <h2 className="text-lg font-semibold text-[#051a2f]">Shipping Details</h2>

  {/* Full Name */}
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      Full Name
    </label>
    <input
      type="text"
      placeholder="Enter your full name"
      value={shipping.fullName}
      onChange={(e) =>
        setShipping({ ...shipping, fullName: e.target.value })
      }
      className="w-full border rounded-lg px-4 py-2 text-sm"
    />
  </div>

  {/* Phone */}
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      Phone Number
    </label>
   <input
  type="tel"
  maxLength="10"
  placeholder="Enter your phone number"
  value={shipping.phone}
  onChange={(e) =>
    setShipping({ ...shipping, phone: e.target.value })
  }
  className="w-full border rounded-lg px-4 py-2 text-sm"
/>
  </div>

  {/* Address */}
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      Address
    </label>
    <input
      type="text"
      placeholder="House number, street name"
      value={shipping.address}
      onChange={(e) =>
        setShipping({ ...shipping, address: e.target.value })
      }
      className="w-full border rounded-lg px-4 py-2 text-sm"
    />
  </div>

  {/* Landmark */}
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      Landmark
    </label>
    <input
      type="text"
      placeholder="Nearby landmark (optional)"
      value={shipping.landmark}
      onChange={(e) =>
        setShipping({ ...shipping, landmark: e.target.value })
      }
      className="w-full border rounded-lg px-4 py-2 text-sm"
    />
  </div>

  {/* City */}
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      City
    </label>
    <input
      type="text"
      placeholder="Enter your city"
      value={shipping.city}
      onChange={(e) =>
        setShipping({ ...shipping, city: e.target.value })
      }
      className="w-full border rounded-lg px-4 py-2 text-sm"
    />
  </div>

  {/* District */}
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      District
    </label>
    <input
      type="text"
      placeholder="Enter your district"
      value={shipping.district}
      onChange={(e) =>
        setShipping({ ...shipping, district: e.target.value })
      }
      className="w-full border rounded-lg px-4 py-2 text-sm"
    />
  </div>

  {/* State */}
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">
      State
    </label>
    <input
      type="text"
      placeholder="Enter your state"
      value={shipping.state}
      onChange={(e) =>
        setShipping({ ...shipping, state: e.target.value })
      }
      className="w-full border rounded-lg px-4 py-2 text-sm"
    />
  </div>
</div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#051a2f]">Order Summary</h2>
            {cart.map((product, idx) => {
              const price = typeof product.price === "string" ? parseInt(product.price.replace(/[^0-9]/g, "")) : product.price;
              const totalPrice = price * product.quantity;
              return (
                <div key={idx} className="flex gap-4 items-center mb-2">
                  <img src={product.img || product.image} alt={product.name} className="w-20 h-20 rounded-xl object-contain" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">{product.name}</h3>
                    <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">₹{totalPrice}</p>
                </div>
              );
            })}

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between text-green-600"><span>Discount (5%)</span><span>- ₹{discount}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className="text-green-600">{delivery === 0 ? "Free" : `₹${delivery}`}</span></div>
              <div className="flex justify-between font-semibold text-base"><span>Total</span><span>₹{total}</span></div>
            </div>

            {/* Payment */}
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-semibold">Payment Method</h3>
              {[
                { id: "cod", label: "Cash on Delivery", icon: <FaMoneyBillWave className="text-green-600 text-lg" /> },
                { id: "card", label: "Credit / Debit Card", icon: <FaCreditCard className="text-blue-600 text-lg" /> },
                { id: "upi", label: "UPI (Google Pay)", icon: <SiGooglepay className="text-2xl text-[#4285F4]" /> },
                { id: "netbanking", label: "Net Banking", icon: <FaUniversity className="text-indigo-600 text-lg" /> },
                { id: "wallet", label: "Wallets", icon: <FaWallet className="text-orange-500 text-lg" /> },
              ].map(method => (
                <label key={method.id} className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">
                  {method.icon}
                  <span className="text-sm">{method.label}</span>
                  <input type="radio" name="payment" className="hidden" checked={payment === method.id} onChange={() => setPayment(method.id)} />
                  <span className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${payment === method.id ? "border-[#051a2f]" : "border-gray-300"}`}>
                    {payment === method.id && <span className="w-2 h-2 bg-[#051a2f] rounded-full" />}
                  </span>
                </label>
              ))}
              <button onClick={handlePlaceOrder} disabled={loading} className="w-full mt-3 bg-[#051a2f] text-white py-3 rounded-xl font-medium hover:scale-[1.03] transition">
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-[300px] text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#051a2f]">Order Placed!</h3>
            <p className="text-sm text-gray-500 mt-2">Your order has been placed successfully.</p>
            <button onClick={() => { setShowSuccess(false); navigate("/cart"); }} className="mt-5 bg-[#051a2f] text-white px-5 py-2 rounded-lg text-sm">Continue Shopping</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;