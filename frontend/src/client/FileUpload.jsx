import React, { useState } from "react";
import ClientNavbar from "./components/ClientNavbar";
import { Navigate, useNavigate } from "react-router-dom";

const FileUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [successPopup, setSuccessPopup] = useState({
    show: false,
    message: ""
  });
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for incoming service
  const [incomingData, setIncomingData] = useState({
    calling: {
      dataEntry: "",
      contactEntry: "",
      authorityContact: "",
      authorityContact2: "",
      dataEntryFiles: [],
      contactEntryFiles: [],
      authorityContactFiles: []
    },
    message: {
      dataEntry: "",
      contactEntry: "",
      authorityContact: "",
      authorityContact2: "",
      dataEntryFiles: [],
      contactEntryFiles: [],
      authorityContactFiles: []
    }
  });
  
  // State for outgoing service
  const [outgoingData, setOutgoingData] = useState({
    calling: {
      dataEntry: "",
      contactEntry: "",
      authorityContact: "",
      authorityContact2: "",
      dataEntryFiles: [],
      contactEntryFiles: [],
      authorityContactFiles: []
    },
    message: {
      dataEntry: "",
      contactEntry: "",
      authorityContact: "",
      authorityContact2: "",
      dataEntryFiles: [],
      contactEntryFiles: [],
      authorityContactFiles: []
    }
  });
  
  // Toggle state for "Same for Text" - Incoming Service
  const [incomingSameForText, setIncomingSameForText] = useState({
    dataEntry: false,
    contactEntry: false,
    authorityContact: false,
    authorityContact2: false
  });
  
  // Toggle state for "Same for Text" - Outgoing Service
  const [outgoingSameForText, setOutgoingSameForText] = useState({
    dataEntry: false,
    contactEntry: false,
    authorityContact: false,
    authorityContact2: false
  });
  
  // Max file size (5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;
  
  // Check file sizes before uploading
  const validateFiles = (files) => {
    for (let file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return false;
      }
    }
    return true;
  };
  
  // Form submission handler
  const handleSubmit = async (e, type) => {
    e.preventDefault();
    
    // Reset error state
    setUploadError(null);
    
    const formData = new FormData();
    formData.append("serviceType", type);
    
    // Get the correct data based on service type
    const serviceData = type === "incoming" ? incomingData : outgoingData;
    
    // Validate file sizes
    const allFiles = [
      ...serviceData.calling.dataEntryFiles,
      ...serviceData.calling.contactEntryFiles,
      ...serviceData.calling.authorityContactFiles,
      ...serviceData.message.dataEntryFiles,
      ...serviceData.message.contactEntryFiles,
      ...serviceData.message.authorityContactFiles
    ];
    
    if (!validateFiles(allFiles)) {
      setUploadError("One or more files exceed the maximum size limit of 5MB.");
      return;
    }
    
    // Append all files with correct field names (matching backend expectations)
    serviceData.calling.dataEntryFiles.forEach(file => 
      formData.append(`${type}CallingDataEntryFiles`, file));
    serviceData.calling.contactEntryFiles.forEach(file => 
      formData.append(`${type}CallingContactEntryFiles`, file));
    serviceData.calling.authorityContactFiles.forEach(file => 
      formData.append(`${type}CallingAuthorityContactFiles`, file));
    
    serviceData.message.dataEntryFiles.forEach(file => 
      formData.append(`${type}MessageDataEntryFiles`, file));
    serviceData.message.contactEntryFiles.forEach(file => 
      formData.append(`${type}MessageContactEntryFiles`, file));
    serviceData.message.authorityContactFiles.forEach(file => 
      formData.append(`${type}MessageAuthorityContactFiles`, file));
    
    // Add text data with correct field names (matching backend expectations)
    formData.append(`${type}CallingDataEntry`, serviceData.calling.dataEntry || '');
    formData.append(`${type}CallingContactEntry`, serviceData.calling.contactEntry || '');
    formData.append(`${type}CallingAuthorityContact`, serviceData.calling.authorityContact || '');
    formData.append(`${type}CallingAuthorityContact2`, serviceData.calling.authorityContact2 || '');
    formData.append(`${type}MessageDataEntry`, serviceData.message.dataEntry || '');
    formData.append(`${type}MessageContactEntry`, serviceData.message.contactEntry || '');
    formData.append(`${type}MessageAuthorityContact`, serviceData.message.authorityContact || '');
    formData.append(`${type}MessageAuthorityContact2`, serviceData.message.authorityContact2 || '');
  
    // Log the FormData before sending
    console.log(`📤 Uploading ${type} FormData:`);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
  
    setIsLoading(true);
    
    try {
      // Use XMLHttpRequest for better progress tracking
      const xhr = new XMLHttpRequest();
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          console.log(`Upload progress: ${percentComplete.toFixed(2)}%`);
        }
      };
      
      xhr.onload = () => {
        setIsLoading(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log("✅ Upload Success:", xhr.responseText);
          try {
            const result = JSON.parse(xhr.responseText);
            console.log("Parsed result:", result);
          } catch (e) {
            console.log("Response is not JSON:", xhr.responseText);
          }
          
          // Show success popup instead of confirmation modal
          setSuccessPopup({
            show: true,
            message: `${type.charAt(0).toUpperCase() + type.slice(1)} files submitted successfully!`
          });
          
          // Auto-hide success popup after 3 seconds
          setTimeout(() => {
            setSuccessPopup({ show: false, message: "" });
          }, 3000);
          
        } else {
          let errorMessage = `Upload failed: Server returned ${xhr.status} ${xhr.statusText}`;
          try {
            const errorData = JSON.parse(xhr.responseText);
            errorMessage += `. Details: ${errorData.message || JSON.stringify(errorData)}`;
          } catch (e) {
            // If response is not JSON, use response text
            errorMessage += xhr.responseText ? `. ${xhr.responseText}` : "";
          }
          setUploadError(errorMessage);
          console.error("❌ Error:", errorMessage);
        }
      };
      
      xhr.onerror = () => {
        setIsLoading(false);
        const errorMessage = "Network error during upload. Check server connection.";
        setUploadError(errorMessage);
        console.error("❌ Network Error:", errorMessage);
      };
      
      // Use the correct endpoint - add the base URL from environment variable if available
      const apiUrl = "http://localhost:5000";
      xhr.open("POST", `${apiUrl}/api/files/upload`, true);
      
      // Send the request
      xhr.send(formData);
      
    } catch (error) {
      setIsLoading(false);
      const errorMessage = `Error uploading files: ${error.message}`;
      setUploadError(errorMessage);
      console.error("❌ Error:", errorMessage);
    }
  };

  // Final form submission handler
  const handleFinalSubmit = async () => {
    // Show confirmation modal when Review & Confirm is clicked
    setIsModalOpen(true);
  };

  return (
    <div className="relative">
      <ClientNavbar />

      <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10">FILE UPLOAD</h1>
        
        {/* Error message display */}
        {uploadError && (
          <div className="bg-red-600 text-white p-3 mb-6 rounded-lg max-w-3xl mx-auto">
            <p className="font-bold">Error:</p>
            <p>{uploadError}</p>
          </div>
        )}
        
        {/* Success Popup */}
        {successPopup.show && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-3 rounded-lg shadow-lg z-50 max-w-md">
            <p className="font-bold text-center">{successPopup.message}</p>
          </div>
        )}

        {/* Main content container with equal columns */}
        <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-10">
          {/* Incoming Service */}
          <div className="w-full lg:w-5/12">
            <IncomingService 
              data={incomingData}
              setData={setIncomingData}
              useSameForText={incomingSameForText} 
              setUseSameForText={setIncomingSameForText} 
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Divider - hidden on mobile, taller on larger screens */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="h-full min-h-[500px] w-[2px] bg-gray-400"></div>
          </div>
          
          {/* Horizontal divider for mobile */}
          <div className="w-full h-[2px] bg-gray-400 lg:hidden"></div>
          
          {/* Outgoing Service */}
          <div className="w-full lg:w-5/12">
            <OutgoingService 
              data={outgoingData}
              setData={setOutgoingData}
              useSameForText={outgoingSameForText} 
              setUseSameForText={setOutgoingSameForText} 
              handleSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
        </div>

        <div className="mt-8 md:mt-10 flex justify-center">
          <button
            className={`bg-[#9C0480] px-6 py-3 w-full max-w-md mx-auto md:w-[650px] text-white rounded-lg ${
              isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={handleFinalSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Review & Confirm"}
          </button>
        </div>
      </div>

      {/* Confirmation Modal - Only shown when Review & Confirm is clicked */}
      {isModalOpen && (
        <ConfirmationModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => {
            setIsModalOpen(false);
            setTimeout(() => setIsDoneModalOpen(true), 300); // Delay for smooth transition
          }}
        />
      )}

      {/* Done Modal with Blur Effect */}
      {isDoneModalOpen && (
        <DoneModal
          onClose={() => setIsDoneModalOpen(false)}
          onViewDetails={() => alert("Viewing Details...")}
        />
      )}
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-black text-white p-6 md:p-8 rounded-lg shadow-lg text-center w-full max-w-[350px] border border-gray-500">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Confirm?</h2>
        <div className="flex justify-center gap-4 md:gap-6">
          <button
            className="bg-gray-400 px-6 md:px-8 py-2 md:py-3 rounded-lg text-black font-semibold text-lg md:text-xl cursor-pointer"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="bg-green-500 px-6 md:px-8 py-2 md:py-3 rounded-lg text-black font-semibold text-lg md:text-xl cursor-pointer"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

const DoneModal = ({ onClose, onViewDetails }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 p-4">
      <div className="bg-black text-white p-6 md:p-8 rounded-lg shadow-lg text-center w-full max-w-[350px] border border-gray-500">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Done</h2>

        {/* Checkmark Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 md:w-16 h-14 md:h-16 border-4 border-[#9C0480] rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 md:h-10 w-8 md:w-10 text-[#9C0480]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 md:gap-6">
          <button
            className="bg-gray-400 px-4 md:px-6 py-2 rounded-lg text-black font-semibold text-base md:text-lg cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-[#9C0480] px-4 md:px-6 py-2 rounded-lg text-white font-semibold text-base md:text-lg cursor-pointer"
            onClick={() => navigate("/previous-data")}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const IncomingService = ({ data, setData, useSameForText, setUseSameForText, handleSubmit, isLoading }) => {
  // Handlers specific to incoming service
  const handleCallingChange = (field, value) => {
    setData(prev => ({
      ...prev,
      calling: {
        ...prev.calling,
        [field]: value
      }
    }));
  };

  const handleMessageChange = (field, value) => {
    setData(prev => ({
      ...prev,
      message: {
        ...prev.message,
        [field]: value
      }
    }));
  };

  return (
    <div className="h-full">
      <h2 className="text-xl md:text-2xl font-bold text-center underline mb-4">INCOMING SERVICE</h2>
      <div className="flex flex-col md:flex-row justify-between gap-6 h-full">
        <CallingSection 
          callingData={data.calling}
          onCallingChange={handleCallingChange}
          messageData={data.message}
          onMessageChange={handleMessageChange}
          useSameForText={useSameForText} 
          setUseSameForText={setUseSameForText}
          handleSubmit={(e) => handleSubmit(e, "incoming")}
          isLoading={isLoading}
        />
        <TextSection 
          messageData={data.message}
          onMessageChange={handleMessageChange}
          handleSubmit={(e) => handleSubmit(e, "incoming")}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

const OutgoingService = ({ data, setData, useSameForText, setUseSameForText, handleSubmit, isLoading }) => {
  // Handlers specific to outgoing service
  const handleCallingChange = (field, value) => {
    setData(prev => ({
      ...prev,
      calling: {
        ...prev.calling,
        [field]: value
      }
    }));
  };

  const handleMessageChange = (field, value) => {
    setData(prev => ({
      ...prev,
      message: {
        ...prev.message,
        [field]: value
      }
    }));
  };

  return (
    <div className="h-full">
      <h2 className="text-xl md:text-2xl font-bold text-center underline mb-4">OUTGOING SERVICE</h2>
      <div className="flex flex-col md:flex-row justify-between gap-6 h-full">
        <CallingSection 
          callingData={data.calling}
          onCallingChange={handleCallingChange}
          messageData={data.message}
          onMessageChange={handleMessageChange}
          useSameForText={useSameForText} 
          setUseSameForText={setUseSameForText} 
          handleSubmit={(e) => handleSubmit(e, "outgoing")}
          isLoading={isLoading}
        />
        <TextSection 
          messageData={data.message}
          onMessageChange={handleMessageChange}
          handleSubmit={(e) => handleSubmit(e, "outgoing")}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

const CallingSection = ({ 
  callingData, 
  onCallingChange, 
  messageData, 
  onMessageChange,
  useSameForText, 
  setUseSameForText, 
  handleSubmit,
  isLoading
}) => {
  const handleToggle = (field) => {
    const newState = !useSameForText[field];
  
    setUseSameForText(prev => ({
      ...prev,
      [field]: newState,
    }));
  
    if (newState) {
      // Copy text and files from callingData to messageData
      if (field === "dataEntry") {
        onMessageChange("dataEntry", callingData.dataEntry);
        onMessageChange("dataEntryFiles", [...callingData.dataEntryFiles]);
      } else if (field === "contactEntry") {
        onMessageChange("contactEntry", callingData.contactEntry);
        onMessageChange("contactEntryFiles", [...callingData.contactEntryFiles]);
      } else if (field === "authorityContact") {
        onMessageChange("authorityContact", callingData.authorityContact);
        onMessageChange("authorityContactFiles", [...callingData.authorityContactFiles]);
      } else if (field === "authorityContact2") {
        onMessageChange("authorityContact2", callingData.authorityContact2);
      }
    } else {
      // Reset messageData if unchecked
      if (field === "dataEntry") {
        onMessageChange("dataEntry", "");
        onMessageChange("dataEntryFiles", []);
      } else if (field === "contactEntry") {
        onMessageChange("contactEntry", "");
        onMessageChange("contactEntryFiles", []);
      } else if (field === "authorityContact") {
        onMessageChange("authorityContact", "");
        onMessageChange("authorityContactFiles", []);
      } else if (field === "authorityContact2") {
        onMessageChange("authorityContact2", "");
      }
    }
  };
  
  return (
    <div className="w-full md:w-1/2 mb-6 md:mb-0">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">CALLING</h3>

      {/* Data Entry Row */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-white">Data Entry</label>
          <Toggle 
            label="Same for Text" 
            isOn={useSameForText.dataEntry} 
            onToggle={() => handleToggle("dataEntry")}
          />
        </div>
        <FileInput 
          hideLabel={true}
          acceptOnly="pdf,csv,doc,docx"
          files={callingData.dataEntryFiles}
          setFiles={(newFiles) => onCallingChange("dataEntryFiles", newFiles)} 
        />
      </div>

      {/* Contact Entry Row */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-white">Contact Entry</label>
          <Toggle 
            label="Same for Text" 
            isOn={useSameForText.contactEntry} 
            onToggle={() => handleToggle("contactEntry")}
          />
        </div>
        <FileInput 
          hideLabel={true}
          acceptOnly="csv,doc,docx"
          files={callingData.contactEntryFiles}
          setFiles={(newFiles) => onCallingChange("contactEntryFiles", newFiles)}
        />
      </div>

      {/* Authority Contact Row */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-white">Authority Contact</label>
          <Toggle 
            label="Same for Text" 
            isOn={useSameForText.authorityContact} 
            onToggle={() => handleToggle("authorityContact")}
          />
        </div>
        <ManualInput 
          hideLabel={true}
          value={callingData.authorityContact}
          onChange={(e) => onCallingChange("authorityContact", e.target.value)}
        />
      </div>

      {/* Authority Contact 2 Row */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          
          
        </div>
        <ManualInput 
          hideLabel={true}
          value={callingData.authorityContact2}
          onChange={(e) => onCallingChange("authorityContact2", e.target.value)}
        />
      </div>

      {/* Authority Contact Files Row - No toggle needed for this one */}
      <div className="mb-4">
        <label className="block mb-2 text-white">Authority Contact File</label>
        <FileInput 
          hideLabel={true}
          acceptOnly="csv,doc,docx"
          files={callingData.authorityContactFiles}
          setFiles={(newFiles) => onCallingChange("authorityContactFiles", newFiles)} 
        />
      </div>
      
      <div className="mt-6 flex justify-center sm:justify-start">
        <SubmitButton handleSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

const TextSection = ({ messageData, onMessageChange, handleSubmit, isLoading }) => {
  return (
    <div className="w-full md:w-1/2 mt-6 md:mt-0">
      <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">MESSAGE</h3>

      {/* Data Entry */}
      <div className="mb-4">
        <label className="block mb-2 text-white">Data Entry</label>
        <FileInput 
          hideLabel={true}
          acceptOnly="pdf,csv,doc,docx"
          files={messageData.dataEntryFiles}
          setFiles={(newFiles) => onMessageChange("dataEntryFiles", newFiles)} 
        />
      </div>

      {/* Contact Entry */}
      <div className="mb-4">
        <label className="block mb-2 text-white">Contact Entry</label>
        <FileInput 
          hideLabel={true} 
          acceptOnly="csv,doc,docx"
          files={messageData.contactEntryFiles}
          setFiles={(newFiles) => onMessageChange("contactEntryFiles", newFiles)} 
        />
      </div>

      {/* Authority Contact */}
      <div className="mb-4">
        <label className="block mb-2 text-white">Authority Contact</label>
        <ManualInput 
          hideLabel={true}
          value={messageData.authorityContact}
          onChange={(e) => onMessageChange("authorityContact", e.target.value)}
        />
      </div>

      {/* Authority Contact 2 */}
      <div className="mb-4">
        
        <ManualInput 
          hideLabel={true}
          value={messageData.authorityContact2}
          onChange={(e) => onMessageChange("authorityContact2", e.target.value)}
        />
      </div>

      {/* Authority Contact File */}
      <div className="mb-4">
        <label className="block mb-2 text-white">Authority Contact File</label>
        <FileInput 
          hideLabel={true}
          acceptOnly="csv,doc,docx"
          files={messageData.authorityContactFiles}
          setFiles={(newFiles) => onMessageChange("authorityContactFiles", newFiles)} 
        />
      </div>

      <div className="mt-6 flex justify-center sm:justify-start">
        <SubmitButton handleSubmit={handleSubmit} isLoading={isLoading} />
      </div>
    </div>
  );
};

const FileInput = ({ label, hideLabel = false, acceptOnly, files = [], setFiles }) => {
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  
  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files || []);
    const allowedExtensions = acceptOnly.split(",");
    let errorMessage = "";

    // Validate file types
    const validFiles = newFiles.filter((file) => {
      const fileExtension = file.name.split(".").pop().toLowerCase();
      const isValidType = allowedExtensions.includes(fileExtension);
      
      if (!isValidType) {
        errorMessage = `Only ${acceptOnly.toUpperCase()} files are allowed.`;
        return false;
      }
      
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        errorMessage = `File "${file.name}" exceeds the maximum size limit of 5MB.`;
        return false;
      }
      
      return true;
    });

    if (errorMessage) {
      alert(errorMessage);
    }

    const updatedFiles = [...files, ...validFiles]; // Keep previous files
    setFiles(updatedFiles);
  };
  
  const removeFile = (index) => {
    const updatedFiles = [...files]; // Make a copy of files
    updatedFiles.splice(index, 1); // Remove the selected file
    setFiles(updatedFiles);
  };
  
  return (
    <div className="w-full">
      {!hideLabel && label && <label className="block mb-2 text-white">{label}</label>}
      <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-full">
        <label className="bg-[#9C0480] text-white px-2 py-2 rounded-lg cursor-pointer min-w-[120px] text-center">
          Choose Files
          <input 
            type="file" 
            className="hidden" 
            multiple 
            onChange={handleFileChange} 
            accept={`.${acceptOnly.split(',').join(',.')}`}
          />
        </label>
      </div>
      
      {/* File list with improved mobile styling */}
      {files.length > 0 && (
        <ul className="mt-2 text-gray-300">
          {files.map((file, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-800 text-white p-1 rounded-md mt-1">
              <div className="overflow-hidden text-sm text-ellipsis whitespace-nowrap max-w-full pr-2" title={file.name}>
                {file.name}
              </div>
              <button 
                className="ml-2 text-red-500 p-1 flex-shrink-0" 
                onClick={() => removeFile(index)}
                aria-label="Remove file"
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      )}
      
      <div className="text-xs text-gray-400 mt-1">
        Max file size: 5MB
      </div>
    </div>
  );
};

const ManualInput = ({ label, hideLabel = false, value, onChange }) => {
  return (
    <div className="w-full">
      {!hideLabel && label && <label className="block mb-2 text-white">{label}</label>}
      <input
        type="text"
        value={value || ""}
        onChange={onChange}
        className="w-full px-2 py-3 rounded-lg bg-white text-black border border-gray-600 placeholder-gray-400"
        placeholder={label ? `Enter the ${label} manually` : "Enter value manually"}
      />
    </div>
  );
};

const Toggle = ({ label, isOn, onToggle }) => {
  return (
    <div className="flex items-center">
      <button
        onClick={onToggle}
        className={`w-6 h-6 rounded-md cursor-pointer transition-colors duration-300 flex-shrink-0 ${
          isOn ? "bg-green-500" : "bg-gray-400"
        }`}
        aria-label={`Toggle ${label}`}
        aria-pressed={isOn}
      ></button>

      <span className="text-gray-300 text-xs whitespace-nowrap ml-2">
        {label}
      </span>
    </div>
  );
};


const SubmitButton = ({ handleSubmit, isLoading }) => {
  return (
    <button
      onClick={handleSubmit}
      disabled={isLoading}
      className={`bg-[#9C0480] px-4 py-2 md:py-3 cursor-pointer w-full sm:w-auto min-w-[150px] text-white rounded-lg ${
        isLoading ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isLoading ? "Uploading..." : "Submit"}
    </button>
  );
};

