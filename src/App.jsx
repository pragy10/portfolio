import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import About from './sections/About';
import TechStack from './sections/TechStack';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import SoftSkills from './sections/SoftSkills';
import Contact from './sections/Contact';
import Navbar from './sections/Navbar';
import Experience from './sections/Experience';
import SocialLinks from './sections/SocialLinks';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar/>
        <Hero/>
        <About/>
        <TechStack/>
        <Projects/>
        <Experience/>
        <SoftSkills/>
        <SocialLinks showHeader={true} className="mt-8"/>
        <Contact/>
      </div>
    </>
  )
}

export default App
