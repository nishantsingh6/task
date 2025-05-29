import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const PublicNav = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <nav>
        <motion.div
          className="flex justify-between items-center bg-gradient-to-b from-[#1c1c1c] to-[#333333] p-6 sticky top-0 z-50"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Brand Name */}
          <h1 className="text-2xl font-semibold text-white">Execellence Tech</h1>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8">
            <NavLink
              to="/signup"
              className="text-lg text-white hover:text-[#40c9ff] transition-all duration-200"
            >
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className="text-lg text-white hover:text-[#40c9ff] transition-all duration-200"
            >
              Login
            </NavLink>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#333333] p-4">
            <NavLink
              to="/signup"
              className="block text-lg text-white py-2 hover:text-[#40c9ff] transition-all duration-200"
            >
              Sign up
            </NavLink>
            <NavLink
              to="/login"
              className="block text-lg text-white py-2 hover:text-[#40c9ff] transition-all duration-200"
            >
              Login
            </NavLink>
          </div>
        )}
      </nav>

      <main>{children}</main>
    </motion.div>
  );
};

export default PublicNav;
