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
  const[showPassword,setShowPassword] = useState(false);

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

   return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">
      {/* Form container with animated background */}
      <div className="form-container">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Email Field */}
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
            className="w-2/5 self-start px-4 py-3 rounded-lg bg-[#313131] text-[#717171] font-semibold 
                       border border-[#414141] hover:bg-white hover:text-black hover:border-white 
                       transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
