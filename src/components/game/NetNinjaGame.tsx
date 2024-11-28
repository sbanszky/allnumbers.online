import React, { useState } from 'react';
import { NetworkDevice, NetworkConnection } from './types';
import GameBoard from './GameBoard';
import Toolbox from './Toolbox';
import NetworkStats from './NetworkStats';
import { generateIPv4Address } from './utils/networkUtils';

export default function NetNinjaGame() {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [connections, setConnections] = useState<NetworkConnection[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleAddDevice = (type: string, x: number, y: number) => {
    const newDevice: NetworkDevice = {
      id: `device-${devices.length}`,
      type,
      x,
      y,
      ip: generateIPv4Address(),
      status: 'active'
    };
    setDevices([...devices, newDevice]);
  };

  const handleConnect = (source: string, target: string) => {
    if (source === target) return;
    
    const connectionExists = connections.some(
      conn => (conn.source === source && conn.target === target) ||
              (conn.source === target && conn.target === source)
    );
    
    if (!connectionExists) {
      setConnections([...connections, { source, target, status: 'active' }]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-black/30 p-8 rounded-lg cyber-border">
        <h1 className="text-4xl font-bold text-cyber-mint mb-8">Net Ninja: IP Quest</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <GameBoard
              devices={devices}
              connections={connections}
              selectedTool={selectedTool}
              onAddDevice={handleAddDevice}
              onConnect={handleConnect}
            />
          </div>
          
          <div className="space-y-8">
            <Toolbox
              selectedTool={selectedTool}
              onSelectTool={setSelectedTool}
            />
            <NetworkStats
              devices={devices}
              connections={connections}
            />
          </div>
        </div>
      </div>
    </div>
  );
}