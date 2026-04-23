import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { RefreshCw, RadioTower } from 'lucide-react';
import HistoryTable from '../components/HistoryTable';

const History = () => {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    try {
      setError(null);
      const response = await axios.get('/api/history');
      setScans(response.data);
    } catch (err) {
      setError("Failed to establish secure connection to history endpoint.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
    const interval = setInterval(fetchHistory, 30000); // 30s auto-refresh
    return () => clearInterval(interval);
  }, [fetchHistory]);

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn py-8">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h2 className="text-3xl font-sans font-bold text-white mb-2 flex items-center gap-3">
            <RadioTower className="w-8 h-8 text-primary" /> Global Sensor Log
          </h2>
          <p className="text-gray-400 font-mono text-sm">
            Live telemetry of recent threat analyses across node targets. Auto-refreshing every 30s.
          </p>
        </div>
        
        <button 
          onClick={() => { setLoading(true); fetchHistory(); }}
          className="bg-card hover:bg-border transition-colors text-white px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 border border-border"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-primary' : ''}`} />
          SYNC LOGS
        </button>
      </div>

      {error ? (
        <div className="bg-phishing/10 border border-phishing/30 text-phishing p-4 rounded-xl font-mono text-sm">
          [!] {error}
        </div>
      ) : (
        <div className="relative">
          {loading && scans.length === 0 && (
             <div className="absolute inset-0 bg-background/50 flex items-center justify-center rounded-2xl z-10 p-10">
               <RefreshCw className="w-8 h-8 animate-spin text-primary" />
             </div>
          )}
          <HistoryTable scans={scans} />
        </div>
      )}
    </div>
  );
};

export default History;
