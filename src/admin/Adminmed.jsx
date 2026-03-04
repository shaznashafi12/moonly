import { useState, useEffect } from "react";
import Sidebar from "../admin/Sidebar.jsx";
import { FaEye, FaFilePdf } from "react-icons/fa";
import { getReports } from "../api/api.js";

// Modal to view report + user details
const ReportModal = ({ report, onClose }) => {
  if (!report) return null;

  return (
    <div
      className="fixed inset-0 bg-[#f9f4f4] bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="border-2 border-slate-200 bg-gradient-to-br from-pink-100 via-purple-100 to-white rounded-xl shadow-lg w-11/12 md:w-3/4 lg:w-2/3 p-6 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-lg transition"
          aria-label="Close Report"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{report.name}</h2>

        <div className="space-y-3">
          <p><strong>Type:</strong> {report.type}</p>
          <p><strong>Date:</strong> {report.date}</p>
          <p><strong>Status:</strong> {report.status}</p>

          {report.user && (
            <>
              <p><strong>User Name:</strong> {report.user.name}</p>
              <p><strong>User Email:</strong> {report.user.email}</p>
            </>
          )}

          <a
            href={report.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-4 py-2 rounded-xl font-bold bg-pink-50 text-[#e58a95] font-medium hover:bg-pink-100 transition"
          >
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
};

const Adminmed = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

 useEffect(() => {
  const fetchReports = async () => {
    try {
      const res = await getReports();
      setReports(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  fetchReports();
}, []);
  return (
    <div className="flex min-h-screen">
      <Sidebar active="Medical Records" />

      <div className="flex-1 p-8 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">User Medical Records</h1>

        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-700">Report Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-700">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-700">Status</th>
                <th className="px-4 py-3 text-center text-xs font-medium uppercase text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 text-sm text-gray-800">{report.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-800">{report.type}</td>
                  <td className="px-4 py-4 text-sm text-gray-800">{report.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-800">{report.status}</td>
                  <td className="px-4 py-4 text-center">
<FaEye
  className="cursor-pointer text-gray-500 hover:text-gray-700"
  onClick={() => setSelectedReport(report)}
/>
</td>              
  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedReport && (
        <ReportModal report={selectedReport} onClose={() => setSelectedReport(null)} />
      )}
    </div>
  );
};

export default Adminmed;