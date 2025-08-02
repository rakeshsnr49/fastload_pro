const mongoose = require("mongoose");

const FileMetaSchema = new mongoose.Schema({
  filename: String,
  size: Number,
  mimetype: String,
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FileMeta", FileMetaSchema);
