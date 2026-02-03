import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoBulb, IoRefresh, IoSparkles } from 'react-icons/io5';
import aiService from '../../services/aiService';
import Loader from '../common/Loader';
import ReactMarkdown from 'react-markdown';

import remarkGfm from 'remark-gfm';

const AIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const response = await aiService.getAIInsights();
      setInsights(response.data.insights);
    } catch (error) {
      console.error('Failed to fetch AI insights:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || '';
      if (errorMsg === 'AI_QUOTA_EXCEEDED' || error.message?.includes('AI_QUOTA_EXCEEDED')) {
        setError('QUOTA_LIMIT');
      } else {
        setError('GENERAL_ERROR');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-600 rounded-3xl p-10 text-white shadow-custom-xl col-span-full relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px] opacity-20 -mr-40 -mt-40 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] opacity-20 -ml-40 -mb-40"></div>
      </div>

      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-xl shadow-2xl">
              <IoSparkles className="w-9 h-9 text-blue-100" />
            </div>
            <div>
              <h3 className="text-3xl font-extrabold tracking-tight text-shadow">Fit AI Coach</h3>
              <p className="text-base font-medium text-blue-100 opacity-90 mt-1">Smart health analysis & recommendations</p>
            </div>
          </div>
          <button
            onClick={fetchInsights}
            disabled={loading}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-2xl transition-all disabled:opacity-50 backdrop-blur-xl border border-white border-opacity-30 shadow-2xl group"
          >
            <IoRefresh className={`w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
            <span className="font-bold text-lg">Refresh Insights</span>
          </button>
        </div>

        {loading ? (
          <div className="py-20 flex flex-col items-center">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-400 border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <IoSparkles className="w-8 h-8 text-white animate-pulse" />
              </div>
            </div>
            <p className="text-xl font-bold text-white mt-8 tracking-widest uppercase opacity-80">Analyzing your performance...</p>
          </div>
        ) : error === 'QUOTA_LIMIT' ? (
          <div className="py-12 px-6 bg-white bg-opacity-10 backdrop-blur-md rounded-2xl border border-white border-opacity-20 text-center">
            <IoBulb className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
            <h4 className="text-xl font-bold mb-2">Daily AI Limit Reached</h4>
            <p className="text-blue-100">
              You've maximized your smart coach insights for today! AI performance analysis will reset tomorrow.
              Keep up the great work in the meantime! 💪
            </p>
          </div>
        ) : (
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="bg-black bg-opacity-20 rounded-3xl p-8 md:p-12 backdrop-blur-3xl border border-white border-opacity-5 shadow-inner">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-black text-white mb-8 border-b-2 border-indigo-400 border-opacity-30 pb-4 first:mt-0 flex items-center gap-3">
                      {children}
                    </h2>
                  ),
                  p: ({ children }) => <p className="mb-8 text-blue-50 leading-loose text-lg font-medium opacity-95">{children}</p>,
                  strong: ({ children }) => <strong className="font-extrabold text-white bg-blue-600 bg-opacity-30 px-1.5 py-0.5 rounded-md border border-blue-400 border-opacity-20">{children}</strong>,
                  ul: ({ children }) => <ul className="list-none space-y-6 mb-10 text-white">{children}</ul>,
                  li: ({ children }) => (
                    <li className="flex items-start gap-4 text-lg font-medium">
                      <div className="mt-1.5 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)] shrink-0" />
                      <div>{children}</div>
                    </li>
                  ),
                }}
              >
                {insights}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AIInsights;