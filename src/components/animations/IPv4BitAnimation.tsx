import React, { useState, useEffect } from 'react';

export default function IPv4BitAnimation() {
  const [bits, setBits] = useState<string[]>(Array(32).fill('0'));
  const [highlightedBit, setHighlightedBit] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      let currentBit = 0;
      interval = setInterval(() => {
        if (currentBit >= 32) {
          setIsPlaying(false);
          setHighlightedBit(null);
          return;
        }
        setHighlightedBit(currentBit);
        setBits(prev => {
          const newBits = [...prev];
          newBits[currentBit] = Math.random() > 0.5 ? '1' : '0';
          return newBits;
        });
        currentBit++;
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleReset = () => {
    setBits(Array(32).fill('0'));
    setHighlightedBit(null);
    setIsPlaying(false);
  };

  const getBitLabel = (index: number) => {
    if (index === 0) return 'MSB';
    if (index === 31) return 'LSB';
    return '';
  };

  return (
    <div className="bg-black/20 p-6 rounded-lg border border-cyber-mint/10 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-cyber-mint">32-bit IPv4 Structure</h3>
        <div className="space-x-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-4 py-2 bg-cyber-purple/20 text-cyber-mint rounded-lg hover:bg-cyber-purple/30 transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-cyber-purple/20 text-cyber-mint rounded-lg hover:bg-cyber-purple/30 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[0, 1, 2, 3].map(octet => (
          <div key={octet} className="space-y-2">
            <div className="grid grid-cols-8 gap-1">
              {bits.slice(octet * 8, (octet + 1) * 8).map((bit, idx) => {
                const globalIdx = octet * 8 + idx;
                const bitLabel = getBitLabel(globalIdx);
                return (
                  <div key={globalIdx} className="relative">
                    <div
                      className={`
                        aspect-square flex items-center justify-center text-sm font-mono
                        ${highlightedBit === globalIdx ? 'bg-cyber-mint text-black' : 'bg-black/50 text-cyber-mint'}
                        ${bit === '1' ? 'border-2 border-cyber-mint' : 'border border-cyber-mint/30'}
                        rounded transition-all duration-200
                      `}
                    >
                      {bit}
                    </div>
                    {bitLabel && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-cyber-mint">
                        {bitLabel}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="text-center text-cyber-purple text-sm">
              Octet {octet + 1}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-cyber-purple text-sm">
        <p>• Each octet represents 8 bits (1 byte) of the IPv4 address</p>
        <p>• MSB: Most Significant Bit | LSB: Least Significant Bit</p>
        <p>• Total bits: 32 (4 octets × 8 bits)</p>
      </div>
    </div>
  );
}