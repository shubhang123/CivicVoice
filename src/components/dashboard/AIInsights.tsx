import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  Scatter,
  ScatterChart,
  Rectangle,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Treemap
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Simulated data for sentiment analysis
const generateSentimentData = () => {
  return Array.from({ length: 7 }).map((_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    positive: Math.floor(Math.random() * 50) + 30,
    neutral: Math.floor(Math.random() * 40) + 20,
    negative: Math.floor(Math.random() * 30) + 10,
  }));
};

// Simulated data for predictive forecasting
const generateForecastData = () => {
  const base = 1000;
  const trend = 10;
  
  return Array.from({ length: 14 }).map((_, i) => {
    const actual = i < 7 ? base + (i * trend) + (Math.random() * 100 - 50) : null;
    const predicted = i >= 4 ? base + (i * trend) + (Math.random() * 80 - 40) : null;
    const upper = predicted ? predicted + (predicted * 0.1) : null;
    const lower = predicted ? predicted - (predicted * 0.1) : null;
    
    return {
      day: i,
      actual,
      predicted,
      upper,
      lower,
    };
  });
};

// Simulated data for complaint categories
const generateCategoryData = () => {
  const categories = [
    { name: "Water Supply", size: 2500 + Math.random() * 1000, color: "#0ea5e9" },
    { name: "Roads & Traffic", size: 2000 + Math.random() * 1000, color: "#f59e0b" },
    { name: "Sanitation", size: 1800 + Math.random() * 1000, color: "#10b981" },
    { name: "Electricity", size: 1500 + Math.random() * 1000, color: "#8b5cf6" },
    { name: "Public Safety", size: 1200 + Math.random() * 1000, color: "#ef4444" },
    { name: "Education", size: 1000 + Math.random() * 1000, color: "#ec4899" },
    { name: "Public Transport", size: 800 + Math.random() * 1000, color: "#f97316" },
    { name: "Healthcare", size: 700 + Math.random() * 1000, color: "#06b6d4" },
    { name: "Waste Management", size: 600 + Math.random() * 1000, color: "#84cc16" },
    { name: "Housing", size: 500 + Math.random() * 1000, color: "#7c3aed" },
  ];
  
  return categories;
};

// Simulated data for location heatmap
const generateLocationData = () => {
  const locations = [
    { name: "Downtown", value: Math.floor(Math.random() * 500) + 300 },
    { name: "North District", value: Math.floor(Math.random() * 500) + 200 },
    { name: "South District", value: Math.floor(Math.random() * 500) + 250 },
    { name: "East District", value: Math.floor(Math.random() * 500) + 150 },
    { name: "West District", value: Math.floor(Math.random() * 500) + 170 },
    { name: "Central Area", value: Math.floor(Math.random() * 500) + 400 },
    { name: "Industrial Zone", value: Math.floor(Math.random() * 500) + 100 },
    { name: "Suburban Area", value: Math.floor(Math.random() * 500) + 220 },
    { name: "Riverside", value: Math.floor(Math.random() * 500) + 180 },
  ];
  
  return locations;
};

const chartConfig = {
  positive: {
    label: "Positive",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  neutral: {
    label: "Neutral",
    theme: {
      light: "#6b7280",
      dark: "#9ca3af",
    },
  },
  negative: {
    label: "Negative",
    theme: {
      light: "#ef4444",
      dark: "#f87171",
    },
  },
  actual: {
    label: "Actual",
    theme: {
      light: "#3b82f6",
      dark: "#60a5fa",
    },
  },
  predicted: {
    label: "Predicted",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa",
    },
  },
  location: {
    label: "Complaint Volume",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
  },
};

