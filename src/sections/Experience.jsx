import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { GiNetworkBars } from "react-icons/gi";
import { AiOutlineBarChart } from "react-icons/ai";
import { MdLightMode } from "react-icons/md";
import { FiZap, FiChevronLeft, FiChevronRight, FiMapPin, FiCamera, FiCpu, FiTrendingUp, FiUsers, FiCode, FiEye, FiTarget, FiAward, FiCalendar, FiActivity, FiGift, FiTv,  } from 'react-icons/fi';

const FloatingCube = ({ position, color, rotationSpeed }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed * 0.7;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Box ref={meshRef} position={position} args={[0.3, 0.3, 0.3]}>
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </Box>
  );
};

const Experience = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);

  const experiences = [
    {
      id: 1,
      type: "Hackathon",
      title: "Computer Vision Developer",
      company: "Urban Move Hackathon - CUMTA Chennai",
      period: "2025 - Present",
      status: "Shortlisted & Developing",
      description: "Leading object detection and quality assessment development for smart road infrastructure monitoring system.",
      achievements: [
        "Team shortlisted among top participants in CUMTA Chennai's Urban Move hackathon",
        "Developing YOLO-based computer vision models for road asset detection",
        "Building quality assessment algorithms for speedbumps, potholes, and zebra crossings",
        "Implementing real-time sensor data integration with ESP32 and server architecture"
      ],
      techStack: ["YOLO", "Computer Vision", "Python", "ESP32", "Real-time Processing", "Geospatial Analysis"],
      highlights: [
        { icon: FiCamera, text: "Real-time road monitoring", color: "text-blue-400" },
        { icon: FiCpu, text: "Multi-model AI pipeline", color: "text-green-400" },
        { icon: FiMapPin, text: "Geospatial metadata", color: "text-purple-400" },
        { icon: FiTarget, text: "Quality assessment", color: "text-orange-400" }
      ],
      workflow: [
        "Camera & sensor initialization",
        "Real-time road asset detection", 
        "Video slice extraction & processing",
        "Quality assessment & data storage"
      ],
      role: "CV Developer",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: 2,
      type: "Startup",
      title: "UI/UX Designer & Technical Member",
      company: "Vehnicate",
      period: "2023 - Present",
      status: "Active Contributor",
      description: "Providing comprehensive design solutions and technical expertise for vehicle technology startup.",
      achievements: [
        "Designed complete UI/UX interface using Figma for vehicle management platform",
        "Contributed technical advisory on control systems and vehicle trajectory plotting",
        "Researched and implemented control system algorithms for autonomous navigation",
        "Collaborated with development team on technical architecture decisions"
      ],
      techStack: ["Figma", "UI/UX Design", "Control Systems", "Vehicle Dynamics", "Technical Research", "System Architecture"],
      highlights: [
        { icon: FiEye, text: "User-centered design", color: "text-pink-400" },
        { icon: FiTrendingUp, text: "Control systems research", color: "text-green-400" },
        { icon: FiUsers, text: "Cross-team collaboration", color: "text-blue-400" },
        { icon: FiCode, text: "Technical advisory", color: "text-purple-400" }
      ],
      workflow: [
        "User research & analysis",
        "Figma prototype development",
        "Control system research",
        "Technical implementation guidance"
      ],
      role: "UI/UX Designer, Technical Member",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10"
    },
     {
      id: 3,
      type: "Workshop",
      title: "Machine Learning Instructor",
      company: "Skill UP SEDS, SEDS Antariksh",
      period: "July 5th 2025",
      status: "Successfully completed",
      description: "Co-hosted a 2.5 hour ML session, diving into two different real-world problem statements to give participants a smooth yet deep introduction on ML in space",
      achievements: [
        "Made AL Accessible to beginners, by carefully explaining concepts from basic to intermediate levels",
        "Collaborated with fellow instructor to plan, split and teach technical content effectively",
        "Empowered chapter members to explore ML and data-driven approaches in space applications",
        "Taught advanced math like FFT and statistical methods like kurtosis and skewness through visualizations and their use in feature extraction"
      ],
      techStack: ["Python", "Google Colab","Time-Series Data Analysis", "Scipy", "Lightkurve", "Imblearn"],
      highlights: [
        { icon: FiActivity, text: "Fast Fourier Transform", color: "text-blue-400" },
        { icon: GiNetworkBars, text: "SMOTE", color: "text-green-400" },
        { icon: AiOutlineBarChart, text: "Statistical Measures", color: "text-purple-400" },
        { icon: MdLightMode, text: "Lightkurve", color: "text-orange-400" }
      ],
      workflow: [
        "Introduction to ML",
        "Exploratory Data Analysis",
        "Feature Extraction",
        "Model Training",
        "Inference with Lightkurve",
      ],
      role: "Instructor",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },
    {
      id: 4,
      type: "Fellowship",
      title: "CrftHQ Fellowship",
      company: "CrftHQ",
      period: "July 2025 - Present",
      status: "Accepted & Building",
      description: "Accepted into the CrftHQ Fellowship, a 60-day, student-led accelerator that empowers student builders to turn their ideas into impactful products, brands, and ventures.",
      achievements: [
        "Selected as a CrftHQ Fellow from a competitive pool of student entrepreneurs across 25+ campuses.",
        "Participating in a hands-on, four-phase program: Ideation, Validation, MVP, and Go-To-Market.",
        "Collaborating with an inspiring community of student builders and mentors to bring ideas to life.",
        "Gaining access to mentorship, tech credits, and real-world startup exposure."
      ],
      techStack: ["YOLO", "Computer Vision", "Python", "ESP32", "Real-time Processing", "Geospatial Analysis", "Path planning", "Control Systems"],
      highlights: [
        { icon: FiZap, text: "60-day creator journey", color: "text-blue-400" },
        { icon: FiGift, text: "Access to ₹92.6 Cr+ in tech credits & perks", color: "text-green-400" },
        { icon: FiUsers, text: "Mentorship from IIT/IIM grads, Fortune 500 pros, and founders", color: "text-purple-400" },
        { icon: FiTv, text: "24-hour televised finale with investors & VCs", color: "text-orange-400" }
      ],
      workflow: [
        "Ideation",
        "Validation",
        "MVP",
        "Go-To-Market"
      ],
      role: "Fellow",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10"
    },

  ];

  const nextCard = () => {
    setActiveCard((prev) => (prev + 1) % experiences.length);
  };

  const prevCard = () => {
    setActiveCard((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} />
          <FloatingCube position={[-3, 0, 0]} color="#14b8a6" rotationSpeed={0.01} />
          <FloatingCube position={[3, 1, -2]} color="#3b82f6" rotationSpeed={0.015} />
          <FloatingCube position={[0, -2, 1]} color="#8b5cf6" rotationSpeed={0.008} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent">
            Professional <span className="text-white">Experience</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world experience through hackathons, startup contributions, and innovative project development
          </p>
          <div className="w-20 h-1 bg-teal-400 rounded-full mx-auto mt-4"></div>
        </motion.div>

        {/* **SLIDING CARDS CONTAINER** */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              onClick={prevCard}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-teal-500/20 hover:bg-teal-500/30 rounded-full border border-teal-500/30 transition-colors"
            >
              <FiChevronLeft size={24} className="text-teal-400" />
            </motion.button>
            
            <motion.button
              onClick={nextCard}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-teal-500/20 hover:bg-teal-500/30 rounded-full border border-teal-500/30 transition-colors"
            >
              <FiChevronRight size={24} className="text-teal-400" />
            </motion.button>
          </div>

          {/* **SLIDING CARDS** */}
          <div className="relative h-auto overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full"
              >
                {/* **MAIN EXPERIENCE CARD** */}
                <motion.div
                  className={`glass-effect rounded-2xl p-8 ${experiences[activeCard].bgColor} border border-white/10`}
                  onHoverStart={() => setHoveredCard(activeCard)}
                  onHoverEnd={() => setHoveredCard(null)}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* **LEFT COLUMN - Main Info** */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${experiences[activeCard].color} text-white`}>
                              {experiences[activeCard].type}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-300 border border-green-500/30">
                              {experiences[activeCard].status}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-1">
                            {experiences[activeCard].title}
                          </h3>
                          <p className="text-lg text-teal-400 font-medium">
                            {experiences[activeCard].company}
                          </p>
                          <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                            <FiCalendar size={16} />
                            <span>{experiences[activeCard].period}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 leading-relaxed">
                        {experiences[activeCard].description}
                      </p>

                      {/* **WORKFLOW VISUALIZATION** */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <FiTarget className="text-teal-400" />
                          Project Workflow
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experiences[activeCard].workflow.map((step, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10"
                            >
                              <span className="w-6 h-6 bg-teal-500/30 rounded-full flex items-center justify-center text-xs font-bold text-teal-400">
                                {index + 1}
                              </span>
                              <span className="text-sm text-gray-300">{step}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Achievements */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <FiAward className="text-teal-400" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-3">
                          {experiences[activeCard].achievements.map((achievement, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-start gap-3 text-gray-300"
                            >
                              <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{achievement}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* **RIGHT COLUMN - Highlights & Tech** */}
                    <div className="space-y-6">
                      {/* **PROJECT HIGHLIGHTS** */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Project Highlights</h4>
                        <div className="space-y-3">
                          {experiences[activeCard].highlights.map((highlight, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
                            >
                              <highlight.icon className={`${highlight.color} flex-shrink-0`} size={20} />
                              <span className="text-gray-300 text-sm">{highlight.text}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* **TECH STACK** */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {experiences[activeCard].techStack.map((tech, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              className="px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-medium border border-teal-500/30 cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      {/* **IMPACT METRICS** */}
                      <div className="p-4 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-lg border border-teal-500/20">
                        <h4 className="text-sm font-semibold text-teal-400 mb-3">Impact & Status</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Project Status</span>
                            <span className="text-green-400 font-medium">{experiences[activeCard].status}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Team Role</span>
                            <span className="text-white font-medium">{experiences[activeCard].role}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Technologies</span>
                            <span className="text-teal-400 font-medium">{experiences[activeCard].techStack.length}+</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* **CARD INDICATORS** */}
          <div className="flex justify-center gap-2 mt-8">
            {experiences.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveCard(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeCard 
                    ? 'bg-teal-400 scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* **CALL TO ACTION** */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-300 mb-6">
            Interested in collaborating on innovative projects?
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
          >
            <FiUsers size={20} />
            Let's Work Together
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
