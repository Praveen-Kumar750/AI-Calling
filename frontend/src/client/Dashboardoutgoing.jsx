

// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
// import ClientNavbar from "./components/ClientNavbar";

// const DashboardOutgoing = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [billingData, setBillingData] = useState([]);
//   const [callVolumeData, setCallVolumeData] = useState([]);
//   const [costData, setCostData] = useState([]);
//   const [totalCalls, setTotalCalls] = useState(0);
//   const [avgDuration, setAvgDuration] = useState("0m 0s");
//   const [totalCost, setTotalCost] = useState(0);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/billing-logs")
//       .then((response) => response.json())
//       .then((data) => {
//         const outgoingCalls = data.filter((item) => item.serviceType === "Outgoing");
//         setBillingData(outgoingCalls);

//         const monthlyData = {};
//         let totalDuration = 0;
//         let totalCharges = 0;

//         outgoingCalls.forEach(({ date, timeDuration, totalCharge }) => {
//           const month = new Date(date).toLocaleString("en-US", { month: "short" });
//           monthlyData[month] = monthlyData[month] || { name: month, outgoing: 0, cost: 0 };
//           monthlyData[month].outgoing += 1;
//           monthlyData[month].cost += totalCharge;
//           totalDuration += parseInt(timeDuration, 10);
//           totalCharges += totalCharge;
//         });

//         setCallVolumeData(Object.values(monthlyData));
//         setCostData(Object.values(monthlyData));
//         setTotalCalls(outgoingCalls.length);
//         setAvgDuration(`${Math.floor(totalDuration / outgoingCalls.length)}m ${totalDuration % 60}s`);
//         setTotalCost(totalCharges);
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="bg-gray-900 text-white min-h-screen">
//       <ClientNavbar />
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Outgoing Calls Dashboard</h2>

//         <div className="flex justify-between items-center mb-6">
//           <div className="space-x-4">
//             <button onClick={() => navigate("/dashboard")} className={`px-4 py-2 cursor-pointer rounded-md ${location.pathname === "/dashboard" ? "bg-white text-black" : "bg-gray-700"}`}>
//               Overview
//             </button>
//             <button onClick={() => navigate("/dashboard-outgoing")} className={`px-4 py-2 cursor-pointer rounded-md ${location.pathname === "/dashboard-outgoing" ? "bg-white text-black" : "bg-gray-700"}`}>
//               Outgoing
//             </button>
//             <button onClick={() => navigate("/dashboard-incoming")} className={`px-4 py-2 cursor-pointer rounded-md ${location.pathname === "/dashboard-incoming" ? "bg-white text-black" : "bg-gray-700"}`}>
//               Incoming
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-gray-800 p-4 rounded-lg text-center">
//             <h3 className="text-gray-400">Total Outgoing Calls</h3>
//             <p className="text-3xl font-bold">{totalCalls}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center">
//             <h3 className="text-gray-400">Avg. Outgoing Call Duration</h3>
//             <p className="text-3xl font-bold">{avgDuration}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center">
//             <h3 className="text-gray-400">Total Outgoing Cost</h3>
//             <p className="text-3xl font-bold">Rs.{totalCost.toFixed(2)}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h3 className="mb-4">Call Volume</h3>
//             <LineChart width={600} height={300} data={callVolumeData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="gray" />
//               <XAxis dataKey="name" stroke="white" />
//               <YAxis stroke="white" />
//               <Tooltip />
//               <Line type="monotone" dataKey="outgoing" stroke="#4F46E5" />
//             </LineChart>
//           </div>

//           <div className="bg-gray-800 p-6 rounded-lg">
//             <h3 className="mb-4">Cost Analysis</h3>
//             <BarChart width={600} height={300} data={costData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="gray" />
//               <XAxis dataKey="name" stroke="white" />
//               <YAxis stroke="white" />
//               <Tooltip />
//               <Bar dataKey="cost" fill="#1E90FF" />
//             </BarChart>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardOutgoing;




import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import ClientNavbar from "./components/ClientNavbar";

const DashboardOutgoing = () => {
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
        const outgoingCalls = data.filter((item) => item.serviceType === "Outgoing");

        const monthlyData = {};
        let totalDuration = 0;
        let totalCharges = 0;

        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        outgoingCalls.forEach(({ date, timeDuration, totalCharge }) => {
          const month = new Date(date).toLocaleString("en-US", { month: "short" });
          if (!monthlyData[month]) {
            monthlyData[month] = { name: month, outgoing: 0, cost: 0 };
          }
          monthlyData[month].outgoing += 1;
          monthlyData[month].cost += totalCharge;
          totalDuration += parseInt(timeDuration, 10);
          totalCharges += totalCharge;
        });

        // Sort months in correct order
        const sortedData = monthOrder
          .map((month) => monthlyData[month])
          .filter((data) => data !== undefined);

        setCallVolumeData(sortedData);
        setCostData(sortedData);
        setTotalCalls(outgoingCalls.length);
        setAvgDuration(
          outgoingCalls.length > 0
            ? `${Math.floor(totalDuration / outgoingCalls.length)}m ${totalDuration % 60}s`
            : "0m 0s"
        );
        setTotalCost(totalCharges);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ClientNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Outgoing Calls Dashboard</h2>

        <div className="flex justify-between items-center mb-6">
          <div className="space-x-4">
            <button onClick={() => navigate("/dashboard")} className={`px-4 py-2 cursor-pointer rounded-md ${location.pathname === "/dashboard" ? "bg-white text-black" : "bg-gray-700"}`}>
              Overview
            </button>
            <button onClick={() => navigate("/dashboard-outgoing")} className={`px-4 py-2 cursor-pointer rounded-md ${location.pathname === "/dashboard-outgoing" ? "bg-white text-black" : "bg-gray-700"}`}>
              Outgoing
            </button>
            <button onClick={() => navigate("/dashboard-incoming")} className={`px-4 py-2 cursor-pointer rounded-md ${location.pathname === "/dashboard-incoming" ? "bg-white text-black" : "bg-gray-700"}`}>
              Incoming
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Total Outgoing Calls</h3>
            <p className="text-3xl font-bold">{totalCalls}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Avg. Outgoing Call Duration</h3>
            <p className="text-3xl font-bold">{avgDuration}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Total Outgoing Cost</h3>
            <p className="text-3xl font-bold">Rs.{totalCost.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h3 className="mb-4">Call Volume</h3>
            <LineChart width={600} height={300} data={callVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="gray" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Line type="monotone" dataKey="outgoing" stroke="#4F46E5" />
            </LineChart>
          </div>

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

export default DashboardOutgoing;
