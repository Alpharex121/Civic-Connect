import React from "react";
import { motion } from "framer-motion";
import WaterWaves from "./HomepageWave";

const HeroSec = () => {
  return (
    <section className="relative w-full  h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#022B50] to-[#0A1F35]">
      {/* Water Waves Background */}
      <WaterWaves />

      {/* Tagline in front of waves */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/4 text-white mt-[-5.5%] text-4xl md:text-6xl font-bold z-20 text-center"
      >
        Empowering Citizens
      </motion.h1>

      {/* Tagline beyond waves */}
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="absolute bottom-1/4 mb-[4.5%] text-white text-4xl md:text-6xl font-bold z-20 text-center"
      >
        Transforming Cities
      </motion.h1>

      {/* Hook Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 flex mb-[4.5%] flex-col items-center text-center z-30"
      >
        <p className="text-white text-lg md:text-xl">
          Join the movement. Be the change.
        </p>
        <button className="mt-4 px-6 py-3 cursor-pointer  bg-[#022B50] text-white font-semibold rounded-full shadow-lg hover:bg-[#033769] transition">
          Get Started
        </button>
      </motion.div>
    </section>
  );
};

export default HeroSec;
