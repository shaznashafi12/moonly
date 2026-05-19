import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import { FaEye, FaEyeSlash, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { getOrders } from "../api/api.js";

const StatusBadge = ({ status }) => {
  const colors = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Processing: "bg-purple-100 text-purple-700",
    Cancelled: "bg-red-100 text-red-700",
    Approved: "bg-green-100 text-green-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${colors[status] || colors["Pending"]}`}>
      {status || "Pending"}
    </span>
  );
};

const Orderpage = () => {
  const [orders, setOrders] = useState([]);
  const [viewOrderId, setViewOrderId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (!window.confirm("Delete this order?")) return;
      await axios.delete(`http://localhost:4000/api/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:4000/api/orders/status/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const filteredOrders = orders
    .filter((order) => {
      const text = search.toLowerCase();
      return (
        order.shippingDetails?.fullName?.toLowerCase().includes(text) ||
        order.shippingDetails?.phone?.includes(text) ||
        order.shippingDetails?.city?.toLowerCase().includes(text) ||
        order.shippingDetails?.state?.toLowerCase().includes(text)
      );
    })
    .sort((a, b) => {
      const stateA = (a.shippingDetails?.state || "").toLowerCase().trim();
      const stateB = (b.shippingDetails?.state || "").toLowerCase().trim();
      const outsideKeralaA = stateA !== "kerala";
      const outsideKeralaB = stateB !== "kerala";
      if (outsideKeralaA && !outsideKeralaB) return -1;
      if (!outsideKeralaA && outsideKeralaB) return 1;
      return 0;
    });

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar active="Orders" />

      <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50">
        {/* Header */}
<div className="flex justify-between items-center mb-6 flex-nowrap w-full">
  <h1 className="text-2xl font-bold flex-shrink-0">Orders</h1>
  <input
    type="text"
    placeholder="Search anything..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="border rounded px-4 py-2 w-1/2 sm:w-64"
  />
</div>
        {/* Table */}
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200 table-auto md:table-fixed">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">
                      <div>{order.shippingDetails?.fullName || "N/A"}</div>
                      <div className="text-gray-500">{order.shippingDetails?.phone || "N/A"}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">
                      {order.items?.length
                        ? order.items.map((item, i) => (
                            <div key={i}>
                              {item.name} × {item.quantity}
                            </div>
                          ))
                        : "No items"}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900">₹{order.total}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-4 py-3 flex flex-wrap gap-2 md:gap-4 items-center">
                      <FaCheckCircle onClick={() => updateStatus(order._id, "Approved")} className="cursor-pointer text-green-600 hover:text-green-800 text-lg" />
                      <FaTimesCircle onClick={() => updateStatus(order._id, "Cancelled")} className="cursor-pointer text-red-600 hover:text-red-700 text-lg" />
                      {viewOrderId === order._id ? (
                        <FaEye onClick={() => setViewOrderId(null)} className="cursor-pointer text-gray-600 hover:text-gray-800 text-lg" />
                      ) : (
                        <FaEyeSlash onClick={() => setViewOrderId(order._id)} className="cursor-pointer text-gray-500 hover:text-gray-700 text-lg" />
                      )}
                      <FaTrash onClick={() => handleDelete(order._id)} className="cursor-pointer text-gray-400 hover:text-red-600 text-lg" />
                    </td>
                  </tr>

                  {viewOrderId === order._id && (
                    <tr>
                      <td colSpan="6" className="px-4 py-4 bg-pink-50">
                        <div className="rounded-xl p-4 sm:p-6 border border-[#e08594] bg-[#faf7f8] shadow-inner">
                          <h3 className="text-lg font-semibold text-[#e08594] mb-3">Shipping Details</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p>
                                <strong>Full Name:</strong> {order.shippingDetails?.fullName}
                              </p>
                              <p>
                                <strong>Phone:</strong> {order.shippingDetails?.phone}
                              </p>
                              <p>
                                <strong>Landmark:</strong> {order.shippingDetails?.landmark}
                              </p>
                            </div>
                            <div>
                              <p>
                                <strong>Address:</strong> {order.shippingDetails?.address}
                              </p>
                              <p>
                                <strong>City:</strong> {order.shippingDetails?.city}
                              </p>
                              <p>
                                <strong>District:</strong> {order.shippingDetails?.district}
                              </p>
                              <p>
                                <strong>State:</strong> {order.shippingDetails?.state}
                              </p>
                            </div>
                          </div>
                          <div className="mt-4 sm:mt-6">
                            <h3 className="text-lg font-semibold text-[#e08594] mb-2">Ordered Products</h3>
                            {order.items?.map((item, i) => (
                              <p key={i}>
                                {item.name} | Qty: {item.quantity} | ₹{item.totalPrice}
                              </p>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orderpage;