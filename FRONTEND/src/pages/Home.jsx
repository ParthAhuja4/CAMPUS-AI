import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to CAMPUS PULSE
      </h1>
      <p className="mt-4 text-gray-600 text-lg">
        Explore campus features from the sidebar
      </p>

      {/* Animated Feature Cards */}
      <div className="mt-10 grid grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-6 bg-white shadow-lg rounded-lg text-center w-60 cursor-pointer"
        >
          <h3 className="text-xl font-semibold">Smart Attendance</h3>
          <p className="text-gray-500 mt-2">Track your attendance easily.</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-6 bg-white shadow-lg rounded-lg text-center w-60 cursor-pointer"
        >
          <h3 className="text-xl font-semibold">Campus Map</h3>
          <p className="text-gray-500 mt-2">Navigate the campus efficiently.</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
