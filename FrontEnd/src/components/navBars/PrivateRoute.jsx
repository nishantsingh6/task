import React, { useState } from 'react';
import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
    setMenuOpen(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setShowModal(false);
    navigate('/login');
  };

  const cancelLogout = () => {
    setShowModal(false);
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-gray-100 dark:bg-gray-900"
    >
      {/* Navbar */}
      <motion.nav
        className="bg-gradient-to-b from-[#1c1c1c] to-[#333333] p-6 sticky top-0 z-50 shadow-md"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">Execellence Tech</h1>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {/* Add admin/user role-specific links here if needed */}
            <button
              onClick={handleLogout}
              className="text-white hover:text-red-400 transition-colors duration-200 text-lg"
            >
              Log Out
            </button>
          </div>

          {/* Mobile Nav Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-4 bg-[#2b2b2b] px-4 py-2 rounded-lg">
            <button
              onClick={handleLogout}
              className="block w-full text-left text-white py-2 hover:text-red-400 transition-colors duration-200"
            >
              Log Out
            </button>
          </div>
        )}
      </motion.nav>

      {/* Page Content */}
      <main className="p-4">
        <Outlet />
      </main>

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-sm w-full text-center space-y-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Confirm Logout</h3>
            <p className="text-gray-600 dark:text-gray-300">Are you sure you want to log out?</p>
            <div className="flex justify-center gap-4 pt-2">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white px-6 py-2 rounded-full hover:bg-gray-400 dark:hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default PrivateRoute;