const AIInsights = () => {
  const [activeTab, setActiveTab] = useState("sentiment");
  const [sentimentData, setSentimentData] = useState(generateSentimentData());
  const [forecastData, setForecastData] = useState(generateForecastData());
  const [categoryData, setCategoryData] = useState(generateCategoryData());
  const [locationData, setLocationData] = useState(generateLocationData());
  const { toast } = useToast();
  
  // Simulate data updates with animations
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate data to simulate updates
      setSentimentData(prev => {
        const newData = [...prev];
        const first = newData.shift();
        if (first) newData.push({
          ...first,
          positive: Math.floor(Math.random() * 50) + 30,
          neutral: Math.floor(Math.random() * 40) + 20,
          negative: Math.floor(Math.random() * 30) + 10,
        });
        return newData;
      });
      
      // Update forecast with slight variations
      setForecastData(generateForecastData());
      
      // Update category data
      setCategoryData(generateCategoryData());
      
      // Update location data
      setLocationData(generateLocationData());
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle anomaly detection
  const detectHotspots = () => {
    const hotspots = locationData.filter(location => location.value > 400);
    if (hotspots.length > 0) {
      toast({
        title: "Complaint Hotspots Detected",
        description: `${hotspots.length} areas have unusually high complaint volumes and require immediate attention.`,
        variant: "destructive",
      });
    } else {
      toast({
        title: "No Complaint Hotspots",
        description: "All areas are showing normal complaint volumes.",
      });
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>AI-Powered Insights</CardTitle>
        <CardDescription>Advanced analytics to improve citizen service delivery</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="forecast">Forecast</TabsTrigger>
            <TabsTrigger value="category">Categories</TabsTrigger>
            <TabsTrigger value="location">Locations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sentiment" className="h-[400px]">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sentimentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="positive" name="positive" stackId="a" fill="var(--color-positive)" />
                  <Bar dataKey="neutral" name="neutral" stackId="a" fill="var(--color-neutral)" />
                  <Bar dataKey="negative" name="negative" stackId="a" fill="var(--color-negative)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="text-sm text-muted-foreground mt-4">
              Citizen sentiment analysis based on complaint descriptions and follow-up surveys
            </div>
          </TabsContent>
          
          <TabsContent value="forecast" className="h-[400px]">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={forecastData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="day" 
                    tickFormatter={value => `Day ${value + 1}`}
                  />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="actual"
                    stroke="var(--color-actual)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    name="predicted"
                    stroke="var(--color-predicted)"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="upper"
                    stroke="transparent"
                    fill="var(--color-predicted)"
                    fillOpacity={0.1}
                  />
                  <Line
                    type="monotone"
                    dataKey="lower"
                    stroke="transparent"
                    fill="var(--color-predicted)"
                    fillOpacity={0.1}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => {
                  setForecastData(generateForecastData());
                  toast({
                    title: "Forecast Updated",
                    description: "Predictive model has been updated with the latest complaint data",
                  });
                }}
              >
                <TrendingUp className="h-4 w-4" />
                Update Forecast
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="category" className="h-[400px]">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={categoryData}
                  dataKey="size"
                  // Removed the ratio property that was causing the error
                  stroke="#fff"
                  fill="#8884d8"
                  content={<CustomizedContent />}
                >
                  <Tooltip 
                    formatter={(value) => [`${value} complaints`, 'Volume']}
                  />
                </Treemap>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="text-sm text-muted-foreground mt-4">
              Distribution of complaints by service category, sized by volume
            </div>
          </TabsContent>
          
          <TabsContent value="location" className="h-[400px]">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={locationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar 
                    dataKey="value" 
                    name="location"
                    fill="var(--color-location)"
                    background={{ fill: '#eee' }}
                  >
                    {locationData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.value > 400 ? "#ef4444" : entry.value > 300 ? "#f59e0b" : "#10b981"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={detectHotspots}
              >
                <MapPin className="h-4 w-4" />
                Identify Hotspots
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Custom Treemap component for category visualization
const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, name, color, value } = props;

  return (
    <g>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: color,
          stroke: '#fff',
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {width > 50 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={Math.min(width / 10, 14)}
          fontWeight="bold"
        >
          {name}
        </text>
      )}
    </g>
  );
};

export default AIInsights;