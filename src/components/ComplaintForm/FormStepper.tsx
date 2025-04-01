
import React from "react";
import { useFormContext } from "@/context/FormContext";
import { Progress } from "@/components/ui/progress";
import { Check, User, MessageSquare, MapPin, FileText, Send } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { name: "Personal Info", icon: User },
  { name: "Complaint", icon: MessageSquare },
  { name: "Location", icon: MapPin },
  { name: "Files", icon: FileText },
  { name: "Review", icon: Send },
];

const FormStepper: React.FC = () => {
  const { currentStep, setCurrentStep, stepCompleted, progress } = useFormContext();

  return (
    <div className="p-6 pb-0">
      <div className="flex justify-between mb-2">
        {steps.map((step, index) => {
          const completed = stepCompleted[index];
          const isActive = currentStep === index;
          const Icon = step.icon;

          return (
            <div 
              key={index} 
              className="flex flex-col items-center relative group"
              onClick={() => {
                // Allow going back to previous steps
                if (index <= currentStep) {
                  setCurrentStep(index);
                }
              }}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-primary text-primary-foreground scale-110 shadow-md"
                    : completed
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {completed ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
              </div>
              <span 
                className={cn(
                  "text-xs mt-2 transition-all duration-300 hidden md:block",
                  isActive ? "text-primary font-medium" : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
              
              {/* Mobile tooltip for step names */}
              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-black text-white text-xs rounded p-1 whitespace-nowrap md:hidden">
                {step.name}
              </div>
            </div>
          );
        })}
      </div>
      <Progress 
        value={progress} 
        className="h-2 mb-6 bg-muted"
        aria-label="Form progress"
      />
    </div>
  );
};

export default FormStepper;
