import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import { FaEye, FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
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

  const fetchOrders = async () => {
    try {
      const res = await getOrders();
      setOrders(res.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    await axios.delete(`http://localhost:4000/api/orders/${id}`);
    fetchOrders();
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:4000/api/orders/status/${id}`,
      { status }
    );
    fetchOrders();
  };

  return (
    <div className="flex min-h-screen">

      <Sidebar active="Orders" />

      <div className="flex-1 p-8 bg-gray-50">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <input
            type="text"
            placeholder="Search anything..."
            className="border rounded px-4 py-2 w-1/3"
          />
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">

          <table className="min-w-full divide-y divide-gray-200">

            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">

              {orders.map((order) => (
                <React.Fragment key={order._id}>

                  <tr>

                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.shippingDetails?.fullName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.shippingDetails?.email}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order.productName}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-900">
                      ₹{order.total}
                    </td>

                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 flex gap-4 items-center">

                      <FaCheckCircle
                        onClick={() => updateStatus(order._id, "Approved")}
                        className="cursor-pointer text-green-600 hover:text-green-800 text-lg"
                      />

                      <FaTimesCircle
                        onClick={() => updateStatus(order._id, "Cancelled")}
                        className="cursor-pointer text-red-600 hover:text-red-700 text-lg"
                      />

                      <FaEye
                        onClick={() =>
                          setViewOrderId(
                            viewOrderId === order._id ? null : order._id
                          )
                        }
                        className="cursor-pointer text-gray-500 hover:text-gray-700 text-lg"
                      />

                      <FaTrash
                        onClick={() => handleDelete(order._id)}
                        className="cursor-pointer text-gray-400 hover:text-red-600 text-lg"
                      />

                    </td>

                  </tr>

                  {/* VIEW DETAILS BELOW ROW */}
                  {viewOrderId === order._id && (
                    <tr>
                      <td colSpan="6" className="px-6 py-4 bg-pink-50">

                        <div className="rounded-xl p-6 border border-[#e08594] bg-[#faf7f8] shadow-inner">

                          <h3 className="text-lg font-semibold text-[#e08594] mb-3">
                            Shipping Details
                          </h3>

                          <div className="grid grid-cols-2 gap-4 text-sm">

                            <div>
                              <p><strong>Full Name:</strong> {order.shippingDetails?.fullName}</p>
                              <p><strong>Phone:</strong> {order.shippingDetails?.phone}</p>
                              <p><strong>Landmark:</strong> {order.shippingDetails?.landmark}</p>
    
                            </div>

                            <div>
                              <p><strong>Address:</strong> {order.shippingDetails?.address}</p>
                              <p><strong>City:</strong> {order.shippingDetails?.city}</p>
                              <p><strong>District:</strong> {order.shippingDetails?.district}</p>
                              <p><strong>State:</strong> {order.shippingDetails?.state}</p>

                            </div>

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