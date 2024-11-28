import React from 'react';
import { NetworkDevice, NetworkConnection } from './types';

interface NetworkStatsProps {
  devices: NetworkDevice[];
  connections: NetworkConnection[];
}

export default function NetworkStats({ devices, connections }: NetworkStatsProps) {
  const stats = {
    computers: devices.filter(d => d.type === 'computer').length,
    servers: devices.filter(d => d.type === 'server').length,
    routers: devices.filter(d => d.type === 'router').length,
    connections: connections.length
  };

  return (
    <div className="bg-black/50 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-cyber-mint mb-4">Network Stats</h2>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400">Computers:</span>
          <span className="text-cyber-mint">{stats.computers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Servers:</span>
          <span className="text-cyber-mint">{stats.servers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Routers:</span>
          <span className="text-cyber-mint">{stats.routers}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Connections:</span>
          <span className="text-cyber-mint">{stats.connections}</span>
        </div>
      </div>
    </div>
  );
}