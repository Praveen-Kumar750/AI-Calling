import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Service from '../components/Service';
import InService from '../components/InService';
import Features from '../components/Features';
import Contact from '../components/Contact';
import BusinessTypes from '../components/BusinessTypes';
import ScheduleDemo from '../components/ScheduleDemo';
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#schedule-demo") {
      const section = document.getElementById("schedule-demo");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Hero />
      <ChatBot />
      <Service />
      <InService />
      <Features />
      <Contact />
      <BusinessTypes />
      <ScheduleDemo />
      <Footer />
    </>
  );
};

export default Homepage;
