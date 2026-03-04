import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCreditCard, FaUniversity, FaWallet } from "react-icons/fa";
import { SiGooglepay } from "react-icons/si";
import { createOrder } from "../api/api.js";

const Checkout2 = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [payment, setPayment] = useState("cod");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    landmark: "",
    city: "",
    district: "",
    state: "",
  });

  const product = state?.product;
  const qty = state?.qty || 1;

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">No product selected</div>;
  }

const productId = product._id;
 
const numericPrice =
  typeof product.price === "string"
    ? parseInt(product.price.replace(/[^0-9]/g, ""))
    : product.price;
      const total = numericPrice * qty;

const handlePlaceOrder = async () => {
  if (
    !shipping.fullName ||
    !shipping.phone ||
    !shipping.address ||
    !shipping.city ||
    !shipping.state
  ) {
    alert("Please fill required shipping details");
    return;
  }

  try {
    setLoading(true);

    await createOrder({
      productId: product._id,           // ✅ must match schema
      productName: product.name,        // ✅ required in schema
      price: numericPrice,
      quantity: qty,
      total: numericPrice * qty,        // ✅ schema requires total
      paymentMethod: payment,
      shippingDetails: shipping,
    });

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
          {/* Shipping */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-4 h-[450px]">
            <h2 className="text-lg font-semibold text-[#051a2f]">Shipping Details</h2>
            {Object.keys(shipping).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={shipping[key]}
                onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm"
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[#051a2f]">Order Summary</h2>
            <div className="flex gap-4 items-center">
              <img src={product.img || product.image} alt={product.name} className="w-20 h-20 rounded-xl object-contain" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold">{product.name}</h3>
                <p className="text-xs text-gray-500">Qty: {qty}</p>
              </div>
              <p className="text-sm font-semibold">₹{total}</p>
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{total}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span className="text-green-600">Free</span></div>
              <div className="flex justify-between font-semibold text-base"><span>Total</span><span>₹{total}</span></div>
            </div>

            {/* Payment Methods */}
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-semibold">Payment Method</h3>
              {[
                { id: "cod", label: "Cash on Delivery", icon: <FaMoneyBillWave className="text-green-600 text-lg" /> },
                { id: "card", label: "Credit / Debit Card", icon: <FaCreditCard className="text-blue-600 text-lg" /> },
                { id: "upi", label: "UPI (Google Pay)", icon: <SiGooglepay className="text-2xl text-[#4285F4]" /> },
                { id: "netbanking", label: "Net Banking", icon: <FaUniversity className="text-indigo-600 text-lg" /> },
                { id: "wallet", label: "Wallets", icon: <FaWallet className="text-orange-500 text-lg" /> },
              ].map((method) => (
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
            <button onClick={() => { setShowSuccess(false); navigate("/cart2"); }} className="mt-5 bg-[#051a2f] text-white px-5 py-2 rounded-lg text-sm">Continue Shopping</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout2;