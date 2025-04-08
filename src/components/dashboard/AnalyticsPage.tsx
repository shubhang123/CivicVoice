
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { staffPerformance, categoryPerformance, systemAverages, departments } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Download, BarChart3, PieChart as PieChartIcon, TrendingUp, Activity } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BFF', '#FF6B8B'];

const AnalyticsPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0].id);
  const [timeRange, setTimeRange] = useState("month");

  const getComparisonData = () => {
    return staffPerformance.map((staff) => ({
      name: staff.staffName,
      resolved: staff.casesResolved,
      handling: staff.averageHandlingTime * 10, // Scale for visibility
      satisfaction: staff.customerSatisfaction * 5, // Scale for visibility
    }));
  };

  const getCategoryData = () => {
    return categoryPerformance;
  };

  const getDepartmentVsSystemData = () => {
    // Example comparison data
    return [
      {
        name: "Response Time",
        department: systemAverages.responseTime * 0.9, // Slightly better than average
        system: systemAverages.responseTime,
      },
      {
        name: "Resolution Rate",
        department: systemAverages.resolutionRate * 1.05, // 5% better than average
        system: systemAverages.resolutionRate,
      },
      {
        name: "Customer Satisfaction",
        department: systemAverages.customerSatisfaction * 1.02, // 2% better than average
        system: systemAverages.customerSatisfaction * 20, // Scale for visibility
      },
    ];
  };

  const getQualityRatingData = () => {
    // Mock data representing quality ratings
    return [
      { name: "Timeliness", value: 85 },
      { name: "Communication", value: 90 },
      { name: "Resolution Quality", value: 78 },
      { name: "Professionalism", value: 92 },
      { name: "Follow-up", value: 70 },
    ];
  };

  const getImprovementTrendData = () => {
    // Mock improvement trend over time
    return [
      { month: "Jan", score: 65 },
      { month: "Feb", score: 68 },
      { month: "Mar", score: 70 },
      { month: "Apr", score: 72 },
      { month: "May", score: 75 },
      { month: "Jun", score: 78 },
      { month: "Jul", score: 80 },
      { month: "Aug", score: 79 },
      { month: "Sep", score: 82 },
      { month: "Oct", score: 85 },
      { month: "Nov", score: 88 },
      { month: "Dec", score: 90 },
    ];
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Team Performance Analytics</h1>
          <div className="flex items-center space-x-4">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Performance Overview
            </TabsTrigger>
            <TabsTrigger value="categories">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Categories Analysis
            </TabsTrigger>
            <TabsTrigger value="comparison">
              <Activity className="h-4 w-4 mr-2" />
              System Comparison
            </TabsTrigger>
            <TabsTrigger value="trends">
              <TrendingUp className="h-4 w-4 mr-2" />
              Improvement Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Staff Performance Comparison</CardTitle>
                  <CardDescription>Cases resolved, handling time, and satisfaction ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getComparisonData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="resolved" name="Cases Resolved" fill="#0088FE" />
                        <Bar dataKey="handling" name="Avg. Handling Time" fill="#00C49F" />
                        <Bar dataKey="satisfaction" name="Customer Satisfaction" fill="#FFBB28" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quality Rating</CardTitle>
                  <CardDescription>Based on citizen feedback across different aspects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={getQualityRatingData()}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis angle={30} domain={[0, 100]} />
                        <Radar name="Quality Score" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Complaint volume by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getCategoryData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="volumePercentage"
                          nameKey="category"
                        >
                          {getCategoryData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Resolution Time by Category</CardTitle>
                  <CardDescription>Average time to resolve complaints by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getCategoryData()}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Bar dataKey="averageResolutionTime" name="Avg. Resolution Time (hours)" fill="#00C49F" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Department vs. System-Wide Average</CardTitle>
                <CardDescription>Comparison of key metrics against system-wide performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getDepartmentVsSystemData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="department" name="Department" fill="#0088FE" />
                      <Bar dataKey="system" name="System Average" fill="#FF8042" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries({
                "Response Time": {
                  value: `${systemAverages.responseTime * 0.9}h vs ${systemAverages.responseTime}h`,
                  change: "10% faster",
                  improved: true
                },
                "Resolution Rate": {
                  value: `${systemAverages.resolutionRate * 1.05}% vs ${systemAverages.resolutionRate}%`,
                  change: "5% higher",
                  improved: true
                },
                "Customer Satisfaction": {
                  value: `${(systemAverages.customerSatisfaction * 1.02).toFixed(1)} vs ${systemAverages.customerSatisfaction.toFixed(1)}`,
                  change: "2% higher",
                  improved: true
                }
              }).map(([key, { value, change, improved }]) => (
                <Card key={key}>
                  <CardHeader className="py-4">
                    <CardTitle className="text-base font-medium">{key}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{value}</div>
                    <div className="flex items-center mt-1">
                      <Badge variant={improved ? "default" : "destructive"} className="text-xs">
                        {change}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Improvement Trend</CardTitle>
                <CardDescription>Overall performance score over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={getImprovementTrendData()}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        name="Performance Score" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Areas of Improvement</CardTitle>
                  <CardDescription>Metrics showing the most improvement</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      { area: "Response Time", improvement: "15% reduction over 6 months" },
                      { area: "First-Contact Resolution", improvement: "12% increase year-over-year" },
                      { area: "Customer Feedback Scores", improvement: "8% improvement in last quarter" },
                      { area: "SLA Compliance", improvement: "10% increase in on-time resolution" }
                    ].map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="font-medium">{item.area}</span>
                        <Badge variant="outline" className="bg-primary/10">{item.improvement}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Areas Needing Attention</CardTitle>
                  <CardDescription>Metrics showing negative trends or low performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      { area: "Complex Case Resolution", issue: "5% increase in resolution time" },
                      { area: "After-Hours Response", issue: "Below target by 12%" },
                      { area: "Staff Turnover", issue: "8% higher than department average" },
                      { area: "Documentation Quality", issue: "Needs standardization" }
                    ].map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span className="font-medium">{item.area}</span>
                        <Badge variant="outline" className="bg-destructive/10 text-destructive">{item.issue}</Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
