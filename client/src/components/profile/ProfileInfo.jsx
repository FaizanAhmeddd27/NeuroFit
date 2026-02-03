import React from 'react';
import { motion } from 'framer-motion';
import { IoPerson, IoMail, IoCalendar, IoFitness, IoBody, IoResize } from 'react-icons/io5';
import { calculateBMI, getBMICategory, formatDate } from '../../utils/helpers';

const ProfileInfo = ({ user }) => {
  const bmi = calculateBMI(user.weight, user.height);
  const bmiCategory = getBMICategory(bmi);

  const bmiColors = {
    Underweight: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    Normal: 'bg-green-100 text-green-700 border-green-200',
    Overweight: 'bg-orange-100 text-orange-700 border-orange-200',
    Obese: 'bg-red-100 text-red-700 border-red-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-custom-md border border-gray-100"
    >
      <div className="flex items-center gap-6 mb-8 pb-8 border-b-2 border-gray-100">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-custom-lg">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h2>
          <p className="text-gray-600 flex items-center gap-2">
            <IoMail className="text-blue-600" />
            {user.email}
          </p>
          <p className="text-sm text-gray-500 mt-2 flex items-center gap-2">
            <IoCalendar className="text-green-600" />
            Member since {formatDate(user.createdAt)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <IoCalendar className="text-2xl text-blue-600" />
            <p className="text-sm text-gray-600 font-semibold">Age</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {user.age || 'Not set'} {user.age && 'years'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <IoPerson className="text-2xl text-purple-600" />
            <p className="text-sm text-gray-600 font-semibold">Gender</p>
          </div>
          <p className="text-2xl font-bold text-gray-900 capitalize">
            {user.gender || 'Not set'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <IoResize className="text-2xl text-green-600" />
            <p className="text-sm text-gray-600 font-semibold">Height</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {user.height || 0} cm
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-5 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <IoBody className="text-2xl text-orange-600" />
            <p className="text-sm text-gray-600 font-semibold">Weight</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {user.weight || 0} kg
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl border border-indigo-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <IoFitness className="text-2xl text-indigo-600" />
            <p className="text-sm text-gray-600 font-semibold">Activity Level</p>
          </div>
          <p className="text-lg font-bold text-gray-900 capitalize">
            {user.activityLevel?.replace('_', ' ') || 'Not set'}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-5 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100"
        >
          <div className="flex items-center gap-3 mb-2">
            <IoFitness className="text-2xl text-red-600" />
            <p className="text-sm text-gray-600 font-semibold">Daily Calorie Goal</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {user.dailyCalorieGoal || 0} kcal
          </p>
        </motion.div>

        {bmi && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-5 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border border-teal-100 md:col-span-2 lg:col-span-3"
          >
            <div className="flex items-center gap-3 mb-3">
              <IoBody className="text-2xl text-teal-600" />
              <p className="text-sm text-gray-600 font-semibold">BMI (Body Mass Index)</p>
            </div>
            <div className="flex items-center gap-6">
              <p className="text-4xl font-bold text-gray-900">{bmi}</p>
              <span
                className={`px-6 py-2 rounded-full text-sm font-bold border ${
                  bmiColors[bmiCategory]
                }`}
              >
                {bmiCategory}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileInfo;