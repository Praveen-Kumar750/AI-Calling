import { useState } from "react";
import ClientNavbar from "./components/ClientNavbar";

const BillingTableCalls = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 7;
  const totalRows = 21; // Mock total rows for pagination

  const data = Array.from({ length: totalRows }, (_, i) => ({
    contact: "User1@example.com",
    date: "John",
    duration: "Doe",
    service: "123-456-7890",
    sessionCost: "Student",
    serverCost: "10th Grade",
    charge: "19",
    reference: "male",
  }));
const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );


  return (
    <div className="bg-gray-900 text-white h-screen p-6">
        <ClientNavbar></ClientNavbar>
      <h2 className="text-2xl font-bold mt-6">BILLING</h2>

      <div className="flex justify-between">
        {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md">
          Incoming
        </button>
        <button className="bg-white text-black px-4 py-2 rounded-md">
          Outgoing
        </button>
      </div>

      

      {/* Filters & Sort */}
      <div className="flex justify-between items-center mb-4">
        <select className="bg-gray-800 text-white px-3 py-2 rounded-md">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>All Time</option>
        </select>
      </div>
      </div>

      <div className="flex justify-between">
      <h3 className="text-xl font-semibold mb-2">Call History</h3>
      <select>
        <option>Sort</option>
      </select>
      </div>
      {/* Table Container (Scrollable) */}
      <div className="overflow-x-auto overflow-y-auto border border-blue-500 rounded-md">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-800">
            <tr>
              {[
                "Contact No",
                "Date (d-y-m)",
                "Time Duration",
                "Service Type (Call/Text)",
                "Session Cost Per Unit Time",
                "Server Cost Per Unit Time",
                "Total Charge",
                "Reference Number (UID)",
              ].map((header, i) => (
                <th key={i} className="px-4 py-2 border border-gray-700">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="bg-gray-900">
                <td className="px-4 py-2 border border-gray-700 ">
                  {row.contact}
                </td>
                <td className="px-4 py-2 border border-gray-700 ">{row.date}</td>
                <td className="px-4 py-2 border border-gray-700 ">
                  {row.duration}
                </td>
                <td className="px-4 py-2 border border-gray-700 ">
                  {row.service}
                </td>
                <td className="px-4 py-2 border border-gray-700 ">
                  {row.sessionCost}
                </td>
                <td className="px-4 py-2 border border-gray-700 ">
                  {row.serverCost}
                </td>
                <td className="px-4 py-2 border border-gray-700 ">
                  {row.charge}
                </td>
                <td className="px-4 py-2 border border-gray-700 ">
                  {row.reference}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      {/* Pagination */}
      <div className="flex justify-end mt-4 gap-2">
        <button
          className="bg-purple-600 text-white px-3 py-1 rounded-md"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          ◀
        </button>
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded-md ${
              currentPage === page ? "bg-purple-600 text-white" : "bg-gray-700"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          className="bg-purple-600 text-white px-3 py-1 rounded-md"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalRows / rowsPerPage))
          }
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default BillingTableCalls;







