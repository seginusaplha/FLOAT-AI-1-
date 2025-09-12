import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const OceanImageLayer = () => {
  const prefersReducedMotion = useReducedMotion();

  // Curated dark ocean images from Unsplash with proper attribution
  const oceanImages = [
    {
      url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1920&q=80',
      credit: 'Silas Baisch',
      position: 'center'
    },
    {
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1920&q=80', 
      credit: 'Silvan Schuppisser',
      position: 'bottom'
    },
    {
      url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1920&q=80',
      credit: 'Jeremy Bishop', 
      position: 'center'
    },
    {
      url: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?auto=format&fit=crop&w=1920&q=80',
      credit: 'Cristofer Jeschke',
      position: 'top'
    }
  ];

  // Use a random image for variety
  const selectedImage = oceanImages[Math.floor(Math.random() * oceanImages.length)];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Ocean Background */}
      <motion.div
        className="absolute inset-0"
        initial={prefersReducedMotion ? {} : { scale: 1.1, opacity: 0 }}
        animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{
          backgroundImage: `url('${selectedImage.url}')`,
          backgroundSize: 'cover',
          backgroundPosition: selectedImage.position,
          backgroundRepeat: 'no-repeat'
        }}
      />
      
      {/* Layered Ocean Depths Effect */}
      <motion.div
        className="absolute inset-0"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={prefersReducedMotion ? {} : { opacity: 0.4 }}
        transition={{ duration: 3, delay: 1 }}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Deep Ocean Texture Overlay */}
      <motion.div
        className="absolute inset-0"
        initial={prefersReducedMotion ? {} : { opacity: 0 }}
        animate={prefersReducedMotion ? {} : { opacity: 0.3 }}
        transition={{ duration: 4, delay: 1.5 }}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'overlay'
        }}
      />
      
      {/* Animated Water Surface */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560707303-4e980ce876ad?auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: '200% 200%',
            backgroundRepeat: 'repeat',
            mixBlendMode: 'screen'
          }}
        />
      )}
      
      {/* Ocean Depth Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/20 to-blue-950/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/40 via-transparent to-ocean-deep/40" />
      
      {/* Depth Particles Effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, rgba(6, 214, 160, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                              radial-gradient(circle at 40% 80%, rgba(148, 163, 184, 0.05) 0%, transparent 50%)`
          }}
        />
      )}
      
      {/* Photo Credit */}
      <div className="absolute bottom-4 right-4 text-xs text-white/50 bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
        Photo by {selectedImage.credit} on Unsplash
      </div>
    </div>
  );
};

export default OceanImageLayer;