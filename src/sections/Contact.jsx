import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCheck, FiX } from 'react-icons/fi';
import emailjs from '@emailjs/browser';

// Simplified floating element with reduced complexity
const OptimizedFloatingElement = ({ position, delay = 0 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * 0.5 + delay;
      
      meshRef.current.position.y = position[1] + Math.sin(time) * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial 
        color="#14b8a6" 
        transparent 
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef(); // EmailJS form reference
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const shouldReduceMotion = useReducedMotion();
  
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });

  // EmailJS states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      }
    }
  };

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // **EmailJS INTEGRATION**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Replace with your actual EmailJS credentials
      emailjs.send(process.env.REACT_APP_EMAILJS_SERVICE_ID,process.env.REACT_APP_EMAILJS_TEMPLATE_ID,{
        name: from_name,
        email: from_email,
      });

      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        from_name: '',
        from_email: '',
        subject: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Email send failed:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      
      // Clear status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }
  };

  const socialLinks = [
    {
      icon: <FiGithub size={24} />,
      title: "GitHub",
      value: "github.com/pragy10",
      link: "https://github.com/pragy10",
      color: "from-gray-600 to-gray-700"
    },
    {
      icon: <FiLinkedin size={24} />,
      title: "LinkedIn",
      value: "linkedin.com/in/pragya-sekar",
      link: "https://linkedin.com/in/pragya-sekar/",
      color: "from-blue-600 to-blue-700"
    }
  ];

  // Memoize 3D scene to prevent unnecessary re-renders
  const Scene3D = useMemo(() => (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 60 }}
      frameloop="demand"
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#14b8a6" />
      
      <Stars radius={50} depth={30} count={300} factor={3} saturation={0} fade speed={0.5} />
      
      <OptimizedFloatingElement position={[-2, 1, 0]} delay={0} />
      <OptimizedFloatingElement position={[2, -1, -1]} delay={1} />
      <OptimizedFloatingElement position={[0, 2, 1]} delay={2} />
    </Canvas>
  ), []);

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-900/10 via-transparent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          

          {/* Main Content - Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Side - Image + 3D Background */}
            <motion.div 
              variants={itemVariants}
              className="relative h-[500px] w-full"
            >
              {/* 3D Background Layer */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                {!shouldReduceMotion && Scene3D}
                {shouldReduceMotion && (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-6xl text-teal-400">📧</div>
                  </div>
                )}
              </div>

              {/* Image Overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <motion.div 
                  className="relative w-80 h-80 lg:w-96 lg:h-96 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                >
                  {/* Your Image */}
                  <img 
                    src="/images/mail.png" // Replace with your image path
                    alt="Pragya Sekar" 
                    className="w-full h-full object-contain drop-shadow-2xl rounded-2xl"
                    style={{
                      filter: 'drop-shadow(0 25px 50px rgba(20, 184, 166, 0.3))'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  
                  {/* Fallback if image doesn't load */}
                  <div className="hidden w-full h-full items-center justify-center bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl border border-teal-500/30">
                    <div className="text-center">
                      <div className="text-6xl text-teal-400 mb-4">📧</div>
                      <p className="text-teal-300 font-medium">Let's Connect!</p>
                    </div>
                  </div>
                  
                  {/* Subtle Glow Effect Behind Image */}
                  <div 
                    className="absolute inset-0 -z-10 rounded-2xl opacity-30"
                    style={{
                      background: `
                        radial-gradient(circle at center, 
                          rgba(20, 184, 166, 0.3) 0%, 
                          rgba(6, 182, 212, 0.2) 30%, 
                          transparent 70%
                        )
                      `,
                      filter: 'blur(20px)'
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form & Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              
              {/* **WORKING CONTACT FORM WITH EMAILJS** */}
              <motion.div 
                className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 1.3 }}
              >
                <h3 className="text-xl font-bold text-teal-400 mb-4">Send a Message</h3>
                
                {/* **STATUS MESSAGES** */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2 text-green-300"
                  >
                    <FiCheck size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-300"
                  >
                    <FiX size={20} />
                    <span>Failed to send message. Please try again or contact me directly.</span>
                  </motion.div>
                )}

                {/* **EMAILJS FORM** */}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="from_name" // EmailJS expects this name
                      value={formData.from_name}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                      required
                      disabled={isSubmitting}
                    />
                    <input
                      type="email"
                      name="from_email" // EmailJS expects this name
                      value={formData.from_email}
                      onChange={handleInputChange}
                      className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none transition-colors"
                    placeholder="Subject"
                    required
                    disabled={isSubmitting}
                  />
                  
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-400 focus:border-teal-500 focus:outline-none transition-colors resize-none"
                    placeholder="Your message..."
                    required
                    disabled={isSubmitting}
                  />
                  
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                      isSubmitting 
                        ? 'bg-gray-600 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700'
                    } text-white`}
                    whileHover={shouldReduceMotion || isSubmitting ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion || isSubmitting ? {} : { scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                

               

              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
