import React, { useState } from 'react';
import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const isAuthenticated = !!token;
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // For responsive menu

  const handleLogout = () => {
    setShowModal(true);
    setMenuOpen(false); // Close menu if open
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

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-gradient-to-bl from-[#f5f7fa] to-[#c3cfe2] p-4 shadow-md">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-2xl text-amber-700">
            {role === 'Admin' ? 'Execellence Tech' : 'Execellence Tech'}
          </h1>

          {/* Hamburger icon for small screens */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-blue-700 focus:outline-none"
            >
              ☰
            </button>
          </div>

          {/* Nav links for desktop */}
          <ul className="hidden md:flex gap-6 items-center">
            {role === 'Admin' ? (
              <>
                
                <button onClick={handleLogout} className="nav-link text-red-600">Log Out</button>
              </>
            ) : (
              <>
                
                <button onClick={handleLogout} className="nav-link text-red-600">Log Out</button>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Page content */}
      <Outlet />

      {/* Logout Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-opacity-30 flex items-center justify-center backdrop-blur-sm z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center space-y-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800">Confirm Logout</h3>
            <p className="text-gray-600">Are you sure you want to log out?</p>
            <div className="space-x-6">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 px-6 py-2 rounded-full hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateRoute;