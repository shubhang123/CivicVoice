// import React from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// interface SeverityChartProps {
//   data: { name: string; value: number }[];
// }

// const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.6; // Increased label radius
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text 
//       x={x} 
//       y={y} 
//       fill="white" 
//       textAnchor={x > cx ? 'start' : 'end'} 
//       dominantBaseline="central"
//       className="text-sm font-semibold"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const SeverityChart: React.FC<SeverityChartProps> = ({ data }) => {
//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-all animate-fade-in w-full h-[400px]">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-lg font-semibold">Severity Distribution</CardTitle>
//         <CardDescription>
//           Breakdown of complaints by severity level
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pt-0 w-full h-full">
//         <div className="h-[350px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={renderCustomizedLabel}
//                 outerRadius={130} // Increased outer radius for better visibility
//                 fill="#8884d8"
//                 dataKey="value"
//                 className="focus:outline-none"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 formatter={(value: number) => [`${value} complaints`, 'Count']}
//                 contentStyle={{ 
//                   borderRadius: '8px',
//                   border: 'none',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                   padding: '10px 14px',
//                 }}
//               />
//               <Legend 
//                 layout="horizontal" 
//                 verticalAlign="bottom" 
//                 align="center"
//                 iconType="circle"
//                 iconSize={10}
//                 formatter={(value) => (
//                   <span className="text-sm uppercase tracking-wide">{value}</span>
//                 )}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default SeverityChart;

// import React from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// interface SeverityChartProps {
//   data: { name: string; value: number }[];
// }

// const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

// const RADIAN = Math.PI / 180;
// const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.6; // Increased label radius
//   const x = cx + radius * Math.cos(-midAngle * RADIAN);
//   const y = cy + radius * Math.sin(-midAngle * RADIAN);

//   return (
//     <text 
//       x={x} 
//       y={y} 
//       fill="white" 
//       textAnchor={x > cx ? 'start' : 'end'} 
//       dominantBaseline="central"
//       className="text-sm font-semibold"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   );
// };

// const SeverityChart: React.FC<SeverityChartProps> = ({ data }) => {
//   return (
//     <Card className="overflow-hidden hover:shadow-lg transition-all animate-fade-in w-full h-[400px] ">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-lg font-semibold">Severity Distribution</CardTitle>
//         <CardDescription>
//           Breakdown of complaints by severity level
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pt-0 w-full h-full">
//         <div className="h-[350px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={data}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={renderCustomizedLabel}
//                 outerRadius={130} // Increased outer radius for better visibility
//                 fill="#8884d8"
//                 dataKey="value"
//                 className="focus:outline-none"
//               >
//                 {data.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 formatter={(value: number) => [`${value} complaints`, 'Count']}
//                 contentStyle={{ 
//                   borderRadius: '8px',
//                   border: 'none',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                   padding: '10px 14px',
//                 }}
//               />
//               <Legend 
//                 layout="horizontal" 
//                 verticalAlign="bottom" 
//                 align="center"
//                 iconType="circle"
//                 iconSize={10}
//                 formatter={(value) => (
//                   <span className="text-sm uppercase tracking-wide">{value}</span>
//                 )}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default SeverityChart;



import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SeverityChartProps {
  data: { name: string; value: number }[];
}

// Explicit color mapping for severity levels
const SEVERITY_COLORS: { [key: string]: string } = {
  High: '#ef4444', // Red
  Neutral: '#facc15', // Proper Yellow
  Low: '#10b981', // Green
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text 
      x={x} 
      y={y} 
      fill="black" 
      stroke="white"
      strokeWidth={0.01}
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-sm font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SeverityChart: React.FC<SeverityChartProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all animate-fade-in w-[600px] h-[500px] relative mx-auto flex justify-center align-middle text-wrap p-4">

      {/* Header in the top-left corner */}
      <CardHeader className="absolute text-center pb-2">
        <CardTitle className="text-lg font-semibold">Severity Distribution</CardTitle>
        <CardDescription>Breakdown of complaints by severity level</CardDescription>
      </CardHeader>

      {/* Pie chart centered */}
      <CardContent className="flex flex-1 items-center justify-center pt-[90px]">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={130}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={SEVERITY_COLORS[entry.name] || 'yellow'}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} complaints`, name]}
                contentStyle={{ 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '10px 14px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeverityChart;

