import { FaPhoneAlt, FaComments, FaCogs, FaCalendarAlt, FaUsers, FaLandmark } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaPhoneAlt className="text-purple-400 text-4xl mb-3" />,
      title: "AI Calling",
      description:
        "Make outgoing calls from a toll-free number for credit card sales and handle incoming customer care calls.",
    },
    {
      icon: <FaComments className="text-purple-400 text-4xl mb-3" />,
      title: "Personalized Messaging",
      description:
        "Send and receive personalized messages powered by AI for efficient customer communication.",
    },
    {
      icon: <FaCogs className="text-purple-400 text-4xl mb-3" />,
      title: "Customizable",
      description:
        "Tailor the app to your specific business needs and communication preferences.",
    },
    {
      icon: <FaCalendarAlt className="text-purple-400 text-4xl mb-3" />,
      title: "Scheduling",
      description:
        "Set up and manage call schedules for outgoing campaigns and incoming support.",
    },
    {
      icon: <FaUsers className="text-purple-400 text-4xl mb-3" />,
      title: "Team Management",
      description:
        "Efficiently manage your customer care team with AI assistance.",
    },
    {
      icon: <FaLandmark className="text-purple-400 text-4xl mb-3" />,
      title: "Government Focused",
      description:
        "Specially designed features for government agencies and public sector organizations.",
    },
  ];

  return (
    <section className="bg-black text-white py-16 px-10 flex justify-center">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center place-items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className=" p-6 rounded-lg transition-shadow flex flex-col items-center justify-center text-center duration-300 hover:shadow-lg hover:shadow-purple-500/50"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold text-white-400">{feature.title}</h3>
            <p className="text-gray-300 mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
