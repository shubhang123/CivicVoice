import React from 'react';
import { ShieldCheck } from 'lucide-react';

type LogoProps = {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
};

const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const iconSizes = {
    sm: 20,
    md: 24,
    lg: 32,
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <div className="relative">
        <ShieldCheck
          size={iconSizes[size]}
          className="text-admin-blue animate-pulse-subtle"
          strokeWidth={2}
        />
        <div className="absolute inset-0 bg-admin-blue opacity-10 blur-md rounded-full transform scale-150"></div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className={`font-semibold ${textSizes[size]} text-admin-dark-gray leading-none tracking-tight`}>
            Admin<span className="text-admin-blue">Portal</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default Logo;