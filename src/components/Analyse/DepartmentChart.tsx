import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Building2 } from 'lucide-react';

interface DepartmentChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border text-sm">
        <p className="font-medium mb-1">{payload[0].payload.name}</p>
        <p>{payload[0].value} complaints</p>
      </div>
    );
  }
  return null;
};

const DepartmentChart: React.FC<DepartmentChartProps> = ({ data }) => {
  // Limit to top 5 departments for better visualization
  const topDepartments = data.slice(0, 10).map(item => ({
    ...item,
    // Truncate long department names
    name: item.name.length > 30 ? item.name.substring(0, 27) + '...' : item.name
  }));

  const hasData = topDepartments.length > 0;
  const colorVariations = [
    '#0F9EFF', '#4CD964', '#FF7EB6', '#FFCF54', '#8A7FFF'
  ];

  return (
    <div className="chart-container flex flex-col" style={{ '--delay': 2 } as React.CSSProperties}>
      <div className="mb-2 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-chart-blue" />
        <h3 className="chart-title">Top Departments</h3>
      </div>
      
      <div className="flex-1 min-h-[210px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={topDepartments}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis 
                type="number" 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={150}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11 }}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f5f5' }} />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]} 
                animationBegin={200}
                animationDuration={1200}
              >
                {topDepartments.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colorVariations[index % colorVariations.length]} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">No department data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DepartmentChart;
