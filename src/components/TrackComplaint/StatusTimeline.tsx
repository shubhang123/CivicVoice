import React from "react";
import { CheckCircle, Circle, Clock, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export type Status = 
  | "submitted" 
  | "under_review" 
  | "investigating" 
  | "resolving" 
  | "resolved" 
  | "closed";

interface StatusStep {
  status: Status;
  label: string;
  date: string;
  description: string;
  completed: boolean;
  current: boolean;
}

interface StatusTimelineProps {
  currentStatus: Status;
  progressPercentage: number;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ 
  currentStatus,
  progressPercentage
}) => {
  const statusSteps: StatusStep[] = [
    {
      status: "submitted",
      label: "Submitted",
      date: "May 12, 2023",
      description: "Complaint received and logged in the system",
      completed: ["submitted", "under_review", "investigating", "resolving", "resolved", "closed"].includes(currentStatus),
      current: currentStatus === "submitted"
    },
    {
      status: "under_review",
      label: "Under Review",
      date: "May 14, 2023",
      description: "Complaint is being reviewed by relevant department",
      completed: ["under_review", "investigating", "resolving", "resolved", "closed"].includes(currentStatus),
      current: currentStatus === "under_review"
    },
    {
      status: "investigating",
      label: "Investigation",
      date: "May 16, 2023",
      description: "Investigation in progress to address the complaint",
      completed: ["investigating", "resolving", "resolved", "closed"].includes(currentStatus),
      current: currentStatus === "investigating"
    },
    {
      status: "resolving",
      label: "Resolving",
      date: "May 20, 2023",
      description: "Implementing solution for the reported issue",
      completed: ["resolving", "resolved", "closed"].includes(currentStatus),
      current: currentStatus === "resolving"
    },
    {
      status: "resolved",
      label: "Resolved",
      date: "May 25, 2023",
      description: "Complaint has been resolved",
      completed: ["resolved", "closed"].includes(currentStatus),
      current: currentStatus === "resolved"
    },
    {
      status: "closed",
      label: "Closed",
      date: "June 1, 2023",
      description: "Case closed, all actions completed",
      completed: ["closed"].includes(currentStatus),
      current: currentStatus === "closed"
    }
  ];

  const getStatusIcon = (step: StatusStep) => {
    if (step.completed && !step.current) {
      return <CheckCircle className="h-7 w-7 text-green-500" />;
    } else if (step.current) {
      return <Circle className="h-7 w-7 text-blue-500 animate-pulse" />;
    } else {
      return <Circle className="h-7 w-7 text-gray-300" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Complaint Status</h2>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4" />
            <span>Est. completion: June 15, 2023</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Overall Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="space-y-6">
        {statusSteps.map((step, index) => (
          <div key={step.status} className="relative">
            {index !== statusSteps.length - 1 && (
              <div 
                className={cn(
                  "absolute left-3.5 top-7 w-0.5 h-16 bg-gray-200",
                  step.completed ? "bg-green-200" : "bg-gray-200"
                )}
              />
            )}
            <div className="flex gap-4">
              <div className={cn(
                "z-10",
                step.current && "animate-pulse"
              )}>
                {getStatusIcon(step)}
              </div>
              <div className={cn(
                "flex-1",
                step.current && "bg-blue-50 p-3 rounded-lg -m-3 animate-fade-in"
              )}>
                <div className="flex justify-between">
                  <h3 className={cn(
                    "font-medium",
                    step.current && "text-blue-600"
                  )}>
                    {step.label}
                  </h3>
                  <span className="text-muted-foreground text-sm">{step.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                
                {step.current && step.status === "investigating" && (
                  <div className="mt-3 p-2 border border-yellow-200 bg-yellow-50 rounded text-sm flex items-start gap-2 animate-fade-in">
                    <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                    <p className="text-yellow-700">Additional information requested. Please check your communications tab.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusTimeline;