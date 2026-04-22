import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ExplanationChart = ({ explanation, label }) => {
  if (!explanation || explanation.length === 0) return null;

  let color = "#10b981"; // Safe
  if (label === 'PHISHING') color = "#ef4444";
  else if (label === 'SUSPICIOUS') color = "#f59e0b";

  // Pseudo-weighting the string reasons for visual chart representation
  // Since the backend returns a list of strings, we assign them importance score loosely based on order or content
  const data = explanation.map((reason, idx) => {
    let weight = 40;
    if (reason.toLowerCase().includes("ml model")) weight = 95;
    else if (reason.toLowerCase().includes("spoofs")) weight = 85;
    else if (reason.toLowerCase().includes("ip address")) weight = 80;
    else if (reason.toLowerCase().includes("entropy")) weight = 60;
    else if (reason.toLowerCase().includes("tld")) weight = 55;
    else if (reason.toLowerCase().includes("safe") || reason.toLowerCase().includes("no strong")) weight = 100;
    return { name: reason, value: weight };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border p-3 rounded-lg shadow-xl font-mono text-sm">
          <p className="text-white mb-1 font-bold">{payload[0].payload.name}</p>
          <p className="text-gray-400">Impact Factor: {payload[0].value}/100</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-border mt-6">
      <h3 className="font-sans font-bold text-lg text-white mb-4">Risk Factor Analysis</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={180} 
              tick={{fill: '#9ca3af', fontSize: 12, fontFamily: 'monospace'}} 
              tickFormatter={(val) => val.length > 25 ? val.substring(0, 25) + '...' : val}
            />
            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} maxBarSize={30}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={color} opacity={0.8 + (index * 0.05)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExplanationChart;
