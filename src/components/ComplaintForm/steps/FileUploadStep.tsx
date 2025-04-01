
import React, { useState, useRef, useCallback } from "react";
import { useFormContext } from "@/context/FormContext";
import { FileText, Upload, X, File, Image, Paperclip } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const FileUploadStep: React.FC = () => {
  const { formState, setFormState } = useFormContext();
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulate file upload progress
  const simulateUploadProgress = useCallback((fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
    }, 200);
    
    return interval;
  }, []);

  // Handle file selection
  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    
    const newFiles: File[] = [];
    const intervals: NodeJS.Timeout[] = [];
    
    Array.from(files).forEach(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 5MB limit.`,
          variant: "destructive",
        });
        return;
      }
      
      const fileId = `${file.name}-${Date.now()}`;
      newFiles.push(file);
      
      // Start simulating upload progress
      const interval = simulateUploadProgress(fileId);
      intervals.push(interval);
    });
    
    if (newFiles.length > 0) {
      setFormState(prev => ({
        ...prev,
        files: [...prev.files, ...newFiles]
      }));
      
      // Clear intervals after "upload" is complete
      setTimeout(() => {
        intervals.forEach(clearInterval);
      }, 3000);
    }
  }, [setFormState, simulateUploadProgress]);

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop event
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Clear the input value to allow uploading the same file again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Remove file
  const removeFile = (index: number) => {
    setFormState(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  // Get file icon based on type
  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Image className="w-5 h-5 text-blue-500" />;
    } else if (file.type === "application/pdf") {
      return <FileText className="w-5 h-5 text-red-500" />;
    } else {
      return <Paperclip className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-6">Supporting Documents</h2>
      <p className="text-muted-foreground mb-6">
        Upload any photos, documents, or other files that support your complaint (optional).
      </p>

      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
          dragActive 
            ? "border-primary bg-primary/5 scale-[1.01]" 
            : "border-muted-foreground/20"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full bg-muted transition-transform ${dragActive ? "scale-110" : ""}`}>
            <Upload className="w-8 h-8 text-primary" />
          </div>
          <div>
            <p className="font-medium">
              Drag & drop files here, or{" "}
              <button
                type="button"
                className="text-primary hover:underline focus:outline-none"
                onClick={() => fileInputRef.current?.click()}
              >
                browse
              </button>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports images, PDFs, and documents up to 5MB each
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleChange}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </div>
      </div>

      {formState.files.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="font-medium">Uploaded Files ({formState.files.length})</h3>
          <div className="grid gap-3">
            {formState.files.map((file, index) => {
              const fileId = `${file.name}-${index}`;
              const progress = uploadProgress[fileId] || 100;
              
              return (
                <div 
                  key={fileId} 
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border animate-fade-in"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-background rounded">
                      {getFileIcon(file)}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {progress < 100 ? (
                      <div className="w-20">
                        <Progress value={progress} className="h-1" />
                      </div>
                    ) : null}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadStep;
