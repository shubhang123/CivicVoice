import React from 'react';
import Logo from '@/components/Logo';
import LoginForm from './LoginForm';


const LoginContainer: React.FC = () => {
  return (
    <div className="w-full max-w-md">
      <div className="glass-card relative rounded-2xl p-8 sm:p-10 shadow-admin animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight mb-1 animate-slide-in">
            Welcome Back
          </h2>
          <p className="text-gray-500 animate-slide-in" style={{animationDelay: "0.1s"}}>
            Sign in to access your admin dashboard
          </p>
        </div>
        
        <LoginForm />
        
        <div className="mt-8 pt-6 text-center text-sm text-gray-500 border-t border-gray-100">
          <p>
            Having trouble signing in?{' '}
            <a href="#" className="text-admin-blue hover:text-admin-light-blue transition-colors">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;