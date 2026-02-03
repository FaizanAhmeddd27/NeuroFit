import React, { createContext, useState, useContext, useEffect } from 'react';
import workoutService from '../services/workoutService';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const WorkoutContext = createContext();

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within WorkoutProvider');
  }
  return context;
};

export const WorkoutProvider = ({ children }) => {
  const { user } = useAuth();
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user) {
      fetchWorkouts();
      fetchWorkoutStats();
    }
  }, [user]);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const response = await workoutService.getWorkouts();
      setWorkouts(response.data);
    } catch (error) {
      console.error('Failed to fetch workouts:', error);
      toast.error('Failed to load workouts');
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkoutStats = async () => {
    try {
      const response = await workoutService.getWorkoutStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch workout stats:', error);
    }
  };

  const createWorkout = async (workoutData) => {
    try {
      const response = await workoutService.createWorkout(workoutData);
      setWorkouts([response.data, ...workouts]);
      toast.success('Workout added successfully! 💪');
      fetchWorkoutStats();
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Failed to create workout';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateWorkout = async (id, workoutData) => {
    try {
      const response = await workoutService.updateWorkout(id, workoutData);
      setWorkouts(
        workouts.map((workout) =>
          workout._id === id ? response.data : workout
        )
      );
      toast.success('Workout updated successfully! ✅');
      fetchWorkoutStats();
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Failed to update workout';
      toast.error(errorMessage);
      throw error;
    }
  };

  const deleteWorkout = async (id) => {
    try {
      await workoutService.deleteWorkout(id);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
      toast.success('Workout deleted successfully! 🗑️');
      fetchWorkoutStats();
    } catch (error) {
      const errorMessage = error.message || 'Failed to delete workout';
      toast.error(errorMessage);
      throw error;
    }
  };

  const getAITips = async (workoutData) => {
    try {
      const response = await workoutService.getAIWorkoutTips(workoutData);
      return response.data;
    } catch (error) {
      toast.error('Failed to get AI tips');
      throw error;
    }
  };

  const value = {
    workouts,
    loading,
    stats,
    fetchWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    getAITips,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};