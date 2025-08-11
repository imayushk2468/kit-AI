import { useState, useEffect } from 'react';
import type { AppState, ChatMessage, ViewType } from './types';
import EnhancedCameraView from './components/EnhancedCameraView';
import EnhancedChatView from './components/EnhancedChatView';
import WelcomeScreen from './components/WelcomeScreen';
import VeggieAITips from './components/VeggieAITips';

function App() {
  const [showWelcome, setShowWelcome] = useState(false);
  const [currentView, setCurrentView] = useState('camera');
  const [, setPreviousView] = useState('camera');
  const [showVeggieTips, setShowVeggieTips] = useState(true);
  const [appState, setAppState] = useState<AppState>({
    inventory: [],
    recipes: [],
    chatMessages: [],
    currentView: 'camera',
    isLoading: false,
  });

  // Check if user has seen welcome screen before
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('kitchenai-welcome-seen');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    localStorage.setItem('kitchenai-welcome-seen', 'true');
    setShowWelcome(false);
  };

  const handleViewChange = (view: string) => {
    setPreviousView(currentView);
    setCurrentView(view);
    setAppState(prev => ({ ...prev, currentView: view as ViewType }));
  };

  const handleItemsDetected = (items: any[]) => {
    const newItems = items.map(item => ({
      id: String(Date.now() + Math.random()),
      name: item.name,
      quantity: item.quantity,
      unit: 'pieces',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      category: 'vegetables' as const,
      currentPrice: 0,
      priceSource: 'estimated',
      calories: 25,
    }));
    
    setAppState(prev => ({
      ...prev,
      inventory: [...prev.inventory, ...newItems]
    }));

    setCurrentView('inventory');
  };

  const handleSendMessage = (message: string) => {
    const userMessage: ChatMessage = {
      id: Date.now() + '-user',
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setAppState(prev => ({
      ...prev,
      chatMessages: [...prev.chatMessages, userMessage]
    }));

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: Date.now() + '-ai',
        text: getAIResponse(message),
        isUser: false,
        timestamp: new Date(),
      };

      setAppState(prev => ({
        ...prev,
        chatMessages: [...prev.chatMessages, aiResponse]
      }));
    }, 1500);
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('carrot') || lowerMessage.includes('potato')) {
      return "Great! I've added those vegetables to your pantry. 🥕🥔 They'll stay fresh for about a week. Would you like some recipe suggestions using these ingredients?";
    }
    
    if (lowerMessage.includes('recipe') || lowerMessage.includes('cook')) {
      return "I'd love to help you find the perfect recipe! 👨‍🍳 Based on your pantry, I can suggest some delicious options. What type of cuisine are you in the mood for?";
    }
    
    if (lowerMessage.includes('expiring') || lowerMessage.includes('expire')) {
      return "Don't worry! I'll help you use those ingredients before they go bad. 🕒 Let me suggest some quick recipes that will make the most of what you have!";
    }
    
    return "That sounds delicious! 🌟 I'm here to help you make the most of your kitchen ingredients. Feel free to tell me what you have, and I'll suggest some amazing recipes!";
  };

  const handleOpenChat = () => {
    setCurrentView('chat');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'camera':
        return (
          <EnhancedCameraView 
            onScan={() => {
              const mockItems = [
                { name: 'Fresh Tomatoes', confidence: 0.95, quantity: 3 },
                { name: 'Organic Carrots', confidence: 0.88, quantity: 2 },
                { name: 'Green Lettuce', confidence: 0.92, quantity: 1 },
              ];
              handleItemsDetected(mockItems);
            }}
          />
        );

      case 'chat':
        return (
          <EnhancedChatView 
            messages={appState.chatMessages}
            onSendMessage={handleSendMessage}
          />
        );

      case 'inventory':
        return (
          <div className="flex-1 overflow-y-auto pb-32">
            <div className="p-6 text-center border-b border-lettuce/10">
              <div className="w-16 h-16 bg-gradient-veggie rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🥬</span>
              </div>
              <h1 className="font-display text-2xl text-white mb-2">Fresh Pantry</h1>
              <p className="text-white/80 font-body text-sm">
                {appState.inventory.length === 0 
                  ? "Your pantry is empty. Start scanning ingredients!"
                  : `${appState.inventory.length} fresh ingredients ready to cook`
                }
              </p>
            </div>

            {appState.inventory.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center max-w-sm">
                  <div className="w-32 h-32 glass-card rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <div className="space-y-2">
                      <div className="flex justify-center space-x-2">
                        <span className="text-2xl animate-bounce">🥕</span>
                        <span className="text-2xl animate-bounce" style={{animationDelay: '0.1s'}}>🍅</span>
                        <span className="text-2xl animate-bounce" style={{animationDelay: '0.2s'}}>🥬</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">Start Your Fresh Journey</h3>
                  <p className="text-white/80 font-body mb-6 leading-relaxed">
                    Scan your vegetables and fruits to track freshness, get recipe suggestions, and reduce food waste!
                  </p>
                  <button 
                    onClick={() => setCurrentView('camera')}
                    className="btn-primary w-full py-4 text-lg"
                  >
                    📸 Scan First Ingredients
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4">
                <div className="grid grid-cols-2 gap-4">
                  {appState.inventory.map((item) => {
                    const daysLeft = Math.ceil((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                    const freshness = daysLeft > 5 ? 'fresh' : daysLeft > 2 ? 'warning' : 'expired';
                    const freshnessColors = {
                      fresh: 'border-lettuce bg-lettuce/5',
                      warning: 'border-corn bg-corn/5',
                      expired: 'border-tomato bg-tomato/5'
                    };
                    const freshnessEmojis = {
                      fresh: '✨',
                      warning: '⏰',
                      expired: '🚨'
                    };

                    return (
                      <div key={item.id} className={`glass-card rounded-2xl p-4 shadow-sm border-2 ${freshnessColors[freshness]} hover:scale-105 transition-all duration-200`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="w-12 h-12 bg-gradient-veggie rounded-xl flex items-center justify-center">
                            <span className="text-xl">
                              {item.name.toLowerCase().includes('tomato') ? '🍅' : 
                               item.name.toLowerCase().includes('carrot') ? '🥕' : 
                               item.name.toLowerCase().includes('lettuce') ? '🥬' : '🥒'}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg">{freshnessEmojis[freshness]}</span>
                            <p className="text-xs text-white/50 font-body">{daysLeft}d left</p>
                          </div>
                        </div>
                        
                        <h3 className="font-heading font-bold text-white mb-1">{item.name}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-white/60 font-body text-sm">Qty: {item.quantity}</span>
                          <div className="flex space-x-1">
                            <button className="w-6 h-6 bg-tomato/20 rounded-full flex items-center justify-center">
                              <span className="text-tomato text-sm font-bold">-</span>
                            </button>
                            <button className="w-6 h-6 bg-lettuce/20 rounded-full flex items-center justify-center">
                              <span className="text-lettuce text-sm font-bold">+</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-3">
                  <button 
                    onClick={() => setCurrentView('recipes')}
                    className="btn-primary w-full py-4"
                  >
                    <span className="text-xl mr-2">👨‍🍳</span>
                    Find Recipes with These Ingredients
                  </button>
                  
                  <div className="flex space-x-3">
                    <button className="clickable-btn flex-1 glass-card text-white py-3 rounded-xl font-heading font-semibold border-2 border-lettuce/30 hover:border-lettuce transition-colors">
                      🛒 Shopping List
                    </button>
                    <button className="clickable-btn flex-1 glass-card text-white py-3 rounded-xl font-heading font-semibold border-2 border-lettuce/30 hover:border-lettuce transition-colors">
                      📊 Nutrition Info
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'recipes':
        return (
          <div className="flex-1 overflow-y-auto pb-32">
            <div className="p-6 text-center border-b border-lettuce/10">
              <div className="w-16 h-16 bg-gradient-veggie rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👨‍🍳</span>
              </div>
              <h1 className="font-display text-2xl text-white mb-2">Recipe Magic</h1>
              <p className="text-white/80 font-body text-sm">Delicious recipes with your ingredients</p>
            </div>

            {appState.inventory.length === 0 ? (
              <div className="flex-1 flex items-center justify-center p-6">
                <div className="text-center max-w-sm">
                  <div className="w-32 h-32 glass-card rounded-3xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl animate-pulse">👨‍🍳</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-white mb-3">Add Ingredients First</h3>
                  <p className="text-white/80 font-body mb-6 leading-relaxed">
                    Scan some ingredients first, and I'll suggest amazing recipes you can make!
                  </p>
                  <button 
                    onClick={() => setCurrentView('camera')}
                    className="btn-primary w-full py-4 text-lg"
                  >
                    📸 Scan Ingredients
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                <div className="bg-gradient-veggie rounded-3xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-xl font-bold">🌟 Perfect Match</h3>
                      <p className="text-white/80 text-sm">Uses all your fresh ingredients</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <span className="text-3xl">🥗</span>
                    </div>
                  </div>
                  <h2 className="font-display text-2xl mb-2">Fresh Garden Salad</h2>
                  <p className="text-white/90 text-sm mb-4">A vibrant mix of your fresh vegetables with a zesty dressing</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-white/80 text-sm">⏱️ 15 min</span>
                      <span className="text-white/80 text-sm">👥 2 servings</span>
                      <span className="text-white/80 text-sm">🔥 Easy</span>
                    </div>
                    <button className="clickable-btn bg-white text-charcoal px-4 py-2 rounded-xl font-heading font-semibold text-sm">
                      Cook Now
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Veggie Stir Fry', emoji: '🍜', time: '20 min', difficulty: 'Easy', match: '85%' },
                    { name: 'Fresh Soup', emoji: '🍲', time: '30 min', difficulty: 'Medium', match: '75%' },
                    { name: 'Roasted Medley', emoji: '🥘', time: '45 min', difficulty: 'Easy', match: '90%' },
                  ].map((recipe, index) => (
                    <div key={index} className="glass-card rounded-2xl p-4 shadow-sm border border-lettuce/10 hover:scale-105 transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-lettuce/20 to-carrot/20 rounded-2xl flex items-center justify-center">
                          <span className="text-2xl">{recipe.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-heading font-bold text-white">{recipe.name}</h3>
                            <span className="bg-lettuce/20 text-lettuce px-2 py-1 rounded-full text-xs font-bold">
                              {recipe.match} match
                            </span>
                          </div>
                          <div className="flex items-center space-x-3 text-white/60 text-sm">
                            <span>⏱️ {recipe.time}</span>
                            <span>🔥 {recipe.difficulty}</span>
                          </div>
                        </div>
                        <button className="w-10 h-10 bg-gradient-veggie rounded-xl flex items-center justify-center">
                          <span className="text-white">→</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentView('chat')}
                  className="btn-secondary w-full py-4"
                >
                  <span className="text-xl mr-2">💬</span>
                  Ask VeggieAI for Custom Recipes
                </button>
              </div>
            )}
          </div>
        );

      case 'planner':
        return (
          <div className="flex-1 overflow-y-auto pb-32">
            <div className="p-6 text-center border-b border-lettuce/10">
              <div className="w-16 h-16 bg-gradient-veggie rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📅</span>
              </div>
              <h1 className="font-display text-2xl text-white mb-2">Meal Planner</h1>
              <p className="text-white/80 font-body text-sm">Plan your week, reduce waste</p>
            </div>

            <div className="p-4">
              <div className="glass-card rounded-3xl p-6 shadow-sm border border-lettuce/10 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading text-lg font-bold text-white">This Week</h3>
                  <span className="text-white/60 text-sm">Jan 8-14, 2025</span>
                </div>
                
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="text-center">
                      <p className="text-white/60 text-xs font-body mb-2">{day}</p>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${
                        index === 3 ? 'bg-gradient-veggie text-white' : 'bg-white/10 text-white'
                      }`}>
                        {8 + index}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-lettuce/10 to-carrot/10 rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🌅</span>
                      <div>
                        <p className="font-heading font-semibold text-white">Breakfast</p>
                        <p className="text-white/60 text-sm">Fresh Fruit Bowl</p>
                      </div>
                    </div>
                    <span className="text-lettuce text-sm font-bold">✓ Planned</span>
                  </div>

                  <div className="flex items-center justify-between p-3 glass-card rounded-2xl border-2 border-dashed border-lettuce/30">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">☀️</span>
                      <div>
                        <p className="font-heading font-semibold text-white">Lunch</p>
                        <p className="text-white/60 text-sm">Plan a meal</p>
                      </div>
                    </div>
                    <button className="clickable-btn bg-lettuce/20 text-lettuce px-3 py-1 rounded-full text-sm font-bold">
                      + Add
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 glass-card rounded-2xl border-2 border-dashed border-lettuce/30">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">🌙</span>
                      <div>
                        <p className="font-heading font-semibold text-white">Dinner</p>
                        <p className="text-white/60 text-sm">Plan a meal</p>
                      </div>
                    </div>
                    <button className="clickable-btn bg-lettuce/20 text-lettuce px-3 py-1 rounded-full text-sm font-bold">
                      + Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button className="btn-primary w-full py-4">
                  <span className="text-xl mr-2">🎯</span>
                  Smart Weekly Plan
                </button>
                
                <div className="flex space-x-3">
                  <button className="clickable-btn flex-1 glass-card text-white py-3 rounded-xl font-heading font-semibold border-2 border-lettuce/30 hover:border-lettuce transition-colors">
                    🛒 Shopping List
                  </button>
                  <button className="clickable-btn flex-1 glass-card text-white py-3 rounded-xl font-heading font-semibold border-2 border-lettuce/30 hover:border-lettuce transition-colors">
                    📊 Nutrition Goals
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showWelcome) {
    return <WelcomeScreen onComplete={handleWelcomeComplete} />;
  }

  return (
    <div className="min-h-screen fruity-enhanced-bg">
      <div className="flex flex-col min-h-screen page-container">
        <div className="page-view active">
          {renderCurrentView()}
        </div>
      </div>
      
      {/* Transparent Glass Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 nav-container px-4 py-3 z-40">
        <div className="flex justify-around items-center max-w-md mx-auto">
          {[
            { id: 'camera', icon: '📸', label: 'Scan' },
            { id: 'chat', icon: '💬', label: 'VeggieAI' },
            { id: 'inventory', icon: '📦', label: 'Pantry' },
            { id: 'recipes', icon: '👨‍🍳', label: 'Recipes' },
            { id: 'planner', icon: '📅', label: 'Planner' },
          ].map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleViewChange(item.id)}
                className={`nav-item flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                  isActive ? 'active' : ''
                }`}
              >
                <span className="text-2xl mb-1 nav-icon">
                  {item.icon}
                </span>
                <span className="nav-label font-heading">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
      
      {/* VeggieAI Tips */}
      {showVeggieTips && (
        <VeggieAITips onLogoClick={handleOpenChat} />
      )}
    </div>
  );
}

export default App;