import React, { useState, useEffect } from "react";
import ClientNavbar from "./components/ClientNavbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const columnOptions = [
  { key: "contactNo", label: "Contact No" },
  { key: "date", label: "Date (d/m/y)" },
  { key: "timeDuration", label: "Time Duration (mins)" },
  { key: "conversationTopic", label: "Conversation Topics/Purpose" },
  { key: "conversationRaw", label: "Conversation (RAW)" },
  { key: "conversationSummary", label: "Conversation Summary" },
  { key: "conversationKeyPoints", label: "Conversation Key Points" },
  { key: "conversationType", label: "Conversation Type (AI Analyzed)" },
  { key: "contactFeedback", label: "Contact’s Feedback" },
  { key: "transferToAuthority", label: "Transfer to Authority" },
];

const OutgoingCalls = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [callData, setCallData] = useState([]);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/outgoing-calls"
        );
        setCallData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleMessageHistory = () => {
    navigate("/outgoing-messages");
  };

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
      <div className="bg-gray-900 text-white min-h-screen p-4 md:p-6">
        <h2 className="text-2xl font-bold mt-4 md:mt-6">OUTGOING</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center  mt-4 space-y-4 md:space-y-0">
          <div className="space-x-2 flex">
            <button className="bg-pink-700 hover:bg-pink-800 cursor-pointer px-4 py-2 rounded-md">
              Call History
            </button>
            <button
              onClick={handleMessageHistory}
              className="bg-gray-700 hover:bg-gray-800 cursor-pointer px-4 py-2 rounded-md"
            >
              Message History
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-between mt-4">
          {/* Date Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <label className="block text-gray-400 text-sm">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="bg-gray-800 text-white px-3 py-2 rounded-md w-full sm:w-auto"
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
                className="bg-gray-800 text-white px-3 py-2 rounded-md w-full sm:w-auto"
              />
            </div>
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-gray-400 text-sm mt-2">Sort By</label>
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 cursor-pointer rounded-md w-full sm:w-auto"
            >
              <option value="">Select</option>
              <option value="timeDuration">Time Duration</option>
            </select>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-6">Call History</h3>
        {/* Table */}
        <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto admin-scroll">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700">
                {columnOptions.map((col, index) => (
                  <th
                    key={index}
                    className="px-2 md:px-4 py-2 border border-gray-600 min-w-[150px]"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columnOptions.length}
                    className="text-center py-4 text-gray-400"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                sortedData.map((row, index) => (
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
                    <td className="px-4 py-2 border border-gray-600">
                      {row.conversationTopic}
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
                      {row.transferToAuthority || "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OutgoingCalls;
