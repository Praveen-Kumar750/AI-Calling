import { FaPhoneAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4 flex justify-between items-center">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-2">
        <FaPhoneAlt className="text-white" />
        <span className="text-lg font-semibold">AI Calling</span>
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex space-x-6 text-white px-4 py-2 rounded-md">
        <a href="#" className="hover:text-gray-300 text-xl font-thin">Features</a>
        <a href="#" className="hover:text-gray-300 text-xl font-thin">Pricing</a>
        <a href="#" className="hover:text-gray-300 text-xl font-thin">Profile</a>
        <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 text-xl rounded-md font-thin">
        Book a Demo
      </button>
      </div>

      {/* Right Side - Button */}
      
    </nav>
  );
};

export default Navbar;
