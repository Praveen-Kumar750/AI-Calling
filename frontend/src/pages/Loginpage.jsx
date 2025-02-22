import React from "react";

const Loginpage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] px-6">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
        
        <form>
          <label className="block mb-2 text-gray-300">Username/Email</label>
          <input
            type="email"
            placeholder="Enter your Email"
            className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <label className="block mb-2 text-gray-300">Password</label>
          <input
            type="password"
            placeholder="************"
            className="w-full p-3 mb-6 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-400 mt-4 cursor-pointer hover:underline">
            Forgot Password?
          </p>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
