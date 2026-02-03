import React from 'react';
import { motion } from 'framer-motion';
import WorkoutItem from './WorkoutItem';
import Loader from '../common/Loader';
import { IoFitness } from 'react-icons/io5';

const WorkoutList = ({ workouts, loading, onEdit, onDelete }) => {
  if (loading) {
    return <Loader fullScreen={false} message="Loading workouts..." />;
  }

  if (!workouts || workouts.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-custom-md border border-gray-100">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
          <IoFitness className="text-5xl text-blue-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No Workouts Yet
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Start tracking your fitness journey by adding your first workout!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {workouts.map((workout, index) => (
        <motion.div
          key={workout._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <WorkoutItem
            workout={workout}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default WorkoutList;