import { motion } from "framer-motion";
import { Settings, ShieldOff, Sliders, Save } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const AdminPage = () => {
  const [blockIp, setBlockIp] = useState("");
  const [blockedIps, setBlockedIps] = useState(["185.220.101.45", "94.232.46.12", "103.75.190.8"]);
  const [thresholds, setThresholds] = useState({ threatScore: 70, sessionDuration: 3600, dataVolume: 100 });
  const [autoBlock, setAutoBlock] = useState(true);

  const handleBlock = () => {
    if (blockIp && !blockedIps.includes(blockIp)) {
      setBlockedIps(prev => [...prev, blockIp]);
      setBlockIp("");
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold text-foreground font-mono">Admin <span className="text-primary text-glow-cyan">Controls</span></h2>
        <p className="text-sm text-muted-foreground mt-1">System configuration and security policies</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div className="cyber-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <ShieldOff className="w-4 h-4 text-destructive" /> IP Blocklist
          </h3>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={blockIp}
              onChange={e => setBlockIp(e.target.value)}
              placeholder="Enter IP address..."
              className="flex-1 bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground font-mono placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
            <button
              onClick={handleBlock}
              className="px-4 py-2 bg-destructive/10 text-destructive border border-destructive/30 rounded-lg text-sm font-mono hover:bg-destructive/20 transition-colors"
            >
              Block
            </button>
          </div>
          <div className="space-y-2">
            {blockedIps.map(ip => (
              <div key={ip} className="flex items-center justify-between p-2.5 rounded-lg bg-muted/30">
                <span className="font-mono text-sm text-foreground">{ip}</span>
                <button
                  onClick={() => setBlockedIps(prev => prev.filter(i => i !== ip))}
                  className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="cyber-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-primary" /> Detection Thresholds
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Threat Score Threshold</span>
                <span className="text-primary font-mono font-bold">{thresholds.threatScore}</span>
              </div>
              <input
                type="range" min="0" max="100"
                value={thresholds.threatScore}
                onChange={e => setThresholds(p => ({ ...p, threatScore: +e.target.value }))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Max Session Duration (sec)</span>
                <span className="text-primary font-mono font-bold">{thresholds.sessionDuration}</span>
              </div>
              <input
                type="range" min="300" max="7200"
                value={thresholds.sessionDuration}
                onChange={e => setThresholds(p => ({ ...p, sessionDuration: +e.target.value }))}
                className="w-full accent-primary"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-muted-foreground">Max Data Volume (MB)</span>
                <span className="text-primary font-mono font-bold">{thresholds.dataVolume}</span>
              </div>
              <input
                type="range" min="10" max="1000"
                value={thresholds.dataVolume}
                onChange={e => setThresholds(p => ({ ...p, dataVolume: +e.target.value }))}
                className="w-full accent-primary"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
              <span className="text-sm text-foreground">Auto-block suspicious sessions</span>
              <button
                onClick={() => setAutoBlock(!autoBlock)}
                className={cn(
                  "w-10 h-5 rounded-full transition-colors relative",
                  autoBlock ? "bg-primary" : "bg-muted"
                )}
              >
                <div className={cn("w-4 h-4 rounded-full bg-background absolute top-0.5 transition-transform", autoBlock ? "translate-x-5" : "translate-x-0.5")} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
