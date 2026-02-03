import Goal from '../models/goal.model.js';
import { generateAIResponse } from '../config/gemini.js';


export const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: goals.length,
      data: goals,
    });
  } catch (error) {
    next(error);
  }
};


export const getGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this goal',
      });
    }

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};


export const createGoal = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const goal = await Goal.create(req.body);

    // Generate AI recommendations
    const aiPrompt = `Create a fitness recommendation for someone with these goals:
    - Target: ${goal.targetType}
    - Age: ${goal.age}
    - Height: ${goal.height}cm
    - Current Weight: ${goal.currentWeight}kg
    - Target Weight: ${goal.targetWeight}kg
    - Duration: ${goal.duration} days
    
    Provide brief, actionable recommendations for diet and exercise. Keep it under 200 words.`;

    try {
      const aiRecommendations = await generateAIResponse(aiPrompt);
      goal.aiRecommendations = aiRecommendations;
      await goal.save();
    } catch (aiError) {
      console.error('AI recommendation failed:', aiError);
    }

    res.status(201).json({
      success: true,
      message: 'Goal created successfully',
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};


export const updateGoal = async (req, res, next) => {
  try {
    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    // Make sure user owns goal
    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this goal',
      });
    }

    goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Goal updated successfully',
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this goal',
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Goal deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};


export const getActiveGoal = async (req, res, next) => {
  try {
    const goal = await Goal.findOne({
      user: req.user.id,
      status: 'active',
    }).sort({ createdAt: -1 });

    if (!goal) {
      return res.status(200).json({
        success: true,
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};


export const updateGoalProgress = async (req, res, next) => {
  try {
    const { currentWeight } = req.body;

    let goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        success: false,
        message: 'Goal not found',
      });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this goal',
      });
    }

    goal.currentWeight = currentWeight;
    goal.progress = goal.calculateProgress();

    // Check if goal is completed
    if (goal.progress >= 100) {
      goal.status = 'completed';
    }

    await goal.save();

    res.status(200).json({
      success: true,
      message: 'Goal progress updated successfully',
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};