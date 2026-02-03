import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoBulb, IoRefresh, IoSparkles } from 'react-icons/io5';
import { useWorkout } from '../../context/WorkoutContext';
import Loader from '../common/Loader';
import ReactMarkdown from 'react-markdown';

const WorkoutTips = ({ workoutType, intensity, duration }) => {
  const { getAITips } = useWorkout();
  const [tips, setTips] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTips = async () => {
    try {
      setLoading(true);
      const response = await getAITips({ workoutType, intensity, duration });
      setTips(response.tips);
    } catch (error) {
      console.error('Failed to fetch tips:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 mt-6 border border-blue-100"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
            <IoSparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">AI Workout Tips</h3>
            <p className="text-xs text-gray-600">Get personalized advice</p>
          </div>
        </div>
        <button
          onClick={fetchTips}
          disabled={loading || !workoutType}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all flex items-center gap-2"
        >
          <IoRefresh className={loading ? 'animate-spin' : ''} />
          Get Tips
        </button>
      </div>

      {loading ? (
        <Loader fullScreen={false} message="Generating tips..." />
      ) : tips ? (
        <div className="prose prose-sm max-w-none bg-white rounded-xl p-4 shadow-sm">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-3 text-gray-700 leading-relaxed">{children}</p>,
              ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-gray-700">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-gray-700">{children}</ol>,
              strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
            }}
          >
            {tips}
          </ReactMarkdown>
        </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-xl">
          <IoBulb className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 text-sm">
            Click "Get Tips" to receive AI-powered workout recommendations based on
            your selected workout type and intensity.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default WorkoutTips;