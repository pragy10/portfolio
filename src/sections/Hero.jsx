import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { FiDownload, FiStar } from 'react-icons/fi';

const AnimatedSphere = () => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.x = Math.sin(time * 0.2) * 0.1 + time * 0.008;
      meshRef.current.rotation.y += 0.012;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 200]} scale={1.2}>
      <MeshDistortMaterial
        color="#14b8a6"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.1}
        metalness={0.9}
      />
    </Sphere>
  );
};

const TypeWriter = ({ strings, typeSpeed = 100, backSpeed = 50, loop = true }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = strings[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
      }

      if (!isDeleting && currentText === current) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((currentIndex + 1) % strings.length);
      }
    }, isDeleting ? backSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentIndex, strings, typeSpeed, backSpeed]);

  return (
    <span>
      {currentText}
      <span className="animate-pulse text-teal-400 ml-1">|</span>
    </span>
  );
};

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 bg-teal-400/40 rounded-full"
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            opacity: 0 
          }}
          animate={{
            y: [null, -100, -200],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const WireframeCircle = ({ size, position, delay }) => {
  return (
    <motion.div
      className="absolute border-2 border-teal-400/30 rounded-full"
      style={{
        width: size,
        height: size,
        ...position
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: [0.3, 0.7, 0.3],
        scale: [1, 1.1, 1],
        rotate: [0, 180, 360]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut"
      }}
    >
      {/* Fishnet pattern inside */}
      <div 
        className="absolute inset-2 rounded-full opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20, 184, 166, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 184, 166, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '8px 8px'
        }}
      />
    </motion.div>
  );
};

const Hero = () => {
  const heroRef = useRef();

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      '.hero-badge',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
    .fromTo(
      '.hero-title',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      '.hero-subtitle',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    )
    .fromTo(
      '.hero-description',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo(
      '.hero-buttons',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    );
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef} 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* **STARRY 3D BACKGROUND - Like your original hero** */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#14b8a6" />
          <pointLight position={[-10, -10, -5]} intensity={0.6} color="#06b6d4" />
          
          <Stars radius={100} depth={50} count={1500} factor={3} saturation={0} fade speed={1} />
          
          <AnimatedSphere />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate 
            autoRotateSpeed={0.2} 
          />
        </Canvas>
      </div>

      {/* **TEAL/TURQUOISE GRADIENT BACKGROUNDS** */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,_var(--tw-gradient-stops))] from-blue-900/15 via-transparent to-transparent"></div>

      {/* **WIREFRAME CIRCLES - Instead of solid floating orbs** */}
      <WireframeCircle 
        size="120px" 
        position={{ top: '15%', left: '10%' }} 
        delay={0} 
      />
      <WireframeCircle 
        size="80px" 
        position={{ top: '60%', right: '15%' }} 
        delay={2} 
      />
      <WireframeCircle 
        size="100px" 
        position={{ bottom: '20%', left: '20%' }} 
        delay={4} 
      />
      <WireframeCircle 
        size="60px" 
        position={{ top: '30%', right: '30%' }} 
        delay={6} 
      />

      <FloatingParticles />

      {/* **TECH EMOJI FLOATING ICONS** */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {[
          { emoji: '🤖', position: { top: '15%', left: '15%' }, delay: 0 },
          { emoji: '🛡️', position: { top: '25%', right: '20%' }, delay: 2 },
          { emoji: '☁️', position: { bottom: '30%', left: '10%' }, delay: 4 },
          { emoji: '💻', position: { bottom: '20%', right: '15%' }, delay: 6 },
          { emoji: '⚡', position: { top: '50%', left: '5%' }, delay: 8 },
          { emoji: '🚀', position: { top: '70%', right: '5%' }, delay: 10 }
        ].map((icon, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl opacity-60"
            style={icon.position}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 90, 180, 270, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: icon.delay,
              ease: "easeInOut"
            }}
          >
            {icon.emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* **AVAILABLE BADGE** */}
        <motion.div 
          className="hero-badge inline-flex items-center gap-3 px-6 py-3 bg-teal-500/10 backdrop-blur-xl rounded-full border border-teal-500/30 mb-8"
          whileHover={{ 
            scale: 1.05,
            backgroundColor: "rgba(20, 184, 166, 0.15)"
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <FiStar className="text-teal-400" size={16} />
          </motion.div>
          <span className="text-sm font-medium text-teal-300">Available for hire · Ready to innovate</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </motion.div>

        {/* **YOUR NAME - Meet Pragya Sekar** */}
        <motion.h1 
          className="hero-title text-5xl md:text-7xl lg:text-8xl font-black leading-tight mb-6"
          style={{
            background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #3b82f6 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-shift 3s ease infinite'
          }}
        >
          Pragya Sekar
        </motion.h1>

        {/* **TYPEWRITER PROFESSIONS** */}
        <motion.h2 
          className="hero-subtitle text-2xl md:text-3xl lg:text-4xl font-semibold mb-6 text-white min-h  -[1.5em]"
        >
          <TypeWriter
            strings={[
              'Machine Learning Engineer',
              'Full Stack Developer',
              'Cybersecurity',
              'Cloud Computing'
            ]}
            typeSpeed={100}
            backSpeed={50}
            loop
          />
        </motion.h2>

        {/* **DESCRIPTION** */}
        <motion.p 
          className="hero-description text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Passionate about building intelligent systems with machine learning, cybersecurity expertise, and cutting-edge cloud solutions. Ready to transform ideas into reality.
        </motion.p>

        {/* **UPDATED CTA BUTTONS** */}
        <motion.div 
          className="hero-buttons flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.a
            href="#contact"
            className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-3 shadow-lg"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(20, 184, 166, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
            <span className="text-xl">→</span>
          </motion.a>
          
          <motion.a
            href="/resume.pdf"
            download
            className="px-8 py-4 border-2 border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white rounded-full font-semibold text-lg transition-all duration-300 flex items-center gap-3"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(20, 184, 166, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload size={20} />
            Download CV
            <span className="text-xl">↗</span>
          </motion.a>
        </motion.div>
      </div>

      

      {/* **SCROLL INDICATOR** */}
      <motion.div 
        className="absolute bottom-8 right-8 flex flex-col items-center gap-2 text-gray-400 text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <span className="transform rotate-90 whitespace-nowrap">Scroll to explore</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent via-teal-400 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

        

    </section>
  );
};

export default Hero;
