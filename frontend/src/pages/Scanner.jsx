import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Loader2 } from 'lucide-react';
import ResultCard from '../components/ResultCard';
import ExplanationChart from '../components/ExplanationChart';

const SAMPLES = [
  { url: "http://paypa1-secure.tk/login", label: "Phishing" },
  { url: "http://g00gle-verify.ml/account", label: "Phishing" },
  { url: "https://google.com", label: "Safe" },
  { url: "https://github.com", label: "Safe" },
];

const Scanner = () => {
  const [url, setUrl] = useState(() => sessionStorage.getItem('pn_url') || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(() => {
    const saved = sessionStorage.getItem('pn_result');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState(() => sessionStorage.getItem('pn_error') || null);

  // Sync state changes back into browser session
  useEffect(() => { sessionStorage.setItem('pn_url', url); }, [url]);
  useEffect(() => { 
    if (result) sessionStorage.setItem('pn_result', JSON.stringify(result));
    else sessionStorage.removeItem('pn_result');
  }, [result]);
  useEffect(() => {
    if (error) sessionStorage.setItem('pn_error', error);
    else sessionStorage.removeItem('pn_error');
  }, [error]);

  const analyzeUrl = async (targetUrl) => {
    if (!targetUrl) return;
    setLoading(true);
    setError(null);
    setResult(null);

    // Add minimal artificial delay to show cool animation
    await new Promise(r => setTimeout(r, 600));

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze', { url: targetUrl });
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setResult(response.data);
      }
    } catch (err) {
      setError("Network payload deployment failed. Ensure backend API is active on port 8000.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    analyzeUrl(url);
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fadeIn py-8">
      {/* Search Header */}
      <div className="glass-panel p-8 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
        {loading && <div className="scan-line"></div>}
        
        <h2 className="text-3xl font-sans font-bold text-white mb-2">Threat Intelligence Scanner</h2>
        <p className="text-gray-400 font-mono text-sm mb-6 max-w-2xl">
          Enter a URL to perform a deep-learning analysis of structural artifacts, lexial semantics, and potential brand spoofing attempts.
        </p>
        
        <form onSubmit={handleSubmit} className="relative flex items-center mb-6">
          <Search className="absolute left-4 text-primary w-6 h-6" />
          <input
            type="text"
            className="w-full bg-black/40 border border-border text-white text-lg font-mono rounded-xl pl-14 pr-32 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all glow-effect"
            placeholder="https://example.com/login"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !url}
            className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-blue-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold font-sans px-6 rounded-lg transition-all flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "ANALYZE"}
          </button>
        </form>

        <div className="flex flex-wrap gap-3 items-center">
          <span className="text-xs font-mono text-gray-500 uppercase">Quick Payload Injection:</span>
          {SAMPLES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setUrl(sample.url);
                analyzeUrl(sample.url);
              }}
              className="text-xs font-mono bg-border/50 hover:bg-primary/20 text-gray-300 hover:text-primary px-3 py-1.5 rounded-full border border-border/50 transition-all focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {sample.url} <span className="opacity-50 ml-1">({sample.label})</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-phishing/10 border border-phishing/30 text-phishing p-4 rounded-xl font-mono text-sm">
          [!] CRITICAL ERROR: {error}
        </div>
      )}

      {/* Results Container */}
      {result && !loading && (
        <div className="animate-fadeIn relative">
          <ResultCard result={result} />
          <ExplanationChart explanation={result.explanation} label={result.label} />
        </div>
      )}
    </div>
  );
};

export default Scanner;
