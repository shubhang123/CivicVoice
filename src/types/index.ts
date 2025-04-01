
export interface Complaint {
    _id: string;
    referenceNumber: string;
    content_platform: string;
    content_platform_details: {
      post_id: string;
      date: string;
      content: string;
      username: string;
      url: string;
    };
    department: string;
    location: string;
    name: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    summary: string;
    complaint_score: number;
    createdAt?: string; // For time-based analysis
  }
  
  export interface DepartmentManager {
    id: string;
    name: string;
    email: string;
    department: string;
  }
  
  export interface AuthState {
    isAuthenticated: boolean;
    user: DepartmentManager | null;
    loading: boolean;
    error: string | null;
  }
  
  export interface SeverityCount {
    severity: string;
    count: number;
  }
  
  export interface ScoreTrend {
    date: string;
    score: number;
  }
  
  export interface PlatformDistribution {
    platform: string;
    count: number;
    percentage: number;
  }
  
  export interface StatCardData {
    title: string;
    value: number | string;
    description: string;
    trend?: number;
    icon: React.ElementType;
  }