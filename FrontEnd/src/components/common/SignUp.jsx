import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [serverMsg, setServerMsg] = React.useState({ type: '', text: '' });

  const onSubmit = async (data) => {
    setServerMsg({});
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', data);
      setServerMsg({ type: 'success', text: response.data.message });
      reset();

      // Optional: Redirect to login after a short delay
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setServerMsg({
        type: 'error',
        text: err.response?.data?.message || 'Something went wrong',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

        {serverMsg.text && (
          <div className={`mb-4 text-sm text-center ${serverMsg.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
            {serverMsg.text}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded transition duration-200 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting && <Spinner />}
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>

        {/* Login Redirect */}
        <div className="text-center mt-6 text-sm">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-blue-600 hover:underline">
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
