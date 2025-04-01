import React, { useState } from "react";
import { MessageCircle, Send, PaperclipIcon, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  sender: "user" | "staff";
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    name: string;
    size: string;
    type: string;
  }[];
}

const CommunicationThread: React.FC = () => {
  const [expanded, setExpanded] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      sender: "staff",
      content: "Thank you for submitting your complaint. We have received it and will begin our investigation. Please provide any additional details that might help us resolve this matter more efficiently.",
      timestamp: "May 12, 2023 • 10:23 AM",
      read: true,
    },
    {
      id: "msg-2",
      sender: "user",
      content: "I've been experiencing this issue for over a week now. I've attached some photos showing the problem.",
      timestamp: "May 13, 2023 • 2:45 PM",
      read: true,
      attachments: [
        { name: "photo1.jpg", size: "2.4 MB", type: "image/jpeg" },
        { name: "document.pdf", size: "1.2 MB", type: "application/pdf" }
      ]
    },
    {
      id: "msg-3",
      sender: "staff",
      content: "We need some additional information to proceed with the investigation. Could you please provide the exact dates and times when you noticed this issue?",
      timestamp: "May 15, 2023 • 9:30 AM",
      read: false,
    }
  ]);

  const handleSubmitReply = () => {
    if (replyText.trim()) {
      const newMessage: Message = {
        id: `msg-${messages.length + 1}`,
        sender: "user",
        content: replyText,
        timestamp: new Date().toLocaleString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        read: true
      };
      
      setMessages([...messages, newMessage]);
      setReplyText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmitReply();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 border rounded-lg shadow-sm overflow-hidden">
      <div 
        className="bg-muted/40 p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          <h2 className="font-medium">Communication Thread</h2>
          <div className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            1 new
          </div>
        </div>
        <Button variant="ghost" size="sm">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>

      {expanded && (
        <div className="animate-accordion-down">
          <div className="max-h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={message.id}
                className={cn(
                  "flex gap-4 animate-fade-in",
                  message.sender === "user" ? "flex-row-reverse" : "",
                  !message.read && message.sender === "staff" && "relative"
                )}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {!message.read && message.sender === "staff" && (
                  <div className="absolute -left-1 top-0 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                )}
                <div className={cn(
                  "rounded-lg p-3 max-w-[80%]",
                  message.sender === "user" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted",
                  !message.read && message.sender === "staff" && "border-l-2 border-blue-500"
                )}>
                  <p className="text-sm mb-2">{message.content}</p>
                  
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((attachment, i) => (
                        <div 
                          key={i} 
                          className="flex items-center gap-2 p-2 bg-background/60 rounded text-xs"
                        >
                          <PaperclipIcon className="h-3.5 w-3.5" />
                          <span className="flex-1 truncate">{attachment.name}</span>
                          <span>{attachment.size}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className={cn(
                    "text-xs mt-1",
                    message.sender === "user" 
                      ? "text-primary-foreground/80" 
                      : "text-muted-foreground"
                  )}>
                    {message.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message here..."
              className="mb-3 min-h-24"
            />
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">
                <PaperclipIcon className="h-4 w-4 mr-1" />
                Attach File
              </Button>
              <Button onClick={handleSubmitReply} disabled={!replyText.trim()}>
                <Send className="h-4 w-4 mr-1" />
                Send Reply
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Ctrl+Enter to send
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationThread;