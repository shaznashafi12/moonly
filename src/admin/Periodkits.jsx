// import React from "react";
// import Sidebar from "../admin/Sidebar.jsx";
// import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
// // import kit1 from "../images/kits.jfif";
// // import kit2 from "../images/monthlykit.png";

// const periodKitsData = [
//   {
//     id: 1,
//     name: "First Period Starter Kit",
//     items: [
//       "Sanitary Pads (Regular)",
//       "Panty Liners",
//       "Intimate Wipes",
//       "Period Guide Book",
//       "Pouch"
//     ],
//     price: "$39.99",
//     stock: 30,
//     // image: kit1,
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Monthly Comfort Kit",
//     items: [
//       "Day Pads",
//       "Night Pads",
//       "Pain Relief Patch",
//       "Intimate Wash"
//     ],
//     price: "$79.98",
//     stock: 20,
//     // image: kit2,
//     status: "Active",
//   },
// ];

// const Periodkits = () => {
//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <Sidebar active="Period Kits" />

//       {/* Main Content */}
//       <div className="flex-1 p-8 bg-gray-50">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Period Kits</h1>
//           <button className="flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600">
//             <FaPlus /> Add Kit
//           </button>
//         </div>

//         <div className="overflow-x-auto bg-white rounded shadow">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kit Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Included Items</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200">
//               {periodKitsData.map((kit) => (
//                 <tr key={kit.id}>
//                   <td className="px-6 py-4">
//                     <img
//                       src={kit.image}
//                       alt={kit.name}
//                       className="w-14 h-14 object-cover rounded"
//                     />
//                   </td>

//                   <td className="px-6 py-4 text-sm font-medium">
//                     {kit.name}
//                   </td>

//                   <td className="px-6 py-4 text-sm text-gray-600">
//                     <ul className="list-disc ml-4">
//                       {kit.items.map((item, index) => (
//                         <li key={index}>{item}</li>
//                       ))}
//                     </ul>
//                   </td>

//                   <td className="px-6 py-4 text-sm">{kit.price}</td>
//                   <td className="px-6 py-4 text-sm">{kit.stock}</td>
//                   <td className="px-6 py-4 text-sm">{kit.status}</td>

//                   <td className="px-6 py-4 flex gap-3">
//                     <FaEdit className="cursor-pointer text-gray-500 hover:text-gray-700" />
//                     <FaTrash className="cursor-pointer text-gray-500 hover:text-red-500" />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Periodkits;
