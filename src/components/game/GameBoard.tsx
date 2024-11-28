import React, { useState } from 'react';
import { NetworkDevice, NetworkConnection } from './types';
import Device from './Device';
import Connection from './Connection';

interface GameBoardProps {
  devices: NetworkDevice[];
  connections: NetworkConnection[];
  selectedTool: string | null;
  onAddDevice: (type: string, x: number, y: number) => void;
  onConnect: (source: string, target: string) => void;
}

export default function GameBoard({
  devices,
  connections,
  selectedTool,
  onAddDevice,
  onConnect
}: GameBoardProps) {
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);

  const handleBoardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!selectedTool || selectedTool === 'connect') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    onAddDevice(selectedTool, x, y);
  };

  const handleDeviceClick = (deviceId: string) => {
    if (selectedTool !== 'connect') return;

    if (!connectingFrom) {
      setConnectingFrom(deviceId);
    } else {
      onConnect(connectingFrom, deviceId);
      setConnectingFrom(null);
    }
  };

  return (
    <div 
      className="relative w-full h-[600px] bg-black/50 rounded-lg overflow-hidden cursor-crosshair"
      onClick={handleBoardClick}
    >
      {/* Connections */}
      {connections.map((conn, index) => (
        <Connection
          key={`${conn.source}-${conn.target}-${index}`}
          connection={conn}
          devices={devices}
        />
      ))}

      {/* Devices */}
      {devices.map(device => (
        <Device
          key={device.id}
          device={device}
          isConnecting={device.id === connectingFrom}
          onClick={() => handleDeviceClick(device.id)}
        />
      ))}
    </div>
  );
}