import { useState } from "react";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import { uploadReport } from "../api/api.js";
import { useNavigate } from "react-router-dom";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [reportName, setReportName] = useState("");
  const [status, setStatus] = useState("Normal"); // new state for report status
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!selectedFile || !reportName) {
      alert("Please enter report name and select PDF");
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("name", reportName);
      formData.append("status", status); // <- include status
      formData.append("userId", user._id);

      await uploadReport(formData);

      alert("Report uploaded successfully ✅");

      setSelectedFile(null);
      setReportName("");
      setStatus("Normal"); // reset status to default

      navigate("/medical");
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      alert("Upload failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-lilac-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-gray-100 p-8">

        <div className="text-center mb-6">
          <div className="mx-auto w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center mb-3">
            <FaFilePdf className="text-[#e58a95] text-2xl" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Upload Medical Report
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Store your medical documents securely
          </p>
        </div>

        <div className="mb-4">
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Report Name
          </label>
          <input
            type="text"
            value={reportName}
            onChange={(e) => setReportName(e.target.value)}
            placeholder="e.g. Blood Test, Scan Report"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </div>

        {/* New Status Dropdown */}
        <div className="mb-4">
          <label className="text-xs font-medium text-gray-600 mb-1 block">
            Report Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            <option value="Normal">Normal</option>
            <option value="Review">Review</option>
            <option value="Critical">Critical</option>
          </select>
        </div>

        <div className="mb-6 w-full">
          <input
            type="file"
            accept="application/pdf"
            id="pdfUpload"
            className="hidden"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <label
            htmlFor="pdfUpload"
            className="block w-full min-h-[160px] cursor-pointer border-2 border-dashed border-pink-300 rounded-2xl bg-pink-50/50 hover:bg-pink-50 transition flex flex-col items-center justify-center text-center"
          >
            {!selectedFile ? (
              <>
                <FaCloudUploadAlt className="text-[#e58a95] text-4xl mb-3" />
                <p className="text-sm font-medium text-gray-700">
                  Drag & drop your PDF here
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  or click to browse (PDF only)
                </p>
              </>
            ) : (
              <>
                <FaFilePdf className="text-pink-500 text-4xl mb-2" />
                <p className="text-sm font-medium text-gray-700">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-400">
                  File ready to upload
                </p>
              </>
            )}
          </label>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setSelectedFile(null);
              setReportName("");
              setStatus("Normal");
            }}
            className="flex-1 py-2.5 rounded-xl bg-slate-100 border border-gray-200 text-gray-600 font-medium hover:bg-gray-200 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-[#e58a95] text-white font-medium hover:bg-[#cd5d6a] transition"
          >
            {loading ? "Uploading..." : "Upload Report"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Upload;