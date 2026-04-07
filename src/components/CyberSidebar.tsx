import { motion } from "framer-motion";
import { Shield, Activity, AlertTriangle, Eye, Link2, BarChart3, Settings, Zap } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Dashboard", icon: BarChart3 },
  { path: "/monitoring", label: "Live Monitor", icon: Eye },
  { path: "/alerts", label: "Alerts", icon: AlertTriangle },
  { path: "/blockchain", label: "Blockchain Logs", icon: Link2 },
  { path: "/analytics", label: "Analytics", icon: Activity },
  { path: "/admin", label: "Admin", icon: Settings },
];

const CyberSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 bg-sidebar border-r border-sidebar-border flex flex-col z-50">
      <div className="p-6 border-b border-sidebar-border">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <Shield className="w-8 h-8 text-primary" />
            <Zap className="w-3 h-3 text-cyber-purple absolute -top-0.5 -right-0.5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground text-glow-cyan font-mono">VNC Shield</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">Cyber Defense System</p>
          </div>
        </motion.div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item, i) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <NavLink
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200 group",
                  isActive
                    ? "bg-primary/10 text-primary glow-cyan cyber-border"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive && "drop-shadow-[0_0_6px_hsl(180,100%,50%)]")} />
                <span className="font-medium">{item.label}</span>
                {item.label === "Alerts" && (
                  <span className="ml-auto bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    5
                  </span>
                )}
              </NavLink>
            </motion.div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="cyber-card p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-cyber-success animate-pulse-glow" />
            <span className="text-xs text-cyber-success font-mono">System Online</span>
          </div>
          <p className="text-[10px] text-muted-foreground">Engine v3.2.1 • ML Model Active</p>
        </div>
      </div>
    </aside>
  );
};

export default CyberSidebar;
