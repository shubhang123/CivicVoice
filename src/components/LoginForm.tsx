import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';

// You should update this with your actual API URL
const API_URL = 'http://localhost:3000';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate input
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    try {
      // Make the API call to your backend login endpoint
      const response = await axios.post(`${API_URL}/api/admin/login`, {
        email,
        password
      });

      // Handle successful response
      if (response.data && response.status === 200) {
        // Show success message
        toast.success('Login successful', {
          description: response.data.message || 'Welcome back to the admin portal'
        });
        
        // Navigate to dashboard after a small delay
        setTimeout(() => {
          navigate('/admin');
        }, 500);
      }
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle error response from the server
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        const errorMessage = error.response.data.message || 'Invalid email or password';
        setError(errorMessage);
      } else if (error.request) {
        // The request was made but no response was received
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request
        setError('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 animate-fade-up">
        {error && (
          <div className="flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 animate-fade-in">
            <AlertCircle size={16} />
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="form-input-animation pl-10 w-full h-11 rounded-md bg-white border border-gray-200 focus:outline-none px-4 py-2"
              autoComplete="email"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="form-input-animation pl-10 pr-10 w-full h-11 rounded-md bg-white border border-gray-200 focus:outline-none px-4 py-2"
              autoComplete="current-password"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-400 hover:text-gray-600 transition-colors" />
              ) : (
                <Eye size={18} className="text-gray-400 hover:text-gray-600 transition-colors" />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <a href="#" className="text-sm text-admin-blue hover:text-admin-light-blue transition-colors">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`submit-btn-animation w-full bg-admin-blue hover:bg-blue-600 hover:text-white text-black bg-slate-300 font-medium h-11 px-4 py-2 rounded-md shadow-sm transition-all ${
            isLoading ? 'opacity-80 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;