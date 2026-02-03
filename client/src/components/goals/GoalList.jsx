import React from 'react';
import { motion } from 'framer-motion';
import GoalCard from './GoalCard';
import Loader from '../common/Loader';
import { IoTrophy } from 'react-icons/io5';

const GoalList = ({ goals, loading, onEdit, onDelete, onUpdateProgress }) => {
  if (loading) {
    return <Loader fullScreen={false} message="Loading goals..." />;
  }

  if (!goals || goals.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-custom-md border border-gray-100">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
          <IoTrophy className="text-5xl text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          No Goals Set Yet
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Set your first fitness goal and start tracking your progress towards success!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {goals.map((goal, index) => (
        <motion.div
          key={goal._id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <GoalCard
            goal={goal}
            onEdit={onEdit}
            onDelete={onDelete}
            onUpdateProgress={onUpdateProgress}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default GoalList;