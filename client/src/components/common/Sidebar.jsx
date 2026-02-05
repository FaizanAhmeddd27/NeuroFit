import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
        aria-label="Toggle menu"
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobileMenuOpen ? (
            <IoClose className="w-6 h-6 text-gray-700" />
          ) : (
            <IoMenu className="w-6 h-6 text-gray-700" />
          )}
        </motion.div>
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={toggleMobileMenu}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={isMobile ? 'closed' : 'open'}
        animate={isMobile ? (isMobileMenuOpen ? 'open' : 'closed') : 'open'}
        variants={sidebarVariants}
        className={`
          fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50
          lg:translate-x-0 lg:static lg:shadow-xl
          flex flex-col
        `}
      >
        <div className="p-4 sm:p-6 h-full flex flex-col overflow-y-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-6 sm:mb-8 mt-12 lg:mt-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <IoFitness className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              NeuroFit
            </h1>
          </div>

          {/* User Info */}
          <div className="mb-6 p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold backdrop-blur-sm shrink-0">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate text-sm sm:text-base">
                  {user?.name || 'User'}
                </h3>
                <p className="text-xs opacity-90 truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 sm:space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 sm:gap-4 px-4 py-3 sm:py-3.5 rounded-xl
                    font-medium transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${isActive ? 'text-white' : ''}`} />
                  <span className="text-sm sm:text-base">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 sm:gap-4 px-4 py-3 sm:py-3.5 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-all duration-300 mt-4"
          >
            <IoLogOut className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" />
            <span className="text-sm sm:text-base">Logout</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;