const InService = () => {
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
          
          {/* Left Side - Content */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-purple-400">In-Coming Services:</h2>
            <ul className="mt-6 space-y-3 text-lg text-gray-300">
              <li>🔹 Automated real-time query handling.</li>
              <li>🔹 Omni-channel support for calls, messages, and emails.</li>
              <li>🔹 Smart routing to appropriate departments.</li>
              <li>🔹 24/7 availability for uninterrupted support.</li>
              <li>🔹 Customizable responses matching brand tone.</li>
              <li>🔹 Scalable for high traffic volumes.</li>
              <li>🔹 Secure and compliant data handling.</li>
            </ul>
            <button className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md text-lg">
              Experience more
            </button>
          </div>
  
          {/* Right Side - Image */}
          <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
            <img
              src="https://storage.googleapis.com/jwelleryrnpsoft/incoming.png"
              alt="AI In-Coming Service"
              className="max-w-md"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default InService;
  