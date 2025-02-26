import { useState } from "react";
import ClientNavbar from "./components/ClientNavbar";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const BillingTableMessages = () => {
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

  const handleCalls = () => {
    navigate("/billing-calls");
  };

  return (
    <>
      <ClientNavbar />
      <div className="bg-gray-900 text-white h-screen p-6">
        <h2 className="text-2xl font-bold mt-6">BILLING</h2>
        <div className="space-x-4 py-4">
          <button
          onClick={handleCalls}
          className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded-md cursor-pointer">
            Calls
          </button>
          <button
            className="bg-pink-700 hover:bg-pink-800 px-4 py-2 rounded-md cursor-pointer"
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
                    className="px-2 py-2 text-center border border-gray-700 cursor-pointer"
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

export default BillingTableMessages;







