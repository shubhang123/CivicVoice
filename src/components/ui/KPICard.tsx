
import React from "react";
import { 
  ClipboardList, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  TrendingDown, 
  Minus
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { KPI, TrendDirection } from "@/lib/types";

const iconMap = {
  "clipboard-list": ClipboardList,
  "clock": Clock,
  "check-circle": CheckCircle,
  "alert-circle": AlertCircle
};

const trendIconMap: Record<TrendDirection, React.FC<any>> = {
  "up": TrendingUp,
  "down": TrendingDown,
  "neutral": Minus
};

interface KPICardProps {
  kpi: KPI;
  className?: string;
}

export function KPICard({ kpi, className }: KPICardProps) {
  const Icon = iconMap[kpi.icon as keyof typeof iconMap] || ClipboardList;
  const TrendIcon = trendIconMap[kpi.trend.direction];
  
  const trendClass = {
    "up": "trend-up",
    "down": "trend-down",
    "neutral": "trend-neutral"
  }[kpi.trend.direction];
  
  return (
    <Card className={cn("kpi-card overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="rounded-full p-2 bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className={trendClass}>
            <TrendIcon className="h-3 w-3 mr-1" />
            <span>{kpi.trend.value}</span>
          </div>
        </div>
        <h3 className="mt-4 text-3xl font-bold">{kpi.value}</h3>
        <p className="text-sm text-muted-foreground mt-1">{kpi.label}</p>
      </CardContent>
    </Card>
  );
}
