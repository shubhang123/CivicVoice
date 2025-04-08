
export type Department = {
  id: string;
  name: string;
};

export type TimePeriod = "today" | "week" | "month" | "quarter" | "year";

export type TrendDirection = "up" | "down" | "neutral";

export type KPI = {
  label: string;
  value: string | number;
  trend: {
    direction: TrendDirection;
    value: string;
  };
  icon: string;
};

export type Priority = "high" | "medium" | "low";

export type ComplaintStatus = "new" | "assigned" | "in-progress" | "pending-input" | "resolved";

export type Complaint = {
  id: string;
  category: string;
  description: string;
  submittedAt: string;
  status: ComplaintStatus;
  priority: Priority;
  assignedTo?: Staff;
  priorityScore: number;
};

export type StaffStatus = "online" | "busy" | "offline";

export type Staff = {
  id: string;
  name: string;
  avatar?: string;
  status: StaffStatus;
  workload: number;
  casesResolved: number;
  averageHandlingTime: number;
  assignedCases: Complaint[];
};

export type SLAStatus = "on-track" | "at-risk" | "breached";

export type SLACase = {
  complaintId: string;
  deadline: string;
  status: SLAStatus;
};

export type PerformanceMetric = {
  staffId: string;
  staffName: string;
  casesResolved: number;
  averageHandlingTime: number;
  customerSatisfaction: number;
};

export type CategoryPerformance = {
  category: string;
  averageResolutionTime: number;
  volumePercentage: number;
};
