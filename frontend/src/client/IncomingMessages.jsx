// import React, { useState, useEffect } from "react";
// import ClientNavbar from "./components/ClientNavbar";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";

// const columnOptions = [
//   { key: "contactNo", label: "Contact No" },
//   { key: "date", label: "Date (d-y-m)" },
//   { key: "timeDuration", label: "Time Duration (mins)" },
//   { key: "conversationRaw", label: "Conversation (RAW)" },
//   { key: "conversationSummary", label: "Conversation Summary" },
//   { key: "keyPoints", label: "Conversation Key Points" },
//   { key: "conversationType", label: "Conversation Type (AI Analyzed)" },
//   { key: "feedback", label: "Contact's Feedback on the Conversation" },
//   { key: "transferToAuthority", label: "Transfer to Authority" },
// ];

// const IncomingMessages = () => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [callData, setCallData] = useState([]);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const [startDate, setStartDate] = useState(null); // Start date filter
//   const [endDate, setEndDate] = useState(null); // End date filter

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get("http://localhost:5000/api/incoming-messages");
//       setCallData(response.data);
//     };
//     fetchData();
//   }, []);
//   // Modify Dates Randomly (For Testing)
//   const modifyDates = () => {
//     setData((prevData) =>
//       prevData.map((row) => ({
//         ...row,
//         date: new Date(2024, 1, Math.floor(Math.random() * 28) + 1),
//       }))
//     );
//   };

//   const handleCallHistory = () => {
//     navigate("/incoming-calls");
//   };

//   const handleSort = (columnKey) => {
//     setSortConfig((prev) => ({
//       key: columnKey,
//       direction:
//         prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
//     }));
//     setDropdownOpen(false); // Close dropdown after selection
//   };

//   const sortedData = [...callData].sort((a, b) => {
//     if (!sortConfig.key) return 0;

//     let valA = a[sortConfig.key];
//     let valB = b[sortConfig.key];

//     if (!isNaN(valA) && !isNaN(valB)) {
//       valA = Number(valA);
//       valB = Number(valB);
//     }

//     return sortConfig.direction === "asc"
//       ? valA < valB
//         ? -1
//         : 1
//       : valA > valB
//       ? -1
//       : 1;
//   });

//   return (
//     <>
//       <ClientNavbar />
//       <div className="bg-gray-900 text-white min-h-screen p-6">
//         {/* Navbar */}

// <h2 className="text-2xl font-bold mt-6">INCOMING</h2>

// {/* Filters */}
// <div className="flex items-center justify-between mt-4">
//   <div className="space-x-4">
//     <button
//     onClick={handleCallHistory}
//     className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer">
//       Call History
//     </button>
//     <button
//       className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-md cursor-pointer"
//     >
//       Message History
//     </button>
//   </div>

//           {/* Sort Button with Dropdown */}
//           {/* <div className="relative">
//           <button
//             className="bg-gray-800 text-white px-4 py-2 w-[100px] rounded-md cursor-pointer"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             Sort <FaSort className="ml-2" />
//           </button>

//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-lg rounded-md z-10">
//               {columnOptions.map((col) => (
//                 <button
//                   key={col.key}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-700"
//                   onClick={() => handleSort(col.key)}
//                 >
//                   {col.label}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div> */}

//           {/* <div>
//             <select
//               onChange={(e) => handleSort(e.target.value)}
//               className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer"
//             >
//               <option value="">Sort</option>
//               <option value="contact">Last 7 days</option>
//               <option value="contact">Last 30 days</option>
//               <option value="date">Date</option>
//               <option value="duration">Time Duration</option>
//               <option value="service">Service Type</option>
//               <option value="sessionCost">Session Cost</option>
//               <option value="serverCost">Server Cost</option>
//               <option value="charge">Total Charge</option>
//               <option value="reference">Reference Number</option>
//               {columnOptions.map((col) => (
//                 <option
//                   key={col.key}
//                   className="block w-full text-left px-4 py-2 hover:bg-gray-700"
//                   onClick={() => handleSort(col.key)}
//                 >
//                   {col.label}
//                 </option>
//               ))}
//             </select>
//           </div> */}
//         </div>

//         <div className="flex justify-between items-center mb-4 mt-4">
//                   {/* Date Range Filters */}
//                   <div className="flex gap-4">
//                     <div>
//                       <label className="block text-gray-400 text-sm">Start Date</label>
//                       <DatePicker
//                         selected={startDate}
//                         onChange={(date) => setStartDate(date)}
//                         selectsStart
//                         startDate={startDate}
//                         endDate={endDate}
//                         className="bg-gray-800 text-white px-3 py-2 rounded-md"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-gray-400 text-sm">End Date</label>
//                       <DatePicker
//                         selected={endDate}
//                         onChange={(date) => setEndDate(date)}
//                         selectsEnd
//                         startDate={startDate}
//                         endDate={endDate}
//                         minDate={startDate}
//                         className="bg-gray-800 text-white px-3 py-2 rounded-md"
//                       />
//                     </div>
//                     <button
//                       className="bg-blue-500 px-4 py-2 rounded-md text-white"
//                       onClick={modifyDates}
//                     >
//                       Modify Dates (Test)
//                     </button>
//                   </div>

