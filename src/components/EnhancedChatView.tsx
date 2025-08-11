import { motion, AnimatePresence } from 'framer-motion';
import VeggieAICharacter from './VeggieAICharacter';
import type { ChatMessage } from '../types';

interface EnhancedChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export default function EnhancedChatView({ messages, onSendMessage }: EnhancedChatViewProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLInputElement;
      if (target.value.trim()) {
        onSendMessage(target.value.trim());
        target.value = '';
      }
    }
  };

  return (
    <div className="chat-container flex flex-col">
      {/* Enhanced Header */}
      <motion.div
        className="glass-intense p-4 border-b border-lettuce/20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center space-x-3">
          <VeggieAICharacter size="md" animate={true} className="bg-gradient-veggie rounded-full p-1" />
          <div>
            <h2 className="font-heading font-bold text-lg dark-theme-text">VeggieAI</h2>
            <motion.p
              className="text-sm dark-theme-secondary"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Your Kitchen Assistant • Online
            </motion.p>
          </div>
          <div className="ml-auto">
            <motion.div
              className="w-3 h-3 bg-lime rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <VeggieAICharacter size="lg" animate={true} className="mx-auto mb-4" />
            <motion.h3
              className="font-heading font-bold text-xl dark-theme-text mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Hey there! 👋
            </motion.h3>
            <motion.p
              className="dark-theme-secondary font-body mb-6 max-w-sm mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              I'm VeggieAI, your smart kitchen companion! Tell me what ingredients you have.
            </motion.p>

            {/* Suggestion Pills */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {['I bought 2 carrots and 3 potatoes', 'What can I cook tonight?', 'Show me recipes with tomatoes'].map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => onSendMessage(suggestion)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="glass-card dark-theme-text px-4 py-2 rounded-full text-sm font-body border border-lettuce/30 hover:bg-lettuce/10 transition-colors block mx-auto"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs px-4 py-3 rounded-2xl message-enter ${
                  message.isUser 
                    ? 'bg-gradient-veggie text-white rounded-br-md' 
                    : 'glass-card dark-theme-text rounded-bl-md shadow-sm'
                }`}>
                  {!message.isUser && (
                    <div className="flex items-center space-x-2 mb-1">
                      <VeggieAICharacter size="sm" animate={false} />
                      <span className="text-xs font-heading font-semibold text-lettuce">VeggieAI</span>
                    </div>
                  )}
                  <p className="font-body">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-white/70' : 'text-white/50'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Enhanced Input Area */}
      <motion.div
        className="glass-intense p-4 border-t border-lettuce/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-end space-x-3">
          <input
            type="text"
            placeholder="Tell me what ingredients you have..."
            className="flex-1 px-4 py-3 glass-card border border-lettuce/30 rounded-2xl font-body dark-theme-text placeholder-white/50 focus:outline-none focus:border-lettuce transition-colors"
            onKeyDown={handleKeyDown}
          />
          <motion.button
            className="w-12 h-12 bg-gradient-veggie rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white text-xl">→</span>
          </motion.button>
        </div>

        {/* Quick Actions */}
        <motion.div
          className="flex space-x-2 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {['🥕 Add Carrots', '🍅 Add Tomatoes', '🥬 Add Lettuce'].map((action, index) => (
            <motion.button
              key={index}
              onClick={() => onSendMessage(action.split(' ').slice(1).join(' '))}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-3 py-1 glass-card dark-theme-text rounded-full text-xs font-body border border-lettuce/20 hover:bg-lettuce/10 transition-colors"
            >
              {action}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}