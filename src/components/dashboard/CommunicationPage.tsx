
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { complaints, staffMembers } from "@/lib/mockData";
import { AlertOctagon, Send, Paperclip, MessageSquare, AtSign, Users, Bell, Search, Filter, Inbox } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CommunicationPage = () => {
  const [activeChat, setActiveChat] = useState("");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationFilter, setNotificationFilter] = useState("all");

  // Mock conversations
  const conversations = [
    {
      id: "c1",
      name: "Alex Johnson",
      avatar: "/placeholder.svg",
      lastMessage: "I'll check that case and get back to you.",
      time: "10:30 AM",
      unread: 0
    },
    {
      id: "c2",
      name: "Morgan Lee",
      avatar: "/placeholder.svg",
      lastMessage: "Can you help with the urgent complaint from Main Street?",
      time: "Yesterday",
      unread: 2
    },
    {
      id: "c3",
      name: "Water Supply Team",
      avatar: "/placeholder.svg",
      lastMessage: "The inspection is scheduled for tomorrow at 9am.",
      time: "Yesterday",
      unread: 0,
      isGroup: true
    },
    {
      id: "c4",
      name: "Sam Rivera",
      avatar: "/placeholder.svg",
      lastMessage: "Thanks for the update on case #C1004.",
      time: "Mon",
      unread: 0
    }
  ];

  // Mock messages for a conversation
  const messages = [
    {
      id: "m1",
      sender: "Morgan Lee",
      avatar: "/placeholder.svg",
      text: "Hi, there's an urgent complaint about brown water in Cedar neighborhood (case #C1004). Can you take a look?",
      time: "10:15 AM",
      isMe: false
    },
    {
      id: "m2",
      sender: "Me",
      avatar: "/placeholder.svg",
      text: "Thanks for letting me know. I'll review it right away.",
      time: "10:20 AM",
      isMe: true
    },
    {
      id: "m3",
      sender: "Morgan Lee",
      avatar: "/placeholder.svg",
      text: "Great. We need to respond quickly as this is a high priority case. The residents are quite concerned.",
      time: "10:22 AM",
      isMe: false
    },
    {
      id: "m4",
      sender: "Me",
      avatar: "/placeholder.svg",
      text: "I just checked the case. I'll coordinate with the water supply team and send someone to investigate today.",
      time: "10:25 AM",
      isMe: true
    },
    {
      id: "m5",
      sender: "Morgan Lee",
      avatar: "/placeholder.svg",
      text: "Perfect! Can you also update the status in the system and let the resident know?",
      time: "10:28 AM",
      isMe: false
    }
  ];

  // Mock notifications
  const notifications = [
    {
      id: "n1",
      title: "New Complaint Assigned",
      description: "You've been assigned to handle complaint #C1006",
      time: "30 minutes ago",
      type: "assignment"
    },
    {
      id: "n2",
      title: "SLA Warning",
      description: "Complaint #C1002 is approaching SLA deadline",
      time: "1 hour ago",
      type: "sla"
    },
    {
      id: "n3",
      title: "Morgan Lee mentioned you",
      description: "In a comment on complaint #C1004",
      time: "2 hours ago",
      type: "mention"
    },
    {
      id: "n4",
      title: "Staff Meeting Reminder",
      description: "Department weekly meeting today at 2:00 PM",
      time: "3 hours ago",
      type: "reminder"
    },
    {
      id: "n5",
      title: "System Maintenance",
      description: "The system will be down for maintenance tonight from 11 PM to 1 AM",
      time: "5 hours ago",
      type: "system"
    }
  ];

  // Mock case comments
  const caseComments = {
    "C1004": [
      {
        id: "cc1",
        author: "Alex Johnson",
        avatar: "/placeholder.svg",
        text: "I've contacted the water utility. They're sending a team to investigate the issue.",
        time: "Yesterday at 2:15 PM",
        mentions: []
      },
      {
        id: "cc2",
        author: "Morgan Lee",
        avatar: "/placeholder.svg",
        text: "Thanks Alex. @Jane Smith can you follow up with the resident to let them know?",
        time: "Yesterday at 3:30 PM",
        mentions: ["Jane Smith"]
      },
      {
        id: "cc3",
        author: "Jane Smith",
        avatar: "/placeholder.svg",
        text: "I just called the resident and updated them. They appreciate the quick response.",
        time: "Yesterday at 4:10 PM",
        mentions: []
      }
    ],
    "C1006": [
      {
        id: "cc4",
        author: "Taylor Smith",
        avatar: "/placeholder.svg",
        text: "I've inspected the sinkhole on Elm Street. It's worse than initially reported and requires immediate attention.",
        time: "Today at 9:20 AM",
        mentions: []
      },
      {
        id: "cc5",
        author: "Jane Smith",
        avatar: "/placeholder.svg",
        text: "@Sam Rivera can we get emergency road barriers set up? This is a safety hazard.",
        time: "Today at 9:45 AM",
        mentions: ["Sam Rivera"]
      }
    ]
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been delivered."
    });
    
    setMessageText("");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Comment Added",
      description: "Your comment has been added to the case."
    });
    
    // Reset form
    (e.target as HTMLFormElement).reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Communication Center</h1>
        </div>

        <Tabs defaultValue="messages" className="space-y-4">
          <TabsList>
            <TabsTrigger value="messages">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="cases">
              <AlertOctagon className="h-4 w-4 mr-2" />
              Case Comments
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
              <Card className="col-span-1">
                <CardHeader className="py-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>Conversations</CardTitle>
                    <Button variant="ghost" size="icon">
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[calc(100vh-350px)]">
                    <div className="space-y-1 px-1">
                      {conversations.map((conversation) => (
                        <button
                          key={conversation.id}
                          className={`w-full flex items-start space-x-3 p-3 rounded-md hover:bg-accent transition-colors text-left ${
                            activeChat === conversation.id ? "bg-accent" : ""
                          }`}
                          onClick={() => setActiveChat(conversation.id)}
                        >
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.avatar} alt={conversation.name} />
                            <AvatarFallback>{conversation.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1 overflow-hidden">
                            <div className="flex justify-between items-center">
                              <div className="font-medium flex items-center">
                                {conversation.name}
                                {conversation.isGroup && (
                                  <Badge variant="outline" className="ml-2 text-xs">
                                    Group
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-muted-foreground whitespace-nowrap">
                                {conversation.time}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                          {conversation.unread > 0 && (
                            <Badge className="ml-auto">{conversation.unread}</Badge>
                          )}
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card className="col-span-2">
                {activeChat ? (
                  <>
                    <CardHeader className="py-4 border-b">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage 
                            src={conversations.find(c => c.id === activeChat)?.avatar || "/placeholder.svg"} 
                            alt={conversations.find(c => c.id === activeChat)?.name || ""}
                          />
                          <AvatarFallback>
                            {(conversations.find(c => c.id === activeChat)?.name || "").substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{conversations.find(c => c.id === activeChat)?.name}</CardTitle>
                          <CardDescription>Online now</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[calc(100vh-460px)] p-4">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <div
                              key={message.id}
                              className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
                            >
                              <div className={`flex ${message.isMe ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}>
                                {!message.isMe && (
                                  <Avatar className="h-8 w-8 mt-1">
                                    <AvatarImage src={message.avatar} alt={message.sender} />
                                    <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                )}
                                <div>
                                  <div className={`${
                                    message.isMe 
                                      ? "bg-primary text-primary-foreground" 
                                      : "bg-muted"
                                  } rounded-lg px-3 py-2 text-sm`}>
                                    {message.text}
                                  </div>
                                  <div className={`text-xs text-muted-foreground mt-1 ${message.isMe ? "text-right" : "text-left"}`}>
                                    {message.time}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="border-t p-3">
                      <div className="flex w-full items-center space-x-2">
                        <Button variant="outline" size="icon">
                          <Paperclip className="h-4 w-4" />
                        </Button>
                        <Textarea
                          placeholder="Type your message..."
                          className="min-h-10 flex-1"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <Button size="icon" onClick={handleSendMessage} disabled={!messageText.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Conversation Selected</h3>
                    <p className="text-sm text-muted-foreground text-center max-w-md mt-2">
                      Select a conversation from the list to start messaging or create a new conversation.
                    </p>
                    <Button className="mt-4">
                      <Users className="h-4 w-4 mr-2" />
                      New Conversation
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cases" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Case Comments & Threads</CardTitle>
                  <Select defaultValue="C1004">
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select case" />
                    </SelectTrigger>
                    <SelectContent>
                      {complaints.slice(0, 5).map((complaint) => (
                        <SelectItem key={complaint.id} value={complaint.id}>
                          {complaint.id}: {complaint.category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <CardDescription>
                  Track case discussions and add your comments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-450px)] pr-4">
                  <div className="space-y-6">
                    {caseComments["C1004"].map((comment) => (
                      <div key={comment.id} className="flex space-x-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={comment.avatar} alt={comment.author} />
                          <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{comment.time}</span>
                          </div>
                          <p className="text-sm">
                            {comment.mentions.length > 0 ? (
                              <>
                                {comment.text.split(/@([a-zA-Z ]+)/).map((part, index) => {
                                  if (index % 2 === 1 && comment.mentions.includes(part)) {
                                    return (
                                      <span key={index} className="text-primary font-medium">
                                        @{part}
                                      </span>
                                    );
                                  }
                                  return part;
                                })}
                              </>
                            ) : (
                              comment.text
                            )}
                          </p>
                          <div className="flex space-x-2 pt-1">
                            <button className="text-xs text-muted-foreground hover:text-foreground">
                              Reply
                            </button>
                            <button className="text-xs text-muted-foreground hover:text-foreground">
                              React
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t p-4">
                <form onSubmit={handleAddComment} className="w-full space-y-2">
                  <div className="flex space-x-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg" alt="Your Avatar" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <Textarea 
                        placeholder="Add your comment..." 
                        className="min-h-20" 
                        name="comment"
                        required
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <Button type="button" variant="outline" size="sm">
                            <Paperclip className="h-3.5 w-3.5 mr-1" />
                            Attach
                          </Button>
                          <Button type="button" variant="outline" size="sm">
                            <AtSign className="h-3.5 w-3.5 mr-1" />
                            Mention
                          </Button>
                        </div>
                        <Button type="submit" size="sm">Post Comment</Button>
                      </div>
                    </div>
                  </div>
                </form>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Notifications</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={notificationFilter}
                      onValueChange={setNotificationFilter}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Filter" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="assignment">Assignments</SelectItem>
                        <SelectItem value="sla">SLA Alerts</SelectItem>
                        <SelectItem value="mention">Mentions</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Bell className="h-3.5 w-3.5 mr-1" />
                      Mark all read
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Stay updated with the latest alerts and mentions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-380px)]">
                  <div className="space-y-1">
                    {notifications
                      .filter(n => notificationFilter === 'all' || n.type === notificationFilter)
                      .map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start space-x-4 p-3 hover:bg-accent rounded-md transition-colors"
                        >
                          <div className={`p-2 rounded-full 
                            ${notification.type === 'assignment' ? 'bg-blue-100 text-blue-700' : ''}
                            ${notification.type === 'sla' ? 'bg-amber-100 text-amber-700' : ''}
                            ${notification.type === 'mention' ? 'bg-purple-100 text-purple-700' : ''}
                            ${notification.type === 'reminder' ? 'bg-green-100 text-green-700' : ''}
                            ${notification.type === 'system' ? 'bg-gray-100 text-gray-700' : ''}
                          `}>
                            {notification.type === 'assignment' && <Inbox className="h-4 w-4" />}
                            {notification.type === 'sla' && <AlertOctagon className="h-4 w-4" />}
                            {notification.type === 'mention' && <AtSign className="h-4 w-4" />}
                            {notification.type === 'reminder' && <Bell className="h-4 w-4" />}
                            {notification.type === 'system' && <MessageSquare className="h-4 w-4" />}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between">
                              <p className="font-medium text-sm">{notification.title}</p>
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{notification.description}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="border-t py-3">
                <div className="text-xs text-muted-foreground">
                  Showing {notifications.filter(n => notificationFilter === 'all' || n.type === notificationFilter).length} notifications
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default CommunicationPage;
