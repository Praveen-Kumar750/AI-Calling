import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import ClientNavbar from "./components/ClientNavbar";

const PreviousData = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/files/uploads")
      .then((res) => res.json())
      .then((uploads) => {
        console.log("Fetched Uploads:", uploads);

        // Process the data to match the desired table format
        const processedData = [];
        
        uploads.forEach(upload => {
          // Get the timestamp from the upload document
          // MongoDB adds _id with timestamp that we can extract if createdAt is missing
          let uploadTimestamp;
          
          if (upload.createdAt) {
            uploadTimestamp = new Date(upload.createdAt);
          } else if (upload._id) {
            // Extract timestamp from MongoDB ObjectId (first 4 bytes)
            const objectIdTimestamp = parseInt(upload._id.substring(0, 8), 16) * 1000;
            uploadTimestamp = new Date(objectIdTimestamp);
          } else {
            // Last resort fallback
            uploadTimestamp = new Date();
          }
          
          // Format date and time
          const date = isNaN(uploadTimestamp.getTime())
            ? "01-01-2020" // Fallback date if invalid
            : uploadTimestamp.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
              });
              
          const time = isNaN(uploadTimestamp.getTime())
            ? "00:00:0000" // Fallback time if invalid
            : uploadTimestamp.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              });
          
          // Process calling data files
          if (upload.callingData) {
            if (upload.callingData.dataEntryFiles && upload.callingData.dataEntryFiles.length > 0) {
              upload.callingData.dataEntryFiles.forEach(filePath => {
                const fileName = filePath.split('/').pop().split('\\').pop();
                processedData.push({
                  date,
                  time,
                  file: fileName,
                  service: "Call"
                });
              });
            }
            
            if (upload.callingData.contactEntryFiles && upload.callingData.contactEntryFiles.length > 0) {
              upload.callingData.contactEntryFiles.forEach(filePath => {
                const fileName = filePath.split('/').pop().split('\\').pop();
                processedData.push({
                  date: "",  // Empty for grouped entries
                  time: "",  // Empty for grouped entries
                  file: fileName,
                  service: "Call"
                });
              });
            }
            
            if (upload.callingData.authorityContactFiles && upload.callingData.authorityContactFiles.length > 0) {
              upload.callingData.authorityContactFiles.forEach(filePath => {
                const fileName = filePath.split('/').pop().split('\\').pop();
                processedData.push({
                  date: "",  // Empty for grouped entries
                  time: "",  // Empty for grouped entries
                  file: fileName,
                  service: "Call"
                });
              });
            }
          }
          
          // Process message data files
          if (upload.messageData) {
            if (upload.messageData.dataEntryFiles && upload.messageData.dataEntryFiles.length > 0) {
              upload.messageData.dataEntryFiles.forEach(filePath => {
                const fileName = filePath.split('/').pop().split('\\').pop();
                processedData.push({
                  date: processedData.length === 0 ? date : "",
                  time: processedData.length === 0 ? time : "",
                  file: fileName,
                  service: "Message"
                });
              });
            }
            
            if (upload.messageData.contactEntryFiles && upload.messageData.contactEntryFiles.length > 0) {
              upload.messageData.contactEntryFiles.forEach(filePath => {
                const fileName = filePath.split('/').pop().split('\\').pop();
                processedData.push({
                  date: "",
                  time: "",
                  file: fileName,
                  service: "Message"
                });
              });
            }
            
            if (upload.messageData.authorityContactFiles && upload.messageData.authorityContactFiles.length > 0) {
              upload.messageData.authorityContactFiles.forEach(filePath => {
                const fileName = filePath.split('/').pop().split('\\').pop();
                processedData.push({
                  date: "",
                  time: "",
                  file: fileName,
                  service: "Message"
                });
              });
            }
          }
        });
        
        setData(processedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  // Mobile view handlers
  const [expandedRows, setExpandedRows] = useState({});

  const toggleRowExpand = (index) => {
    setExpandedRows(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-[#0f1024] text-white min-h-screen">
      <ClientNavbar />

      {/* Main content with responsive layout */}
      <div className="container mx-auto px-4 py-6 md:p-8">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 tracking-wide">PREVIOUS DATA</h2>
        
        {/* Responsive layout container */}
        <div className="flex flex-col lg:flex-row">
          {/* Left: Table Section */}
          <div className="w-full lg:flex-1 mb-6 lg:mb-0">
            {/* Desktop Table - Hidden on mobile */}
            <div className="hidden md:block border border-gray-700 rounded overflow-hidden">
              <table className="w-full border-collapse text-center">
                <thead>
                  <tr className="bg-[#161938]">
                    <th className="px-4 py-3 border-r border-gray-700 w-1/6">DATE</th>
                    <th className="px-4 py-3 border-r border-gray-700 w-1/6">TIME</th>
                    <th className="px-4 py-3 border-r border-gray-700 w-1/3">FILE TYPE</th>
                    <th className="px-4 py-3 w-1/6">SERVICES</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="px-4 py-3 border-r border-gray-700">{row.date}</td>
                      <td className="px-4 py-3 border-r border-gray-700">{row.time}</td>
                      <td className="px-4 py-3 border-r border-gray-700 text-left pl-6">{row.file}</td>
                      <td className="px-4 py-3">{row.service}</td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-4 py-3 text-gray-400">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Table Cards - Visible only on mobile */}
            <div className="md:hidden">
              {data.length > 0 ? (
                data.map((row, index) => (
                  <div 
                    key={index} 
                    className="mb-3 border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div 
                      className="flex justify-between items-center p-3 bg-[#161938] cursor-pointer"
                      onClick={() => toggleRowExpand(index)}
                    >
                      <div className="font-medium">
                        {row.file}
                      </div>
                      <div className={`transform transition-transform ${expandedRows[index] ? 'rotate-180' : ''}`}>
                        ▼
                      </div>
                    </div>
                    
                    {/* Expandable content */}
                    <div className={`overflow-hidden transition-all ${expandedRows[index] ? 'max-h-40' : 'max-h-0'}`}>
                      <div className="p-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-400">DATE:</div>
                        <div>{row.date || "-"}</div>
                        
                        <div className="text-gray-400">TIME:</div>
                        <div>{row.time || "-"}</div>
                        
                        <div className="text-gray-400">SERVICE:</div>
                        <div>{row.service}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center p-4 text-gray-400 border border-gray-700 rounded-lg">
                  No data available
                </div>
              )}
            </div>
          </div>

          {/* Vertical divider - visible only on desktop */}
          <div className="hidden lg:block w-px bg-gray-700 mx-8"></div>
          
          {/* Horizontal divider - visible only on mobile/tablet */}
          <div className="lg:hidden w-full h-px bg-gray-700 my-6"></div>

          {/* Right: Upload Button */}
          <div className="flex justify-center lg:items-center">
            <button 
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-2xl flex items-center gap-3 text-lg font-semibold transition-colors w-full md:w-auto justify-center"
              onClick={() => navigate("/file-upload")}
            >
              <span>Update New Data</span> <Upload size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousData;