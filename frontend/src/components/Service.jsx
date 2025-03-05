const Service = () => {
  const handleScrollToFeatures = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      const demoSection = document.getElementById("features");
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Redirect to homepage and scroll after navigation
      window.location.href = "/#schedule-demo";
    }
  };
    return (
      <section className="bg-[#090909] text-white py-16 px-10"
      style={{
        //backgroundImage: "url('https://storage.googleapis.com/jwelleryrnpsoft/image%2013.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 1.2,
      }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Side - Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://storage.googleapis.com/jwelleryrnpsoft/image%2014.png"
              alt="AI Calling Service"
              className="max-w-md"
            />
          </div>
  
          {/* Right Side - Content */}
          <div className="md:w-1/2 mt-10 md:mt-0">
            <h2 className="text-4xl font-bold text-purple-400">Out-Going Services:</h2>
            <ul className="mt-6 space-y-3 text-lg text-gray-300">
              <li>🔹 Personalized Messaging: Tailor content for each user.</li>
              <li>🔹 Multi-Channel Communication: Via email and SMS.</li>
              <li>🔹 Real-Time Analytics: Track performance live.</li>
              <li>🔹 Real-Time Response: Instant engagement handling.</li>
              <li>🔹 Scalability: Handles high traffic effortlessly.</li>
              <li>🔹 Secure Data: Advanced encryption and compliance.</li>
              <li>🔹 24/7 Support: Always available, uninterrupted service.</li>
            </ul>
            <button onClick={handleScrollToFeatures} className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md text-lg cursor-pointer">
              Experience more →
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  
  export default Service;
  