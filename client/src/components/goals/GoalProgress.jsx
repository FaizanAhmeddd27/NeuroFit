import React from 'react';
import { motion } from 'framer-motion';

const GoalProgress = ({ progress }) => {
  const getProgressColor = (value) => {
    if (value >= 75) return 'from-green-500 to-emerald-600';
    if (value >= 50) return 'from-blue-500 to-indigo-600';
    if (value >= 25) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-bold text-gray-700">Overall Progress</span>
        <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {progress}%
        </span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${getProgressColor(progress)} rounded-full shadow-md`}
        />
      </div>
      <div className="mt-2 text-xs text-gray-500 text-center font-medium">
        {progress < 25 && 'Just getting started! 🚀'}
        {progress >= 25 && progress < 50 && 'Making progress! 💪'}
        {progress >= 50 && progress < 75 && 'Halfway there! 🎯'}
        {progress >= 75 && progress < 100 && 'Almost there! 🔥'}
        {progress === 100 && 'Goal achieved! 🎉'}
      </div>
    </div>
  );
};

export default GoalProgress;