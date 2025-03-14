
import { useState, useEffect } from "react";
import ClientNavbar from "./components/ClientNavbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const BillingTableMessages = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5000/api/billing-logs-messages");
      setData(response.data);
      setFilteredData(response.data);
    };
    fetchData();
  }, []);

  // Date Filtering Logic
  // const filteredData = data.filter((row) => {
  //   if (!startDate || !endDate) return true;
  //   return new Date(row.date) >= startDate && new Date(row.date) <= endDate;
  // });

  useEffect(() => {
    if (startDate && endDate) {
      const filtered = data.filter((call) => {
        const callDate = new Date(call.date);
        return callDate >= startDate && callDate <= endDate;
      });
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [startDate, endDate, data]);


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

  const paginatedData = sortedData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const handleCalls = () => {
    navigate("/billing-calls");
  };

  return (
    <>
      <ClientNavbar />
      <div className="bg-gray-900 text-white min-h-screen p-6">
        <h2 className="text-2xl font-bold mt-6">BILLING</h2>

        {/* Buttons */}
        <div className="flex space-x-4 py-4">
          <button
            onClick={handleCalls}
            className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer"
          >
            Calls
          </button>
          <button className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-md cursor-pointer">
            Messages
          </button>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
          {/* Date Range Filters */}
          <div className="flex flex-wrap gap-4">
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
          </div>

          {/* Sorting Dropdown */}
          <div>
          <label className="block text-gray-400 text-sm">Sort By</label>
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer w-[150px]"
            >
              <option value="">Select</option>
              {/* <option value="date">Date</option> */}
              <option value="timeDuration">Time Duration</option>
              <option value="serviceType">Service Type</option>
              {/* <option value="sessionCostPerUnitTime">Session Cost</option> */}
              {/* <option value="serverCostPerUnitTime">Server Cost</option> */}
              <option value="totalCharge">Total Charge</option>
              <option value="referenceNumber">Reference Number</option>
            </select>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-3">Message History</h3>

        {/* Table Container */}
        <div className="overflow-x-auto admin-scroll border border-blue-500 rounded-md">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-800">
              <tr>
                {[
                  "Contact No",
                  "Date (d/m/y)",
                  "Time Duration (mins)",
                  "Service Type",
                  "Session Cost Per Unit Time (Rs.)",
                  "Server Cost Per Unit Time (Rs.)",
                  "Total Charge (Rs.)",
                  "Reference Number (UID)",
                ].map((header, i) => (
                  <th
                    key={i}
                    className="px-2 py-2 text-center border border-gray-700 cursor-pointer"
                    onClick={() => handleSort(header.toLowerCase().replace(/\s/g, ""))}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index} className="bg-gray-900 text-center">
                  <td className="px-4 py-2 border border-gray-700 min-w-[150px]">{row.contactNo}</td>
                  <td className="px-4 py-2 border border-gray-700 min-w-[150px]">
                  {new Date(row.date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-4 py-2 border border-gray-700 min-w-[150px]">{row.timeDuration}</td>
                  <td className="px-4 py-2 border border-gray-700 min-w-[150px]">{row.serviceType}</td>
                  <td className="px-4 py-2 border border-gray-700 min-w-[150px]">{row.sessionCostPerUnitTime}</td>
                  <td className="px-4 py-2 border border-gray-700 min-w-[150px]">{row.serverCostPerUnitTime}</td>
                  <td className="px-4 py-2 border border-gray-700 min-w-[150px]">{row.totalCharge}</td>
                  <td className="px-4 py-2 border border-gray-700 min-w-[150px]">{row.referenceNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default BillingTableMessages;


