import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Activity, History } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-navbar border-b border-border shadow-lg drop-shadow-[0_0_15px_rgba(59,130,246,0.1)] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-row items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="bg-primary/20 p-2 rounded-lg border border-primary/30">
            <ShieldAlert className="text-primary w-7 h-7" />
          </div>
          <h1 className="text-2xl font-bold font-sans tracking-wide text-white">
            PhishNet <span className="text-primary">AI</span>
          </h1>
        </NavLink>
        <div className="flex flex-row gap-6 font-mono text-sm">
          <NavLink 
            to="/" 
            className={({isActive}) => 
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive ? 'bg-primary text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-gray-400 hover:text-white hover:bg-border/50'}`
            }>
            <Activity className="w-4 h-4" /> Scanner
          </NavLink>
          <NavLink 
            to="/history" 
            className={({isActive}) => 
              `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isActive ? 'bg-primary text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'text-gray-400 hover:text-white hover:bg-border/50'}`
            }>
            <History className="w-4 h-4" /> History
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
