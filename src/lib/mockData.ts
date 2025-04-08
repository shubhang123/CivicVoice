
import { 
  Department, 
  KPI, 
  Complaint, 
  Staff, 
  SLACase, 
  PerformanceMetric, 
  CategoryPerformance 
} from './types';

export const departments: Department[] = [
  { id: "d1", name: "Public Works" },
  { id: "d2", name: "Health Services" },
  { id: "d3", name: "Transportation" },
  { id: "d4", name: "Environmental Protection" },
  { id: "d5", name: "Housing & Development" }
];

export const kpis: Record<string, KPI[]> = {
  "d1": [
    {
      label: "Active Complaints",
      value: 42,
      trend: {
        direction: "down",
        value: "8%"
      },
      icon: "clipboard-list"
    },
    {
      label: "Avg. Response Time",
      value: "3.2h",
      trend: {
        direction: "up",
        value: "12%"
      },
      icon: "clock"
    },
    {
      label: "Resolution Rate",
      value: "78%",
      trend: {
        direction: "up",
        value: "5%"
      },
      icon: "check-circle"
    },
    {
      label: "Overdue Cases",
      value: 7,
      trend: {
        direction: "down",
        value: "14%"
      },
      icon: "alert-circle"
    }
  ],
  "d2": [
    {
      label: "Active Complaints",
      value: 38,
      trend: {
        direction: "up",
        value: "4%"
      },
      icon: "clipboard-list"
    },
    {
      label: "Avg. Response Time",
      value: "2.8h",
      trend: {
        direction: "down",
        value: "9%"
      },
      icon: "clock"
    },
    {
      label: "Resolution Rate",
      value: "82%",
      trend: {
        direction: "up",
        value: "7%"
      },
      icon: "check-circle"
    },
    {
      label: "Overdue Cases",
      value: 5,
      trend: {
        direction: "down",
        value: "23%"
      },
      icon: "alert-circle"
    }
  ]
};

export const departmentScores: Record<string, number> = {
  "d1": 78,
  "d2": 82,
  "d3": 65,
  "d4": 73,
  "d5": 86
};

export const complaints: Complaint[] = [
  {
    id: "C1001",
    category: "Road Maintenance",
    description: "Pothole on Main Street causing traffic hazards",
    submittedAt: "2023-05-10T09:30:00Z",
    status: "new",
    priority: "high",
    priorityScore: 87
  },
  {
    id: "C1002",
    category: "Waste Management",
    description: "Missed garbage collection for 2 weeks",
    submittedAt: "2023-05-09T14:15:00Z",
    status: "assigned",
    priority: "medium",
    priorityScore: 65
  },
  {
    id: "C1003",
    category: "Street Lighting",
    description: "Broken street light at 5th and Park",
    submittedAt: "2023-05-08T16:45:00Z",
    status: "in-progress",
    priority: "low",
    priorityScore: 42
  },
  {
    id: "C1004",
    category: "Water Supply",
    description: "Brown water coming from taps in Cedar neighborhood",
    submittedAt: "2023-05-10T08:20:00Z",
    status: "pending-input",
    priority: "high",
    priorityScore: 91
  },
  {
    id: "C1005",
    category: "Sidewalk Repair",
    description: "Cracked sidewalk creating accessibility issues",
    submittedAt: "2023-05-07T11:10:00Z",
    status: "resolved",
    priority: "medium",
    priorityScore: 67
  },
  {
    id: "C1006",
    category: "Road Maintenance",
    description: "Large sinkhole forming on Elm Street",
    submittedAt: "2023-05-10T07:45:00Z",
    status: "new",
    priority: "high",
    priorityScore: 95
  },
  {
    id: "C1007",
    category: "Noise Complaint",
    description: "Construction noise outside permitted hours",
    submittedAt: "2023-05-09T19:30:00Z",
    status: "assigned",
    priority: "medium",
    priorityScore: 63
  },
  {
    id: "C1008",
    category: "Traffic Signal",
    description: "Traffic light stuck on red at 12th Avenue intersection",
    submittedAt: "2023-05-10T06:25:00Z",
    status: "in-progress",
    priority: "high",
    priorityScore: 89
  },
  {
    id: "C1009",
    category: "Public Parks",
    description: "Playground equipment damaged and unsafe",
    submittedAt: "2023-05-08T15:40:00Z",
    status: "pending-input",
    priority: "medium",
    priorityScore: 72
  },
  {
    id: "C1010",
    category: "Drainage",
    description: "Flooding on Oak Street after light rain",
    submittedAt: "2023-05-09T13:15:00Z",
    status: "new",
    priority: "high",
    priorityScore: 84
  }
];

