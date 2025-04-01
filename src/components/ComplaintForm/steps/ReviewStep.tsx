import React, { useState } from "react";
import { useFormContext } from "@/context/FormContext";
import { CheckCircle, ChevronDown, ChevronUp, MapPin, Paperclip, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface SectionProps {
  title: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  editAction?: () => void;
  children: React.ReactNode;
}

// Section component for each review section
const Section: React.FC<SectionProps> = ({ 
  title, 
  icon, 
  defaultOpen = true, 
  editAction, 
  children 
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-muted/30">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-medium">{title}</h3>
        </div>
        <div className="flex items-center gap-2">
          {editAction && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={(e) => {
                e.stopPropagation();
                editAction();
              }}
              className="h-8 w-8 text-muted-foreground hover:text-primary"
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <div className="p-4 text-sm">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
};

const ReviewStep: React.FC = () => {
  const { formState, setCurrentStep } = useFormContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Prepare form data for submission
      let submissionData;
      
      if (formState.files.length > 0) {
        // Use FormData to handle file uploads
        const formData = new FormData();
        
        // Add personal info
        formData.append('name', formState.personalInfo.name);
        formData.append('email', formState.personalInfo.email);
        formData.append('phone', formState.personalInfo.phone);
        
        // Add complaint details
        formData.append('title', formState.complaintDetails.title);
        formData.append('category', formState.complaintDetails.category);
        formData.append('description', formState.complaintDetails.description);
        
        // Add location data with updated structure
        formData.append('addressLine1', formState.location.addressLine1);
        formData.append('addressLine2', formState.location.addressLine2);
        formData.append('city', formState.location.city);
        formData.append('state', formState.location.state);
        formData.append('pincode', formState.location.pincode);
        
        // Add files
        formState.files.forEach((file) => {
          formData.append('files', file);
        });
        
        
        submissionData = formData;
      } else {
        // If no files, use JSON
        submissionData = {
          personalInfo: formState.personalInfo,
          complaintDetails: formState.complaintDetails,
          location: formState.location,
          files: [] // Empty array since there are no files
        };
      }
      
      // Set the appropriate headers for the request
      const config = {
        headers: formState.files.length > 0 
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' }
      };
      
      // Send data to backend API
      const response = await axios.post(
        'http://localhost:3000/api/complaints/submit',       
        submissionData,
        config
      );
      
      // Extract reference number from the backend response

      const referenceNumber = response.data.referenceNumber
      // const { referenceNumber } = referenceResponse.data;
      
      if (!referenceNumber) {
        throw new Error("Backend did not provide a reference number");
      }
      
      // Show success toast
      toast({
        title: "Complaint Submitted",
        description: "Your complaint has been submitted successfully. Reference #" + referenceNumber,
      });
      
      // Navigate to success page with the reference number from backend
      navigate(`/success?ref=${referenceNumber}`);
      
    } catch (error) {
      // Handle error
      console.error("Error submitting complaint:", error);
      
      let errorMessage = "Failed to submit complaint. Please try again.";
      if (axios.isAxiosError(error) && error.response) {
        // Use server provided error message if available
        errorMessage = error.response.data.message || errorMessage;
      }
      
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Review Your Complaint</h2>
      <p className="text-muted-foreground mb-6">
        Please review your complaint details before submitting. You can edit any section if needed.
      </p>

      <div className="space-y-4">
        <Section 
          title="Personal Information" 
          editAction={() => setCurrentStep(0)}
        >
          <div className="grid gap-2">
            <p><strong>Name:</strong> {formState.personalInfo.name}</p>
            <p><strong>Email:</strong> {formState.personalInfo.email}</p>
            <p><strong>Phone:</strong> {formState.personalInfo.phone}</p>
          </div>
        </Section>
        
        <Section 
          title="Complaint Details" 
          editAction={() => setCurrentStep(1)}
        >
          <div className="grid gap-2">
            <p><strong>Title:</strong> {formState.complaintDetails.title}</p>
            <p><strong>Category:</strong> {formState.complaintDetails.category}</p>
            <div>
              <p><strong>Description:</strong></p>
              <p className="bg-muted/30 p-3 rounded mt-1 whitespace-pre-wrap">
                {formState.complaintDetails.description}
              </p>
            </div>
          </div>
        </Section>
        
        <Section 
          title="Location" 
          icon={<MapPin className="w-4 h-4" />}
          editAction={() => setCurrentStep(2)}
        >
          <div className="grid gap-2">
            <p><strong>Address Line 1:</strong> {formState.location.addressLine1}</p>
            {formState.location.addressLine2 && (
              <p><strong>Address Line 2:</strong> {formState.location.addressLine2}</p>
            )}
            <p>
              <strong>City:</strong> {formState.location.city}, <strong>State:</strong> {formState.location.state}
            </p>
            <p><strong>Pincode:</strong> {formState.location.pincode}</p>
          </div>
        </Section>
        
        {formState.files.length > 0 && (
          <Section 
            title={`Attachments (${formState.files.length})`} 
            icon={<Paperclip className="w-4 h-4" />}
            editAction={() => setCurrentStep(3)}
          >
            <ul className="grid gap-2">
              {formState.files.map((file, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-xs px-2 py-1 bg-muted rounded-full mr-2">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                  {file.name}
                </li>
              ))}
            </ul>
          </Section>
        )}
        
        <div className="mt-8 text-center">
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-6 text-base bg-green-600 hover:bg-green-700 transition-all hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2"></span>
                Submitting...
              </>
            ) : (
              "Submit Complaint"
            )}
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            By submitting, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;