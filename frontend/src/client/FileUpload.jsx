import React, { useState } from "react";
import ClientNavbar from "./components/ClientNavbar"
const FileUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);

  return (
    <div className="relative">
      <ClientNavbar />

      {/* Main Content with Blur Effect */}
      <div className={`min-h-screen bg-gray-900 text-white p-10 transition duration-300 ${isModalOpen || isDoneModalOpen ? "blur-md" : ""}`}>
        <h1 className="text-4xl font-bold text-center mb-10">FILE UPLOAD</h1>

        {/* Flex layout for sections */}
        <div className="flex justify-center items-start gap-10">
          <IncomingService />
          <div className="border-l-2 border-gray-400 h-auto self-stretch"></div>
          <OutgoingService />
        </div>

        <div className="mt-10 flex justify-center">
          <button
            className="bg-[#9C0480] px-6 py-3 w-[650px] text-white rounded-lg"
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
        <h2 className="text-3xl font-bold mb-6">Confirm?</h2> {/* Increased text size & margin */}
        <div className="flex justify-center gap-6"> {/* Increased button spacing */}
          <button
            className="bg-gray-400 px-8 py-3 rounded-lg text-black font-semibold text-xl"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="bg-green-500 px-8 py-3 rounded-lg text-black font-semibold text-xl"
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
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md"> {/* Only blur the background */}
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
            className="bg-gray-400 px-6 py-2 rounded-lg text-black font-semibold text-lg"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="bg-[#9C0480] px-6 py-2 rounded-lg text-white font-semibold text-lg"
            onClick={onViewDetails}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};







const IncomingService = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center underline">INCOMING SERVICE</h2>
      <div className="flex justify-center space-x-10 mt-6">
        <CallingSection />
        <TextSection />
      </div>
    </div>
  );
};

const OutgoingService = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center underline">OUTGOING SERVICE</h2>
      <div className="flex justify-center space-x-10 mt-6">
        <CallingSection />
        <TextSection />
      </div>
    </div>
  );
};

const CallingSection = () => {
  return (
    <div className="w-1/2 p-6">
      <h3 className="text-xl font-semibold mb-4">CALLING</h3>

      {/* Data Entry Row */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <FileInput label="Data Entry" />
        </div>
        <Toggle label="Same for Text" />
      </div>

      {/* Contact Entry */}
      <FileInput label="Contact Entry" />

      {/* Authority Contact Row */}
      <div className="flex items-center justify-between">
        <div className="flex-1 p-1 rounded-lg shadow-md">
          <ManualInput label="Authority Contact" />
          <ManualInput />
          <FileInput />
        </div>
        <Toggle label="Same for Text" />
      </div>

      {/* Submit Button */}
      <SubmitButton />
    </div>
  );
};





const TextSection = () => {
  return (
    <div className="w-1/2 p-6">
      <h3 className="text-xl font-semibold mb-4">TEXT</h3>

      {/* Data Entry */}
      <FileInput label="Data Entry" />

      {/* Contact Entry */}
      <FileInput label="Contact Entry" />

      {/* Authority Contact */}
      <ManualInput label="Authority Contact" />
      <ManualInput />
      <FileInput />

      {/* Submit Button Moved Lower */}
      <div className="mt-6 flex justify-center">
        <SubmitButton />
      </div>
    </div>
  );
};


const FileInput = ({ label }) => {
  return (
    <div className="mb-4 w-full max-w-md">
      <label className="block mb-2 text-white">{label}</label>
      <div className="flex items-center bg-white p-2 rounded-lg shadow-md w-full">
        <label className="bg-[#9C0480] text-white px-4 py-2 rounded-lg cursor-pointer min-w-[120px] text-center">
          Choose File
          <input type="file" className="hidden" />
        </label>
        <span className="ml-2 text-gray-500 flex-1 truncate">No file Chosen</span>
      </div>
    </div>
  );
};



const ManualInput = ({ label }) => {
  return (
    <div className="mb-4 w-full max-w-md">
      <label className="block mb-2 text-white">{label}</label>
      <input
        type="text"
        className="w-full p-2 rounded-lg bg-white text-black border border-gray-600 placeholder-gray-400"
        placeholder="Enter the Contact manually"
      />
    </div>
  );
};



const Toggle = ({ label }) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex flex-col items-center">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOn(!isOn)}
        className={`w-8 h-6 rounded-md transition-colors duration-300 ${
          isOn ? "bg-green-500" : "bg-gray-400"
        }`}
      ></button>

      {/* Label below the button (on a single line) */}
      <span className="text-gray-300 text-sm mt-0 whitespace-nowrap ml-1 ">
        {label}
      </span>
    </div>
  );
};










const SubmitButton = () => {
  return (
    <button className="bg-[#9C0480] px-6 py-3 w-[150px] max-w-md text-white rounded-lg">
      Submit
    </button>
  );
};

export default FileUpload;
