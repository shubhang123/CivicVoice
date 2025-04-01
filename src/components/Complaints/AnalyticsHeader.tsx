


import React from "react";
import { Separator } from "@/components/ui/separator";
import Navbar from "../adminNav";

interface AnalyticsHeaderProps {
  totalComplaints: number;
}

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ totalComplaints }) => {
  return (
    <>
    <Navbar/>
    <div className="pt-7 space-y-6 animate-fade-in">
      {/* Heading Section */}
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
          Citizen Feedback Dashboard
        </span>
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-2">
          Complaints Analytics
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-3 leading-relaxed">
          Gain real-time insights into citizen feedback to enhance public services. 
          Analyze complaints across departments, locations, and severity levels 
          with interactive visualizations.
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center items-center space-x-8">
        {/* Total Complaints */}
        <div className="flex flex-col items-center justify-center w-52 h-36 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-md transform hover:scale-105 transition-all duration-300">
          <span className="text-5xl font-extrabold text-gray-900 dark:text-white">{totalComplaints}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Total Complaints</span>
        </div>

    
        
      </div>
    </div>
    </>
  );
};

export default AnalyticsHeader;
