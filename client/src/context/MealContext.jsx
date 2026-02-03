import React, { createContext, useState, useContext, useEffect } from 'react';
import mealService from '../services/mealService';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContext';

const MealContext = createContext();

export const useMeal = () => {
  const context = useContext(MealContext);
  if (!context) {
    throw new Error('useMeal must be used within MealProvider');
  }
  return context;
};

export const MealProvider = ({ children }) => {
  const { user } = useAuth();
  const [meals, setMeals] = useState([]);
  const [todayMeals, setTodayMeals] = useState([]);
  const [todayTotals, setTodayTotals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user) {
      fetchMeals();
      fetchTodayMeals();
      fetchMealStats();
    }
  }, [user]);

  const fetchMeals = async () => {
    try {
      setLoading(true);
      const response = await mealService.getMeals();
      setMeals(response.data);
    } catch (error) {
      console.error('Failed to fetch meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodayMeals = async () => {
    try {
      const response = await mealService.getTodayMeals();
      setTodayMeals(response.data.meals);
      setTodayTotals(response.data.totals);
    } catch (error) {
      console.error('Failed to fetch today meals:', error);
    }
  };

  const fetchMealStats = async () => {
    try {
      const response = await mealService.getMealStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch meal stats:', error);
    }
  };

  const createMeal = async (mealData) => {
    try {
      const response = await mealService.createMeal(mealData);
      setMeals([response.data, ...meals]);
      toast.success('Meal added successfully! 🍽️');
      fetchTodayMeals();
      fetchMealStats();
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Failed to create meal';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateMeal = async (id, mealData) => {
    try {
      const response = await mealService.updateMeal(id, mealData);
      setMeals(meals.map((meal) => (meal._id === id ? response.data : meal)));
      toast.success('Meal updated successfully! ✅');
      fetchTodayMeals();
      fetchMealStats();
      return response;
    } catch (error) {
      const errorMessage = error.message || 'Failed to update meal';
      toast.error(errorMessage);
      throw error;
    }
  };

  const deleteMeal = async (id) => {
    try {
      await mealService.deleteMeal(id);
      setMeals(meals.filter((meal) => meal._id !== id));
      toast.success('Meal deleted successfully! 🗑️');
      fetchTodayMeals();
      fetchMealStats();
    } catch (error) {
      const errorMessage = error.message || 'Failed to delete meal';
      toast.error(errorMessage);
      throw error;
    }
  };

  const analyzeMeal = async (mealData) => {
    try {
      const response = await mealService.analyzeMealWithAI(mealData);
      return response.data;
    } catch (error) {
      toast.error('Failed to analyze meal');
      throw error;
    }
  };

  const getMealRecommendations = async (preferences) => {
    try {
      const response = await mealService.getMealRecommendations(preferences);
      return response.data;
    } catch (error) {
      toast.error('Failed to get recommendations');
      throw error;
    }
  };

  const getRecipe = async (foodName) => {
    try {
      const response = await mealService.getRecipeSuggestions(foodName);
      return response.data;
    } catch (error) {
      toast.error('Failed to get recipe');
      throw error;
    }
  };

  const value = {
    meals,
    todayMeals,
    todayTotals,
    loading,
    stats,
    fetchMeals,
    createMeal,
    updateMeal,
    deleteMeal,
    analyzeMeal,
    getMealRecommendations,
    getRecipe,
  };

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
};