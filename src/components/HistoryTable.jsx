import React from 'react';

const formatTimeAgo = (dateStr) => {
  const date = new Date(dateStr + "Z");
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const HistoryTable = ({ scans }) => {
  if (!scans || scans.length === 0) {
    return (
      <div className="text-center py-10 font-mono text-gray-500 glass-panel rounded-2xl mt-6">
        No scan history available yet.
      </div>
    );
  }

  const getLabelBadge = (label) => {
    switch(label) {
      case 'PHISHING': return <span className="px-2 py-1 bg-phishing/20 text-phishing border border-phishing/30 rounded text-xs font-bold font-sans">PHISHING</span>;
      case 'SUSPICIOUS': return <span className="px-2 py-1 bg-suspicious/20 text-suspicious border border-suspicious/30 rounded text-xs font-bold font-sans">SUSPICIOUS</span>;
      default: return <span className="px-2 py-1 bg-safe/20 text-safe border border-safe/30 rounded text-xs font-bold font-sans">SAFE</span>;
    }
  };

  return (
    <div className="overflow-x-auto glass-panel rounded-2xl border border-border shadow-xl backdrop-blur-md mt-6">
      <table className="w-full text-left font-mono whitespace-nowrap">
        <thead className="bg-black/30 border-b border-border/50 text-gray-400 text-sm">
          <tr>
            <th className="px-6 py-4 font-normal">URL Target</th>
            <th className="px-6 py-4 font-normal">Classification</th>
            <th className="px-6 py-4 font-normal">Confidence Score</th>
            <th className="px-6 py-4 font-normal">Brand Target</th>
            <th className="px-6 py-4 font-normal">Scanned</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/20 text-sm">
          {scans.map((scan, idx) => (
            <tr key={idx} className="hover:bg-white/5 transition-colors">
              <td className="px-6 py-4 text-gray-200">
                <div className="max-w-[250px] md:max-w-xs truncate" title={scan.url}>{scan.url}</div>
              </td>
              <td className="px-6 py-4">{getLabelBadge(scan.label)}</td>
              <td className="px-6 py-4 text-gray-400">{(scan.score * 100).toFixed(1)}%</td>
              <td className="px-6 py-4 text-gray-400">{scan.brand ? scan.brand.toUpperCase() : '-'}</td>
              <td className="px-6 py-4 text-gray-500 text-xs text-right">
                {formatTimeAgo(scan.scanned_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
