import React from "react";
import { motion } from "framer-motion";

const WhyWeAre = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-extrabold text-center mb-10"
        >
          Why CivicConnect?
        </motion.h1>

        {/* Core Reasons as Animated Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "🚀 AI-Powered Efficiency",
              description:
                "Traditional reporting systems are slow. Our AI ensures that issues reach the right department instantly.",
            },
            {
              title: "🔒 Privacy-First Approach",
              description:
                "We respect user anonymity by leveraging blockchain tokens, ensuring safe and secure reporting.",
            },
            {
              title: "🤝 Community-Driven",
              description:
                "Upvoting and public tracking ensure that the most critical issues get prioritized.",
            },
            {
              title: "🎯 Real Impact",
              description:
                "We don't just collect reports—we drive action. Every resolved issue is a step toward a better city.",
            },
          ].map((reason, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="bg-black bg-opacity-10 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{reason.title}</h2>
              <p className="text-base md:text-lg">{reason.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-2xl md:text-3xl font-medium">
            CivicConnect isn't just an app—it's a movement toward smarter, safer, and more connected cities.
          </p>
          <motion.div
            whileHover={{ scaleX: 1.1 }}
            className="mt-4 w-24 h-1 bg-black mx-auto origin-center"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default WhyWeAre;
