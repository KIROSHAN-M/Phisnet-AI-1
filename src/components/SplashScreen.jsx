import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Terminal } from 'lucide-react';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase(1), 1500); // Switch to Welcome
    const timer2 = setTimeout(() => setPhase(2), 3000); // Fade out
    const timer3 = setTimeout(() => onComplete(), 3800); // Tell App we are done

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Intense Cyber Background for Splash */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
          
          <AnimatePresence mode="wait">
            {phase === 0 && (
              <motion.div
                key="phase0"
                initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center relative z-10"
              >
                <motion.div 
                  animate={{ 
                    boxShadow: ["0px 0px 0px rgba(59, 130, 246, 0)", "0px 0px 40px rgba(59, 130, 246, 0.5)", "0px 0px 0px rgba(59, 130, 246, 0)"] 
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="p-6 rounded-full bg-primary/10 border border-primary/30 mb-6"
                >
                  <ShieldAlert className="w-20 h-20 text-primary" />
                </motion.div>
                <h1 className="text-5xl md:text-7xl font-sans font-black text-white tracking-tighter">
                  PhishNet <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">AI</span>
                </h1>
                <p className="mt-4 font-mono text-primary tracking-widest text-sm">THREAT INTELLIGENCE SYSTEM</p>
              </motion.div>
            )}

            {phase === 1 && (
              <motion.div
                key="phase1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center relative z-10"
              >
                <Terminal className="w-12 h-12 text-safe mb-4" />
                <h2 className="text-3xl md:text-5xl font-sans font-bold text-white tracking-wide">Welcome</h2>
                <div className="mt-6 flex items-center gap-3 font-mono text-gray-400 text-sm">
                  <span className="w-2 h-2 rounded-full bg-safe animate-pulse"></span>
                  Initializing Deep-Learning Scanners...
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
