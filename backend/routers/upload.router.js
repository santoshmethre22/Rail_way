import express from "express";
import upload from "../utils/multerConfig.js";
import cloudinary from "../utils/claudinaryConfig.js";

import { User } from "../models/user.model.js";
import { protect } from "../middlewares/auth.middleware.js";
//import { verifyToken } from "../middlewares/auth.js"; // Ensure authentication

const router = express.Router(); 

// Upload File & Store in Cloudinary Folder
router.post("/upload-file", protect, upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });
    const userId = req.user.id; // Get user ID from token
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Upload file to Cloudinary inside "railway_ticket_booking/uploads"
    const result = await cloudinary.uploader.upload(file.path, {
    
      folder: "railway_ticket_booking/uploads",
     
      resource_type: "auto", // Auto-detect image/video
    
    });

    // Save file URL in MongoDB
    user.files.push({
      url: result.secure_url,
      fileType: result.resource_type,
    });
    await user.save();

    res.status(200).json({ message: "Upload successful", file: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error });
  }
});

// Get User Uploaded Files
router.get("/get-files", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("files");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.files);
  } catch (error) {
    res.status(500).json({ message: "Error fetching files", error });
  }
});

export default router;
