const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "your-cloud-name",
  api_key: "your-api-key",
  api_secret: "your-secret",
});

exports.uploadToCloud = async (localFilePath, fileName) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      public_id: "fastload/" + fileName.split(".")[0],
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath); // Remove local file after upload
    return result.secure_url;
  } catch (error) {
    throw new Error("Cloud upload failed: " + error.message);
  }
};
