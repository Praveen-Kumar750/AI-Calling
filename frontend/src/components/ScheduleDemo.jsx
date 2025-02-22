import React from "react";

const ScheduleDemo = () => {
  return (
    <div id="schedule-demo" className="flex flex-col items-center justify-center bg-black px-6 py-10">
        
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 bg-black text-white rounded-lg"
       style={{
        backgroundImage: "url('https://storage.googleapis.com/jwelleryrnpsoft/image%2013.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 1.2,
      }}>
        {/* Left Section: Form */}
        <div className="pl-[100px] ">
          <h2 className="text-[40px] font-bold text-white mb-6">
            Schedule a Free <br /> <span className="text-gray-300">Demo</span>
          </h2>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span>First Name</span>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none"
                />
              </div>
              <div>
                <span>Last Name</span>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none"
                />
              </div>
            </div>
            <div>
              <span>Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none"
              />
            </div>
            <div>
              <span>Phone Number</span>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none"
              />
            </div>
            <div>
              <span>Message</span>
              <textarea
                placeholder="Enter your message"
                className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none h-24"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[linear-gradient(180deg,_#A33D90_0%,_#885B80_100%)] text-white text-[15px] px-7 py-2 rounded-md hover:bg-purple-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
        {/* Right Section: Illustration */}
        <div className="flex justify-center items-center">
          <img
            src="https://storage.googleapis.com/jwelleryrnpsoft/Frame.png"
            alt="Demo Illustration"
            className="w-full max-w-lg"
          />
        </div>
      </div>

      {/* Be the First to Know Section */}
      <div className="text-center text-white w-full"
        style={{
          backgroundImage: "url('https://storage.googleapis.com/jwelleryrnpsoft/image%2013.png')",
          backgroundSize: "cover",
          backgroundPosition: "left",
          opacity: 1.2,
        }}>
        <h2 className="text-[50px] font-medium mb-2 mt-5">Be the First to Know</h2>
        <p className="mb-4 text-white text-[30px] font-light">
          Sign up to get early access or be notified when Smart Serve AI launches.
        </p>
        <div className="flex justify-center items-center gap-2 mt-6 mb-16">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-md w-[400px] text-white focus:outline-white border-[1px] border-white"
          />
          <button
            type="submit"
            className="bg-[linear-gradient(90deg,_#9C0480_0%,_#A33D90_100%)] text-white px-4 py-2 rounded-md text-[25px] hover:bg-purple-700 transition"
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDemo;
