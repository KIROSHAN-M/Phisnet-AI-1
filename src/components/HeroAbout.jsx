import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Zap } from 'lucide-react';

const HeroAbout = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-10 w-full"
    >
      <div className="glass-panel p-8 rounded-3xl border border-primary/20 shadow-2xl relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px]"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-sans font-black text-white mb-4 tracking-tight">
            Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Threat Detection</span>
          </h1>
          <p className="text-lg text-gray-300 font-sans max-w-3xl leading-relaxed mb-8">
            PhishNet AI is an advanced threat intelligence platform. Simply enter any URL, and our deep-learning engine will instantly analyze structural artifacts, lexical semantics, and cross-reference global threat databases to determine if the site is a phishing attempt.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 border border-white/5 p-5 rounded-2xl flex gap-4 items-start">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Instant Analysis</h3>
                <p className="text-sm text-gray-400">Millisecond response times using optimized AI pipelines.</p>
              </div>
            </div>

            <div className="bg-black/30 border border-white/5 p-5 rounded-2xl flex gap-4 items-start">
              <div className="p-3 bg-safe/10 rounded-xl">
                <Target className="w-6 h-6 text-safe" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Brand Spoof Detection</h3>
                <p className="text-sm text-gray-400">Automatically detects if a domain is impersonating major brands.</p>
              </div>
            </div>

            <div className="bg-black/30 border border-white/5 p-5 rounded-2xl flex gap-4 items-start">
              <div className="p-3 bg-suspicious/10 rounded-xl">
                <Shield className="w-6 h-6 text-suspicious" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">Global Cross-Check</h3>
                <p className="text-sm text-gray-400">Queries AlienVault, VirusTotal, and Google Safe Browsing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroAbout;
