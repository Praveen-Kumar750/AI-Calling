

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
  { key: "conversationKeyPoints", label: "Key Points" },
  { key: "conversationType", label: "Conversation Type (AI Analyzed)" },
  { key: "contactFeedback", label: "Feedback" },
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
      <div className="bg-gray-900 text-white min-h-screen p-4 md:p-6">
        <h2 className="text-2xl font-bold mt-4 md:mt-6">INCOMING</h2>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
          <div className="space-x-2 md:space-x-4">
            <button
              onClick={handleCallHistory}
              className="bg-gray-700 hover:bg-gray-800 px-3 py-2 md:px-4 md:py-2 rounded-md text-sm md:text-base"
            >
              Call History
            </button>
            <button className="bg-pink-700 hover:bg-pink-800 px-3 py-2 md:px-4 md:py-2 rounded-md text-sm md:text-base">
              Message History
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-between mt-4">
          {/* Date Filters */}
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-gray-400 text-sm">Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="bg-gray-800 text-white px-3 py-2 rounded-md w-full md:w-auto"
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
                className="bg-gray-800 text-white px-3 py-2 rounded-md w-full md:w-auto"
              />
            </div>
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-gray-400 text-sm">Sort By</label>
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md w-full md:w-auto"
            >
              <option value="">Select</option>
              <option value="timeDuration">Time Duration</option>
            </select>
          </div>
        </div>
        <h3 className="text-xl font-bold mt-6">Message History</h3>

        {/* Table */}
        <div className="bg-gray-800 p-4 mt-4 rounded-lg overflow-x-auto admin-scroll">
          {loading ? (
            <p className="text-center text-gray-400">Loading...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : sortedData.length === 0 ? (
            <p className="text-center text-gray-400">No data available.</p>
          ) : (
            <table className="w-full text-left border-collapse min-w-max">
              <thead>
                <tr className="bg-gray-700 text-sm md:text-base">
                  {columnOptions.map((col, index) => (
                    <th
                      key={index}
                      className="px-2 md:px-4 py-2 md:py-3 border border-gray-600 min-w-[120px] md:min-w-[150px]"
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
                    className="border border-gray-700 hover:bg-gray-750 transition text-sm md:text-base"
                  >
                    {columnOptions.map((col) => (
                      <td
                        key={col.key}
                        className="px-2 md:px-4 text-center py-2 border border-gray-600"
                      >
                        {col.key === "date"
                          ? new Date(row[col.key]).toLocaleDateString("en-GB")
                          : row[col.key] || "-"}
                      </td>
                    ))}
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
