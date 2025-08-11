export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate: Date;
  imageUrl?: string;
  category: FoodCategory;
  currentPrice?: number;
  priceSource: string;
  calories: number;
}

export type FoodCategory = 'vegetables' | 'fruits' | 'dairy' | 'meat' | 'grains' | 'spices';

export interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  cookingTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  availableIngredients: number;
  totalIngredients: number;
  expiryPriority: boolean;
  totalCalories: number;
  caloriesPerServing: number;
  servings: number;
  source: 'youtube' | 'spoonacular' | 'allrecipes' | 'foodnetwork' | 'veggieai';
  videoUrl?: string;
  originalUrl?: string;
  rating: number;
  reviewCount: number;
  isSuggestion: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export type ViewType = 'welcome' | 'camera' | 'chat' | 'inventory' | 'recipes' | 'planner';

export interface AppState {
  inventory: InventoryItem[];
  recipes: Recipe[];
  chatMessages: ChatMessage[];
  currentView: ViewType;
  isLoading: boolean;
}