import { FaBuilding, FaBriefcase, FaCity, FaUtensils, FaClipboardList, FaPlane } from "react-icons/fa";

const BusinessTypes = () => {
  const businesses = [
    { icon: <FaBuilding style={{ width: "90px", height: "50px" }}/>, name: "Govt. Offices" },
    { icon: <FaBriefcase style={{ width: "90px", height: "50px" }} />, name: "Private Businesses" },
    { icon: <FaCity style={{ width: "90px", height: "50px" }} />, name: "MNCs" },
    { icon: <FaUtensils style={{ width: "90px", height: "50px" }} />, name: "Hotels & Restaurants" },
    { icon: <FaClipboardList style={{ width: "90px", height: "50px" }} />, name: "Event Managers" },
    { icon: <FaPlane style={{ width: "90px", height: "50px" }} />, name: "Travel Agencies" },
  ];

  return (
    <div className="bg-black text-white py-12 px-6 text-center">
        <div className="flex flex-col w-[86%]  justify-center h-[480px] mx-auto bg-[linear-gradient(103.89deg,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0.1)_162.2%)] text-white p-10 rounded-xl border-white border-[1px] shadow-lg">
      <h2 className="text-6xl w-[700px] font-semibold mb-2 mx-auto">Built for all types of business</h2>
      <p className="text-2xl my-[5px] text-gray-400 mb-6 mx-auto">AI Powered Customer Care solution for your business!</p>

      <div className="flex gap-[25px] w-[100px] justify-center mx-auto pb-[30px]">
        {businesses.map((business, index) => (
          <div 
            key={index} 
            className=" flex flex-col cursor-pointer items-center w-[180px] h-[130px] bg-[linear-gradient(103.89deg,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0.1)_162.2%)] p-6 rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-purple-500/50">
            {business.icon}
            <p className="mt-2 text-center align-center leading-[17px] font-medium text-lg">{business.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BusinessTypes;
