import React, { useState,useEffect } from "react";
import ClientNavbar from "./components/ClientNavbar";
const FileUpload = () => {
  const [serviceType, setServiceType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [callingData, setCallingData] = useState({
    dataEntry: "",
    contactEntry: "",
    authorityContact: "",
    dataEntryFile: null,  // Store files
    contactEntryFile: null,
    authorityContactFile: null
  });
  
  const [messageData, setMessageData] = useState({
    dataEntry: "",
    contactEntry: "",
    authorityContact: "",
    dataEntryFile: null,
    contactEntryFile: null,
  });
  
  const [useSameForTextIncoming, setUseSameForTextIncoming] = useState({
    dataEntry: false,
    contactEntry: false,
    authorityContact: false,
  });
  
  const [useSameForTextOutgoing, setUseSameForTextOutgoing] = useState({
    dataEntry: false,
    contactEntry: false,
    authorityContact: false,
  });
  
  const handleSubmit = async (e, type) => {
    e.preventDefault();
  
    setServiceType(type); // Ensure correct serviceType
  
    const formData = new FormData();
    formData.append("serviceType", type); // Use passed type (incoming/outgoing)
  
    // Append Calling Data
    formData.append("dataEntry", callingData.dataEntry);
    formData.append("contactEntry", callingData.contactEntry);
    formData.append("authorityContact", callingData.authorityContact);  // ✅ Append Authority Contact text
  
    if (callingData.dataEntryFile) {
      formData.append("dataEntryFile", callingData.dataEntryFile);
    }
    if (callingData.contactEntryFile) {
      formData.append("contactEntryFile", callingData.contactEntryFile);
    }
    if (callingData.authorityContactFile) {
      formData.append("authorityContactFile", callingData.authorityContactFile);
    }
  
    // Append Message Data
    formData.append("messageData", messageData.dataEntry);
    formData.append("messageContact", messageData.contactEntry);
    formData.append("messageAuthorityContact", messageData.authorityContact);  // ✅ Append Authority Contact text
  
    if (messageData.dataEntryFile) {
      formData.append("messageDataFile", messageData.dataEntryFile);
    }
    if (messageData.contactEntryFile) {
      formData.append("messageContactFile", messageData.contactEntryFile);
    }
  
    console.log("🔹 Service Type:", type);
    console.log("📩 FormData Entries:", [...formData.entries()]);
  
    try {
      const response = await fetch("http://localhost:5000/api/files/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Upload failed");
      }
  
      const result = await response.json();
      console.log("✅ Upload Success:", result);
    } catch (error) {
      console.error("❌ Error uploading files:", error);
    }
  };
  
  


  return (
    <div className="relative">
      <ClientNavbar />

      <div className="min-h-screen bg-gray-900 text-white p-6">
        <h1 className="text-4xl font-bold text-center mb-10">FILE UPLOAD</h1>

        <div className="flex justify-center items-start gap-10">
        <IncomingService 
  callingData={callingData} 
  setCallingData={setCallingData} 
  messageData={messageData} 
  setMessageData={setMessageData} 
  useSameForText={useSameForTextIncoming} 
  setUseSameForText={setUseSameForTextIncoming} 
  handleSubmit={handleSubmit}
/>

<div className="flex items-center justify-center h-screen">
      <div className="h-180 w-[2px] bg-gray-400"></div>
    </div>
<OutgoingService 
  callingData={callingData} 
  setCallingData={setCallingData} 
  messageData={messageData} 
  setMessageData={setMessageData} 
  useSameForText={useSameForTextOutgoing} 
  setUseSameForText={setUseSameForTextOutgoing} 
  handleSubmit={handleSubmit}
/>




        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="bg-[#9C0480] px-6 py-3 w-[650px] text-white rounded-lg cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Review & Confirm
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
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
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black text-white p-8 rounded-lg shadow-lg text-center w-[350px] border border-gray-500">
        <h2 className="text-3xl font-bold mb-6">Confirm?</h2>{" "}
        {/* Increased text size & margin */}
        <div className="flex justify-center gap-6">
          {" "}
          {/* Increased button spacing */}
          <button
            className="bg-gray-400 px-8 py-3 rounded-lg text-black font-semibold text-xl cursor-pointer"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="bg-green-500 px-8 py-3 rounded-lg text-black font-semibold text-xl cursor-pointer"
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
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md">
      {" "}
      {/* Only blur the background */}
      <div className="bg-black text-white p-8 rounded-lg shadow-lg text-center w-[350px] border border-gray-500">
        <h2 className="text-3xl font-bold mb-6">Done</h2>

        {/* Checkmark Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-4 border-[#9C0480] rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#9C0480]"
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
        <div className="flex justify-center gap-6">
          <button
            className="bg-gray-400 px-6 py-2 rounded-lg text-black font-semibold text-lg cursor-pointer"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-[#9C0480] px-6 py-2 rounded-lg text-white font-semibold text-lg cursor-pointer"
            onClick={onViewDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const IncomingService = ({ callingData, setCallingData, messageData, setMessageData, useSameForText, setUseSameForText, handleSubmit }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center underline">INCOMING SERVICE</h2>
      <div className="flex justify-center space-x-14 mt-6">
        <CallingSection 
          callingData={callingData} 
          setCallingData={setCallingData} 
          useSameForText={useSameForText} 
          setUseSameForText={setUseSameForText} 
          setMessageData={setMessageData}
          handleSubmit={(e) => handleSubmit(e, "incoming")} // ✅ Ensure correct type
        />
        <TextSection 
          messageData={messageData} 
          setMessageData={setMessageData} 
          handleSubmit={(e) => handleSubmit(e, "incoming")} // ✅ Ensure correct type
        />
      </div>
    </div>
  );
};


const OutgoingService = ({ callingData, setCallingData, messageData, setMessageData, useSameForText, setUseSameForText, handleSubmit }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center underline">OUTGOING SERVICE</h2>
      <div className="flex justify-center space-x-14 mt-6">
        <CallingSection 
          callingData={callingData} 
          setCallingData={setCallingData} 
          useSameForText={useSameForText} 
          setUseSameForText={setUseSameForText} 
          setMessageData={setMessageData}
          handleSubmit={(e) => handleSubmit(e, "outgoing")} // ✅ Ensure correct type
        />
        <TextSection 
          messageData={messageData} 
          setMessageData={setMessageData} 
          handleSubmit={(e) => handleSubmit(e, "outgoing")} // ✅ Ensure correct type
        />
      </div>
    </div>
  );
};








const CallingSection = ({ callingData, setCallingData, useSameForText, setUseSameForText,setMessageData, handleSubmit }) => {
  const handleToggle = (field) => {
    const newState = !useSameForText[field];
  
    setUseSameForText({
      ...useSameForText,
      [field]: newState,
    });
  
    if (newState) {
      // Copy text and file from callingData to messageData
      setMessageData((prevData) => ({
        ...prevData,
        [field]: callingData[field],  // Copy text
        [`${field}File`]: callingData[`${field}File`] // Copy file
      }));
    } else {
      // Reset messageData if unchecked
      setMessageData((prevData) => ({
        ...prevData,
        [field]: "",
        [`${field}File`]: null
      }));
    }
  };
  

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">CALLING</h3>

      {/* Data Entry Row */}
      <div className="flex items-center justify-between">
        <FileInput 
          label="Data Entry" 
          acceptOnly="pdf,csv,doc,docx"
          file={callingData.dataEntryFile}
          setFile={(file) => setCallingData({ ...callingData, dataEntryFile: file })}
        />
        <Toggle 
          label="Same for Text" 
          isOn={useSameForText.dataEntry} 
          onToggle={() => handleToggle("dataEntry")}
        />
      </div>

      {/* Contact Entry Row */}
      <div className="flex items-center justify-between">
        <FileInput 
          label="Contact Entry" 
          acceptOnly="csv,doc,docx"
          file={callingData.contactEntryFile}
          setFile={(file) => setCallingData({ ...callingData, contactEntryFile: file })}
        />
        <Toggle 
          label="Same for Text" 
          isOn={useSameForText.contactEntry} 
          onToggle={() => handleToggle("contactEntry")}
        />
      </div>

      {/* Authority Contact Row */}
      <div className="flex items-center justify-between">
        <div>
          <ManualInput 
            label="Authority Contact"
            value={callingData.authorityContact}
            onChange={(e) => setCallingData({ ...callingData, authorityContact: e.target.value })}
          />
          <ManualInput 
            value={callingData.authorityContact}
            onChange={(e) => setCallingData({ ...callingData, authorityContact: e.target.value })}
          />
          <FileInput 
            label="Authority Contact File" 
            acceptOnly="csv,doc,docx"
            file={callingData.authorityContactFile}
            setFile={(file) => setCallingData({ ...callingData, authorityContactFile: file })}
          />
        </div>
        <Toggle 
          label="Same for Text" 
          isOn={useSameForText.authorityContact} 
          onToggle={() => handleToggle("authorityContact")}
        />
      </div>
      
      <div>
      <h3 className="text-xl font-semibold mb-4">CALLING</h3>

      <SubmitButton handleSubmit={handleSubmit} />
    </div>

    </div>
  );
};




