import { motion } from "framer-motion";
import { BarChart3, TrendingUp } from "lucide-react";
import { MOCK_SESSIONS, MOCK_TRAFFIC_DATA } from "@/lib/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, LineChart, Line } from "recharts";

const AnalyticsPage = () => {
  const countryData = Object.entries(
    MOCK_SESSIONS.reduce<Record<string, number>>((acc, s) => {
      acc[s.country] = (acc[s.country] || 0) + 1;
      return acc;
    }, {})
  ).map(([country, count]) => ({ country, count })).sort((a, b) => b.count - a.count);

  const threatDistribution = [
    { range: "0-20", count: MOCK_SESSIONS.filter(s => s.threatScore <= 20).length },
    { range: "21-40", count: MOCK_SESSIONS.filter(s => s.threatScore > 20 && s.threatScore <= 40).length },
    { range: "41-60", count: MOCK_SESSIONS.filter(s => s.threatScore > 40 && s.threatScore <= 60).length },
    { range: "61-80", count: MOCK_SESSIONS.filter(s => s.threatScore > 60 && s.threatScore <= 80).length },
    { range: "81-100", count: MOCK_SESSIONS.filter(s => s.threatScore > 80).length },
  ];

  const radarData = [
    { metric: "Volume", value: 78 },
    { metric: "Duration", value: 65 },
    { metric: "Frequency", value: 82 },
    { metric: "Geo Risk", value: 45 },
    { metric: "Time Risk", value: 70 },
    { metric: "Protocol", value: 55 },
  ];

  const chartStyle = { background: "hsl(220, 18%, 10%)", border: "1px solid hsl(180, 100%, 50%, 0.2)", borderRadius: "8px", fontFamily: "JetBrains Mono", fontSize: 12 };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-2xl font-bold text-foreground font-mono">Analytics <span className="text-primary text-glow-cyan">& Insights</span></h2>
        <p className="text-sm text-muted-foreground mt-1">ML-powered behavioral analysis and threat intelligence</p>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <motion.div className="cyber-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-primary" /> Sessions by Country
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={countryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis dataKey="country" stroke="hsl(215, 15%, 40%)" fontSize={10} fontFamily="JetBrains Mono" angle={-30} textAnchor="end" height={60} />
              <YAxis stroke="hsl(215, 15%, 40%)" fontSize={11} fontFamily="JetBrains Mono" />
              <Tooltip contentStyle={chartStyle} />
              <Bar dataKey="count" fill="hsl(180, 100%, 50%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="cyber-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-cyber-purple" /> Threat Score Distribution
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={threatDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis dataKey="range" stroke="hsl(215, 15%, 40%)" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="hsl(215, 15%, 40%)" fontSize={11} fontFamily="JetBrains Mono" />
              <Tooltip contentStyle={chartStyle} />
              <Bar dataKey="count" fill="hsl(270, 76%, 53%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="cyber-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-sm font-semibold text-foreground mb-4">ML Anomaly Detection Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(220, 15%, 18%)" />
              <PolarAngleAxis dataKey="metric" stroke="hsl(215, 15%, 50%)" fontSize={11} fontFamily="JetBrains Mono" />
              <Radar dataKey="value" stroke="hsl(180, 100%, 50%)" fill="hsl(180, 100%, 50%)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="cyber-card p-5" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-sm font-semibold text-foreground mb-4">Traffic Trend Analysis</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={MOCK_TRAFFIC_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis dataKey="time" stroke="hsl(215, 15%, 40%)" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="hsl(215, 15%, 40%)" fontSize={11} fontFamily="JetBrains Mono" />
              <Tooltip contentStyle={chartStyle} />
              <Line type="monotone" dataKey="normal" stroke="hsl(180, 100%, 50%)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="suspicious" stroke="hsl(270, 76%, 53%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
