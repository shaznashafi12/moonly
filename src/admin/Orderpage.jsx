// OrdersPage.jsx
import React from "react";
import Sidebar from "../admin/Sidebar.jsx"; // Import your Sidebar component
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const ordersData = [
  { id: 1, name: "Alice Johnson", email: "alice@email.com", items: "Organic Cotton Pads +1 more", total: "$37.49", status: "Delivered", date: "2024-01-10" },
  { id: 2, name: "Mary Williams", email: "mary@email.com", items: "Pregnancy Starter Kit", total: "$59.99", status: "Shipped", date: "2024-01-09" },
  { id: 3, name: "Emma Brown", email: "emma@email.com", items: "Menstrual Cup - Size S +2 more", total: "$96.98", status: "Pending", date: "2024-01-08" },
];

const StatusBadge = ({ status }) => {
  const colors = { Delivered: "bg-green-100 text-green-700", Shipped: "bg-blue-100 text-blue-700", Pending: "bg-yellow-100 text-yellow-700" };
  return <span className={`px-3 py-1 rounded-full text-sm ${colors[status]}`}>{status}</span>;
};

const Orderpage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar active="Orders" />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Orders</h1>
          <input type="text" placeholder="Search anything..." className="border rounded px-4 py-2 w-1/3" />
        </div>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ordersData.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.name}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.items}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                    <FaEye className="cursor-pointer text-gray-500 hover:text-gray-700" />
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

export default Orderpage;
