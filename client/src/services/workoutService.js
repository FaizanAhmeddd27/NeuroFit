import api from './api';

const workoutService = {
  // Get all workouts
  getWorkouts: async () => {
    try {
      const response = await api.get('/workouts');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get single workout
  getWorkout: async (id) => {
    try {
      const response = await api.get(`/workouts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Create workout
  createWorkout: async (workoutData) => {
    try {
      const response = await api.post('/workouts', workoutData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Update workout
  updateWorkout: async (id, workoutData) => {
    try {
      const response = await api.put(`/workouts/${id}`, workoutData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete workout
  deleteWorkout: async (id) => {
    try {
      const response = await api.delete(`/workouts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get workout statistics
  getWorkoutStats: async () => {
    try {
      const response = await api.get('/workouts/stats');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get AI workout tips
  getAIWorkoutTips: async (workoutData) => {
    try {
      const response = await api.post('/workouts/ai-tips', workoutData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default workoutService;