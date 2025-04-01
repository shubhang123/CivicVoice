import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown, FileText, CheckCircle, Clock, BarChart2 } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

// Simulated data
const generateData = (period: "day" | "week" | "month") => {
  const points = period === "day" ? 24 : period === "week" ? 7 : 30;
  const multiplier = period === "day" ? 10 : period === "week" ? 50 : 150;
  
  return Array.from({ length: points }).map((_, i) => ({
    name: String(i),
    value: 500 + Math.random() * multiplier + (i * multiplier / points),
    previousValue: 450 + Math.random() * multiplier + (i * multiplier / points),
  }));
};

const chartConfig = {
  current: {
    label: "Current",
    theme: {
      light: "#0284c7",
      dark: "#0ea5e9",
    },
  },
  previous: {
    label: "Previous",
    theme: {
      light: "#94a3b8",
      dark: "#64748b",
    },
  },
};

const MetricsOverview = () => {
  const [period, setPeriod] = useState<"day" | "week" | "month">("week");
  const [chartData, setChartData] = useState(generateData(period));
  const [metrics, setMetrics] = useState({
    complaints: { value: 1258, change: 12.5 },
    resolution: { value: 78.6, change: 3.7 },
    sla: { value: 92.3, change: -1.5 },
    satisfaction: { value: 85.2, change: 4.2 },
  });
  
  // Update data when period changes with animation
  useEffect(() => {
    const newData = generateData(period);
    const timer = setTimeout(() => setChartData(newData), 300);
    
    // Simulate updating the metrics as well
    const randomFactor = Math.random() * 0.3 + 0.85;
    setMetrics(prev => ({
      complaints: { 
        value: Math.round(prev.complaints.value * randomFactor), 
        change: prev.complaints.change + (Math.random() * 4 - 2) 
      },
      resolution: { 
        value: parseFloat((prev.resolution.value * randomFactor).toFixed(1)), 
        change: prev.resolution.change + (Math.random() * 4 - 2)
      },
      sla: { 
        value: parseFloat((prev.sla.value * randomFactor).toFixed(1)), 
        change: prev.sla.change + (Math.random() * 4 - 2)
      },
      satisfaction: { 
        value: parseFloat((prev.satisfaction.value * randomFactor).toFixed(1)), 
        change: prev.satisfaction.change + (Math.random() * 4 - 2)
      },
    }));
    
    return () => clearTimeout(timer);
  }, [period]);

  return (
    <div className="space-y-4 transition-all">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Complaint Metrics</h2>
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={period === "day" ? "default" : "outline"}
            className="rounded-l-md rounded-r-none"
            onClick={() => setPeriod("day")}
          >
            Day
          </Button>
          <Button
            variant={period === "week" ? "default" : "outline"}
            className="rounded-none border-x-0"
            onClick={() => setPeriod("week")}
          >
            Week
          </Button>
          <Button
            variant={period === "month" ? "default" : "outline"}
            className="rounded-r-md rounded-l-none"
            onClick={() => setPeriod("month")}
          >
            Month
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Complaints KPI Card */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              Total Complaints
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.complaints.value.toLocaleString()}</div>
            <div className="mt-1 flex items-center text-xs">
              {metrics.complaints.change >= 0 ? (
                <ArrowUp className="mr-1 h-3 w-3 text-amber-500" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3 text-green-500" />
              )}
              <span className={metrics.complaints.change >= 0 ? "text-amber-500" : "text-green-500"}>
                {Math.abs(metrics.complaints.change).toFixed(1)}%
              </span>
              <span className="ml-1 text-muted-foreground">from previous {period}</span>
            </div>
            <Progress className="mt-3" value={75} />
          </CardContent>
        </Card>

        {/* Resolution Rate KPI Card */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              Resolution Rate
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.resolution.value}%</div>
            <div className="mt-1 flex items-center text-xs">
              {metrics.resolution.change >= 0 ? (
                <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={metrics.resolution.change >= 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(metrics.resolution.change).toFixed(1)}%
              </span>
              <span className="ml-1 text-muted-foreground">from previous {period}</span>
            </div>
            <Progress className="mt-3" value={metrics.resolution.value} />
          </CardContent>
        </Card>

        {/* SLA Compliance KPI Card */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              SLA Compliance
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.sla.value}%</div>
            <div className="mt-1 flex items-center text-xs">
              {metrics.sla.change >= 0 ? (
                <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={metrics.sla.change >= 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(metrics.sla.change).toFixed(1)}%
              </span>
              <span className="ml-1 text-muted-foreground">from previous {period}</span>
            </div>
            <Progress className="mt-3" value={metrics.sla.value} />
          </CardContent>
        </Card>

        {/* Citizen Satisfaction KPI Card */}
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-sm font-medium">
              Citizen Satisfaction
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.satisfaction.value}%</div>
            <div className="mt-1 flex items-center text-xs">
              {metrics.satisfaction.change >= 0 ? (
                <ArrowUp className="mr-1 h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="mr-1 h-3 w-3 text-red-500" />
              )}
              <span className={metrics.satisfaction.change >= 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(metrics.satisfaction.change).toFixed(1)}%
              </span>
              <span className="ml-1 text-muted-foreground">from previous {period}</span>
            </div>
            <Progress className="mt-3" value={metrics.satisfaction.value} />
          </CardContent>
        </Card>
      </div>

      {/* Trend Chart */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Complaint Trends</CardTitle>
          <CardDescription>Visualization of complaint volumes over time</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-current)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-current)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-previous)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-previous)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  tickFormatter={(value) => {
                    if (period === "day") return `${value}h`;
                    if (period === "week") {
                      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
                      return days[parseInt(value) % 7];
                    }
                    return `Day ${value}`;
                  }}
                />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  name="current"
                  stroke="var(--color-current)"
                  fillOpacity={1}
                  fill="url(#colorCurrent)"
                />
                <Area
                  type="monotone"
                  dataKey="previousValue"
                  name="previous"
                  stroke="var(--color-previous)"
                  fillOpacity={1}
                  fill="url(#colorPrevious)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetricsOverview;