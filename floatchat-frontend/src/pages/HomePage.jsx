import { useRef, useEffect, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAPTimeline } from '../hooks/useGSAPTimeline';
import { useReducedMotion } from '../hooks/useReducedMotion';
import Button from '../components/ui/Button';
import { ChevronDown, Waves, Zap, BarChart3 } from 'lucide-react';

// Lazy load heavy components for performance
const OceanScene = lazy(() => import('../components/visualizations/OceanScene'));
const ParticlesLayer = lazy(() => import('../components/visualizations/ParticlesLayer'));
const OceanImageLayer = lazy(() => import('../components/visualizations/OceanImageLayer'));

const HomePage = () => {
  const navigate = useNavigate();
  const heroRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const buttonsRef = useRef();
  const prefersReducedMotion = useReducedMotion();
  
  const { animateIn, typeWriter } = useGSAPTimeline(heroRef);

  useEffect(() => {
    if (!prefersReducedMotion) {
      // Initial hero animation
      const tl = gsap.timeline({ delay: 0.5 });
      
      // Animate title with split text effect
      if (titleRef.current) {
        const titleChars = titleRef.current.innerText.split('');
        titleRef.current.innerHTML = titleChars.map(char => 
          char === ' ' ? ' ' : `<span class="inline-block">${char}</span>`
        ).join('');
        
        gsap.fromTo(titleRef.current.querySelectorAll('span'), 
          { 
            opacity: 0, 
            y: 100, 
            rotationX: -90 
          }, 
          { 
            opacity: 1, 
            y: 0, 
            rotationX: 0, 
            duration: 1.2, 
            stagger: 0.03,
            ease: 'back.out(1.7)'
          }
        );
      }
      
      // Typewriter effect for subtitle
      setTimeout(() => {
        if (subtitleRef.current) {
          typeWriter(
            subtitleRef.current, 
            'Explore the depths of ocean data with our AI-powered conversational interface',
            30
          );
        }
      }, 1500);
      
      // Animate buttons with magnetic hover effect
      if (buttonsRef.current) {
        gsap.fromTo(buttonsRef.current.children,
          { opacity: 0, scale: 0.8, y: 50 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 1, 
            stagger: 0.2, 
            delay: 3,
            ease: 'elastic.out(1, 0.75)'
          }
        );
      }
    }
  }, [prefersReducedMotion, typeWriter]);

  const handleMouseMove = (e, element) => {
    if (prefersReducedMotion) return;
    
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(element, {
      x: x * 0.1,
      y: y * 0.1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (element) => {
    if (prefersReducedMotion) return;
    
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dark Ocean Images Background */}
      <Suspense fallback={<div className="absolute inset-0 bg-ocean-deep" />}>
        <OceanImageLayer />
      </Suspense>
      
      {/* 3D Ocean Scene Background */}
      {!prefersReducedMotion && (
        <Suspense fallback={null}>
          <OceanScene />
        </Suspense>
      )}
      
      {/* Particles Layer */}
      {!prefersReducedMotion && (
        <Suspense fallback={null}>
          <ParticlesLayer />
        </Suspense>
      )}
      
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
      
      {/* Hero Content */}
      <div ref={heroRef} className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="mb-8">
            <h1 
              ref={titleRef}
              className="text-6xl md:text-8xl font-bold text-white mb-4 leading-tight tracking-tight"
            >
              Dive into Ocean Data
            </h1>
            <div className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-accent via-blue-400 to-cyan-300">
                with FloatChat
              </span>
            </div>
          </div>
          
          {/* Subtitle with typewriter effect */}
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-blue-100 mb-16 leading-relaxed max-w-4xl mx-auto font-light"
          >
            {/* Text will be filled by typewriter effect */}
          </p>
          
          {/* Action Buttons */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button 
              size="lg" 
              className="group relative overflow-hidden bg-gradient-to-r from-ocean-accent to-cyan-500 hover:from-cyan-500 hover:to-ocean-accent text-white px-12 py-6 text-xl font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => navigate('/register')}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Zap className="w-6 h-6" />
                Get Started
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="group relative border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-md px-12 py-6 text-xl font-semibold transform transition-all duration-300 hover:scale-105"
              onClick={() => navigate('/login')}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <span className="flex items-center gap-3">
                <Waves className="w-6 h-6" />
                I already have an account
              </span>
            </Button>
          </div>
          
          {/* Feature Pills */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4, duration: 0.8 }}
          >
            {[
              { icon: Waves, text: "Real-time Ocean Data" },
              { icon: BarChart3, text: "AI-Powered Insights" },
              { icon: Zap, text: "Interactive Visualizations" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glassmorphism px-6 py-3 rounded-full text-white/90 flex items-center gap-2 hover:bg-white/20 transition-all duration-300"
              >
                <feature.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Animated Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 glassmorphism p-4 rounded-full"
          animate={{ 
            y: [0, 10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ChevronDown className="w-6 h-6 text-white/80" />
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;