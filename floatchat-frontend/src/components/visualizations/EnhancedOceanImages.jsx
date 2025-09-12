import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const EnhancedOceanImages = () => {
  const prefersReducedMotion = useReducedMotion();

  // Additional dark ocean imagery for layered effects
  const oceanLayers = [
    {
      url: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1920&q=80',
      credit: 'Silas Baisch',
      opacity: 0.9,
      position: 'center',
      scale: 1
    },
    {
      url: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1920&q=80',
      credit: 'Jeremy Bishop',
      opacity: 0.3,
      position: 'bottom',
      scale: 1.1,
      mixMode: 'multiply'
    },
    {
      url: 'https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?auto=format&fit=crop&w=1920&q=80',
      credit: 'Jeremy Bishop',
      opacity: 0.2,
      position: 'top',
      scale: 1.2,
      mixMode: 'overlay'
    }
  ];

  // Underwater texture layers
  const textureLayers = [
    {
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1920&q=80',
      opacity: 0.15,
      mixMode: 'screen',
      animation: { x: [0, 50, 0], y: [0, 30, 0] }
    },
    {
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1920&q=80',
      opacity: 0.1,
      mixMode: 'soft-light',
      animation: { x: [0, -30, 0], y: [0, 20, 0] }
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Ocean Layers */}
      {oceanLayers.map((layer, index) => (
        <motion.div
          key={`ocean-${index}`}
          className="absolute inset-0"
          initial={prefersReducedMotion ? {} : { 
            scale: layer.scale + 0.1, 
            opacity: 0 
          }}
          animate={prefersReducedMotion ? {} : { 
            scale: layer.scale, 
            opacity: layer.opacity 
          }}
          transition={{ 
            duration: 3 + index, 
            delay: index * 0.5,
            ease: "easeOut" 
          }}
          style={{
            backgroundImage: `url('${layer.url}')`,
            backgroundSize: 'cover',
            backgroundPosition: layer.position,
            backgroundRepeat: 'no-repeat',
            mixBlendMode: layer.mixMode || 'normal'
          }}
        />
      ))}

      {/* Animated Texture Layers */}
      {!prefersReducedMotion && textureLayers.map((texture, index) => (
        <motion.div
          key={`texture-${index}`}
          className="absolute inset-0"
          animate={{
            backgroundPosition: [
              '0% 0%', 
              `${texture.animation.x[1]}% ${texture.animation.y[1]}%`,
              `${texture.animation.x[2]}% ${texture.animation.y[2]}%`
            ],
            opacity: [0, texture.opacity, texture.opacity]
          }}
          transition={{
            duration: 25 + index * 5,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: `url('${texture.url}')`,
            backgroundSize: '150% 150%',
            backgroundRepeat: 'repeat',
            mixBlendMode: texture.mixMode
          }}
        />
      ))}

      {/* Deep Ocean Caustics Effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.05, 0.15, 0.05],
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560707303-4e980ce876ad?auto=format&fit=crop&w=1920&q=80')`,
            backgroundSize: '200% 200%',
            mixBlendMode: 'screen'
          }}
        />
      )}

      {/* Depth Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-blue-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/30 via-transparent to-ocean-deep/30" />
      
      {/* Ocean Depth Atmosphere */}
      <motion.div
        className="absolute inset-0"
        animate={prefersReducedMotion ? {} : {
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.02, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          background: `
            radial-gradient(circle at 25% 40%, rgba(6, 214, 160, 0.08) 0%, transparent 60%),
            radial-gradient(circle at 75% 60%, rgba(59, 130, 246, 0.06) 0%, transparent 60%),
            radial-gradient(circle at 50% 80%, rgba(148, 163, 184, 0.04) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating Ocean Elements */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-ocean-accent/20 rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 8 + i,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EnhancedOceanImages;