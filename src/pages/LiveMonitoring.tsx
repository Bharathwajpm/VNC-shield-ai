import { motion } from "framer-motion";
import { Eye, Globe, Clock, Database, Shield } from "lucide-react";
import { MOCK_SESSIONS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

const LiveMonitoring = () => {
  const [sessions, setSessions] = useState(MOCK_SESSIONS);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => !p);
      setSessions(prev => prev.map(s => ({
        ...s,
        dataTransferred: s.status === "active" ? s.dataTransferred + Math.floor(Math.random() * 50000) : s.dataTransferred,
        duration: s.status === "active" ? s.duration + 3 : s.duration,
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const activeSessions = sessions.filter(s => s.status === "active");

  const threatColor = (score: number) => {
    if (score >= 70) return "text-destructive";
    if (score >= 40) return "text-cyber-warning";
    return "text-cyber-success";
  };

  const formatBytes = (bytes: number) => {
    if (bytes > 1e9) return (bytes / 1e9).toFixed(1) + " GB";
    if (bytes > 1e6) return (bytes / 1e6).toFixed(1) + " MB";
    if (bytes > 1e3) return (bytes / 1e3).toFixed(1) + " KB";
    return bytes + " B";
  };

  const formatDuration = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m ${s % 60}s`;
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-foreground font-mono">Live <span className="text-primary text-glow-cyan">Monitor</span></h2>
          <div className="flex items-center gap-2 ml-4">
            <div className={cn("w-2 h-2 rounded-full bg-cyber-success", pulse && "animate-pulse-glow")} />
            <span className="text-xs text-cyber-success font-mono">SCANNING</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Real-time VNC session tracking on port 5900</p>
      </motion.div>

      <div className="cyber-card overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Active Sessions ({activeSessions.length})</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-xs text-muted-foreground uppercase tracking-wider">
                <th className="text-left p-3 font-medium">Session</th>
                <th className="text-left p-3 font-medium">Source IP</th>
                <th className="text-left p-3 font-medium">Location</th>
                <th className="text-left p-3 font-medium">Port</th>
                <th className="text-left p-3 font-medium">Duration</th>
                <th className="text-left p-3 font-medium">Data</th>
                <th className="text-left p-3 font-medium">Threat</th>
                <th className="text-left p-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {sessions.slice(0, 20).map((session, i) => (
                <motion.tr
                  key={session.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3 font-mono text-xs text-primary">{session.id}</td>
                  <td className="p-3 font-mono text-xs text-foreground">{session.sourceIp}</td>
                  <td className="p-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Globe className="w-3 h-3" />{session.city}, {session.country}</span>
                  </td>
                  <td className="p-3 font-mono text-xs text-foreground">{session.port}</td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{formatDuration(session.duration)}</span>
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Database className="w-3 h-3" />{formatBytes(session.dataTransferred)}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={cn("h-full rounded-full", session.threatScore >= 70 ? "bg-destructive" : session.threatScore >= 40 ? "bg-cyber-warning" : "bg-cyber-success")}
                          style={{ width: `${session.threatScore}%` }}
                        />
                      </div>
                      <span className={cn("font-mono text-xs font-bold", threatColor(session.threatScore))}>{session.threatScore}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase font-bold",
                      session.status === "active" ? "text-cyber-success bg-cyber-success/10 border-cyber-success/30" :
                      session.status === "blocked" ? "text-destructive bg-destructive/10 border-destructive/30" :
                      "text-muted-foreground bg-muted border-border"
                    )}>
                      {session.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LiveMonitoring;
