import { motion } from 'framer-motion';

interface VeggieAICharacterProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function VeggieAICharacter({ 
  size = 'md', 
  animate = true, 
  onClick,
  className = '' 
}: VeggieAICharacterProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl',
    xl: 'w-24 h-24 text-5xl'
  };

  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      className={`${sizeClasses[size]} ${className} ${onClick ? 'cursor-pointer' : ''} flex items-center justify-center bg-gradient-veggie rounded-full`}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.1 } : undefined}
      whileTap={onClick ? { scale: 0.9 } : undefined}
      animate={animate ? {
        y: [0, -8, 0],
        rotate: [0, 2, -2, 0]
      } : undefined}
      transition={animate ? {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      } : undefined}
    >
      {/* Cute VeggieAI Character Emoji */}
      <span className="filter drop-shadow-lg">🥑</span>
    </Component>
  );
}