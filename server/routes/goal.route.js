import express from 'express';
import {
  getGoals,
  getGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  getActiveGoal,
  updateGoalProgress,
} from '../controllers/goal.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate, goalValidation } from '../utils/validators.js';

const router = express.Router();

router.use(protect); // Protect all goal routes

router.route('/').get(getGoals).post(validate(goalValidation), createGoal);

router.route('/active').get(getActiveGoal);

router.route('/:id/progress').put(updateGoalProgress);

router.route('/:id').get(getGoal).put(updateGoal).delete(deleteGoal);

export default router;