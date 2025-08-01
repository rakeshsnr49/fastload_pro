import React from "react";
import UploadForm from "./components/UploadForm";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <h1 className="text-3xl font-bold mb-4">FastLoad Pro – Part 5</h1>
      <UploadForm />
    </main>
  );
}

/src/components/UploadForm.jsx

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) return toast.error("कृपया एक फ़ाइल चुनें");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5000/api/upload", formData);
      toast.success("अपलोड सफल ✅");
      console.log(res.data);
    } catch (err) {
      toast.error("अपलोड असफल ❌");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow w-full max-w-md mx-auto">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={uploading}
      >
        {uploading ? "अपलोड हो रहा है..." : "अपलोड करें"}
      </button>
    </div>
  );
}
