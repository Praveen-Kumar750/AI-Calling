// models/FileUpload.js
import mongoose from "mongoose";

const FileUploadSchema = new mongoose.Schema({
    serviceType: { type: String, enum: ["incoming", "outgoing"], required: true },
    callingData: {
      dataEntry: { type: String, default: null },
      contactEntry: { type: String, default: null },
      authorityContact: { type: String, default: null },
      dataEntryFile: { type: String, default: null },  
      contactEntryFile: { type: String, default: null },
      authorityContactFile: { type: String, default: null }
    },
    messageData: {
      dataEntry: { type: String, default: null },
      contactEntry: { type: String, default: null },
      authorityContact: { type: String, default: null },
      dataEntryFile: { type: String, default: null },
      contactEntryFile: { type: String, default: null },
      authorityContactFile: { type: String, default: null } // Add this field
    },
    createdAt: { type: Date, default: Date.now }
  });
  

const FileUpload = mongoose.model("FileUpload", FileUploadSchema);
export default FileUpload;