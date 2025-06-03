import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/common/Login';
import SignUp from './components/common/SignUp';
import ForgotPassword from './components/common/ForgotPassword';
import ResetPassword from './components/common/ResetPassword';
import DashBoard from './components/dashBoards/DashBoard';
import PublicNav from './components/navBars/PublicNav';
import AdminDashboard from './components/dashBoards/AdminDashboard';
import UserDashboard from './components/dashBoards/UserDashboard';
import ManagerDashboard from './components/dashBoards/ManagerDashboard';
import PrivateRoute from './components/navBars/PrivateRoute';


const App = () => {
  const role = localStorage.getItem('role');  // Get the role from localStorage

  return (

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<PublicNav><SignUp /></PublicNav>} />
        <Route path="/login" element={<PublicNav><Login /></PublicNav>} />
        <Route path="/signup" element={<PublicNav><SignUp /></PublicNav>} />
        <Route path="/forgot-password" element={<PublicNav><ForgotPassword /></PublicNav>} />
        <Route path="/reset-password" element={<PublicNav><ResetPassword /></PublicNav>} />

        {/* Private Dashboard Routes */}
        <Route path="/dashboard" element={<PrivateRoute><DashBoard /></PrivateRoute>} />

        {/* Role-Based Routes */}
      <Route element={<PrivateRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
      </Route>

      </Routes>
  );
};

export default App;