export default FileUpload;

// import React, { useState } from "react";
// import ClientNavbar from "./components/ClientNavbar";
// import { Navigate, useNavigate } from "react-router-dom";

// const FileUpload = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
//   const [successPopup, setSuccessPopup] = useState({
//     show: false,
//     message: ""
//   });
//   const [uploadError, setUploadError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
  
//   // State for incoming service
//   const [incomingData, setIncomingData] = useState({
//     calling: {
//       dataEntry: "",
//       contactEntry: "",
//       authorityContact: "",
//       authorityContact2: "",
//       dataEntryFiles: [],
//       contactEntryFiles: [],
//       authorityContactFiles: []
//     },
//     message: {
//       dataEntry: "",
//       contactEntry: "",
//       authorityContact: "",
//       authorityContact2: "",
//       dataEntryFiles: [],
//       contactEntryFiles: [],
//       authorityContactFiles: []
//     }
//   });
  
//   // State for outgoing service
//   const [outgoingData, setOutgoingData] = useState({
//     calling: {
//       dataEntry: "",
//       contactEntry: "",
//       authorityContact: "",
//       authorityContact2: "",
//       dataEntryFiles: [],
//       contactEntryFiles: [],
//       authorityContactFiles: []
//     },
//     message: {
//       dataEntry: "",
//       contactEntry: "",
//       authorityContact: "",
//       authorityContact2: "",
//       dataEntryFiles: [],
//       contactEntryFiles: [],
//       authorityContactFiles: []
//     }
//   });
  
