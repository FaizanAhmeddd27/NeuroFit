import React from 'react';
import { motion } from 'framer-motion';
import { IoTime, IoFitness, IoFlame, IoPencil, IoTrash, IoTrendingUp } from 'react-icons/io5';
import { formatDate, getWorkoutTypeIcon } from '../../utils/helpers';

const WorkoutItem = ({ workout, onEdit, onDelete }) => {
  const intensityColors = {
    low: 'bg-green-100 text-green-700 border-green-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    high: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <motion.div
      whileHover={{ x: 5, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-2xl p-6 shadow-custom-md border-l-4 border-blue-500 hover:shadow-custom-lg transition-all border border-gray-100"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-3xl shadow-md">
              {getWorkoutTypeIcon(workout.workoutType)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {workout.workoutName}
              </h3>
              <p className="text-sm text-gray-500 font-medium mt-1">
                {formatDate(workout.date)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <IoFitness className="text-blue-600 text-xl" />
              <div>
                <p className="text-xs text-gray-600 font-medium">Sets × Reps</p>
                <p className="text-sm font-bold text-gray-900">
                  {workout.sets && `${workout.sets}`}
                  {workout.sets && workout.reps && ' × '}
                  {workout.reps && `${workout.reps}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
              <IoTime className="text-purple-600 text-xl" />
              <div>
                <p className="text-xs text-gray-600 font-medium">Duration</p>
                <p className="text-sm font-bold text-gray-900">{workout.duration} min</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl">
              <IoFlame className="text-orange-600 text-xl" />
              <div>
                <p className="text-xs text-gray-600 font-medium">Calories</p>
                <p className="text-sm font-bold text-gray-900">{workout.caloriesBurned}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
              <IoTrendingUp className="text-green-600 text-xl" />
              <div>
                <p className="text-xs text-gray-600 font-medium">Intensity</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                    intensityColors[workout.intensity]
                  } border`}
                >
                  {workout.intensity?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {workout.benefits && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl mb-3">
              <p className="text-sm font-semibold text-gray-700 mb-1">💡 Benefits:</p>
              <p className="text-sm text-gray-600">{workout.benefits}</p>
            </div>
          )}

          {workout.notes && (
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-semibold text-gray-700 mb-1">📝 Notes:</p>
              <p className="text-sm text-gray-600">{workout.notes}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(workout)}
            className="p-3 hover:bg-blue-50 rounded-xl transition-all group"
          >
            <IoPencil className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={() => onDelete(workout._id)}
            className="p-3 hover:bg-red-50 rounded-xl transition-all group"
          >
            <IoTrash className="w-5 h-5 text-red-600 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkoutItem;