const mongoose = require("mongoose");

const FileLogSchema = new mongoose.Schema({
  fileName: String,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("FileLog", FileLogSchema);

Add this to server.js (optional log)

// Add after app.use(cors());
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fastload", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const FileLog = require("./models/FileLog");

// In final writeStream.end() block:
await FileLog.create({ fileName });