//   // Toggle state for "Same for Text" - Incoming Service
//   const [incomingSameForText, setIncomingSameForText] = useState({
//     dataEntry: false,
//     contactEntry: false,
//     authorityContact: false,
//     authorityContact2: false
//   });
  
//   // Toggle state for "Same for Text" - Outgoing Service
//   const [outgoingSameForText, setOutgoingSameForText] = useState({
//     dataEntry: false,
//     contactEntry: false,
//     authorityContact: false,
//     authorityContact2: false
//   });
  
//   // Max file size (5MB)
//   const MAX_FILE_SIZE = 5 * 1024 * 1024;
  
//   // Check file sizes before uploading
//   const validateFiles = (files) => {
//     for (let file of files) {
//       if (file.size > MAX_FILE_SIZE) {
//         return false;
//       }
//     }
//     return true;
//   };
  
//   // Form submission handler
//   const handleSubmit = async (e, type) => {
//     e.preventDefault();
    
//     // Reset error state
//     setUploadError(null);
    
//     const formData = new FormData();
//     formData.append("serviceType", type);
    
//     // Get the correct data based on service type
//     const serviceData = type === "incoming" ? incomingData : outgoingData;
    
//     // Validate file sizes
//     const allFiles = [
//       ...serviceData.calling.dataEntryFiles,
//       ...serviceData.calling.contactEntryFiles,
//       ...serviceData.calling.authorityContactFiles,
//       ...serviceData.message.dataEntryFiles,
//       ...serviceData.message.contactEntryFiles,
//       ...serviceData.message.authorityContactFiles
//     ];
    
