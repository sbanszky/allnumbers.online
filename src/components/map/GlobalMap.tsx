import React from 'react';
import NetworkNodes from './NetworkNodes';
import MapLegend from './MapLegend';
import { cities } from './data/cities';
import { generateClassBNetworks } from './utils/networkUtils';
import { NetworkNode } from './types';

// Generate random Class B networks for each city
const classB = generateClassBNetworks(cities.length);

// Create nodes by combining cities with Class B networks
const nodes: NetworkNode[] = cities.map((city, index) => ({
  id: city.id,
  name: city.name,
  lat: city.lat,
  lng: city.lng,
  network: classB[index],
  population: city.population
}));

// Create connections between nodes (each node connects to 2-3 nearest neighbors)
const connections = nodes.flatMap(node => {
  const distances = nodes
    .filter(n => n.id !== node.id)
    .map(n => ({
      id: n.id,
      distance: Math.sqrt(
        Math.pow(n.lat - node.lat, 2) + Math.pow(n.lng - node.lng, 2)
      )
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 2 + Math.floor(Math.random() * 2)) // 2-3 connections
    .map(n => ({ from: node.id, to: n.id }));
  
  return distances;
});

export default function GlobalMap() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-black/30 p-8 rounded-lg cyber-border">
        <h2 className="text-3xl font-bold text-cyber-mint mb-8">Global Network Distribution</h2>
        
        <div className="relative aspect-[2/1] bg-black rounded-lg overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000_100%)]" />
          
          {/* Network Nodes and Connections */}
          <NetworkNodes nodes={nodes} connections={connections} />
        </div>

        {/* Map Legend */}
        <MapLegend />
      </div>
    </div>
  );
}