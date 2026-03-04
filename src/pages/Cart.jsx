// Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFilter } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/products?category=periods"
        );
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen w-screen bg-[#fff7fb] text-[#4a2c3a]">
      <Nav />
      {/* Header */}
      <div className="pt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 mt-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Products</h2>
            <p className="text-sm text-gray-500 mt-1">Home &gt; wellness store</p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center col-span-3 text-lg font-medium">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center col-span-3 text-lg font-medium">
            No products available
          </p>
        ) : (
          products.map((product) => (
            <div key={product._id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-[250px] sm:h-[300px] lg:h-[350px] w-full object-cover rounded-t-3xl"
              />
              <div className="p-5 sm:p-6 space-y-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-black">₹{product.price}</span>
                </div>
                <Link to={`/addcart2/${product._id}`}>
                  <button className="w-full mt-3 bg-[#051a2f] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-[1.03] transition">
                    <MdOutlineShoppingBag className="text-xl" />
                    Add to Cart
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;