import Workout from '../models/workout.model.js';
import User from '../models/user.model.js';
import { generateAIResponse } from '../config/gemini.js';


export const getWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.status(200).json({
      success: true,
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    next(error);
  }
};


export const getWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found',
      });
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this workout',
      });
    }

    res.status(200).json({
      success: true,
      data: workout,
    });
  } catch (error) {
    next(error);
  }
};


export const createWorkout = async (req, res, next) => {
  try {
    req.body.user = req.user.id;

    const user = await User.findById(req.user.id);

    const workout = await Workout.create(req.body);

    if (!workout.caloriesBurned && workout.duration && user.weight) {
      workout.caloriesBurned = workout.calculateCalories(user.weight);
      await workout.save();
    }

    res.status(201).json({
      success: true,
      message: 'Workout created successfully',
      data: workout,
    });
  } catch (error) {
    next(error);
  }
};


export const updateWorkout = async (req, res, next) => {
  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found',
      });
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this workout',
      });
    }

    workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Workout updated successfully',
      data: workout,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found',
      });
    }

    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this workout',
      });
    }

    await workout.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Workout deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};


export const getWorkoutStats = async (req, res, next) => {
  try {
    const stats = await Workout.aggregate([
      {
        $match: { user: req.user._id },
      },
      {
        $group: {
          _id: '$workoutType',
          count: { $sum: 1 },
          totalCalories: { $sum: '$caloriesBurned' },
          totalDuration: { $sum: '$duration' },
        },
      },
    ]);

    const totalWorkouts = await Workout.countDocuments({ user: req.user.id });

    // Get last 7 days workouts
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentWorkouts = await Workout.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo },
    }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: {
        totalWorkouts,
        workoutsByType: stats,
        recentWorkouts,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getAIWorkoutTips = async (req, res, next) => {
  try {
    const { workoutType, intensity, duration } = req.body;

    const prompt = `Generate 5 quick workout tips for a ${intensity} intensity ${workoutType} workout lasting ${duration} minutes. Keep each tip brief and actionable. Format as a simple list.`;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      data: {
        tips: aiResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};