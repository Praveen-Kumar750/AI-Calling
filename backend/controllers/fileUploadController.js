import FileUpload from "../models/FileUpload.model.js";

export const uploadFile = async (req, res) => {
  try {
    console.log("✅ Request Body:", req.body);
    console.log("📂 Uploaded Files:", req.files);

    if (!req.body.serviceType) {
      return res.status(400).json({ message: "❌ serviceType is missing" });
    }

    const { serviceType } = req.body;
    
    // Organize files by type
    let filePathsByType = {};
    
    if (req.files) {
      Object.keys(req.files).forEach(fieldName => {
        filePathsByType[fieldName] = req.files[fieldName].map(file => file.path);
      });
    }

    console.log("🔹 Creating a new file upload entry...");

    // Create the upload data structure
    const newUpload = new FileUpload({
      serviceType,
      callingData: {
        dataEntry: req.body[`${serviceType}CallingDataEntry`] || null,
        contactEntry: req.body[`${serviceType}CallingContactEntry`] || null,
        authorityContact: req.body[`${serviceType}CallingAuthorityContact`] || null,
        dataEntryFiles: filePathsByType[`${serviceType}CallingDataEntryFiles`] || [],
        contactEntryFiles: filePathsByType[`${serviceType}CallingContactEntryFiles`] || [],
        authorityContactFiles: filePathsByType[`${serviceType}CallingAuthorityContactFiles`] || []
      },
      messageData: {
        dataEntry: req.body[`${serviceType}MessageDataEntry`] || null,
        contactEntry: req.body[`${serviceType}MessageContactEntry`] || null,
        authorityContact: req.body[`${serviceType}MessageAuthorityContact`] || null,
        dataEntryFiles: filePathsByType[`${serviceType}MessageDataEntryFiles`] || [],
        contactEntryFiles: filePathsByType[`${serviceType}MessageContactEntryFiles`] || [],
        authorityContactFiles: filePathsByType[`${serviceType}MessageAuthorityContactFiles`] || []
      }
    });

    console.log("💾 Saving to MongoDB...");
    const savedUpload = await newUpload.save();

    res.status(201).json({ 
      message: "✅ File and form data uploaded successfully", 
      upload: savedUpload 
    });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Uploads
export const getAllUploads = async (req, res) => {
  try {
    const uploads = await FileUpload.find();
    res.status(200).json(uploads);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
