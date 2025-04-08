
import React from "react";
import { cn } from "@/lib/utils";

interface CircularProgressProps {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "success" | "warning" | "danger";
  showValue?: boolean;
  className?: string;
  label?: string;
}

export function CircularProgress({
  value,
  size = "md",
  color = "primary",
  showValue = true,
  className,
  label
}: CircularProgressProps) {
  const clampedValue = Math.max(0, Math.min(100, value));
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashoffset = circumference - (clampedValue / 100) * circumference;
  
  const sizeClasses = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-40 w-40"
  };
  
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl"
  };
  
  const colorClasses = {
    primary: "text-primary stroke-primary",
    secondary: "text-secondary-foreground stroke-secondary-foreground",
    success: "text-[hsl(160,84%,39%)] stroke-[hsl(160,84%,39%)]",
    warning: "text-[hsl(38,92%,50%)] stroke-[hsl(38,92%,50%)]",
    danger: "text-[hsl(0,84%,60%)] stroke-[hsl(0,84%,60%)]"
  };
  
  return (
    <div className={cn("relative inline-flex items-center justify-center", sizeClasses[size], className)}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="stroke-muted fill-none"
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
        />
        <circle
          className={cn("fill-none transition-all duration-500 ease-out", colorClasses[color])}
          cx="50"
          cy="50"
          r={radius}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("font-semibold", textSizeClasses[size])}>
            {clampedValue}%
          </span>
          {label && <span className="text-xs text-muted-foreground mt-1">{label}</span>}
        </div>
      )}
    </div>
  );
}
