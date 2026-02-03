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

            <main className="main-content">
              <div className="container-custom">
                <Navbar title="Dashboard" />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <WorkoutChart data={dashboardData?.charts?.workoutProgress || []} />
                  <CalorieChart
                    data={dashboardData?.charts?.calorieProgress || []}
                    calorieGoal={dashboardData?.user?.dailyCalorieGoal || 2000}
                  />
                </div>

                {/* Nutrition Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-custom-md mb-6 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        Today's Nutrition Summary
                      </h3>
                      <p className="text-sm text-gray-600">Track your macronutrient intake</p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hidden sm:block">
                      <p className="text-xs font-bold text-blue-600 uppercase">Daily Goal</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-5 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-100"
                    >
                      <IoFlame className="w-10 h-10 mx-auto mb-3 text-red-500" />
                      <p className="text-3xl font-bold text-gray-900">
                        {dashboardData?.todayNutrition?.calories || 0}
                      </p>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">
                        / {dashboardData?.user?.dailyCalorieGoal || 2000} kcal
                      </p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
                    >
                      <p className="text-3xl font-bold text-blue-600">
                        {dashboardData?.todayNutrition?.protein || 0}g
                      </p>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Protein</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100"
                    >
                      <p className="text-3xl font-bold text-green-600">
                        {dashboardData?.todayNutrition?.carbohydrates || 0}g
                      </p>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Carbs</p>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-5 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl border border-yellow-100"
                    >
                      <p className="text-3xl font-bold text-yellow-600">
                        {dashboardData?.todayNutrition?.fat || 0}g
                      </p>
                      <p className="text-xs text-gray-600 font-semibold uppercase tracking-wide mt-1">Fat</p>
                    </motion.div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <p className="text-sm font-semibold text-gray-700 text-center">
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