// Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FiSearch, FiFilter } from "react-icons/fi";
import Nav from "./Nav";
import Footer from "./Footer";
import { toast, ToastContainer } from "react-toastify"; // ✅ add ToastContainer to importimport "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSort, setShowSort] = useState(false);
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/products?category=periods"
        );
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (search) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortType === "low") {
      temp.sort((a, b) => a.price - b.price);
    }

    if (sortType === "high") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
  }, [search, sortType, products]);

  const addToCart = (product) => {
    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart_periods")) || [];
    const existing = cart.find((item) => item._id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart_periods", JSON.stringify(cart));
    toast.success("Product added to cart");
  };

  return (
    // ✅ FIX 1: w-screen → w-full + overflow-x-hidden to kill horizontal scroll
    <div className="min-h-screen w-full overflow-x-hidden bg-[#fff7fb] text-[#4a2c3a]">
<Nav />

{/* ✅ ADD THIS — without it, toasts are triggered but never shown */}
<ToastContainer
  position="top-right"
  autoClose={2500}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  pauseOnHover
  draggable
  theme="light"
/>
      {/* Header */}
      <div className="pt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <div>
            <h2 className="text-3xl font-semibold">Products</h2>
            <p className="text-sm text-gray-500 mt-1">
              <Link to="/home" className="hover:text-black transition">
                Home
              </Link>{" "}
              &gt; Wellness Store
            </p>
          </div>

          {/* ✅ FIX 2: Search + Filter wrap on mobile, full width inputs */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">

            <div className="flex items-center bg-white border rounded-xl px-3 py-2 focus-within:bg-white flex-1 min-w-0">
              <FiSearch className="text-gray-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder="Search products..."
                className="outline-none text-sm bg-transparent focus:bg-transparent w-full min-w-0"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative shrink-0">
              {/* SORT BUTTON */}
              <div
                onClick={() => setShowSort(!showSort)}
                className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition cursor-pointer"
              >
                <FiFilter className="text-gray-500 text-lg" />
                <span className="text-sm">Sort</span>
              </div>

              {/* SORT OPTIONS */}
              {showSort && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20">
                  <div
                    onClick={() => { setSortType("low"); setShowSort(false); }}
                    className="px-4 py-3 text-sm hover:bg-pink-50 cursor-pointer transition"
                  >
                    Price: Lowest First
                  </div>
                  <div
                    onClick={() => { setSortType("high"); setShowSort(false); }}
                    className="px-4 py-3 text-sm hover:bg-pink-50 cursor-pointer transition"
                  >
                    Price: Highest First
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Product Grid */}
      {/* ✅ FIX 3: px-4 on mobile to prevent edge bleed */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <p className="text-center col-span-3 text-lg font-medium">
            Loading products...
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center col-span-3 text-lg font-medium">
            No products available
          </p>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden relative"
            >
              {product.stock === 0 && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full z-10">
                  Out of Stock
                </span>
              )}

              {product.stock > 0 && product.stock <= 5 && (
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full z-10">
                  Only {product.stock} left
                </span>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="h-[350px] w-full object-cover rounded-t-2xl"
              />

              <div className="p-6 space-y-3">
                <h3 className="font-semibold text-lg">{product.name}</h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={14} />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-black">
                    ₹{product.price}
                  </span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-3 bg-[#051a2f] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:scale-[1.03] transition"
                >
                  <MdOutlineShoppingBag className="text-xl" />
                  Add to Cart
                </button>
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