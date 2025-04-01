// import React from 'react';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
// import { Share2 } from 'lucide-react';

// interface PlatformChartProps {
//   data: {
//     name: string;
//     value: number;
//   }[];
// }

// // Custom colors for different platforms
// const PLATFORM_COLORS: Record<string, string> = {
//   'Reddit': '#FF4500',
//   'Twitter': '#1DA1F2',
//   'Facebook': '#1877F2',
//   'Instagram': '#C13584',
//   'Manual': '#4DE8C2',
//   'default': '#8A8A8F'
// };

// const CustomTooltip = ({ active, payload }: any) => {
//   if (active && payload && payload.length) {
//     const data = payload[0].payload;
//     return (
//       <div className="bg-white p-3 rounded-lg shadow-md border text-sm">
//         <p className="font-medium">{data.name}</p>
//         <p><span className="font-medium">{data.value}</span> complaints</p>
//         <p><span className="font-medium">{data.percent}%</span> of total</p>
//       </div>
//     );
//   }
//   return null;
// };

// const PlatformChart: React.FC<PlatformChartProps> = ({ data }) => {
//   // Calculate percentages
//   const total = data.reduce((sum, item) => sum + item.value, 0);
//   const dataWithPercent = data.map(item => ({
//     ...item,
//     percent: total > 0 ? Math.round((item.value / total) * 100) : 0
//   }));

//   return (
//     <div className="chart-container flex flex-col" style={{ '--delay': 5 } as React.CSSProperties}>
//       <div className="mb-2 flex items-center gap-2">
//         <Share2 className="h-5 w-5 text-chart-teal" />
//         <h3 className="chart-title">Source Platforms</h3>
//       </div>
      
//       <div className="flex-1 relative min-h-[200px]">
//         {total > 0 ? (
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={dataWithPercent}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 dataKey="value"
//                 animationBegin={300}
//                 animationDuration={1000}
//                 animationEasing="ease-out"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name} ${percent}%`}
//               >
//                 {dataWithPercent.map((entry) => (
//                   <Cell 
//                     key={`cell-${entry.name}`} 
//                     fill={PLATFORM_COLORS[entry.name] || PLATFORM_COLORS.default}
//                     className="hover:opacity-90 transition-opacity"
//                   />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <p className="text-muted-foreground text-sm">No platform data available</p>
//           </div>
//         )}
//       </div>
      
//       <div className="grid grid-cols-2 gap-2 mt-4">
//         {dataWithPercent.map((item) => (
//           <div key={item.name} className="flex items-center gap-2">
//             <div 
//               className="w-3 h-3 rounded-full" 
//               style={{ backgroundColor: PLATFORM_COLORS[item.name] || PLATFORM_COLORS.default }}
//             />
//             <span className="text-xs font-medium">{item.name}</span>
//             <span className="text-xs text-muted-foreground ml-auto">{item.value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlatformChart;


import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Share2 } from 'lucide-react';

interface PlatformChartProps {
  data: {
    name: string;
    value: number;
  }[];
}

// Custom colors for different platforms
const PLATFORM_COLORS: Record<string, string> = {
  'Reddit': '#FF4500',
  'Twitter': '#1DA1F2',
  'Facebook': '#1877F2',
  'Instagram': '#C13584',
  'Manual': '#4DE8C2',
  'default': '#8A8A8F'
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border text-sm">
        <p className="font-medium">{data.name}</p>
        <p><span className="font-medium">{data.value}</span> complaints</p>
        <p><span className="font-medium">{data.percent}%</span> of total</p>
      </div>
    );
  }
  return null;
};

const PlatformChart: React.FC<PlatformChartProps> = ({ data }) => {
  // Calculate percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const dataWithPercent = data.map(item => ({
    ...item,
    percent: total > 0 ? Math.round((item.value / total) * 100) : 0
  }));

  return (
    <div className="bg-white border-gray-400 transition-all rounded-xl shadow-md animate-fade-in w-[600px] h-[500px] relative mx-auto flex flex-col justify-center p-4">
      {/* Title */}
      <div className="mb-2 flex justify-center pt-4 items-center gap-2">
        <Share2 className="h-5 w-5 text-chart-teal" />
        <h3 className="text-lg font-semibold">Source Platforms</h3>
      </div>
      
      {/* Pie Chart Container */}
      <div className="flex-1 relative h-[350px] w-full">
        {total > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={dataWithPercent}
                cx="50%"
                cy="50%"
                outerRadius={130}  // Increased size
                dataKey="value"
                animationBegin={300}
                animationDuration={1000}
                animationEasing="ease-out"
                labelLine={false}
                label={({ name, percent }) => (
                  <text fill="black" fontSize={12} textAnchor="middle">
                    {`${name} ${percent}%`}
                  </text>
                )}
              >
                {dataWithPercent.map((entry) => (
                  <Cell 
                    key={`cell-${entry.name}`} 
                    fill={PLATFORM_COLORS[entry.name] || PLATFORM_COLORS.default}
                    className="hover:opacity-90 transition-opacity"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No platform data available</p>
          </div>
        )}
      </div>
      
      {/* Elegant Legend */}
      <div className="grid grid-cols-3 gap-3 mt-4 bg-slate-100 py-2 px-4 rounded-md">
        {dataWithPercent.map((item) => (
          <div key={item.name} className="flex items-center gap-2 p-1">
            <div 
              className="w-4 h-4 rounded-full" 
              style={{ backgroundColor: PLATFORM_COLORS[item.name] || PLATFORM_COLORS.default }}
            />
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-gray-500 ml-auto">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformChart;
