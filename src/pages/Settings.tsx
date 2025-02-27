
import React from "react";
import {
  Bell,
  User,
  Mail,
  Globe,
  Shield,
  Briefcase,
  Building,
  Database,
  CreditCard,
  Users,
  UserPlus,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings: React.FC = () => {
  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 space-y-1">
            <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent">
              <TabsTrigger
                value="general"
                className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
              >
                <User className="mr-2 h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="company"
                className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
              >
                <Building className="mr-2 h-4 w-4" />
                Company Profile
              </TabsTrigger>
              <TabsTrigger
                value="team"
                className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
              >
                <Users className="mr-2 h-4 w-4" />
                Team Management
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
              >
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="integrations"
                className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
              >
                <Globe className="mr-2 h-4 w-4" />
                Integrations
              </TabsTrigger>
              <TabsTrigger
                value="billing"
                className="w-full justify-start px-4 py-2 data-[state=active]:bg-muted"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-1 md:w-3/4">
            <TabsContent value="general" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Admin User" alt="Admin User" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <h3 className="font-medium">Profile Image</h3>
                      <p className="text-sm text-muted-foreground">
                        JPG, GIF or PNG. Max size 2MB.
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                        <Button variant="outline" size="sm">Upload New</Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value="Admin User" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value="admin@pharma-leads.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" value="Administrator" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English (US)</SelectItem>
                        <SelectItem value="en-gb">English (UK)</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="asia-kolkata">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia-kolkata">Asia/Kolkata (GMT +5:30)</SelectItem>
                        <SelectItem value="asia-dubai">Asia/Dubai (GMT +4:00)</SelectItem>
                        <SelectItem value="europe-london">Europe/London (GMT +0:00)</SelectItem>
                        <SelectItem value="america-new_york">America/New York (GMT -5:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose how and when you want to be notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="new-leads">New leads</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when new leads are added
                          </p>
                        </div>
                        <Switch id="new-leads" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="lead-status">Lead status changes</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when a lead status changes
                          </p>
                        </div>
                        <Switch id="lead-status" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="order-updates">Order updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications on order status changes
                          </p>
                        </div>
                        <Switch id="order-updates" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="performance">Performance reports</Label>
                          <p className="text-sm text-muted-foreground">
                            Weekly/monthly performance reports
                          </p>
                        </div>
                        <Switch id="performance" />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">In-App Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="chat-messages">Chat messages</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications for new chat messages
                          </p>
                        </div>
                        <Switch id="chat-messages" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="task-reminders">Task reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Reminders for upcoming tasks and follow-ups
                          </p>
                        </div>
                        <Switch id="task-reminders" defaultChecked />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-updates">System updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifications about system maintenance and updates
                          </p>
                        </div>
                        <Switch id="system-updates" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Reset to Default</Button>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="company" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Company Details</CardTitle>
                  <CardDescription>Manage your company information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                    <div className="h-16 w-16 flex items-center justify-center rounded-md bg-primary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-8 w-8 text-white"
                      >
                        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div className="flex-1 space-y-1 text-center sm:text-left">
                      <h3 className="font-medium">Company Logo</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload your company logo. SVG, PNG or JPG.
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-2">
                        <Button variant="outline" size="sm">Upload Logo</Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <Input id="company-name" value="PharmaLeads Solutions" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Select defaultValue="pharmaceutical">
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="medical-devices">Medical Devices</SelectItem>
                          <SelectItem value="biotech">Biotech</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Company Email</Label>
                      <Input id="company-email" value="contact@pharmaleads.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Company Phone</Label>
                      <Input id="company-phone" value="+91 22 1234 5678" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value="123 Business Park, Andheri East" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" value="Mumbai" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" value="Maharashtra" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal-code">Postal Code</Label>
                      <Input id="postal-code" value="400069" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="india">
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="india">India</SelectItem>
                          <SelectItem value="usa">United States</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="singapore">Singapore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="https://pharmaleads.com" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="mt-0">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle>Team Members</CardTitle>
                      <CardDescription>Manage your team and their permissions</CardDescription>
                    </div>
                    <Button className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      <span>Add Member</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b bg-muted/50">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Name
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Role
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Email
                              </th>
                              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                                Status
                              </th>
                              <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Admin User" alt="Admin User" />
                                    <AvatarFallback>AU</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">Admin User</span>
                                </div>
                              </td>
                              <td className="p-4 align-middle">Administrator</td>
                              <td className="p-4 align-middle">admin@pharmaleads.com</td>
                              <td className="p-4 align-middle">
                                <Badge className="badge-success">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Active
                                </Badge>
                              </td>
                              <td className="p-4 align-middle text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                              </td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Vijay Kumar" alt="Vijay Kumar" />
                                    <AvatarFallback>VK</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">Vijay Kumar</span>
                                </div>
                              </td>
                              <td className="p-4 align-middle">Sales Manager</td>
                              <td className="p-4 align-middle">vijay@pharmaleads.com</td>
                              <td className="p-4 align-middle">
                                <Badge className="badge-success">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Active
                                </Badge>
                              </td>
                              <td className="p-4 align-middle text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                              </td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-4 align-middle">
                                <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=Sneha Desai" alt="Sneha Desai" />
                                    <AvatarFallback>SD</AvatarFallback>
                                  </Avatar>
                                  <span className="font-medium">Sneha Desai</span>
                                </div>
                              </td>
                              <td className="p-4 align-middle">Sales Executive</td>
                              <td className="p-4 align-middle">sneha@pharmaleads.com</td>
                              <td className="p-4 align-middle">
                                <Badge className="badge-success">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Active
                                </Badge>
                              </td>
                              <td className="p-4 align-middle text-right">
                                <Button variant="ghost" size="sm">Edit</Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Role Permissions</CardTitle>
                        <CardDescription>Configure access permissions for each role</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Administrator</h4>
                              <p className="text-sm text-muted-foreground">Full system access</p>
                            </div>
                            <Button variant="outline" size="sm">Edit Role</Button>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Sales Manager</h4>
                              <p className="text-sm text-muted-foreground">Team management and reporting access</p>
                            </div>
                            <Button variant="outline" size="sm">Edit Role</Button>
                          </div>
                          <Separator />
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">Sales Executive</h4>
                              <p className="text-sm text-muted-foreground">Lead and order management access</p>
                            </div>
                            <Button variant="outline" size="sm">Edit Role</Button>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="justify-between">
                        <Button variant="outline" size="sm">Create New Role</Button>
                        <Button size="sm">Save Changes</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security and authentication</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Password</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="sm:col-span-2">
                        <Separator className="my-4" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button size="sm">Update Password</Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Session Management</h3>
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b bg-muted/50">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Device
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Location
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Last Active
                              </th>
                              <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-3 align-middle">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">Chrome on Windows</span>
                                  <Badge variant="outline" className="text-xs">Current</Badge>
                                </div>
                              </td>
                              <td className="p-3 align-middle">Mumbai, India</td>
                              <td className="p-3 align-middle">Now</td>
                              <td className="p-3 align-middle text-right">
                                <Button variant="ghost" size="sm" disabled>Logout</Button>
                              </td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-3 align-middle">
                                <span className="font-medium">Safari on iPhone</span>
                              </td>
                              <td className="p-3 align-middle">Mumbai, India</td>
                              <td className="p-3 align-middle">2 hours ago</td>
                              <td className="p-3 align-middle text-right">
                                <Button variant="ghost" size="sm">Logout</Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="outline" className="text-destructive">Logout All Devices</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>External Integrations</CardTitle>
                  <CardDescription>Connect with third-party services and platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/20">
                          <Database className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">IndiaMART</h3>
                          <p className="text-sm text-muted-foreground">
                            Import leads directly from IndiaMART
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 flex items-center justify-center rounded-md bg-green-100 dark:bg-green-900/20">
                          <Globe className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">TradeIndia</h3>
                          <p className="text-sm text-muted-foreground">
                            Sync with your TradeIndia account
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/20">
                          <Briefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">LinkedIn</h3>
                          <p className="text-sm text-muted-foreground">
                            Import leads from LinkedIn
                          </p>
                        </div>
                      </div>
                      <Button>Connect</Button>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 flex items-center justify-center rounded-md bg-amber-100 dark:bg-amber-900/20">
                          <Mail className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">Gmail / Google</h3>
                          <p className="text-sm text-muted-foreground">
                            Connect Gmail for email synchronization
                          </p>
                        </div>
                      </div>
                      <Button variant="outline">Connect</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Billing & Subscription</CardTitle>
                  <CardDescription>Manage your plan and billing information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-md border p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-lg">Enterprise Plan</h3>
                        <p className="text-sm text-muted-foreground">
                          ₹12,000 / month, billed annually
                        </p>
                      </div>
                      <Badge className="badge-success">Active</Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="grid gap-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Unlimited leads & contacts</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Advanced analytics & reporting</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Manufacturer database access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">AI-powered lead scoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm">Third-party integrations</span>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button>Upgrade Plan</Button>
                      <Button variant="outline">View All Plans</Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Payment Method</h3>
                    <div className="flex items-center gap-4 rounded-md border p-4">
                      <div className="rounded-md bg-muted h-12 w-16 flex items-center justify-center">
                        <CreditCard className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Edit
                      </Button>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline">Add Payment Method</Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-4">Billing History</h3>
                    <div className="rounded-md border">
                      <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                          <thead className="[&_tr]:border-b bg-muted/50">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Invoice
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Date
                              </th>
                              <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                                Amount
                              </th>
                              <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="[&_tr:last-child]:border-0">
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-3 align-middle font-medium">INV-001</td>
                              <td className="p-3 align-middle">Oct 1, 2023</td>
                              <td className="p-3 align-middle">₹12,000</td>
                              <td className="p-3 align-middle text-right">
                                <Button variant="ghost" size="sm">Download</Button>
                              </td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-3 align-middle font-medium">INV-002</td>
                              <td className="p-3 align-middle">Sep 1, 2023</td>
                              <td className="p-3 align-middle">₹12,000</td>
                              <td className="p-3 align-middle text-right">
                                <Button variant="ghost" size="sm">Download</Button>
                              </td>
                            </tr>
                            <tr className="border-b transition-colors hover:bg-muted/50">
                              <td className="p-3 align-middle font-medium">INV-003</td>
                              <td className="p-3 align-middle">Aug 1, 2023</td>
                              <td className="p-3 align-middle">₹12,000</td>
                              <td className="p-3 align-middle text-right">
                                <Button variant="ghost" size="sm">Download</Button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
  );
};

export default Settings;
