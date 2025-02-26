// import React, { useState } from "react";
// import { FaSort, FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import ClientNavbar from "./components/ClientNavbar";
// import { useNavigate } from "react-router-dom";

// const callData = Array(10).fill({
//   contactNo: "980000000000",
//   date: "01-01-2000",
//   timeDuration: "10:10:10",
//   conversationRaw: "View Full Chat",
//   conversationSummary: "View Summary",
//   keyPoints: "Key points",
//   conversationType: "Unsatisfied",
//   feedback: "Angry",
//   transferToAuthority: "Free",
// });

// const IncomingCalls = () => {
//   const [sortOrder, setSortOrder] = useState("asc");
//   const navigate=useNavigate();
//   const handleMessageHistory=()=>{
//     navigate('/incoming-messages');
// }
 

//   return (
//     <div className="bg-gray-900 text-white min-h-screen p-6">
//     {/* Navbar */}
//  <ClientNavbar/>

//     <h2 className="text-2xl font-bold mt-6">INCOMING</h2>

//     {/* Filters */}
//     <div className="flex items-center justify-between mt-4">
//       <div className="space-x-4">
//         <button className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-md cursor-pointer">Call History</button>
//         <button
//         onClick={handleMessageHistory}
//         className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer">Message History</button>
//       </div>
//       <select className="bg-gray-700 px-4 py-2 rounded-md">
//         <option>Last 7 days</option>
//         <option>Last 30 days</option>
//       </select>
//     </div>

//     <h3 className="text-xl font-bold mt-6">Call History</h3>

//     {/* Table Container */}
//     <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto overflow-y-auto admin-scroll">
// <table className="w-full text-left border-collapse">
//   <thead>
//     <tr className="bg-gray-700">
//       {[
//         "Contact No",
//         "Date (d-y-m)",
//         "Time Duration",
//         "Conversation (RAW)",
//         "Conversation Summary",
//         "Conversation Key Points",
//         "Conversation Type(AI Analyzed)",
//         "Contact’s Feedback on the Conversation",
//         "Transfer to Authority",
//       ].map((header, index) => (
//         <th key={index} className="px-4 py-3 border border-gray-600 min-w-[150px]">
//           {header}
//           {index === 0 && (
//             <button
//               className="ml-2"
//               onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
//             >
//               <FaSort className="inline" />
//             </button>
//           )}
//         </th>
//       ))}
//     </tr>
//   </thead>
//   <tbody>
//     {callData.map((row, index) => (
//       <tr key={index} className="border border-gray-700">
//         <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.contactNo}</td>
//         <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.date}</td>
//         <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.timeDuration}</td>
//         <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">
//           {row.conversationRaw}
//         </td>
//         <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">
//           {row.conversationSummary}
//         </td>
//         <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.keyPoints}</td>
//         <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.conversationType}</td>
//         <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.feedback}</td>
//         <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.transferToAuthority}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>
// </div>

//   </div>
//   );
// };

// export default IncomingCalls;






import React, { useState } from "react";
import { FaSort } from "react-icons/fa";
import ClientNavbar from "./components/ClientNavbar";
import { useNavigate } from "react-router-dom";

const initialCallData = Array(10).fill({
  contactNo: "980000000000",
  date: "01-01-2000",
  timeDuration: "10:10:10",
  conversationRaw: "View Full Chat",
  conversationSummary: "View Summary",
  keyPoints: "Key points",
  conversationType: "Unsatisfied",
  feedback: "Angry",
  transferToAuthority: "Free",
});

const columnOptions = [
  { key: "contactNo", label: "Contact No" },
  { key: "date", label: "Date (d-y-m)" },
  { key: "timeDuration", label: "Time Duration" },
  { key: "conversationRaw", label: "Conversation (RAW)" },
  { key: "conversationSummary", label: "Conversation Summary" },
  { key: "keyPoints", label: "Conversation Key Points" },
  { key: "conversationType", label: "Conversation Type (AI Analyzed)" },
  { key: "feedback", label: "Contact’s Feedback on the Conversation" },
  { key: "transferToAuthority", label: "Transfer to Authority" },
];

const IncomingCalls = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [callData, setCallData] = useState(initialCallData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleMessageHistory = () => {
    navigate("/incoming-messages");
  };

  const handleSort = (columnKey) => {
    setSortConfig((prev) => ({
      key: columnKey,
      direction: prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
    }));
    setDropdownOpen(false); // Close dropdown after selection
  };

  const sortedData = [...callData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (!isNaN(valA) && !isNaN(valB)) {
      valA = Number(valA);
      valB = Number(valB);
    }

    return sortConfig.direction === "asc"
      ? valA < valB
        ? -1
        : 1
      : valA > valB
      ? -1
      : 1;
  });

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Navbar */}
      <ClientNavbar />

      <h2 className="text-2xl font-bold mt-6">INCOMING</h2>

      {/* Filters */}
      <div className="flex items-center justify-between mt-4">
        <div className="space-x-4">
          <button className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-md cursor-pointer">
            Call History
          </button>
          <button
            onClick={handleMessageHistory}
            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer"
          >
            Message History
          </button>
        </div>
        
        {/* Sort Button with Dropdown */}
        <div className="relative">
          <button
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md cursor-pointer flex items-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Sort <FaSort className="ml-2" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md z-10">
              {columnOptions.map((col) => (
                <button
                  key={col.key}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  onClick={() => handleSort(col.key)}
                >
                  {col.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold mt-6">Call History</h3>

      {/* Table Container */}
      <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto overflow-y-auto admin-scroll">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-700">
              {columnOptions.map((col, index) => (
                <th key={index} className="px-4 py-3 border border-gray-600 min-w-[150px]">
                  {col.label}
                  {sortConfig.key === col.key && (
                    <span className="ml-2">
                      {sortConfig.direction === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index} className="border border-gray-700">
                <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.contactNo}</td>
                <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.date}</td>
                <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.timeDuration}</td>
                <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">
                  {row.conversationRaw}
                </td>
                <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">
                  {row.conversationSummary}
                </td>
                <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.keyPoints}</td>
                <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.conversationType}</td>
                <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.feedback}</td>
                <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.transferToAuthority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomingCalls;
