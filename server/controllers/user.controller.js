import User from '../models/user.model.js';
import Workout from '../models/workout.model.js';
import Meal from '../models/meal.model.js';
import Goal from '../models/goal.model.js';
import bcrypt from 'bcryptjs';


export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};


export const updateUserProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      height: req.body.height,
      weight: req.body.weight,
      gender: req.body.gender,
      activityLevel: req.body.activityLevel,
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    // Update daily calorie goal based on new data
    if (user.weight && user.height && user.age && user.gender) {
      user.dailyCalorieGoal = user.calculateDailyCalories();
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password',
      });
    }

    // Get user with password
    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};


export const getDashboardStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    // Get total workouts
    const totalWorkouts = await Workout.countDocuments({ user: req.user.id });

    // Get today's meals
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const todayMeals = await Meal.find({
      user: req.user.id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    const todayCalories = todayMeals.reduce(
      (sum, meal) => sum + (meal.calories || 0),
      0
    );
    const todayProtein = todayMeals.reduce(
      (sum, meal) => sum + (meal.protein || 0),
      0
    );
    const todayCarbs = todayMeals.reduce(
      (sum, meal) => sum + (meal.carbohydrates || 0),
      0
    );
    const todayFat = todayMeals.reduce(
      (sum, meal) => sum + (meal.fat || 0),
      0
    );

    // Get active goals
    const activeGoals = await Goal.find({
      user: req.user.id,
      status: 'active',
    });

    // Get last 7 days workout data
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentWorkouts = await Workout.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo },
    }).sort({ date: -1 });

    // Group workouts by date
    const workoutsByDate = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      workoutsByDate[dateKey] = 0;
    }

    recentWorkouts.forEach((workout) => {
      const dateKey = workout.date.toISOString().split('T')[0];
      if (workoutsByDate.hasOwnProperty(dateKey)) {
        workoutsByDate[dateKey]++;
      }
    });

    const workoutProgress = Object.keys(workoutsByDate)
      .sort()
      .map((date) => ({
        date,
        count: workoutsByDate[date],
      }));

    // Get recent meals for calorie chart
    const recentMeals = await Meal.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo },
    }).sort({ date: -1 });

    const caloriesByDate = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateKey = date.toISOString().split('T')[0];
      caloriesByDate[dateKey] = 0;
    }

    recentMeals.forEach((meal) => {
      const dateKey = meal.date.toISOString().split('T')[0];
      if (caloriesByDate.hasOwnProperty(dateKey)) {
        caloriesByDate[dateKey] += meal.calories || 0;
      }
    });

    const calorieProgress = Object.keys(caloriesByDate)
      .sort()
      .map((date) => ({
        date,
        calories: caloriesByDate[date],
      }));

    // Calculate BMI
    const bmi = user.calculateBMI();

    res.status(200).json({
      success: true,
      data: {
        user: {
          name: user.name,
          email: user.email,
          age: user.age,
          height: user.height,
          weight: user.weight,
          bmi,
          dailyCalorieGoal: user.dailyCalorieGoal,
        },
        stats: {
          totalWorkouts,
          todayMealsCount: todayMeals.length,
          activeGoalsCount: activeGoals.length,
        },
        todayNutrition: {
          calories: todayCalories,
          protein: todayProtein,
          carbohydrates: todayCarbs,
          fat: todayFat,
          calorieGoal: user.dailyCalorieGoal,
          remaining: user.dailyCalorieGoal - todayCalories,
        },
        charts: {
          workoutProgress,
          calorieProgress,
        },
        activeGoals,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getAccountStats = async (req, res, next) => {
  try {
    // Total workouts
    const totalWorkouts = await Workout.countDocuments({ user: req.user.id });

    // Total meals logged
    const totalMeals = await Meal.countDocuments({ user: req.user.id });

    // Total goals
    const totalGoals = await Goal.countDocuments({ user: req.user.id });
    const completedGoals = await Goal.countDocuments({
      user: req.user.id,
      status: 'completed',
    });

    // Workout consistency (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const workoutsLast30Days = await Workout.countDocuments({
      user: req.user.id,
      date: { $gte: thirtyDaysAgo },
    });

    const workoutConsistency = Math.round((workoutsLast30Days / 30) * 100);

    // Average calories per day (last 30 days)
    const mealsLast30Days = await Meal.find({
      user: req.user.id,
      date: { $gte: thirtyDaysAgo },
    });

    const totalCalories = mealsLast30Days.reduce(
      (sum, meal) => sum + (meal.calories || 0),
      0
    );
    const avgCaloriesPerDay = Math.round(totalCalories / 30);

    // Goal completion rate
    const goalCompletionRate =
      totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    // Account age
    const user = await User.findById(req.user.id);
    const accountAge = Math.floor(
      (Date.now() - user.createdAt) / (1000 * 60 * 60 * 24)
    );

    res.status(200).json({
      success: true,
      data: {
        totalWorkouts,
        totalMeals,
        totalGoals,
        completedGoals,
        workoutConsistency,
        avgCaloriesPerDay,
        goalCompletionRate,
        accountAge,
        memberSince: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const deleteAccount = async (req, res, next) => {
  try {
    // Delete all user data
    await Workout.deleteMany({ user: req.user.id });
    await Meal.deleteMany({ user: req.user.id });
    await Goal.deleteMany({ user: req.user.id });
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};