import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import { toast } from 'react-toastify';
<<<<<<< HEAD

=======
>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0

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

<<<<<<< HEAD
 return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Apply animate-gradient class here */}
      <div className="form-container w-96 p-8 flex flex-col gap-5 animate-gradient">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

=======
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Embedded CSS */}
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
            color: #717171;
            font-weight: 600;
            background: #313131;
            border: 1px solid #414141;
            padding: 12px 16px;
            border-radius: 6px;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .form-submit-btn:hover {
            background-color: white;
            color: black;
            border-color: white;
          }
        `}
      </style>

      <div className="form-container">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-gray-400 text-left">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              placeholder="Your name"
<<<<<<< HEAD
              className="w-full px-4 py-3 rounded-lg bg-transparent text-white border border-[#414141] 
=======
              className="w-full px-4 py-3 rounded-lg bg-transparent text-white border border-[#414141]
>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0
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
<<<<<<< HEAD
              className="w-full px-4 py-3 rounded-lg bg-transparent text-white border border-[#414141] 
=======
              className="w-full px-4 py-3 rounded-lg bg-transparent text-white border border-[#414141]
>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0
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
<<<<<<< HEAD
                className="w-full px-4 py-3 pr-10 rounded-lg bg-transparent text-white border border-[#414141] 
=======
                className="w-full px-4 py-3 pr-10 rounded-lg bg-transparent text-white border border-[#414141]
>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0
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
<<<<<<< HEAD
            className="w-2/5 self-start px-4 py-3 rounded-lg bg-[#313131] text-[#717171] font-semibold 
                       border border-[#414141] hover:bg-white hover:text-black hover:border-white 
                       transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Loading...' : 'Sign Up'}
=======
            className="form-submit-btn w-2/5 self-start"
            style={isSubmitting ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
          >
            {isSubmitting ? <Spinner /> : 'Sign Up'}
>>>>>>> 3708ecb211d27dfc04249909ade8cd22974852c0
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