const TextSection = ({ messageData, setMessageData, handleSubmit }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">MESSAGE</h3>

      {/* Data Entry */}
      <FileInput 
        label="Data Entry" 
        acceptOnly="pdf"
        file={messageData.dataEntryFile}
        setFile={(file) => setMessageData({ ...messageData, dataEntryFile: file })}
      />

      {/* Contact Entry */}
      <FileInput 
        label="Contact Entry" 
        acceptOnly="csv,doc,docx"
        file={messageData.contactEntryFile}
        setFile={(file) => setMessageData({ ...messageData, contactEntryFile: file })}
      />

      {/* Authority Contact */}
      <ManualInput 
        label="Authority Contact"
        value={messageData.authorityContact}
        onChange={(e) => setMessageData({ ...messageData, authorityContact: e.target.value })}
      />
      <ManualInput 
        
        value={messageData.authorityContact}
        onChange={(e) => setMessageData({ ...messageData, authorityContact: e.target.value })}
      />
      <FileInput 
        label="Authority Contact File" 
        acceptOnly="csv,doc,docx"
        file={messageData.authorityContactFile}
        setFile={(file) => setMessageData({ ...messageData, authorityContactFile: file })}
      />

<div>
      <h3 className="text-xl font-semibold mb-4">MESSAGE</h3>

      <SubmitButton handleSubmit={handleSubmit} />
    </div>

    </div>
  );
};



