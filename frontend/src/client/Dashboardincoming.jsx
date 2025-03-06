

import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, ResponsiveContainer } from "recharts";
import ClientNavbar from "./components/ClientNavbar";

const DashboardIncoming = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [callVolumeData, setCallVolumeData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [totalCalls, setTotalCalls] = useState(0);
  const [avgDuration, setAvgDuration] = useState("0m 0s");
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/billing-logs")
      .then((response) => response.json())
      .then((data) => {
        const incomingCalls = data.filter((item) => item.serviceType === "Incoming");

        const monthlyData = {};
        let totalDuration = 0;
        let totalCharges = 0;

        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        incomingCalls.forEach(({ date, timeDuration, totalCharge }) => {
          const month = new Date(date).toLocaleString("en-US", { month: "short" });
          if (!monthlyData[month]) {
            monthlyData[month] = { name: month, incoming: 0, cost: 0 };
          }
          monthlyData[month].incoming += 1;
          monthlyData[month].cost += totalCharge;
          totalDuration += parseInt(timeDuration, 10);
          totalCharges += totalCharge;
        });

        const sortedData = monthOrder
          .map((month) => monthlyData[month])
          .filter((data) => data !== undefined);

        setCallVolumeData(sortedData);
        setCostData(sortedData);
        setTotalCalls(incomingCalls.length);
        setAvgDuration(
          incomingCalls.length > 0
            ? `${Math.floor(totalDuration / incomingCalls.length)}m ${totalDuration % 60}s`
            : "0m 0s"
        );
        setTotalCost(totalCharges);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ClientNavbar />
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-4">Incoming Calls Dashboard</h2>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-4 py-2 cursor-pointer rounded-md ${
              location.pathname === "/dashboard" ? "bg-white text-black" : "bg-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => navigate("/dashboard-outgoing")}
            className={`px-4 py-2 cursor-pointer rounded-md ${
              location.pathname === "/dashboard-outgoing" ? "bg-white text-black" : "bg-gray-700"
            }`}
          >
            Outgoing
          </button>
          <button
            onClick={() => navigate("/dashboard-incoming")}
            className={`px-4 py-2 cursor-pointer rounded-md ${
              location.pathname === "/dashboard-incoming" ? "bg-white text-black" : "bg-gray-700"
            }`}
          >
            Incoming
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Total Incoming Calls</h3>
            <p className="text-3xl font-bold">{totalCalls}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Avg. Incoming Call Duration</h3>
            <p className="text-3xl font-bold">{avgDuration}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Total Incoming Cost</h3>
            <p className="text-3xl font-bold">Rs.{totalCost.toFixed(2)}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Call Volume Chart */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="mb-4 text-center">Call Volume</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={callVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Line type="monotone" dataKey="incoming" stroke="red" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Cost Analysis Chart */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="mb-4 text-center">Cost Analysis</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={costData}>
                <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                <XAxis dataKey="name" stroke="white" />
                <YAxis stroke="white" />
                <Tooltip />
                <Bar dataKey="cost" fill="#1E90FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardIncoming;
