import React from 'react'
import { FaArrowUp } from "react-icons/fa";
const ClientNavbar = () => {
  return (
    <>
    <nav className="flex justify-between items-center p-4 bg-gray-800">
    <h1 className="text-[30px] font-bold">Ai Calling</h1>
    <div className="space-x-6">
      <a href="#" className="text-gray-300 text-[30px] hover:text-white">Dashboard</a>
      <a href="#" className="text-gray-300 text-[30px] hover:text-white">Incoming</a>
      <a href="#" className="text-gray-300 text-[30px] hover:text-white">Outgoing</a>
      <a href="#" className="text-gray-300 text-[30px] hover:text-white">Billing</a>
    </div>
    <button className="bg-purple-600 px-4 py-2 rounded-[100px] flex gap-2 text-white text-xl hover:bg-purple-700">Data <FaArrowUp className="text-xl text-white mt-1 " /></button>
  </nav>
  
  </>
  )
}

export default ClientNavbar