import api from './api';

const aiService = {
  // Get AI fitness insights
  getAIInsights: async () => {
    try {
      const response = await api.post('/ai/insights');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get AI workout plan
  getAIWorkoutPlan: async (planData) => {
    try {
      const response = await api.post('/ai/workout-plan', planData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get AI nutrition plan
  getAINutritionPlan: async (planData) => {
    try {
      const response = await api.post('/ai/nutrition-plan', planData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // AI chat
  aiChat: async (message) => {
    try {
      const response = await api.post('/ai/chat', { message });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Predict progress
  predictProgress: async () => {
    try {
      const response = await api.post('/ai/predict-progress');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get goal suggestions
  getGoalSuggestions: async (userInput) => {
    try {
      const response = await api.post('/ai/goal-suggestions', { userInput });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default aiService;