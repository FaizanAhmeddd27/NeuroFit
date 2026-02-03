import React from 'react';
import { motion } from 'framer-motion';
import { IoPencil, IoTrash, IoTrendingUp, IoCalendar, IoCheckmarkCircle } from 'react-icons/io5';
import { formatDate, getGoalTypeIcon } from '../../utils/helpers';
import GoalProgress from './GoalProgress';

const GoalCard = ({ goal, onEdit, onDelete, onUpdateProgress }) => {
  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-200',
    completed: 'bg-blue-100 text-blue-700 border-blue-200',
    paused: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    cancelled: 'bg-red-100 text-red-700 border-red-200',
  };

  const daysRemaining = Math.ceil(
    (new Date(goal.endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className="bg-white rounded-2xl p-6 shadow-custom-md hover:shadow-custom-xl transition-all h-full flex flex-col border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl shadow-md">
            {getGoalTypeIcon(goal.targetType)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate">{goal.name}</h3>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 border ${
                statusColors[goal.status]
              }`}
            >
              {goal.status.toUpperCase()}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(goal)}
            className="p-2 hover:bg-blue-50 rounded-lg transition-all group"
          >
            <IoPencil className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => onDelete(goal._id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-all group"
          >
            <IoTrash className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <GoalProgress progress={goal.progress} />
      </div>

      {/* Goal Details */}
      <div className="space-y-3 mb-4 flex-1">
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
          <span className="text-sm font-semibold text-gray-700">Current Weight</span>
          <span className="font-bold text-gray-900 text-lg">
            {goal.currentWeight} kg
          </span>
        </div>
        {goal.targetWeight && (
          <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <span className="text-sm font-semibold text-gray-700">Target Weight</span>
            <span className="font-bold text-gray-900 text-lg">
              {goal.targetWeight} kg
            </span>
          </div>
        )}
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
          <span className="text-sm font-semibold text-gray-700">Duration</span>
          <span className="font-bold text-gray-900 text-lg">
            {goal.duration} days
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl">
          <span className="text-sm font-semibold text-gray-700">Weekly Workouts</span>
          <span className="font-bold text-gray-900 text-lg">
            {goal.weeklyWorkoutTarget} days
          </span>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t-2 border-gray-100 pt-4 space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IoCalendar className="text-blue-600" />
          <span className="font-medium">Started: {formatDate(goal.startDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <IoTrendingUp className={daysRemaining > 0 ? 'text-green-600' : 'text-red-600'} />
          <span className={`font-medium ${daysRemaining > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {daysRemaining > 0
              ? `${daysRemaining} days remaining`
              : 'Goal period ended'}
          </span>
        </div>
      </div>

      {/* AI Recommendations */}
      {goal.aiRecommendations && (
        <div className="mb-4 p-4 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl border border-purple-100">
          <p className="text-xs font-bold text-purple-700 mb-2 flex items-center gap-2">
            <IoCheckmarkCircle /> AI Recommendations:
          </p>
          <p className="text-xs text-gray-700 leading-relaxed line-clamp-3">
            {goal.aiRecommendations}
          </p>
        </div>
      )}

      {/* Update Progress Button */}
      {goal.status === 'active' && (
        <button
          onClick={() => onUpdateProgress(goal)}
          className="w-full btn btn-primary"
        >
          Update Progress
        </button>
      )}
    </motion.div>
  );
};

export default GoalCard;