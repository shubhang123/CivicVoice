
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
import { ComplaintCard } from "@/components/ui/ComplaintCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Plus,
  ArrowUpDown
} from "lucide-react";
import { 
  complaints,
  departments
} from "@/lib/mockData";
import { Complaint, Priority, ComplaintStatus } from "@/lib/types";
import { toast } from "sonner";

const ComplaintsPage = () => {
  const [view, setView] = useState<"board" | "list">("board");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedDept, setSelectedDept] = useState(departments[0].id);

  // Extract unique categories from complaints
  const categories = Array.from(new Set(complaints.map(c => c.category)));

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         complaint.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === "all" || complaint.priority === priorityFilter;
    const matchesCategory = categoryFilter === "all" || complaint.category === categoryFilter;
    
    return matchesSearch && matchesPriority && matchesCategory;
  });

  const handleAssign = (complaint: Complaint) => {
    toast.success("Complaint assigned successfully", {
      description: `Complaint ${complaint.id} has been assigned.`
    });
  };

  const handleEscalate = (complaint: Complaint) => {
    toast.info("Complaint escalated", {
      description: `Complaint ${complaint.id} has been escalated to higher priority.`
    });
  };

  const handleResolve = (complaint: Complaint) => {
    toast.success("Complaint resolved", {
      description: `Complaint ${complaint.id} has been marked as resolved.`
    });
  };

  const statusColumns: ComplaintStatus[] = ["new", "assigned", "in-progress", "pending-input", "resolved"];

  const getFilteredComplaintsByStatus = (status: ComplaintStatus) => {
    return filteredComplaints.filter(c => c.status === status);
  };

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">Complaint Management</h1>
            <p className="text-muted-foreground mt-1">
              Track, assign and resolve citizen complaints
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" onClick={() => setView(view === "board" ? "list" : "board")}>
              {view === "board" ? "List View" : "Board View"}
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New Complaint
            </Button>
          </div>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search complaints..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={priorityFilter} onValueChange={(value: Priority | "all") => setPriorityFilter(value)}>
              <SelectTrigger className="w-[130px]">
                <Filter className="h-3.5 w-3.5 mr-2" />
                <span>Priority</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[130px]">
                <Filter className="h-3.5 w-3.5 mr-2" />
                <span>Category</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
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
            
            <Button variant="ghost" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {view === "board" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {statusColumns.map((status) => (
              <Card key={status} className="h-fit">
                <CardHeader className="py-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base capitalize">{status.replace('-', ' ')}</CardTitle>
                    <Badge variant="secondary" className="ml-2">
                      {getFilteredComplaintsByStatus(status).length}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-2 pb-2">
                  <div className="space-y-2 max-h-[calc(100vh-220px)] overflow-y-auto p-1">
                    {getFilteredComplaintsByStatus(status).map((complaint) => (
                      <div 
                        key={complaint.id} 
                        className="bg-card transition-all transform hover:-translate-y-1 active:scale-95 cursor-grab"
                        draggable
                      >
                        <ComplaintCard
                          complaint={complaint}
                          onAssign={status === "new" ? handleAssign : undefined}
                          onEscalate={["new", "assigned", "in-progress"].includes(status) ? handleEscalate : undefined}
                          onResolve={["in-progress", "pending-input"].includes(status) ? handleResolve : undefined}
                        />
                      </div>
                    ))}
                    {getFilteredComplaintsByStatus(status).length === 0 && (
                      <div className="text-center py-4 text-sm text-muted-foreground">
                        No complaints in this status
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Complaints List</CardTitle>
              <CardDescription>
                Showing {filteredComplaints.length} complaints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {filteredComplaints.map((complaint) => (
                  <ComplaintCard 
                    key={complaint.id} 
                    complaint={complaint} 
                    onAssign={complaint.status === "new" ? handleAssign : undefined}
                    onEscalate={["new", "assigned", "in-progress"].includes(complaint.status) ? handleEscalate : undefined}
                    onResolve={["in-progress", "pending-input"].includes(complaint.status) ? handleResolve : undefined}
                  />
                ))}
                {filteredComplaints.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    No complaints match your search criteria
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default ComplaintsPage;
