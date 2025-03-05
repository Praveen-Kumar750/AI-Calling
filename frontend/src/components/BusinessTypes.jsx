


import { FaBuilding, FaBriefcase, FaCity, FaUtensils, FaClipboardList, FaPlane } from "react-icons/fa";

const BusinessTypes = () => {
  const businesses = [
    { icon: <FaBuilding className="w-16 h-12" />, name: "Govt. Offices" },
    { icon: <FaBriefcase className="w-16 h-12" />, name: "Private Businesses" },
    { icon: <FaCity className="w-16 h-12" />, name: "MNCs" },
    { icon: <FaUtensils className="w-16 h-12" />, name: "Hotels & Restaurants" },
    { icon: <FaClipboardList className="w-16 h-12" />, name: "Event Managers" },
    { icon: <FaPlane className="w-16 h-12" />, name: "Travel Agencies" },
  ];

  return (
    <div className="bg-black text-white py-12 px-6 text-center">
      <div className="flex flex-col w-[90%]  justify-center mx-auto bg-[linear-gradient(103.89deg,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0.1)_162.2%)] text-white p-6 md:p-10 rounded-xl border border-white shadow-lg">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-2 mx-auto">
          Built for all types of business
        </h2>
        <p className="text-lg md:text-2xl my-2 text-gray-400 mb-6 mx-auto">
          AI Powered Customer Care solution for your business!
        </p>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 lg:flex-nowrap">
          {businesses.map((business, index) => (
            <div 
              key={index} 
              className="flex flex-col cursor-pointer items-center w-40 h-32 sm:w-48 sm:h-36 bg-[linear-gradient(103.89deg,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0.1)_162.2%)] p-4 sm:p-6 rounded-lg transition-transform duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105">
              {business.icon}
              <p className="mt-2 text-center font-medium text-sm sm:text-lg">
                {business.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessTypes;
