import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true,
  glass = false,
  ...props 
}) => {
  const baseClasses = 'rounded-xl border p-6';
  const glassClasses = glass ? 'glassmorphism' : 'bg-ocean-mid border-ocean-light';
  
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.02 } : {}}
      transition={{ duration: 0.2 }}
      className={`${baseClasses} ${glassClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;