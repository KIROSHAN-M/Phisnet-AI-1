import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, AlertCircle } from 'lucide-react';

const ResultCard = ({ result }) => {
  if (!result) return null;

  const { label, score, brand_spoofed, brand_distance, explanation } = result;
  
  let labelColor = "text-safe";
  let bgColor = "bg-safe/10";
  let borderColor = "border-safe/30";
  let Icon = ShieldCheck;
  let textLabel = "SAFE URL";

  if (label === 'PHISHING') {
    labelColor = "text-phishing";
    bgColor = "bg-phishing/10";
    borderColor = "border-phishing/30";
    Icon = ShieldAlert;
    textLabel = "MALICIOUS / PHISHING DANGER";
  } else if (label === 'SUSPICIOUS') {
    labelColor = "text-suspicious";
    bgColor = "bg-suspicious/10";
    borderColor = "border-suspicious/30";
    Icon = AlertTriangle;
    textLabel = "SUSPICIOUS URL";
  }

  return (
    <div className={`glass-panel p-6 rounded-2xl border ${borderColor} ${bgColor} shadow-lg backdrop-blur-md mb-6 transition-all animate-fadeIn`}>
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className={`p-4 rounded-full border ${borderColor} animate-pulse relative`}>
            {/* Inner glow */}
            <div className={`absolute inset-0 rounded-full blur-md opacity-50 bg-current ${labelColor}`}></div>
            <Icon className={`w-10 h-10 ${labelColor} relative z-10`} />
          </div>
          <div>
            <h2 className={`font-sans font-bold text-3xl ${labelColor} tracking-wide`}>{textLabel}</h2>
            <p className="font-mono text-gray-300 mt-1 break-all">Verdict Confidence: {(score * 100).toFixed(1)}%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black/20 p-5 rounded-xl border border-white/5">
        <div>
          <h3 className="text-gray-400 font-sans font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> Explanation Features
          </h3>
          <ul className="space-y-2 font-mono text-sm">
            {explanation.map((reason, idx) => (
              <li key={idx} className="flex flex-row items-start gap-2">
                <span className={`mt-1 text-lg leading-none ${labelColor}`}>•</span>
                <span className="text-gray-300">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {brand_spoofed && (
          <div className="border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
            <h3 className="text-gray-400 font-sans font-semibold mb-2">Context Target</h3>
            <div className="bg-card/50 px-4 py-3 rounded-lg border border-border inline-block">
              <p className="font-mono text-sm text-gray-300">Brand Target: <span className="text-white font-bold">{brand_spoofed.toUpperCase()}</span></p>
              <p className="font-mono text-xs text-gray-500 mt-1">Levenshtein Distance: {brand_distance}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
