import { Camera, MessageCircle, Package, ChefHat, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'camera', icon: Camera, label: 'Scan', color: 'text-carrot' },
    { id: 'chat', icon: MessageCircle, label: 'VeggieAI', color: 'text-lettuce' },
    { id: 'inventory', icon: Package, label: 'Pantry', color: 'text-tomato' },
    { id: 'recipes', icon: ChefHat, label: 'Recipes', color: 'text-eggplant' },
    { id: 'planner', icon: Calendar, label: 'Planner', color: 'text-corn' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-lettuce/20 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onViewChange(item.id)}
              className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                isActive ? 'bg-gradient-veggie text-white' : 'text-charcoal/60'
              }`}
            >
              <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'text-white' : item.color}`} />
              <span className={`text-xs font-heading font-medium ${
                isActive ? 'text-white' : 'text-charcoal/80'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}