//                   {/* Sorting Dropdown */}
//                   <div>
//                     <select
//                       onChange={(e) => handleSort(e.target.value)}
//                       className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer"
//                     >
//                       <option value="">Sort</option>
//                       {/* <option value="contact">Last 7 days</option> */}
//                       {/* <option value="contact">Last 30 days</option> */}
//                       {/* <option value="date">Date</option> */}
//                       <option value="duration">Time Duration</option>
//                       {/* <option value="service">Service Type</option> */}
//                       {/* <option value="sessionCost">Session Cost</option> */}
//                       {/* <option value="serverCost">Server Cost</option> */}
//                       {/* <option value="charge">Total Charge</option> */}
//                       {/* <option value="reference">Reference Number</option> */}
//                     </select>
//                   </div>
//                 </div>

//         <h3 className="text-xl font-bold mt-6">Message History</h3>

//         {/* Table Container */}
//         <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto overflow-y-auto admin-scroll">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-700">
//                 {columnOptions.map((col, index) => (
//                   <th
//                     key={index}
//                     className="px-4 py-3 border border-gray-600 min-w-[150px]"
//                   >
//                     {col.label}
//                     {sortConfig.key === col.key && (
//                       <span className="ml-2">
//                         {sortConfig.direction === "asc" ? "▲" : "▼"}
//                       </span>
//                     )}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {sortedData.map((row, index) => (
//                 <tr key={index} className="border border-gray-700">
//                   <td className="px-4 py-2 min-w-[150px] border border-gray-600">
//                     {row.contactNo}
//                   </td>
//                   <td className="px-4 py-2 min-w-[150px] border border-gray-600">
//                     {/* {row.date} */}
//                     {`${String(new Date(row.date).getDate()).padStart(2, '0')}-${String(new Date(row.date).getMonth() + 1).padStart(2, '0')}-${new Date(row.date).getFullYear()}`}
//                   </td>
//                   <td className="px-4 py-2 min-w-[150px] text-center border border-gray-600">
//                     {row.timeDuration}
//                   </td>
//                   <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">
//                     {row.conversationRaw}
//                   </td>
//                   <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">
//                     {row.conversationSummary}
//                   </td>
//                   <td className="px-4 py-2 min-w-[150px] border border-gray-600">
//                     {row.conversationKeyPoints}
//                   </td>
//                   <td className="px-4 py-2 min-w-[150px] border border-gray-600">
//                     {row.conversationType}
//                   </td>
//                   <td className="px-4 py-2 min-w-[150px] border border-gray-600">
//                     {row.contactFeedback}
//                   </td>
//                   <td className="px-4 py-2 min-w-[150px] border border-gray-600">
//                     {row.transferToAuthority}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default IncomingMessages;

// import React, { useState, useEffect } from "react";
// import ClientNavbar from "./components/ClientNavbar";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import axios from "axios";

// const columnOptions = [
//   { key: "contactNo", label: "Contact No" },
//   { key: "date", label: "Date (d-m-y)" },
//   { key: "timeDuration", label: "Time Duration (mins)" },
//   { key: "conversationRaw", label: "Conversation (RAW)" },
//   { key: "conversationSummary", label: "Conversation Summary" },
//   { key: "keyPoints", label: "Conversation Key Points" },
//   { key: "conversationType", label: "Conversation Type (AI Analyzed)" },
//   { key: "feedback", label: "Contact's Feedback" },
//   { key: "transferToAuthority", label: "Transfer to Authority" },
// ];

// const IncomingMessages = () => {
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [callData, setCallData] = useState([]);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/incoming-messages");
//         setCallData(response.data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCallHistory = () => navigate("/incoming-calls");

//   const handleSort = (columnKey) => {
//     setSortConfig((prev) => ({
//       key: columnKey,
//       direction: prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
//     }));
//   };

//   const sortedData = [...callData].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     let valA = a[sortConfig.key], valB = b[sortConfig.key];
//     if (!isNaN(valA) && !isNaN(valB)) {
//       valA = Number(valA);
//       valB = Number(valB);
//     }
//     return sortConfig.direction === "asc" ? (valA < valB ? -1 : 1) : (valA > valB ? -1 : 1);
//   });

