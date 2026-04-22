import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, ArrowRight, Zap, Target, Lock, Globe, Activity, Terminal, ChevronDown } from 'lucide-react';
import soundManager from '../utils/SoundManager';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleInitialize = () => {
    soundManager.playClickSound();
    navigate('/scanner');
  };

  const playHover = () => soundManager.playHoverSound();
  const playClick = () => soundManager.playClickSound();

  useEffect(() => {
    // Attempt to play boot sound when the landing page loads
    const timer = setTimeout(() => {
      soundManager.playBootSound();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full relative overflow-x-hidden bg-[#030508] -mt-6">
      {/* Intense grid background */}
      <div className="absolute inset-0 cyber-grid opacity-10 z-0 pointer-events-none"></div>
      
      {/* Massive Glowing Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-blue-900/30 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-32 pb-16 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md mb-12 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          </span>
          <span className="text-cyan-300 font-mono text-sm tracking-wider uppercase">System Online • v2.1.4</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[1.1] font-sans"
        >
          Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Standard</span><br/>
          Threat Intelligence
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl text-gray-400 max-w-3xl mb-12 leading-relaxed font-sans"
        >
          PhishNet AI leverages multi-dimensional heuristic analysis and deep neural networks to dismantle sophisticated cyber threats in milliseconds.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-8"
        >
          <button
            onClick={handleInitialize}
            onMouseEnter={playHover}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl overflow-hidden font-bold text-white text-lg tracking-wide transition-all hover:scale-105 shadow-[0_0_40px_rgba(6,182,212,0.4)]"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            <Shield className="w-6 h-6 relative z-10" />
            <span className="relative z-10">INITIALIZE SCANNER</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform relative z-10" />
          </button>
          
          <div className="h-16 flex items-center justify-center text-sm md:text-base max-w-2xl text-center">
            <TypewriterText 
              text="> SYSTEM STATUS: Optimal. Threat databases synchronized. Global neural networks online. Awaiting URL payload for heuristic analysis..." 
              delay={1500} 
              speed={40} 
            />
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="mt-4 mb-20 relative z-10"
      >
        <a href="#features" className="text-gray-500 hover:text-cyan-400 transition-colors">
          <ChevronDown className="w-10 h-10 drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
        </a>
      </motion.div>

      {/* Grid of Features with Mouse Spotlight */}
      <div id="features" className="w-full max-w-7xl mx-auto px-4 pb-32 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Enterprise-Grade Infrastructure</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-transparent mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg">Uncompromising security for modern digital perimeters.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SpotlightCard 
            icon={<Zap className="w-8 h-8 text-yellow-400" />}
            title="Instant Analysis"
            desc="Millisecond response times using highly optimized asynchronous AI pipelines and distributed threat caching."
            glow="rgba(250, 204, 21, 0.15)"
          />
          <SpotlightCard 
            icon={<Target className="w-8 h-8 text-emerald-400" />}
            title="Brand Spoof Detection"
            desc="Automatically detects if a domain is impersonating major brands via perceptual hashing and lexical similarity."
            glow="rgba(52, 211, 153, 0.15)"
          />
          <SpotlightCard 
            icon={<Globe className="w-8 h-8 text-blue-400" />}
            title="Global Cross-Check"
            desc="Simultaneously queries AlienVault, VirusTotal, and Google Safe Browsing for comprehensive intelligence."
            glow="rgba(96, 165, 250, 0.15)"
          />
          <SpotlightCard 
            icon={<Lock className="w-8 h-8 text-purple-400" />}
            title="Zero-Day Protection"
            desc="Identifies newly registered, highly suspicious domains that aren't yet present in standard blacklists."
            glow="rgba(192, 132, 252, 0.15)"
          />
          <SpotlightCard 
            icon={<Activity className="w-8 h-8 text-rose-400" />}
            title="Real-time Telemetry"
            desc="Live tracking of scanning operations with visual feedback and detailed breakdown of threat scores."
            glow="rgba(251, 113, 133, 0.15)"
          />
          <SpotlightCard 
            icon={<Shield className="w-8 h-8 text-cyan-400" />}
            title="Enterprise Grade"
            desc="Built with a secure architecture designed to bypass evasive maneuvers employed by modern phishing kits."
            glow="rgba(34, 211, 238, 0.15)"
          />
        </div>
      </div>
    </div>
  );
};

const SpotlightCard = ({ icon, title, desc, glow }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setOpacity(1);
        soundManager.playHoverSound();
      }}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden rounded-2xl bg-[#0B1120]/80 backdrop-blur-xl border border-white/10 p-8 transition-transform duration-300 hover:scale-[1.03] cursor-default shadow-xl"
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glow}, transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 shadow-inner">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight font-sans">{title}</h3>
        <p className="text-gray-400 leading-relaxed flex-1 font-sans text-sm md:text-base">{desc}</p>
      </div>
    </div>
  );
};

const TypewriterText = ({ text, delay = 0, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
    return () => clearInterval(typingInterval);
  }, [text, started, speed]);

  return (
    <span className="font-mono text-cyan-400/80 tracking-wide">
      {displayedText}
      <span className="animate-pulse text-cyan-300 ml-1">_</span>
    </span>
  );
};

export default LandingPage;
