const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  cloudUrl: String,
  status: { type: String, enum: ["uploaded", "pending", "failed"], default: "pending" },
  uploadedAt: Date,
});

module.exports = mongoose.model("File", fileSchema);
