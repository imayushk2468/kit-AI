import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChefHat, Sparkles, Plus } from 'lucide-react';
import { ChatMessage } from '../types';

interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
}

export default function ChatView({ messages, onSendMessage }: ChatViewProps) {
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "I bought 2 carrots and 3 potatoes",
    "Add 1 bunch of lettuce",
    "What can I cook tonight?",
    "Show me recipes with tomatoes",
    "My onions are expiring soon",
    "I need a quick dinner idea"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
      
      // Simulate VeggieAI typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-watercolor">
      {/* Chat Header */}
      <div className="bg-white/95 backdrop-blur-sm p-4 border-b border-lettuce/20">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-veggie rounded-full animate-veggie-morph flex items-center justify-center">
            <ChefHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg text-charcoal">VeggieAI</h2>
            <p className="text-sm text-charcoal/60">Your Kitchen Assistant</p>
          </div>
          <div className="ml-auto">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-lettuce rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-lettuce rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-lettuce rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-gradient-veggie rounded-full animate-veggie-morph flex items-center justify-center mx-auto mb-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-heading font-bold text-xl text-charcoal mb-2">
              Hey there! 👋
            </h3>
            <p className="text-charcoal/70 font-body mb-6 max-w-sm mx-auto">
              I'm VeggieAI, your smart kitchen companion! Tell me what ingredients you have, 
              and I'll help you manage your pantry and find amazing recipes.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-heading font-semibold text-charcoal/80">Try saying:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-white/80 text-charcoal px-3 py-2 rounded-full text-sm font-body border border-lettuce/30 hover:bg-lettuce/10 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.isUser 
                  ? 'bg-gradient-veggie text-white rounded-br-md' 
                  : 'bg-white text-charcoal rounded-bl-md shadow-sm'
              }`}>
                {!message.isUser && (
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-6 h-6 bg-gradient-veggie rounded-full flex items-center justify-center">
                      <ChefHat className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-heading font-semibold text-lettuce">VeggieAI</span>
                  </div>
                )}
                <p className={`font-body ${message.isUser ? 'font-chat' : ''}`}>
                  {message.text}
                </p>
                <p className={`text-xs mt-1 ${
                  message.isUser ? 'text-white/70' : 'text-charcoal/50'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white text-charcoal px-4 py-3 rounded-2xl rounded-bl-md shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-veggie rounded-full flex items-center justify-center">
                  <ChefHat className="w-3 h-3 text-white" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-lettuce rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-lettuce rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-lettuce rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Suggestions */}
      {messages.length > 0 && (
        <div className="px-4 py-2">
          <div className="flex space-x-2 overflow-x-auto">
            {suggestions.slice(3).map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-white/80 text-charcoal px-3 py-2 rounded-full text-sm font-body border border-lettuce/30 hover:bg-lettuce/10 transition-colors whitespace-nowrap flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>{suggestion}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white/95 backdrop-blur-sm p-4 border-t border-lettuce/20">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Tell me what ingredients you have..."
              className="w-full px-4 py-3 bg-cream/50 border border-lettuce/30 rounded-2xl font-body text-charcoal placeholder-charcoal/50 focus:outline-none focus:border-lettuce resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="w-4 h-4 text-lettuce/50" />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-12 h-12 bg-gradient-veggie rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}