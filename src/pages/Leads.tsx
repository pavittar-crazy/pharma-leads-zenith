
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Download,
  Filter,
  BarChart3,
  FileSpreadsheet,
  List,
  Grid,
  UserPlus,
  MessageSquare,
  Target
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockLeads } from "@/lib/data";
import LeadTable from "@/components/leads/LeadTable";

const Leads: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Count leads by status
  const leadCounts = mockLeads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalLeads = mockLeads.length;
  const highPriorityLeads = mockLeads.filter(lead => lead.priority === "high").length;
  const newLeadsThisWeek = mockLeads.filter(lead => {
    const lastContactDate = new Date(lead.lastContact);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return lastContactDate >= oneWeekAgo;
  }).length;

  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
          <p className="text-muted-foreground">
            Manage and track all your leads in one place
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add New Lead</span>
          </Button>
          <Link to="/lead-management">
            <Button variant="outline" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>Advanced Tools</span>
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                <span>Export as Excel</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                <span>Export as CSV</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                <span>Export as PDF</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <BarChart3 className="h-4 w-4" />
          </Button>
          <div className="border rounded-md p-1 flex">
            <Button 
              variant={viewMode === "list" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={viewMode === "grid" ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="rounded-md bg-muted/50 p-4 text-center">
        <p className="font-medium">Pavittar Pharmaceuticals CRM</p>
        <p className="text-sm text-muted-foreground">A Rishul Chanana Production</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Leads
            </CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {newLeadsThisWeek} new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Leads
            </CardTitle>
            <Badge className="badge-info">{leadCounts.new || 0}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((leadCounts.new || 0) / totalLeads * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              of total leads
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              In Negotiation
            </CardTitle>
            <Badge className="badge-warning">{leadCounts.negotiation || 0}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{((leadCounts.negotiation || 0) / totalLeads * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              of total leads
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              High Priority
            </CardTitle>
            <Badge className="badge-danger">{highPriorityLeads}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(highPriorityLeads / totalLeads * 100).toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              of total leads
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Leads</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="contacted">Contacted</TabsTrigger>
            <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
            <TabsTrigger value="won">Won</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <MessageSquare className="mr-2 h-4 w-4" />
              Bulk Message
            </Button>
            <Button variant="outline" size="sm" className="h-9">
              <UserPlus className="mr-2 h-4 w-4" />
              Assign
            </Button>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-4">
          <LeadTable />
        </TabsContent>
        <TabsContent value="new" className="mt-4">
          <LeadTable />
        </TabsContent>
        <TabsContent value="contacted" className="mt-4">
          <LeadTable />
        </TabsContent>
        <TabsContent value="negotiation" className="mt-4">
          <LeadTable />
        </TabsContent>
        <TabsContent value="won" className="mt-4">
          <LeadTable />
        </TabsContent>
        <TabsContent value="lost" className="mt-4">
          <LeadTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leads;
