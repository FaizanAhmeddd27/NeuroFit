import React from 'react';
import { motion } from 'framer-motion';
import { IoPencil, IoTrash, IoBook, IoTime, IoCheckmarkCircle } from 'react-icons/io5';
import { formatTime, getMealTypeIcon } from '../../utils/helpers';

const MealCard = ({ meal, onEdit, onDelete, onViewRecipe }) => {
  const mealTypeColors = {
    breakfast: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    lunch: 'bg-green-100 text-green-700 border-green-200',
    dinner: 'bg-blue-100 text-blue-700 border-blue-200',
    snack: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  const healthScoreColor = (score) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-blue-500 to-cyan-600';
    if (score >= 40) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-custom-md hover:shadow-custom-xl transition-all border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-3xl shadow-md">
            {getMealTypeIcon(meal.mealType)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">{meal.foodName}</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 border ${
                mealTypeColors[meal.mealType]
              }`}
            >
              {meal.mealType.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(meal)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-all group"
          >
            <IoPencil className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => onDelete(meal._id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-all group"
          >
            <IoTrash className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Description */}
      {meal.description && (
        <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-xl">
          {meal.description}
        </p>
      )}

      {/* Main Macros Grid */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100">
          <p className="text-2xl font-bold text-red-600">{meal.calories}</p>
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Calories</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
          <p className="text-2xl font-bold text-blue-600">{meal.protein}g</p>
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Protein</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
          <p className="text-2xl font-bold text-green-600">{meal.carbohydrates}g</p>
          <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Carbs</p>
        </div>
      </div>

      {/* Additional Macros */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-3 bg-yellow-50 rounded-xl border border-yellow-100">
          <p className="font-bold text-gray-900">{meal.fat}g</p>
          <p className="text-xs text-gray-500 font-semibold">Fat</p>
        </div>
        <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
          <p className="font-bold text-gray-900">{meal.fiber || 0}g</p>
          <p className="text-xs text-gray-500 font-semibold">Fiber</p>
        </div>
        <div className="text-center p-3 bg-pink-50 rounded-xl border border-pink-100">
          <p className="font-bold text-gray-900">{meal.sugar || 0}g</p>
          <p className="text-xs text-gray-500 font-semibold">Sugar</p>
        </div>
      </div>

      {/* Health Score */}
      {meal.aiAnalysis?.healthScore && (
        <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
              <IoCheckmarkCircle className="text-green-600" />
              Health Score
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              {meal.aiAnalysis.healthScore}/100
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${meal.aiAnalysis.healthScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full bg-gradient-to-r ${healthScoreColor(meal.aiAnalysis.healthScore)} rounded-full`}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t-2 border-gray-100 pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IoTime className="text-blue-600" />
          <span className="font-medium">{formatTime(meal.date)}</span>
        </div>
        {onViewRecipe && (
          <button
            onClick={() => onViewRecipe(meal)}
            className="flex items-center gap-2 text-sm text-blue-600 font-bold hover:text-blue-700 transition-colors group"
          >
            <IoBook className="group-hover:scale-110 transition-transform" />
            Recipe
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default MealCard;