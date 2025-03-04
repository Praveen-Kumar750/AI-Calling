import React, { useState, useEffect } from "react";
import ClientNavbar from "./components/ClientNavbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";


// const initialCallData = Array(10).fill({
//   contactNo: "980000000000",
//   date: "01-01-2000",
//   timeDuration: "10:10:10",
//   conversationTopics: "issue",
//   conversationRaw: "View Full Chat",
//   conversationSummary: "View Summary",
//   keyPoints: "Key points",
//   conversationType: "Unsatisfied",
//   feedback: "Angry",
//   transferToAuthority: "Free",
// });

const columnOptions = [
  { key: "contactNo", label: "Contact No" },
  { key: "date", label: "Date (d-y-m)" },
  { key: "timeDuration", label: "Time Duration" },
  { key: "conversationTopics", label: "Conversation Topics/Purpose" },
  { key: "conversationRaw", label: "Conversation (RAW)" },
  { key: "conversationSummary", label: "Conversation Summary" },
  { key: "keyPoints", label: "Conversation Key Points" },
  { key: "conversationType", label: "Conversation Type (AI Analyzed)" },
  { key: "feedback", label: "Contact’s Feedback on the Conversation" },
  { key: "transferToAuthority", label: "Transfer to Authority" },
];

const OutgoingCalls = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [callData, setCallData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null); // Start date filter
  const [endDate, setEndDate] = useState(null); // End date filter

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/outgoing-calls");
      console.log(response.data);
      setCallData(response.data);
    };
    fetchData();
  }, []);

  // Modify Dates Randomly (For Testing)
  const modifyDates = () => {
    setData((prevData) =>
      prevData.map((row) => ({
        ...row,
        date: new Date(2024, 1, Math.floor(Math.random() * 28) + 1),
      }))
    );
  };

  const handleMessageHistory = () => {
    navigate("/outgoing-messages");
  };

  const handleSort = (columnKey) => {
    setSortConfig((prev) => ({
      key: columnKey,
      direction:
        prev.key === columnKey && prev.direction === "asc" ? "desc" : "asc",
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
    <>
      <ClientNavbar />
      <div className="bg-gray-900 text-white min-h-screen p-6">
        {/* Navbar */}

        <h2 className="text-2xl font-bold mt-6">OUTGOING</h2>

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

      
        </div>

        <div className="flex justify-between items-center mb-4 mt-4">
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
                      {/* <option value="date">Date</option> */}
                      <option value="duration">Time Duration</option>
                      {/* <option value="service">Service Type</option> */}
                      {/* <option value="sessionCost">Session Cost</option> */}
                      {/* <option value="serverCost">Server Cost</option> */}
                      {/* <option value="charge">Total Charge</option> */}
                      {/* <option value="reference">Reference Number</option> */}
                    </select>
                  </div>
                </div>

        

        <h3 className="text-xl font-bold mt-6">Call History</h3>

        {/* Table Container */}
        <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto overflow-y-auto admin-scroll">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700">
                {columnOptions.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 border border-gray-600 min-w-[150px]"
                  >
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
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">
                    {row.contactNo}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">
                    {/* {row.date} */}
                    {`${String(new Date(row.date).getDate()).padStart(2, '0')}-${String(new Date(row.date).getMonth() + 1).padStart(2, '0')}-${new Date(row.date).getFullYear()}`}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">
                    {row.timeDuration}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">
                    {row.conversationTopic}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">
                    {row.conversationRaw}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">
                    {row.conversationSummary}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">
                    {row.conversationKeyPoints}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">
                    {row.conversationType}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">
                    {row.contactFeedback}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">
                  {row.transferToAuthority || "N/A"}
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

export default OutgoingCalls;
