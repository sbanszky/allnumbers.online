export interface NetworkDevice {
  id: string;
  type: string;
  x: number;
  y: number;
  ip: string;
  status: 'active' | 'inactive' | 'error';
}

export interface NetworkConnection {
  source: string;
  target: string;
  status: 'active' | 'inactive' | 'error';
}