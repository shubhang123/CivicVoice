
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CircularProgress } from "@/components/ui/CircularProgress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
} from "recharts";
import { 
  Clock, 
  AlertCircle, 
  ShieldCheck, 
  ArrowUpRight,
  Calendar,
  Download,
} from "lucide-react";
import { 
  departments, 
  slaCases, 
  complaints,
  historicalSLA,
  dailySLAPerformance,
} from "@/lib/mockData";
import { SLAStatus, TimePeriod } from "@/lib/types";
import { toast } from "sonner";

const SLAMonitoringPage = () => {
  const [selectedDept, setSelectedDept] = useState(departments[0].id);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("week");
  
  // Calculate SLA stats
  const totalSLACases = slaCases.length;
  const onTrackCases = slaCases.filter(c => c.status === "on-track").length;
  const atRiskCases = slaCases.filter(c => c.status === "at-risk").length;
  const breachedCases = slaCases.filter(c => c.status === "breached").length;
  
  // Get the SLA compliance percentage
  const slaCompliance = Math.round((onTrackCases / totalSLACases) * 100);
  
  // Format date for the timeline
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    };
  };
  
  // Get color for SLA status
  const getStatusColor = (status: SLAStatus) => {
    switch (status) {
      case "on-track": return "bg-green-100 text-green-800 border-green-300";
      case "at-risk": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "breached": return "bg-red-100 text-red-800 border-red-300";
      default: return "";
    }
  };
  
  // Get SLA cases with complaint details
  const slaCasesWithDetails = slaCases.map(slaCase => {
    const complaint = complaints.find(c => c.id === slaCase.complaintId);
    return {
      ...slaCase,
      complaint
    };
  }).sort((a, b) => {
    // Sort by status: breached first, then at-risk, then on-track
    const statusOrder: Record<SLAStatus, number> = {
      "breached": 0,
      "at-risk": 1,
      "on-track": 2
    };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  
  const handleExportReport = () => {
    toast.success("Report exported", {
      description: "SLA monitoring report has been exported to CSV"
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6 animate-fade-in">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">SLA Monitoring</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage service level agreement performance
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
                <Calendar className="h-4 w-4 mr-2" />
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
            
            <Button variant="outline" size="icon" onClick={handleExportReport}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">SLA Compliance</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-2 flex justify-center">
              <CircularProgress 
                value={slaCompliance} 
                size="md" 
                color={
                  slaCompliance >= 80 ? "success" : 
                  slaCompliance >= 60 ? "warning" : "danger"
                }
                label="Compliance"
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Cases by Status</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">On Track</span>
                  <Badge variant="outline" className="bg-green-100 text-green-800">
                    {onTrackCases}
                  </Badge>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded">
                  <div 
                    className="h-full bg-green-500 rounded" 
                    style={{width: `${(onTrackCases / totalSLACases) * 100}%`}}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm">At Risk</span>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    {atRiskCases}
                  </Badge>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded">
                  <div 
                    className="h-full bg-yellow-500 rounded" 
                    style={{width: `${(atRiskCases / totalSLACases) * 100}%`}}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm">Breached</span>
                  <Badge variant="outline" className="bg-red-100 text-red-800">
                    {breachedCases}
                  </Badge>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded">
                  <div 
                    className="h-full bg-red-500 rounded" 
                    style={{width: `${(breachedCases / totalSLACases) * 100}%`}}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">Daily Performance</CardTitle>
                <ArrowUpRight className={`h-4 w-4 ${dailySLAPerformance > 80 ? 'text-green-500' : 'text-yellow-500'}`} />
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold mb-2">{dailySLAPerformance}%</div>
                <div className="text-sm text-muted-foreground">Today's SLA compliance</div>
                
                <div className="w-full mt-4 pt-4 border-t">
                  <div className="text-sm mb-1">Target: 85%</div>
                  <div className="h-2 w-full bg-gray-100 rounded">
                    <div 
                      className={`h-full rounded ${dailySLAPerformance >= 85 ? 'bg-green-500' : 'bg-yellow-500'}`}
                      style={{width: `${(dailySLAPerformance / 100) * 100}%`}}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Historical SLA Compliance</CardTitle>
            <CardDescription>Performance over the last 10 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historicalSLA}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="date" />
                  <YAxis
                    domain={[0, 100]}
                    tickFormatter={(value) => `${value}%`}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Compliance']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="compliance"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>SLA Timeline</CardTitle>
            <CardDescription>Cases approaching or exceeding deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="at-risk">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Cases ({slaCasesWithDetails.length})</TabsTrigger>
                <TabsTrigger value="at-risk">At Risk ({atRiskCases})</TabsTrigger>
                <TabsTrigger value="breached">Breached ({breachedCases})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {slaCasesWithDetails.map((slaCase) => (
                    <div 
                      key={slaCase.complaintId}
                      className={`p-3 border rounded-lg ${getStatusColor(slaCase.status)}`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{slaCase.complaint?.category} - {slaCase.complaintId}</div>
                          <div className="text-sm line-clamp-1">{slaCase.complaint?.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            Deadline: {formatDate(slaCase.deadline).time}
                          </div>
                          <div className="text-xs">{formatDate(slaCase.deadline).date}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="at-risk">
                <div className="space-y-4">
                  {slaCasesWithDetails
                    .filter(slaCase => slaCase.status === "at-risk")
                    .map((slaCase) => (
                      <div 
                        key={slaCase.complaintId}
                        className="p-3 border rounded-lg bg-yellow-100 text-yellow-800 border-yellow-300"
                      >
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">{slaCase.complaint?.category} - {slaCase.complaintId}</div>
                            <div className="text-sm line-clamp-1">{slaCase.complaint?.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              Deadline: {formatDate(slaCase.deadline).time}
                            </div>
                            <div className="text-xs">{formatDate(slaCase.deadline).date}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="breached">
                <div className="space-y-4">
                  {slaCasesWithDetails
                    .filter(slaCase => slaCase.status === "breached")
                    .map((slaCase) => (
                      <div 
                        key={slaCase.complaintId}
                        className="p-3 border rounded-lg bg-red-100 text-red-800 border-red-300"
                      >
                        <div className="flex justify-between">
                          <div>
                            <div className="font-medium">{slaCase.complaint?.category} - {slaCase.complaintId}</div>
                            <div className="text-sm line-clamp-1">{slaCase.complaint?.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              Deadline: {formatDate(slaCase.deadline).time}
                            </div>
                            <div className="text-xs">{formatDate(slaCase.deadline).date}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SLAMonitoringPage;
