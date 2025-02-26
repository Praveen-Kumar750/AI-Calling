import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowUp, FaUserCircle } from "react-icons/fa";

const ClientNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Incoming", path: "/incoming-calls" }, // Default to Calls page
    { name: "Outgoing", path: "/outgoing-calls" }, // Default to Calls page
    { name: "Billing", path: "/billing-calls" }
  ];

  // Mocked login time (replace with real data)
  const totalLoginTime = "2h 45m";

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 relative">
      {/* Title */}
      <h1 
        className="text-[30px] font-bold text-white cursor-pointer"
        onClick={() => navigate('/')}
      >
        Ai Calling
      </h1>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        {navItems.map(({ name, path }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`text-[30px] cursor-pointer px-2 ${
              (name === "Incoming" && location.pathname.startsWith("/incoming-")) ||
              (name === "Outgoing" && location.pathname.startsWith("/outgoing-")) ||
              (name === "Billing" && location.pathname.startsWith("/billing-")) ||
              (name === "Dashboard" && location.pathname.startsWith("/dashboard")) ||
              location.pathname === path
                ? "text-white underline"
                : "text-gray-300 hover:text-white"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Upload Button & Profile Icon */}
      <div className="flex gap-6 items-center relative">
        <button 
          onClick={() => navigate('/file-upload')} 
          className="bg-purple-600 px-4 py-2 rounded-[100px] flex gap-2 text-white text-xl hover:bg-purple-700"
        >
          Data <FaArrowUp className="text-xl text-white mt-1" />
        </button>

        {/* Profile Icon */}
        <div className="relative">
          <FaUserCircle 
            className="text-white text-5xl cursor-pointer hover:text-gray-400"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2">
              <p className="px-4 py-2 text-gray-800">Total Login Time: {totalLoginTime}</p>
              <button 
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                onClick={() => {
                  setShowDropdown(false);
                  alert("Logged out! (Replace with real logout function)");
                }}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
