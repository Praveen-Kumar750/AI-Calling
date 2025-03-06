import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ClientNavbar from "./components/ClientNavbar";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [billingData, setBillingData] = useState([]);
  const [callVolumeData, setCallVolumeData] = useState([]);
  const [costData, setCostData] = useState([]);
  const [totalIncomingCalls, setTotalIncomingCalls] = useState(0);
  const [totalOutgoingCalls, setTotalOutgoingCalls] = useState(0);
  const [avgIncomingDuration, setAvgIncomingDuration] = useState("0m 0s");
  const [avgOutgoingDuration, setAvgOutgoingDuration] = useState("0m 0s");
  const [totalIncomingCost, setTotalIncomingCost] = useState(0);
  const [totalOutgoingCost, setTotalOutgoingCost] = useState(0);

  const [avgTotalDuration, setAvgTotalDuration] = useState("0m 0s");

  useEffect(() => {
    fetch("http://localhost:5000/api/billing-logs")
      .then((response) => response.json())
      .then((data) => {
        setBillingData(data);

        const monthlyData = {};
        let totalIncomingDuration = 0;
        let totalOutgoingDuration = 0;
        let incomingCount = 0;
        let outgoingCount = 0;
        let totalIncomingCharges = 0;
        let totalOutgoingCharges = 0;

        data.forEach(({ date, serviceType, timeDuration, totalCharge }) => {
          const month = new Date(date).toLocaleString("en-US", {
            month: "short",
          });

          if (!monthlyData[month]) {
            monthlyData[month] = {
              name: month,
              incoming: 0,
              outgoing: 0,
              cost: 0,
            };
          }

          if (serviceType === "Incoming") {
            monthlyData[month].incoming += 1;
            totalIncomingDuration += parseInt(timeDuration, 10);
            totalIncomingCharges += totalCharge;
            incomingCount++;
          } else if (serviceType === "Outgoing") {
            monthlyData[month].outgoing += 1;
            totalOutgoingDuration += parseInt(timeDuration, 10);
            totalOutgoingCharges += totalCharge;
            outgoingCount++;
          }

          monthlyData[month].cost += totalCharge;
        });

        const monthOrder = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const sortedData = Object.values(monthlyData).sort(
          (a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name)
        );

        setCallVolumeData(sortedData);
        setCostData(sortedData);
        setTotalIncomingCalls(incomingCount);
        setTotalOutgoingCalls(outgoingCount);
        setTotalIncomingCost(totalIncomingCharges);
        setTotalOutgoingCost(totalOutgoingCharges);

        setAvgIncomingDuration(
          incomingCount > 0
            ? `${Math.floor(totalIncomingDuration / incomingCount)}m ${
                totalIncomingDuration % 60
              }s`
            : "0m 0s"
        );

        setAvgOutgoingDuration(
          outgoingCount > 0
            ? `${Math.floor(totalOutgoingDuration / outgoingCount)}m ${
                totalOutgoingDuration % 60
              }s`
            : "0m 0s"
        );

        const totalCalls = incomingCount + outgoingCount;
        const totalDuration = totalIncomingDuration + totalOutgoingDuration;
        setAvgTotalDuration(
          totalCalls > 0
            ? `${Math.floor(totalDuration / totalCalls)}m ${
                totalDuration % 60
              }s`
            : "0m 0s"
        );
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const hasReloaded = sessionStorage.getItem("dashboardReloaded");
  
    if (!hasReloaded) {
      sessionStorage.setItem("dashboardReloaded", "true");
      window.location.reload();
    }
  }, []);


  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ClientNavbar />
      <div className="p-4 sm:p-6">
        <h2 className="text-2xl font-bold mb-4">Overview Dashboard</h2>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => navigate("/dashboard")}
            className={`px-4 py-2 cursor-pointer rounded-md ${
              location.pathname === "/dashboard"
                ? "bg-white text-black"
                : "bg-gray-700"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => navigate("/dashboard-outgoing")}
            className={`px-4 py-2 cursor-pointer rounded-md ${
              location.pathname === "/dashboard-outgoing"
                ? "bg-white text-black"
                : "bg-gray-700"
            }`}
          >
            Outgoing
          </button>
          <button
            onClick={() => navigate("/dashboard-incoming")}
            className={`px-4 py-2 cursor-pointer rounded-md ${
              location.pathname === "/dashboard-incoming"
                ? "bg-white text-black"
                : "bg-gray-700"
            }`}
          >
            Incoming
          </button>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[['Total Incoming Calls', totalIncomingCalls], ['Total Outgoing Calls', totalOutgoingCalls], ['Total Calls', totalIncomingCalls + totalOutgoingCalls],
            ['Avg. Incoming Call Duration', avgIncomingDuration], ['Avg. Outgoing Call Duration', avgOutgoingDuration], ['Total Call Cost', `Rs.${(totalIncomingCost + totalOutgoingCost).toFixed(2)}`]
          ].map(([label, value], index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
              <h3 className="text-gray-400">{label}</h3>
              <p className="text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            // ["Total Incoming Calls", totalIncomingCalls],
            // ["Total Outgoing Calls", totalOutgoingCalls],
            ["Total Calls", totalIncomingCalls + totalOutgoingCalls],
            // ["Avg. Incoming Call Duration", avgIncomingDuration],
            // ["Avg. Outgoing Call Duration", avgOutgoingDuration],
            ["Avg. Call Duration", avgTotalDuration], // New line added
            [
              "Total Call Cost",
              `Rs.${(totalIncomingCost + totalOutgoingCost).toFixed(2)}`,
            ],
          ].map(([label, value], index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg text-center">
              <h3 className="text-gray-400">{label}</h3>
              <p className="text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {[
            [
              "Call Volume",
              callVolumeData,
              ["incoming", "red"],
              ["outgoing", "#4F46E5"],
            ],
            ["Cost Analysis", costData, ["cost", "#1E90FF"]],
          ].map(([title, data, ...lines], index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="mb-4 text-center">{title}</h3>
              <ResponsiveContainer width="100%" height={300}>
                {index === 0 ? (
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                    <XAxis dataKey="name" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip />
                    {lines.map(([key, color]) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={color}
                      />
                    ))}
                  </LineChart>
                ) : (
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="gray" />
                    <XAxis dataKey="name" stroke="white" />
                    <YAxis stroke="white" />
                    <Tooltip />
                    <Bar dataKey="cost" fill="#1E90FF" />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