//     if (!validateFiles(allFiles)) {
//       setUploadError("One or more files exceed the maximum size limit of 5MB.");
//       return;
//     }
    
//     // Append all files with correct field names (matching backend expectations)
//     serviceData.calling.dataEntryFiles.forEach(file => 
//       formData.append(`${type}CallingDataEntryFiles`, file));
//     serviceData.calling.contactEntryFiles.forEach(file => 
//       formData.append(`${type}CallingContactEntryFiles`, file));
//     serviceData.calling.authorityContactFiles.forEach(file => 
//       formData.append(`${type}CallingAuthorityContactFiles`, file));
    
//     serviceData.message.dataEntryFiles.forEach(file => 
//       formData.append(`${type}MessageDataEntryFiles`, file));
//     serviceData.message.contactEntryFiles.forEach(file => 
//       formData.append(`${type}MessageContactEntryFiles`, file));
//     serviceData.message.authorityContactFiles.forEach(file => 
//       formData.append(`${type}MessageAuthorityContactFiles`, file));
    
//     // Add text data with correct field names (matching backend expectations)
//     formData.append(`${type}CallingDataEntry`, serviceData.calling.dataEntry || '');
//     formData.append(`${type}CallingContactEntry`, serviceData.calling.contactEntry || '');
//     formData.append(`${type}CallingAuthorityContact`, serviceData.calling.authorityContact || '');
//     formData.append(`${type}CallingAuthorityContact2`, serviceData.calling.authorityContact2 || '');
//     formData.append(`${type}MessageDataEntry`, serviceData.message.dataEntry || '');
//     formData.append(`${type}MessageContactEntry`, serviceData.message.contactEntry || '');
//     formData.append(`${type}MessageAuthorityContact`, serviceData.message.authorityContact || '');
//     formData.append(`${type}MessageAuthorityContact2`, serviceData.message.authorityContact2 || '');
  
