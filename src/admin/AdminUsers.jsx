import React, { useEffect, useState } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getUsers } from "../api/api.js";

// Modal to view user activity
const UserActivityModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl md:w-2/3 lg:w-1/2 p-6 relative">

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
              user.featureTimeline.map((activity, i) => (
                <li key={i}>{activity}</li>
              ))
            ) : (
              <li>No recorded activities</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Selected Items:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {user.selectedItems?.length ? (
              user.selectedItems.map((item, i) => (
                <li key={i}>{item}</li>
              ))
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
  const [viewUserId, setViewUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await getUsers();

        const normalUsers = res.data.filter(
          user => user.email !== "admin@gmail.com"
        );

        setUsers(normalUsers);
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

  const handleViewToggle = (user) => {

    if (viewUserId === user._id) {

      setViewUserId(null);
      setSelectedUser(null);

    } else {

      setViewUserId(user._id);
      setSelectedUser(user);

    }

  };

  return (

    <div className="flex flex-col md:flex-row min-h-screen">

      <Sidebar active="Users" />

      <div className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50">

        <h1 className="text-2xl font-bold mb-6">Users & Activities</h1>

        {loading ? (

          <p>Loading users...</p>

        ) : error ? (

          <p className="text-red-500">{error}</p>

        ) : (

          <div className="overflow-x-auto bg-white rounded shadow">

            <table className="min-w-full divide-y divide-gray-200 table-auto md:table-fixed">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Name
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tracker Type
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-200">

                {users.map((user) => (

                  <tr key={user._id} className="hover:bg-gray-50">

                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900 align-middle">
                      {user.name}
                    </td>

                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900 align-middle">
                      {user.email}
                    </td>

                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900 align-middle">
                      {user.trackerType || "None"}
                    </td>

                    <td className="px-4 sm:px-6 py-3 text-sm text-gray-900 align-middle">
                      {user.trackerType ? "Active" : "Inactive"}
                    </td>

                    <td className="px-4 sm:px-6 py-3 align-middle">

                      {viewUserId === user._id ? (

                        <FaEye
                          onClick={() => handleViewToggle(user)}
                          className="cursor-pointer text-gray-600 hover:text-gray-800"
                        />

                      ) : (

                        <FaEyeSlash
                          onClick={() => handleViewToggle(user)}
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                        />

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {selectedUser && (
        <UserActivityModal
          user={selectedUser}
          onClose={() => {
            setSelectedUser(null);
            setViewUserId(null);
          }}
        />
      )}

    </div>

  );
};

export default AdminUsers;