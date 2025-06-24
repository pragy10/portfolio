import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#hero', id: 'hero' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Tech Stack', href: '#techstack', id: 'techstack' }, 
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Soft Skills', href: '#softskills', id: 'softskills' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-slate-900/80 backdrop-blur-xl' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* **LOGO/NAME - Left side** */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer"
          >
            <a href="#hero" className="text-xl font-light tracking-wide">
              <span className="text-white">Pragya</span>
              <span className="text-teal-400 ml-1">Sekar</span>
            </a>
          </motion.div>

          {/* **NAVIGATION ITEMS - Center** */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                className={`relative text-sm font-light tracking-wide transition-all duration-300 group ${
                  activeSection === item.id
                    ? 'text-teal-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setActiveSection(item.id)}
              >
                {item.name}
                
                {/* **SUBTLE UNDERLINE EFFECT** */}
                <motion.div
                  className="absolute -bottom-1 left-0 h-px bg-teal-400"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: activeSection === item.id ? '100%' : '0%' 
                  }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </div>

          

          {/* **MOBILE MENU BUTTON** */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="md:hidden text-gray-300 hover:text-white transition-colors duration-300"
            aria-label="Menu"
          >
            <div className="space-y-1">
              <div className="w-5 h-px bg-current"></div>
              <div className="w-5 h-px bg-current"></div>
              <div className="w-3 h-px bg-current ml-auto"></div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* **SUBTLE BOTTOM BORDER** */}
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrolled ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.nav>
  );
};

export default Navbar;
