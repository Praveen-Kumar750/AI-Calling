import React from "react";
import { FaInstagram, FaWhatsapp, FaLinkedin, FaTwitter, FaYoutube,FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white p-8 pt-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-semibold flex items-center gap-2">
            <FaPhoneAlt className="text-white" /> <span >AI Calling</span>
          </h2>
          <p className="text-white-400 mt-2 text-[19px] font-light">
            A pioneering tech company driven by innovation, excellence, and a passion for creating cutting-edge solutions.
          </p>
          <p className="mt-2 text-[19px] font-semibold">team@rnpsoft.com</p>
          <p className="text-gray-400 text-[19px] font-medium">+91 6743154827</p>
        </div>

        {/* Middle Section */}
        <div>
          <h3 className="text-3xl font-semibold">About Us</h3>
          <ul className="mt-2 space-y-2 text-white text-2xl font-light">
            <li><a href="" className="hover:text-gray-300">Home</a></li>
            <li><a href="" className="hover:text-gray-300">Our Team</a></li>
            <li><a href="" className="hover:text-gray-300">Our Services</a></li>
            <li><a href="" className="hover:text-gray-300">Career</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <h3 className="text-3xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <FaInstagram style={{ width: "40px", height: "50px" }} className="text-white text-2xl cursor-pointer hover:text-gray-300" />
            <FaWhatsapp style={{ width: "40px", height: "50px" }} className="text-white text-2xl cursor-pointer hover:text-gray-300" />
            <FaLinkedin style={{ width: "40px", height: "50px" }} className="text-white text-2xl cursor-pointer hover:text-gray-300" />
            <FaTwitter style={{ width: "40px", height: "50px" }} className="text-white text-2xl cursor-pointer hover:text-gray-300" />
            <FaYoutube style={{ width: "40px", height: "50px" }} className="text-white text-2xl cursor-pointer hover:text-gray-300" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-gray-400 mt-6 border-t border-gray-700 pt-4">
        © 2024 RnPsoft, All rights reserved
      </div>
    </footer>
  );
};

export default Footer;