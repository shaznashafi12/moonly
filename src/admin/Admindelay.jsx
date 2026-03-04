// import React, { useState } from "react";
// import Sidebar from "../admin/Sidebar.jsx";
// import { FaEye } from "react-icons/fa";

// const delayData = [
//   {
//     id: 1,
//     name: "Aanya",
//     email: "aanya@gmail.com",
//     lastPeriod: "2026-01-01",
//     cycleLength: 28,
//     notes: "Stressful week, traveled",
//     result: "Your period is 3 days late",
//     status: "Checked",
//   },
//   {
//     id: 2,
//     name: "Meera",
//     email: "meera@gmail.com",
//     lastPeriod: "2026-01-05",
//     cycleLength: 30,
//     notes: "",
//     result: "Your cycle is on track!",
//     status: "Checked",
//   },
//   {
//     id: 3,
//     name: "Riya",
//     email: "riya@gmail.com",
//     lastPeriod: "2026-01-02",
//     cycleLength: 27,
//     notes: "Skipped workout",
//     result: "Your period is 1 day late",
//     status: "Checked",
//   },
// ];

// const Admindelay = () => {
//   const [expandedRow, setExpandedRow] = useState(null);

//   const toggleRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };

//   return (
//     <div className="flex min-h-screen">
//       <Sidebar active="Delay Reasons" />

//       <div className="flex-1 p-8 bg-gray-50">
//         <h1 className="text-2xl font-bold mb-6">Delay Reasons Submissions</h1>

//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-xs uppercase">Name</th>
//                 <th className="px-6 py-3 text-xs uppercase">Email</th>
//                 <th className="px-6 py-3 text-xs uppercase">Last Period</th>
//                 <th className="px-6 py-3 text-xs uppercase">Cycle Length</th>
//                 <th className="px-6 py-3 text-xs uppercase">Status</th>
//                 <th className="px-6 py-3 text-xs uppercase">Action</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200">
//               {delayData.map((user) => (
//                 <React.Fragment key={user.id}>
//                   <tr>
//                     <td className="px-6 py-4 text-sm">{user.name}</td>
//                     <td className="px-6 py-4 text-sm">{user.email}</td>
//                     <td className="px-6 py-4 text-sm">{user.lastPeriod}</td>
//                     <td className="px-6 py-4 text-sm">{user.cycleLength}</td>
//                     <td className="px-6 py-4 text-sm">{user.status}</td>
//                     <td className="px-6 py-4">
//                       <FaEye
//                         className="cursor-pointer text-gray-500 hover:text-gray-700"
//                         onClick={() => toggleRow(user.id)}
//                       />
//                     </td>
//                   </tr>

//                   {/* Expanded Row */}
//                   {expandedRow === user.id && (
//                     <tr>
//                       <td colSpan={6} className="px-6 py-4 bg-gray-50">
//                         <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
//                           <p><span className="font-semibold">Last Period Date:</span> {user.lastPeriod}</p>
//                           <p><span className="font-semibold">Cycle Length:</span> {user.cycleLength} days</p>
//                           {user.notes && <p><span className="font-semibold">Notes:</span> {user.notes}</p>}
//                           <p><span className="font-semibold">Result:</span> {user.result}</p>
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admindelay;
