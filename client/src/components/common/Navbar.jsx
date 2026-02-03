import React from 'react';
import { IoNotifications, IoSettings } from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ title }) => {
  const { user } = useAuth();

  return (
    <div className="bg-white rounded-2xl shadow-custom-md p-6 mb-6 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">{title}</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Welcome back, <span className="font-semibold text-blue-600">{user?.name}</span>! 👋
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-3 hover:bg-gray-100 rounded-xl transition-all relative">
            <IoNotifications className="w-6 h-6 text-gray-600" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <button className="p-3 hover:bg-gray-100 rounded-xl transition-all">
            <IoSettings className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;