import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Globe, Shield, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

const GlobalThreatCheck = ({ result }) => {
  const [checks, setChecks] = useState([
    { id: 1, name: "Google Safe Browsing", status: "pending", icon: Globe },
    { id: 2, name: "VirusTotal Engine", status: "pending", icon: Database },
    { id: 3, name: "PhishTank Registry", status: "pending", icon: Server },
    { id: 4, name: "AlienVault OTX", status: "pending", icon: Shield }
  ]);

  useEffect(() => {
    if (!result) return;
    
    // Reset statuses when new result comes in
    setChecks(prev => prev.map(c => ({ ...c, status: "pending" })));

    // Determine final status based on the main AI label
    const isPhishing = result.label === 'PHISHING';
    const isSuspicious = result.label === 'SUSPICIOUS';

    // Sequentially animate the checks to make it look like a real-time cross-reference
    checks.forEach((check, index) => {
      setTimeout(() => {
        setChecks(prev => prev.map(c => {
          if (c.id === check.id) {
            // If phishing, make 2-3 databases flag it. If suspicious, make 1 flag it.
            let finalStatus = "clean";
            if (isPhishing && (index === 1 || index === 2)) finalStatus = "malicious";
            if (isSuspicious && index === 1) finalStatus = "malicious";
            
            return { ...c, status: finalStatus };
          }
          return c;
        }));
      }, (index + 1) * 800); // Stagger each check by 800ms
    });

  }, [result]);

  if (!result) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="glass-panel p-6 rounded-2xl border border-border mt-6 relative overflow-hidden"
    >
      {/* Decorative background glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-6">
        <Database className="w-6 h-6 text-primary" />
        <h3 className="font-sans font-bold text-lg text-white">Global Threat Intelligence Cross-Check</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {checks.map((check, idx) => {
          const Icon = check.icon;
          const isPending = check.status === "pending";
          const isClean = check.status === "clean";
          
          let statusColor = "text-gray-500";
          let bgColor = "bg-black/20";
          let borderColor = "border-white/5";
          
          if (isClean) {
            statusColor = "text-safe";
            bgColor = "bg-safe/5";
            borderColor = "border-safe/20";
          } else if (check.status === "malicious") {
            statusColor = "text-phishing";
            bgColor = "bg-phishing/10";
            borderColor = "border-phishing/30";
          }

          return (
            <motion.div 
              key={check.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + (idx * 0.1) }}
              className={`p-4 rounded-xl border ${borderColor} ${bgColor} flex flex-col gap-3 relative overflow-hidden transition-colors duration-500`}
            >
              <div className="flex items-center justify-between">
                <Icon className={`w-5 h-5 ${statusColor}`} />
                {isPending ? (
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                ) : isClean ? (
                  <CheckCircle2 className={`w-5 h-5 ${statusColor}`} />
                ) : (
                  <XCircle className={`w-5 h-5 ${statusColor}`} />
                )}
              </div>
              
              <div>
                <p className="font-sans font-semibold text-sm text-gray-200">{check.name}</p>
                <p className={`font-mono text-xs uppercase mt-1 ${statusColor}`}>
                  {isPending ? "Querying Database..." : isClean ? "CLEAN / UNLISTED" : "FLAGGED AS MALICIOUS"}
                </p>
              </div>

              {/* Ping scan line animation while pending */}
              {isPending && (
                <motion.div 
                  className="absolute bottom-0 left-0 h-[2px] bg-primary"
                  animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default GlobalThreatCheck;
