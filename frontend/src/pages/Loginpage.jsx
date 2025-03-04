import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Loginpage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", formData);
  
      // Assuming the response contains a token
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        setMessage("Login successful");
        navigate("/dashboard"); // Redirect to home page or dashboard
      } else {
        setMessage("Login failed. No token received.");
      }
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.message === "User not found") {
        setMessage("User not found. Please register.");
      } else {
        setMessage(error.response?.data?.message || "Error logging in");
      }
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e] px-6">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Login</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-gray-300">Username/Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your Email"
            className="w-full p-3 mb-4 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <label className="block mb-2 text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="************"
            className="w-full p-3 mb-6 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition cursor-pointer"
          >
            Login
          </button>

          {showRegister && (
            <button
              onClick={() => navigate("/register")}
              className="w-full bg-blue-600 text-white p-3 rounded-md mt-4 hover:bg-blue-700 transition cursor-pointer"
            >
              Register
            </button>
          )}

          <div className="flex justify-between items-center mt-4">
            <p
              className="text-gray-400 cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </p>
            <button
              onClick={() => navigate("/register")}
              className="text-blue-400 hover:underline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;
