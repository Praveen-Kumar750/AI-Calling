// import { useState } from "react";
// import ClientNavbar from "./components/ClientNavbar";

// const BillingTableCalls = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 7;
//   const totalRows = 21; // Mock total rows for pagination

//   const data = Array.from({ length: totalRows }, (_, i) => ({
//     contact: "User1@example.com",
//     date: "John",
//     duration: "Doe",
//     service: "123-456-7890",
//     sessionCost: "Student",
//     serverCost: "10th Grade",
//     charge: "19",
//     reference: "male",
//   }));
// const paginatedData = data.slice(
//     (currentPage - 1) * rowsPerPage,
//     currentPage * rowsPerPage
//   );

//   return (
//     <div className="bg-gray-900 text-white h-screen p-6">
//         <ClientNavbar></ClientNavbar>
//       <h2 className="text-2xl font-bold mt-6">BILLING</h2>

//       <div className="flex justify-between">
//         {/* Tabs */}
//       <div className="flex gap-4 mb-4">
//         <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
//           Incoming
//         </button>
//         <button className="bg-white text-black px-4 py-2 rounded-md">
//           Outgoing
//         </button>
//       </div>

//       {/* Filters & Sort */}
//       <div className="flex justify-between items-center mb-4">
//         <select className="bg-gray-800 text-white px-3 py-2 rounded-md">
//           <option>Last 7 days</option>
//           <option>Last 30 days</option>
//           <option>All Time</option>
//         </select>
//       </div>
//       </div>

//       <div className="flex justify-between">
//       <h3 className="text-xl font-semibold mb-2">Call History</h3>
//       <select>
//         <option>Sort</option>
//       </select>
//       </div>
//       {/* Table Container (Scrollable) */}
//       <div className="overflow-x-auto overflow-y-auto border border-blue-500 rounded-md">
//         <table className="w-full text-left border-collapse">
//           <thead className="bg-gray-800">
//             <tr>
//               {[
//                 "Contact No",
//                 "Date (d-y-m)",
//                 "Time Duration",
//                 "Service Type (Call/Text)",
//                 "Session Cost Per Unit Time",
//                 "Server Cost Per Unit Time",
//                 "Total Charge",
//                 "Reference Number (UID)",
//               ].map((header, i) => (
//                 <th key={i} className="px-4 py-2 border border-gray-700">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((row, index) => (
//               <tr key={index} className="bg-gray-900">
//                 <td className="px-4 py-2 border border-gray-700 ">
//                   {row.contact}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-700 ">{row.date}</td>
//                 <td className="px-4 py-2 border border-gray-700 ">
//                   {row.duration}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-700 ">
//                   {row.service}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-700 ">
//                   {row.sessionCost}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-700 ">
//                   {row.serverCost}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-700 ">
//                   {row.charge}
//                 </td>
//                 <td className="px-4 py-2 border border-gray-700 ">
//                   {row.reference}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-end mt-4 gap-2">
//         <button
//           className="bg-purple-600 text-white px-3 py-1 rounded-md"
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//         >
//           ◀
//         </button>
//         {[1, 2, 3].map((page) => (
//           <button
//             key={page}
//             onClick={() => setCurrentPage(page)}
//             className={`px-3 py-1 rounded-md ${
//               currentPage === page ? "bg-purple-600 text-white" : "bg-gray-700"
//             }`}
//           >
//             {page}
//           </button>
//         ))}
//         <button
//           className="bg-purple-600 text-white px-3 py-1 rounded-md"
//           onClick={() =>
//             setCurrentPage((prev) => Math.min(prev + 1, totalRows / rowsPerPage))
//           }
//         >
//           ▶
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BillingTableCalls;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClientNavbar from "./components/ClientNavbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BillingTableCalls = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalRows = 21;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [startDate, setStartDate] = useState(null); // Start date filter
  const [endDate, setEndDate] = useState(null); // End date filter

  // Generate Mock Data
  const generateData = () =>
    Array.from({ length: totalRows }, (_, i) => ({
      contact: "User1@example.com",
      date: new Date(2024, 1, i + 1), // Random dates in Feb 2024
      duration: Math.floor(Math.random() * 60) + " min",
      service: "Call",
      sessionCost: (Math.random() * 10).toFixed(2),
      serverCost: (Math.random() * 5).toFixed(2),
      charge: (Math.random() * 50).toFixed(2),
      reference: Math.floor(Math.random() * 10000),
    }));

  const [data, setData] = useState(generateData);

  // Modify Dates Randomly (For Testing)
  const modifyDates = () => {
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        date: new Date(2024, 1, Math.floor(Math.random() * 28) + 1),
      }))
    );
  };

  // Date Filtering Logic
  const filteredData = data.filter((row) => {
    if (!startDate || !endDate) return true;
    return row.date >= startDate && row.date <= endDate;
  });

  // Sorting Logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valA = a[sortConfig.key];
    let valB = b[sortConfig.key];

    if (valA instanceof Date && valB instanceof Date) {
      return sortConfig.direction === "asc" ? valA - valB : valB - valA;
    }

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

  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleMessages = () => {
    navigate("/billing-messages");
  };

  return (
    <>
      <ClientNavbar />
      <div className="bg-gray-900 text-white h-screen p-6">
        <h2 className="text-2xl font-bold mt-6">BILLING</h2>
        <div className="space-x-4 py-4">
          <button className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-md cursor-pointer">
            Calls
          </button>
          <button
            onClick={handleMessages}
            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer"
          >
            Messages
          </button>
        </div>

        {/* Filters & Sorting Row */}
        <div className="flex justify-between items-center mb-4">
          {/* Date Range Filters */}
          <div className="flex gap-4">
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
            <button
              className="bg-blue-500 px-4 py-2 rounded-md text-white"
              onClick={modifyDates}
            >
              Modify Dates (Test)
            </button>
          </div>

          {/* Sorting Dropdown */}
          <div>
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              <option value="">Sort</option>
              {/* <option value="contact">Last 7 days</option> */}
              {/* <option value="contact">Last 30 days</option> */}
              <option value="date">Date</option>
              <option value="duration">Time Duration</option>
              <option value="service">Service Type</option>
              <option value="sessionCost">Session Cost</option>
              <option value="serverCost">Server Cost</option>
              <option value="charge">Total Charge</option>
              <option value="reference">Reference Number</option>
            </select>
          </div>
        </div>

        {/* Table Container (Scrollable) */}
        <div className="overflow-x-auto overflow-y-auto border border-blue-500 rounded-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-800">
              <tr>
                {[
                  "Contact No",
                  "Date (d-m-y)",
                  "Time Duration",
                  "Service Type (Call/Text)",
                  "Session Cost Per Unit Time",
                  "Server Cost Per Unit Time",
                  "Total Charge",
                  "Reference Number (UID)",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="px-2 py-2 border text-center border-gray-700 cursor-pointer"
                    onClick={() =>
                      handleSort(header.toLowerCase().replace(/\s/g, ""))
                    }
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index} className="bg-gray-900 text-center">
                  <td className="px-4 py-2 border border-gray-700">
                    {row.contact}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {row.date.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {row.duration}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {row.service}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {row.sessionCost}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {row.serverCost}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {row.charge}
                  </td>
                  <td className="px-4 py-2 border border-gray-700">
                    {row.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BillingTableCalls;
