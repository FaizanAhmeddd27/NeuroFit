import api from './api';

const mealService = {
  // Get all meals
  getMeals: async () => {
    try {
      const response = await api.get('/meals');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single meal
  getMeal: async (id) => {
    try {
      const response = await api.get(`/meals/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get today's meals
  getTodayMeals: async () => {
    try {
      const response = await api.get('/meals/today');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create meal
  createMeal: async (mealData) => {
    try {
      const response = await api.post('/meals', mealData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update meal
  updateMeal: async (id, mealData) => {
    try {
      const response = await api.put(`/meals/${id}`, mealData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete meal
  deleteMeal: async (id) => {
    try {
      const response = await api.delete(`/meals/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get meal statistics
  getMealStats: async () => {
    try {
      const response = await api.get('/meals/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Analyze meal with AI
  analyzeMealWithAI: async (mealData) => {
    try {
      const response = await api.post('/meals/analyze', mealData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get meal recommendations
  getMealRecommendations: async (preferences) => {
    try {
      const response = await api.post('/meals/recommendations', preferences);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get recipe suggestions
  getRecipeSuggestions: async (foodName) => {
    try {
      const response = await api.post('/meals/recipe', { foodName });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default mealService;