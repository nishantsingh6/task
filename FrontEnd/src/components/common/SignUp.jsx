import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import { toast } from 'react-toastify';


const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://task-sy5x.onrender.com/api/auth/signup', data);
      toast.success(response?.data?.message || "User Created Successfully");
      reset();
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

 return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Apply animate-gradient class here */}
      <div className="form-container w-96 p-8 flex flex-col gap-5 animate-gradient">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-400 text-left">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg bg-transparent text-white border border-[#414141] 
                         placeholder:text-white/50 focus:outline-none focus:border-[#e81cff]"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-400 text-left">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              })}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg bg-transparent text-white border border-[#414141] 
                         placeholder:text-white/50 focus:outline-none focus:border-[#e81cff]"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
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
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-2/5 self-start px-4 py-3 rounded-lg bg-[#313131] text-[#717171] font-semibold 
                       border border-[#414141] hover:bg-white hover:text-black hover:border-white 
                       transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Loading...' : 'Sign Up'}
          </button>
        </form>

        {/* Redirect to login */}
        <div className="text-center mt-4 text-sm text-gray-400">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#40c9ff] hover:underline"
          >
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};


export default Signup;
