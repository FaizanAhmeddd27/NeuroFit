import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  changePassword,
  getDashboardStats,
  getAccountStats,
  deleteAccount,
} from '../controllers/user.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // Protect all user routes

router.route('/profile').get(getUserProfile).put(updateUserProfile);

router.route('/change-password').put(changePassword);

router.route('/dashboard').get(getDashboardStats);

router.route('/account-stats').get(getAccountStats);

router.route('/account').delete(deleteAccount);

export default router;