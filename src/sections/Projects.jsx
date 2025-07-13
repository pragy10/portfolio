import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import { motion, useInView } from 'framer-motion';
import { FiGithub, FiExternalLink, FiStar, FiCode } from 'react-icons/fi';

// Simple floating geometric element (no complex animations)
const FloatingGeometry = ({ position, geometry = 'box', delay = 0 }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + delay;
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        {geometry === 'sphere' && <sphereGeometry args={[0.3, 16, 16]} />}
        {geometry === 'box' && <boxGeometry args={[0.4, 0.4, 0.4]} />}
        {geometry === 'torus' && <torusGeometry args={[0.2, 0.1, 8, 16]} />}
        <meshStandardMaterial 
          color="#14b8a6" 
          transparent 
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  // Your projects data
  const projects = [
    {
      id: 1,
      title: "MIDSight",
      description: "Modern, modular Linux security CLI with process, file, network, honeytoken, and threat intel monitoring—featuring AI-powered insights and reporting via Google Gemini.",
      category: ["AI/ML", "Security","CLI"],
      tech: ["Python", "rich","psutil"],
      image: "/api/placeholder/400/250",
      github: "https://github.com/pragy10/midsight",
      demo: "https://www.linkedin.com/posts/pragya-sekar_hey-connections-excited-to-share-my-latest-activity-7349886521941893123-Wb4v?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZmh70BgIDOruQqVpYagLhRYNnN_nVI3PI",
      stars: 42,
      featured: true
    },
    {
      id: 2,
      title: "phishPicket - Advanced Phishing URL Detection System",
      description: "Machine learning system to classify URLs as phishing or safe using URL features and SSL info. Built a web interface for analysis and alerts.",
      category: ["AI/ML", "Security","Web Development"],
      tech: ["Python", "PyTorch", "FastAPI", "Flask"],
      image: "/api/placeholder/400/250",
      github: "https://github.com/pragy10/phishPicket",
      demo: "https://www.linkedin.com/posts/pragya-sekar_cybersecurity-machinelearning-phishingdetection-activity-7332725758550843392-WTie?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEZmh70BgIDOruQqVpYagLhRYNnN_nVI3PI",
      stars: 42,
      featured: true
    },
    {
      id: 3,
      title: "Facial Recognition Using Siamese Neural Networks",
      description: "Facial recognition model using Siamese networks to compare and verify faces based on similarity learning.",
      category: "AI/ML",
      tech: ["Python","TensorFlow", "OpenCV"],
      image: "/api/placeholder/400/250",
      github: "https://github.com/pragy10/ML_projects/blob/main/facialrecognition.ipynb",
      stars: 30,
      featured: true
    },
    {
      id: 4,
      title: "Movie Recommendation System",
      description: "Collaborative filtering model using PyTorch to recommend movies based on user preferences from MovieLens data.",
      category: ["Data Science", "AI/ML"],
      tech: [ "Python", "PyTorch", "Pandas", "NumPy"],
      image: "/api/placeholder/400/250",
      github: "https://github.com/pragy10/ML_projects/blob/main/movielens_pytorch.ipynb",
      stars: 25,
      featured: false
    },
    {
      id: 5,
      title: "VPS Hosting Platform Using OpenStack (Ongoing)",
      description: "Developed a virtual private server hosting service by deploying and managing virtual machines through OpenStack",
      category: ["Security","DevOps"],
      tech: ["Python", "Nmap", "React", "PostgreSQL"],
      image: "/api/placeholder/400/250",
      demo: "https://drive.google.com/file/d/1JW2z6uCiefr5X644RSC3EMbM3MqEaw4x/view?usp=sharing",
      stars: 38,
      featured: false
    },
    {
      id: 6,
      title: "vehnicate Mobile App UI/UX",
      description: "Developed a Figma design for a mobile app for a startup - vehnicate",
      category: ["UI/UX"],
      tech: ["Figma","Canva"],
      image: "/api/placeholder/400/250",
      demo: "https://www.figma.com/proto/89ujvWNXqctFNZC6r0pB6W/hnAir_v2?node-id=6-23&starting-point-node-id=76%3A1827&t=8uALkT6cTuxo18f7-1",
      stars: 38,
      featured: false
    },
  ];

  const categories = ['All', 'AI/ML', 'Web Development', 'Data Science', 'Security', 'DevOps', 'UI/UX',"CLI"];

  const filteredProjects = selectedCategory === 'All' 
  ? projects 
  : projects.filter(project => {
      // Handle both string and array categories
      const categories = Array.isArray(project.category) 
        ? project.category 
        : [project.category];
      
      return categories.includes(selectedCategory);
    });

  const getTechColor = (tech) => {
    const colors = {
      // Programming Languages
      'Python': 'bg-blue-500/20 text-blue-300 border-blue-500/30',        // Python blue/yellow
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', // JS yellow
      'TypeScript': 'bg-blue-600/20 text-blue-400 border-blue-600/30',     // TS blue
      'Java': 'bg-red-600/20 text-red-400 border-red-600/30',              // Java red
      'C++': 'bg-purple-600/20 text-purple-400 border-purple-600/30',      // C++ purple
      'Go': 'bg-cyan-600/20 text-cyan-400 border-cyan-600/30',             // Go cyan
      
      // Frontend
      'React': 'bg-cyan-400/20 text-cyan-300 border-cyan-400/30',          // React cyan
      'Vue': 'bg-green-500/20 text-green-400 border-green-500/30',         // Vue green
      'Angular': 'bg-red-500/20 text-red-400 border-red-500/30',           // Angular red
      'Next.js': 'bg-gray-700/20 text-gray-300 border-gray-700/30',        // Next.js black
      'Tailwind': 'bg-teal-500/20 text-teal-400 border-teal-500/30',       // Tailwind teal
      
      // Backend & Databases
      'Node.js': 'bg-green-600/20 text-green-400 border-green-600/30',     // Node.js green
      'Express': 'bg-gray-600/20 text-gray-400 border-gray-600/30',        // Express gray
      'Flask': 'bg-gray-800/20 text-gray-300 border-gray-800/30',          // Flask dark
      'Django': 'bg-green-700/20 text-green-400 border-green-700/30',      // Django green
      'MongoDB': 'bg-green-500/20 text-green-400 border-green-500/30',     // MongoDB green
      'PostgreSQL': 'bg-blue-700/20 text-blue-400 border-blue-700/30',     // PostgreSQL blue
      'MySQL': 'bg-orange-600/20 text-orange-400 border-orange-600/30',    // MySQL orange
      'SQLite': 'bg-orange-700/20 text-orange-300 border-orange-700/30',
      
      // AI/ML
      'TensorFlow': 'bg-orange-500/20 text-orange-400 border-orange-500/30', // TensorFlow orange
      'PyTorch': 'bg-red-600/20 text-red-400 border-red-600/30',           // PyTorch fire red
      'Scikit-learn': 'bg-blue-500/20 text-blue-400 border-blue-500/30',   // Scikit blue
      'Keras': 'bg-red-500/20 text-red-400 border-red-500/30',             // Keras red
      'OpenCV': 'bg-green-600/20 text-green-400 border-green-600/30',      // OpenCV green
      'Pandas': 'bg-purple-500/20 text-purple-400 border-purple-500/30',   // Pandas purple
      'NumPy': 'bg-blue-600/20 text-blue-400 border-blue-600/30',          // NumPy blue
      'Google Gemini': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',

      'click':         'bg-green-600/20 text-green-300 border-green-600/30',     // click green
      'rich':          'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',        // rich cyan
      'pyfiglet':      'bg-pink-600/20 text-pink-200 border-pink-600/30',        // pyfiglet pink
      'pwinput':       'bg-gray-700/20 text-gray-300 border-gray-700/30',        // pwinput gray
      
      // Cloud & DevOps
      'AWS': 'bg-orange-500/20 text-orange-400 border-orange-500/30',      // AWS orange
      'GCP': 'bg-blue-500/20 text-blue-400 border-blue-500/30',            // GCP blue
      'Azure': 'bg-blue-600/20 text-blue-400 border-blue-600/30',          // Azure blue
      'Docker': 'bg-blue-600/20 text-blue-400 border-blue-600/30',         // Docker blue
      'Kubernetes': 'bg-blue-700/20 text-blue-400 border-blue-700/30',     // Kubernetes blue
      'OpenStack': 'bg-red-700/20 text-red-400 border-red-700/30',         // OpenStack red
      
      // Data Processing
      'Apache Spark': 'bg-orange-600/20 text-orange-400 border-orange-600/30', // Spark orange
      'Apache Hadoop': 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30', // Hadoop yellow
      'Apache Kafka': 'bg-gray-700/20 text-gray-400 border-gray-700/30',   // Kafka dark
      
      // Tools & Others
      'Git': 'bg-red-600/20 text-red-400 border-red-600/30',               // Git red
      'GitHub': 'bg-gray-800/20 text-gray-300 border-gray-800/30',         // GitHub dark
      'VS Code': 'bg-blue-500/20 text-blue-400 border-blue-500/30',        // VS Code blue
      'Figma': 'bg-purple-500/20 text-purple-400 border-purple-500/30',    // Figma purple
      'Jupyter': 'bg-orange-500/20 text-orange-400 border-orange-500/30',    // Figma's brand purple
      'Canva': 'bg-purple-600/20 text-purple-400 border-purple-600/30',    // Canva's brand purple/blue

      
      // Default fallback
      'default': 'bg-teal-500/20 text-teal-400 border-teal-500/30'         // Your theme color
    };
    
    return colors[tech] || colors.default;
  };


  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* JetBrains-style background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-teal-900/20 via-transparent to-transparent"></div>
      
      {/* Simple 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8] }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#14b8a6" />
          
          <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade speed={1} />
          
          <FloatingGeometry position={[-6, 3, -4]} geometry="box" delay={0} />
          <FloatingGeometry position={[6, -2, -3]} geometry="sphere" delay={1} />
          <FloatingGeometry position={[-4, -4, -2]} geometry="torus" delay={2} />
          <FloatingGeometry position={[4, 4, -5]} geometry="box" delay={3} />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.h2 
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Featured <span className="text-white">Projects</span>
            </motion.h2>
            <motion.div 
              className="w-40 h-1.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-600 rounded-full mx-auto"
              initial={{ width: 0 }}
              animate={isInView ? { width: 160 } : { width: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            <motion.p 
              className="text-xl text-gray-300 mt-8 max-w-4xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Explore my portfolio of innovative projects spanning AI/ML, web development, cybersecurity, and cloud computing.
            </motion.p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 border ${
                  selectedCategory === category
                    ? 'bg-teal-500 text-white border-teal-500'
                    : 'bg-slate-800/60 text-gray-300 border-slate-600/50 hover:bg-teal-500/20 hover:border-teal-500/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className={`group relative bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-3xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 overflow-hidden ${
                  project.featured ? 'lg:col-span-1 lg:row-span-1' : ''
                }`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 30px 60px rgba(20, 184, 166, 0.2)"
                }}
                layout
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      FEATURED
                    </span>
                  </div>
                )}

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden rounded-t-3xl">
                  <div className="w-full h-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center">
                    <FiCode size={48} className="text-teal-400" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h3>
                    
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getTechColor(tech)}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-teal-500/20 text-gray-300 hover:text-teal-300 rounded-xl transition-all duration-200 border border-slate-600/30 hover:border-teal-500/30"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub size={16} />
                      <span className="text-sm font-medium">Code</span>
                    </motion.a>
                    
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-teal-500/25"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiExternalLink size={16} />
                      <span className="text-sm font-medium">Demo</span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* GitHub CTA */}
          <motion.div 
            variants={itemVariants}
            className="text-center mt-16"
          >
            <motion.a
              href="https://github.com/pragy10"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-teal-500 hover:to-cyan-600 text-white rounded-2xl transition-all duration-300 border border-slate-600 hover:border-teal-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiGithub size={24} />
              <span className="text-lg font-semibold">View All Projects on GitHub</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
