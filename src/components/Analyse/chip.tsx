import React from 'react';
import { cn } from '@/lib/utils';

interface ChipProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'severity-high' | 'severity-moderate' | 'severity-low';
}

export const Chip: React.FC<ChipProps> = ({ 
  children, 
  className,
  variant = 'primary'
}) => {
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
      variant === 'primary' && "bg-primary/10 text-primary",
      variant === 'secondary' && "bg-secondary text-secondary-foreground",
      variant === 'outline' && "border border-border bg-transparent",
      variant === 'severity-high' && "chip-severity-high",
      variant === 'severity-moderate' && "chip-severity-moderate",
      variant === 'severity-low' && "chip-severity-low",
      className
    )}>
      {children}
    </span>
  );
};