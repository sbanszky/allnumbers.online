import React from 'react';

export default function MapLegend() {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-4 h-4 rounded-full bg-cyber-blue animate-pulse" />
        <span className="text-cyber-blue">Major Cities with Class B Networks</span>
      </div>
      <p className="text-gray-400 text-sm">
        Hover over nodes to see city details and assigned Class B network
      </p>
    </div>
  );
}