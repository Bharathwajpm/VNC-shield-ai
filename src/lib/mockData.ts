// Simulated data for the VNC Shield platform

export interface VncSession {
  id: string;
  sourceIp: string;
  destinationIp: string;
  port: number;
  startTime: Date;
  duration: number; // seconds
  dataTransferred: number; // bytes
  status: "active" | "closed" | "blocked";
  threatScore: number; // 0-100
  country: string;
  city: string;
}

export interface Alert {
  id: string;
  timestamp: Date;
  severity: "critical" | "high" | "medium" | "low";
  type: string;
  message: string;
  sourceIp: string;
  status: "new" | "investigating" | "resolved" | "dismissed";
  sessionId: string;
}

export interface BlockchainLog {
  id: string;
  blockNumber: number;
  hash: string;
  previousHash: string;
  timestamp: Date;
  data: {
    ip: string;
    threatLevel: string;
    action: string;
    sessionId: string;
  };
  nonce: number;
}

export interface TrafficDataPoint {
  time: string;
  normal: number;
  suspicious: number;
  blocked: number;
}

const randomIp = () => `${Math.floor(Math.random() * 223) + 1}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
const randomHash = () => "0x" + Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");

const countries = ["Russia", "China", "USA", "Germany", "Brazil", "India", "Nigeria", "Iran", "North Korea", "Ukraine"];
const cities = ["Moscow", "Beijing", "New York", "Berlin", "São Paulo", "Mumbai", "Lagos", "Tehran", "Pyongyang", "Kyiv"];
const alertTypes = ["Unauthorized VNC Access", "Data Exfiltration Detected", "Anomalous Session Duration", "Unknown IP Origin", "Midnight Access Pattern", "High-Volume Data Transfer", "Brute Force Attempt", "Protocol Anomaly"];

export const generateSessions = (count: number): VncSession[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `sess-${String(i + 1).padStart(4, "0")}`,
    sourceIp: randomIp(),
    destinationIp: "192.168.1." + Math.floor(Math.random() * 50 + 10),
    port: 5900 + Math.floor(Math.random() * 10),
    startTime: new Date(Date.now() - Math.random() * 86400000),
    duration: Math.floor(Math.random() * 7200),
    dataTransferred: Math.floor(Math.random() * 500000000),
    status: (["active", "closed", "blocked"] as const)[Math.floor(Math.random() * 3)],
    threatScore: Math.floor(Math.random() * 100),
    country: countries[Math.floor(Math.random() * countries.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
  }));

export const generateAlerts = (count: number): Alert[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `alert-${String(i + 1).padStart(4, "0")}`,
    timestamp: new Date(Date.now() - Math.random() * 86400000),
    severity: (["critical", "high", "medium", "low"] as const)[Math.floor(Math.random() * 4)],
    type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
    message: `Suspicious activity detected from ${randomIp()}`,
    sourceIp: randomIp(),
    status: (["new", "investigating", "resolved", "dismissed"] as const)[Math.floor(Math.random() * 4)],
    sessionId: `sess-${String(Math.floor(Math.random() * 50) + 1).padStart(4, "0")}`,
  }));

export const generateBlockchainLogs = (count: number): BlockchainLog[] => {
  let prevHash = "0x" + "0".repeat(64);
  return Array.from({ length: count }, (_, i) => {
    const hash = randomHash();
    const log: BlockchainLog = {
      id: `block-${i}`,
      blockNumber: i,
      hash,
      previousHash: prevHash,
      timestamp: new Date(Date.now() - (count - i) * 60000),
      data: {
        ip: randomIp(),
        threatLevel: (["critical", "high", "medium", "low"] as const)[Math.floor(Math.random() * 4)],
        action: (["blocked", "logged", "alerted", "quarantined"] as const)[Math.floor(Math.random() * 4)],
        sessionId: `sess-${String(Math.floor(Math.random() * 50) + 1).padStart(4, "0")}`,
      },
      nonce: Math.floor(Math.random() * 100000),
    };
    prevHash = hash;
    return log;
  });
};

export const generateTrafficData = (): TrafficDataPoint[] =>
  Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, "0")}:00`,
    normal: Math.floor(Math.random() * 200 + 50),
    suspicious: Math.floor(Math.random() * 30 + 5),
    blocked: Math.floor(Math.random() * 15),
  }));

export const MOCK_SESSIONS = generateSessions(50);
export const MOCK_ALERTS = generateAlerts(30);
export const MOCK_BLOCKCHAIN_LOGS = generateBlockchainLogs(100);
export const MOCK_TRAFFIC_DATA = generateTrafficData();
