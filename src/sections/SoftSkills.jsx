import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Sphere, Text, OrbitControls } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import { FiTrendingUp, FiTarget, FiZap, FiHeart } from 'react-icons/fi';

// **3D SKILL CUBE COMPONENT**
const SkillCube = ({ position, skill, isActive, onHover }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.y += (hovered ? 0.02 : 0.01);
      meshRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <Box
      ref={meshRef}
      position={position}
      args={[1, 1, 1]}
      onPointerOver={() => {
        setHovered(true);
        onHover(skill);
      }}
      onPointerOut={() => {
        setHovered(false);
        onHover(null);
      }}
    >
      <meshStandardMaterial 
        color={hovered ? "#14b8a6" : "#06b6d4"} 
        transparent 
        opacity={hovered ? 0.9 : 0.7}
        emissive={hovered ? "#14b8a6" : "#000000"}
        emissiveIntensity={hovered ? 0.2 : 0}
      />
    </Box>
  );
};

// **FLOATING SKILL ORBS**
const SkillOrb = ({ position, skill, delay }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(time * 2 + delay) * 0.15;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.3, 32, 32]}>
        <meshStandardMaterial 
          color="#14b8a6" 
          transparent 
          opacity={0.6}
          wireframe
        />
      </Sphere>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.15}
        color="#14b8a6"
        anchorX="center"
        anchorY="middle"
      >
        {skill.level}%
      </Text>
    </group>
  );
};

const SoftSkills = () => {
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeView, setActiveView] = useState('radar'); // '3d', 'radar', 'bars'

  const softSkills = [
    {
      title: "Problem-Solving",
      description: "Demonstrated through developing ML systems for phishing detection and facial recognition challenges",
      icon: "🧩",
      level: 90,
      color: "from-purple-500 to-purple-600",
      position: [-2, 0, 0]
    },
    {
      title: "Communication",
      description: "Effective collaboration in team projects and clear presentation of technical concepts",
      icon: "💬",
      level: 80,
      color: "from-blue-500 to-blue-600",
      position: [2, 1, -1]
    },
    {
      title: "Creative Thinking",
      description: "Innovative approaches to implementing Siamese networks and recommendation systems",
      icon: "💡",
      level: 87,
      color: "from-yellow-500 to-yellow-600",
      position: [0, -1, 1]
    },
    {
      title: "Initiative",
      description: "Self-motivated learner pursuing novel concepts and acting independently without explicit direction",
      icon: "🚀",
      level: 89,
      color: "from-green-500 to-green-600",
      position: [-1, 1, 1]
    },
    {
      title: "Time Management",
      description: "Successfully balancing academic excellence (9.07 CGPA) with multiple technical projects",
      icon: "⏰",
      level: 80,
      color: "from-orange-500 to-orange-600",
      position: [1, -1, -1]
    },
    {
      title: "Adaptability",
      description: "Versatile across multiple domains from ML to cloud computing and cybersecurity",
      icon: "🔄",
      level: 75,
      color: "from-teal-500 to-teal-600",
      position: [0, 1, 0]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    
    <section id='softskills' className="py-20 relative overflow-hidden">
      {/* **BACKGROUND GRADIENTS** */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* **HEADER WITH VIEW TOGGLES** */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h3 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              Soft <span className="text-white">Skills</span>
            </motion.h3>
            
            <motion.p 
              className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Essential interpersonal and professional skills that complement my technical expertise
            </motion.p>

            {/* **VIEW TOGGLE BUTTONS** */}
            <div className="flex justify-center gap-4 mb-8">
              {[
                { id: 'radar', label: 'Radar Chart', icon: FiTarget },
                { id: 'bars', label: 'Progress Bars', icon: FiTrendingUp }
              ].map((view) => (
                <motion.button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeView === view.id
                      ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                      : 'bg-slate-800/50 text-gray-300 hover:bg-slate-700/50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <view.icon size={18} />
                  {view.label}
                </motion.button>
              ))}
            </div>
          </motion.div>


          {/* **RADAR CHART VIEW** */}
          {activeView === 'radar' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-center"
            >
              <div className="relative w-96 h-96">
                {/* **SVG RADAR CHART** */}
                <svg className="w-full h-full" viewBox="0 0 400 400">
                  {/* Grid circles */}
                  {[1, 2, 3, 4, 5].map((level) => (
                    <circle
                      key={level}
                      cx="200"
                      cy="200"
                      r={level * 30}
                      fill="none"
                      stroke="rgba(20, 184, 166, 0.2)"
                      strokeWidth="1"
                    />
                  ))}
                  
                  {/* Grid lines */}
                  {softSkills.map((_, index) => {
                    const angle = (index * 60 - 90) * (Math.PI / 180);
                    const x = 200 + Math.cos(angle) * 150;
                    const y = 200 + Math.sin(angle) * 150;
                    return (
                      <line
                        key={index}
                        x1="200"
                        y1="200"
                        x2={x}
                        y2={y}
                        stroke="rgba(20, 184, 166, 0.3)"
                        strokeWidth="1"
                      />
                    );
                  })}
                  
                  {/* Data polygon */}
                  <motion.polygon
                    points={softSkills.map((skill, index) => {
                      const angle = (index * 60 - 90) * (Math.PI / 180);
                      const radius = (skill.level / 100) * 150;
                      const x = 200 + Math.cos(angle) * radius;
                      const y = 200 + Math.sin(angle) * radius;
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="rgba(20, 184, 166, 0.2)"
                    stroke="#14b8a6"
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  
                  {/* Data points */}
                  {softSkills.map((skill, index) => {
                    const angle = (index * 60 - 90) * (Math.PI / 180);
                    const radius = (skill.level / 100) * 150;
                    const x = 200 + Math.cos(angle) * radius;
                    const y = 200 + Math.sin(angle) * radius;
                    return (
                      <motion.circle
                        key={index}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#14b8a6"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      />
                    );
                  })}
                </svg>
                
                {/* **SKILL LABELS** */}
                {softSkills.map((skill, index) => {
                  const angle = (index * 60 - 90) * (Math.PI / 180);
                  const labelRadius = 180;
                  const x = 200 + Math.cos(angle) * labelRadius;
                  const y = 200 + Math.sin(angle) * labelRadius;
                  
                  return (
                    <motion.div
                      key={skill.title}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                      style={{ left: x, top: y }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1 }}
                    >
                      <div className="bg-slate-900/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-teal-500/30">
                        <span className="text-lg">{skill.icon}</span>
                        <p className="text-xs font-medium text-white mt-1">{skill.title}</p>
                        <p className="text-xs text-teal-400">{skill.level}%</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* **PROGRESS BARS VIEW** */}
          {activeView === 'bars' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center`}>
                      <span className="text-xl">{skill.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-white">{skill.title}</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 bg-slate-700 rounded-full h-3">
                          <motion.div
                            className="h-3 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full relative overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.1 }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </motion.div>
                        </div>
                        <span className="text-sm font-bold text-teal-400 min-w-[3rem]">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {skill.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* **SUMMARY STATS** */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Average Score", value: "87%", icon: FiTrendingUp, color: "text-teal-400" },
              { label: "Top Skill", value: "Problem Solving", icon: FiZap, color: "text-green-400" },
              { label: "Skills Tracked", value: "6", icon: FiTarget, color: "text-blue-400" },
              { label: "Growth Focus", value: "Communication", icon: FiHeart, color: "text-purple-400" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/30"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.05)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1 }}
              >
                <stat.icon className={`${stat.color} text-2xl mx-auto mb-2`} />
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SoftSkills;
