const express = require("express");
const multer = require("multer");
const cors = require("cors");
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).send("कोई फ़ाइल नहीं मिली");
  res.json({ message: "फ़ाइल सफलतापूर्वक अपलोड हो गई", file: req.file.filename });
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
