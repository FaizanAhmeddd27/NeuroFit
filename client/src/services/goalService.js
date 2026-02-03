import api from './api';

const goalService = {
  // Get all goals
  getGoals: async () => {
    try {
      const response = await api.get('/goals');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single goal
  getGoal: async (id) => {
    try {
      const response = await api.get(`/goals/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get active goal
  getActiveGoal: async () => {
    try {
      const response = await api.get('/goals/active');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create goal
  createGoal: async (goalData) => {
    try {
      const response = await api.post('/goals', goalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update goal
  updateGoal: async (id, goalData) => {
    try {
      const response = await api.put(`/goals/${id}`, goalData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update goal progress
  updateGoalProgress: async (id, progressData) => {
    try {
      const response = await api.put(`/goals/${id}/progress`, progressData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete goal
  deleteGoal: async (id) => {
    try {
      const response = await api.delete(`/goals/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default goalService;