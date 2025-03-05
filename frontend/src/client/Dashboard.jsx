

// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
// import ClientNavbar from "./components/ClientNavbar";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [billingData, setBillingData] = useState([]);
//   const [callVolumeData, setCallVolumeData] = useState([]);
//   const [costData, setCostData] = useState([]);
//   const [totalIncomingCalls, setTotalIncomingCalls] = useState(0);
//   const [totalOutgoingCalls, setTotalOutgoingCalls] = useState(0);
//   const [avgIncomingDuration, setAvgIncomingDuration] = useState("0m 0s");
//   const [avgOutgoingDuration, setAvgOutgoingDuration] = useState("0m 0s");
//   const [totalIncomingCost, setTotalIncomingCost] = useState(0);
//   const [totalOutgoingCost, setTotalOutgoingCost] = useState(0);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/billing-logs")
//       .then((response) => response.json())
//       .then((data) => {
//         setBillingData(data);

//         const monthlyData = {};
//         let totalIncomingDuration = 0;
//         let totalOutgoingDuration = 0;
//         let incomingCount = 0;
//         let outgoingCount = 0;
//         let totalIncomingCharges = 0;
//         let totalOutgoingCharges = 0;

//         data.forEach(({ date, serviceType, timeDuration, totalCharge }) => {
//           const month = new Date(date).toLocaleString("en-US", { month: "short" });

//           if (!monthlyData[month]) {
//             monthlyData[month] = { name: month, incoming: 0, outgoing: 0, cost: 0 };
//           }

//           if (serviceType === "Incoming") {
//             monthlyData[month].incoming += 1;
//             totalIncomingDuration += parseInt(timeDuration, 10);
//             totalIncomingCharges += totalCharge;
//             incomingCount++;
//           } else if (serviceType === "Outgoing") {
//             monthlyData[month].outgoing += 1;
//             totalOutgoingDuration += parseInt(timeDuration, 10);
//             totalOutgoingCharges += totalCharge;
//             outgoingCount++;
//           }

//           monthlyData[month].cost += totalCharge;
//         });

//         setCallVolumeData(Object.values(monthlyData));
//         setCostData(Object.values(monthlyData));
//         setTotalIncomingCalls(incomingCount);
//         setTotalOutgoingCalls(outgoingCount);
//         setTotalIncomingCost(totalIncomingCharges);
//         setTotalOutgoingCost(totalOutgoingCharges);

//         setAvgIncomingDuration(
//           incomingCount > 0
//             ? `${Math.floor(totalIncomingDuration / incomingCount)}m ${totalIncomingDuration % 60}s`
//             : "0m 0s"
//         );

//         setAvgOutgoingDuration(
//           outgoingCount > 0
//             ? `${Math.floor(totalOutgoingDuration / outgoingCount)}m ${totalOutgoingDuration % 60}s`
//             : "0m 0s"
//         );
//       })
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   return (
//     <div className="bg-gray-900 text-white min-h-screen">
//       <ClientNavbar />
//       <div className="p-6">
//         <h2 className="text-2xl font-bold mb-4">Overview Dashboard</h2>

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
//             <h3 className="text-gray-400">Total Incoming Calls</h3>
//             <p className="text-3xl font-bold">{totalIncomingCalls}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center">
//             <h3 className="text-gray-400">Total Outgoing Calls</h3>
//             <p className="text-3xl font-bold">{totalOutgoingCalls}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center">
//             <h3 className="text-gray-400">Total Calls</h3>
//             <p className="text-3xl font-bold">{totalIncomingCalls + totalOutgoingCalls}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center">
//             <h3 className="text-gray-400">Avg. Incoming Call Duration</h3>
//             <p className="text-3xl font-bold">{avgIncomingDuration}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center">
//             <h3 className="text-gray-400">Avg. Outgoing Call Duration</h3>
//             <p className="text-3xl font-bold">{avgOutgoingDuration}</p>
//           </div>
//           <div className="bg-gray-800 p-4 rounded-lg text-center">
//             <h3 className="text-gray-400">Total Call Cost</h3>
//             <p className="text-3xl font-bold">Rs.{(totalIncomingCost + totalOutgoingCost).toFixed(2)}</p>
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
//               <Line type="monotone" dataKey="incoming" stroke="red" />
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

// export default Dashboard;




import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
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
          const month = new Date(date).toLocaleString("en-US", { month: "short" });

          if (!monthlyData[month]) {
            monthlyData[month] = { name: month, incoming: 0, outgoing: 0, cost: 0 };
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

        // Month order array
        const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Convert object to array and sort by month order
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
            ? `${Math.floor(totalIncomingDuration / incomingCount)}m ${totalIncomingDuration % 60}s`
            : "0m 0s"
        );

        setAvgOutgoingDuration(
          outgoingCount > 0
            ? `${Math.floor(totalOutgoingDuration / outgoingCount)}m ${totalOutgoingDuration % 60}s`
            : "0m 0s"
        );
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <ClientNavbar />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Overview Dashboard</h2>

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
            <h3 className="text-gray-400">Total Incoming Calls</h3>
            <p className="text-3xl font-bold">{totalIncomingCalls}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Total Outgoing Calls</h3>
            <p className="text-3xl font-bold">{totalOutgoingCalls}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Total Calls</h3>
            <p className="text-3xl font-bold">{totalIncomingCalls + totalOutgoingCalls}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Avg. Incoming Call Duration</h3>
            <p className="text-3xl font-bold">{avgIncomingDuration}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Avg. Outgoing Call Duration</h3>
            <p className="text-3xl font-bold">{avgOutgoingDuration}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg text-center">
            <h3 className="text-gray-400">Total Call Cost</h3>
            <p className="text-3xl font-bold">Rs.{(totalIncomingCost + totalOutgoingCost).toFixed(2)}</p>
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
              <Line type="monotone" dataKey="incoming" stroke="red" />
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

export default Dashboard;
