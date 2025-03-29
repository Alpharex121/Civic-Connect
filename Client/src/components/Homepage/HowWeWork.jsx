import React from "react";
import { motion } from "framer-motion";

const HowWeWork = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold mb-10"
        >
          How We Work
        </motion.h1>

        {/* Step-by-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {[
            {
              step: "1. Report an Issue",
              description:
                "Users submit issues anonymously via our AI-powered reporting system.",
            },
            {
              step: "2. AI Classification",
              description:
                "Our AI automatically categorizes and routes reports to the right authorities.",
            },
            {
              step: "3. Community Engagement",
              description:
                "Residents upvote issues to highlight the most urgent concerns in their area.",
            },
            {
              step: "4. Admin Dashboard",
              description:
                "Municipal officers track and manage reports through a dedicated dashboard.",
            },
            {
              step: "5. Resolution & Confirmation",
              description:
                "Users receive updates, and issues are marked resolved only after verification.",
            },
            {
              step: "6. Rewards & Impact",
              description:
                "Active reporters earn rewards, fostering a more engaged and proactive community.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-black bg-opacity-10 p-6 rounded-xl shadow-lg backdrop-blur-sm"
            >
              <h2 className="text-xl md:text-2xl font-bold mb-2">{item.step}</h2>
              <p className="text-base md:text-lg">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
