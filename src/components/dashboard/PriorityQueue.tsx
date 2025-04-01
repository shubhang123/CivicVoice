import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ArrowUp, ArrowDown, ListOrdered, CheckCircle, AlertCircle, Clock, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Simulated data for tasks
interface Task {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  assignee: string;
  status: "pending" | "in-progress" | "completed";
}

const generateRandomTask = (): Task => {
  const priorities = ["high", "medium", "low"] as const;
  const statuses = ["pending", "in-progress", "completed"] as const;
  const titles = [
    "Review quarterly financials",
    "Update customer database",
    "Finalize marketing strategy",
    "Prepare board presentation",
    "Audit compliance documentation",
    "Update inventory tracking system",
    "Conduct staff performance reviews",
    "Resolve customer support escalations",
    "Revise product roadmap"
  ];
  const assignees = [
    "John Smith", 
    "Maria Rodriguez", 
    "Alex Chen", 
    "Samantha Taylor", 
    "David Johnson"
  ];
  
  // Generate random date within next 14 days
  const today = new Date();
  const future = new Date();
  future.setDate(today.getDate() + Math.floor(Math.random() * 14));
  
  return {
    id: Math.random().toString(36).substring(2, 9),
    title: titles[Math.floor(Math.random() * titles.length)],
    description: "This task requires attention and needs to be completed according to company standards and protocols.",
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    dueDate: future.toISOString().split('T')[0],
    assignee: assignees[Math.floor(Math.random() * assignees.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
};

const generateInitialTasks = (count: number): Task[] => {
  return Array.from({ length: count }).map(() => generateRandomTask());
};

const PriorityQueue = () => {
  const [tasks, setTasks] = useState<Task[]>(generateInitialTasks(5));
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [newTaskOpen, setNewTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: new Date().toISOString().split('T')[0],
    assignee: "",
    status: "pending"
  });
  const { toast } = useToast();
  
  // Simulate new tasks arriving
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && tasks.length < 15) {
        const newTask = generateRandomTask();
        setTasks(prev => [newTask, ...prev]);
        
        toast({
          title: "New Task Added",
          description: `"${newTask.title}" has been added to the queue.`,
        });
      }
    }, 20000); // Check every 20 seconds
    
    return () => clearInterval(interval);
  }, [tasks.length, toast]);
  
  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };
  
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "pending": return <AlertCircle className="h-4 w-4 text-gray-500" />;
      default: return null;
    }
  };
  
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.effectAllowed = "move";
    // Create a ghost image
    const ghostElement = document.createElement("div");
    ghostElement.classList.add("bg-primary", "text-primary-foreground", "p-2", "rounded", "shadow-lg");
    ghostElement.textContent = "Moving task...";
    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 20, 20);
    
    // Clean up ghost after drag ends
    setTimeout(() => {
      document.body.removeChild(ghostElement);
    }, 0);
  };
  
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  
  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedTaskId !== null) {
      const draggedIndex = tasks.findIndex(task => task.id === draggedTaskId);
      if (draggedIndex !== -1 && draggedIndex !== targetIndex) {
        const newTasks = [...tasks];
        const [movedTask] = newTasks.splice(draggedIndex, 1);
        newTasks.splice(targetIndex, 0, movedTask);
        setTasks(newTasks);
        
        toast({
          title: "Task Reprioritized",
          description: `"${movedTask.title}" has been moved to position ${targetIndex + 1}.`,
        });
      }
      setDraggedTaskId(null);
    }
  };
  
  const moveTask = (taskId: string, direction: "up" | "down") => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (
      (direction === "up" && taskIndex > 0) || 
      (direction === "down" && taskIndex < tasks.length - 1)
    ) {
      const newTasks = [...tasks];
      const targetIndex = direction === "up" ? taskIndex - 1 : taskIndex + 1;
      
      // Swap positions
      [newTasks[taskIndex], newTasks[targetIndex]] = [newTasks[targetIndex], newTasks[taskIndex]];
      setTasks(newTasks);
      
      toast({
        title: "Task Reordered",
        description: `Task moved ${direction}.`,
      });
    }
  };
  
  const addNewTask = () => {
    if (!newTask.title || !newTask.assignee) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and assignee for the task.",
        variant: "destructive",
      });
      return;
    }
    
    const taskToAdd: Task = {
      id: Math.random().toString(36).substring(2, 9),
      title: newTask.title || "",
      description: newTask.description || "",
      priority: newTask.priority as "high" | "medium" | "low" || "medium",
      dueDate: newTask.dueDate || new Date().toISOString().split('T')[0],
      assignee: newTask.assignee || "",
      status: newTask.status as "pending" | "in-progress" | "completed" || "pending",
    };
    
    setTasks(prev => [taskToAdd, ...prev]);
    
    // Reset form and close dialog
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      dueDate: new Date().toISOString().split('T')[0],
      assignee: "",
      status: "pending"
    });
    setNewTaskOpen(false);
    
    toast({
      title: "Task Created",
      description: `"${taskToAdd.title}" has been added to the priority queue.`,
    });
  };
  
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Priority Queue</CardTitle>
            <CardDescription>Manage and prioritize tasks with drag and drop</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => setNewTaskOpen(true)}
          >
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[480px] overflow-auto pr-2">
          {tasks.map((task, index) => (
            <div 
              key={task.id}
              className="transition-all duration-200"
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
            >
              <Collapsible
                open={expandedTaskId === task.id}
                onOpenChange={(open) => setExpandedTaskId(open ? task.id : null)}
                className={`border rounded-md ${draggedTaskId === task.id ? 'opacity-50' : 'opacity-100'} ${
                  expandedTaskId === task.id ? 'shadow-md' : ''
                }`}
              >
                <div className={`flex items-center p-3 cursor-move ${
                  draggedTaskId === task.id ? 'bg-muted' : 'bg-card'
                }`}>
                  <div className={`w-3 h-3 rounded-full mr-3 ${getPriorityColor(task.priority)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="font-medium truncate flex-1">{task.title}</span>
                      <span className="ml-2 text-muted-foreground text-sm">{task.dueDate}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Assigned to {task.assignee}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center gap-1">
                        {getStatusIcon(task.status)}
                        {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveTask(task.id, "up");
                      }}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                        moveTask(task.id, "down");
                      }}
                      disabled={index === tasks.length - 1}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent>
                  <div className="p-4 pt-0 border-t">
                    <h4 className="font-medium mb-2">Description</h4>
                    <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                    
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setTasks(prev => prev.map(t => 
                            t.id === task.id ? { ...t, status: "completed" } : t
                          ));
                          setExpandedTaskId(null);
                          toast({
                            title: "Task Completed",
                            description: `"${task.title}" has been marked as completed.`,
                          });
                        }}
                      >
                        Mark Complete
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => {
                          setTasks(prev => prev.filter(t => t.id !== task.id));
                          toast({
                            title: "Task Removed",
                            description: `"${task.title}" has been removed from the queue.`,
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No tasks in the queue. Add a new task to get started.
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''} in queue
        </div>
        <div className="text-sm">
          Drag tasks to reorder priority
        </div>
      </CardFooter>
      
      {/* New Task Dialog */}
      <Dialog open={newTaskOpen} onOpenChange={setNewTaskOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
            <DialogDescription>
              Create a new task to add to the priority queue.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title" className="text-sm font-medium">Title</label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Task title"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="description" className="text-sm font-medium">Description</label>
              <Input
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Task description"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="priority" className="text-sm font-medium">Priority</label>
                <select
                  id="priority"
                  value={newTask.priority}
                  onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value as any }))}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="dueDate" className="text-sm font-medium">Due Date</label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="assignee" className="text-sm font-medium">Assignee</label>
              <Input
                id="assignee"
                value={newTask.assignee}
                onChange={(e) => setNewTask(prev => ({ ...prev, assignee: e.target.value }))}
                placeholder="Task assignee"
              />
            </div>
            
            <div className="grid gap-2">
              <label htmlFor="status" className="text-sm font-medium">Status</label>
              <select
                id="status"
                value={newTask.status}
                onChange={(e) => setNewTask(prev => ({ ...prev, status: e.target.value as any }))}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTaskOpen(false)}>Cancel</Button>
            <Button onClick={addNewTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PriorityQueue;