import { motion } from 'framer-motion';

const SimpleFallback = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1920&q=80')`
        }}
      />
      
      {/* Ocean Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean-mid/50 to-ocean-deep/90" />
      
      {/* Animated Wave Effect */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(6, 214, 160, 0.1) 0%, transparent 70%)',
            'linear-gradient(225deg, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            'linear-gradient(45deg, rgba(6, 214, 160, 0.1) 0%, transparent 70%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Depth Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    </div>
  );
};

export default SimpleFallback;