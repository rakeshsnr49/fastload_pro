import React from "react";
import UploadDashboard from "./components/UploadDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">FastLoad Pro - Upload Dashboard</h1>
      <UploadDashboard />
    </div>
  );
}

export default App;

/frontend/src/components/UploadDashboard.jsx

import React, { useState } from "react";
import axios from "axios";

const UploadDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData);
      setUploadStatus("Upload successful!");
    } catch (err) {
      setUploadStatus("Upload failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Upload
      </button>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UploadDashboard;

