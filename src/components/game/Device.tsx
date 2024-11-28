import React from 'react';
import { Computer, Server, Router } from 'lucide-react';
import { NetworkDevice } from './types';

interface DeviceProps {
  device: NetworkDevice;
  isConnecting: boolean;
  onClick: () => void;
}

export default function Device({ device, isConnecting, onClick }: DeviceProps) {
  const icons = {
    computer: Computer,
    server: Server,
    router: Router
  };

  const Icon = icons[device.type as keyof typeof icons];

  return (
    <div
      className={`absolute cursor-pointer transition-transform ${
        isConnecting ? 'scale-110' : 'hover:scale-105'
      }`}
      style={{ left: device.x - 20, top: device.y - 20 }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className={`p-2 rounded-lg ${
        isConnecting ? 'bg-cyber-mint text-black' : 'bg-black/70 text-cyber-mint'
      }`}>
        <Icon className="w-8 h-8" />
      </div>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
        <span className="text-xs text-cyber-mint whitespace-nowrap">{device.ip}</span>
      </div>
    </div>
  );
}