//   return (
//     <>
//       <ClientNavbar />
//       <div className="bg-gray-900 text-white min-h-screen p-6">
//         <h2 className="text-2xl font-bold mt-6">INCOMING</h2>
//         <div className="flex items-center justify-between mt-4">
//           <button onClick={handleCallHistory} className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md">Call History</button>
//           <button className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-md">Message History</button>
//         </div>
//         <div className="flex justify-between items-center mb-4 mt-4">
//           <div className="flex gap-4">
//             <div>
//               <label className="block text-gray-400 text-sm">Start Date</label>
//               <DatePicker selected={startDate} onChange={setStartDate} className="bg-gray-800 text-white px-3 py-2 rounded-md" />
//             </div>
//             <div>
//               <label className="block text-gray-400 text-sm">End Date</label>
//               <DatePicker selected={endDate} onChange={setEndDate} minDate={startDate} className="bg-gray-800 text-white px-3 py-2 rounded-md" />
//             </div>
//           </div>
//           <select onChange={(e) => handleSort(e.target.value)} className="bg-gray-800 text-white px-4 py-2 rounded-md">
//             <option value="">Sort</option>
//             <option value="timeDuration">Time Duration</option>
//           </select>
//         </div>
//         <h3 className="text-xl font-bold mt-6">Message History</h3>
//         <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-gray-700">
//                 {columnOptions.map((col) => (
//                   <th key={col.key} className="px-4 py-3 border border-gray-600 min-w-[150px]">
//                     {col.label} {sortConfig.key === col.key && (sortConfig.direction === "asc" ? "▲" : "▼")}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {sortedData.map((row, index) => (
//                 <tr key={index} className="border border-gray-700">
//                   {columnOptions.map((col) => (
//                     <td key={col.key} className="px-4 py-2 min-w-[150px] border border-gray-600">
//                       {col.key === "date" ? new Date(row[col.key]).toLocaleDateString() : row[col.key]}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default IncomingMessages;


import React, { useState, useEffect } from "react";
import ClientNavbar from "./components/ClientNavbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";

const columnOptions = [
  { key: "contactNo", label: "Contact No" },
  { key: "date", label: "Date (d-m-y)" },
  { key: "timeDuration", label: "Time Duration (mins)" },
  { key: "conversationRaw", label: "Conversation (RAW)" },
  { key: "conversationSummary", label: "Conversation Summary" },
  { key: "keyPoints", label: "Key Points" },
  { key: "conversationType", label: "Conversation Type (AI Analyzed)" },
  { key: "feedback", label: "Feedback" },
  { key: "transferToAuthority", label: "Transfer to Authority" },
];

const IncomingMessages = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [callData, setCallData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleCallHistory = () => {
    navigate("/incoming-calls");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/incoming-messages"
        );
        setCallData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError("Failed to fetch message data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = callData.filter((call) => {
        const callDate = new Date(call.date);
        return callDate >= startDate && callDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(callData);
    }
  }, [startDate, endDate, callData]);

  const handleSort = (columnKey) => {
    setSortConfig((prev) => ({
      key: columnKey,
      direction:
        prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const sortedData = [...filteredData].sort((a, b) => {
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
    <>
      <ClientNavbar />
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <h2 className="text-2xl font-bold mt-6">INCOMING</h2>

        {/* Filters */}
        <div className="flex items-center justify-between mt-4">
          <div className="space-x-4">
            <button
              onClick={handleCallHistory}
              className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer"
            >
              Call History
            </button>
            <button className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-md cursor-pointer">
              Message History
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          {/* Date Filters */}
          <div className="flex gap-4 mt-4">
            <div>
              <label className="block text-gray-400 text-sm">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="bg-gray-800 text-white px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm">End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="bg-gray-800 text-white px-3 py-2 rounded-md"
              />
            </div>
          </div>

          {/*Sort Filter */}
          <div>
            <label className="block text-gray-400 text-sm">Sort By</label>
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md"
            >
              <option value="">Select</option>
              <option value="timeDuration">Time Duration</option>
            </select>
          </div>
        </div>
        {/* Table */}
        <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto admin-scroll">
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : sortedData.length === 0 ? (
            <p className="text-center text-gray-400">No data available.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-700">
                  {columnOptions.map((col, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 border border-gray-600 min-w-[150px] cursor-pointer"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedData.map((row, index) => (
                  <tr
                    key={index}
                    className="border border-gray-700 hover:bg-gray-750 transition"
                  >
                    <td className="px-4 py-2 border border-gray-600">
                      {row.contactNo}
                    </td>
                    <td className="px-4 py-2 border border-gray-600">
                      {new Date(row.date).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-center">
                      {row.timeDuration}
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-blue-400 cursor-pointer">
                      {row.conversationRaw}
                    </td>
                    <td className="px-4 py-2 border border-gray-600 text-blue-400 cursor-pointer">
                      {row.conversationSummary}
                    </td>
                    <td className="px-4 py-2 border border-gray-600">
                      {row.conversationKeyPoints}
                    </td>
                    <td className="px-4 py-2 border border-gray-600">
                      {row.conversationType}
                    </td>
                    <td className="px-4 py-2 border border-gray-600">
                      {row.contactFeedback}
                    </td>
                    <td className="px-4 py-2 border border-gray-600">
                      {row.transferToAuthority}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default IncomingMessages;
