const fs = require("fs");
const path = require("path");
const multer = require("multer");
const cloudUploader = require("../services/cloudUploaderService");
const FileModel = require("../models/fileModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage }).single("file");

exports.uploadFastFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(500).json({ error: "Upload error", details: err });

    const localPath = req.file.path;
    const cloudURL = await cloudUploader.uploadToCloud(localPath, req.file.originalname);

    const newFile = new FileModel({
      filename: req.file.originalname,
      cloudUrl: cloudURL,
      status: "uploaded",
      uploadedAt: new Date(),
    });
    await newFile.save();

    res.status(200).json({
      message: "File uploaded successfully to cloud",
      data: newFile,
    });
  });
};
