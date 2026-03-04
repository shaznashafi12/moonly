import React from "react";

const UserActivityModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold mb-4">User Activity Details</h2>

        {/* User Profile Section */}
        <div className="mb-4 border-b pb-4">
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Status:</span> {user.status}</p>
          <p><span className="font-semibold">Health Mode:</span> {user.healthMode}</p>
        </div>

        {/* Feature Usage Timeline */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Feature Usage Timeline:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {user.featureTimeline && user.featureTimeline.length > 0 ? (
              user.featureTimeline.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))
            ) : (
              <li>No recorded activities</li>
            )}
          </ul>
        </div>

        {/* Selected Items */}
        <div>
          <h3 className="font-semibold mb-2">Selected Items:</h3>
          <ul className="list-disc list-inside text-gray-700">
            {user.selectedItems && user.selectedItems.length > 0 ? (
              user.selectedItems.map((item, index) => (
                <li key={index}>{item}</li>
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

export default UserActivityModal;
