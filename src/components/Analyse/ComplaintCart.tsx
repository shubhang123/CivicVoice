import React, { useState } from 'react';
import { Complaint } from '@/services/api';
import { Calendar, Clock, MapPin, Share2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ComplaintCardProps {
  complaint: Complaint;
}



const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const content = complaint.content_platform_details?.content || '';
  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Format location
  const formatLocation = (location: any) => {
    if (!location) return "Location not available";
    if (typeof location === "string") return location; // If already a string
    return `${location.addressLine1}, ${location.city}, ${location.state} - ${location.pincode}`;
  };

  // Get severity class
  const getSeverityClass = () => {
    switch (complaint.severity) {
      case 'High': return 'chip-severity-high';
      case 'Moderate': return 'chip-severity-moderate';
      case 'Low': return 'chip-severity-low';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  // Truncate content for preview
  const truncateContent = (content?: string, maxLength: number = 120) => {
    if (!content) return ''; // Return an empty string if content is undefined
    if (content.length <= maxLength) return content;
    return content.slice(0, maxLength) + '...';
  };

  return (
    <>
      <div className="data-card" onClick={() => setIsOpen(true)}>
        <div className="flex justify-between items-start mb-1">
          <span className={`chip ${getSeverityClass()}`}>
            {complaint.severity}
          </span>
          <span className="text-xs text-muted-foreground">
            {complaint.content_platform}
          </span>
        </div>

        <h3 className="font-medium text-base line-clamp-2 mb-1 leading-tight">
          {complaint.summary}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {truncateContent(content)}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-auto">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{formatLocation(complaint.location)}</span>
          <span className="ml-auto flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {/* {formatDate(complaint.content_platform_details.date)} */}
          </span>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-start gap-2 mb-1">
              <span className={`chip ${getSeverityClass()}`}>
                {complaint.severity}
              </span>
              <span className="chip bg-secondary text-secondary-foreground">
                {complaint.department}
              </span>
              <span className="chip bg-primary/10 text-primary">
                {complaint.content_platform}
              </span>
            </div>
            <DialogTitle>{complaint.summary}</DialogTitle>
            <DialogDescription>
              <div className="flex items-center gap-2 text-xs my-2">
                <MapPin className="h-3 w-3" />
                <span>{formatLocation(complaint.location)}</span>
                <span className="ml-auto flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {/* {formatDate(complaint.content_platform_details.date)} */}
                </span>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="bg-muted/30 p-4 rounded-lg my-2 max-h-[300px] overflow-y-auto text-sm whitespace-pre-line">
            {/* {complaint.content_platform_details.content} */}
          </div>

          <div className="grid grid-cols-2 gap-2 my-2">
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="text-xs text-muted-foreground">Username</div>
              {/* <div className="font-medium">{complaint.content_platform_details.username}</div> */}
            </div>
            <div className="p-3 rounded-lg bg-muted/30">
              <div className="text-xs text-muted-foreground">Complaint Score</div>
              <div className="font-medium">
                {complaint.complaint_score !== undefined
                  ? complaint.complaint_score.toFixed(2)
                  : 'N/A'}
              </div>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            {/* <a 
              href={complaint.content_platform_details.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button size="sm" className="gap-1">
                <ExternalLink className="h-4 w-4" />
                View Source
              </Button>
            </a> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ComplaintCard;
