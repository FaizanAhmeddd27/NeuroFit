import express from 'express';
import {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutStats,
  getAIWorkoutTips,
} from '../controllers/workout.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { validate, workoutValidation } from '../utils/validators.js';

const router = express.Router();

router.use(protect); // Protect all workout routes

router.route('/').get(getWorkouts).post(validate(workoutValidation), createWorkout);

router.route('/stats').get(getWorkoutStats);

router.route('/ai-tips').post(getAIWorkoutTips);

router.route('/:id').get(getWorkout).put(updateWorkout).delete(deleteWorkout);

export default router;