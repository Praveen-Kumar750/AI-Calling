import { FaBuilding, FaBriefcase, FaCity, FaUtensils, FaClipboardList, FaPlane } from "react-icons/fa";

const BusinessTypes = () => {
  const businesses = [
    { icon: <FaBuilding size={30} />, name: "Govt. Offices" },
    { icon: <FaBriefcase size={30} />, name: "Private Businesses" },
    { icon: <FaCity size={30} />, name: "MNCs" },
    { icon: <FaUtensils size={30} />, name: "Hotels & Restaurants" },
    { icon: <FaClipboardList size={30} />, name: "Event Managers" },
    { icon: <FaPlane size={30} />, name: "Travel Agencies" },
  ];

  return (
    <div className="bg-black text-white py-12 px-6 text-center">
        <div className="flex flex-col w-[80%] mx-auto bg-[linear-gradient(103.89deg,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0.1)_162.2%)] text-white p-10 rounded-xl border-white border-[1px] shadow-lg">
      <h2 className="text-6xl w-[700px] font-semibold mb-2 mx-auto">Built for all types of business</h2>
      <p className="text-2xl my-[5px] text-gray-400 mb-6 mx-auto">AI Powered Customer Care solution for your business!</p>

      <div className="flex gap-[20px] w-[100px] justify-center mx-auto">
        {businesses.map((business, index) => (
          <div 
            key={index} 
            className=" flex flex-col items-center w-[120px] bg-[linear-gradient(103.89deg,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0.1)_162.2%)] p-6 rounded-lg transition-shadow duration-300 hover:shadow-lg hover:shadow-purple-500/50">
            {business.icon}
            <p className="mt-2 text-center align-center leading-[17px] text-lg">{business.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default BusinessTypes;
