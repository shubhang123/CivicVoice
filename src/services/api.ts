// import axios from 'axios';
// import { Complaint } from './analyticsService';

// // Create an API client
// const apiClient = axios.create({
//   baseURL: '/api', // This will be handled by our proxy configuration
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Fetch complaints from our API
// export const fetchComplaintsFromApi = async (): Promise<Complaint[]> => {
//   try {
//     const response = await apiClient.get('/complaints');
//     console.log(response.data)
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching complaints:', error);
//     throw new Error('Failed to fetch complaints from API');
//   }
// };

import axios from 'axios';

// Define the Complaint type directly to avoid circular imports
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
  location: string,
  name: string;
  severity: string;
  summary: string;
  complaint_score: number;
}


// Create an API client
const apiClient = axios.create({
  baseURL: '/api', // This will be handled by our proxy configuration
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch complaints from our API
export const fetchComplaintsFromApi = async (): Promise<Complaint[]> => {
  try {
    const response = await apiClient.get('/complaints');
    return response.data;
    console.log(response.data)
    
    console.log('Fetching complaints from API');
    // For now, we'll throw an error to use mock data since we don't have a real API
    throw new Error('API not implemented yet');
    
    
    
     
  } catch (error) {
    console.error('Error fetching complaints:', error);
    throw new Error('Failed to fetch complaints from API');
  }
};
