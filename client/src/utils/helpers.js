// Format date
export const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
};

// Format time
export const formatTime = (date) => {
  const options = { hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleTimeString('en-US', options);
};

// Format date and time
export const formatDateTime = (date) => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

// Calculate BMI
export const calculateBMI = (weight, height) => {
  if (!weight || !height) return null;
  const heightInMeters = height / 100;
  return (weight / (heightInMeters * heightInMeters)).toFixed(2);
};

// Get BMI category
export const getBMICategory = (bmi) => {
  if (!bmi) return 'Unknown';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};

// Format number with commas
export const formatNumber = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Get days ago
export const getDaysAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffTime = Math.abs(now - past);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// Validate email
export const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

// Get random color
export const getRandomColor = () => {
  const colors = [
    '#4A90E2',
    '#10B981',
    '#F59E0B',
    '#EF4444',
    '#8B5CF6',
    '#14B8A6',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

// Format calorie value
export const formatCalories = (calories) => {
  if (!calories) return '0 kcal';
  return `${Math.round(calories)} kcal`;
};

// Format weight
export const formatWeight = (weight) => {
  if (!weight) return '0 kg';
  return `${weight} kg`;
};

// Format height
export const formatHeight = (height) => {
  if (!height) return '0 cm';
  return `${height} cm`;
};

// Get workout type icon
export const getWorkoutTypeIcon = (type) => {
  const icons = {
    cardio: '🏃',
    strength: '💪',
    flexibility: '🧘',
    balance: '⚖️',
    hiit: '🔥',
    yoga: '🧘‍♀️',
    pilates: '🤸',
    sports: '⚽',
    other: '🏋️',
  };
  return icons[type] || '🏋️';
};

// Get meal type icon
export const getMealTypeIcon = (type) => {
  const icons = {
    breakfast: '🌅',
    lunch: '🌞',
    dinner: '🌙',
    snack: '🍎',
  };
  return icons[type] || '🍽️';
};

// Get goal type icon
export const getGoalTypeIcon = (type) => {
  const icons = {
    weight_loss: '📉',
    muscle_gain: '💪',
    maintain_weight: '⚖️',
    improve_endurance: '🏃',
    increase_flexibility: '🧘',
    general_fitness: '🎯',
  };
  return icons[type] || '🎯';
};