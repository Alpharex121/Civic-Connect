import React from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

const ConnectUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log("Form Data Submitted:", data);
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    reset(); // Reset form after submission
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-2xl w-full bg-black bg-opacity-10 backdrop-blur-lg p-8 rounded-2xl shadow-xl"
      >
        <h1 className="text-4xl font-extrabold text-center mb-6">Connect With Us</h1>
        <p className="text-lg text-center mb-6 opacity-80">
          Have a query or facing an issue? Let us know!
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-lg font-medium">Your Name</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-3 mt-2 bg-black bg-opacity-20 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-lg font-medium">Email</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" },
              })}
              className="w-full px-4 py-3 mt-2 bg-black bg-opacity-20 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Message Input */}
          <div>
            <label className="block text-lg font-medium">Message</label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              placeholder="Describe your issue or feedback"
              rows="4"
              {...register("message", { required: "Message cannot be empty" })}
              className="w-full px-4 py-3 mt-2 bg-black bg-opacity-20 rounded-lg focus:ring-2 focus:ring-white focus:outline-none resize-none"
            ></motion.textarea>
            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            disabled={isSubmitting}
            className="w-full bg-black text-blue-900 font-bold py-3 rounded-lg shadow-md transition-all hover:bg-opacity-80"
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ConnectUs;
