import { motion } from "framer-motion";
import { Shield, Activity, AlertTriangle, Lock, Eye, Wifi } from "lucide-react";
import StatCard from "@/components/StatCard";
import { MOCK_SESSIONS, MOCK_ALERTS, MOCK_TRAFFIC_DATA } from "@/lib/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import networkVisualization from "@/assets/network-visualization.png";

const Dashboard = () => {
  const activeSessions = MOCK_SESSIONS.filter(s => s.status === "active").length;
  const blockedSessions = MOCK_SESSIONS.filter(s => s.status === "blocked").length;
  const criticalAlerts = MOCK_ALERTS.filter(a => a.severity === "critical").length;
  const avgThreat = Math.round(MOCK_SESSIONS.reduce((a, s) => a + s.threatScore, 0) / MOCK_SESSIONS.length);

  const pieData = [
    { name: "Safe", value: MOCK_SESSIONS.filter(s => s.threatScore < 30).length, color: "hsl(145, 80%, 45%)" },
    { name: "Moderate", value: MOCK_SESSIONS.filter(s => s.threatScore >= 30 && s.threatScore < 70).length, color: "hsl(45, 100%, 55%)" },
    { name: "Suspicious", value: MOCK_SESSIONS.filter(s => s.threatScore >= 70).length, color: "hsl(0, 80%, 55%)" },
  ];

  const recentAlerts = [...MOCK_ALERTS].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()).slice(0, 5);

  const severityColor: Record<string, string> = {
    critical: "text-destructive bg-destructive/10 border-destructive/30",
    high: "text-cyber-warning bg-cyber-warning/10 border-cyber-warning/30",
    medium: "text-primary bg-primary/10 border-primary/30",
    low: "text-cyber-success bg-cyber-success/10 border-cyber-success/30",
  };

  return (
    <div className="space-y-6">
      {/* Hero Section with Network Visualization */}
      <motion.div
        className="relative overflow-hidden rounded-xl cyber-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={networkVisualization}
            alt="Cyber network visualization"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
          {/* Gradient blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          {/* Animated glow lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="glowLine1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(180, 100%, 50%)" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="glowLine2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(270, 76%, 53%)" stopOpacity="0" />
                <stop offset="50%" stopColor="hsl(270, 76%, 53%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(270, 76%, 53%)" stopOpacity="0" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Horizontal scanning line */}
            <line x1="0" y1="0" x2="100%" y2="0" stroke="url(#glowLine1)" strokeWidth="2" filter="url(#glow)">
              <animateTransform attributeName="transform" type="translate" values="0,0;0,140;0,0" dur="6s" repeatCount="indefinite" />
            </line>
            {/* Vertical scanning line */}
            <line x1="0" y1="0" x2="0" y2="100%" stroke="url(#glowLine2)" strokeWidth="1.5" filter="url(#glow)">
              <animateTransform attributeName="transform" type="translate" values="0,0;900,0;0,0" dur="8s" repeatCount="indefinite" />
            </line>
            {/* Diagonal pulse */}
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="hsl(180, 100%, 50%)" strokeWidth="0.5" strokeOpacity="0.15" filter="url(#glow)">
              <animate attributeName="stroke-opacity" values="0.05;0.2;0.05" dur="4s" repeatCount="indefinite" />
            </line>
          </svg>
        </div>
        {/* Content */}
        <div className="relative z-10 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground font-mono">
            Dashboard <span className="text-primary text-glow-cyan">Overview</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1 max-w-md">
            Real-time VNC network security monitoring
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyber-success bg-cyber-success/10 px-2.5 py-1 rounded-full border border-cyber-success/30">
              <span className="w-1.5 h-1.5 rounded-full bg-cyber-success animate-pulse" />
              System Online
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {MOCK_SESSIONS.length} sessions tracked
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Wifi} title="Active Sessions" value={activeSessions} variant="cyan" trend={{ value: 12, positive: true }} />
        <StatCard icon={AlertTriangle} title="Critical Alerts" value={criticalAlerts} variant="danger" trend={{ value: 8, positive: false }} />
        <StatCard icon={Lock} title="Sessions Blocked" value={blockedSessions} variant="purple" trend={{ value: 23, positive: true }} />
        <StatCard icon={Eye} title="Avg Threat Score" value={`${avgThreat}/100`} variant="warning" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          className="xl:col-span-2 cyber-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Network Traffic (24h)
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={MOCK_TRAFFIC_DATA}>
              <defs>
                <linearGradient id="colorNormal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(180, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorSuspicious" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(270, 76%, 53%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(270, 76%, 53%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0, 80%, 55%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(0, 80%, 55%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis dataKey="time" stroke="hsl(215, 15%, 40%)" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="hsl(215, 15%, 40%)" fontSize={11} fontFamily="JetBrains Mono" />
              <Tooltip
                contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(180, 100%, 50%, 0.2)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: 12 }}
                labelStyle={{ color: "hsl(180, 100%, 50%)" }}
              />
              <Area type="monotone" dataKey="normal" stroke="hsl(180, 100%, 50%)" fill="url(#colorNormal)" strokeWidth={2} />
              <Area type="monotone" dataKey="suspicious" stroke="hsl(270, 76%, 53%)" fill="url(#colorSuspicious)" strokeWidth={2} />
              <Area type="monotone" dataKey="blocked" stroke="hsl(0, 80%, 55%)" fill="url(#colorBlocked)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="cyber-card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Threat Distribution
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(220, 18%, 10%)", border: "1px solid hsl(180, 100%, 50%, 0.2)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-mono text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div className="cyber-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-destructive" />
          Recent Alerts
        </h3>
        <div className="space-y-2">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono uppercase font-bold ${severityColor[alert.severity]}`}>
                  {alert.severity}
                </span>
                <div>
                  <p className="text-sm text-foreground">{alert.type}</p>
                  <p className="text-xs text-muted-foreground font-mono">{alert.sourceIp}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                {alert.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
