import React from 'react';
import HeatmapComponent from '@/components/HeatmapComponent';
import { Activity, FileText, AlertTriangle } from 'lucide-react';
import { Chip } from './chip';
import { TrendIndicator } from './TrendIndicator';
import Navbar from '../adminNav';

interface AnalyticsHeaderProps {
  totalComplaints: number;
  trendData?: {
    percentChange: number;
    isIncrease: boolean;
  };
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ 
  totalComplaints,
  trendData = { percentChange: 0, isIncrease: false }
}) => {
  return (
    <>
    <Navbar/>
    <div className=" mt-8 pt-8 space-y-2 animate-fade-in flex  flex-col justify-center items-center">
      <div className="flex items-center space-x-2">
        <Chip>Analytics Dashboard</Chip>
        <span className="text-sm text-muted-foreground">Real-time citizen feedback analysis</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Complaints Analytics</h1>
      
      <p className="text-muted-foreground max-w-3xl">
        Interactive visualization of citizen complaints across departments, 
        locations, and platforms to help identify patterns and prioritize responses.
      </p>
      
      <div className="grid grid-cols-1  gap-4 pt-6">
        <div className="glass-card p-4 flex  justify-center items-center gap-3">
          <div className="rounded-full bg-primary/10 p-3">
            <FileText className="h-5 w-3 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Complaints</p>
            <div className="flex items-center">
              <h3 className="text-2xl font-bold">{totalComplaints}</h3>
              {trendData.percentChange > 0 && (
                <TrendIndicator 
                  value={trendData.percentChange} 
                  isIncrease={trendData.isIncrease} 
                />
              )}
            </div>
          </div>
        </div>
        
        {/* <div className="glass-card p-4 flex  justify-center items-center gap-3">
          <div className="rounded-full bg-chart-blue/10 p-3">
            <Activity className="h-5 w-5 text-chart-blue" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">API Calls</p>
            <h3 className="text-2xl font-bold">{Math.round(totalComplaints * 2.5)}</h3>
          </div>
        </div> */}
        
        {/* <div className="glass-card p-4 flex items-center gap-3">
          <div className="rounded-full bg-severity-high/10 p-3">
            <AlertTriangle className="h-5 w-5 text-severity-high" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Action Required</p>
            <h3 className="text-2xl font-bold">{Math.round(totalComplaints * 0.4)}</h3>
          </div>
        </div> */}
      </div>
     
      
      
    </div>
    </>
  );
};

export default AnalyticsHeader;