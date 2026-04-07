import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle, XCircle, Search } from "lucide-react";
import { MOCK_ALERTS } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import { useState } from "react";

const severityColor: Record<string, string> = {
  critical: "text-destructive bg-destructive/10 border-destructive/30",
  high: "text-cyber-warning bg-cyber-warning/10 border-cyber-warning/30",
  medium: "text-primary bg-primary/10 border-primary/30",
  low: "text-cyber-success bg-cyber-success/10 border-cyber-success/30",
};

const statusIcon: Record<string, React.ReactNode> = {
  new: <AlertTriangle className="w-3.5 h-3.5 text-destructive" />,
  investigating: <Search className="w-3.5 h-3.5 text-cyber-warning" />,
  resolved: <CheckCircle className="w-3.5 h-3.5 text-cyber-success" />,
  dismissed: <XCircle className="w-3.5 h-3.5 text-muted-foreground" />,
};

const AlertsPage = () => {
  const [filter, setFilter] = useState<string>("all");
  const sorted = [...MOCK_ALERTS].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  const filtered = filter === "all" ? sorted : sorted.filter(a => a.severity === filter);

  const filters = ["all", "critical", "high", "medium", "low"];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold text-foreground font-mono">Security <span className="text-destructive">Alerts</span></h2>
        <p className="text-sm text-muted-foreground mt-1">Suspicious activity notifications and threat intelligence</p>
      </motion.div>

      <div className="flex gap-2">
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all border",
              filter === f ? "bg-primary/10 text-primary border-primary/30" : "text-muted-foreground border-border hover:border-primary/20"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((alert, i) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="cyber-card p-4 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {statusIcon[alert.status]}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase font-bold ${severityColor[alert.severity]}`}>
                      {alert.severity}
                    </span>
                    <span className="text-xs text-muted-foreground capitalize font-mono">{alert.status}</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{alert.type}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.message}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground font-mono">
                    <span>IP: {alert.sourceIp}</span>
                    <span>Session: {alert.sessionId}</span>
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
                {alert.timestamp.toLocaleString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPage;
