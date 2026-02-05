import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IoHome,
  IoFitness,
  IoTrophy,
  IoRestaurant,
  IoPerson,
  IoLogOut,
  IoMenu,
  IoClose,
} from 'react-icons/io5';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: IoHome },
    { path: '/workouts', label: 'Workouts', icon: IoFitness },
    { path: '/goals', label: 'Goals', icon: IoTrophy },
    { path: '/calories', label: 'Calories', icon: IoRestaurant },
    { path: '/profile', label: 'Profile', icon: IoPerson },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-xl shadow-custom-lg hover:shadow-custom-xl transition-all border border-gray-100"
      >
        {isMobileMenuOpen ? (
          <IoClose className="w-6 h-6 text-gray-700" />
        ) : (
          <IoMenu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isMobileMenuOpen || window.innerWidth >= 1024 ? 0 : -280 }}
        transition={{ duration: 0.3 }}
        className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Logo */}
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <IoFitness />
            </div>
            <h1 className="sidebar-logo-text">NeuroFit</h1>
          </div>

          {/* User Info */}
          <div className="mb-6 p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl font-bold backdrop-blur-sm">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{user?.name}</h3>
                <p className="text-xs opacity-90 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  <Icon className="nav-item-icon" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-5 py-3.5 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-all duration-300 mt-4"
          >
            <IoLogOut className="text-xl" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}
    </>
  );
};

export default Sidebar;