import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiInstagram, FiMessageSquare } from 'react-icons/fi';
import { FaDiscord } from "react-icons/fa";

const SocialLinks = ({ className = "", showHeader = false }) => {
  const shouldReduceMotion = useReducedMotion();
  
  // Define itemVariants within the component
  const itemVariants = {
    hidden: { 
      y: shouldReduceMotion ? 0 : 30, 
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const socialLinks = [
    { 
      icon: FiGithub, 
      href: 'https://github.com/pragy10', 
      label: 'GitHub',
      color: 'hover:text-gray-400'
    },
    { 
      icon: FiLinkedin, 
      href: 'https://linkedin.com/in/pragya-sekar/', 
      label: 'LinkedIn',
      color: 'hover:text-blue-400'
    },
    { 
      icon: FiInstagram, 
      href: 'https://www.instagram.com/pragyasekar/', 
      label: 'Instagram',
      color: 'hover:text-pink-400'
    },
  ];

  return (
    <div className={`w-full ${className}`}>
      {/* Optional Header */}
      <section id="contact"></section>
      {showHeader && (
        <motion.div 
          variants={itemVariants} 
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h2 
          
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent"
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Connect With <span className="text-white">Me</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Let's connect across different platforms and collaborate on exciting projects!
          </motion.p>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mx-auto" />
        </motion.div>
      )}

      {/* Social Links */}
      <div className="flex justify-center items-center gap-6 flex-wrap">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`group relative p-4 rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-gray-300 ${social.color} transition-all duration-300 hover:border-teal-500/50`}
              whileHover={shouldReduceMotion ? {} : { 
                scale: 1.1,
                y: -5,
                boxShadow: "0 15px 30px rgba(20, 184, 166, 0.2)"
              }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Icon size={24} />
              
              {/* Floating tooltip */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-lg border border-teal-500/30 text-sm text-teal-300 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                {social.label}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-teal-500/30" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
