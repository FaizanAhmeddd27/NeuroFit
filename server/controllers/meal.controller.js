import Meal from '../models/meal.model.js';
import { generateAIResponse } from '../config/gemini.js';


export const getMeals = async (req, res, next) => {
  try {
    const meals = await Meal.find({ user: req.user.id }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      count: meals.length,
      data: meals,
    });
  } catch (error) {
    next(error);
  }
};


export const getMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found',
      });
    }

    // Make sure user owns meal
    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this meal',
      });
    }

    res.status(200).json({
      success: true,
      data: meal,
    });
  } catch (error) {
    next(error);
  }
};


export const createMeal = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const meal = await Meal.create(req.body);

    // Calculate health score
    meal.aiAnalysis = {
      healthScore: meal.calculateHealthScore(),
    };
    await meal.save();

    res.status(201).json({
      success: true,
      message: 'Meal created successfully',
      data: meal,
    });
  } catch (error) {
    next(error);
  }
};


export const updateMeal = async (req, res, next) => {
  try {
    let meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found',
      });
    }

    // Make sure user owns meal
    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this meal',
      });
    }

    meal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // Recalculate health score
    meal.aiAnalysis.healthScore = meal.calculateHealthScore();
    await meal.save();

    res.status(200).json({
      success: true,
      message: 'Meal updated successfully',
      data: meal,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteMeal = async (req, res, next) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({
        success: false,
        message: 'Meal not found',
      });
    }

    // Make sure user owns meal
    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this meal',
      });
    }

    await meal.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Meal deleted successfully',
      data: {},
    });
  } catch (error) {
    next(error);
  }
};


export const getTodayMeals = async (req, res, next) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const meals = await Meal.find({
      user: req.user.id,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ date: -1 });

    // Calculate totals
    const totals = meals.reduce(
      (acc, meal) => {
        acc.calories += meal.calories || 0;
        acc.protein += meal.protein || 0;
        acc.carbohydrates += meal.carbohydrates || 0;
        acc.fat += meal.fat || 0;
        acc.fiber += meal.fiber || 0;
        acc.sugar += meal.sugar || 0;
        return acc;
      },
      {
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
        fiber: 0,
        sugar: 0,
      }
    );

    res.status(200).json({
      success: true,
      count: meals.length,
      data: {
        meals,
        totals,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const getMealStats = async (req, res, next) => {
  try {
    // Get last 7 days meals
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const meals = await Meal.find({
      user: req.user.id,
      date: { $gte: sevenDaysAgo },
    }).sort({ date: -1 });

    // Group by date
    const mealsByDate = meals.reduce((acc, meal) => {
      const dateKey = meal.date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          calories: 0,
          protein: 0,
          carbohydrates: 0,
          fat: 0,
          mealCount: 0,
        };
      }
      acc[dateKey].calories += meal.calories || 0;
      acc[dateKey].protein += meal.protein || 0;
      acc[dateKey].carbohydrates += meal.carbohydrates || 0;
      acc[dateKey].fat += meal.fat || 0;
      acc[dateKey].mealCount += 1;
      return acc;
    }, {});

    // Group by meal type
    const mealsByType = await Meal.aggregate([
      {
        $match: {
          user: req.user._id,
          date: { $gte: sevenDaysAgo },
        },
      },
      {
        $group: {
          _id: '$mealType',
          count: { $sum: 1 },
          totalCalories: { $sum: '$calories' },
          avgCalories: { $avg: '$calories' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        dailyStats: Object.values(mealsByDate),
        mealTypeStats: mealsByType,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const analyzeMealWithAI = async (req, res, next) => {
  try {
    const { foodName, description } = req.body;

    const prompt = `Analyze this meal and provide nutritional estimates:
Food: ${foodName}
Description: ${description || 'Standard serving'}

Provide estimates for:
1. Calories
2. Protein (g)
3. Carbohydrates (g)
4. Fat (g)
5. Fiber (g)
6. Sugar (g)

Also provide:
- Health score (0-100)
- Brief recommendations
- 3 healthier alternatives

Format the response as JSON with these keys: calories, protein, carbohydrates, fat, fiber, sugar, healthScore, recommendations, alternatives (array)`;

    const aiResponse = await generateAIResponse(prompt);

    // Try to parse JSON response
    let analysis;
    try {
      analysis = JSON.parse(aiResponse);
    } catch {
      // If not JSON, return raw response
      analysis = {
        content: aiResponse,
        calories: 0,
        protein: 0,
        carbohydrates: 0,
        fat: 0,
      };
    }

    res.status(200).json({
      success: true,
      data: analysis,
    });
  } catch (error) {
    next(error);
  }
};


export const getMealRecommendations = async (req, res, next) => {
  try {
    const { mealType, calorieTarget, preferences } = req.body;

    const prompt = `Suggest 5 healthy ${mealType} meals for someone with:
- Calorie target: ${calorieTarget || 500} calories per meal
- Preferences: ${preferences || 'balanced nutrition'}

Format each meal exactly as follows using Markdown:
### 1. [Meal Name]
- **Description**: [Brief description]
- **Estimated Calories**: [Amount] kcal
- **Key Nutrients**: [List nutrients]

Keep it concise, practical, and highly readable. Do not use tables.`;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      data: {
        recommendations: aiResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRecipeSuggestions = async (req, res, next) => {
  try {
    const { foodName } = req.body;

    const prompt = `Provide a simple, healthy recipe for ${foodName}. Include:
1. Ingredients (with quantities)
2. Step-by-step instructions
3. Cooking time
4. Estimated nutritional info

Keep it under 300 words and beginner-friendly.`;

    const aiResponse = await generateAIResponse(prompt);

    res.status(200).json({
      success: true,
      data: {
        recipe: aiResponse,
      },
    });
  } catch (error) {
    next(error);
  }
};