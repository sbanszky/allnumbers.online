import React from 'react';
import { Computer, Server, Router, Cable } from 'lucide-react';

interface ToolboxProps {
  selectedTool: string | null;
  onSelectTool: (tool: string | null) => void;
}

export default function Toolbox({ selectedTool, onSelectTool }: ToolboxProps) {
  const tools = [
    { id: 'computer', icon: Computer, label: 'Computer' },
    { id: 'server', icon: Server, label: 'Server' },
    { id: 'router', icon: Router, label: 'Router' },
    { id: 'connect', icon: Cable, label: 'Connect' }
  ];

  return (
    <div className="bg-black/50 p-4 rounded-lg">
      <h2 className="text-xl font-bold text-cyber-mint mb-4">Tools</h2>
      <div className="grid grid-cols-2 gap-4">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(selectedTool === tool.id ? null : tool.id)}
            className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
              selectedTool === tool.id
                ? 'bg-cyber-mint/20 text-cyber-mint'
                : 'bg-black/30 text-gray-400 hover:bg-cyber-mint/10 hover:text-cyber-mint'
            }`}
          >
            <tool.icon className="w-8 h-8 mb-2" />
            <span className="text-sm">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}