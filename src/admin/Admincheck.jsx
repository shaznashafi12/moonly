import React, { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import { FaEye, FaBaby, FaFileMedical, FaUserFriends, FaHeart } from "react-icons/fa";
import axios from "axios";

// Modal to display checklist
const ChecklistModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-11/12 md:w-3/4 lg:w-2/3 p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Hospital Bag Checklist - {user.userId?.name}
        </h2>

        <div className="space-y-4">
          <ChecklistSection title="Mother's Essentials" icon={<FaHeart />} items={user.motherItems || []} />
          <ChecklistSection title="Baby Essentials" icon={<FaBaby />} items={user.babyItems || []} />
          <ChecklistSection title="Newborn Care" icon={<FaBaby />} items={user.newbornCare || []} />
          <ChecklistSection title="Documents & Medical" icon={<FaFileMedical />} items={user.documents || []} />
          <ChecklistSection title="Support Person Items" icon={<FaUserFriends />} items={user.supportPerson || []} />

          {user.cSectionIncluded && (
            <ChecklistSection
              title="C-Section Items"
              icon={<FaHeart />}
              items={["Abdominal binder", "Extra maternity nightwear", "High-waist underwear", "Pain relief cream"]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable section
const ChecklistSection = ({ title, icon, items }) => (
  <div className="border p-4 rounded-lg bg-gray-50 shadow-sm">
    <div className="flex items-center gap-2 mb-2 text-gray-700">
      {icon} <h3 className="font-semibold">{title}</h3>
    </div>
    <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  </div>
);

const Admincheck = () => {
  const [checklistData, setChecklistData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchChecklists = async () => {
      try {
const res = await axios.get("http://localhost:4000/checklist/all");        setChecklistData(res.data.data);
setChecklistData(res.data.data);      
} catch (err) {
        console.error(err);
      }
    };

    fetchChecklists();
  }, []);

  return (
    <div className="flex min-h-screen">
      <Sidebar active="Hospital Checklists" />

      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">User Hospital Checklist</h1>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-700">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-700">C-Section Included</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-700">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {checklistData.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {user.userId?.name}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {user.userId?.email}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-800">
                    {user.cSectionIncluded ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <FaEye
                      className="cursor-pointer text-gray-500 hover:text-gray-700 transition"
                      onClick={() => setSelectedUser(user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {selectedUser && (
        <ChecklistModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default Admincheck;