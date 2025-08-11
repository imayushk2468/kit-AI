import { motion } from 'framer-motion';
import VeggieAICharacter from './VeggieAICharacter';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const fruits = [
    { icon: '🥕', delay: 0.2, x: '10%', y: '20%' },
    { icon: '🍅', delay: 0.4, x: '80%', y: '15%' },
    { icon: '🥬', delay: 0.6, x: '15%', y: '70%' },
    { icon: '🍆', delay: 0.8, x: '85%', y: '75%' },
    { icon: '🌽', delay: 1.0, x: '50%', y: '10%' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 fruity-enhanced-bg flex flex-col items-center justify-center z-50"
    >
      {/* Floating Fruits */}
      <div className="absolute inset-0 overflow-hidden">
        {fruits.map((fruit, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0 }}
            animate={{ 
              opacity: 0.7, 
              scale: 1,
              x: [0, 10, -10, 0],
              y: [0, -15, 15, 0]
            }}
            transition={{ 
              delay: fruit.delay,
              duration: 0.8,
              x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute text-4xl welcome-fruit-float"
            style={{ left: fruit.x, top: fruit.y }}
          >
            {fruit.icon}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-center px-6 z-10"
      >
        {/* VeggieAI Character */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.2, duration: 0.6, type: "spring", bounce: 0.4 }}
          className="mb-8"
        >
          <VeggieAICharacter size="xl" animate={true} className="mx-auto" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="font-display text-5xl dark-theme-text mb-4"
        >
          Fresh Pantry 🥬
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.6 }}
          className="font-heading text-xl dark-theme-secondary mb-8 max-w-md mx-auto"
        >
          Your Smart Kitchen Companion powered by VeggieAI
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.6 }}
          className="space-y-3 mb-8"
        >
          {[
            { icon: '📸', text: 'Scan ingredients instantly' },
            { icon: '🤖', text: 'Get AI-powered recipe suggestions' },
            { icon: '📅', text: 'Plan meals and reduce waste' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.1 + index * 0.1, duration: 0.4 }}
              className="flex items-center justify-center space-x-3 glass-card px-4 py-2 rounded-full max-w-xs mx-auto"
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="font-body dark-theme-text text-sm">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
          className="space-y-3"
        >
          <motion.button
            onClick={onComplete}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-fruit-gradient px-8 py-4 rounded-full font-heading font-bold text-lg w-full max-w-xs"
          >
            Start Cooking! ✨
          </motion.button>
          
          <motion.button
            onClick={onComplete}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass-card px-6 py-2 rounded-full font-body dark-theme-secondary text-sm border border-white/20 hover:bg-white/10 transition-all duration-200"
          >
            Skip Animation
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}