//     // Log the FormData before sending
//     console.log(`📤 Uploading ${type} FormData:`);
//     for (const pair of formData.entries()) {
//       console.log(`${pair[0]}:`, pair[1]);
//     }
  
//     setIsLoading(true);
    
//     try {
//       // Use XMLHttpRequest for better progress tracking
//       const xhr = new XMLHttpRequest();
      
//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable) {
//           const percentComplete = (event.loaded / event.total) * 100;
//           console.log(`Upload progress: ${percentComplete.toFixed(2)}%`);
//         }
//       };
      
//       xhr.onload = () => {
//         setIsLoading(false);
//         if (xhr.status >= 200 && xhr.status < 300) {
//           console.log("✅ Upload Success:", xhr.responseText);
//           try {
//             const result = JSON.parse(xhr.responseText);
//             console.log("Parsed result:", result);
//           } catch (e) {
//             console.log("Response is not JSON:", xhr.responseText);
//           }
          
//           // Show success popup instead of confirmation modal
//           setSuccessPopup({
//             show: true,
//             message: `${type.charAt(0).toUpperCase() + type.slice(1)} files submitted successfully!`
//           });
          
//           // Auto-hide success popup after 3 seconds
//           setTimeout(() => {
//             setSuccessPopup({ show: false, message: "" });
//           }, 3000);
          
//         } else {
//           let errorMessage = `Upload failed: Server returned ${xhr.status} ${xhr.statusText}`;
//           try {
//             const errorData = JSON.parse(xhr.responseText);
//             errorMessage += `. Details: ${errorData.message || JSON.stringify(errorData)}`;
//           } catch (e) {
//             // If response is not JSON, use response text
//             errorMessage += xhr.responseText ? `. ${xhr.responseText}` : "";
//           }
//           setUploadError(errorMessage);
//           console.error("❌ Error:", errorMessage);
//         }
//       };
      
//       xhr.onerror = () => {
//         setIsLoading(false);
//         const errorMessage = "Network error during upload. Check server connection.";
//         setUploadError(errorMessage);
//         console.error("❌ Network Error:", errorMessage);
//       };
      
//       // Use the correct endpoint - add the base URL from environment variable if available
//       const apiUrl = "http://localhost:5000";
//       xhr.open("POST", `${apiUrl}/api/files/upload`, true);
      
//       // Send the request
//       xhr.send(formData);
      
//     } catch (error) {
//       setIsLoading(false);
//       const errorMessage = `Error uploading files: ${error.message}`;
//       setUploadError(errorMessage);
//       console.error("❌ Error:", errorMessage);
//     }
//   };

//   // Final form submission handler
//   const handleFinalSubmit = async () => {
//     // Show confirmation modal when Review & Confirm is clicked
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="relative">
//       <ClientNavbar />

//       <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
//         <h1 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-10">FILE UPLOAD</h1>
        
//         {/* Error message display */}
//         {uploadError && (
//           <div className="bg-red-600 text-white p-3 mb-6 rounded-lg max-w-3xl mx-auto">
//             <p className="font-bold">Error:</p>
//             <p>{uploadError}</p>
//           </div>
//         )}
        
//         {/* Success Popup */}
//         {successPopup.show && (
//           <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-600 text-white p-3 rounded-lg shadow-lg z-50 max-w-md">
//             <p className="font-bold text-center">{successPopup.message}</p>
//           </div>
//         )}

//         {/* Main content container with equal columns */}
//         <div className="flex flex-col lg:flex-row justify-center items-stretch gap-8 lg:gap-10">
//           {/* Incoming Service */}
//           <div className="w-full lg:w-5/12">
//             <IncomingService 
//               data={incomingData}
//               setData={setIncomingData}
//               useSameForText={incomingSameForText} 
//               setUseSameForText={setIncomingSameForText} 
//               handleSubmit={handleSubmit}
//               isLoading={isLoading}
//             />
//           </div>

//           {/* Divider - hidden on mobile, taller on larger screens */}
//           <div className="hidden lg:flex items-center justify-center">
//             <div className="h-full min-h-[500px] w-[2px] bg-gray-400"></div>
//           </div>
          
//           {/* Horizontal divider for mobile */}
//           <div className="w-full h-[2px] bg-gray-400 lg:hidden"></div>
          
//           {/* Outgoing Service */}
//           <div className="w-full lg:w-5/12">
//             <OutgoingService 
//               data={outgoingData}
//               setData={setOutgoingData}
//               useSameForText={outgoingSameForText} 
//               setUseSameForText={setOutgoingSameForText} 
//               handleSubmit={handleSubmit}
//               isLoading={isLoading}
//             />
//           </div>
//         </div>

//         <div className="mt-8 md:mt-10 flex justify-center">
//           <button
//             className={`bg-[#9C0480] px-6 py-3 w-full max-w-md mx-auto md:w-[650px] text-white rounded-lg ${
//               isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//             }`}
//             onClick={handleFinalSubmit}
//             disabled={isLoading}
//           >
//             {isLoading ? "Processing..." : "Review & Confirm"}
//           </button>
//         </div>
//       </div>

//       {/* Confirmation Modal - Only shown when Review & Confirm is clicked */}
//       {isModalOpen && (
//         <ConfirmationModal
//           onClose={() => setIsModalOpen(false)}
//           onConfirm={() => {
//             setIsModalOpen(false);
//             setTimeout(() => setIsDoneModalOpen(true), 300); // Delay for smooth transition
//           }}
//         />
//       )}

//       {/* Done Modal with Blur Effect */}
//       {isDoneModalOpen && (
//         <DoneModal
//           onClose={() => setIsDoneModalOpen(false)}
//           onViewDetails={() => alert("Viewing Details...")}
//         />
//       )}
//     </div>
//   );
// };

// // Confirmation Modal Component
// const ConfirmationModal = ({ onClose, onConfirm }) => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
//       <div className="bg-black text-white p-6 md:p-8 rounded-lg shadow-lg text-center w-full max-w-[350px] border border-gray-500">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Confirm?</h2>
//         <div className="flex justify-center gap-4 md:gap-6">
//           <button
//             className="bg-gray-400 px-6 md:px-8 py-2 md:py-3 rounded-lg text-black font-semibold text-lg md:text-xl cursor-pointer"
//             onClick={onClose}
//           >
//             No
//           </button>
//           <button
//             className="bg-green-500 px-6 md:px-8 py-2 md:py-3 rounded-lg text-black font-semibold text-lg md:text-xl cursor-pointer"
//             onClick={onConfirm}
//           >
//             Yes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const DoneModal = ({ onClose, onViewDetails }) => {
//   const navigate = useNavigate();
//   return (
//     <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md z-50 p-4">
//       <div className="bg-black text-white p-6 md:p-8 rounded-lg shadow-lg text-center w-full max-w-[350px] border border-gray-500">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6">Done</h2>

