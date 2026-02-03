import express from 'express';
import {
  getAIInsights,
  getAIWorkoutPlan,
  getAINutritionPlan,
  aiChat,
  predictProgress,
  getGoalSuggestions,
} from '../controllers/ai.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // Protect all AI routes

router.post('/insights', getAIInsights);
router.post('/workout-plan', getAIWorkoutPlan);
router.post('/nutrition-plan', getAINutritionPlan);
router.post('/chat', aiChat);
router.post('/predict-progress', predictProgress);
router.post('/goal-suggestions', getGoalSuggestions);

export default router;