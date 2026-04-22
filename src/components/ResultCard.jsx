import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ResultCard = ({ result }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!result) return null;

  const { url, label, score, brand_spoofed, brand_distance, explanation } = result;
  
  let labelColor = "text-safe";
  let bgColor = "bg-safe/10";
  let borderColor = "border-safe/30";
  let Icon = ShieldCheck;
  let textLabel = "SAFE URL";
  let shadowGlow = "shadow-safe/20";

  if (label === 'PHISHING') {
    labelColor = "text-phishing";
    bgColor = "bg-phishing/10";
    borderColor = "border-phishing/30";
    Icon = ShieldAlert;
    textLabel = "MALICIOUS / PHISHING DANGER";
    shadowGlow = "shadow-phishing/30";
  } else if (label === 'SUSPICIOUS') {
    labelColor = "text-suspicious";
    bgColor = "bg-suspicious/10";
    borderColor = "border-suspicious/30";
    Icon = AlertTriangle;
    textLabel = "SUSPICIOUS URL";
    shadowGlow = "shadow-suspicious/30";
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`glass-panel p-6 rounded-2xl border ${borderColor} ${bgColor} shadow-2xl ${shadowGlow} backdrop-blur-md mb-6 relative overflow-hidden`}
    >
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={`p-4 rounded-full border ${borderColor} relative`}
              >
                <div className={`absolute inset-0 rounded-full blur-md opacity-50 bg-current ${labelColor}`}></div>
                <Icon className={`w-10 h-10 ${labelColor} relative z-10`} />
              </motion.div>
              <div>
                <h2 className={`font-sans font-bold text-3xl ${labelColor} tracking-wide`}>{textLabel}</h2>
                <p className="font-mono text-gray-300 mt-1 break-all flex items-center gap-2">
                  Verdict Confidence: {(score * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="bg-black/20 p-5 rounded-xl border border-white/5 mb-6">
              <h3 className="text-gray-400 font-sans font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Explanation Features
              </h3>
              <ul className="space-y-2 font-mono text-sm">
                {explanation.map((reason, idx) => (
                  <motion.li 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx} 
                    className="flex flex-row items-start gap-2"
                  >
                    <span className={`mt-1 text-lg leading-none ${labelColor}`}>•</span>
                    <span className="text-gray-300">{reason}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {brand_spoofed && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="bg-card/50 p-4 rounded-xl border border-border mt-auto"
            >
              <h3 className="text-gray-400 font-sans font-semibold mb-2 text-sm uppercase">Context Target</h3>
              <p className="font-mono text-sm text-gray-300">Brand Target: <span className="text-white font-bold">{brand_spoofed.toUpperCase()}</span></p>
              <p className="font-mono text-xs text-gray-500 mt-1">Levenshtein Distance: {brand_distance}</p>
            </motion.div>
          )}
        </div>

        {/* Right Side: Visual Preview */}
        <div className="w-full lg:w-5/12 flex flex-col">
          <h3 className="text-gray-400 font-sans font-semibold mb-3 flex items-center gap-2">
            <ExternalLink className="w-4 h-4" /> Live Visual Snapshot
          </h3>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="rounded-xl overflow-hidden border border-border shadow-lg bg-black/40 flex-1 relative min-h-[300px] group"
          >
            {/* Loading Indicator */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 font-mono text-sm z-0 p-6 text-center bg-black/60">
                <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
                <p className="font-bold text-white mb-2">Connecting to Enterprise Snapshot Engine...</p>
                <p className="text-xs">Bypassing firewalls. This may show a "Generating Preview" placeholder for a few seconds before the image appears.</p>
              </div>
            )}
            
            <img 
              src={`https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1200`}
              alt={`Live snapshot of ${url}`}
              className={`absolute inset-0 w-full h-full object-cover object-top z-10 transition-all duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                setImageError(true);
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />

            {/* Ultimate Error Fallback */}
            <div className="absolute inset-0 hidden flex-col items-center justify-center bg-black/80 z-20 text-center p-6" style={{ display: 'none' }}>
              <AlertTriangle className="w-10 h-10 text-phishing mb-3 opacity-50" />
              <p className="font-mono text-sm text-gray-300">Target server is completely blocking external snapshot systems.</p>
            </div>
            
            <div className="absolute bottom-3 left-3 z-30 right-3 pointer-events-none">
              <div className="bg-black/80 backdrop-blur-sm p-2 rounded border border-white/10 inline-block max-w-full">
                <p className="font-mono text-xs text-white/90 truncate">{url}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
