import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoFitness, IoRestaurant, IoTrophy, IoFlame } from 'react-icons/io5';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import StatsCard from '../components/dashboard/StatsCard';
import WorkoutChart from '../components/dashboard/WorkoutChart';
import CalorieChart from '../components/dashboard/CalorieChart';
import AIInsights from '../components/dashboard/AIInsights';
import Loader from '../components/common/Loader';
import userService from '../services/userService';
import { WorkoutProvider } from '../context/WorkoutContext';
import { GoalProvider } from '../context/GoalContext';
import { MealProvider } from '../context/MealContext';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await userService.getDashboardStats();
      setDashboardData(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="Loading dashboard..." />;
  }

  return (
    <WorkoutProvider>
      <GoalProvider>
        <MealProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            <Sidebar />

            {/* Main Content - Adjusted for sidebar */}
            <main className="lg:ml-72 min-h-screen">
              <div className="p-4 sm:p-6 lg:p-8 pt-16 lg:pt-6">
                <Navbar title="Dashboard" />

                {/* Stats Grid - Responsive */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                  <StatsCard
                    title="Total Workouts"
                    value={dashboardData?.stats?.totalWorkouts || 0}
                    icon={IoFitness}
                    color="blue"
                    trend="Keep it up! 💪"
                    link="/workouts"
                  />
                  <StatsCard
                    title="Today's Meals"
                    value={dashboardData?.stats?.todayMealsCount || 0}
                    icon={IoRestaurant}
                    color="green"
                    trend="Tracked today"
                    link="/calories"
                  />
                  <StatsCard
                    title="Active Goals"
                    value={dashboardData?.stats?.activeGoalsCount || 0}
                    icon={IoTrophy}
                    color="purple"
                    trend="In progress 🎯"
                    link="/goals"
                  />
                  <StatsCard
                    title="Calories Today"
                    value={`${dashboardData?.todayNutrition?.calories || 0}`}
                    icon={IoFlame}
                    color="orange"
                    trend="kcal consumed"
                  />
                </div>

                {/* Charts Row - Stack on mobile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <WorkoutChart data={dashboardData?.charts?.workoutProgress || []} />
                  <CalorieChart
                    data={dashboardData?.charts?.calorieProgress || []}
                    calorieGoal={dashboardData?.user?.dailyCalorieGoal || 2000}
                  />
                </div>

                {/* Nutrition Summary - Responsive */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-custom-md mb-4 sm:mb-6 border border-gray-100"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
                    <div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
                        Today's Nutrition Summary
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">Track your macronutrient intake</p>
                    </div>
                    <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-100">
                      <p className="text-xs font-bold text-blue-600 uppercase">Daily Goal</p>
                    </div>
                  </div>
                  
                  {/* Nutrition Cards - 2x2 on mobile, 4 cols on desktop */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-center p-3 sm:p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg sm:rounded-xl border border-red-100"
                    >
                      <IoFlame className="w-6 h-6 sm:w-10 sm:h-10 mx-auto mb-2 sm:mb-3 text-red-500" />
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                        {dashboardData?.todayNutrition?.calories || 0}
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">
                        / {dashboardData?.user?.dailyCalorieGoal || 2000} kcal
                      </p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-center p-3 sm:p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg sm:rounded-xl border border-blue-100"
                    >
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">
                        {dashboardData?.todayNutrition?.protein || 0}g
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Protein</p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-center p-3 sm:p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg sm:rounded-xl border border-green-100"
                    >
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">
                        {dashboardData?.todayNutrition?.carbohydrates || 0}g
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Carbs</p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="text-center p-3 sm:p-5 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg sm:rounded-xl border border-yellow-100"
                    >
                      <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-600">
                        {dashboardData?.todayNutrition?.fat || 0}g
                      </p>
                      <p className="text-[10px] sm:text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Fat</p>
                    </motion.div>
                  </div>
                  
                  {/* Remaining Calories */}
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl border border-blue-100">
                    <p className="text-xs sm:text-sm font-semibold text-gray-700 text-center">
                      <strong className="text-blue-600">Remaining:</strong>{' '}
                      {dashboardData?.todayNutrition?.remaining || 0} kcal
                    </p>
                  </div>
                </motion.div>

                {/* AI Insights */}
                <AIInsights />
              </div>
            </main>
          </div>
        </MealProvider>
      </GoalProvider>
    </WorkoutProvider>
  );
};

export default Dashboard;