import { Link, useLocation } from "react-router-dom";

const Hero = () => {
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
    <section
      className="bg-black text-white min-h-screen flex items-center px-10"
      style={{
        backgroundImage: "url('https://storage.googleapis.com/jwelleryrnpsoft/image%2013.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 1.2,
      }}
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between bg-opacity-70 p-10 rounded-lg">
        {/* Left Content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400">
            AI-Powered Customer <br /> Care Solution
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Personalized responses via calls and messages. Customizable for both outgoing and incoming communications.
          </p>
          <button 
            onClick={handleScrollToDemo} 
            className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-xl font-thin cursor-pointer"
          >
            Book a Demo
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src="https://storage.googleapis.com/jwelleryrnpsoft/Group.png"
            alt="AI Assistant"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
