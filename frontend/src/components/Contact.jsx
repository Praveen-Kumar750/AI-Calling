// import { FaWhatsapp, FaEnvelope, FaSms } from "react-icons/fa";

// const Contact = () => {
//   const services = [
//     {
//       icon: <FaWhatsapp className="text-green-400 text-4xl" />, 
//       title: "WhatsApp",
//       description: "Bring AI-powered calling to WhatsApp with seamless integration—smart calls, smarter conversations!"
//     },
//     {
//       icon: <FaEnvelope className="text-red-400 text-4xl" />, 
//       title: "Email",
//       description: "Integrate AI Emailing to connect with your customer effortlessly—revolutionize how you connect."
//     },
//     {
//       icon: <FaSms className="text-yellow-400 text-4xl" />, 
//       title: "SMS",
//       description: "Integrate AI to SMS and connect with your customer effortlessly—revolutionize how you connect."
//     }
//   ];

//   return (
//     <section className="bg-black text-white py-12 px-6 text-center">
//       <h2 className="text-6xl ml-20 font-bold text-left w-[750px] mb-[40px]">Integrations Supported by <span className="text-purple-400">AI Calling</span></h2>
//       <p className="text-[30px] ml-20 text-gray-400 mt-2 w-[700px] text-lg text-left">Ease your Customer Care experience with AI Calling. Any app, any where!</p>
      
//       <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-[200px] justify-center max-w-5xl  ">
//         {services.map((service, index) => (
//           <div 
//             key={index} 
//             className="p-6 ml-20 cursor-pointer rounded-[20px] transition-shadow w-[380px] duration-300 hover:shadow-lg hover:shadow-purple-500/50 bg-[linear-gradient(103.89deg,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0.1)_162.2%)] text-left flex flex-col items-start border-white border-[1px] hover:scale-105 "
//           >
//             {service.icon}
//             <h3 className="text-[35px] font-normal mt-4">{service.title}</h3>
//             <p className="text-gray-400 mt-2 text-[20px]">{service.description}</p>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-end mr-10 mt-5">
//       <button className="mt-6 bg-pink-600 hover:bg-pink-700 cursor-pointer text-white px-6 py-3 rounded-md text-lg ">
//         See all integrations →
//       </button>
//       </div>
//     </section>
//   );
// };

// export default Contact;




import { FaWhatsapp, FaEnvelope, FaSms } from "react-icons/fa";

const Contact = () => {
  const services = [
    {
      icon: <FaWhatsapp className="text-green-400 text-4xl" />, 
      title: "WhatsApp",
      description: "Bring AI-powered calling to WhatsApp with seamless integration—smart calls, smarter conversations!"
    },
    {
      icon: <FaEnvelope className="text-red-400 text-4xl" />, 
      title: "Email",
      description: "Integrate AI Emailing to connect with your customer effortlessly—revolutionize how you connect."
    },
    {
      icon: <FaSms className="text-yellow-400 text-4xl" />, 
      title: "SMS",
      description: "Integrate AI to SMS and connect with your customer effortlessly—revolutionize how you connect."
    }
  ];

  return (
    <section className="bg-black text-white py-12 px-6 text-center">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-left mb-8">
          Integrations Supported by <span className="text-purple-400">AI Calling</span>
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 text-left max-w-3xl">
          Ease your Customer Care experience with AI Calling. Any app, anywhere!
        </p>
      </div>
      
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16 px-6 md:px-12 lg:px-20">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="p-6 cursor-pointer rounded-[20px] transition-shadow duration-300 hover:shadow-lg hover:shadow-purple-500/50 bg-[linear-gradient(103.89deg,_rgba(255,255,255,0.25)_0%,_rgba(255,255,255,0.1)_162.2%)] text-left flex flex-col items-start border-white border-[1px] hover:scale-105 "
          >
            {service.icon}
            <h3 className="text-2xl sm:text-3xl md:text-[35px] font-normal mt-4">{service.title}</h3>
            <p className="text-gray-400 mt-2 text-base md:text-lg">{service.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center md:justify-end mt-8 px-6 md:px-12 lg:px-20">
        <button className="mt-6 bg-pink-600 hover:bg-pink-700 cursor-pointer text-white px-6 py-3 rounded-md text-lg">
          See all integrations →
        </button>
      </div>
    </section>
  );
};

export default Contact;