import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TrendIndicatorProps {
  value: number;
  isIncrease: boolean;
  className?: string;
}

export const TrendIndicator: React.FC<TrendIndicatorProps> = ({ 
  value, 
  isIncrease,
  className 
}) => {
  return (
    <div className={`flex items-center gap-1 ml-2 text-sm font-medium ${className}`}>
      {isIncrease ? (
        <>
          <TrendingUp className="h-3 w-3 text-severity-high" />
          <span className="text-severity-high">+{value}%</span>
        </>
      ) : (
        <>
          <TrendingDown className="h-3 w-3 text-severity-low" />
          <span className="text-severity-low">-{value}%</span>
        </>
      )}
    </div>
  );
};
