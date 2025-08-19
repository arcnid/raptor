export interface AugerData {
  id: string;
  name: string;
  zone: string;
  position: number;
  isRunning: boolean;
  throughput: number;
  targetThroughput: number;
  temperature: number;
  humidity: number;
  status: "optimal" | "warning" | "stopped" | "error";
}

// Hardcoded mock data to prevent hydration issues
export const mockAugerData: AugerData[] = [
  {
    id: "SA-001",
    name: "Raptor Sweep 1",
    zone: "Zone A",
    position: 45,
    isRunning: false,
    throughput: 78.5,
    targetThroughput: 80.0,
    temperature: 72.3,
    humidity: 48.7,
    status: "optimal",
  },
];
