import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls, Stars } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';
import ComputerModel from '../components/ComputerModel';

const TechIcon = ({ position, icon, delay = 0, speed = 1 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * speed + delay;
      
      const radius = 3;
      meshRef.current.position.x = position[0] + Math.cos(time * 0.3) * radius * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.4;
      meshRef.current.position.z = position[2] + Math.sin(time * 0.4) * 0.5;
      
      meshRef.current.rotation.x = Math.sin(time * 0.7) * 0.3;
      meshRef.current.rotation.y = time * 0.4;
      meshRef.current.rotation.z = Math.cos(time * 0.3) * 0.2;
      
      const scale = 1 + Math.sin(time * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.8}>
      <group ref={meshRef} position={position}>
        <Text
          fontSize={1.5}
          color="#14b8a6"
          anchorX="center"
          anchorY="middle"
        >
          {icon}
        </Text>
      </group>
    </Float>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
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

  const skills = useMemo(() => [
    "Machine Learning",
    "Cybersecurity", 
    "Cloud Computing",
    "React Development",
    "Python",
    "Data Science"
  ], []);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Local overlay effects for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_rgba(20,184,166,0.05)_180deg,_transparent_360deg)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
            <motion.div 
            variants={itemVariants} 
            className="relative h-[600px] lg:h-[700px] w-full"
          >
            {/* Space Environment with Local Gradient */}
            <div 
              className="absolute inset-0 rounded-2xl overflow-hidden"
              style={{
                background: `
                  radial-gradient(ellipse at center, 
                    rgba(20, 184, 166, 0.1) 0%, 
                    rgba(6, 182, 212, 0.05) 30%, 
                    transparent 70%
                  ),
                  linear-gradient(135deg, 
                    rgba(15, 23, 42, 0.8) 0%, 
                    rgba(30, 41, 59, 0.6) 50%, 
                    rgba(15, 23, 42, 0.8) 100%
                  )
                `
              }}
            >
                {/* 3D Scene - Space Environment for Computer */}
              <Canvas 
                camera={{ position: [0, 2, 10], fov: 60 }}
              >
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#14b8a6" />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
                <pointLight position={[0, 10, -10]} intensity={0.8} color="#22d3ee" />
                
                {/* Dense Starfield for Space Effect */}
                <Stars radius={100} depth={50} count={1200} factor={4} saturation={0} fade speed={1} />
                
                <ComputerModel position={[-2.5, 0, 0]} />
                
                <TechIcon position={[-4, 2, 0]} icon="🤖" delay={0} speed={0.8} />
                <TechIcon position={[4, -1, -2]} icon="☁️" delay={1} speed={1.2} />
                <TechIcon position={[-2, -3, 2]} icon="🛡️" delay={2} speed={0.6} />
                <TechIcon position={[3, 3, 1]} icon="📊" delay={3} speed={1.0} />
                <TechIcon position={[-5, 0, -1]} icon="🔬" delay={4} speed={0.9} />
                <TechIcon position={[2, -4, 0]} icon="⚡" delay={5} speed={1.1} />
                <TechIcon position={[-2, -1, 0]} icon="📱" delay={5} speed={1.1} />
                
                <OrbitControls 
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={0.2}
                  minDistance={8}
                  maxDistance={20}
                  target={[0, 0, 0]}
                />
              </Canvas>
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants}>
              <motion.h2 
                className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                About <span className="text-white">Me</span>
              </motion.h2>
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: 96 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              ></motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed"
                whileHover={{ color: "#e5e7eb" }}
                transition={{ duration: 0.2 }}
              >
                {personalInfo.bio}
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed"
                whileHover={{ color: "#e5e7eb" }}
                transition={{ duration: 0.2 }}
              >
                Currently pursuing my B.Tech in Computer Science Engineering at VIT Chennai with a CGPA of{' '}
                <motion.span 
                  className="text-teal-400 font-bold text-xl"
                  whileHover={{ scale: 1.1, color: "#5eead4" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  9.07
                </motion.span>
                . I'm passionate about exploring the intersection of technology and innovation.
              </motion.p>
            </motion.div>

            {/* Info Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-300"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(20, 184, 166, 0.15)"
                }}
              >
                <h3 className="text-xl font-semibold text-teal-400 mb-3 flex items-center gap-2">
                  🎓 Education
                </h3>
                <p className="text-gray-300 font-medium">B.Tech Computer Science</p>
                <p className="text-gray-400">VIT Chennai</p>
                <p className="text-teal-300 font-semibold">CGPA: 9.07</p>
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.15)"
                }}
              >
                <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                  🚀 Focus Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 3).map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded-full border border-teal-500/30"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(20, 184, 166, 0.3)" }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Status Tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.div 
                className="flex items-center gap-3 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 backdrop-blur-sm px-4 py-3 rounded-full border border-teal-500/30"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(20, 184, 166, 0.2)"
                }}
              >
                <motion.span 
                  className="w-3 h-3 bg-teal-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-teal-300">Available for opportunities</span>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-3 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 backdrop-blur-sm px-4 py-3 rounded-full border border-cyan-500/30"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 20px rgba(6, 182, 212, 0.2)"
                }}
              >
                <motion.span 
                  className="w-3 h-3 bg-cyan-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
                <span className="text-sm font-medium text-cyan-300">Open to collaboration</span>
              </motion.div>
            </motion.div>
          </div>

          
          
        </motion.div>
      </div>
    </section>
  );
};

export default About;
