// import React from 'react';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// interface DepartmentChartProps {
//   data: { name: string; value: number }[];
// }

// const DepartmentChart: React.FC<DepartmentChartProps> = ({ data }) => {
//   return (
//     <Card className="overflow-hidden hover:shadow-md transition-all animate-fade-in">
//       <CardHeader className="pb-2">
//         <CardTitle className="text-lg font-medium">Department Distribution</CardTitle>
//         <CardDescription>
//           Complaints received by department
//         </CardDescription>
//       </CardHeader>
//       <CardContent className="pt-0">
//         <div className="h-[240px] w-full">
//           <ResponsiveContainer width="100%" height="100%">
//             <BarChart
//               data={data}
//               layout="vertical"
//               margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//             >
//               <XAxis type="number" />
//               <YAxis 
//                 type="category" 
//                 dataKey="name" 
//                 width={150}
//                 tick={{ fontSize: 12 }}
//               />
//               <Tooltip
//                 formatter={(value: number) => [`${value} complaints`, 'Total']}
//                 contentStyle={{ 
//                   borderRadius: '8px',
//                   border: 'none',
//                   boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//                   padding: '8px 12px',
//                 }}
//               />
//               <Bar 
//                 dataKey="value" 
//                 fill="hsl(var(--primary))" 
//                 radius={[0, 4, 4, 0]}
//                 barSize={30}
//                 animationDuration={1500}
//                 className="hover:opacity-80 transition-opacity"
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default DepartmentChart;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DepartmentChartProps {
  data: { name: string; value: number }[];
}

const DepartmentChart: React.FC<DepartmentChartProps> = ({ data }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all animate-fade-in w-[600px] h-[500px] relative mx-auto flex flex-col justify-center p-4">
      {/* Fix header position */}
      <CardHeader className="relative text-center pb-4">
        <CardTitle className="text-lg font-semibold">Department Distribution</CardTitle>
        <CardDescription>Complaints received by department</CardDescription>
      </CardHeader>

      {/* Increased height for better visibility */}
      <CardContent className="pt-0 flex-1">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={150}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                formatter={(value: number) => [`${value} complaints`, 'Total']}
                contentStyle={{ 
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  padding: '8px 12px',
                }}
              />
              {/* Fix bar color and ensure visibility */}
              <Bar 
                dataKey="value" 
                fill="#4F46E5" 
                radius={[0, 4, 4, 0]}
                barSize={40}
                animationDuration={1500}
                className="hover:opacity-80 transition-opacity"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentChart;