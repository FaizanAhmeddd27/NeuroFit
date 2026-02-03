import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoAdd } from 'react-icons/io5';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import Modal from '../components/common/Modal';
import GoalList from '../components/goals/GoalList';
import GoalForm from '../components/goals/GoalForm';
import { GoalProvider, useGoal } from '../context/GoalContext';

const GoalsContent = () => {
  const { goals, loading, createGoal, updateGoal, deleteGoal, updateProgress } = useGoal();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [progressGoal, setProgressGoal] = useState(null);
  const [newWeight, setNewWeight] = useState('');

  const handleOpenModal = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingGoal) {
        await updateGoal(editingGoal._id, formData);
      } else {
        await createGoal(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save goal:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal(id);
    }
  };

  const handleUpdateProgress = (goal) => {
    setProgressGoal(goal);
    setNewWeight(goal.currentWeight);
    setIsProgressModalOpen(true);
  };

  const handleProgressSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProgress(progressGoal._id, { currentWeight: parseFloat(newWeight) });
      setIsProgressModalOpen(false);
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <Sidebar />

      <main className="main-content">
        <div className="container-custom">
          <Navbar title="My Goals" />

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Achieve Your Dreams</h2>
              <p className="text-sm md:text-base text-gray-600">Set, track, and accomplish your fitness goals</p>
            </div>
            <button onClick={handleOpenModal} className="btn btn-primary w-full sm:w-auto">
              <IoAdd className="w-5 h-5" />
              Create Goal
            </button>
          </motion.div>

          {/* Goal List */}
          <GoalList
            goals={goals}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onUpdateProgress={handleUpdateProgress}
          />

          {/* Add/Edit Goal Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingGoal ? 'Edit Goal' : 'Create New Goal'}
            size="lg"
          >
            <GoalForm
              initialData={editingGoal}
              onSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
            />
          </Modal>

          {/* Update Progress Modal */}
          <Modal
            isOpen={isProgressModalOpen}
            onClose={() => setIsProgressModalOpen(false)}
            title="Update Progress"
            size="sm"
          >
            <form onSubmit={handleProgressSubmit} className="space-y-6">
              <div>
                <label className="form-label">Current Weight (kg)</label>
                <input
                  type="number"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="form-input"
                  step="0.1"
                  required
                />
              </div>
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => setIsProgressModalOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </Modal>
        </div>
      </main>
    </div>
  );
};

const Goals = () => {
  return (
    <GoalProvider>
      <GoalsContent />
    </GoalProvider>
  );
};

export default Goals;