import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  variant?: "cyan" | "purple" | "danger" | "success" | "warning";
}

const variantStyles = {
  cyan: "border-primary/20 hover:border-primary/40 hover:glow-cyan",
  purple: "border-cyber-purple/20 hover:border-cyber-purple/40 hover:glow-purple",
  danger: "border-destructive/20 hover:border-destructive/40 hover:glow-red",
  success: "border-cyber-success/20 hover:border-cyber-success/40",
  warning: "border-cyber-warning/20 hover:border-cyber-warning/40",
};

const iconVariant = {
  cyan: "text-primary bg-primary/10",
  purple: "text-cyber-purple bg-cyber-purple/10",
  danger: "text-destructive bg-destructive/10",
  success: "text-cyber-success bg-cyber-success/10",
  warning: "text-cyber-warning bg-cyber-warning/10",
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, variant = "cyan" }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ y: -2 }}
    className={cn("cyber-card p-5 transition-all duration-300", variantStyles[variant])}
  >
    <div className="flex items-start justify-between mb-3">
      <div className={cn("p-2.5 rounded-lg", iconVariant[variant])}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && (
        <span className={cn("text-xs font-mono font-semibold", trend.positive ? "text-cyber-success" : "text-destructive")}>
          {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-foreground font-mono">{value}</p>
    <p className="text-xs text-muted-foreground mt-1">{title}</p>
    {subtitle && <p className="text-[10px] text-muted-foreground/60 mt-0.5">{subtitle}</p>}
  </motion.div>
);

export default StatCard;
