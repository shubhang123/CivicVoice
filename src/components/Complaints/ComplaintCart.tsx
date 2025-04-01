import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, UserIcon } from 'lucide-react';

interface Complaint {
  _id: string;
  referenceNumber: string;
  content_platform: string;
  content_platform_details: {
    post_id: string;
    date: string;
    content: string;
    username: string;
    url: string;
  };
  department: string;
  location: string,
  name: string;
  severity: string;
  summary: string;
  complaint_score: number;
}

interface ComplaintCardProps {
  complaint: Complaint;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'High':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    case 'Moderate':
      return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
    case 'Low':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "Date unavailable";

  // Convert "YYYY-MM-DD HH:MM:SS" to "YYYY-MM-DDTHH:MM:SS"
  const formattedDateString = dateString.replace(" ", "T");  

  const parsedDate = new Date(formattedDateString);
  
  if (isNaN(parsedDate.getTime())) {
    console.warn("Invalid date format:", dateString); // Debugging log
    return "Invalid date";
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true, // Convert to AM/PM format
  }).format(parsedDate);
};


const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <Badge 
            variant="outline" 
            className={`${getSeverityColor(complaint?.severity)} border-0 rounded-md`}
          >
            {complaint?.severity || "Unknown"}
          </Badge>
          
          <Badge 
            variant="outline" 
            className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            {complaint?.content_platform || "Unknown Platform"}
          </Badge>
        </div>
        <CardTitle className="text-lg font-medium leading-tight mt-2">
          {complaint?.summary || "No Summary Available"}
        </CardTitle>
        <CardDescription className="line-clamp-2 mt-1">
          {complaint?.department || "No Department Specified"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {complaint?.content_platform_details?.content || "No content available"}
        </p>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start space-y-2 text-xs text-muted-foreground pt-0">
      <div className="w-full flex justify-between items-center">
  <div className="flex items-center gap-1.5">
    <MapPinIcon className="h-3.5 w-3.5" />
    <span>{typeof complaint?.location === "string" ? complaint?.location : "Unknown Location"}</span>
  </div>

  <div className="flex items-center gap-1.5">
    <UserIcon className="h-3.5 w-3.5" />
    <span>{typeof complaint?.content_platform_details?.username === "string" ? complaint?.content_platform_details?.username : "Anonymous"}</span>
  </div>
</div>

        
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="h-3.5 w-3.5" />
          <span>{formatDate(complaint?.content_platform_details?.date)}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;