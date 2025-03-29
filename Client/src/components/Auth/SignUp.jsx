import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { addUser } from "../../store/Slices/userSlice";
import { api } from "../../utils/constants";

const UserSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("User Form Data:", data);
    try {
      const response = await api.post(
        "http://localhost:3000/user/adduser",
        data
      );
      const jsonData = response.data;

      if (response.status === 200 && response.data.name) {
        console.log("User Logged In Successfully");
        dispatch(addUser(jsonData));
        navigate("/signin");
      } else {
        console.log("User not added");
      }
    } catch (error) {
      console.log("Error occured while logging in." + error);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen bg-[#EAEAEA] mt-10 flex flex-col items-center justify-center py-12">
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#1A659E] opacity-10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#022B50] opacity-10 rounded-full blur-3xl -z-10" />

      <motion.div
        className="w-full max-w-md p-8 bg-white rounded-xl shadow-md bg-opacity-80 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#022B50] tracking-tight">
            User Sign Up
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            Join to access legal support
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#022B50]"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              type="text"
              {...register("username", { required: "Username is required" })}
              className={`mt-1 w-full px-4 py-2 bg-[#EAEAEA] border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200`}
              placeholder="johndoe123"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#022B50]"
            >
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`mt-1 w-full px-4 py-2 bg-[#EAEAEA] border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200`}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#022B50]"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className={`mt-1 w-full px-4 py-2 bg-[#EAEAEA] border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200`}
              placeholder="jane.smith@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#022B50]"
            >
              Phone No <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="phone"
              {...register("phone", {
                required: "Phone Number is required",
              })}
              className={`mt-1 w-full px-4 py-2 bg-[#EAEAEA] border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200`}
              placeholder="0000000000"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label
              htmlFor="pincode"
              className="block text-sm font-medium text-[#022B50]"
            >
              Pincode
            </label>
            <input
              id="pincode"
              type="text"
              {...register("pincode")}
              className="mt-1 w-full px-4 py-2 bg-[#EAEAEA] border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200"
              placeholder="123456"
            />
          </div>

          {/* Address */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-[#022B50]"
            >
              Address
            </label>
            <textarea
              id="address"
              {...register("address")}
              className="mt-1 w-full px-4 py-2 bg-[#EAEAEA] border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200"
              placeholder="Enter your address"
            ></textarea>
          </div>

          {/*  Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#022B50]"
            >
              Password <span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: " Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`mt-1 w-full px-4 py-2 bg-[#EAEAEA] border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200`}
              placeholder="••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[#022B50]"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmpassword"
              type="password"
              {...register("confirmpassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`mt-1 w-full px-4 py-2 bg-[#EAEAEA] border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1A659E] transition duration-200`}
              placeholder="••••••"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full px-6 py-3 cursor-pointer bg-[#022B50] text-white font-semibold rounded-lg shadow-md hover:bg-[#011a33] transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Up
          </motion.button>
        </form>
        <p className="mx-auto text-center mt-2 ">
          Already a user?{" "}
          <span
            className="text-blue-600 cursor-pointer "
            onClick={() => navigate("/signin")}
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default UserSignUp;