const FileInput = ({ label, acceptOnly, file, setFile }) => {
  const [fileName, setFileName] = useState(file ? file.name : "No file chosen");

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      const fileExtension = newFile.name.split(".").pop().toLowerCase();
      const allowedExtensions = acceptOnly.split(",");

      if (!allowedExtensions.includes(fileExtension)) {
        alert(`Invalid file type! Only ${acceptOnly.toUpperCase()} allowed.`);
        return;
      }

      setFile(newFile);  // Update parent state
      setFileName(newFile.name);
    }
  };

  return (
    <div className="mb-4 max-w-[250px]">
      <label className="block mb-2 text-white">{label}</label>
      <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-full">
        <label className="bg-[#9C0480] text-white px-2 py-2 rounded-lg cursor-pointer min-w-[120px] text-center">
          Choose File
          <input type="file" className="hidden" onChange={handleFileChange} />
        </label>
        <span className="ml-2 text-gray-500 flex-1 truncate">
          {fileName}
        </span>
      </div>
    </div>
  );
};



const ManualInput = ({ label }) => {
  return (
    <div className="mb-4 max-w-[250px]">
      <label className="block mb-2 text-white">{label}</label>
      <input
        type="text"
        className="w-full  max-w-lg px-2 py-3 rounded-lg bg-white text-black border border-gray-600 placeholder-gray-400"
        placeholder="Enter the Contact manually"
      />
    </div>
  );
};
// const ManualInput = ({ label, value, onChange }) => {
//   return (
//     <div className="mb-4 max-w-[250px]">
//       <label className="block mb-2 text-white">{label}</label>
//       <input
//         type="text"
//         className="w-full px-2 py-3 rounded-lg bg-white text-black border border-gray-600 placeholder-gray-400"
//         placeholder="Enter the Contact manually"
//         value={value}  // ✅ Bind to state
//         onChange={onChange}  // ✅ Update state on change
//       />
//     </div>
//   );
// };


const Toggle = ({ label, isOn, onToggle }) => {
  return (
    <div className="flex flex-col mt-2 items-center">
      {/* Toggle Button */}
      <button
        onClick={onToggle} // Use the passed `onToggle` function
        className={`w-6 h-6 rounded-md cursor-pointer transition-colors duration-300 ${
          isOn ? "bg-green-500" : "bg-gray-400"
        }`}
      ></button>

      {/* Label below the button */}
      <span className="text-gray-300 text-[12px] whitespace-nowrap ml-1">
        {label}
      </span>
    </div>
  );
};


const SubmitButton = ({ handleSubmit }) => {
  return (
    <button
      onClick={handleSubmit}
      className="bg-[#9C0480] px-6 py-3 cursor-pointer w-[150px] max-w-md text-white rounded-lg"
    >
      Submit
    </button>
  );
};


export default FileUpload;
