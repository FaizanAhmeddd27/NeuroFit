import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoAdd, IoFitness } from 'react-icons/io5';
import Sidebar from '../components/common/Sidebar';
import Navbar from '../components/common/Navbar';
import Modal from '../components/common/Modal';
import WorkoutList from '../components/workouts/WorkoutList';
import WorkoutForm from '../components/workouts/WorkoutForm';
import WorkoutTips from '../components/workouts/WorkoutTips';
import { WorkoutProvider, useWorkout } from '../context/WorkoutContext';

const WorkoutsContent = () => {
  const { workouts, loading, createWorkout, updateWorkout, deleteWorkout } = useWorkout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  const handleOpenModal = () => {
    setEditingWorkout(null);
    setIsModalOpen(true);
  };

  const handleEdit = (workout) => {
    setEditingWorkout(workout);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingWorkout) {
        await updateWorkout(editingWorkout._id, formData);
      } else {
        await createWorkout(formData);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save workout:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      await deleteWorkout(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50">
      <Sidebar />

      <main className="main-content">
        <div className="container-custom">
          <Navbar title="My Workouts" />

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">Track Your Progress</h2>
              <p className="text-sm md:text-base text-gray-600">Monitor and manage your fitness journey</p>
            </div>
            <button onClick={handleOpenModal} className="btn btn-primary w-full sm:w-auto">
              <IoAdd className="w-5 h-5" />
              Add Workout
            </button>
          </motion.div>

          {/* Workout List */}
          <WorkoutList
            workouts={workouts}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          {/* Add/Edit Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingWorkout ? 'Edit Workout' : 'Add New Workout'}
            size="lg"
          >
            <WorkoutForm
              initialData={editingWorkout}
              onSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
            />
            <WorkoutTips
              workoutType={editingWorkout?.workoutType}
              intensity={editingWorkout?.intensity}
              duration={editingWorkout?.duration}
            />
          </Modal>
        </div>
      </main>
    </div>
  );
};

const Workouts = () => {
  return (
    <WorkoutProvider>
      <WorkoutsContent />
    </WorkoutProvider>
  );
};

export default Workouts;