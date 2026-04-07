import { motion } from "framer-motion";
import { Link2, Hash, Clock, Shield } from "lucide-react";
import { MOCK_BLOCKCHAIN_LOGS } from "@/lib/mockData";
import { cn } from "@/lib/utils";

const threatColors: Record<string, string> = {
  critical: "text-destructive",
  high: "text-cyber-warning",
  medium: "text-primary",
  low: "text-cyber-success",
};

const BlockchainLogs = () => {
  const logs = [...MOCK_BLOCKCHAIN_LOGS].reverse().slice(0, 30);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold text-foreground font-mono">Blockchain <span className="text-cyber-purple text-glow-purple">Logs</span></h2>
        <p className="text-sm text-muted-foreground mt-1">Immutable, tamper-proof security event ledger</p>
      </motion.div>

      <div className="space-y-3">
        {logs.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.02 }}
            className="cyber-card p-4 hover:border-cyber-purple/30 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-lg bg-cyber-purple/10 flex items-center justify-center border border-cyber-purple/20">
                  <Hash className="w-4 h-4 text-cyber-purple" />
                </div>
                {i < logs.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground font-mono">Block #{log.blockNumber}</span>
                  <span className="text-xs text-muted-foreground font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Hash: </span>
                    <span className="text-primary font-mono text-[10px] break-all">{log.hash.slice(0, 22)}...</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Prev: </span>
                    <span className="text-muted-foreground/60 font-mono text-[10px] break-all">{log.previousHash.slice(0, 22)}...</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs font-mono">
                  <span className="text-muted-foreground">IP: <span className="text-foreground">{log.data.ip}</span></span>
                  <span className={cn("uppercase font-bold", threatColors[log.data.threatLevel])}>{log.data.threatLevel}</span>
                  <span className="text-muted-foreground">Action: <span className="text-cyber-purple">{log.data.action}</span></span>
                  <span className="text-muted-foreground">Nonce: {log.nonce}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlockchainLogs;