//         {/* Checkmark Icon */}
//         <div className="flex justify-center mb-6">
//           <div className="w-14 md:w-16 h-14 md:h-16 border-4 border-[#9C0480] rounded-full flex items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-8 md:h-10 w-8 md:w-10 text-[#9C0480]"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polyline points="20 6 9 17 4 12" />
//             </svg>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-center gap-4 md:gap-6">
//           <button
//             className="bg-gray-400 px-4 md:px-6 py-2 rounded-lg text-black font-semibold text-base md:text-lg cursor-pointer"
//             onClick={onClose}
//           >
//             Close
//           </button>
//           <button
//             className="bg-[#9C0480] px-4 md:px-6 py-2 rounded-lg text-white font-semibold text-base md:text-lg cursor-pointer"
//             onClick={() => navigate("/previous-data")}
//           >
//             View Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const IncomingService = ({ data, setData, useSameForText, setUseSameForText, handleSubmit, isLoading }) => {
//   // Handlers specific to incoming service
//   const handleCallingChange = (field, value) => {
//     setData(prev => ({
//       ...prev,
//       calling: {
//         ...prev.calling,
//         [field]: value
//       }
//     }));
//   };

//   const handleMessageChange = (field, value) => {
//     setData(prev => ({
//       ...prev,
//       message: {
//         ...prev.message,
//         [field]: value
//       }
//     }));
//   };

//   const handleToggle = (field) => {
//     const newState = !useSameForText[field];
  
//     setUseSameForText(prev => ({
//       ...prev,
//       [field]: newState,
//     }));
  
//     if (newState) {
//       // Copy text and files from callingData to messageData
//       if (field === "dataEntry") {
//         handleMessageChange("dataEntry", data.calling.dataEntry);
//         handleMessageChange("dataEntryFiles", [...data.calling.dataEntryFiles]);
//       } else if (field === "contactEntry") {
//         handleMessageChange("contactEntry", data.calling.contactEntry);
//         handleMessageChange("contactEntryFiles", [...data.calling.contactEntryFiles]);
//       } else if (field === "authorityContact") {
//         handleMessageChange("authorityContact", data.calling.authorityContact);
//         handleMessageChange("authorityContactFiles", [...data.calling.authorityContactFiles]);
//       } else if (field === "authorityContact2") {
//         handleMessageChange("authorityContact2", data.calling.authorityContact2);
//       }
//     } else {
//       // Reset messageData if unchecked
//       if (field === "dataEntry") {
//         handleMessageChange("dataEntry", "");
//         handleMessageChange("dataEntryFiles", []);
//       } else if (field === "contactEntry") {
//         handleMessageChange("contactEntry", "");
//         handleMessageChange("contactEntryFiles", []);
//       } else if (field === "authorityContact") {
//         handleMessageChange("authorityContact", "");
//         handleMessageChange("authorityContactFiles", []);
//       } else if (field === "authorityContact2") {
//         handleMessageChange("authorityContact2", "");
//       }
//     }
//   };

//   return (
//     <div className="h-full">
//       <h2 className="text-xl md:text-2xl font-bold text-center underline mb-4">INCOMING SERVICE</h2>
//       <div className="flex flex-col md:flex-row justify-between gap-6 h-full">
//         {/* Modified layout to have three columns on larger screens */}
//         <div className="w-full md:w-5/12">
//           <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">CALLING</h3>
          
//           {/* Data Entry */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Data Entry</label>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="pdf,csv,doc,docx"
//               files={data.calling.dataEntryFiles}
//               setFiles={(newFiles) => handleCallingChange("dataEntryFiles", newFiles)} 
//             />
//           </div>

//           {/* Contact Entry */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Contact Entry</label>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="csv,doc,docx"
//               files={data.calling.contactEntryFiles}
//               setFiles={(newFiles) => handleCallingChange("contactEntryFiles", newFiles)}
//             />
//           </div>

//           {/* Authority Contact */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Authority Contact</label>
//             <ManualInput 
//               hideLabel={true}
//               value={data.calling.authorityContact}
//               onChange={(e) => handleCallingChange("authorityContact", e.target.value)}
//             />
//           </div>

//           {/* Authority Contact 2 */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Authority Contact 2</label>
//             <ManualInput 
//               hideLabel={true}
//               value={data.calling.authorityContact2}
//               onChange={(e) => handleCallingChange("authorityContact2", e.target.value)}
//             />
//           </div>

//           {/* Authority Contact Files */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Authority Contact File</label>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="csv,doc,docx"
//               files={data.calling.authorityContactFiles}
//               setFiles={(newFiles) => handleCallingChange("authorityContactFiles", newFiles)} 
//             />
//           </div>
          
//           <div className="mt-6 flex justify-center sm:justify-start">
//             <SubmitButton handleSubmit={(e) => handleSubmit(e, "incoming")} isLoading={isLoading} />
//           </div>
//         </div>

//         {/* Same for Text Toggle Column */}
//         <div className="w-full md:w-2/12 flex md:flex-col justify-center items-center space-y-0 md:space-y-16 mb-2 md:mb-0">
//           {/* This will be visible only on md screens and up */}
//           <div className="hidden md:flex flex-col items-center justify-center h-full">
//             <div className="mb-16 invisible">Spacer</div>
//             <Toggle 
//               label="Same for Text" 
//               isOn={useSameForText.dataEntry} 
//               onToggle={() => handleToggle("dataEntry")}
//             />
//             <div className="h-6"></div>
//             <Toggle 
//               label="Same for Text" 
//               isOn={useSameForText.contactEntry} 
//               onToggle={() => handleToggle("contactEntry")}
//             />
//             <div className="h-6"></div>
//             <Toggle 
//               label="Same for Text" 
//               isOn={useSameForText.authorityContact} 
//               onToggle={() => handleToggle("authorityContact")}
//             />
//             <div className="h-6"></div>
//             <Toggle 
//               label="Same for Text" 
//               isOn={useSameForText.authorityContact2} 
//               onToggle={() => handleToggle("authorityContact2")}
//             />
//           </div>
//         </div>

//         <div className="w-full md:w-5/12">
//           <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">MESSAGE</h3>
          
//           {/* Data Entry with toggle for mobile */}
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-white">Data Entry</label>
//               <div className="md:hidden">
//                 <Toggle 
//                   label="Same for Text" 
//                   isOn={useSameForText.dataEntry} 
//                   onToggle={() => handleToggle("dataEntry")}
//                 />
//               </div>
//             </div>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="pdf,csv,doc,docx"
//               files={data.message.dataEntryFiles}
//               setFiles={(newFiles) => handleMessageChange("dataEntryFiles", newFiles)} 
//             />
//           </div>

