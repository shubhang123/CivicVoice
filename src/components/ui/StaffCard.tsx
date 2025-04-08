
import React from "react";
import { 
  CheckCircle2, 
  Clock, 
  Star 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Staff, StaffStatus } from "@/lib/types";

interface StaffCardProps {
  staff: Staff;
  className?: string;
  compact?: boolean;
}

export function StaffCard({ staff, className, compact = false }: StaffCardProps) {
  const statusClass: Record<StaffStatus, string> = {
    "online": "status-online",
    "busy": "status-busy",
    "offline": "status-offline"
  };
  
  const statusLabel: Record<StaffStatus, string> = {
    "online": "Online",
    "busy": "Busy",
    "offline": "Offline"
  };
  
  const getWorkloadClass = (workload: number) => {
    if (workload >= 80) return "workload-high";
    if (workload >= 50) return "workload-medium";
    return "workload-low";
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };
  
  if (compact) {
    return (
      <Card className={cn("hover:border-primary/20 transition-all", className)}>
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={staff.avatar} alt={staff.name} />
              <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium truncate">{staff.name}</p>
                <span className={statusClass[staff.status]}>{statusLabel[staff.status]}</span>
              </div>
              <div className="mt-1">
                <div className="workload-bar mt-1">
                  <div 
                    className={cn("workload-progress", getWorkloadClass(staff.workload))} 
                    style={{ width: `${staff.workload}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className={cn("hover:border-primary/20 transition-all", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={staff.avatar} alt={staff.name} />
              <AvatarFallback>{getInitials(staff.name)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{staff.name}</p>
              <span className={statusClass[staff.status]}>{statusLabel[staff.status]}</span>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {staff.assignedCases.length} active cases
          </div>
        </div>
        
        <div className="space-y-2">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Current workload</p>
            <div className="workload-bar">
              <div 
                className={cn("workload-progress", getWorkloadClass(staff.workload))} 
                style={{ width: `${staff.workload}%` }} 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="flex flex-col items-center p-1 rounded bg-secondary/30">
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                <span>Resolved</span>
              </div>
              <p className="font-semibold">{staff.casesResolved}</p>
            </div>
            
            <div className="flex flex-col items-center p-1 rounded bg-secondary/30">
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <Clock className="h-3 w-3 mr-1" />
                <span>Avg. Time</span>
              </div>
              <p className="font-semibold">{staff.averageHandlingTime}h</p>
            </div>
            
            <div className="flex flex-col items-center p-1 rounded bg-secondary/30">
              <div className="flex items-center text-xs text-muted-foreground mb-1">
                <Star className="h-3 w-3 mr-1" />
                <span>Rating</span>
              </div>
              <p className="font-semibold">4.6</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
