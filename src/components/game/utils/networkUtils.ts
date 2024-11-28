export function generateIPv4Address(): string {
  const octets = Array.from({ length: 4 }, () => 
    Math.floor(Math.random() * 256)
  );
  return octets.join('.');
}

export function isValidIPv4(ip: string): boolean {
  const parts = ip.split('.');
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    const num = parseInt(part, 10);
    return !isNaN(num) && num >= 0 && num <= 255;
  });
}