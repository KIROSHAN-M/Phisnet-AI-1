import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from '../pages/LandingPage';
import Scanner from '../pages/Scanner';
import History from '../pages/History';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -20, scale: 0.98 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="w-full h-full flex flex-col">
              <LandingPage />
            </motion.div>
          } 
        />
        <Route 
          path="/scanner" 
          element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="w-full h-full flex flex-col">
              <Scanner />
            </motion.div>
          } 
        />
        <Route 
          path="/history" 
          element={
            <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition} className="w-full h-full flex flex-col">
              <History />
            </motion.div>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
