import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import { FaEye } from "react-icons/fa";
import axios from "axios";

// Modal to view user activity
const UserActivityModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">User Details</h2>

        <div className="mb-4 border-b pb-4">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Status:</span> {user.trackerType ? "Active" : "Inactive"}</p>
          <p><span className="font-semibold">Tracker Type:</span> {user.trackerType || "None"}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Feature Usage Timeline:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {user.featureTimeline?.length ? (
              user.featureTimeline.map((activity, i) => <li key={i}>{activity}</li>)
            ) : (
              <li>No recorded activities</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Selected Items:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {user.selectedItems?.length ? (
              user.selectedItems.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No selected items</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/user/getAllUsers"); // adjust to your backend route
        setUsers(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar active="Users" />

      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Users & Activities</h1>

        {loading ? (
          <p>Loading users...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-xs uppercase">Name</th>
                  <th className="px-6 py-3 text-xs uppercase">Email</th>
                  <th className="px-6 py-3 text-xs uppercase">Tracker Type</th>
                  <th className="px-6 py-3 text-xs uppercase">Status</th>
                  <th className="px-6 py-3 text-xs uppercase">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 text-sm">{user.name}</td>
                    <td className="px-6 py-4 text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-sm">{user.trackerType || "None"}</td>
                    <td className="px-6 py-4 text-sm">{user.trackerType ? "Active" : "Inactive"}</td>
                    <td className="px-6 py-4">
                      <FaEye
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={() => setSelectedUser(user)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedUser && (
        <UserActivityModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default AdminUsers;