
import React, { useState, useEffect } from "react";
import { useFormContext } from "@/context/FormContext";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

const ComplaintDetailsStep: React.FC = () => {
  const { formState, setFormState } = useFormContext();
  const [title, setTitle] = useState(formState.complaintDetails.title);
  const [description, setDescription] = useState(formState.complaintDetails.description);
  const [category, setCategory] = useState(formState.complaintDetails.category);
  
  // Simulated AI analysis state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sentimentScore, setSentimentScore] = useState<number | null>(null);
  const [aiTimeout, setAiTimeout] = useState<NodeJS.Timeout | null>(null);

  // Simulate AI analysis when description changes
  useEffect(() => {
    if (description.length > 10) {
      setIsAnalyzing(true);
      
      // Clear previous timeout if exists
      if (aiTimeout) clearTimeout(aiTimeout);
      
      // Set new timeout for AI analysis simulation
      const timeout = setTimeout(() => {
        // Simple sentiment calculation for demo
        const score = Math.random() * 100;
        setSentimentScore(score);
        setIsAnalyzing(false);
      }, 1500);
      
      setAiTimeout(timeout);
    } else {
      setSentimentScore(null);
      setIsAnalyzing(false);
    }
    
    return () => {
      if (aiTimeout) clearTimeout(aiTimeout);
    };
  }, [description]);

  // Update form state when fields change
  useEffect(() => {
    setFormState(prev => ({
      ...prev,
      complaintDetails: {
        title,
        description,
        category,
      }
    }));
  }, [title, description, category, setFormState]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Complaint Details</h2>
      <p className="text-muted-foreground mb-6">
        Please provide details about your complaint. Be as specific as possible.
      </p>

      <div className="space-y-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Complaint Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your complaint in a few words"
            className="transition-all focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger className="transition-all focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="product">Product Issue</SelectItem>
              <SelectItem value="service">Service Issue</SelectItem>
              <SelectItem value="billing">Billing Problem</SelectItem>
              <SelectItem value="delivery">Delivery Problem</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="description">Description</Label>
            {isAnalyzing && (
              <div className="flex items-center text-xs text-muted-foreground animate-pulse">
                <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                AI analyzing...
              </div>
            )}
          </div>
          
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please describe your complaint in detail"
            className="min-h-[200px] transition-all focus:ring-2 focus:ring-primary/20"
          />
          
          {sentimentScore !== null && !isAnalyzing && (
            <div className="mt-2 text-sm">
              <div 
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  sentimentScore > 60 
                    ? "bg-red-100 text-red-800" 
                    : sentimentScore > 30 
                    ? "bg-yellow-100 text-yellow-800" 
                    : "bg-green-100 text-green-800"
                }`}
              >
                {sentimentScore > 60 
                  ? "Your tone appears frustrated" 
                  : sentimentScore > 30 
                  ? "Your tone appears concerned" 
                  : "Your tone appears neutral"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailsStep;
