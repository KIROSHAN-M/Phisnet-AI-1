import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30"></div>
      
      {/* Ambient Deep Space Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-0"></div>
      
      {/* Animated Glowing Orbs - HIGH SPEED */}
      <motion.div
        animate={{
          x: [0, 400, -200, 0],
          y: [0, 300, -100, 0],
          scale: [1, 1.4, 0.8, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(59, 130, 246, 0) 70%)'
        }}
      />
      
      <motion.div
        animate={{
          x: [0, -350, 250, 0],
          y: [0, -200, 300, 0],
          scale: [1, 1.5, 0.7, 1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(16, 185, 129, 0) 70%)'
        }}
      />
      
      <motion.div
        animate={{
          x: [0, 300, -400, 0],
          y: [0, 250, -200, 0],
          scale: [1, 0.6, 1.6, 1],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] left-[30%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0) 70%)'
        }}
      />
    </div>
  );
};

export default BackgroundAnimation;
