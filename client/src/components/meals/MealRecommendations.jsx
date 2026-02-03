import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoSparkles, IoRefresh } from 'react-icons/io5';
import { useMeal } from '../../context/MealContext';
import Loader from '../common/Loader';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

const MealRecommendations = ({ mealType, calorieTarget }) => {
  const { getMealRecommendations } = useMeal();
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await getMealRecommendations({
        mealType: mealType || 'lunch',
        calorieTarget: calorieTarget || 500,
        preferences: 'healthy and balanced',
      });
      setRecommendations(response.recommendations);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || '';
      if (errorMsg === 'AI_QUOTA_EXCEEDED' || error.message?.includes('AI_QUOTA_EXCEEDED')) {
        setError('QUOTA_LIMIT');
      } else {
        toast.error('Failed to fetch recommendations');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-800 rounded-3xl p-8 mt-8 text-white border border-white border-opacity-10 shadow-2xl relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-[100px] opacity-10 -mr-20 -mt-20"></div>

      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-lg">
              <IoSparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight text-shadow">Smart Meal Prep</h3>
              <p className="text-sm font-medium text-emerald-50 opacity-90">Personalized for your ${calorieTarget || 500} kcal target</p>
            </div>
          </div>
          <button
            onClick={fetchRecommendations}
            disabled={loading}
            className="px-6 py-3 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-2xl font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 backdrop-blur-md border border-white border-opacity-30 shadow-lg group text-white"
          >
            <IoRefresh className={`group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Curating...' : 'Get Fresh Ideas'}
          </button>
        </div>

        {loading ? (
          <div className="py-12">
            <Loader fullScreen={false} message="Curating your healthy menu..." />
          </div>
        ) : error === 'QUOTA_LIMIT' ? (
          <div className="py-8 px-6 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white border-opacity-20 text-center">
            <IoSparkles className="w-12 h-12 text-yellow-200 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2 text-white">Meal Quota Reached</h4>
            <p className="text-emerald-50">
              Your AI chef is taking a break! You've used all meal recommendations for today.
              Check back tomorrow for more fresh ideas! 🥗
            </p>
          </div>
        ) : recommendations ? (
          <div className="prose prose-base max-w-none bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h3: ({ children }) => <h3 className="text-xl font-bold text-emerald-800 mt-6 mb-4 first:mt-0 pb-2 border-b border-emerald-50">{children}</h3>,
                p: ({ children }) => <p className="mb-4 text-gray-700 leading-relaxed text-base font-medium">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-6 text-gray-700">{children}</ul>,
                li: ({ children }) => <li className="marker:text-emerald-500 pl-2">{children}</li>,
                strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                table: ({ children }) => (
                  <div className="overflow-x-auto my-6 rounded-xl border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-200">{children}</table>
                  </div>
                ),
                th: ({ children }) => <th className="px-4 py-3 bg-gray-50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{children}</th>,
                td: ({ children }) => <td className="px-4 py-3 text-sm text-gray-600 border-t border-gray-50">{children}</td>,
              }}
            >
              {recommendations}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-center py-8 bg-white rounded-xl border border-gray-100">
            <IoSparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 text-sm">
              Click "Get Ideas" to receive AI-powered meal recommendations tailored to
              your calorie goals and preferences.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MealRecommendations;