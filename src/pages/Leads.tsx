
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Download,
  Filter,
  BarChart3,
  FileSpreadsheet,
  List,
  Grid,
  Target,
  MessageSquare,
  UserPlus
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Lead } from "@/types/supabase";
import { useAuth } from "@/context/AuthContext";

const Leads: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setLeads(data || []);
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error fetching leads",
        description: error.message || "Failed to load leads data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Count leads by status
  const leadCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const totalLeads = leads.length;
  const highPriorityLeads = leads.filter(lead => lead.priority === "high").length;
  const newLeadsThisWeek = leads.filter(lead => {
    const lastContactDate = new Date(lead.last_contact);
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
            <div className="text-2xl font-bold">{totalLeads > 0 ? ((leadCounts.new || 0) / totalLeads * 100).toFixed(1) : "0"}%</div>
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
            <div className="text-2xl font-bold">{totalLeads > 0 ? ((leadCounts.negotiation || 0) / totalLeads * 100).toFixed(1) : "0"}%</div>
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
            <div className="text-2xl font-bold">{totalLeads > 0 ? (highPriorityLeads / totalLeads * 100).toFixed(1) : "0"}%</div>
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
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : leads.length === 0 ? (
            <div className="text-center py-12 border rounded-md">
              <h3 className="text-lg font-medium mb-2">No leads found</h3>
              <p className="text-muted-foreground mb-4">Get started by adding your first lead</p>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Lead
              </Button>
            </div>
          ) : (
            <div className="border rounded-md p-4">
              <p>Your leads will appear here. Feature in development.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="new" className="mt-4">
          <div className="border rounded-md p-4">
            <p>New leads will appear here. Feature in development.</p>
          </div>
        </TabsContent>
        <TabsContent value="contacted" className="mt-4">
          <div className="border rounded-md p-4">
            <p>Contacted leads will appear here. Feature in development.</p>
          </div>
        </TabsContent>
        <TabsContent value="negotiation" className="mt-4">
          <div className="border rounded-md p-4">
            <p>Leads in negotiation will appear here. Feature in development.</p>
          </div>
        </TabsContent>
        <TabsContent value="won" className="mt-4">
          <div className="border rounded-md p-4">
            <p>Won leads will appear here. Feature in development.</p>
          </div>
        </TabsContent>
        <TabsContent value="lost" className="mt-4">
          <div className="border rounded-md p-4">
            <p>Lost leads will appear here. Feature in development.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leads;
