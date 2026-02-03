import { body, validationResult } from 'express-validator';

// Validation middleware wrapper
export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  };
};

// Registration validation
export const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

// Login validation
export const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

// Workout validation
export const workoutValidation = [
  body('workoutName')
    .trim()
    .notEmpty()
    .withMessage('Workout name is required')
    .isLength({ max: 100 })
    .withMessage('Workout name cannot exceed 100 characters'),
  body('workoutType')
    .notEmpty()
    .withMessage('Workout type is required')
    .isIn([
      'cardio',
      'strength',
      'flexibility',
      'balance',
      'hiit',
      'yoga',
      'pilates',
      'sports',
      'other',
    ])
    .withMessage('Invalid workout type'),
  body('intensity')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Intensity must be low, medium, or high'),
];

// Goal validation
export const goalValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Goal name is required')
    .isLength({ max: 100 })
    .withMessage('Goal name cannot exceed 100 characters'),
  body('targetType')
    .notEmpty()
    .withMessage('Target type is required')
    .isIn([
      'weight_loss',
      'muscle_gain',
      'maintain_weight',
      'improve_endurance',
      'increase_flexibility',
      'general_fitness',
    ])
    .withMessage('Invalid target type'),
  body('currentWeight')
    .notEmpty()
    .withMessage('Current weight is required')
    .isFloat({ min: 20 })
    .withMessage('Weight must be at least 20 kg'),
  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 10, max: 120 })
    .withMessage('Age must be between 10 and 120'),
  body('height')
    .notEmpty()
    .withMessage('Height is required')
    .isFloat({ min: 50, max: 300 })
    .withMessage('Height must be between 50 and 300 cm'),
  body('duration')
    .notEmpty()
    .withMessage('Duration is required')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 day'),
];

// Meal validation
export const mealValidation = [
  body('foodName')
    .trim()
    .notEmpty()
    .withMessage('Food name is required')
    .isLength({ max: 100 })
    .withMessage('Food name cannot exceed 100 characters'),
  body('mealType')
    .notEmpty()
    .withMessage('Meal type is required')
    .isIn(['breakfast', 'lunch', 'dinner', 'snack'])
    .withMessage('Invalid meal type'),
  body('calories')
    .notEmpty()
    .withMessage('Calories are required')
    .isFloat({ min: 0 })
    .withMessage('Calories cannot be negative'),
  body('protein')
    .notEmpty()
    .withMessage('Protein is required')
    .isFloat({ min: 0 })
    .withMessage('Protein cannot be negative'),
  body('carbohydrates')
    .notEmpty()
    .withMessage('Carbohydrates are required')
    .isFloat({ min: 0 })
    .withMessage('Carbohydrates cannot be negative'),
  body('fat')
    .notEmpty()
    .withMessage('Fat is required')
    .isFloat({ min: 0 })
    .withMessage('Fat cannot be negative'),
];