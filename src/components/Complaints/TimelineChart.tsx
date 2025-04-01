import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TimelineChartProps {
  data: { date: string; count: number }[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Complaints Timeline</CardTitle>
        <CardDescription>
          Trend of complaint submissions over time
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip
                formatter={(value: number) => [`${value} complaints`, 'Total']}
                contentStyle={{ 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }}
                labelStyle={{ marginBottom: '4px', fontWeight: 500 }}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineChart;