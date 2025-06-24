import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls, Stars } from '@react-three/drei';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Your FloatingTechIcon Component (UNTOUCHED - exactly as you provided)
const FloatingTechIcon = ({ position, icon, label, delay = 0, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed + delay;
      
      // Orbital movement
      const radius = 2;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.3) * radius * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.3;
      meshRef.current.position.z = position[2] + Math.sin(time * 0.4) * 0.4;
      
      // Rotation
      meshRef.current.rotation.y = time * 0.4;
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <group ref={meshRef} position={position}>
        {/* Wireframe container */}
        <mesh>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshStandardMaterial 
            color="#14b8a6" 
            wireframe
            transparent 
            opacity={0.6}
          />
        </mesh>
        
        {/* Icon text */}
        <Text
          position={[0, 0, 0.5]}
          fontSize={0.3}
          color="#22d3ee"
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
        
        {/* Label */}
        <Text
          position={[0, -0.6, 0]}
          fontSize={0.15}
          color="#5eead4"
          anchorX="center"
          anchorY="middle"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
};

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });
  const [activeCardIndex, setActiveCardIndex] = useState(0);

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
    hidden: { 
      y: 60, 
      opacity: 0,
      scale: 0.95
    },
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

  // Organized tech stack data
  const techStacks = [
    {
      title: "Programming Languages",
      tools: [
        "Python 🐍", "Java ☕", "JavaScript 🟨",
         "C++ ⚡", "C 🔧", "Verilog 🔌", "Scala 🔷","R 📊"
      ]
    },
    {
      title: "Frontend Development",
      tools: [
        "React ⚛️", "HTML 🌐", "Tailwind 🌊", 
        "Bootstrap 🅱️", "Figma 🎨", "Canva 🎭"
      ]
    },
    {
      title: "Backend & Database",
      tools: [
        "Node.js 🟢", "Express ⚡", "SQL 🗃️", "MySQL 🐬", 
        "MongoDB 🍃", "Flask 🌶️"
      ]
    },
    {
      title: "AI & Machine Learning",
      tools: [
        "Pandas 🐼", "NumPy 🔢", 
        "Hugging Face 🤗", "LangChain ⛓️", "LangGraph 🕸️","BERT 📝", 
        "PyTorch 🔥","TensorFlow 🧠", "Scikit-learn 📊",
        "Keras 🎯", "spaCy 🌍", "NLTK 📚", "Streamlit 🎈", 
        "OpenCV 👁️", "Matplotlib 📊", "Seaborn 🌊" 
      ]
    },
    {
      title: "Cloud & DevOps",
      tools: [
        "GCP 🌐","AWS ☁️", "Docker 🐳", 
        "Kubernetes ⚓", "OpenStack ☁️",
      ]
    },
    {
    title: "Big Data Frameworks",
    tools: [
      "Apache Hadoop ☁️", "Apache Spark 🔥",
    ]
  },
  {
      title: "Academics",
      tools: [
         "Object-Oriented Programming 🧩", "Data Structures and Algorithms 🌳", 
    "Design and Analysis of Algorithms ⚡", "Operating Systems 🖥️",
    "Computer Networks 🌐", "Theory of Computation 🧠", 
    "Computer Architecture and Organization 🏗️", "Cloud Computing ☁️"
      ]
    },
  ];

  const nextCard = () => {
    setActiveCardIndex((prev) => (prev + 1) % techStacks.length);
  };

  const prevCard = () => {
    setActiveCardIndex((prev) => (prev - 1 + techStacks.length) % techStacks.length);
  };

  return (
    <section id="techstack" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header - UNTOUCHED */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Technical <span className="text-white">Universe</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 mt-8 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              A Comprehensive Collection of Technical Skills garnered throughout my 2 years experience. 
            </motion.p>
            <motion.div 
              className="w-32 h-1 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={isInView ? { width: 128 } : { width: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </motion.div>

          {/* 3D Floating Tech Icons - UNTOUCHED */}
          <motion.div 
            variants={itemVariants}
            className="relative h-[400px] mb-16"
          >
            <div className="absolute inset-0 overflow-hidden">
              <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#14b8a6" />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
                
                <Stars radius={100} depth={50} count={800} factor={4} saturation={0} fade speed={1} />
                
                {/* Floating tech icons */}
                <FloatingTechIcon position={[-3, 1, 0]} icon="⚛️" label="React" delay={0} speed={0.8} />
                <FloatingTechIcon position={[3, -1, -1]} icon="🐍" label="Python" delay={1} speed={1.2} />
                <FloatingTechIcon position={[-1, -2, 1]} icon="🧠" label="AI/ML" delay={2} speed={0.6} />
                <FloatingTechIcon position={[2, 2, 0]} icon="☁️" label="Cloud" delay={3} speed={1.0} />
                <FloatingTechIcon position={[-4, 0, -2]} icon="🗃️" label="Database" delay={4} speed={0.9} />
                <FloatingTechIcon position={[1, -3, 1]} icon="🔒" label="Security" delay={5} speed={1.1} />
                
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.3}
                  target={[0, 0, 0]}
                />
              </Canvas>
            </div>
          </motion.div>

          {/* **NEW CLICKABLE CARD LAYOUT** */}
          <motion.div variants={itemVariants} className="relative">
            
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

            {/* **CARD LAYOUT - LEFT TITLE, RIGHT TOOLS** */}
            <div className="relative h-80 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCardIndex}
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="w-full h-full"
                >
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm rounded-3xl border border-teal-500/30 h-full overflow-hidden">
                    <div className="grid grid-cols-12 h-full">
                      
                      {/* **LEFT SIDE - TITLE** */}
                      <div className="col-span-4 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 flex items-center justify-center p-8 border-r border-teal-500/20">
                        <motion.h3 
                          className="text-3xl md:text-4xl font-bold text-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                            {techStacks[activeCardIndex].title}
                          </span>
                        </motion.h3>
                      </div>

                      {/* **RIGHT SIDE - TOOLS** */}
                      <div className="col-span-8 p-8 flex items-center">
                        <div className="w-full">
                          <motion.div 
                            className="flex flex-wrap gap-3 justify-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                          >
                            {techStacks[activeCardIndex].tools.map((tool, index) => (
                              <motion.span
                                key={`${activeCardIndex}-${tool}`}
                                className="px-4 py-2 bg-slate-700/50 text-gray-300 rounded-full text-sm font-medium hover:bg-teal-500/20 hover:text-teal-300 transition-all duration-200 border border-slate-600/30 hover:border-teal-500/30 cursor-default"
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ 
                                  delay: 0.4 + index * 0.05,
                                  duration: 0.3
                                }}
                                whileHover={{ scale: 1.05 }}
                              >
                                {tool}
                              </motion.span>
                            ))}
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* **CARD INDICATORS** */}
            <div className="flex justify-center gap-2 mt-8">
              {techStacks.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveCardIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeCardIndex 
                      ? 'bg-teal-400 scale-125' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            {/* **CARD COUNTER** */}
            <motion.div 
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-gray-400">
                {activeCardIndex + 1} of {techStacks.length}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
