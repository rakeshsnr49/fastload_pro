const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const File = require('./models/File');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/fastloadpro', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"));

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, mimetype, size } = req.file;

    const newFile = new File({
      name: originalname,
      type: mimetype,
      size,
      uploadedAt: new Date(),
    });

    await newFile.save();

    res.status(200).json({ success: true, message: 'File metadata saved', file: newFile });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Upload failed', error: error.message });
  }
});

app.get('/files', async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.status(200).json({ success: true, files });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
