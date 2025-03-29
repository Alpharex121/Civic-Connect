import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('User Form Data:', data);
  };

  return (
    <div className="min-h-screen bg-[#EAEAEA] mt-10 flex flex-col items-center justify-center py-12">
      {/* Background Decorative Shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#1A659E] opacity-10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#022B50] opacity-10 rounded-full blur-3xl -z-10" />

      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-md bg-opacity-80 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#022B50] tracking-tight">
            User Sign Up
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Join to access legal support
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#022B50]">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className={`mt-1 w-full px-4 py-2 bg-[#EAEAEA] border ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200`}
              placeholder="Anmol Awasthi"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#022B50]">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className={`mt-1 w-full px-4 py-2 bg-[#EAEAEA] border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200`}
              placeholder="jane.smith@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#022B50]">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              {...register('phone')}
              className="mt-1 w-full px-4 py-2 bg-[#EAEAEA] border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200"
              placeholder="+91 9685359511"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#022B50]">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
              className={`mt-1 w-full px-4 py-2 bg-[#EAEAEA] border ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              } rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200`}
              placeholder="••••••"
            />
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full px-6 py-3 bg-[#022B50] text-white font-semibold rounded-lg shadow-md hover:bg-[#011a33] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-[#1A659E] hover:text-[#022B50] transition duration-200 text-sm">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default UserSignUp;