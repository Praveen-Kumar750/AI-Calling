import express from "express";
import multer from "multer";
import fs from "fs"; // Import fs module
import path from "path";
import { uploadFile, getAllUploads } from "../controllers/fileUploadController.js";

const router = express.Router();

// Ensure uploads folder exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Define Routes
router.post("/upload", upload.fields([
  { name: "dataEntryFile", maxCount: 1 },
  { name: "contactEntryFile", maxCount: 1 },
  { name: "authorityContactFile", maxCount: 1 },
  { name: "messageDataFile", maxCount: 1 },
  { name: "messageContactFile", maxCount: 1 }
]), uploadFile);

router.get("/uploads", getAllUploads);

export default router;
