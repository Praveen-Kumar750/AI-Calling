

import React, { useState, useEffect } from "react";
import ClientNavbar from "./components/ClientNavbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const columnOptions = [
  { key: "contactNo", label: "Contact No" },
  { key: "date", label: "Date (d/y/m)" },
  { key: "timeDuration", label: "Time Duration (mins)" },
  { key: "conversationTopics", label: "Conversation Topics/Purpose" },
  { key: "conversationRaw", label: "Conversation (RAW)" },
  { key: "conversationSummary", label: "Conversation Summary" },
  { key: "keyPoints", label: "Conversation Key Points" },
  { key: "conversationType", label: "Conversation Type (AI Analyzed)" },
  { key: "feedback", label: "Contact’s Feedback on the Conversation" },
  { key: "transferToAuthority", label: "Transfer to Authority" },
];

const OutgoingMessages = () => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [callData, setCallData] = useState([]);
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/outgoing-messages");
      setCallData(response.data);
      setFilteredData(response.data);
    };
    fetchData();
  }, []);

  const handleCallHistory = () => {
    navigate("/outgoing-calls");
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
    return sortConfig.direction === "asc" ? (valA < valB ? -1 : 1) : valA > valB ? -1 : 1;
  });

  return (
    <>
      <ClientNavbar />
      <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6">
        <h2 className="text-2xl font-bold mt-4 sm:mt-6">OUTGOING</h2>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          <button onClick={handleCallHistory} className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer">
            Call History
          </button>
          <button className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-md cursor-pointer">
            Message History
          </button>
        </div>

        {/* Date Selection & Sorting (Aligned in One Line) */}
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between mt-6 gap-4">
          {/* Date Selection */}
          <div className="flex flex-wrap md:flex-nowrap gap-4">
            <div>
              <label className="block text-gray-400 text-sm">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="bg-gray-800 text-white px-3 py-2 rounded-md w-full"
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
                className="bg-gray-800 text-white px-3 py-2 rounded-md w-full"
              />
            </div>
            {/* <button className="bg-blue-500 px-4 py-2 rounded-md text-white" onClick={modifyDates}>
              Modify Dates (Test)
            </button> */}
          </div>

          {/* Sorting */}
          <div>
            <label className="block text-gray-400 text-sm">Sort By</label>
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer w-full"
            >
              <option value="">Select</option>
              <option value="timeDuration">Time Duration</option>
            </select>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6">Message History</h3>

        {/* Table */}
        <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto admin-scroll">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-700">
                {columnOptions.map((col, index) => (
                  <th key={index} className="px-4 py-3 border border-gray-600 min-w-[150px]">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((row, index) => (
                <tr key={index} className="border border-gray-700">
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.contactNo}</td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">
                  {new Date(row.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-center">{row.timeDuration}</td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.conversationTopic}</td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">{row.conversationRaw}</td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600 text-blue-400 cursor-pointer">{row.conversationSummary}</td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.conversationKeyPoints}</td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.conversationType}</td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.contactFeedback}</td>
                  <td className="px-4 py-2 min-w-[150px] border border-gray-600">{row.transferToAuthority || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OutgoingMessages;
