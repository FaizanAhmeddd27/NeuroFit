import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoAdd } from 'react-icons/io5';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import Modal from '../components/common/Modal';
import MealList from '../components/meals/MealList';
import MealForm from '../components/meals/MealForm';
import NutritionSummary from '../components/meals/NutritionSummary';
import MealRecommendations from '../components/meals/MealRecommendations';
import { MealProvider, useMeal } from '../context/MealContext';
import { useAuth } from '../context/AuthContext';
import ReactMarkdown from 'react-markdown';

const CaloriesContent = () => {
  const { user } = useAuth();
  const {
    todayMeals,
    todayTotals,
    loading,
    createMeal,
    updateMeal,
    deleteMeal,
    getRecipe,
  } = useMeal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [recipe, setRecipe] = useState(null);

  const handleOpenModal = () => {
    setEditingMeal(null);
    setIsModalOpen(true);
  };

  const handleEdit = (meal) => {
    setEditingMeal(meal);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingMeal) {
        await updateMeal(editingMeal._id, formData);
      } else {
        await createMeal(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save meal:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this meal?')) {
      await deleteMeal(id);
    }
  };

  const handleViewRecipe = async (meal) => {
    try {
      const response = await getRecipe(meal.foodName);
      setRecipe(response.recipe);
      setIsRecipeModalOpen(true);
    } catch (error) {
      console.error('Failed to get recipe:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Sidebar />

      <main className="main-content">
        <div className="container-custom">
          <Navbar title="Calorie Tracker" />

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Track Your Nutrition</h2>
              <p className="text-sm md:text-base text-gray-600">Monitor your daily calorie and macro intake</p>
            </div>
            <button onClick={handleOpenModal} className="btn btn-success w-full sm:w-auto">
              <IoAdd className="w-5 h-5" />
              Add Meal
            </button>
          </motion.div>

          {/* Nutrition Summary */}
          <div className="mb-6">
            <NutritionSummary
              todayTotals={todayTotals}
              calorieGoal={user?.dailyCalorieGoal || 2000}
            />
          </div>

          {/* Meal List */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Meals</h2>
            <MealList
              meals={todayMeals}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onViewRecipe={handleViewRecipe}
            />
          </div>

          {/* Meal Recommendations */}
          <MealRecommendations calorieTarget={500} />

          {/* Add/Edit Meal Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingMeal ? 'Edit Meal' : 'Add New Meal'}
            size="lg"
          >
            <MealForm
              initialData={editingMeal}
              onSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>

          {/* Recipe Modal */}
          <Modal
            isOpen={isRecipeModalOpen}
            onClose={() => setIsRecipeModalOpen(false)}
            title="Recipe Details"
            size="lg"
          >
            <div className="prose max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-2xl font-bold text-gray-900 mb-4">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-xl font-bold text-gray-900 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-lg font-bold text-gray-900 mb-2">{children}</h3>,
                  p: ({ children }) => <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">{children}</ol>,
                  strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                }}
              >
                {recipe}
              </ReactMarkdown>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
};

const Calories = () => {
  return (
    <MealProvider>
      <CaloriesContent />
    </MealProvider>
  );
};

export default Calories;