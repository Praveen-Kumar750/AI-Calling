import { Upload } from "lucide-react";
import ClientNavbar from "./components/ClientNavbar";

const PreviousData = () => {
  const data = [
    { date: "01-01-2000", time: "01-01-2000", file: "abc.csv", service: "Call" },
    { date: "01-01-2000", time: "01-01-2000", file: "abc.txt", service: "Call" },
    { date: "01-01-2001", time: "03-01-2000", file: "bcd.txt", service: "Message" },
    { date: "01-01-2001", time: "03-01-2000", file: "bcd.csv", service: "Message" },
    { date: "01-01-2001", time: "03-01-2000", file: "bcd.csv", service: "Message" },
    { date: "01-01-2001", time: "03-01-2000", file: "bcd.csv", service: "Message" },
  ];

  // Group data by date and time to calculate row spans
  const groupedData = [];
  let lastDate = null;
  let lastTime = null;
  let dateRowSpan = 0;
  let timeRowSpan = 0;

  data.forEach((entry, index) => {
    if (entry.date !== lastDate) {
      dateRowSpan = data.filter((e) => e.date === entry.date).length;
      lastDate = entry.date;
    } else {
      dateRowSpan = 0;
    }

    if (entry.time !== lastTime) {
      timeRowSpan = data.filter((e) => e.time === entry.time && e.date === entry.date).length;
      lastTime = entry.time;
    } else {
      timeRowSpan = 0;
    }

    groupedData.push({ ...entry, dateRowSpan, timeRowSpan });
  });

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
                {groupedData.map((row, index) => (
                  <tr key={index} className="bg-gray-900">
                    {row.dateRowSpan > 0 && (
                      <td rowSpan={row.dateRowSpan} className="px-4 py-2 border border-gray-700">
                        {row.date}
                      </td>
                    )}
                    {row.timeRowSpan > 0 && (
                      <td rowSpan={row.timeRowSpan} className="px-4 py-2 border border-gray-700">
                        {row.time}
                      </td>
                    )}
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
