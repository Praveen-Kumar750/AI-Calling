import React, { useState, useEffect } from "react";
import axios from "axios";

const ScheduleDemo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  
  const [notifyEmail, setNotifyEmail] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {  // Mark function as async
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.message) {
        alert("Fill up the entire form");
        return;
    }
    try {
        await axios.post("http://localhost:5000/api/demo", formData);
        alert("Demo Scheduled!");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};


  const handleNotifyMe = () => {
    if (notifyEmail.trim() === "") {
      alert("Please enter a valid email address.");
      return;
    }
    alert("Thank you! You will be notified when Smart Serve AI launches.");
    setNotifyEmail("");
  };

  return (
    <div id="schedule-demo" className="flex flex-col items-center justify-center bg-black px-6 py-10">
      <div
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-5 bg-black text-white rounded-lg"
        style={{
          backgroundImage: "url('https://storage.googleapis.com/jwelleryrnpsoft/image%2013.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 1.2,
        }}
      >
        <div className="pl-[100px]">
          <h2 className="text-[40px] font-bold text-white mb-6">
            Schedule a Free <br /> <span className="text-gray-300">Demo</span>
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span>First Name</span>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none"
                />
              </div>
              <div>
                <span>Last Name</span>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none"
                />
              </div>
            </div>
            <div>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none"
              />
            </div>
            <div>
              <span>Phone Number</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none"
              />
            </div>
            <div>
              <span>Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="p-3 rounded-lg w-full bg-[#FCFCFC] text-black focus:outline-none h-24"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white text-[15px] px-7 py-2 rounded-md hover:bg-purple-700 transition cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="flex justify-center items-center">
          <img
            src="https://storage.googleapis.com/jwelleryrnpsoft/Frame.png"
            alt="Demo Illustration"
            className="w-full max-w-lg"
          />
        </div>
      </div>

      <div
        className="text-center text-white w-full"
        style={{
          backgroundImage: "url('https://storage.googleapis.com/jwelleryrnpsoft/image%2013.png')",
          backgroundSize: "cover",
          backgroundPosition: "left",
          opacity: 1.2,
        }}
      >
        <h2 className="text-[50px] font-medium mb-2 mt-5">Be the First to Know</h2>
        <p className="mb-4 text-white text-[30px] font-light">
          Sign up to get early access or be notified when Smart Serve AI launches.
        </p>
        <div className="flex justify-center items-center gap-2 mt-6 mb-16">
          <input
            type="email"
            placeholder="Enter your email"
            value={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.value)}
            className="p-3 rounded-md w-[400px] text-white focus:outline-white border-[1px] border-white"
          />
          <button
            type="button"
            onClick={handleNotifyMe}
            className="bg-[linear-gradient(90deg,_#9C0480_0%,_#A33D90_100%)] cursor-pointer text-white px-4 py-2 rounded-md text-[25px] hover:bg-purple-700 transition"
          >
            Notify Me
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleDemo;