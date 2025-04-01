
import React from "react";
import { FormProvider } from "@/context/FormContext";
import FormStepper from "./FormStepper";
import FormStepContainer from "./FormStepContainer";
import PersonalInfoStep from "./steps/PersonalInfoStep";
import ComplaintDetailsStep from "./steps/ComplaintDetailsStep";
import LocationStep from "./steps/LocationStep";
import FileUploadStep from "./steps/FileUploadStep";
import ReviewStep from "./steps/ReviewStep";
import { Card, CardContent } from "@/components/ui/card";

const ComplaintForm: React.FC = () => {
  return (
    <FormProvider>
      <div className="w-full max-w-5xl mx-auto p-4 md:p-6">
        <Card className="border-none shadow-lg bg-white/80 backdrop-blur-sm mt-16">
          <CardContent className="p-0">
            <FormStepper />
            <FormStepContainer>
              <PersonalInfoStep />
              <ComplaintDetailsStep />
              <LocationStep />
              <FileUploadStep />
              <ReviewStep />
            </FormStepContainer>
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
};

export default ComplaintForm;
