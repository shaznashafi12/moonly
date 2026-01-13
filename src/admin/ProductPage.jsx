import React from "react";
import Sidebar from "../admin/Sidebar.jsx";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import im from "../images/pad.jfif";
import im9 from "../images/test.jfif";
import im4 from "../images/kits.jfif";
import im5 from "../images/mencup.jfif";
import im6 from "../images/creammo.jfif";

// Updated products data including cart details
const productsData = [
  {
    id: 1,
    name: "Organic Sanitary Pads",
    category: "Hygiene",
    price: "$12.99",
    stock: 120,
    description: "Soft, organic cotton pads for daily use.",
    image: im,
    status: "Active",
  },
  {
    id: 2,
    name: "Pregnancy Test Kit",
    category: "Pregnancy",
    price: "$59.99",
    stock: 45,
    description: "Essential kit for early pregnancy care.",
    image: im9,
    status: "Active",
  },
  {
    id: 3,
    name: "Menstrual Cup - Size S",
    category: "Hygiene",
    price: "$29.99",
    stock: 70,
    description: "Reusable menstrual cup, small size.",
    image: im5,
    status: "Active",
  },
  {
    id: 4,
    name: "First Period Starter Kit",
    category: "Hygiene",
    price: "$39.99",
    stock: 30,
    description: "Kit for first-time period care.",
    image: im4,
    status: "Active",
  },
  {
    id: 5,
    name: "CeraVe Moisturizing Cream",
    category: "pregnancy",
    price: "$79.98",
    stock: 25,
    description: "Monthly subscription hygiene kit.",
    image: im6,
    status: "Active",
  },
];

const ProductPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar active="Products" />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Products</h1>
          <button className="flex items-center gap-2 bg-[#e08594] text-white px-4 py-2 rounded hover:bg-pink-500">
            <FaPlus /> Add Product
          </button>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {productsData.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                    <FaEdit className="cursor-pointer text-gray-500 hover:text-gray-700" />
                    <FaTrash className="cursor-pointer text-gray-500 hover:text-gray-700" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
