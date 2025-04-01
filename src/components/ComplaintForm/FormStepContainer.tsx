
import React from "react";
import { useFormContext } from "@/context/FormContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface FormStepContainerProps {
  children: React.ReactNode;
}

const FormStepContainer: React.FC<FormStepContainerProps> = ({ children }) => {
  const { currentStep, setCurrentStep, validateStep } = useFormContext();
  const childrenArray = React.Children.toArray(children);

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, childrenArray.length - 1));
    } else {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields before continuing.",
        variant: "destructive",
      });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="p-6 min-h-[500px] flex flex-col">
      <div className="flex-1">
        {childrenArray.map((child, index) => (
          <div 
            key={index} 
            className="transition-all duration-500 ease-in-out"
            style={{
              display: currentStep === index ? "block" : "none",
              opacity: currentStep === index ? 1 : 0,
              transform: `translateX(${(currentStep - index) * 50}px)`
            }}
          >
            {child}
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        
        {currentStep < childrenArray.length - 1 ? (
          <Button onClick={handleNext} className="gap-2">
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleNext} className="gap-2 bg-green-600 hover:bg-green-700">
            Submit Complaint
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormStepContainer;
