import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  IoFitness,
  IoRestaurant,
  IoTrophy,
  IoCalendar,
  IoFlame,
  IoTrendingUp,
  IoCheckmarkCircle,
  IoTime,
} from 'react-icons/io5';
import userService from '../../services/userService';
import Loader from '../common/Loader';

const AccountStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await userService.getAccountStats();
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen={false} message="Loading statistics..." />;
  }

  const statCards = [
    {
      icon: IoFitness,
      label: 'Total Workouts',
      value: stats?.totalWorkouts || 0,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      bg: 'from-blue-50 to-cyan-50',
    },
    {
      icon: IoRestaurant,
      label: 'Meals Logged',
      value: stats?.totalMeals || 0,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      bg: 'from-green-50 to-emerald-50',
    },
    {
      icon: IoTrophy,
      label: 'Goals Set',
      value: stats?.totalGoals || 0,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      bg: 'from-purple-50 to-pink-50',
    },
    {
      icon: IoCheckmarkCircle,
      label: 'Goals Completed',
      value: stats?.completedGoals || 0,
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
      bg: 'from-orange-50 to-amber-50',
    },
    {
      icon: IoFlame,
      label: 'Avg Daily Calories',
      value: `${stats?.avgCaloriesPerDay || 0}`,
      color: 'red',
      gradient: 'from-red-500 to-pink-600',
      bg: 'from-red-50 to-pink-50',
      suffix: 'kcal',
    },
    {
      icon: IoTrendingUp,
      label: 'Workout Consistency',
      value: `${stats?.workoutConsistency || 0}`,
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-600',
      bg: 'from-teal-50 to-cyan-50',
      suffix: '%',
    },
    {
      icon: IoTrophy,
      label: 'Goal Completion',
      value: `${stats?.goalCompletionRate || 0}`,
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600',
      bg: 'from-indigo-50 to-purple-50',
      suffix: '%',
    },
    {
      icon: IoTime,
      label: 'Account Age',
      value: `${stats?.accountAge || 0}`,
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600',
      bg: 'from-pink-50 to-rose-50',
      suffix: 'days',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.05 }}
            className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 shadow-custom-md hover:shadow-custom-xl transition-all border border-gray-100`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${stat.gradient} shadow-md`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
            </div>
            <p className="text-sm text-gray-600 font-semibold mb-2">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900">
              {stat.value}{stat.suffix && <span className="text-xl ml-1">{stat.suffix}</span>}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AccountStats;