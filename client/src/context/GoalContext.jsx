import React, { createContext, useState, useContext, useEffect } from 'react';
import goalService from '../services/goalService';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const GoalContext = createContext();

export const useGoal = () => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error('useGoal must be used within GoalProvider');
  }
  return context;
};

export const GoalProvider = ({ children }) => {
  const { user } = useAuth();
  const [goals, setGoals] = useState([]);
  const [activeGoal, setActiveGoal] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchGoals();
      fetchActiveGoal();
    }
  }, [user]);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await goalService.getGoals();
      setGoals(response.data);
    } catch (error) {
      console.error('Failed to fetch goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveGoal = async () => {
    try {
      const response = await goalService.getActiveGoal();
      setActiveGoal(response.data);
    } catch (error) {
      console.error('No active goal found');
      setActiveGoal(null);
    }
  };

  const createGoal = async (goalData) => {
    try {
      const response = await goalService.createGoal(goalData);
      setGoals([response.data, ...goals]);
      toast.success('Goal created successfully! 🎯');
      fetchActiveGoal();
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Failed to create goal';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateGoal = async (id, goalData) => {
    try {
      const response = await goalService.updateGoal(id, goalData);
      setGoals(
        goals.map((goal) => (goal._id === id ? response.data : goal))
      );
      toast.success('Goal updated successfully! ✅');
      fetchActiveGoal();
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Failed to update goal';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateProgress = async (id, progressData) => {
    try {
      const response = await goalService.updateGoalProgress(id, progressData);
      setGoals(
        goals.map((goal) => (goal._id === id ? response.data : goal))
      );
      toast.success('Progress updated! 📈');
      fetchActiveGoal();
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Failed to update progress';
      toast.error(errorMessage);
      throw error;
    }
  };

  const deleteGoal = async (id) => {
    try {
      await goalService.deleteGoal(id);
      setGoals(goals.filter((goal) => goal._id !== id));
      toast.success('Goal deleted successfully! 🗑️');
      fetchActiveGoal();
    } catch (error) {
      const errorMessage = error.message || 'Failed to delete goal';
      toast.error(errorMessage);
      throw error;
    }
  };

  const value = {
    goals,
    activeGoal,
    loading,
    fetchGoals,
    createGoal,
    updateGoal,
    updateProgress,
    deleteGoal,
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};