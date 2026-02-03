import React from 'react';
import { motion } from 'framer-motion';
import { IoFlame, IoFitness, IoNutrition, IoWater, IoTrendingUp } from 'react-icons/io5';

const NutritionSummary = ({ todayTotals, calorieGoal }) => {
  const remaining = calorieGoal - (todayTotals?.calories || 0);
  const percentage = Math.min(
    Math.round(((todayTotals?.calories || 0) / calorieGoal) * 100),
    100
  );

  const getProgressColor = () => {
    if (percentage > 100) return 'from-red-500 to-pink-600';
    if (percentage >= 80) return 'from-orange-500 to-amber-600';
    if (percentage >= 50) return 'from-green-500 to-emerald-600';
    return 'from-blue-500 to-cyan-600';
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-custom-md border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            Today's Nutrition
          </h3>
          <p className="text-sm text-gray-600">Track your daily intake</p>
        </div>
        <div className="px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <p className="text-xs font-bold text-green-600 uppercase">Daily Summary</p>
        </div>
      </div>

      {/* Calorie Progress */}
      <div className="mb-6 p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-xl border border-blue-100">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
            <IoTrendingUp className="text-blue-600" />
            Calories Consumed
          </span>
          <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {todayTotals?.calories || 0} / {calorieGoal} kcal
          </span>
        </div>
        <div className="h-4 bg-white bg-opacity-50 rounded-full overflow-hidden shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`h-full bg-gradient-to-r ${getProgressColor()} rounded-full shadow-md`}
          />
        </div>
        <p className={`text-sm mt-3 font-semibold text-center ${
          remaining > 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {remaining > 0
            ? `${remaining} kcal remaining 🎯`
            : `${Math.abs(remaining)} kcal over goal ⚠️`}
        </p>
      </div>

      {/* Macros Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100"
        >
          <IoFlame className="w-10 h-10 mx-auto mb-3 text-red-500" />
          <p className="text-3xl font-bold text-gray-900">
            {todayTotals?.calories || 0}
          </p>
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Calories</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
        >
          <IoFitness className="w-10 h-10 mx-auto mb-3 text-blue-500" />
          <p className="text-3xl font-bold text-gray-900">
            {todayTotals?.protein || 0}g
          </p>
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Protein</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100"
        >
          <IoNutrition className="w-10 h-10 mx-auto mb-3 text-green-500" />
          <p className="text-3xl font-bold text-gray-900">
            {todayTotals?.carbohydrates || 0}g
          </p>
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Carbs</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center p-5 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-100"
        >
          <IoWater className="w-10 h-10 mx-auto mb-3 text-yellow-500" />
          <p className="text-3xl font-bold text-gray-900">
            {todayTotals?.fat || 0}g
          </p>
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Fat</p>
        </motion.div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t-2 border-gray-100 grid grid-cols-2 gap-4">
        <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-600 font-semibold mb-1">Fiber</p>
          <p className="text-xl font-bold text-gray-900">{todayTotals?.fiber || 0}g</p>
        </div>
        <div className="p-3 bg-pink-50 rounded-xl border border-pink-100">
          <p className="text-xs text-gray-600 font-semibold mb-1">Sugar</p>
          <p className="text-xl font-bold text-gray-900">{todayTotals?.sugar || 0}g</p>
        </div>
      </div>
    </div>
  );
};

export default NutritionSummary;