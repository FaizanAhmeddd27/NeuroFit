import express from 'express';
import {
  getMeals,
  getMeal,
  createMeal,
  updateMeal,
  deleteMeal,
  getTodayMeals,
  getMealStats,
  analyzeMealWithAI,
  getMealRecommendations,
  getRecipeSuggestions,
} from '../controllers/meal.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate, mealValidation } from '../utils/validators.js';

const router = express.Router();

router.use(protect); // Protect all meal routes

router.route('/').get(getMeals).post(validate(mealValidation), createMeal);

router.route('/today').get(getTodayMeals);

router.route('/stats').get(getMealStats);

router.route('/analyze').post(analyzeMealWithAI);

router.route('/recommendations').post(getMealRecommendations);

router.route('/recipe').post(getRecipeSuggestions);

router.route('/:id').get(getMeal).put(updateMeal).delete(deleteMeal);

export default router;