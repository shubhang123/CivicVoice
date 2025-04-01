import axios from 'axios';
import { Complaint } from '@/types';

// Create API client with the correct base URL
// For local development, this would point to your Express server
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Fallback to localhost if env var not set
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for handling auth tokens
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fetch complaints from the API
export const fetchComplaints = async (): Promise<Complaint[]> => {
  try {
    console.log('Fetching all complaints');
    const response = await apiClient.get('/complaints');
    console.log('API response data:', response.data);
    
    // Ensure we return an array even if the API doesn't
    if (!Array.isArray(response.data)) {
      console.warn('API did not return an array for complaints', response.data);
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw new Error('Failed to fetch complaints from API');
  }
};

// Fetch complaints for a specific department
export const fetchComplaintsByDepartment = async (department: string): Promise<Complaint[]> => {
  try {
    console.log(`Fetching complaints for department: ${department}`);
    const response = await apiClient.get(`/complaints/department/${department}`);
    console.log('Department complaints data:', response.data);
    
    // Ensure we return an array even if the API doesn't
    if (!Array.isArray(response.data)) {
      console.warn('API did not return an array for department complaints', response.data);
      return [];
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching complaints for department ${department}:`, error);
    throw new Error(`Failed to fetch complaints for department ${department}`);
  }
};

export default apiClient;
