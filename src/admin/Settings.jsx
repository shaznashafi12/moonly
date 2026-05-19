// import React, { useState } from "react";
// import Sidebar from "../admin/Sidebar.jsx";
// import { FaUserCog, FaBell, FaLock, FaSave } from "react-icons/fa";

// const Settings = () => {
//   const [settings, setSettings] = useState({
//     username: "Admin",
//     email: "admin@example.com",
//     notifications: true,
//     darkMode: false,
//     password: ""
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setSettings((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value
//     }));
//   };

//   const handleSave = () => {
//     alert("Settings saved successfully!");
//     // API call to save settings can go here
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <Sidebar active="Settings" />

//       {/* Main Content */}
//       <div className="flex-1 p-8 ">
//         <h1 className="text-3xl text-center font-bold mb-6  text-gray-900">Admin Settings</h1>

//         <div className="space-y-8">

//           {/* Profile Card */}
//           <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto transition hover:shadow-xl">
//             <div className="flex items-center gap-3 mb-6">
//               <FaUserCog className="text-[#e08594] text-2xl" />
//               <h2 className="text-2xl font-semibold text-gray-900">Profile</h2>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Username */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={settings.username}
//                   onChange={handleChange}
//                   className="block w-full rounded-xl border border-2 border-gray-400 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
//                 />
//               </div>

//               {/* Email */}
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={settings.email}
//                   onChange={handleChange}
//                   className="block w-full rounded-xl border border-2 border-gray-400 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
//                 />
//               </div>

//               {/* Password */}
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={settings.password}
//                   onChange={handleChange}
//                   placeholder="••••••••"
//                   className="block w-full rounded-xl border-gray-400 border border-2 shadow-sm focus:ring-pink-500 focus:border-pink-500 p-3"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Preferences Card */}
//           <div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-8 max-w-3xl mx-auto transition hover:shadow-xl">
//             <div className="flex items-center gap-3 mb-6">
//               <FaBell className="text-[#e08594] text-2xl" />
//               <h2 className="text-2xl font-semibold text-gray-900">Preferences</h2>
//             </div>

//             <div className="space-y-4">
//               <label className="flex items-center gap-4">
//                 <input
//                   type="checkbox"
//                   name="notifications"
//                   checked={settings.notifications}
//                   onChange={handleChange}
//                   className="h-5 w-5 text-[#e08594] rounded border-gray-300"
//                 />
//                 <span className="text-gray-700 font-medium">Enable Notifications</span>
//               </label>

//               <label className="flex items-center gap-4">
//                 <input
//                   type="checkbox"
//                   name="darkMode"
//                   checked={settings.darkMode}
//                   onChange={handleChange}
//                   className="h-5 w-5 text-[#e08594] rounded border-gray-300"
//                 />
//                 <span className="text-gray-700 font-medium">Enable Dark Mode</span>
//               </label>
//             </div>
//           </div>

//           {/* Save Button */}
//           <div className="flex justify-center">
//             <button
//               onClick={handleSave}
//               className="flex items-center gap-2 bg-[#e08594] text-white px-8 py-3 rounded-2xl shadow-lg hover:bg-[#e08594] transition font-semibold"
//             >
//               <FaSave /> Save Settings
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Settings;
