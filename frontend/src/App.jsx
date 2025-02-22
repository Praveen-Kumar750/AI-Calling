import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Service from './components/Service'
import InService from './components/InService'
import Features from './components/Features'
import Contact from './components/Contact'
import BusinessTypes from './components/BusinessTypes'
import ScheduleDemo from './components/ScheduleDemo'
import Footer from './components/Footer'
import Pricing from './components/Pricing'
import Login from './components/Login'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Hero />
      <Service />
      <InService />
      <Features />
      <Contact />
      <BusinessTypes />
      <ScheduleDemo/>
      <Footer/>
      <Pricing/>
      <Login/>
     
    </>
  )
}

export default App
