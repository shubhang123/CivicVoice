import React, { useState } from "react";
import { Bell, X, AlertCircle, CheckCircle, InfoIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: "high" | "medium" | "low";
}

const NotificationsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "notif-1",
      title: "Additional Information Requested",
      description: "Please provide more details about your complaint to help with our investigation.",
      timestamp: "2 hours ago",
      read: false,
      priority: "high"
    },
    {
      id: "notif-2",
      title: "Status Update",
      description: "Your complaint has moved to the investigation phase.",
      timestamp: "1 day ago",
      read: true,
      priority: "medium"
    },
    {
      id: "notif-3",
      title: "Scheduled Inspection",
      description: "A team will visit the location on June 5th between 9AM-12PM.",
      timestamp: "2 days ago",
      read: true,
      priority: "medium"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getPriorityIcon = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "medium":
        return <InfoIcon className="h-4 w-4 text-amber-500" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          size="sm"
          className="gap-2 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bell className="h-4 w-4" />
          Notifications
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </div>

      {isOpen && (
        <div 
          className="absolute right-0 top-12 w-full max-w-md bg-background border rounded-lg shadow-lg z-10 overflow-hidden animate-fade-in"
        >
          <div className="p-3 bg-muted/40 flex justify-between items-center border-b">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all as read
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications
              </div>
            ) : (
              <div>
                {notifications.map((notification, index) => (
                  <div 
                    key={notification.id}
                    className={cn(
                      "p-3 border-b last:border-b-0 hover:bg-muted/40 transition-colors cursor-pointer relative",
                      notification.read ? "" : "bg-blue-50",
                      notification.priority === "high" && !notification.read && "bg-red-50"
                    )}
                    onClick={() => markAsRead(notification.id)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {!notification.read && (
                      <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-500" />
                    )}
                    <div className="ml-2">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-1">
                          {getPriorityIcon(notification.priority)}
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {notification.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                      <div className="flex justify-end mt-1">
                        <Button variant="ghost" size="sm" className="h-6 text-xs">
                          View details
                          <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;