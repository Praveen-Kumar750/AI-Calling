import { FaPhoneAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const handleScrollToDemo = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const demoSection = document.getElementById("schedule-demo");
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Redirect to homepage and scroll after navigation
      window.location.href = "/#schedule-demo";
    }
  };

  return (
    <nav className=" fixed top-0 left-0 w-full z-50 bg-black text-white p-4 flex justify-between items-center">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-2">
        <FaPhoneAlt className="text-white" />
        <span className="text-lg font-semibold">AI Calling</span>
      </div>

      {/* Center - Navigation Links */}
      <div className="hidden md:flex space-x-6 text-white px-4 py-2 rounded-md">
        <a href="#features" className="hover:text-gray-300 text-xl font-thin">Features</a>
        <Link to="/pricing" className="hover:text-gray-300 text-xl font-thin">Pricing</Link>
        <Link to="/login" className="hover:text-gray-300 text-xl font-thin">Profile</Link>
        <button 
          onClick={handleScrollToDemo} 
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-xl font-thin"
        >
          Book a Demo
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
