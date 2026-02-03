import { generateAIResponse } from '../config/gemini.js';
import User from '../models/user.model.js';
import Workout from '../models/workout.model.js';
import Meal from '../models/meal.model.js';
import Goal from '../models/goal.model.js';



export const getAIInsights = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    // Get recent data
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentWorkouts = await Workout.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo },
    });

    const recentMeals = await Meal.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo },
    });

    const activeGoal = await Goal.findOne({
      user: req.user.id,
      status: 'active',
    }).sort({ createdAt: -1 });

    const totalCalories = recentMeals.reduce(
      (sum, meal) => sum + (meal.calories || 0),
      0
    );
    const avgDailyCalories = Math.round(totalCalories / 7);

    const prompt = `As a fitness AI coach, provide personalized insights for this user:

User Profile:
- Age: ${user.age || 'N/A'}
- Weight: ${user.weight || 'N/A'}kg
- Height: ${user.height || 'N/A'}cm
- Activity Level: ${user.activityLevel || 'moderate'}
- Daily Calorie Goal: ${user.dailyCalorieGoal}

Recent Activity (Last 7 days):
- Workouts completed: ${recentWorkouts.length}
- Meals logged: ${recentMeals.length}
- Average daily calories: ${avgDailyCalories}

${activeGoal ? `Active Goal: ${activeGoal.targetType} - ${activeGoal.name}` : ''}

Format the response exactly as follows using Markdown:
## Overall Assessment
[Provide a 1-2 sentence overall assessment]

## Specific Recommendations
- **[Recommendation 1]**: [Details]
- **[Recommendation 2]**: [Details]
- **[Recommendation 3]**: [Details]

## Motivation
[Motivational message]

Keep it under 250 words, encouraging, and actionable. Do not use tables.`;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      data: {
        insights: aiResponse,
        generatedAt: new Date(),
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getAIWorkoutPlan = async (req, res, next) => {
  try {
    const { goal, daysPerWeek, duration, fitnessLevel } = req.body;
    const user = await User.findById(req.user.id);

    const prompt = `Create a ${daysPerWeek}-day per week workout plan for:

User Details:
- Age: ${user.age || 25}
- Weight: ${user.weight || 70}kg
- Fitness Level: ${fitnessLevel || 'intermediate'}
- Goal: ${goal || 'general fitness'}
- Session Duration: ${duration || 45} minutes

Provide:
1. Weekly workout schedule
2. Exercise details for each day
3. Rest days
4. Tips for success

Format it clearly and make it practical for home/gym workouts.`;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      data: {
        workoutPlan: aiResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAINutritionPlan = async (req, res, next) => {
  try {
    const { goal, dietaryPreferences, calorieTarget } = req.body;
    const user = await User.findById(req.user.id);

    const prompt = `Create a daily nutrition plan for:

User Details:
- Weight: ${user.weight || 70}kg
- Goal: ${goal || 'maintain weight'}
- Calorie Target: ${calorieTarget || user.dailyCalorieGoal || 2000}
- Dietary Preferences: ${dietaryPreferences || 'balanced diet'}

Provide:
1. Daily meal breakdown (breakfast, lunch, dinner, snacks)
2. Macronutrient distribution
3. Sample meal ideas
4. Hydration tips

Keep it practical and easy to follow.`;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      data: {
        nutritionPlan: aiResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const aiChat = async (req, res, next) => {
  try {
    const { message } = req.body;
    const user = await User.findById(req.user.id);

    const prompt = `You are a personal fitness coach. The user asks: "${message}"

User context:
- Age: ${user.age || 'N/A'}
- Weight: ${user.weight || 'N/A'}kg
- Activity Level: ${user.activityLevel || 'moderate'}

Provide a helpful, encouraging, and expert response. Keep it under 200 words.`;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      data: {
        reply: aiResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const predictProgress = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const activeGoal = await Goal.findOne({
      user: req.user.id,
      status: 'active',
    });

    if (!activeGoal) {
      return res.status(404).json({
        success: false,
        message: 'No active goal found',
      });
    }

    // Get workout history
    const totalWorkouts = await Workout.countDocuments({ user: req.user.id });
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentWorkouts = await Workout.countDocuments({
      user: req.user.id,
      date: { $gte: thirtyDaysAgo },
    });

    const prompt = `Predict fitness progress for this user:

Current Goal: ${activeGoal.targetType}
- Current Weight: ${activeGoal.currentWeight}kg
- Target Weight: ${activeGoal.targetWeight}kg
- Duration: ${activeGoal.duration} days
- Days Elapsed: ${Math.floor((Date.now() - activeGoal.startDate) / (1000 * 60 * 60 * 24))}
- Weekly Workout Target: ${activeGoal.weeklyWorkoutTarget}
- Actual Recent Activity: ${recentWorkouts} workouts in last 30 days

Provide:
1. Progress assessment
2. Likelihood of achieving goal
3. Recommended adjustments
4. Timeline prediction

Be realistic and encouraging.`;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      data: {
        prediction: aiResponse,
        currentProgress: activeGoal.progress,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getGoalSuggestions = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const { userInput } = req.body;

    const prompt = `Suggest SMART fitness goals for:

User Profile:
- Age: ${user.age || 'N/A'}
- Current Weight: ${user.weight || 'N/A'}kg
- Height: ${user.height || 'N/A'}cm
- Activity Level: ${user.activityLevel || 'moderate'}
${userInput ? `- User wants: ${userInput}` : ''}

Provide 3 specific, achievable fitness goals with:
- Goal name
- Target metric
- Recommended duration
- Key actions needed

Make them realistic and motivating.`;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      data: {
        suggestions: aiResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};