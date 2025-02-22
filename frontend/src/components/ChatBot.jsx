import React, { useState } from "react";
import axios from "axios";
import {
  FaRegUser,
  FaTimes,
  FaPaperPlane,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, How can I help you?" },
  ]);
  const [input, setInput] = useState("");

    const API_KEY = "AIzaSyA9-wB05fSqmui6EoWgML88lo8-xQWIZHQ";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMaximized(false); // Reset maximize when reopened
  };

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post(GEMINI_API_URL, {
        contents: [{ role: "user", parts: [{ text: input }] }],
      });

      // Extract bot reply properly
      const botReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn't understand that.";

      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error: Unable to get response." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-15 right-10 z-50">
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
        className="w-14 h-14 bg-black border-purple-400 border rounded-full flex items-center justify-center cursor-pointer text-white text-2xl shadow-[0_0_20px_5px_#C061FF]"
          onClick={toggleChat}
        >
          <svg
            width="32"
            height="31"
            viewBox="0 0 32 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.61138 2.13172C5.22666 3.43854 3.99128 4.25554 3.16059 4.414C0.818275 4.86088 0.844495 4.75941 0.844495 13.4158C0.844495 20.0966 0.937215 21.4148 1.44148 21.9195C1.90014 22.3777 2.87103 22.5164 5.62147 22.5164H9.20449V24.3758C9.20449 25.7206 9.37093 26.299 9.80565 26.4658C10.1363 26.5927 12.9578 26.6964 16.0757 26.6964H21.7445V28.3304C21.7445 31.5943 23.5339 31.7607 26.6522 28.7864C28.1521 27.3557 29.1534 26.6964 29.8267 26.6964C31.9087 26.6964 32.0045 26.2708 32.0045 17.0007C32.0045 6.7681 32.2998 7.31644 26.7898 7.31644C23.518 7.31644 23.2645 7.26172 23.2645 6.55644C23.2645 6.13844 22.9225 5.45444 22.5045 5.03644C21.8167 4.34864 21.238 4.27644 16.4245 4.27644H11.1045V2.78342C11.1045 1.2391 10.354 0.0964355 9.33902 0.0964355C9.02514 0.0964355 7.79736 1.01224 6.61138 2.13172ZM7.11449 3.57762C5.59981 5.0068 4.45183 5.77212 3.69449 5.85761L2.55449 5.98644L2.45151 13.4914L2.34854 20.9964H12.0465H21.7445V13.3964V5.79644H15.6835H9.62249L9.50849 3.61144L9.3945 1.42644L7.11449 3.57762ZM4.42067 9.02644C4.28957 9.54894 4.28957 10.4039 4.42067 10.9264C4.65741 11.8707 4.68515 11.8764 9.02171 11.8764H13.3845V9.97644V8.07644H9.02171C4.68515 8.07644 4.65741 8.08214 4.42067 9.02644ZM23.2645 14.8317C23.2645 22.9808 23.6791 22.5164 16.4028 22.5164H10.7245V23.8464V25.1764H16.9945H23.2645V27.2664C23.2645 28.4159 23.3986 29.3564 23.5624 29.3564C23.7262 29.3564 24.7894 28.4159 25.9245 27.2664C27.5935 25.5762 28.2273 25.1764 29.2366 25.1764H30.4845V17.0064V8.83644H26.8745H23.2645V14.8317ZM4.51796 12.8899C4.37849 13.029 4.2645 13.371 4.2645 13.6499C4.2645 14.055 5.78449 14.1564 11.8645 14.1564C19.211 14.1564 19.4645 14.131 19.4645 13.3964C19.4645 12.6627 19.211 12.6364 12.118 12.6364C8.07703 12.6364 4.65703 12.7504 4.51796 12.8899ZM4.3367 15.9614C4.45184 16.5596 5.03779 16.6264 10.1545 16.6264C15.2712 16.6264 15.8572 16.5596 15.9723 15.9614C16.0897 15.3512 15.6124 15.2964 10.1545 15.2964C4.69655 15.2964 4.21928 15.3512 4.3367 15.9614ZM4.2645 18.3364C4.2645 19.071 4.51795 19.0964 11.8645 19.0964C19.211 19.0964 19.4645 19.071 19.4645 18.3364C19.4645 17.6019 19.211 17.5764 11.8645 17.5764C4.51795 17.5764 4.2645 17.6019 4.2645 18.3364Z"
              fill="url(#paint0_linear_807_5057)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_807_5057"
                x1="16.4259"
                y1="0.0964355"
                x2="16.4259"
                y2="30.9035"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#9C0480" />
                <stop offset="0.364" stop-color="#BA68C8" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className={`fixed bottom-15 right-10 bg-white shadow-lg border border-gray-300 flex flex-col transition-all duration-300
          ${isMaximized ? "w-1/3 h-4/5" : "w-80 h-96"} `}
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 p-1 bg-white rounded-full flex  justify-right">
                <img src="https://storage.googleapis.com/jwelleryrnpsoft/customer-support.png" />
              </div>
              <h2 className="text-lg font-semibold">Assistant</h2>
            </div>

            {/* Header Icons */}
            <div className="flex gap-3">
              {isMaximized ? (
                <FaCompress
                  className="cursor-pointer text-lg"
                  onClick={toggleMaximize}
                />
              ) : (
                <FaExpand
                  className="cursor-pointer text-lg"
                  onClick={toggleMaximize}
                />
              )}
              <FaTimes
                className="cursor-pointer text-lg"
                onClick={toggleChat}
              />
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 space-y-3 custom-scroll overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "bot" && (
                  <img
                    src="https://storage.googleapis.com/jwelleryrnpsoft/customer-support.png"
                    style={{ marginRight: "10px" }}
                    alt="Bot Icon"
                  />
                )}
                <div
                  className={`px-4 py-2 rounded-lg text-sm ${
                    msg.sender === "bot"
                      ? "bg-gray-200 text-black"
                      : "bg-purple-500 text-white"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full border-2 border-purple-700 bg-white-900 text-purple-700 ml-2">
                    <FaRegUser className="text-lg" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="border-t p-2 flex items-center">
            <input
              type="text"
              placeholder="Write Message..."
              className="w-full p-2 outline-none text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="p-2 text-purple-600 hover:text-purple-700"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
