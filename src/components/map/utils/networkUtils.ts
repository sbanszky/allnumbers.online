// Generate a random Class B network (128.0.0.0 to 191.255.0.0)
function generateClassBNetwork(): string {
  const firstOctet = 128 + Math.floor(Math.random() * 64); // 128-191
  const secondOctet = Math.floor(Math.random() * 256); // 0-255
  return `${firstOctet}.${secondOctet}.0.0/16`;
}

// Generate n unique Class B networks
export function generateClassBNetworks(n: number): string[] {
  const networks = new Set<string>();
  while (networks.size < n) {
    networks.add(generateClassBNetwork());
  }
  return Array.from(networks);
}