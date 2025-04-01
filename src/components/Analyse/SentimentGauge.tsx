import React, { useEffect, useState } from 'react';
import { Smile, Frown, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

interface SentimentGaugeProps {
  data: {
    average: number;
    distribution: {
      range: string;
      count: number;
    }[];
  };
}

const SentimentGauge: React.FC<SentimentGaugeProps> = ({ data }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    // Animate the gauge value
    const start = 0;
    const end = data.average;
    const duration = 1500;
    const startTime = Date.now();
    
    const animateValue = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        const value = start + (end - start) * (elapsed / duration);
        setAnimatedValue(value);
        requestAnimationFrame(animateValue);
      } else {
        setAnimatedValue(end);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [data.average]);
  
  // Get color based on score
  const getColor = (score: number) => {
    if (score < 0.33) return '#5AC8FF'; // Low severity (positive sentiment)
    if (score < 0.66) return '#FFC75A'; // Moderate severity
    return '#FF5A5A'; // High severity (negative sentiment)
  };
  
  // Format score for display
  const formatScore = (score: number) => {
    return score.toFixed(2);
  };
  
  // Get label based on score
  const getLabel = (score: number) => {
    if (score < 0.33) return 'Low Concern';
    if (score < 0.66) return 'Moderate Concern';
    return 'High Concern';
  };

  // Gauge indicator position
  const indicatorPosition = `calc(${animatedValue * 100}%)`;
  
  return (
    <div className="chart-container flex flex-col" style={{ '--delay': 6 } as React.CSSProperties}>
      <div className="mb-2 flex items-center gap-2">
        <PieChart className="h-5 w-5 text-chart-yellow" />
        <h3 className="chart-title">Complaint Severity Score</h3>
      </div>
      
      <div className="flex-1 flex flex-col gap-4">
        {/* Gauge */}
        <div className="relative h-[60px] px-3">
          {/* Score label */}
          <div className="absolute top-0 left-0 right-0 text-center">
            <span className="text-lg font-bold" style={{ color: getColor(animatedValue) }}>
              {formatScore(animatedValue)}
            </span>
            <span className="text-xs ml-1 text-muted-foreground">
              ({getLabel(animatedValue)})
            </span>
          </div>
          
          {/* Gauge track */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-severity-low via-severity-moderate to-severity-high"></div>
            </div>
          </div>
          
          {/* Gauge indicator */}
          <div 
            className="absolute bottom-0 w-4 h-4 rounded-full shadow-sm transform -translate-x-1/2 transition-all duration-300"
            style={{ 
              left: indicatorPosition,
              backgroundColor: getColor(animatedValue) 
            }}
          >
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="animate-float" style={{ animationDelay: '0.2s' }}>
                {animatedValue < 0.5 ? (
                  <Smile className="h-5 w-5 text-chart-green" />
                ) : (
                  <Frown className="h-5 w-5 text-severity-high" />
                )}
              </div>
            </div>
          </div>
          
          {/* Scale markers */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-between px-1 text-xs text-muted-foreground">
            <span>0.0</span>
            <span>0.5</span>
            <span>1.0</span>
          </div>
        </div>
        
        {/* Distribution chart */}
        <div className="h-[100px] mt-4">
          <p className="text-xs text-muted-foreground mb-2">Score Distribution</p>
          {data.distribution.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.distribution}>
                <XAxis 
                  dataKey="range" 
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Bar 
                  dataKey="count" 
                  animationBegin={500}
                  animationDuration={1000}
                  radius={[4, 4, 0, 0]}
                >
                  {data.distribution.map((entry, index) => {
                    const [min] = entry.range.split('-').map(parseFloat);
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={getColor(min + 0.1)} 
                      />
                    );
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground text-xs">No distribution data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SentimentGauge;
