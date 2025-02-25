
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowUp } from "react-icons/fa";

const ClientNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800">
      <h1 className="text-[30px] font-bold text-white">Ai Calling</h1>
      <div className="space-x-6">
        <button onClick={() => navigate('/dashboard')} className="text-gray-300 text-[30px] hover:text-white">Dashboard</button>
        <button onClick={() => navigate('/incoming-calls')} className="text-gray-300 text-[30px] hover:text-white">Incoming</button>
        <button onClick={() => navigate('/outgoing-calls')} className="text-gray-300 text-[30px] hover:text-white">Outgoing</button>
        <button onClick={() => navigate('/billing-calls')} className="text-gray-300 text-[30px] hover:text-white">Billing</button>
      </div>
      {/* <button className="bg-purple-600 px-4 py-2 rounded-[100px] flex gap-2 text-white text-xl hover:bg-purple-700">
        Data <FaArrowUp className="text-xl text-white mt-1 " />
      </button> */}

      <button 
        onClick={() => navigate('/file-upload')} 
        className="bg-purple-600 px-4 py-2 rounded-[100px] flex gap-2 text-white text-xl hover:bg-purple-700"
      >
        Data <FaArrowUp className="text-xl text-white mt-1" />
      </button>
    </nav>
  );
};

export default ClientNavbar;
