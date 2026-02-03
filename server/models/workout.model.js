import mongoose from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    workoutName: {
      type: String,
      required: [true, 'Please provide a workout name'],
      trim: true,
      maxlength: [100, 'Workout name cannot exceed 100 characters'],
    },
    workoutType: {
      type: String,
      required: [true, 'Please select a workout type'],
      enum: [
        'cardio',
        'strength',
        'flexibility',
        'balance',
        'hiit',
        'yoga',
        'pilates',
        'sports',
        'other',
      ],
    },
    sets: {
      type: Number,
      min: [1, 'Sets must be at least 1'],
      max: [100, 'Sets cannot exceed 100'],
    },
    reps: {
      type: Number,
      min: [1, 'Reps must be at least 1'],
    },
    duration: {
      type: Number, // in minutes
      min: [1, 'Duration must be at least 1 minute'],
    },
    intensity: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    caloriesBurned: {
      type: Number,
      min: [0, 'Calories burned cannot be negative'],
    },
    benefits: {
      type: String,
      maxlength: [500, 'Benefits description cannot exceed 500 characters'],
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    completed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
workoutSchema.index({ user: 1, date: -1 });

// Calculate calories burned based on workout type and duration
workoutSchema.methods.calculateCalories = function (userWeight) {
  const metValues = {
    cardio: 8,
    strength: 6,
    flexibility: 3,
    balance: 3,
    hiit: 10,
    yoga: 3,
    pilates: 4,
    sports: 7,
    other: 5,
  };

  const met = metValues[this.workoutType] || 5;
  const durationInHours = this.duration / 60;
  const calories = met * userWeight * durationInHours;

  return Math.round(calories);
};

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;