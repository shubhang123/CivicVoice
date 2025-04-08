
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StaffCard } from "@/components/ui/StaffCard";
import { ComplaintCard } from "@/components/ui/ComplaintCard";
import { Search, Filter, Plus, Users, ArrowDownUp } from "lucide-react";
import { staffMembers, complaints, departments } from "@/lib/mockData";
import { Staff, StaffStatus } from "@/lib/types";
import { toast } from "sonner";

const StaffPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StaffStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"name" | "workload" | "performance">("workload");
  const [selectedDept, setSelectedDept] = useState(departments[0].id);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Filter staff based on search and status filter
  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || staff.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sort staff based on selected sort criteria
  const sortedStaff = [...filteredStaff].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "workload") {
      return b.workload - a.workload;
    } else {
      return b.casesResolved - a.casesResolved;
    }
  });

  const handleAssignToStaff = (complaint: any) => {
    if (selectedStaff) {
      toast.success("Complaint assigned successfully", {
        description: `Complaint ${complaint.id} has been assigned to ${selectedStaff.name}.`
      });
    } else {
      toast.error("No staff member selected", {
        description: "Please select a staff member first."
      });
    }
  };

  // Simulate getting available complaints
  const availableComplaints = complaints.filter(c => c.status === "new" || c.status === "assigned");

  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">Staff Management</h1>
            <p className="text-muted-foreground mt-1">
              Manage staff workload and performance
            </p>
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Staff Member
            </Button>
          </div>
        </header>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search staff members..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Select value={statusFilter} onValueChange={(value: StaffStatus | "all") => setStatusFilter(value)}>
              <SelectTrigger className="w-[130px]">
                <Users className="h-3.5 w-3.5 mr-2" />
                <span>Status</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="busy">Busy</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={(value: "name" | "workload" | "performance") => setSortBy(value)}>
              <SelectTrigger className="w-[130px]">
                <ArrowDownUp className="h-3.5 w-3.5 mr-2" />
                <span>Sort By</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="workload">Workload</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
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
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Staff List */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Staff Members</CardTitle>
                  <Badge variant="outline">{sortedStaff.length}</Badge>
                </div>
                <CardDescription>Click a staff member to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
                  {sortedStaff.map((staff) => (
                    <div 
                      key={staff.id} 
                      className={`cursor-pointer transition-all hover:scale-[1.01] ${selectedStaff?.id === staff.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedStaff(staff)}
                    >
                      <StaffCard staff={staff} compact />
                    </div>
                  ))}
                  {sortedStaff.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      No staff members match your search criteria
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Staff Details and Assignment */}
          <div className="lg:col-span-2 space-y-4">
            {selectedStaff ? (
              <>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Staff Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <StaffCard staff={selectedStaff} />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">Assign Complaints</CardTitle>
                      <Badge variant="outline" className="ml-2">
                        {availableComplaints.length} available
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="available">
                      <TabsList className="mb-4">
                        <TabsTrigger value="available">Available to Assign</TabsTrigger>
                        <TabsTrigger value="assigned">Currently Assigned ({selectedStaff.assignedCases.length})</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="available" className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto pr-1">
                        {availableComplaints.length > 0 ? (
                          availableComplaints.map((complaint) => (
                            <div 
                              key={complaint.id} 
                              className="cursor-pointer transition-all hover:scale-[1.01]"
                              draggable
                              onDragEnd={() => handleAssignToStaff(complaint)}
                            >
                              <ComplaintCard 
                                complaint={complaint} 
                                onAssign={() => handleAssignToStaff(complaint)}
                              />
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-muted-foreground">
                            No complaints available to assign
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="assigned" className="space-y-3 max-h-[calc(100vh-500px)] overflow-y-auto pr-1">
                        {selectedStaff.assignedCases.length > 0 ? (
                          selectedStaff.assignedCases.map((complaint) => (
                            <div key={complaint.id}>
                              <ComplaintCard 
                                complaint={complaint} 
                              />
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-muted-foreground">
                            No complaints currently assigned
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="h-full flex items-center justify-center p-8 text-muted-foreground">
                <div className="text-center">
                  <Users className="h-16 w-16 mx-auto mb-4 text-muted-foreground/30" />
                  <h3 className="text-lg font-medium mb-1">No Staff Selected</h3>
                  <p>Select a staff member from the list to view details and assign complaints</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StaffPage;
