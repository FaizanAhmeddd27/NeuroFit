import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    foodName: {
      type: String,
      required: [true, 'Please provide food name'],
      trim: true,
      maxlength: [100, 'Food name cannot exceed 100 characters'],
    },
    mealType: {
      type: String,
      required: [true, 'Please select meal type'],
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    },
    description: {
      type: String,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    portion: {
      type: String,
      default: '1 serving',
    },
    calories: {
      type: Number,
      required: [true, 'Please provide calories'],
      min: [0, 'Calories cannot be negative'],
    },
    protein: {
      type: Number,
      required: [true, 'Please provide protein amount'],
      min: [0, 'Protein cannot be negative'],
    },
    carbohydrates: {
      type: Number,
      required: [true, 'Please provide carbohydrates amount'],
      min: [0, 'Carbohydrates cannot be negative'],
    },
    fat: {
      type: Number,
      required: [true, 'Please provide fat amount'],
      min: [0, 'Fat cannot be negative'],
    },
    fiber: {
      type: Number,
      default: 0,
      min: [0, 'Fiber cannot be negative'],
    },
    sugar: {
      type: Number,
      default: 0,
      min: [0, 'Sugar cannot be negative'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    aiAnalysis: {
      healthScore: {
        type: Number,
        min: [0, 'Health score must be between 0 and 100'],
        max: [100, 'Health score must be between 0 and 100'],
      },
      recommendations: String,
      alternatives: [String],
    },
    recipeUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
mealSchema.index({ user: 1, date: -1 });

// Calculate total macros
mealSchema.methods.getTotalMacros = function () {
  return {
    calories: this.calories,
    protein: this.protein,
    carbohydrates: this.carbohydrates,
    fat: this.fat,
    fiber: this.fiber,
    sugar: this.sugar,
  };
};

// Calculate health score based on macros
mealSchema.methods.calculateHealthScore = function () {
  let score = 50; // base score

  // Protein score (0-25 points)
  const proteinPercentage = ((this.protein * 4) / this.calories) * 100;
  if (proteinPercentage >= 20 && proteinPercentage <= 35) {
    score += 20;
  } else if (proteinPercentage >= 15 && proteinPercentage <= 40) {
    score += 10;
  }

  // Fat score (0-25 points)
  const fatPercentage = ((this.fat * 9) / this.calories) * 100;
  if (fatPercentage >= 20 && fatPercentage <= 35) {
    score += 20;
  } else if (fatPercentage >= 15 && fatPercentage <= 40) {
    score += 10;
  }

  // Fiber bonus (0-10 points)
  if (this.fiber >= 5) {
    score += 10;
  } else if (this.fiber >= 3) {
    score += 5;
  }

  // Sugar penalty (0 to -15 points)
  if (this.sugar > 25) {
    score -= 15;
  } else if (this.sugar > 15) {
    score -= 10;
  }

  return Math.max(0, Math.min(100, score));
};

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;