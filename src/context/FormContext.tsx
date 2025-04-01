import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

// Define the type for the form state
interface FormState {
  personalInfo: {
    name: string
    email: string
    phone: string
  }
  complaintDetails: {
    title: string
    description: string
    category: string
  }
  location: {
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    pincode: string
  }
  files: File[]
}

// Define the context type
interface FormContextProps {
  formState: FormState
  setFormState: React.Dispatch<React.SetStateAction<FormState>>
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  stepCompleted: boolean[]
  progress: number
  validateStep: (step: number) => boolean
}

// Create the context with default values
const FormContext = createContext<FormContextProps | undefined>(undefined)

// Initial form state
const initialFormState: FormState = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
  },
  complaintDetails: {
    title: "",
    description: "",
    category: "general",
  },
  location: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  },
  files: [],
}

interface FormProviderProps {
  children: ReactNode
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [currentStep, setCurrentStep] = useState<number>(0)
  const [stepCompleted, setStepCompleted] = useState<boolean[]>([false, false, false, false, false])

  // Validation for each step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 0: // Personal information
        return !!formState.personalInfo.name && !!formState.personalInfo.email && !!formState.personalInfo.phone
      case 1: // Complaint details
        return (
          !!formState.complaintDetails.title &&
          !!formState.complaintDetails.description &&
          !!formState.complaintDetails.category
        )
      case 2: // Location
        return (
          !!formState.location.addressLine1 &&
          !!formState.location.city &&
          !!formState.location.state &&
          !!formState.location.pincode
        )
      case 3: // Files (Optional)
        return true
      case 4: // Review (Always valid if reached)
        return true
      default:
        return false
    }
  }

  // Update step completion status
  const updateStepCompletion = () => {
    const updatedSteps = [...stepCompleted]
    updatedSteps[currentStep] = validateStep(currentStep)
    setStepCompleted(updatedSteps)
  }

  // Calculate progress percentage
  const progress = (stepCompleted.filter((step) => step).length / stepCompleted.length) * 100

  return (
    <FormContext.Provider
      value={{
        formState,
        setFormState,
        currentStep,
        setCurrentStep,
        stepCompleted,
        progress,
        validateStep,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

// Custom hook to use the form context
export const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}
