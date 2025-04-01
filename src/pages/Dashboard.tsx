import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import MetricsOverview from "@/components/dashboard/MetricsOverview";
import AIInsights from "@/components/dashboard/AIInsights";
import PriorityQueue from "@/components/dashboard/PriorityQueue";
import DepartmentAssignment from "@/components/dashboard/DepartmentAssignment";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { toast } = useToast();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    toast({
      title: `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} mode activated`,
      duration: 2000,
    });
  };

  return (
    <div className={`min-h-screen bg-background transition-colors duration-300`}>
      <header className="border-b bg-card px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Citizen Complaint Management System</h1>
          <Button variant="outline" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto p-4">
        <MetricsOverview />
        
        <ResizablePanelGroup className="my-8" direction="horizontal">
          <ResizablePanel defaultSize={50}>
            <AIInsights />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={50}>
            <PriorityQueue />
          </ResizablePanel>
        </ResizablePanelGroup>
        
        <DepartmentAssignment />
      </main>
      
      <footer className="border-t bg-card p-4 text-center text-sm text-muted-foreground">
        Citizen Complaint Management System © {new Date().getFullYear()} | Government Service Portal
      </footer>
    </div>
  );
};

export default Dashboard;