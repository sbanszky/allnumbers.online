import React from 'react';
import { NetworkDevice, NetworkConnection } from './types';

interface ConnectionProps {
  connection: NetworkConnection;
  devices: NetworkDevice[];
}

export default function Connection({ connection, devices }: ConnectionProps) {
  const source = devices.find(d => d.id === connection.source);
  const target = devices.find(d => d.id === connection.target);

  if (!source || !target) return null;

  const x1 = source.x;
  const y1 = source.y;
  const x2 = target.x;
  const y2 = target.y;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className="stroke-cyber-mint/50"
        strokeWidth="2"
        strokeDasharray="4"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="8"
          dur="1s"
          repeatCount="indefinite"
        />
      </line>
    </svg>
  );
}