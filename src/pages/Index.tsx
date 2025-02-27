
import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  User, 
  Building, 
  CheckCircle,
  AlertCircle,
  Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCards from "@/components/dashboard/DashboardCards";
import MetricsChart from "@/components/dashboard/MetricsChart";
import { mockLeads, mockOrders } from "@/lib/data";

interface Reminder {
  id: string;
  title: string;
  type: "follow-up" | "meeting" | "deadline" | "task";
  date: string;
  priority: "high" | "medium" | "low";
}

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeLeadsTab, setActiveLeadsTab] = useState("new");
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const reminders: Reminder[] = [
    {
      id: "1",
      title: "Follow up with Rajiv Mehta",
      type: "follow-up",
      date: "2023-10-20",
      priority: "high",
    },
    {
      id: "2",
      title: "Product demo for MediCorp Pharma",
      type: "meeting",
      date: "2023-10-22",
      priority: "high",
    },
    {
      id: "3",
      title: "Submit proposal to Wellness Pharma",
      type: "deadline",
      date: "2023-10-21",
      priority: "medium",
    },
    {
      id: "4",
      title: "Call Nisha from Nova Medical",
      type: "task",
      date: "2023-10-22",
      priority: "medium",
    },
    {
      id: "5",
      title: "Review order status for ORD001",
      type: "task",
      date: "2023-10-19",
      priority: "low",
    },
  ];

  const notifications: Notification[] = [
    {
      id: "1",
      title: "New lead assigned",
      description: "A new lead 'Kiran Kumar' has been assigned to you",
      time: "10 minutes ago",
      read: false,
      type: "info",
    },
    {
      id: "2",
      title: "Order shipped",
      description: "Order #ORD002 has been shipped to Wellness Pharma",
      time: "1 hour ago",
      read: false,
      type: "success",
    },
    {
      id: "3",
      title: "Follow-up reminder",
      description: "Scheduled follow-up with Ananya Singh is tomorrow",
      time: "3 hours ago",
      read: true,
      type: "warning",
    },
    {
      id: "4",
      title: "Order payment overdue",
      description: "Payment for order #ORD004 is 5 days overdue",
      time: "Yesterday",
      read: true,
      type: "error",
    },
  ];

  const filteredLeads = mockLeads.filter(lead => {
    if (activeLeadsTab === "all") return true;
    return lead.status === activeLeadsTab;
  }).slice(0, 5);

  const recentOrders = mockOrders.sort((a, b) => 
    new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
  ).slice(0, 5);

  const getReminderIcon = (type: Reminder["type"]) => {
    switch (type) {
      case "follow-up":
        return <User className="h-4 w-4" />;
      case "meeting":
        return <Building className="h-4 w-4" />;
      case "deadline":
        return <AlertCircle className="h-4 w-4" />;
      case "task":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "info":
        return <Bell className="h-4 w-4 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-rose-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to PharmaLeads CRM. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </Button>
        </div>
      </div>

      <DashboardCards loading={loading} />

      <div className="grid gap-6 md:grid-cols-7">
        <MetricsChart className="md:col-span-5" />
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Your scheduled reminders</CardDescription>
          </CardHeader>
          <CardContent className="px-0">
            <ScrollArea className="h-[280px] px-6">
              <div className="space-y-4">
                {reminders.map((reminder) => (
                  <div key={reminder.id} className="flex items-start gap-4">
                    <div className={`rounded-full p-1.5 mt-0.5 ${
                      reminder.priority === "high" 
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400" 
                        : reminder.priority === "medium"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400"
                        : "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                    }`}>
                      {getReminderIcon(reminder.type)}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {reminder.title}
                      </p>
                      <div className="flex items-center text-xs text-muted-foreground gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(reminder.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" size="sm" className="w-full">
              <Calendar className="mr-2 h-4 w-4" />
              View Calendar
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Recent Leads</CardTitle>
              <Tabs 
                value={activeLeadsTab}
                onValueChange={setActiveLeadsTab}
                className="w-auto"
              >
                <TabsList className="grid w-auto grid-cols-4 h-8">
                  <TabsTrigger value="new" className="text-xs px-2">New</TabsTrigger>
                  <TabsTrigger value="contacted" className="text-xs px-2">Contacted</TabsTrigger>
                  <TabsTrigger value="negotiation" className="text-xs px-2">Negotiation</TabsTrigger>
                  <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <CardDescription>
              {loading ? "Loading recent leads..." : `Showing ${filteredLeads.length} recent leads`}
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              <div className="divide-y">
                {filteredLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${lead.name}`} alt={lead.name} />
                        <AvatarFallback>{lead.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{lead.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{lead.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <Badge className={`
                          ${lead.status === "new" ? "badge-info" : 
                            lead.status === "contacted" ? "badge-primary" : 
                            lead.status === "negotiation" ? "badge-warning" : 
                            lead.status === "closed" ? "badge-success" : 
                            "badge-danger"
                          }
                        `}>
                          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          Score: {lead.score}%
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="outline" size="sm" className="w-full">View All Leads</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Notifications & Updates</CardTitle>
            <CardDescription>
              {loading ? "Loading notifications..." : `${notifications.filter(n => !n.read).length} unread notifications`}
            </CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px]">
              <div className="divide-y">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`flex gap-4 p-4 ${notification.read ? "" : "bg-primary/5"}`}
                  >
                    <div className={`rounded-full p-1.5 h-8 w-8 flex items-center justify-center self-start mt-0.5 ${
                      notification.type === "info" 
                        ? "bg-blue-100 dark:bg-blue-900/20" 
                        : notification.type === "success"
                        ? "bg-emerald-100 dark:bg-emerald-900/20"
                        : notification.type === "warning"
                        ? "bg-amber-100 dark:bg-amber-900/20"
                        : "bg-rose-100 dark:bg-rose-900/20"
                    }`}>
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium leading-none">
                          {notification.title}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="outline" size="sm" className="w-full">View All Notifications</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Overview of the latest orders in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b bg-muted/50">
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Order ID
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Client
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Date
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">
                      Amount
                    </th>
                    <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="p-4 align-middle font-medium">{order.id}</td>
                      <td className="p-4 align-middle">
                        <div className="flex flex-col">
                          <span className="font-medium">{order.client.name}</span>
                          <span className="text-xs text-muted-foreground">{order.client.company}</span>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <Badge
                          className={`${
                            order.status === "delivered"
                              ? "badge-success"
                              : order.status === "shipped"
                              ? "badge-info"
                              : order.status === "processing"
                              ? "badge-warning"
                              : order.status === "cancelled"
                              ? "badge-danger"
                              : "badge-secondary"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="p-4 align-middle">
                        {new Date(order.orderDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 align-middle">
                        ₹{(order.totalValue / 100000).toFixed(2)}L
                      </td>
                      <td className="p-4 align-middle text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
