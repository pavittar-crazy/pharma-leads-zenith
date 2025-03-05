
import React, { useState, useEffect } from "react";
import { PlusCircle, Search, Filter, BarChart3, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Lead } from "@/types/supabase";
import { LeadService } from "@/services/LeadService";

const Leads: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await LeadService.getLeads();

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

  // Filter leads based on search query
  const filteredLeads = leads.filter(lead => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      lead.name?.toLowerCase().includes(query) ||
      lead.company?.toLowerCase().includes(query) ||
      lead.email?.toLowerCase().includes(query) ||
      lead.location?.toLowerCase().includes(query)
    );
  });

  // Count leads by status
  const leadCounts = leads.reduce((acc, lead) => {
    if (lead.status) {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const totalLeads = leads.length;
  const highPriorityLeads = leads.filter(lead => lead.priority === "high").length;
  const newLeadsThisWeek = leads.filter(lead => {
    if (!lead.created_at) return false;
    const createdDate = new Date(lead.created_at);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return createdDate >= oneWeekAgo;
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
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <BarChart3 className="h-4 w-4" />
          </Button>
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
            <div className="badge-info">{leadCounts.new || 0}</div>
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
            <div className="badge-warning">{leadCounts.negotiation || 0}</div>
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
            <div className="badge-danger">{highPriorityLeads}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads > 0 ? (highPriorityLeads / totalLeads * 100).toFixed(1) : "0"}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              of total leads
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search leads..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Leads</TabsTrigger>
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="contacted">Contacted</TabsTrigger>
          <TabsTrigger value="negotiation">Negotiation</TabsTrigger>
          <TabsTrigger value="won">Won</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredLeads.length === 0 ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredLeads.map((lead) => (
                  <Card key={lead.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">{lead.name}</CardTitle>
                        <div className={`px-2 py-1 rounded text-xs ${
                          lead.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {lead.priority?.charAt(0).toUpperCase() + lead.priority?.slice(1)}
                        </div>
                      </div>
                      {lead.company && (
                        <p className="text-sm text-muted-foreground">{lead.company}</p>
                      )}
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        {lead.email && (
                          <p className="text-sm flex items-center gap-2">
                            <span className="font-medium">Email:</span> {lead.email}
                          </p>
                        )}
                        {lead.phone && (
                          <p className="text-sm flex items-center gap-2">
                            <span className="font-medium">Phone:</span> {lead.phone}
                          </p>
                        )}
                        {lead.location && (
                          <p className="text-sm flex items-center gap-2">
                            <span className="font-medium">Location:</span> {lead.location}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-sm mt-4">
                          <div className={`px-2 py-1 rounded-full text-xs ${
                            lead.status === 'new' ? 'bg-blue-100 text-blue-800' : 
                            lead.status === 'contacted' ? 'bg-purple-100 text-purple-800' : 
                            lead.status === 'negotiation' ? 'bg-amber-100 text-amber-800' :
                            lead.status === 'won' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {lead.status?.charAt(0).toUpperCase() + lead.status?.slice(1)}
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Score: {lead.score || 0}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    <div className="px-6 py-2 bg-muted/30 flex justify-between items-center text-xs text-muted-foreground">
                      <span>Created: {new Date(lead.created_at).toLocaleDateString()}</span>
                      <Button variant="ghost" size="sm" className="h-8 px-2">View Details</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="new" className="mt-4">
          <div className="border rounded-md p-4">
            <p>Filter your leads by status 'New'.</p>
          </div>
        </TabsContent>
        <TabsContent value="contacted" className="mt-4">
          <div className="border rounded-md p-4">
            <p>Filter your leads by status 'Contacted'.</p>
          </div>
        </TabsContent>
        <TabsContent value="negotiation" className="mt-4">
          <div className="border rounded-md p-4">
            <p>Filter your leads by status 'Negotiation'.</p>
          </div>
        </TabsContent>
        <TabsContent value="won" className="mt-4">
          <div className="border rounded-md p-4">
            <p>Filter your leads by status 'Won'.</p>
          </div>
        </TabsContent>
        <TabsContent value="lost" className="mt-4">
          <div className="border rounded-md p-4">
            <p>Filter your leads by status 'Lost'.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leads;
