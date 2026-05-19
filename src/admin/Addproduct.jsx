import React, { useState } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import axios from "axios";

const Addproduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    category: "",
    stock: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("rating", formData.rating);
    data.append("category", formData.category.toLowerCase());
    data.append("stock", formData.stock);
    data.append("image", image);

    try {
      await axios.post("http://localhost:4000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product added successfully ✅");

      setFormData({
        name: "",
        description: "",
        price: "",
        rating: "",
        category: "",
        stock: "",
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      alert("Error adding product ❌");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      {/* Sidebar */}
      <Sidebar active="add product" />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="bg-white shadow-lg rounded-2xl p-5 sm:p-6 md:p-8 w-full max-w-3xl mx-auto">

          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Product Name */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Price + Rating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Category + Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
                >
                  <option value="">Select Category</option>
                  <option value="periods">Periods</option>
                  <option value="pregnancy">Pregnancy</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter available stock"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-3">
                Upload Product Image
              </label>

              {!preview && (
                <label
                  htmlFor="imageUpload"
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 sm:p-8 text-center bg-gray-50 hover:bg-gray-100 transition cursor-pointer block"
                >
                  <p className="text-gray-600 font-medium mb-2">
                    📷 Click anywhere to upload product image
                  </p>
                  <p className="text-xs text-gray-400">
                    Supported formats: PNG, JPG, JPEG
                  </p>
                </label>
              )}

              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
                className="hidden"
              />

              {preview && (
                <div className="border rounded-xl p-4 bg-gray-50">
                  <p className="text-sm font-medium mb-3">Image Preview</p>
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-w-xs h-auto object-cover rounded-lg shadow"
                  />
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition mt-4"
            >
              Add Product
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Addproduct;