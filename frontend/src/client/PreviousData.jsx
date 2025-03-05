import { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import ClientNavbar from "./components/ClientNavbar";

const PreviousData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/files/uploads") // Adjust the API URL as needed
      .then((res) => res.json())
      .then((files) => {
        const formattedData = files.map((file) => ({
          date: file.uploadDate.split("T")[0], // Assuming MongoDB stores date in ISO format
          time: new Date(file.uploadDate).toLocaleTimeString(),
          file: file.filename,
          service: file.serviceType, // Ensure your model has this field
        }));
        setData(formattedData);
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div>
      <ClientNavbar />
      <div className="p-6 bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <div className="flex w-full max-w-5xl gap-8">
          {/* Left: Table Section */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">PREVIOUS DATA</h2>
            <div className="border border-gray-600 rounded-md p-4 overflow-x-auto">
              <table className="w-full border-collapse text-center">
                <thead className="bg-gray-800">
                  <tr>
                    {["DATE", "TIME", "FILE TYPE", "SERVICES"].map((header, i) => (
                      <th key={i} className="px-4 py-2 border border-gray-700">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, index) => (
                    <tr key={index} className="bg-gray-900">
                      <td className="px-4 py-2 border border-gray-700">{row.date}</td>
                      <td className="px-4 py-2 border border-gray-700">{row.time}</td>
                      <td className="px-4 py-2 border border-gray-700">{row.file}</td>
                      <td className="px-4 py-2 border border-gray-700">{row.service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: Upload Button */}
          <div className="flex items-center justify-center border-l border-gray-600 pl-8">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 text-lg font-semibold">
              Update New Data <Upload size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousData;
