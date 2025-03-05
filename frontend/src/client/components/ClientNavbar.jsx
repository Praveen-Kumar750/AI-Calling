

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaArrowUp, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const ClientNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loginDateTime, setLoginDateTime] = useState(null);
  const [activeDuration, setActiveDuration] = useState("0m");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedLoginTime = sessionStorage.getItem("loginDateTime");
    if (!storedLoginTime) {
      const currentTime = new Date().toISOString();
      sessionStorage.setItem("loginDateTime", currentTime);
      setLoginDateTime(currentTime);
    } else {
      setLoginDateTime(storedLoginTime);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (loginDateTime) {
        const diff = Math.floor((new Date() - new Date(loginDateTime)) / 1000);
        const hours = Math.floor(diff / 3600);
        const minutes = Math.floor((diff % 3600) / 60);
        setActiveDuration(`${hours}h ${minutes}m`);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [loginDateTime]);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Incoming", path: "/incoming-calls" },
    { name: "Outgoing", path: "/outgoing-calls" },
    { name: "Billing", path: "/billing-calls" }
  ];

  const handleLogout = () => {
    setShowDropdown(false);
    sessionStorage.removeItem("loginDateTime");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 relative w-full">
      <h1 
        className="text-[24px] md:text-[30px] font-bold text-white cursor-pointer"
        onClick={() => navigate('/')}
      >
        Ai Calling
      </h1>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Nav */}
      <div className={`md:flex md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-gray-800 md:bg-transparent flex-col md:flex-row items-center transition-transform duration-300 ease-in-out ${menuOpen ? 'flex' : 'hidden'}`}>
        {navItems.map(({ name, path }) => (
          <button
            key={path}
            onClick={() => { navigate(path); setMenuOpen(false); }}
            className={`text-[20px] md:text-[30px] my-2 md:my-0 px-4 py-2 text-white w-full md:w-auto text-center ${
              (name === "Incoming" && location.pathname.startsWith("/incoming-")) ||
              (name === "Outgoing" && location.pathname.startsWith("/outgoing-")) ||
              (name === "Billing" && location.pathname.startsWith("/billing-")) ||
              (name === "Dashboard" && location.pathname.startsWith("/dashboard")) ||
              location.pathname === path
                ? "underline"
                : "hover:text-gray-300"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="flex gap-6 items-center relative">
        <button 
          onClick={() => navigate('/file-upload')} 
          className="bg-purple-600 px-4 py-2 rounded-full flex gap-2 text-white text-lg md:text-xl hover:bg-purple-700"
        >
          Data <FaArrowUp className="text-lg md:text-xl mt-1" />
        </button>

        <div className="relative">
          <FaUserCircle 
            className="text-white text-4xl md:text-5xl cursor-pointer hover:text-gray-400"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 text-sm md:text-base">
              <p className="px-2 py-2 text-gray-800 font-bold">
                Login Time: 
              </p>
              <p className="px-2 text-gray-800">{loginDateTime ? new Date(loginDateTime).toLocaleString() : "Loading..."}</p>
              <p className="px-2 py-2 text-gray-800 font-bold">
                Active Time: {activeDuration}
              </p>
              <button 
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                onClick={handleLogout}
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