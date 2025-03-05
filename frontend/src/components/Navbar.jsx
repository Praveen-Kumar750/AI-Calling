// import { FaPhoneAlt } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Navbar = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     // Check if user is logged in (e.g., by checking token in localStorage)
//     const token = localStorage.getItem("token");
//     setIsAuthenticated(!!token); // Convert to boolean
//   }, [location.pathname]); 

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // Clear authentication token
//     setIsAuthenticated(false);
//     navigate("/"); // Redirect to login page
//   };

//   const handleScrollToDemo = (e) => {
//     e.preventDefault();
//     if (location.pathname === "/") {
//       const demoSection = document.getElementById("schedule-demo");
//       if (demoSection) {
//         demoSection.scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       window.location.href = "/#schedule-demo";
//     }
//   };

//   const handleScrollToFeatures = (e) => {
//     e.preventDefault();
//     if (location.pathname === "/") {
//       const demoSection = document.getElementById("features");
//       if (demoSection) {
//         demoSection.scrollIntoView({ behavior: "smooth" });
//       }
//     } else {
//       window.location.href = "/#features";
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-[100%] z-50 bg-black text-white p-4 flex justify-between items-center">
//       {/* Left Side - Logo */}
//       <div onClick={()=>navigate("/")} className="flex items-center space-x-2 cursor-pointer">
//         <FaPhoneAlt className="text-white" />
//         <span className="text-2xl font-semibold">AI Calling</span>
//       </div>

//       {/* Center - Navigation Links */}
//       <div className="hidden md:flex space-x-6 text-white px-4 py-2 rounded-md">
//         <span onClick={handleScrollToFeatures} className="hover:text-gray-300 cursor-pointer text-2xl font-thin">Features</span>
//         <Link to="/pricing" className="hover:text-gray-300 text-2xl font-thin">Pricing</Link>

//         {isAuthenticated ? (
          
//           <Link to="/dashboard" className="hover:text-gray-300 text-2xl font-thin">Profile</Link>
//         ) : (
//           <Link to="/login" className="hover:text-gray-300 text-2xl font-thin">Profile</Link>
//         )}

// {/* <Link to="/login" className="hover:text-gray-300 text-2xl font-thin">Profile</Link> */}

//         <button 
//           onClick={handleScrollToDemo} 
//           className="bg-pink-600 hover:bg-pink-700 text-white cursor-pointer px-4 py-2 rounded-md text-xl font-thin"
//         >
//           Book a Demo
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;






import { FaPhoneAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleScrollToDemo = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const demoSection = document.getElementById("schedule-demo");
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#schedule-demo";
    }
  };

  const handleScrollToFeatures = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const demoSection = document.getElementById("features");
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = "/#features";
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent md:bg-black text-white p-4 flex justify-between items-center transition-all duration-300 backdrop-blur-md bg-opacity-50 md:bg-opacity-100">
      {/* Left Side - Logo */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <FaPhoneAlt className="text-white" />
        <span className="text-2xl font-semibold">AI Calling</span>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-6 text-white px-4 py-2 rounded-md">
        <span
          onClick={handleScrollToFeatures}
          className="hover:text-gray-300 cursor-pointer text-2xl font-thin"
        >
          Features
        </span>
        <Link to="/pricing" className="hover:text-gray-300 text-2xl font-thin">
          Pricing
        </Link>

        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="hover:text-gray-300 text-2xl font-thin"
          >
            Profile
          </Link>
        ) : (
          <Link to="/login" className="hover:text-gray-300 text-2xl font-thin">
            Profile
          </Link>
        )}

        <button
          onClick={handleScrollToDemo}
          className="bg-pink-600 hover:bg-pink-700 text-white cursor-pointer px-4 py-2 rounded-md text-xl font-thin"
        >
          Book a Demo
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 bg-black w-52 p-4 rounded-lg shadow-lg flex flex-col space-y-4 md:hidden">
          <span
            onClick={handleScrollToFeatures}
            className="hover:text-gray-300 cursor-pointer text-center text-lg font-thin"
          >
            Features
          </span>
          <Link
            to="/pricing"
            className="hover:text-gray-300 text-lg text-center font-thin"
          >
            Pricing
          </Link>

          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="hover:text-gray-300 text-lg text-center font-thin"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="hover:text-gray-300 text-lg text-center font-thin"
            >
              Profile
            </Link>
          )}

          <button
            onClick={handleScrollToDemo}
            className="bg-pink-600 hover:bg-pink-700 text-white cursor-pointer px-4 py-2 rounded-md text-lg font-thin"
          >
            Book a Demo
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
