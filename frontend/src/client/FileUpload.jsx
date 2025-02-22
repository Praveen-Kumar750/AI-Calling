import { useState } from "react";
import ClientNavbar from "./components/ClientNavbar";

export default function FileUpload() {
  const [sameForTextIncoming, setSameForTextIncoming] = useState(false);
  const [sameForTextOutgoing, setSameForTextOutgoing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowDoneModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ClientNavbar />

      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center mb-6">FILE UPLOAD</h1>

        <div className="grid grid-cols-2 gap-10">
          {["INCOMING SERVICE", "OUTGOING SERVICE"].map((serviceType, serviceIndex) => (
            <div key={serviceIndex} className={serviceIndex === 0 ? "border-r border-gray-700 pr-10" : "pl-10"}>
              <h2 className="text-xl font-semibold text-center underline mb-4">{serviceType}</h2>
              <div className="p-6 border border-gray-700 rounded-lg bg-gray-800">
                <h3 className="text-lg font-semibold mb-2">Calling & Text</h3>

                <div className="grid grid-cols-2 gap-4">
                  {["CALLING", "TEXT"].map((section, index) => (
                    <div key={index} className="p-4 bg-gray-700 rounded-lg">
                      <h3 className="text-lg font-semibold mb-2">{section}</h3>

                      <label>Data Entry</label>
                      <div className="flex items-center space-x-2 mb-2">
  <input
    type="file"
    className="w-full p-2 rounded-lg border border-white-600 text-white bg-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-pink-600 hover:file:bg-white-100"
  />
  {index === 0 && (
    <button
      className={`w-5 h-5 rounded-full flex items-center justify-center ${
        serviceIndex === 0
          ? (sameForTextIncoming ? "bg-green-500" : "bg-gray-500")
          : (sameForTextOutgoing ? "bg-green-500" : "bg-gray-500")
      }`}
      onClick={() =>
        serviceIndex === 0
          ? setSameForTextIncoming(!sameForTextIncoming)
          : setSameForTextOutgoing(!sameForTextOutgoing)
      }
    >
      {serviceIndex === 0
        ? sameForTextIncoming && <span className="text-white text-xs">✓</span>
        : sameForTextOutgoing && <span className="text-white text-xs">✓</span>}
    </button>
  )}
</div>

                      <label>Contact Entry</label>
                      <input type="file" className="w-full p-2 rounded-lg border border-purple-600 text-white bg-gray-900 mb-2" />

                      <label>Authority Contact</label>
                      <input type="text" className="w-full p-1 rounded-lg border border-gray-500 bg-white text-black mb-2" placeholder="Enter the Contact manually" />
                      <input type="text" className="w-full p-1 rounded-lg border border-gray-500 bg-white text-black mb-2" placeholder="Enter Additional Contact" />
                      <input type="file" className="w-full p-2 rounded-lg border border-purple-600 text-white bg-gray-900 mb-2" />
                    </div>
                  ))}
                </div>
                <button className="bg-purple-600 w-full py-2 rounded-lg mt-4">Submit</button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button className="bg-pink-600 px-6 py-3 text-lg rounded" onClick={() => setShowConfirmModal(true)}>
            Review & Confirm
          </button>
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold">Confirm?</h2>
            <div className="flex justify-center space-x-4 mt-4">
              <button className="bg-gray-500 px-4 py-2 rounded" onClick={() => setShowConfirmModal(false)}>
                No
              </button>
              <button className="bg-green-500 px-4 py-2 rounded" onClick={handleConfirm}>
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showDoneModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold">Done</h2>
            <div className="flex justify-center mt-4">
              <span className="text-purple-500 text-4xl">✔</span>
              <div className="flex space-x-4 mt-4">
                <button className="bg-gray-500 px-4 py-2 rounded" onClick={() => setShowDoneModal(false)}>
                  Close
                </button>
                <button className="bg-purple-600 px-4 py-2 rounded">View Details</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