export const staffMembers: Staff[] = [
  {
    id: "s1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg",
    status: "online",
    workload: 75,
    casesResolved: 147,
    averageHandlingTime: 2.3,
    assignedCases: []
  },
  {
    id: "s2",
    name: "Morgan Lee",
    avatar: "/placeholder.svg",
    status: "busy",
    workload: 90,
    casesResolved: 132,
    averageHandlingTime: 2.5,
    assignedCases: []
  },
  {
    id: "s3",
    name: "Taylor Smith",
    avatar: "/placeholder.svg",
    status: "online",
    workload: 60,
    casesResolved: 156,
    averageHandlingTime: 1.9,
    assignedCases: []
  },
  {
    id: "s4",
    name: "Jordan Chen",
    avatar: "/placeholder.svg",
    status: "offline",
    workload: 0,
    casesResolved: 118,
    averageHandlingTime: 2.8,
    assignedCases: []
  },
  {
    id: "s5",
    name: "Sam Rivera",
    avatar: "/placeholder.svg",
    status: "online",
    workload: 40,
    casesResolved: 125,
    averageHandlingTime: 2.4,
    assignedCases: []
  }
];

export const slaCases: SLACase[] = [
  {
    complaintId: "C1001",
    deadline: "2023-05-12T09:30:00Z",
    status: "on-track"
  },
  {
    complaintId: "C1002",
    deadline: "2023-05-11T14:15:00Z",
    status: "at-risk"
  },
  {
    complaintId: "C1004",
    deadline: "2023-05-12T08:20:00Z",
    status: "at-risk"
  },
  {
    complaintId: "C1006",
    deadline: "2023-05-12T07:45:00Z",
    status: "on-track"
  },
  {
    complaintId: "C1007",
    deadline: "2023-05-11T19:30:00Z",
    status: "breached"
  },
  {
    complaintId: "C1008",
    deadline: "2023-05-12T06:25:00Z",
    status: "on-track"
  },
  {
    complaintId: "C1010",
    deadline: "2023-05-11T13:15:00Z",
    status: "breached"
  }
];

export const historicalSLA = [
  { date: "May 1", compliance: 86 },
  { date: "May 2", compliance: 88 },
  { date: "May 3", compliance: 84 },
  { date: "May 4", compliance: 87 },
  { date: "May 5", compliance: 82 },
  { date: "May 6", compliance: 79 },
  { date: "May 7", compliance: 81 },
  { date: "May 8", compliance: 83 },
  { date: "May 9", compliance: 85 },
  { date: "May 10", compliance: 78 }
];

export const dailySLAPerformance = 83; // percentage

export const staffPerformance: PerformanceMetric[] = [
  {
    staffId: "s1",
    staffName: "Alex Johnson",
    casesResolved: 28,
    averageHandlingTime: 2.3,
    customerSatisfaction: 4.7
  },
  {
    staffId: "s2",
    staffName: "Morgan Lee",
    casesResolved: 25,
    averageHandlingTime: 2.5,
    customerSatisfaction: 4.5
  },
  {
    staffId: "s3",
    staffName: "Taylor Smith",
    casesResolved: 32,
    averageHandlingTime: 1.9,
    customerSatisfaction: 4.8
  },
  {
    staffId: "s4",
    staffName: "Jordan Chen",
    casesResolved: 22,
    averageHandlingTime: 2.8,
    customerSatisfaction: 4.3
  },
  {
    staffId: "s5",
    staffName: "Sam Rivera",
    casesResolved: 24,
    averageHandlingTime: 2.4,
    customerSatisfaction: 4.6
  }
];

export const categoryPerformance: CategoryPerformance[] = [
  {
    category: "Road Maintenance",
    averageResolutionTime: 3.2,
    volumePercentage: 28
  },
  {
    category: "Waste Management",
    averageResolutionTime: 2.1,
    volumePercentage: 15
  },
  {
    category: "Street Lighting",
    averageResolutionTime: 1.5,
    volumePercentage: 12
  },
  {
    category: "Water Supply",
    averageResolutionTime: 3.8,
    volumePercentage: 22
  },
  {
    category: "Sidewalk Repair",
    averageResolutionTime: 4.2,
    volumePercentage: 18
  },
  {
    category: "Others",
    averageResolutionTime: 2.5,
    volumePercentage: 5
  }
];

export const systemAverages = {
  responseTime: 2.7, // hours
  resolutionRate: 74, // percentage
  customerSatisfaction: 4.4 // out of 5
};