//           {/* Contact Entry with toggle for mobile */}
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-white">Contact Entry</label>
//               <div className="md:hidden">
//                 <Toggle 
//                   label="Same for Text" 
//                   isOn={useSameForText.contactEntry} 
//                   onToggle={() => handleToggle("contactEntry")}
//                 />
//               </div>
//             </div>
//             <FileInput 
//               hideLabel={true} 
//               acceptOnly="csv,doc,docx"
//               files={data.message.contactEntryFiles}
//               setFiles={(newFiles) => handleMessageChange("contactEntryFiles", newFiles)} 
//             />
//           </div>

//           {/* Authority Contact with toggle for mobile */}
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-white">Authority Contact</label>
//               <div className="md:hidden">
//                 <Toggle 
//                   label="Same for Text" 
//                   isOn={useSameForText.authorityContact} 
//                   onToggle={() => handleToggle("authorityContact")}
//                 />
//               </div>
//             </div>
//             <ManualInput 
//               hideLabel={true}
//               value={data.message.authorityContact}
//               onChange={(e) => handleMessageChange("authorityContact", e.target.value)}
//             />
//           </div>

//           {/* Authority Contact 2 with toggle for mobile */}
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-white">Authority Contact 2</label>
//               <div className="md:hidden">
//                 <Toggle 
//                   label="Same for Text" 
//                   isOn={useSameForText.authorityContact2} 
//                   onToggle={() => handleToggle("authorityContact2")}
//                 />
//               </div>
//             </div>
//             <ManualInput 
//               hideLabel={true}
//               value={data.message.authorityContact2}
//               onChange={(e) => handleMessageChange("authorityContact2", e.target.value)}
//             />
//           </div>

//           {/* Authority Contact File */}
//           <div className="mb-4">
//             <label className="block mb-2 text-white">Authority Contact File</label>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="csv,doc,docx"
//               files={data.message.authorityContactFiles}
//               setFiles={(newFiles) => handleMessageChange("authorityContactFiles", newFiles)} 
//             />
//           </div>

//           <div className="mt-6 flex justify-center sm:justify-start">
//             <SubmitButton handleSubmit={(e) => handleSubmit(e, "incoming")} isLoading={isLoading} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Complete the OutgoingService component
// const OutgoingService = ({ data, setData, useSameForText, setUseSameForText, handleSubmit, isLoading }) => {
//   // Handlers specific to outgoing service
//   const handleCallingChange = (field, value) => {
//     setData(prev => ({
//       ...prev,
//       calling: {
//         ...prev.calling,
//         [field]: value
//       }
//     }));
//   };

//   const handleMessageChange = (field, value) => {
//     setData(prev => ({
//       ...prev,
//       message: {
//         ...prev.message,
//         [field]: value
//       }
//     }));
//   };

//   const handleToggle = (field) => {
//     const newState = !useSameForText[field];
  
//     setUseSameForText(prev => ({
//       ...prev,
//       [field]: newState,
//     }));
  
//     if (newState) {
//       // Copy text and files from callingData to messageData
//       if (field === "dataEntry") {
//         handleMessageChange("dataEntry", data.calling.dataEntry);
//         handleMessageChange("dataEntryFiles", [...data.calling.dataEntryFiles]);
//       } else if (field === "contactEntry") {
//         handleMessageChange("contactEntry", data.calling.contactEntry);
//         handleMessageChange("contactEntryFiles", [...data.calling.contactEntryFiles]);
//       } else if (field === "authorityContact") {
//         handleMessageChange("authorityContact", data.calling.authorityContact);
//         handleMessageChange("authorityContactFiles", [...data.calling.authorityContactFiles]);
//       } else if (field === "authorityContact2") {
//         handleMessageChange("authorityContact2", data.calling.authorityContact2);
//       }
//     } else {
//       // Reset messageData if unchecked
//       if (field === "dataEntry") {
//         handleMessageChange("dataEntry", "");
//         handleMessageChange("dataEntryFiles", []);
//       } else if (field === "contactEntry") {
//         handleMessageChange("contactEntry", "");
//         handleMessageChange("contactEntryFiles", []);
//       } else if (field === "authorityContact") {
//         handleMessageChange("authorityContact", "");
//         handleMessageChange("authorityContactFiles", []);
//       } else if (field === "authorityContact2") {
//         handleMessageChange("authorityContact2", "");
//       }
//     }
//   };

//   return (
//     <div className="h-full">
//       <h2 className="text-xl md:text-2xl font-bold text-center underline mb-4">OUTGOING SERVICE</h2>
//       <div className="flex flex-col md:flex-row justify-between gap-6 h-full">
//         {/* Modified layout to have three columns on larger screens */}
//         <div className="w-full md:w-5/12">
//           <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">CALLING</h3>
          
//           {/* Data Entry */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Data Entry</label>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="pdf,csv,doc,docx"
//               files={data.calling.dataEntryFiles}
//               setFiles={(newFiles) => handleCallingChange("dataEntryFiles", newFiles)} 
//             />
//           </div>

//           {/* Contact Entry */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Contact Entry</label>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="csv,doc,docx"
//               files={data.calling.contactEntryFiles}
//               setFiles={(newFiles) => handleCallingChange("contactEntryFiles", newFiles)}
//             />
//           </div>

//           {/* Authority Contact */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Authority Contact</label>
//             <ManualInput 
//               hideLabel={true}
//               value={data.calling.authorityContact}
//               onChange={(e) => handleCallingChange("authorityContact", e.target.value)}
//             />
//           </div>

//           {/* Authority Contact 2 */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Authority Contact 2</label>
//             <ManualInput 
//               hideLabel={true}
//               value={data.calling.authorityContact2}
//               onChange={(e) => handleCallingChange("authorityContact2", e.target.value)}
//             />
//           </div>

//           {/* Authority Contact Files */}
//           <div className="mb-4">
//             <label className="block text-white mb-2">Authority Contact File</label>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="csv,doc,docx"
//               files={data.calling.authorityContactFiles}
//               setFiles={(newFiles) => handleCallingChange("authorityContactFiles", newFiles)} 
//             />
//           </div>
          
//           <div className="mt-6 flex justify-center sm:justify-start">
//             <SubmitButton handleSubmit={(e) => handleSubmit(e, "outgoing")} isLoading={isLoading} />
//           </div>
//         </div>

//         {/* Same for Text Toggle Column */}
//         <div className="w-full md:w-2/12 flex md:flex-col justify-center items-center space-y-0 md:space-y-16 mb-2 md:mb-0">
//           {/* This will be visible only on md screens and up */}
//           <div className="hidden md:flex flex-col items-center justify-center h-full">
//             <div className="mb-16 invisible">Spacer</div>
//             <Toggle 
//               label="Same for Text" 
//               isOn={useSameForText.dataEntry} 
//               onToggle={() => handleToggle("dataEntry")}
//             />
//             <div className="h-6"></div>
//             <Toggle 
//               label="Same for Text" 
//               isOn={useSameForText.contactEntry} 
//               onToggle={() => handleToggle("contactEntry")}
//             />
//             <div className="h-6"></div>
//             <Toggle 
//               label="Same for Text" 
//               isOn={useSameForText.authorityContact} 
//               onToggle={() => handleToggle("authorityContact")}
//             />
//             <div className="h-6"></div>
//             <Toggle 
//               label="Same for Text" 
//               isOn={useSameForText.authorityContact2} 
//               onToggle={() => handleToggle("authorityContact2")}
//             />
//           </div>
//         </div>

