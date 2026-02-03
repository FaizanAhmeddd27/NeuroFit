import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';

const StatsCard = ({ title, value, icon: Icon, color, trend, link }) => {
  const colorClasses = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    green: 'bg-gradient-to-br from-green-500 to-green-600',
    orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
    red: 'bg-gradient-to-br from-red-500 to-red-600',
    teal: 'bg-gradient-to-br from-teal-500 to-teal-600',
  };

  const bgColorClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    orange: 'bg-orange-50',
    purple: 'bg-purple-50',
    red: 'bg-red-50',
    teal: 'bg-teal-50',
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      className={`${bgColorClasses[color]} rounded-2xl p-6 shadow-custom-md hover:shadow-custom-xl transition-all border border-gray-100 relative overflow-hidden`}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
        <div className={`w-full h-full ${colorClasses[color]} rounded-full blur-2xl`}></div>
      </div>

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">
              {title}
            </p>
            <h3 className="text-4xl font-bold text-gray-900 mb-1">{value}</h3>
            {trend && (
              <p className="text-sm text-gray-500 font-medium">{trend}</p>
            )}
          </div>
          <div className={`stat-icon ${colorClasses[color]}`}>
            <Icon />
          </div>
        </div>

        {link && (
          <Link
            to={link}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-colors group"
          >
            View Details
            <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;