import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState(""); // "high" or "low"

  // Fetch products from DB
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filtered & searched products
  const filteredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (stockFilter === "high") return b.stock - a.stock;
      if (stockFilter === "low") return a.stock - b.stock;
      return 0;
    });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar active="Products" />

      <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50">
        {/* Header with search + filter on same line */}
        <div className="flex justify-between items-center mb-6 flex-nowrap gap-2">
          <h1 className="text-2xl font-bold flex-shrink-0">Products</h1>

          <div className="flex gap-2 flex-shrink">
            <input
              type="text"
              placeholder="Search by name or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black w-32 sm:w-48 md:w-64 shrink"
            />
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black w-24 sm:w-32 md:w-40 shrink"
            >
              <option value="">Sort by Stock</option>
              <option value="high">Stock High → Low</option>
              <option value="low">Stock Low → High</option>
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200 table-auto md:table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Stock
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase">
                  Created
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 capitalize">{product.category}</td>
                  <td className="px-4 py-3">₹{product.price}</td>
                  <td className="px-4 py-3">{product.stock}</td>
                  <td className="px-4 py-3">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProducts.length === 0 && (
            <p className="p-4 text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;