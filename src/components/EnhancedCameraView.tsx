import { motion } from 'framer-motion';

interface EnhancedCameraViewProps {
  onScan: () => void;
}

export default function EnhancedCameraView({ onScan }: EnhancedCameraViewProps) {
  return (
    <div className="scan-page flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <motion.div 
          className="w-16 h-16 bg-gradient-veggie rounded-full flex items-center justify-center mx-auto mb-3"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-2xl">📸</span>
        </motion.div>
        <h1 className="font-display text-2xl dark-theme-text mb-2">Smart Scanner</h1>
        <p className="dark-theme-secondary font-body text-sm">Point your camera at vegetables & fruits</p>
      </div>

      {/* Enhanced Camera Viewfinder */}
      <div className="flex-1 mx-4 mb-6 relative glass-intense rounded-3xl overflow-hidden shadow-lg min-h-96">
        {/* Scanner Line Animation */}
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lime to-transparent opacity-80 z-10"
          animate={{ y: [0, 380] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Scanning Grid */}
        <div className="absolute inset-4 border-2 border-dashed border-lettuce/40 rounded-2xl flex items-center justify-center">
          <div className="text-center">
            {/* Target Frame */}
            <motion.div 
              className="w-32 h-32 border-4 border-lettuce rounded-2xl relative mb-4 mx-auto"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Corner Indicators */}
              <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-lettuce rounded-tl-lg"></div>
              <div className="absolute -top-2 -right-2 w-8 h-8 border-t-4 border-r-4 border-lettuce rounded-tr-lg"></div>
              <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-4 border-l-4 border-lettuce rounded-bl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-lettuce rounded-br-lg"></div>
              
              {/* Animated Vegetable */}
              <div className="w-full h-full flex items-center justify-center">
                <motion.span 
                  className="text-4xl fruit-icon-glow"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  🥕
                </motion.span>
              </div>
            </motion.div>
            <p className="dark-theme-secondary font-body text-sm">Position items in the frame</p>
          </div>
        </div>

        {/* AI Detection Info */}
        <motion.div 
          className="absolute top-4 left-4 right-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-card rounded-2xl p-3">
            <div className="flex items-center space-x-2">
              <motion.span 
                className="text-lg"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ✨
              </motion.span>
              <p className="dark-theme-text font-body text-sm font-medium">
                AI will detect vegetables, fruits & ingredients
              </p>
            </div>
          </div>
        </motion.div>

        {/* Scanning Status */}
        <motion.div 
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="glass-card rounded-2xl p-2 text-center">
            <p className="dark-theme-text font-body text-xs">
              🔍 Scanning for fresh ingredients...
            </p>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Action Buttons */}
      <div className="px-6 pb-6 space-y-4">
        <motion.button 
          onClick={onScan}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-fruit-gradient w-full py-4 text-lg rounded-full"
        >
          <motion.span 
            className="text-2xl mr-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            📸
          </motion.span>
          Scan Ingredients
        </motion.button>
        
        <div className="flex space-x-3">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="clickable-btn flex-1 glass-card dark-theme-text py-3 rounded-xl font-heading font-semibold border-2 border-lettuce/30 hover:border-lettuce transition-colors flex items-center justify-center space-x-2"
          >
            <span>📁</span>
            <span>Gallery</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="clickable-btn flex-1 glass-card dark-theme-text py-3 rounded-xl font-heading font-semibold border-2 border-lettuce/30 hover:border-lettuce transition-colors flex items-center justify-center space-x-2"
          >
            <span>⚡</span>
            <span>Quick Add</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}