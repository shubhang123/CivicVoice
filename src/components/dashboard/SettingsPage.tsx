
import React, { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { 
  User, Settings, Bell, Lock, Shield, Building, Languages, Clock, 
  Palette, Mail, FileText, Database, UserCog, ChevronRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SettingsPage = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailDigestEnabled, setEmailDigestEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoAssignEnabled, setAutoAssignEnabled] = useState(true);
  const [compactViewEnabled, setCompactViewEnabled] = useState(false);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC-5");
  const [theme, setTheme] = useState("default");

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully."
    });
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved."
    });
  };

  const handleSaveAppearance = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Appearance Settings Updated",
      description: "Your display preferences have been saved."
    });
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been updated successfully."
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Requested",
      description: "Your data export is being prepared and will be emailed to you."
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <div className="flex">
            <div className="w-64 mr-6">
              <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
                <TabsTrigger value="profile" className="w-full justify-start px-3 py-2 h-9">
                  <User className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start px-3 py-2 h-9">
                  <Bell className="h-4 w-4 mr-2" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="w-full justify-start px-3 py-2 h-9">
                  <Palette className="h-4 w-4 mr-2" />
                  <span>Appearance</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="w-full justify-start px-3 py-2 h-9">
                  <Lock className="h-4 w-4 mr-2" />
                  <span>Security</span>
                </TabsTrigger>
                <TabsTrigger value="department" className="w-full justify-start px-3 py-2 h-9">
                  <Building className="h-4 w-4 mr-2" />
                  <span>Department</span>
                </TabsTrigger>
                <TabsTrigger value="system" className="w-full justify-start px-3 py-2 h-9">
                  <Settings className="h-4 w-4 mr-2" />
                  <span>System</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1">
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account details and profile information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPEG, PNG or GIF. Max size 1MB.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Jane" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Smith" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="jane.smith@example.gov" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" defaultValue="(555) 123-4567" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="jobTitle">Job Title</Label>
                          <Input id="jobTitle" defaultValue="Department Manager" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Input id="bio" defaultValue="Managing public works complaints and service delivery." />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English (US)</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select value={timezone} onValueChange={setTimezone}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                            <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                            <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                            <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button type="submit">Save Changes</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Configure how and when you receive notifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveNotifications} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Enable Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive notifications about system updates and cases
                            </p>
                          </div>
                          <Switch 
                            checked={notificationsEnabled} 
                            onCheckedChange={setNotificationsEnabled} 
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Notification Types</h3>
                          
                          {[
                            { 
                              title: "New Complaints", 
                              description: "When new complaints are submitted to your department",
                              defaultChecked: true
                            },
                            { 
                              title: "Complaint Updates", 
                              description: "When there are updates to complaints you're assigned to",
                              defaultChecked: true
                            },
                            { 
                              title: "SLA Alerts", 
                              description: "When cases are approaching their SLA deadlines",
                              defaultChecked: true
                            },
                            { 
                              title: "Staff Mentions", 
                              description: "When you are mentioned in comments or messages",
                              defaultChecked: true
                            },
                            { 
                              title: "System Announcements", 
                              description: "Important system updates and maintenance notifications",
                              defaultChecked: false
                            },
                          ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <div>
                                <Label>{item.title}</Label>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                              <Switch defaultChecked={item.defaultChecked} disabled={!notificationsEnabled} />
                            </div>
                          ))}
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium">Delivery Methods</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { title: "In-App", icon: Bell, defaultChecked: true },
                              { title: "Email", icon: Mail, defaultChecked: true },
                              { title: "Mobile Push", icon: Bell, defaultChecked: false },
                            ].map((method, index) => (
                              <div key={index} className="space-y-2 border rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2">
                                    <method.icon className="h-4 w-4" />
                                    <Label>{method.title}</Label>
                                  </div>
                                  <Switch defaultChecked={method.defaultChecked} disabled={!notificationsEnabled} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Daily Email Digest</Label>
                            <p className="text-sm text-muted-foreground">
                              Receive a daily summary of all important notifications
                            </p>
                          </div>
                          <Switch 
                            checked={emailDigestEnabled} 
                            onCheckedChange={setEmailDigestEnabled} 
                            disabled={!notificationsEnabled}
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" disabled={!notificationsEnabled}>Save Preferences</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>
                      Customize how the application looks and feels
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveAppearance} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Dark Mode</Label>
                            <p className="text-sm text-muted-foreground">
                              Switch between light and dark theme
                            </p>
                          </div>
                          <Switch 
                            checked={darkModeEnabled} 
                            onCheckedChange={setDarkModeEnabled} 
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label>Color Theme</Label>
                          <Select value={theme} onValueChange={setTheme}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Default Blue</SelectItem>
                              <SelectItem value="teal">Teal</SelectItem>
                              <SelectItem value="violet">Violet</SelectItem>
                              <SelectItem value="green">Green</SelectItem>
                              <SelectItem value="rose">Rose</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Compact View</Label>
                            <p className="text-sm text-muted-foreground">
                              Show more information with reduced spacing
                            </p>
                          </div>
                          <Switch 
                            checked={compactViewEnabled} 
                            onCheckedChange={setCompactViewEnabled} 
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label>Font Size</Label>
                          <Select defaultValue="medium">
                            <SelectTrigger>
                              <SelectValue placeholder="Select font size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium (Default)</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                              <SelectItem value="xlarge">Extra Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Default View</Label>
                          <Select defaultValue="board">
                            <SelectTrigger>
                              <SelectValue placeholder="Select default view" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="board">Board View (Kanban)</SelectItem>
                              <SelectItem value="list">List View</SelectItem>
                              <SelectItem value="calendar">Calendar View</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <Button type="submit">Save Settings</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and account security
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSaveSecurity} className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Change Password</h3>
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                        
                        <Button type="button" variant="outline">Change Password</Button>
                        
                        <Separator />
                        
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Enable 2FA</Label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch defaultChecked={false} />
                        </div>
                        
                        <Separator />
                        
                        <h3 className="text-lg font-medium">Session Management</h3>
                        <div className="space-y-2">
                          <div className="rounded-md border p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">Current Session</p>
                                <p className="text-sm text-muted-foreground">Windows 10 • Chrome • Boston, USA</p>
                                <p className="text-xs text-muted-foreground">Started 2 hours ago</p>
                              </div>
                              <Badge>Active</Badge>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Sign out of all sessions</Button>
                        </div>
                      </div>
                      
                      <Button type="submit">Save Security Settings</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="department" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Department Settings</CardTitle>
                    <CardDescription>
                      Configure settings for your department workflow
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label className="text-base">Auto-assign Complaints</Label>
                            <p className="text-sm text-muted-foreground">
                              Automatically assign new complaints based on workload balancing
                            </p>
                          </div>
                          <Switch 
                            checked={autoAssignEnabled} 
                            onCheckedChange={setAutoAssignEnabled} 
                          />
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label>SLA Templates</Label>
                          <Select defaultValue="standard">
                            <SelectTrigger>
                              <SelectValue placeholder="Select SLA template" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard SLA (24h response)</SelectItem>
                              <SelectItem value="priority">Priority Cases (12h response)</SelectItem>
                              <SelectItem value="emergency">Emergency Cases (4h response)</SelectItem>
                              <SelectItem value="custom">Custom Template</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="outline" size="sm" className="mt-2">
                            Manage SLA Templates
                          </Button>
                        </div>
                        
                        <Separator />
                        
                        <div className="space-y-2">
                          <Label>Department Members</Label>
                          <div className="rounded-md border">
                            <div className="divide-y">
                              {[
                                { name: "Jane Smith", role: "Department Manager", email: "jane@example.gov" },
                                { name: "Alex Johnson", role: "Senior Staff", email: "alex@example.gov" },
                                { name: "Morgan Lee", role: "Staff", email: "morgan@example.gov" },
                                { name: "Taylor Smith", role: "Staff", email: "taylor@example.gov" },
                              ].map((member, index) => (
                                <div key={index} className="flex items-center justify-between p-3">
                                  <div className="flex items-center space-x-3">
                                    <Avatar className="h-8 w-8">
                                      <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <p className="font-medium">{member.name}</p>
                                      <p className="text-xs text-muted-foreground">{member.role} • {member.email}</p>
                                    </div>
                                  </div>
                                  <Button variant="ghost" size="icon">
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-2">
                            <Button variant="outline" size="sm">
                              Manage Members
                            </Button>
                            <Button variant="outline" size="sm">
                              Invite New
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Button>Save Department Settings</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>System Settings</CardTitle>
                    <CardDescription>
                      Advanced system options and data management
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          {
                            title: "Export Data",
                            description: "Download all your department data",
                            icon: FileText,
                            action: "Export",
                            onClick: handleExportData
                          },
                          {
                            title: "System Logs",
                            description: "View activity and error logs",
                            icon: Database,
                            action: "View Logs"
                          },
                          {
                            title: "Role Permissions",
                            description: "Configure staff access levels",
                            icon: Shield,
                            action: "Configure"
                          },
                          {
                            title: "API Access",
                            description: "Manage API keys and access",
                            icon: Lock,
                            action: "Manage"
                          },
                          {
                            title: "Integrations",
                            description: "Connect with other systems",
                            icon: Settings,
                            action: "Configure"
                          },
                          {
                            title: "User Accounts",
                            description: "Manage all system users",
                            icon: UserCog,
                            action: "Manage"
                          },
                        ].map((item, index) => (
                          <Card key={index} className="border shadow-none">
                            <CardHeader className="pb-2">
                              <div className="flex items-center space-x-2">
                                <item.icon className="h-5 w-5 text-muted-foreground" />
                                <CardTitle className="text-lg">{item.title}</CardTitle>
                              </div>
                            </CardHeader>
                            <CardContent className="pb-2">
                              <CardDescription>{item.description}</CardDescription>
                            </CardContent>
                            <CardFooter>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full"
                                onClick={item.onClick}
                              >
                                {item.action}
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium">System Information</h3>
                        <div className="rounded-md border divide-y">
                          {[
                            { label: "Version", value: "v2.5.3" },
                            { label: "Last Update", value: "May 15, 2023" },
                            { label: "Environment", value: "Production" },
                            { label: "Database Size", value: "1.2 GB" },
                            { label: "Active Users", value: "42" },
                          ].map((item, index) => (
                            <div key={index} className="flex justify-between py-2 px-3">
                              <span className="text-sm font-medium">{item.label}</span>
                              <span className="text-sm text-muted-foreground">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
