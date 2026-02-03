import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a goal name'],
      trim: true,
      maxlength: [100, 'Goal name cannot exceed 100 characters'],
    },
    targetType: {
      type: String,
      required: [true, 'Please select a target type'],
      enum: [
        'weight_loss',
        'muscle_gain',
        'maintain_weight',
        'improve_endurance',
        'increase_flexibility',
        'general_fitness',
      ],
    },
    currentWeight: {
      type: Number,
      required: [true, 'Please provide current weight'],
      min: [20, 'Weight must be at least 20 kg'],
    },
    targetWeight: {
      type: Number,
      min: [20, 'Target weight must be at least 20 kg'],
    },
    age: {
      type: Number,
      required: [true, 'Please provide age'],
      min: [10, 'Age must be at least 10'],
    },
    height: {
      type: Number,
      required: [true, 'Please provide height'],
      min: [50, 'Height must be at least 50 cm'],
    },
    duration: {
      type: Number, // in days
      required: [true, 'Please provide duration'],
      min: [1, 'Duration must be at least 1 day'],
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    weeklyWorkoutTarget: {
      type: Number,
      default: 5,
      min: [1, 'Weekly workout target must be at least 1'],
      max: [7, 'Weekly workout target cannot exceed 7'],
    },
    dailyCalorieTarget: {
      type: Number,
      min: [800, 'Daily calorie target must be at least 800'],
      max: [10000, 'Daily calorie target cannot exceed 10000'],
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'paused', 'cancelled'],
      default: 'active',
    },
    progress: {
      type: Number,
      default: 0,
      min: [0, 'Progress cannot be negative'],
      max: [100, 'Progress cannot exceed 100%'],
    },
    aiRecommendations: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate end date before saving
goalSchema.pre('save', function (next) {
  if (this.isNew && !this.endDate) {
    this.endDate = new Date(
      this.startDate.getTime() + this.duration * 24 * 60 * 60 * 1000
    );
  }
  next();
});

// Calculate progress percentage
goalSchema.methods.calculateProgress = function () {
  if (!this.targetWeight || !this.currentWeight) return 0;

  const initialWeight = this.currentWeight;
  const targetWeight = this.targetWeight;
  const currentWeight = this.currentWeight;

  const totalChange = Math.abs(targetWeight - initialWeight);
  const currentChange = Math.abs(currentWeight - initialWeight);

  const progress = (currentChange / totalChange) * 100;
  return Math.min(Math.round(progress), 100);
};

// Check if goal is expired
goalSchema.methods.isExpired = function () {
  return this.endDate < new Date();
};

const Goal = mongoose.model('Goal', goalSchema);
export default Goal;
