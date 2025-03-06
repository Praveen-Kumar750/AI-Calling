import mongoose from "mongoose";

const FileUploadSchema = new mongoose.Schema({
  serviceType: { type: String, required: true },
  callingData: {
    dataEntry: { type: String, default: null },
    contactEntry: { type: String, default: null },
    authorityContact: { type: String, default: null },
    dataEntryFiles: [{ type: String, default: null }],
    contactEntryFiles: [{ type: String, default: null }],
    authorityContactFiles: [{ type: String, default: null }]
  },
  messageData: {
    dataEntry: { type: String, default: null },
    contactEntry: { type: String, default: null },
    authorityContact: { type: String, default: null },
    dataEntryFiles: [{ type: String, default: null }],
    contactEntryFiles: [{ type: String, default: null }],
    authorityContactFiles: [{ type: String, default: null }]
  }
});

export default mongoose.model("FileUpload", FileUploadSchema);
