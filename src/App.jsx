import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const uploadFile = async () => {
    if (!file) return;
    setUploadStatus("Uploading...");
    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * chunkSize, (i + 1) * chunkSize);
      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("index", i);
      formData.append("fileName", file.name);
      formData.append("totalChunks", totalChunks);

      await axios.post("http://localhost:5000/upload-chunk", formData);
    }

    setUploadStatus("Upload complete ✅");
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">FastLoad Pro - Chunk Upload</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={uploadFile}
      >
        Upload
      </button>
      <p className="mt-2 text-green-700">{uploadStatus}</p>
    </div>
  );
}

export default App;
