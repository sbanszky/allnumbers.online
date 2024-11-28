export interface NetworkNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  network: string;
  population: number;
}

export interface Connection {
  from: string;
  to: string;
}