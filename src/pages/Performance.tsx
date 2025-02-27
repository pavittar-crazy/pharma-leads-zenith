
import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  Target,
  Award,
  Download,
  Calendar,
  ArrowUpDown,
  Search,
  Share2,
  ShoppingBag,
  PhoneCall
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { mockSalesReps, mockLeads } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Performance: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timePeriod, setTimePeriod] = useState("month");

  const filteredSalesReps = mockSalesReps.filter(rep => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        rep.name.toLowerCase().includes(query) ||
        rep.region.toLowerCase().includes(query) ||
        rep.email.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Calculate total performance metrics
  const totalSales = mockSalesReps.reduce((sum, rep) => sum + rep.totalSales, 0);
  const totalLeadsConverted = mockSalesReps.reduce((sum, rep) => sum + rep.leadsConverted, 0);
  const totalTarget = mockSalesReps.reduce((sum, rep) => sum + rep.target, 0);
  const avgPerformance = Math.round(mockSalesReps.reduce((sum, rep) => sum + rep.performance, 0) / mockSalesReps.length);

  // Charts data
  const salesData = mockSalesReps.map(rep => ({
    name: rep.name.split(' ')[0],
    sales: rep.totalSales / 100000, // Convert to lakhs
  }));

  const regionData = mockSalesReps.reduce((acc, rep) => {
    const existing = acc.find(item => item.region === rep.region);
    if (existing) {
      existing.value += rep.totalSales;
    } else {
      acc.push({ region: rep.region, value: rep.totalSales });
    }
    return acc;
  }, [] as { region: string; value: number }[]);

  // Pie chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // Lead source analysis
  const leadSources = mockLeads.reduce((acc, lead) => {
    if (lead.source) {
      acc[lead.source] = (acc[lead.source] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const leadSourceData = Object.keys(leadSources).map(source => ({
    name: source,
    value: leadSources[source],
  }));

  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Performance</h1>
          <p className="text-muted-foreground">
            Analytics and insights for your sales team
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Select Period</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalSales / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground mt-1">
              {avgPerformance}% of target
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Sales Team
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSalesReps.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active representatives
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leads Converted
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeadsConverted}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {mockLeads.length} total leads
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Top Performer
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockSalesReps.sort((a, b) => b.performance - a.performance)[0].name.split(' ')[0]}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockSalesReps.sort((a, b) => b.performance - a.performance)[0].performance}% of target
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Sales Representative</CardTitle>
            <CardDescription>
              {timePeriod === "month" ? "This month's" : timePeriod === "quarter" ? "This quarter's" : "This year's"} sales performance by team member
            </CardDescription>
            <Tabs
              value={timePeriod}
              onValueChange={setTimePeriod}
              className="w-full sm:w-auto mt-2"
            >
              <TabsList className="grid w-full grid-cols-3 sm:w-auto">
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="quarter">Quarter</TabsTrigger>
                <TabsTrigger value="year">Year</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={salesData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  tickFormatter={(value) => `₹${value.toFixed(1)}L`}
                  tick={{ fontSize: 12 }} 
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toFixed(2)}L`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
            <CardDescription>
              Breakdown of revenue contribution by geographical region
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                  label={({ region, percent }) => `${region}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`₹${(value/100000).toFixed(2)}L`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend 
                  formatter={(value) => <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div>
              <CardTitle>Sales Representatives</CardTitle>
              <CardDescription>
                Performance metrics for all team members
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-auto max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search team members..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[250px]">Representative</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead className="hidden md:table-cell">Activities</TableHead>
                  <TableHead className="hidden lg:table-cell">Revenue</TableHead>
                  <TableHead>Target Achievement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSalesReps.map((rep) => (
                  <TableRow key={rep.id} className="group transition-colors hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${rep.name}`} alt={rep.name} />
                          <AvatarFallback>{rep.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                        </Avatar>
                        <div className="space-y-0.5">
                          <p className="font-medium text-sm">{rep.name}</p>
                          <p className="text-xs text-muted-foreground">{rep.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {rep.region}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <PhoneCall className="h-3 w-3" /> 
                          <span>{Math.round(rep.leadsConverted * 4)}</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Share2 className="h-3 w-3" />
                          <span>{Math.round(rep.leadsConverted * 2)}</span>
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <ShoppingBag className="h-3 w-3" />
                          <span>{rep.leadsConverted}</span>
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <span className="font-medium">₹{(rep.totalSales/100000).toFixed(2)}L</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Target: ₹{(rep.target/100000).toFixed(1)}L</span>
                          <span className="text-xs font-medium">{rep.performance}%</span>
                        </div>
                        <Progress 
                          value={rep.performance} 
                          className="h-2" 
                          indicatorClassName={
                            rep.performance >= 100 
                              ? "bg-emerald-500" 
                              : rep.performance >= 75 
                              ? "bg-amber-500" 
                              : "bg-rose-500"
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Source Analysis</CardTitle>
            <CardDescription>
              Distribution of leads by acquisition source
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={leadSourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={90}
                  fill="#8884d8"
                  paddingAngle={1}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                >
                  {leadSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [`${value} leads`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Legend 
                  formatter={(value) => <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lead Conversion Rates</CardTitle>
            <CardDescription>
              Percentage of leads converted by status
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'New', rate: 15 },
                  { name: 'Contacted', rate: 32 },
                  { name: 'Negotiation', rate: 68 },
                  { name: 'Qualified', rate: 85 },
                ]}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={{ fontSize: 12 }} 
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Conversion Rate']}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar 
                  dataKey="rate" 
                  fill="hsl(var(--primary))" 
                  radius={[0, 4, 4, 0]}
                  barSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Performance;
