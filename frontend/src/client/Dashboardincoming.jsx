




import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";

import ClientNavbar from "./components/ClientNavbar";

const Dashboardincoming = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL path

  const callVolumeData = [
    { name: "Jan", outgoing: 2000, incoming: 1000 },
    { name: "Feb", outgoing: 4500, incoming: 3000 },
    { name: "Mar", outgoing: 9000, incoming: 8000 },
    { name: "Apr", outgoing: 3000, incoming: 4000 },
    { name: "May", outgoing: 4000, incoming: 5000 },
    { name: "Jun", outgoing: 3500, incoming: 4500 },
    { name: "Jul", outgoing: 4000, incoming: 4200 },
  ];

  const costData = [
    { name: "Jan", cost: 2200 },
    { name: "Feb", cost: 2000 },
    { name: "Mar", cost: 2100 },
    { name: "Apr", cost: 1700 },
    { name: "May", cost: 1900 },
    { name: "Jun", cost: 2300 },
    { name: "Jul", cost: 2000 },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <ClientNavbar />

      {/* Analytics Dashboard */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>

        {/* Filters - Moved Sort By to Right */}
        <div className="flex justify-between items-center mb-6">
          <div className="space-x-4">
            <button
              onClick={() => navigate("/dashboard")}
              className={`px-4 py-2 rounded-md ${
                location.pathname === "/dashboard" ? "bg-white text-black" : "bg-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigate("/dashboard-outgoing")}
              className={`px-4 py-2 rounded-md ${
                location.pathname === "/dashboard-outgoing" ? "bg-white text-black" : "bg-gray-700"
              }`}
            >
              Outgoing
            </button>
            <button
              onClick={() => navigate("/dashboard-incoming")}
              className={`px-4 py-2 rounded-md ${
                location.pathname === "/dashboard-incoming" ? "bg-white text-black" : "bg-gray-700"
              }`}
            >
              Incoming
            </button>
          </div>
          <select className="bg-white px-4 py-2 rounded-md text-black">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Total incoming Calls</h3>
            <p className="text-3xl font-bold">12,345</p>
            <p className="text-green-400">+5.2%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Avg. incoming Call Duration</h3>
            <p className="text-3xl font-bold">3m 24s</p>
            <p className="text-red-400">-1.5%</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Total incoming Cost</h3>
            <p className="text-3xl font-bold">Rs.1,234.56</p>
            <p className="text-green-400">+2.3%</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Call Volume Chart */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="mb-4">Call Volume</h3>
            <LineChart width={600} height={300} data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="gray" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Line type="monotone" dataKey="outgoing" stroke="#4F46E5" />
              <Line type="monotone" dataKey="incoming" stroke="red" />
            </LineChart>
          </div>

          {/* Cost Analysis Chart */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="mb-4">Cost Analysis</h3>
            <BarChart width={600} height={300} data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="gray" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Bar dataKey="cost" fill="#1E90FF" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardincoming;