//         <div className="w-full md:w-5/12">
//           <h3 className="text-lg md:text-xl font-semibold mb-4 text-center md:text-left">TEXT</h3>
          
//           {/* Data Entry with toggle for mobile */}
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-white">Data Entry</label>
//               <div className="md:hidden">
//                 <Toggle 
//                   label="Same for Text" 
//                   isOn={useSameForText.dataEntry} 
//                   onToggle={() => handleToggle("dataEntry")}
//                 />
//               </div>
//             </div>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="pdf,csv,doc,docx"
//               files={data.message.dataEntryFiles}
//               setFiles={(newFiles) => handleMessageChange("dataEntryFiles", newFiles)} 
//             />
//           </div>

//           {/* Contact Entry with toggle for mobile */}
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-white">Contact Entry</label>
//               <div className="md:hidden">
//                 <Toggle 
//                   label="Same for Text" 
//                   isOn={useSameForText.contactEntry} 
//                   onToggle={() => handleToggle("contactEntry")}
//                 />
//               </div>
//             </div>
//             <FileInput 
//               hideLabel={true} 
//               acceptOnly="csv,doc,docx"
//               files={data.message.contactEntryFiles}
//               setFiles={(newFiles) => handleMessageChange("contactEntryFiles", newFiles)} 
//             />
//           </div>

//           {/* Authority Contact with toggle for mobile */}
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-white">Authority Contact</label>
//               <div className="md:hidden">
//                 <Toggle 
//                   label="Same for Text" 
//                   isOn={useSameForText.authorityContact} 
//                   onToggle={() => handleToggle("authorityContact")}
//                 />
//               </div>
//             </div>
//             <ManualInput 
//               hideLabel={true}
//               value={data.message.authorityContact}
//               onChange={(e) => handleMessageChange("authorityContact", e.target.value)}
//             />
//           </div>

//           {/* Authority Contact 2 with toggle for mobile */}
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <label className="block text-white">Authority Contact 2</label>
//               <div className="md:hidden">
//                 <Toggle 
//                   label="Same for Text" 
//                   isOn={useSameForText.authorityContact2} 
//                   onToggle={() => handleToggle("authorityContact2")}
//                 />
//               </div>
//             </div>
//             <ManualInput 
//               hideLabel={true}
//               value={data.message.authorityContact2}
//               onChange={(e) => handleMessageChange("authorityContact2", e.target.value)}
//             />
//           </div>

//           {/* Authority Contact File */}
//           <div className="mb-4">
//             <label className="block mb-2 text-white">Authority Contact File</label>
//             <FileInput 
//               hideLabel={true}
//               acceptOnly="csv,doc,docx"
//               files={data.message.authorityContactFiles}
//               setFiles={(newFiles) => handleMessageChange("authorityContactFiles", newFiles)} 
//             />
//           </div>

//           <div className="mt-6 flex justify-center sm:justify-start">
//             <SubmitButton handleSubmit={(e) => handleSubmit(e, "outgoing")} isLoading={isLoading} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // FileInput Component
// const FileInput = ({ hideLabel = false, acceptOnly, files = [], setFiles }) => {
//   const inputRef = React.useRef(null);

//   const handleFileSelect = (e) => {
//     if (e.target.files.length > 0) {
//       // Convert FileList to array and append to existing files
//       const newFiles = [...files, ...Array.from(e.target.files)];
//       setFiles(newFiles);
      
//       // Reset the input to allow selecting the same file again
//       if (inputRef.current) inputRef.current.value = '';
//     }
//   };

//   const removeFile = (index) => {
//     setFiles(files.filter((_, i) => i !== index));
//   };

//   // Format accepted file types for input
//   const formatAcceptTypes = () => {
//     if (!acceptOnly) return '';
    
//     return acceptOnly.split(',').map(type => `.${type.trim()}`).join(',');
//   };

//   return (
//     <div className="space-y-2">
//       <div className="flex items-center">
//         <button
//           type="button"
//           onClick={() => inputRef.current?.click()}
//           className="bg-[#9C0480] text-white px-4 py-2 rounded-md text-sm font-medium"
//         >
//           Choose File
//         </button>
//         <span className="ml-3 text-sm text-gray-300">
//           {files.length > 0 ? `${files.length} file(s) selected` : 'No file chosen'}
//         </span>
//         <input
//           ref={inputRef}
//           type="file"
//           accept={formatAcceptTypes()}
//           onChange={handleFileSelect}
//           className="hidden"
//         />
//       </div>
      
//       {/* Display selected files with remove option */}
//       {files.length > 0 && (
//         <div className="mt-2 space-y-1">
//           {files.map((file, index) => (
//             <div key={index} className="flex items-center justify-between bg-gray-800 p-2 rounded-md">
//               <span className="text-sm truncate max-w-[200px]">{file.name}</span>
//               <button
//                 type="button"
//                 onClick={() => removeFile(index)}
//                 className="text-red-400 hover:text-red-600"
//               >
//                 ×
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // Manual Input Component
// const ManualInput = ({ hideLabel = false, value, onChange, placeholder = "Enter the Contact manually" }) => {
//   return (
//     <div>
//       <input
//         type="text"
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400"
//       />
//     </div>
//   );
// };

// // Toggle Component
// const Toggle = ({ label, isOn, onToggle }) => {
//   return (
//     <div className="flex items-center gap-2">
//       <label className="text-xs text-gray-300 mr-1">{label}</label>
//       <div
//         onClick={onToggle}
//         className={`relative inline-flex h-5 w-10 items-center rounded-full ${isOn ? 'bg-[#9C0480]' : 'bg-gray-600'}`}
//       >
//         <span
//           className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
//             isOn ? 'translate-x-5' : 'translate-x-1'
//           }`}
//         />
//       </div>
//     </div>
//   );
// };

// // Submit Button Component
// const SubmitButton = ({ handleSubmit, isLoading }) => {
//   return (
//     <button
//       onClick={handleSubmit}
//       disabled={isLoading}
//       className={`bg-[#9C0480] hover:bg-[#7b0365] px-6 py-2 rounded-md text-white font-medium transition-colors ${
//         isLoading ? 'opacity-50 cursor-not-allowed' : ''
//       }`}
//     >
//       {isLoading ? 'Processing...' : 'Submit'}
//     </button>
//   );
// };

// export default FileUpload;