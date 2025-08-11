import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import VeggieAICharacter from './VeggieAICharacter';

interface VeggieAITipsProps {
  onLogoClick: () => void;
}

export default function VeggieAITips({ onLogoClick }: VeggieAITipsProps) {
  const tips = [
    "🥕 Did you know? Carrots get sweeter when stored in the fridge!",
    "🍅 Pro tip: Store tomatoes at room temperature for better flavor!",
    "🥬 Keep lettuce crisp by wrapping it in paper towels!",
    "🍆 Eggplants are best used within 3-4 days of purchase!",
    "🌽 Corn tastes sweetest when eaten the same day it's picked!",
    "🥒 Cucumbers last longer when stored unwashed!",
    "🥑 Speed up avocado ripening by storing with bananas!",
    "🍋 Roll lemons before juicing to get more juice out!",
  ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-20 left-0 right-0 px-4 z-30"
    >
      <div className="max-w-md mx-auto glass-card rounded-blob shadow-lg border border-lettuce/20 p-4">
        <div className="flex items-center space-x-3">
          {/* VeggieAI Logo */}
          <VeggieAICharacter 
            size="md" 
            animate={true} 
            onClick={onLogoClick}
            className="flex-shrink-0 bg-gradient-veggie rounded-full p-1"
          />

          {/* Tip Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <Lightbulb className="w-4 h-4 text-corn flex-shrink-0" />
              <span className="font-heading font-semibold text-sm text-white">
                VeggieAI Tips
              </span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.p
                key={currentTipIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-sm text-white/90 font-body leading-relaxed"
              >
                {tips[currentTipIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Chat Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onLogoClick}
            className="w-8 h-8 bg-lettuce/20 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <ArrowRight className="w-4 h-4 text-lettuce" />
          </motion.button>
        </div>

        {/* Tip Progress Dots */}
        <div className="flex justify-center space-x-1 mt-3">
          {tips.map((_, index) => (
            <motion.div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                index === currentTipIndex ? 'bg-lettuce' : 'bg-lettuce/30'
              }`}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}