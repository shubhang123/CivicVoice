import { DepartmentManager } from '@/types';
import { mockLogin } from './mockData';

// Token storage keys
const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

// Helper functions for token management
export const setAuthToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Helper functions for user data management
export const setUserData = (user: DepartmentManager): void => {
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
};

export const getUserData = (): DepartmentManager | null => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return userData ? JSON.parse(userData) : null;
};

export const removeUserData = (): void => {
  localStorage.removeItem(USER_DATA_KEY);
};

// Authentication operations
export const login = async (email: string, password: string): Promise<DepartmentManager> => {
  try {
    // For a real app, this would make an API call
    const user = await mockLogin(email, password);
    
    // Generate a mock JWT token (in a real app, this would come from the server)
    const mockToken = `mock.${btoa(JSON.stringify({ id: user.id, department: user.department }))}.token`;
    
    // Store auth data
    setAuthToken(mockToken);
    setUserData(user);
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const logout = (): void => {
  removeAuthToken();
  removeUserData();
};

export const checkAuth = (): boolean => {
  return !!getAuthToken() && !!getUserData();
};

// For protecting routes/data
export const isAuthorizedForDepartment = (department: string): boolean => {
  const user = getUserData();
  if (!user) return false;
  return user.department === department;
};
