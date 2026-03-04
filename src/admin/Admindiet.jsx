// import React, { useState } from "react";
// import Sidebar from "../admin/Sidebar.jsx";
// import { FaEye } from "react-icons/fa";

// // Sample user diet usage data
// const dietData = [
//   {
//     id: 1,
//     name: "Aanya",
//     email: "aanya@gmail.com",
//     healthMode: "Period",
//     dietUsed: "Iron Support Foods",
//     status: "Viewed",
//   },
//   {
//     id: 2,
//     name: "Meera",
//     email: "meera@gmail.com",
//     healthMode: "Pregnancy",
//     dietUsed: "Second Trimester Foods",
//     status: "Viewed",
//   },
//   {
//     id: 3,
//     name: "Riya",
//     email: "riya@gmail.com",
//     healthMode: "Period",
//     dietUsed: "Magnesium Balance",
//     status: "Viewed",
//   },
// ];

// // Modal to show detailed diet info
// const DietModal = ({ user, onClose }) => {
//   if (!user) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg"
//         >
//           ✕
//         </button>

//         <h2 className="text-2xl font-bold mb-4">Diet Usage Details</h2>

//         <div className="space-y-2">
//           <p><span className="font-semibold">Name:</span> {user.name}</p>
//           <p><span className="font-semibold">Email:</span> {user.email}</p>
//           <p><span className="font-semibold">Health Mode:</span> {user.healthMode}</p>
//           <p><span className="font-semibold">Diet Plan:</span> {user.dietUsed}</p>
//           <p><span className="font-semibold">Selected Items:</span> {user.selectedItems}</p>
//           <p><span className="font-semibold">Status:</span> {user.status}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Admindiet = () => {
//   const [selectedUser, setSelectedUser] = useState(null);

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar active="Diet Content" />

//       <div className="flex-1 p-8 bg-gray-50">
//         <h1 className="text-2xl font-bold mb-6">User Diet Content Usage</h1>

//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-xs uppercase">Name</th>
//                 <th className="px-6 py-3 text-xs uppercase">Email</th>
//                 <th className="px-6 py-3 text-xs uppercase">Health Mode</th>
//                 <th className="px-6 py-3 text-xs uppercase">Diet Plan</th>
//                 <th className="px-6 py-3 text-xs uppercase">Status</th>
//                 <th className="px-6 py-3 text-xs uppercase">Action</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200">
//               {dietData.map((user) => (
//                 <tr key={user.id}>
//                   <td className="px-6 py-4 text-sm">{user.name}</td>
//                   <td className="px-6 py-4 text-sm">{user.email}</td>
//                   <td className="px-6 py-4 text-sm">{user.healthMode}</td>
//                   <td className="px-6 py-4 text-sm">{user.dietUsed}</td>
//                   <td className="px-6 py-4 text-sm">{user.status}</td>
//                   <td className="px-6 py-4">
//                     <FaEye
//                       className="cursor-pointer text-gray-500 hover:text-gray-700"
//                       onClick={() => setSelectedUser(user)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {selectedUser && (
//         <DietModal
//           user={selectedUser}
//           onClose={() => setSelectedUser(null)}
//         />
//       )}
//     </div>
//   );
// };

// export default Admindiet;
