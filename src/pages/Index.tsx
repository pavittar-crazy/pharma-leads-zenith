
import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock,
  Bell
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import DashboardCards from "@/components/dashboard/DashboardCards";
import MetricsChart from "@/components/dashboard/MetricsChart";

const Index: React.FC = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back to Pavittar Pharmaceuticals CRM. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-none bg-muted/50">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-medium">Pavittar Pharmaceuticals</h2>
              <p className="text-sm text-muted-foreground">A Rishul Chanana Production</p>
            </div>
            <Badge variant="outline" className="px-3 py-1">Custom Enterprise Build</Badge>
          </div>
        </CardContent>
      </Card>

      <DashboardCards loading={loading} />

      <div className="grid gap-6 md:grid-cols-7">
        <MetricsChart className="md:col-span-5" />
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Your scheduled reminders</CardDescription>
          </CardHeader>
          <CardContent className="px-6">
            <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
              <Clock className="h-12 w-12 mb-4 opacity-50" />
              <p>No upcoming tasks</p>
              <p className="text-sm">Add your first task to see it here</p>
            </div>
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
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>No leads available</CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Bell className="h-12 w-12 mb-4 opacity-50" />
            <p>No leads found</p>
            <p className="text-sm">Add your first lead to see it here</p>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="outline" size="sm" className="w-full">Add New Lead</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Notifications & Updates</CardTitle>
            <CardDescription>System notifications</CardDescription>
            <Separator />
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
            <Bell className="h-12 w-12 mb-4 opacity-50" />
            <p>No notifications</p>
            <p className="text-sm">You're all caught up!</p>
          </CardContent>
          <CardFooter className="border-t p-4">
            <Button variant="outline" size="sm" className="w-full">Check Notification Settings</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            No recent orders to display
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
          <Bell className="h-12 w-12 mb-4 opacity-50" />
          <p>No orders found</p>
          <p className="text-sm">Create your first order to see it here</p>
        </CardContent>
        <CardFooter className="border-t p-4 text-center text-sm text-muted-foreground">
          <div className="w-full">
            Pavittar Pharmaceuticals CRM - A Rishul Chanana Production
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Index;
