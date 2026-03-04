import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";
import Nav from "./Nav";
import Footer from "./Footer";

const Addcart2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // Fetch product from backend like Addcart.jsx
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="p-10">Loading product...</div>;
  }

  const totalPrice = product.price * qty;

  return (
    <div className="min-h-screen bg-[#fff7fb] overflow-x-hidden">
      <Nav />

      <div className="flex justify-start ml-4 md:ml-20 mb-20">

        {/* Breadcrumb Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold">Products</h2>
          <p className="text-sm text-gray-500">
            Home &gt; wellness store &gt; Add to Cart
          </p>
        </div>

        {/* Product Card */}
        <div
          className="
          bg-white rounded-2xl shadow p-5
          w-[95%] md:w-[800px]
          relative top-20 mb-20 mt-20
          ml-4 md:-ml-[230px]
        "
        >
          <div className="flex gap-5 items-start">

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="
                w-[160px] h-[160px]
                md:w-[300px] md:h-[300px]
                object-contain rounded-3xl
              "
            />

            {/* Product Details */}
            <div className="flex-1 space-y-3">

              <h1 className="text-xl font-semibold text-[#3b1d2a]">
                {product.name}
              </h1>

              <p className="text-sm text-gray-600 leading-snug">
                {product.description}
              </p>

              {/* Static Rating */}
              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={13} />
                ))}
                <span className="text-xs text-gray-500 ml-1">(4.9)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-[#051a2f]">
                  ₹{totalPrice}
                </span>
                {product.oldPrice && (
                  <span className="line-through text-xs text-gray-400">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => qty > 1 && setQty(qty - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                  >
                    <FaMinus size={12} />
                  </button>

                  <span className="px-4 text-sm font-semibold text-gray-800">
                    {qty}
                  </span>

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
                <button
                  onClick={() =>
                    navigate("/checkout2", {
                      state: { product, qty },
                    })
                  }
                  className="bg-[#051a2f] text-white w-[140px] md:w-[200px] px-5 py-2 rounded-lg text-sm font-medium"
                >
                  Add to Cart
                </button>

                <button
                  onClick={() =>
                    navigate("/checkout", {
                      state: { product, qty },
                    })
                  }
                  className="bg-[#e08594] w-[140px] md:w-[200px] text-white px-5 py-2 rounded-lg text-sm font-medium"
                >
                  Buy Now
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

export default Addcart2;