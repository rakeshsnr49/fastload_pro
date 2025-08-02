const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ dest: "temp_chunks/" });

app.post("/upload-chunk", upload.single("chunk"), async (req, res) => {
  const { index, fileName, totalChunks } = req.body;
  const chunkPath = `temp_chunks/${fileName}-chunk-${index}`;
  fs.renameSync(req.file.path, chunkPath);

  const uploadedChunks = fs
    .readdirSync("temp_chunks")
    .filter((f) => f.startsWith(fileName));

  if (uploadedChunks.length == totalChunks) {
    const writeStream = fs.createWriteStream(`uploads/${fileName}`);
    for (let i = 0; i < totalChunks; i++) {
      const chunk = fs.readFileSync(`temp_chunks/${fileName}-chunk-${i}`);
      writeStream.write(chunk);
    }
    writeStream.end();

    uploadedChunks.forEach((f) => fs.unlinkSync(`temp_chunks/${f}`));
    return res.send("File assembled ✅");
  }

  res.send("Chunk received");
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
