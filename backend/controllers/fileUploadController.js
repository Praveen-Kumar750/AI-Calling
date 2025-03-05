import FileUpload from "../models/FileUpload.model.js";

// Handle File Upload and Form Submission
export const uploadFile = async (req, res) => {
    try {
      console.log("Request received:", req.body); // Log request body
      console.log("Uploaded files:", req.files); // Log uploaded files
  
      const { serviceType, callingData, messageData } = req.body;
  
      const newUpload = new FileUpload({
        serviceType,
        callingData: {
          dataEntry: callingData?.dataEntry || null,
          contactEntry: callingData?.contactEntry || null,
          authorityContact: callingData?.authorityContact || null,
          dataEntryFile: req.files?.["dataEntryFile"]?.[0]?.path || null,
          contactEntryFile: req.files?.["contactEntryFile"]?.[0]?.path || null,
          authorityContactFile: req.files?.["authorityContactFile"]?.[0]?.path || null,
        },
        messageData: {
          dataEntry: messageData?.dataEntry || null,
          contactEntry: messageData?.contactEntry || null,
          authorityContact: messageData?.authorityContact || null,
          dataEntryFile: req.files?.["messageDataFile"]?.[0]?.path || null,
          contactEntryFile: req.files?.["messageContactFile"]?.[0]?.path || null,
        }
      });
  
      console.log("Saving to MongoDB...");
      await newUpload.save();
  
      res.status(201).json({ message: "File and form data uploaded successfully", newUpload });
    } catch (error) {
      console.error("Upload Error:", error); // Log the error in the backend
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
// Get All Uploads
export const getAllUploads = async (req, res) => {
  try {
    const uploads = await FileUpload.find();
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
