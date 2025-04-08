
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPICard } from "@/components/ui/KPICard";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { ComplaintCard } from "@/components/ui/ComplaintCard";
import { StaffCard } from "@/components/ui/StaffCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  departments, 
  kpis, 
  departmentScores,
  complaints,
  staffMembers
} from "@/lib/mockData";
import { TimePeriod } from "@/lib/types";
import { toast } from "sonner";

const DashboardPage = () => {
  const [selectedDept, setSelectedDept] = useState(departments[0].id);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("week");

  const handleAssign = (complaint: any) => {
    toast.success("Complaint assigned successfully", {
      description: `Complaint ${complaint.id} has been assigned.`
    });
  };

  const handleEscalate = (complaint: any) => {
    toast.info("Complaint escalated", {
      description: `Complaint ${complaint.id} has been escalated to higher priority.`
    });
  };

  const handleResolve = (complaint: any) => {
    toast.success("Complaint resolved", {
      description: `Complaint ${complaint.id} has been marked as resolved.`
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="h1">Department Overview</h1>
            <p className="text-muted-foreground mt-1">
              Monitor performance and manage complaints efficiently
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedPeriod} onValueChange={(value: TimePeriod) => setSelectedPeriod(value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>
        
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis[selectedDept]?.map((kpi, index) => (
            <KPICard key={`${kpi.label}-${index}`} kpi={kpi} />
          ))}
        </section>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Complaint Queue</CardTitle>
                  <CardDescription>Recently submitted cases requiring attention</CardDescription>
                </div>
                <Badge variant="outline" className="px-2 py-1">
                  {complaints.filter(c => c.status !== "resolved").length} active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="new" className="w-full">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="new">New</TabsTrigger>
                    <TabsTrigger value="assigned">Assigned</TabsTrigger>
                    <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                    <TabsTrigger value="pending-input">Pending Input</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="new" className="mt-0 space-y-3">
                  {complaints
                    .filter(c => c.status === "new")
                    .slice(0, 3)
                    .map(complaint => (
                      <ComplaintCard 
                        key={complaint.id} 
                        complaint={complaint} 
                        onAssign={handleAssign}
                        onEscalate={handleEscalate}
                      />
                    ))
                  }
                </TabsContent>
                
                <TabsContent value="assigned" className="mt-0 space-y-3">
                  {complaints
                    .filter(c => c.status === "assigned")
                    .slice(0, 3)
                    .map(complaint => (
                      <ComplaintCard 
                        key={complaint.id} 
                        complaint={complaint} 
                        onEscalate={handleEscalate}
                      />
                    ))
                  }
                </TabsContent>
                
                <TabsContent value="in-progress" className="mt-0 space-y-3">
                  {complaints
                    .filter(c => c.status === "in-progress")
                    .slice(0, 3)
                    .map(complaint => (
                      <ComplaintCard 
                        key={complaint.id} 
                        complaint={complaint} 
                        onResolve={handleResolve}
                      />
                    ))
                  }
                </TabsContent>
                
                <TabsContent value="pending-input" className="mt-0 space-y-3">
                  {complaints
                    .filter(c => c.status === "pending-input")
                    .slice(0, 3)
                    .map(complaint => (
                      <ComplaintCard 
                        key={complaint.id} 
                        complaint={complaint} 
                        onResolve={handleResolve}
                      />
                    ))
                  }
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performance Score</CardTitle>
                  <CardDescription>Overall department rating</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <CircularProgress 
                value={departmentScores[selectedDept] || 0} 
                size="lg" 
                color={
                  (departmentScores[selectedDept] || 0) >= 80 ? "success" : 
                  (departmentScores[selectedDept] || 0) >= 60 ? "warning" : "danger"
                }
                label="Performance"
              />
              
              <div className="mt-6 w-full">
                <h4 className="text-sm font-semibold mb-2">Available Staff</h4>
                <div className="space-y-2">
                  {staffMembers
                    .filter(s => s.status !== "offline")
                    .slice(0, 3)
                    .map(staff => (
                      <StaffCard key={staff.id} staff={staff} compact />
                    ))
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
