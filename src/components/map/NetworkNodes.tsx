import React, { useState } from 'react';
import { NetworkNode, Connection } from './types';

interface NetworkNodesProps {
  nodes: NetworkNode[];
  connections: Connection[];
}

export default function NetworkNodes({ nodes, connections }: NetworkNodesProps) {
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);

  // Convert lat/lng to x/y coordinates with spherical projection
  const projectToXY = (lat: number, lng: number) => {
    const lambda = (lng + 180) * (Math.PI / 180);
    const phi = (90 - lat) * (Math.PI / 180);
    
    // Spherical to Cartesian coordinates
    const x = 500 + (250 * Math.sin(phi) * Math.cos(lambda));
    const y = 250 + (250 * Math.sin(phi) * Math.sin(lambda));
    
    return { x, y };
  };

  // Get curved connection path
  const getConnectionPath = (from: NetworkNode, to: NetworkNode) => {
    const fromPos = projectToXY(from.lat, from.lng);
    const toPos = projectToXY(to.lat, to.lng);
    
    // Calculate control points for curved line
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    const curve = Math.sqrt(dx * dx + dy * dy) * 0.3;
    
    const midX = (fromPos.x + toPos.x) / 2;
    const midY = (fromPos.y + toPos.y) / 2 - curve;
    
    return `M ${fromPos.x} ${fromPos.y} Q ${midX} ${midY} ${toPos.x} ${toPos.y}`;
  };

  return (
    <svg className="absolute inset-0 w-full h-full">
      {/* Connection Lines */}
      {connections.map((conn, idx) => {
        const from = nodes.find(n => n.id === conn.from)!;
        const to = nodes.find(n => n.id === conn.to)!;
        return (
          <path
            key={`conn-${idx}`}
            d={getConnectionPath(from, to)}
            className="stroke-cyber-mint/20 animate-pulse"
            fill="none"
            strokeWidth="1"
          />
        );
      })}

      {/* Network Nodes */}
      {nodes.map((node) => {
        const pos = projectToXY(node.lat, node.lng);
        const isHovered = hoveredNode?.id === node.id;
        
        return (
          <g 
            key={node.id}
            transform={`translate(${pos.x}, ${pos.y})`}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            className="cursor-pointer"
          >
            <circle
              r="4"
              className="fill-cyber-blue animate-pulse"
            />
            <circle
              r="8"
              className="fill-cyber-blue opacity-20 animate-ping"
            />
            
            {isHovered && (
              <g>
                <rect
                  x="10"
                  y="-30"
                  width="160"
                  height="60"
                  rx="4"
                  className="fill-black/90 stroke-cyber-mint/20"
                />
                <text
                  x="20"
                  y="-10"
                  className="fill-cyber-mint text-xs"
                >
                  {node.name}
                </text>
                <text
                  x="20"
                  y="10"
                  className="fill-cyber-blue text-xs"
                >
                  {node.network}
                </text>
                <text
                  x="20"
                  y="30"
                  className="fill-gray-400 text-xs"
                >
                  Pop: {node.population.toLocaleString()}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}