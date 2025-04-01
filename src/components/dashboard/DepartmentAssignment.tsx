import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  LineChart,
  Line
} from "recharts";
import { useQuery } from '@tanstack/react-query';
import { 
  fetchComplaints, 
  getSeverityStats, 
  getDepartmentStats, 
  getLocationStats,
  getPlatformStats,
  getTimelineData
} from '@/services/analyticsService';
import { Briefcase, Users, TrendingUp, BarChart as BarChartIcon, PlusCircle, ChevronsRight, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import ComplaintCard from "../Complaints/ComplaintCart";
import { Skeleton } from "../ui/skeleton";

// Types for department data
interface Department {
  id: string;
  name: string;
  capacity: number;
  currentLoad: number;
  staff: Staff[];
  performance: number[];  // Last 6 months performance
  backlog: number;
}

interface Staff {
  id: string;
  name: string;
  role: string;
  workload: number;
  avatar: string;
  performance: number;
}

interface Complaint {
  id: string;
  title: string;
  department: string;
  priority: "high" | "medium" | "low";
  deadline: string;
  estimatedHours: number;
  assignedTo?: string;
  category: string;
  location: string;
}

// Generate demo data for government service departments
const generateDepartments = (): Department[] => {
  return [
    {
      id: "dept-1",
      name: "Water & Sewage",
      capacity: 100,
      currentLoad: 75,
      backlog: 23,
      staff: [
        { id: "staff-1", name: "John Rodriguez", role: "Department Head", workload: 70, avatar: "JR", performance: 85 },
        { id: "staff-2", name: "Emily Chen", role: "Field Inspector", workload: 80, avatar: "EC", performance: 92 },
        { id: "staff-3", name: "Rafael Martinez", role: "Maintenance Coordinator", workload: 65, avatar: "RM", performance: 78 },
      ],
      performance: [75, 78, 80, 82, 86, 90]
    },
    {
      id: "dept-2",
      name: "Roads & Infrastructure",
      capacity: 150,
      currentLoad: 130,
      backlog: 45,
      staff: [
        { id: "staff-4", name: "Sarah Johnson", role: "Civil Engineer", workload: 90, avatar: "SJ", performance: 95 },
        { id: "staff-5", name: "David Lee", role: "Project Manager", workload: 85, avatar: "DL", performance: 88 },
        { id: "staff-6", name: "Maria Garcia", role: "Site Inspector", workload: 80, avatar: "MG", performance: 91 },
        { id: "staff-7", name: "Thomas Wilson", role: "Maintenance Supervisor", workload: 75, avatar: "TW", performance: 87 },
      ],
      performance: [82, 85, 84, 88, 90, 92]
    },
    {
      id: "dept-3",
      name: "Sanitation",
      capacity: 80,
      currentLoad: 60,
      backlog: 12,
      staff: [
        { id: "staff-8", name: "Jessica Brown", role: "Operations Manager", workload: 65, avatar: "JB", performance: 89 },
        { id: "staff-9", name: "Robert Kim", role: "Waste Management Specialist", workload: 55, avatar: "RK", performance: 76 },
        { id: "staff-10", name: "Amanda Taylor", role: "District Supervisor", workload: 55, avatar: "AT", performance: 82 },
      ],
      performance: [70, 72, 75, 78, 82, 85]
    },
    {
      id: "dept-4",
      name: "Public Safety",
      capacity: 120,
      currentLoad: 100,
      backlog: 18,
      staff: [
        { id: "staff-11", name: "Michael Davis", role: "Safety Officer", workload: 85, avatar: "MD", performance: 84 },
        { id: "staff-12", name: "Lisa Wang", role: "Compliance Specialist", workload: 80, avatar: "LW", performance: 79 },
        { id: "staff-13", name: "James Harris", role: "Field Investigator", workload: 70, avatar: "JH", performance: 81 },
        { id: "staff-14", name: "Sophia Martinez", role: "Community Liaison", workload: 60, avatar: "SM", performance: 77 },
      ],
      performance: [76, 79, 80, 83, 81, 84]
    },
    {
      id: "dept-5",
      name: "Healthcare",
      capacity: 90,
      currentLoad: 65,
      backlog: 8,
      staff: [
        { id: "staff-15", name: "Daniel Clark", role: "Health Inspector", workload: 70, avatar: "DC", performance: 88 },
        { id: "staff-16", name: "Patricia Wong", role: "Public Health Coordinator", workload: 60, avatar: "PW", performance: 90 },
        { id: "staff-17", name: "Kevin Patel", role: "Facilities Manager", workload: 65, avatar: "KP", performance: 82 },
      ],
      performance: [81, 83, 85, 88, 87, 89]
    },
    {
      id: "dept-6",
      name: "Education",
      capacity: 70,
      currentLoad: 45,
      backlog: 5,
      staff: [
        { id: "staff-18", name: "Jennifer Lewis", role: "Education Liaison", workload: 65, avatar: "JL", performance: 91 },
        { id: "staff-19", name: "Brandon Morris", role: "Facility Maintenance", workload: 55, avatar: "BM", performance: 84 },
      ],
      performance: [79, 82, 84, 88, 90, 91]
    },
    {
      id: "dept-7",
      name: "Municipal Services",
      capacity: 110,
      currentLoad: 90,
      backlog: 29,
      staff: [
        { id: "staff-20", name: "Olivia Wilson", role: "Service Manager", workload: 80, avatar: "OW", performance: 86 },
        { id: "staff-21", name: "Carlos Mendez", role: "Permit Specialist", workload: 75, avatar: "CM", performance: 79 },
        { id: "staff-22", name: "Rebecca Turner", role: "Citizen Support", workload: 65, avatar: "RT", performance: 83 },
        { id: "staff-23", name: "Andrew Scott", role: "Administrative Officer", workload: 60, avatar: "AS", performance: 80 },
      ],
      performance: [74, 76, 78, 80, 83, 86]
    }
  ];
};

const generateComplaints = (): Complaint[] => {
  return [
    {
      id: "comp-1",
      title: "Water Main Break on Oak Street",
      department: "Water & Sewage",
      priority: "high",
      deadline: "2023-06-02",
      estimatedHours: 12,
      category: "Infrastructure",
      location: "Downtown"
    },
    {
      id: "comp-2",
      title: "Pothole Hazard on Main Avenue",
      department: "Roads & Infrastructure",
      priority: "medium",
      deadline: "2023-06-05",
      estimatedHours: 8,
      category: "Maintenance",
      location: "North District"
    },
    {
      id: "comp-3",
      title: "Missed Garbage Collection on Pine Road",
      department: "Sanitation",
      priority: "low",
      deadline: "2023-06-03",
      estimatedHours: 3,
      category: "Waste Management",
      location: "West District"
    },
    {
      id: "comp-4",
      title: "Broken Streetlight on Elm Boulevard",
      department: "Public Safety",
      priority: "medium",
      deadline: "2023-06-04",
      estimatedHours: 4,
      category: "Lighting",
      location: "South District"
    },
    {
      id: "comp-5",
      title: "Sewage Backup in Community Center",
      department: "Water & Sewage",
      priority: "high",
      deadline: "2023-06-01",
      estimatedHours: 8,
      category: "Plumbing",
      location: "Central District"
    },
    {
      id: "comp-6",
      title: "School Heating System Failure",
      department: "Education",
      priority: "high",
      deadline: "2023-06-01",
      estimatedHours: 10,
      category: "Facilities",
      location: "East District"
    },
    {
      id: "comp-7",
      title: "Permit Processing Delay",
      department: "Municipal Services",
      priority: "low",
      deadline: "2023-06-10",
      estimatedHours: 5,
      category: "Administrative",
      location: "City Hall"
    }
  ];
};

const chartConfig = {
  water: {
    label: "Water & Sewage",
    theme: {
      light: "#0ea5e9",
      dark: "#38bdf8",
    },
  },
  roads: {
    label: "Roads & Infrastructure",
    theme: {
      light: "#8b5cf6",
      dark: "#a78bfa",
    },
  },
  sanitation: {
    label: "Sanitation",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
  safety: {
    label: "Public Safety",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
  },
  healthcare: {
    label: "Healthcare",
    theme: {
      light: "#ec4899",
      dark: "#f472b6",
    },
  },
  education: {
    label: "Education",
    theme: {
      light: "#06b6d4",
      dark: "#22d3ee",
    },
  },
  municipal: {
    label: "Municipal Services",
    theme: {
      light: "#84cc16",
      dark: "#a3e635",
    },
  },
  high: {
    label: "High",
    theme: {
      light: "#ef4444",
      dark: "#f87171",
    },
  },
  medium: {
    label: "Medium",
    theme: {
      light: "#f59e0b",
      dark: "#fbbf24",
    },
  },
  low: {
    label: "Low",
    theme: {
      light: "#10b981",
      dark: "#34d399",
    },
  },
};

const DepartmentAssignment = () => {
  const [departments, setDepartments] = useState<Department[]>(generateDepartments());
  const [complaints, setComplaints] = useState<Complaint[]>(generateComplaints());
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [assignmentSheetOpen, setAssignmentSheetOpen] = useState(false);
  const [newComplaintOpen, setNewComplaintOpen] = useState(false);
  const [newComplaint, setNewComplaint] = useState<Partial<Complaint>>({
    title: "",
    department: "",
    priority: "medium",
    deadline: new Date().toISOString().split('T')[0],
    estimatedHours: 0,
    category: "",
    location: ""
  });
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Get department color
  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "Water & Sewage": return "var(--color-water)";
      case "Roads & Infrastructure": return "var(--color-roads)";
      case "Sanitation": return "var(--color-sanitation)";
      case "Public Safety": return "var(--color-safety)";
      case "Healthcare": return "var(--color-healthcare)";
      case "Education": return "var(--color-education)";
      case "Municipal Services": return "var(--color-municipal)";
      default: return "#6b7280";
    }
  };
  
  // Get workload data for pie chart
  const getWorkloadData = () => {
    return departments.map(dept => ({
      name: dept.name,
      value: dept.currentLoad,
      fill: getDepartmentColor(dept.name),
      capacity: dept.capacity,
    }));
  };
  
  // Get backlog data for bar chart
  const getBacklogData = () => {
    return departments.map(dept => ({
      name: dept.name,
      backlog: dept.backlog,
      capacity: dept.capacity,
      fill: getDepartmentColor(dept.name),
    }));
  };
  
  // Get priority distribution data
  const getPriorityData = () => {
    const counts = { high: 0, medium: 0, low: 0 };
    complaints.forEach(c => {
      counts[c.priority]++;
    });
    
    return [
      { name: "High", value: counts.high, fill: "var(--color-high)" },
      { name: "Medium", value: counts.medium, fill: "var(--color-medium)" },
      { name: "Low", value: counts.low, fill: "var(--color-low)" },
    ];
  };
  
  // Get performance comparison data
  const getPerformanceData = () => {
    const data = [];
    
    // Last 6 months
    for (let i = 0; i < 6; i++) {
      const month = new Date();
      month.setMonth(month.getMonth() - 5 + i);
      const monthName = month.toLocaleString('default', { month: 'short' });
      
      const entry: any = { name: monthName };
      
      departments.forEach(dept => {
        const key = dept.name.toLowerCase().replace(/\s+/g, '_');
        entry[key] = dept.performance[i];
      });
      
      data.push(entry);
    }
    
    return data;
  };
  
  // Handle assigning work
  const assignComplaint = (complaintId: string, staffId: string) => {
    const complaint = complaints.find(c => c.id === complaintId);
    const department = departments.find(d => d.name === complaint?.department);
    const staff = department?.staff.find(s => s.id === staffId);
    
    if (complaint && staff) {
      // Update complaint
      setComplaints(prev => prev.map(c => 
        c.id === complaintId ? { ...c, assignedTo: staff.name } : c
      ));
      
      // Update staff workload
      setDepartments(prev => prev.map(d => d.id === department.id ? {
        ...d,
        currentLoad: Math.min(d.capacity, d.currentLoad + complaint.estimatedHours / 4),
        backlog: d.backlog > 0 ? d.backlog - 1 : 0,
        staff: d.staff.map(s => s.id === staffId ? {
          ...s,
          workload: Math.min(100, s.workload + 10)
        } : s)
      } : d));
      
      // Close sheet and show success toast
      setAssignmentSheetOpen(false);
      setSelectedComplaint(null);
      
      toast({
        title: "Assignment Successful",
        description: `"${complaint.title}" has been assigned to ${staff.name}.`,
      });
    }
  };
  
  // Add new complaint
  const addNewComplaint = () => {
    if (!newComplaint.title || !newComplaint.department || !newComplaint.deadline || !newComplaint.estimatedHours || !newComplaint.category || !newComplaint.location) {
      toast({
        title: "Missing Information",
        description: "Please fill out all fields for the new complaint.",
        variant: "destructive",
      });
      return;
    }
    
    const complaintToAdd: Complaint = {
      id: `comp-${Math.random().toString(36).substring(2, 9)}`,
      title: newComplaint.title || "",
      department: newComplaint.department || "",
      priority: newComplaint.priority as "high" | "medium" | "low" || "medium",
      deadline: newComplaint.deadline || new Date().toISOString().split('T')[0],
      estimatedHours: newComplaint.estimatedHours || 0,
      category: newComplaint.category || "",
      location: newComplaint.location || ""
    };
    
    setComplaints(prev => [...prev, complaintToAdd]);
    
    // Update department backlog
    setDepartments(prev => prev.map(d => 
      d.name === complaintToAdd.department 
        ? { ...d, backlog: d.backlog + 1 } 
        : d
    ));
    
    // Reset form and close dialog
    setNewComplaint({
      title: "",
      department: "",
      priority: "medium",
      deadline: new Date().toISOString().split('T')[0],
      estimatedHours: 0,
      category: "",
      location: ""
    });
    setNewComplaintOpen(false);
    
    toast({
      title: "Complaint Registered",
      description: `"${complaintToAdd.title}" has been added to the queue.`,
    });
  };
  
  // Prepare assignment sheet or drawer
  const AssignmentDialog = isMobile ? Drawer : Sheet;
  const AssignmentDialogContent = isMobile ? DrawerContent : SheetContent;
  const AssignmentDialogHeader = isMobile ? DrawerHeader : SheetHeader;
  const AssignmentDialogTitle = isMobile ? DrawerTitle : SheetTitle;
  const AssignmentDialogDescription = isMobile ? DrawerDescription : SheetDescription;
  const AssignmentDialogFooter = isMobile ? DrawerFooter : null;
  
  return (
    <div className="space-y-4 mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">Department Assignment</h2>
        <Button 
          className="flex items-center gap-1"
          onClick={() => setNewComplaintOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          New Complaint
        </Button>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Workload Visualization Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChartIcon className="h-5 w-5" />
              Department Workload
            </CardTitle>
            <CardDescription>Current capacity and workload by department</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getWorkloadData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    label={({ name, value, capacity }) => `${name} (${Math.round(value / capacity * 100)}%)`}
                    labelLine={true}
                  >
                    {getWorkloadData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent />} />
                  <Legend content={<ChartLegendContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        {/* Department Performance Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Resolution Efficiency
            </CardTitle>
            <CardDescription>6-month performance metrics by department</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer
              config={chartConfig}
              className="h-full w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getPerformanceData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[60, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  {departments.map(dept => {
                    const key = dept.name.toLowerCase().replace(/\s+/g, '_');
                    const color = getDepartmentColor(dept.name);
                    return (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        name={dept.name}
                        stroke={color}
                        activeDot={{ r: 8 }}
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Departments Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Departments
            </CardTitle>
            <CardDescription>Select a department to view details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departments.map(dept => (
                <div 
                  key={dept.id}
                  className={`p-4 rounded-lg border ${
                    selectedDepartment?.id === dept.id ? 'bg-accent' : 'bg-card'
                  } cursor-pointer hover:bg-accent transition-colors`}
                  onClick={() => setSelectedDepartment(dept)}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{dept.name}</h3>
                    <span className="text-sm text-muted-foreground">{dept.staff.length} staff</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Workload</span>
                      <span>{Math.round(dept.currentLoad / dept.capacity * 100)}%</span>
                    </div>
                    <Progress value={dept.currentLoad / dept.capacity * 100} />
                  </div>
                  <div className="mt-2 flex justify-between text-sm">
                    <span>Pending Complaints</span>
                    <span className={dept.backlog > 10 ? "text-red-500 font-medium flex items-center gap-1" : ""}>
                      {dept.backlog}
                      {dept.backlog > 10 && <AlertTriangle className="h-3 w-3" />}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Staff Details Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {selectedDepartment ? `${selectedDepartment.name} Team` : 'Staff Details'}
            </CardTitle>
            <CardDescription>
              {selectedDepartment 
                ? `Workload distribution for ${selectedDepartment.name} department` 
                : 'Select a department to view team details'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDepartment ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Staff Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Workload</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedDepartment.staff.map(staffMember => (
                    <TableRow key={staffMember.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {staffMember.avatar}
                          </div>
                          <span>{staffMember.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{staffMember.role}</TableCell>
                      <TableCell>
                        <div className="w-full max-w-[100px] space-y-1">
                          <Progress 
                            value={staffMember.workload} 
                            className={staffMember.workload > 80 ? "bg-red-100" : ""}
                          />
                          <span className="text-xs text-muted-foreground">{staffMember.workload}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span className={staffMember.performance >= 85 ? "text-green-500" : "text-muted-foreground"}>
                            {staffMember.performance}%
                          </span>
                          {staffMember.performance >= 90 && <span className="text-xs text-green-500">Top performer</span>}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                Select a department to view staff details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Backlog Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Complaint Backlog
          </CardTitle>
          <CardDescription>Pending complaints by department</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ChartContainer
            config={chartConfig}
            className="h-full w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getBacklogData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="backlog" name="Pending Complaints" fill="#8884d8">
                  {getBacklogData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      
      {/* Complaints Table */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Pending Complaints</CardTitle>
          <CardDescription>Citizen complaints waiting to be assigned to staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Complaint</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Est. Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {complaints.map(complaint => (
                <TableRow key={complaint.id}>
                  <TableCell className="font-medium">{complaint.title}</TableCell>
                  <TableCell>{complaint.department}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      complaint.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400' :
                      complaint.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400' :
                      'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400'
                    }`}>
                      {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{complaint.location}</TableCell>
                  <TableCell>{complaint.deadline}</TableCell>
                  <TableCell>{complaint.estimatedHours}</TableCell>
                  <TableCell>
                    {complaint.assignedTo ? (
                      <span className="text-green-500">Assigned to {complaint.assignedTo}</span>
                    ) : (
                      <span className="text-yellow-500">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {!complaint.assignedTo && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => {
                          setSelectedComplaint(complaint);
                          setAssignmentSheetOpen(true);
                        }}
                      >
                        Assign
                        <ChevronsRight className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
      
      {/* Assignment Sheet/Drawer */}
      {/* <AssignmentDialog open={assignmentSheetOpen} onOpenChange={setAssignmentSheetOpen}>
        <AssignmentDialogContent className="sm:max-w-md">
          <AssignmentDialogHeader>
            <AssignmentDialogTitle>Assign Complaint</AssignmentDialogTitle>
            <AssignmentDialogDescription>
              {selectedComplaint && `Assign "${selectedComplaint.title}" to a staff member from the ${selectedComplaint.department} department.`}
            </AssignmentDialogDescription>
          </AssignmentDialogHeader>
          
          {selectedComplaint && (
            <div className="py-4">
              <div className="p-3 mb-4 rounded-lg bg-muted">
                <div className="text-sm font-medium">Complaint Details</div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Category:</span> {selectedComplaint.category}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span> {selectedComplaint.location}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Priority:</span> {selectedComplaint.priority.charAt(0).toUpperCase() + selectedComplaint.priority.slice(1)}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Deadline:</span> {selectedComplaint.deadline}
                  </div>
                </div>
              </div>
            
              <div className="space-y-4">
                {departments
                  .find(d => d.name === selectedComplaint.department)
                  ?.staff.map(staffMember => (
                    <div 
                      key={staffMember.id} 
                      className="border rounded-lg p-4 cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => assignComplaint(selectedComplaint.id, staffMember.id)}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                            {staffMember.avatar}
                          </div>
                          <div>
                            <h4 className="font-medium">{staffMember.name}</h4>
                            <p className="text-sm text-muted-foreground">{staffMember.role}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          {staffMember.performance}% perf.
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Current workload</span>
                          <span className={staffMember.workload > 80 ? "text-red-500" : ""}>
                            {staffMember.workload}%
                          </span>
                        </div>
                        <Progress 
                          value={staffMember.workload} 
                          className={staffMember.workload > 80 ? "bg-red-100" : ""}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          
          {isMobile && (
            <AssignmentDialogFooter>
              <Button variant="outline" onClick={() => setAssignmentSheetOpen(false)}>
                Cancel
              </Button>
            </AssignmentDialogFooter>
          )}
        </AssignmentDialogContent>
      </AssignmentDialog> */}
      
      {/* New Complaint Dialog */}
      {/* <Dialog open={newComplaintOpen} onOpenChange={setNewComplaintOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register New Complaint</DialogTitle>
            <DialogDescription>
              Enter details for the new citizen complaint.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">Complaint Title</label>
              <Input
                id="title"
                value={newComplaint.title}
                onChange={(e) => setNewComplaint(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Brief description of the issue"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="category" className="text-sm font-medium">Category</label>
                <Input
                  id="category"
                  value={newComplaint.category}
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Issue category"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">Location</label>
                <Input
                  id="location"
                  value={newComplaint.location}
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="District or area"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="department" className="text-sm font-medium">Department</label>
              <select
                id="department"
                value={newComplaint.department}
                onChange={(e) => setNewComplaint(prev => ({ ...prev, department: e.target.value }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="">Select department</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.name}>{dept.name}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                <select
                  id="priority"
                  value={newComplaint.priority}
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="deadline" className="text-sm font-medium">Deadline</label>
                <Input
                  id="deadline"
                  type="date"
                  value={newComplaint.deadline}
                  onChange={(e) => setNewComplaint(prev => ({ ...prev, deadline: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="hours" className="text-sm font-medium">Estimated Hours</label>
              <Input
                id="hours"
                type="number"
                value={newComplaint.estimatedHours}
                onChange={(e) => setNewComplaint(prev => ({ ...prev, estimatedHours: Number(e.target.value) }))}
                placeholder="Estimated hours to resolve"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewComplaintOpen(false)}>Cancel</Button>
            <Button onClick={addNewComplaint}>Register Complaint</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <div>
        
      </div>

      
    </div>
  );
};

export default DepartmentAssignment;