import React from "react";
import { motion } from "framer-motion";

const WhoWeAre = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-8 text-center"
        >
          Who We Are
        </motion.h1>
        
        {/* Overview Paragraph */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl mb-8 text-center"
        >
          CivicConnect is an innovative application designed to streamline the reporting of municipal issues such as cleanliness, waste management, and other civic concerns. Our platform harnesses the power of AI to enable users to report issues anonymously and efficiently. Every report is accurately classified and directed to the appropriate municipal department while community engagement is enhanced through upvoting and rewards.
        </motion.p>
        
        {/* Key Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-black bg-opacity-10 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl  font-semibold mb-2">AI-Driven Classification</h2>
            <p>
              Our advanced AI algorithms automatically categorize and direct reports to the relevant municipal authorities, ensuring prompt responses.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-black bg-opacity-10 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-2">Anonymous Reporting</h2>
            <p>
              Report civic issues securely without exposing your personal information, thanks to our blockchain-based token system.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-black bg-opacity-10 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-2">Community Upvoting</h2>
            <p>
              Enable residents to upvote issues, ensuring that the most impactful concerns receive priority attention.
            </p>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-black bg-opacity-10 p-6 rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-semibold mb-2">Rewards System</h2>
            <p>
              Incentivize reporting with rewards for those whose reports lead to real change or receive high community engagement.
            </p>
          </motion.div>
        </div>
        
        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-lg md:text-xl">
            Join us in revolutionizing civic engagement. Together, we can build smarter, more responsive cities.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WhoWeAre;
