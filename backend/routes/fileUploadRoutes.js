import express from "express";
import multer from "multer";
import fs from "fs";
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

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Define all possible file field names based on service types
const fileFields = [
  // Incoming service calling files
  { name: "incomingCallingDataEntryFiles", maxCount: 10 },
  { name: "incomingCallingContactEntryFiles", maxCount: 10 },
  { name: "incomingCallingAuthorityContactFiles", maxCount: 10 },
  
  // Incoming service message files
  { name: "incomingMessageDataEntryFiles", maxCount: 10 },
  { name: "incomingMessageContactEntryFiles", maxCount: 10 },
  { name: "incomingMessageAuthorityContactFiles", maxCount: 10 },
  
  // Outgoing service calling files
  { name: "outgoingCallingDataEntryFiles", maxCount: 10 },
  { name: "outgoingCallingContactEntryFiles", maxCount: 10 },
  { name: "outgoingCallingAuthorityContactFiles", maxCount: 10 },
  
  // Outgoing service message files
  { name: "outgoingMessageDataEntryFiles", maxCount: 10 },
  { name: "outgoingMessageContactEntryFiles", maxCount: 10 },
  { name: "outgoingMessageAuthorityContactFiles", maxCount: 10 }
];

// Log middleware
router.use((req, res, next) => {
  console.log("📥 Incoming Request:");
  console.log("Headers:", req.headers);
  next();
});

router.post(
  "/upload",
  upload.fields(fileFields),
  (req, res, next) => {
    console.log("📥 Multer Middleware - Files:", req.files);
    console.log("📥 Multer Middleware - Body:", req.body);
    next();
  },
  uploadFile
);

router.get("/uploads", getAllUploads);

export default router;