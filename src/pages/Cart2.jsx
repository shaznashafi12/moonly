import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiFilter, FiSearch } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingBag } from "react-icons/md";
import Nav2 from "./Nav2";
import Footer from "./Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Cart2 = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/products?category=pregnancy"
        );

        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* SEARCH + FILTER */
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
const [showSort, setShowSort] = useState(false);
  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart_pregnancy")) || [];

    const existing = cart.find((item) => item._id === product._id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart_pregnancy", JSON.stringify(cart));
    toast.success("Product added to cart");
  };

  return (
    <div className="min-h-screen w-screen bg-[#fff7fb] text-[#4a2c3a]">
      <Nav2 />

      {/* HEADER */}
      <div className="pt-5">
        <div className="max-w-7xl mx-auto px-6 py-10 mt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <div>
            <h2 className="text-3xl font-semibold">Products</h2>
           <p className="text-sm text-gray-500 mt-1">
  <Link to="/home2" className="hover:text-black transition">
    Home
  </Link>{" "}
  &gt; Wellness Store
</p>
          </div>

          {/* SEARCH + FILTER RIGHT SIDE */}
          <div className="flex items-center gap-4">

<div className="flex items-center bg-white border rounded-xl px-3 py-2 focus-within:bg-white">              <FiSearch className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
className="outline-none text-sm bg-transparent focus:bg-transparent"    
            value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

<div className="relative">

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
    <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">

      <div
        onClick={() => {
          setSortType("low");
          setShowSort(false);
        }}
        className="px-4 py-3 text-sm hover:bg-pink-50 cursor-pointer transition"
      >
        Price: Lowest First
      </div>

      <div
        onClick={() => {
          setSortType("high");
          setShowSort(false);
        }}
        className="px-4 py-3 text-sm hover:bg-pink-50 cursor-pointer transition"
      >
        Price: Highest First
      </div>

    </div>
  )}
</div>
</div>        </div>
      </div>

      {/* PRODUCTS */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

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
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
            >
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

export default Cart2;