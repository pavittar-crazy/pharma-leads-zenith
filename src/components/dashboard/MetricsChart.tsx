
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Empty placeholder data
const emptyData = [
  { month: "Jan", revenue: 0, leads: 0, orders: 0 },
  { month: "Feb", revenue: 0, leads: 0, orders: 0 },
  { month: "Mar", revenue: 0, leads: 0, orders: 0 },
  { month: "Apr", revenue: 0, leads: 0, orders: 0 },
  { month: "May", revenue: 0, leads: 0, orders: 0 },
  { month: "Jun", revenue: 0, leads: 0, orders: 0 },
  { month: "Jul", revenue: 0, leads: 0, orders: 0 },
  { month: "Aug", revenue: 0, leads: 0, orders: 0 },
  { month: "Sep", revenue: 0, leads: 0, orders: 0 },
  { month: "Oct", revenue: 0, leads: 0, orders: 0 },
  { month: "Nov", revenue: 0, leads: 0, orders: 0 },
  { month: "Dec", revenue: 0, leads: 0, orders: 0 },
];

interface MetricsChartProps {
  className?: string;
}

const MetricsChart: React.FC<MetricsChartProps> = ({ className }) => {
  const formatRevenue = (value: number) => {
    if (value >= 1000000) {
      return `₹${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    }
    return `₹${value}`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Analytics Overview</CardTitle>
        <CardDescription>
          No data available yet. Start adding leads and orders to see analytics.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>
          <TabsContent value="revenue" className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={emptyData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis 
                  tickFormatter={formatRevenue} 
                  tick={{ fontSize: 12 }} 
                  stroke="hsl(var(--muted-foreground))"
                />
                <Tooltip 
                  formatter={(value: number) => [`₹${(value/100000).toFixed(2)}L`, 'Revenue']}
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="leads" className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emptyData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="leads" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="orders" className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emptyData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--background))", 
                    borderColor: "hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="orders" fill="hsl(196, 84%, 49%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MetricsChart;
