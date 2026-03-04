import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import axios from "axios";

import { getOrders } from "../api/api.js";
const ProductPage = () => {
  const [orders, setOrders] = useState([]); // 🔥 Changed state name

  // Fetch orders from backend
const fetchOrders = async () => {
  try {
    const res = await getOrders();
    setOrders(res.data.data);
  } catch (err) {
    console.error("Error fetching orders:", err);
  }
};
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar active="Products" />

      <div className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Qty</th>
                <th className="px-6 py-3">Total</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Date</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  <td className="px-6 py-4">
                    {order.shippingDetails?.fullName}
                  </td>

                  <td className="px-6 py-4">
                    {order.productName}
                  </td>

                  <td className="px-6 py-4">
                    {order.quantity}
                  </td>

                  <td className="px-6 py-4">
                    ₹{order.total}
                  </td>

                  <td className="px-6 py-4">
                    {order.paymentMethod}
                  </td>

                  <td className="px-6 py-4 text-sm">
                    {order.shippingDetails?.address},
                    {order.shippingDetails?.city}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
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