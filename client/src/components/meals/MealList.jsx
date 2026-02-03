import React from 'react';
import { motion } from 'framer-motion';
import MealCard from './MealCard';
import { IoRestaurant } from 'react-icons/io5';

const MealList = ({ meals, onEdit, onDelete, onAnalyze }) => {
  if (meals.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <IoRestaurant className="text-gray-400" />
        </div>
        <h3 className="empty-state-title">No Meals Recorded</h3>
        <p className="empty-state-description">
          Start tracking your nutrition by adding your first meal!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal, index) => (
        <motion.div
          key={meal._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <MealCard
            meal={meal}
            onEdit={onEdit}
            onDelete={onDelete}
            onAnalyze={onAnalyze}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default MealList;