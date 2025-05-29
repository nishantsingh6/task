import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
<<<<<<< HEAD
  const[showPassword,setShowPassword] = useState(false);
=======
>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://task-sy5x.onrender.com/api/auth/login', data);
      const { token, user } = response.data;
      toast.success('Login Successfully');
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

<<<<<<< HEAD
   return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">
      {/* Form container with animated background */}
      <div className="form-container">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email Field */}
=======
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">
      {/* Embedded CSS for animated border */}
      <style>
        {`
          .form-container {
            width: 400px;
            background: linear-gradient(#212121, #212121) padding-box,
                        linear-gradient(145deg, transparent 35%, #e81cff, #40c9ff) border-box;
            border: 2px solid transparent;
            padding: 32px 24px;
            font-size: 14px;
            font-family: inherit;
            color: white;
            display: flex;
            flex-direction: column;
            gap: 20px;
            box-sizing: border-box;
            border-radius: 16px;
            background-size: 200% 100%;
            animation: gradient 5s ease infinite;
          }

          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .form-submit-btn {
            font-family: inherit;
            color: #fff;
            font-weight: 600;
            background: #313131;
            border: 1px solid #414141;
            padding: 12px 16px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
          }

          .form-submit-btn:hover {
            background-color: white;
            color: black;
            border-color: white;
          }
        `}
      </style>

      <div className="form-container">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email */}
>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-400 text-left">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/, message: 'Invalid email' },
              })}
              className="w-full px-4 py-2 border border-[#414141] bg-transparent rounded text-white placeholder-white/50 focus:outline-none focus:border-[#e81cff]"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

<<<<<<< HEAD
          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-400 text-left">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                placeholder="********"
                className="w-full px-4 py-3 pr-10 rounded-lg bg-transparent text-white border border-[#414141] 
                           placeholder:text-white/50 focus:outline-none focus:border-[#e81cff]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-gray-400 hover:text-white"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
=======
          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-400 text-left">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-4 py-2 border border-[#414141] bg-transparent rounded text-white placeholder-white/50 focus:outline-none focus:border-[#e81cff]"
              placeholder="********"
            />
>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            <div className="text-right text-sm mt-1">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[#40c9ff] hover:underline"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
<<<<<<< HEAD
            className="w-2/5 self-start px-4 py-3 rounded-lg bg-[#313131] text-[#717171] font-semibold 
                       border border-[#414141] hover:bg-white hover:text-black hover:border-white 
                       transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
=======
            className="form-submit-btn flex justify-center items-center gap-2"
            style={isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0
          >
            {isSubmitting ? 'Loging in...' : 'Login'}
          </button>
        </form>

        {/* Signup Redirect */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-[#40c9ff] hover:underline"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
