
import React, { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown, Calendar, Users, Package, IndianRupee, TrendingUp, Activity, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCRM } from '../context/CRMContext';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  loading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  trendValue,
  loading = false 
}) => {
  return (
    <Card className="card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          <div className="p-1.5 bg-muted rounded-full">{icon}</div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-8 w-24 bg-muted animate-pulse rounded-md"></div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      </CardContent>
      {trend && trendValue && (
        <CardFooter className="pt-0">
          <div className={`text-xs flex items-center gap-1 ${
            trend === 'up' ? 'text-emerald-500' : 
            trend === 'down' ? 'text-rose-500' : 
            'text-muted-foreground'
          }`}>
            {trend === 'up' ? <ArrowUp className="h-3 w-3" /> : 
             trend === 'down' ? <ArrowDown className="h-3 w-3" /> : null}
            {trendValue} {trend === 'up' ? 'increase' : trend === 'down' ? 'decrease' : ''} from last month
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

interface RecentActivityProps {
  loading: boolean;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ loading }) => {
  const { leads, orders } = useCRM();
  
  // Combine recent leads and orders and sort by date
  const activities = [
    ...leads.map(lead => ({
      type: 'lead',
      id: lead.id,
      title: `New Lead: ${lead.name}`,
      description: `From ${lead.company}`,
      date: new Date(lead.createdAt)
    })),
    ...orders.map(order => ({
      type: 'order',
      id: order.id,
      title: `New Order: ${order.leadName}`,
      description: `${order.products.length} products - ₹${order.totalAmount.toLocaleString('en-IN')}`,
      date: new Date(order.createdAt)
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates from your CRM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-start gap-4">
                <div className="h-8 w-8 rounded-full bg-muted animate-pulse"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 w-4/5 bg-muted animate-pulse rounded-md"></div>
                  <div className="h-3 w-3/5 bg-muted animate-pulse rounded-md"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates from your CRM</CardDescription>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-6">
            <Activity className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-medium">No recent activity</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Activity will appear here when you add leads or create orders
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4">
                <div className={`p-2 rounded-full ${
                  activity.type === 'lead' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400' : 
                  'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'
                }`}>
                  {activity.type === 'lead' ? 
                    <Users className="h-4 w-4" /> : 
                    <Package className="h-4 w-4" />
                  }
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.title}</p>
                    <time className="text-xs text-muted-foreground">{formatDate(activity.date)}</time>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardCardsProps {
  loading: boolean;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ loading }) => {
  const { leads, orders } = useCRM();
  
  // Calculate statistics
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter(lead => lead.status === 'qualified').length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  
  // Format numbers
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Leads"
        value={totalLeads}
        description="Total leads in the system"
        icon={<Users className="h-4 w-4" />}
        trend="up"
        trendValue="12%"
        loading={loading}
      />
      <StatCard
        title="Qualified Leads"
        value={qualifiedLeads}
        description={`${Math.round((qualifiedLeads / (totalLeads || 1)) * 100)}% qualification rate`}
        icon={<TrendingUp className="h-4 w-4" />}
        trend="up"
        trendValue="5%"
        loading={loading}
      />
      <StatCard
        title="Total Orders"
        value={totalOrders}
        description="Processed orders"
        icon={<Package className="h-4 w-4" />}
        trend="neutral"
        trendValue="Same"
        loading={loading}
      />
      <StatCard
        title="Total Revenue"
        value={formatCurrency(totalRevenue)}
        description="From all orders"
        icon={<IndianRupee className="h-4 w-4" />}
        trend="up"
        trendValue="18%"
        loading={loading}
      />
    </div>
  );
};

const SalesFunnel: React.FC<{ loading: boolean }> = ({ loading }) => {
  const { leads } = useCRM();
  
  const leadsByStatus = {
    new: leads.filter(lead => lead.status === 'new').length,
    contacted: leads.filter(lead => lead.status === 'contacted').length,
    qualified: leads.filter(lead => lead.status === 'qualified').length,
    proposal: leads.filter(lead => lead.status === 'proposal').length,
    negotiation: leads.filter(lead => lead.status === 'negotiation').length,
    closed: leads.filter(lead => lead.status === 'closed').length,
  };
  
  const totalLeads = leads.length || 1; // Avoid division by zero
  
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Sales Funnel</CardTitle>
          <CardDescription>Conversion through stages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div className="h-4 w-24 bg-muted animate-pulse rounded-md"></div>
                  <div className="h-4 w-12 bg-muted animate-pulse rounded-md"></div>
                </div>
                <div className="h-3 w-full bg-muted animate-pulse rounded-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>Conversion through stages</CardDescription>
          </div>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">New</div>
              <div>{Math.round((leadsByStatus.new / totalLeads) * 100)}%</div>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${(leadsByStatus.new / totalLeads) * 100}%` }} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">Contacted</div>
              <div>{Math.round((leadsByStatus.contacted / totalLeads) * 100)}%</div>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${(leadsByStatus.contacted / totalLeads) * 100}%` }} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">Qualified</div>
              <div>{Math.round((leadsByStatus.qualified / totalLeads) * 100)}%</div>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500" 
                style={{ width: `${(leadsByStatus.qualified / totalLeads) * 100}%` }} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">Proposal</div>
              <div>{Math.round((leadsByStatus.proposal / totalLeads) * 100)}%</div>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500" 
                style={{ width: `${(leadsByStatus.proposal / totalLeads) * 100}%` }} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">Negotiation</div>
              <div>{Math.round((leadsByStatus.negotiation / totalLeads) * 100)}%</div>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-orange-500" 
                style={{ width: `${(leadsByStatus.negotiation / totalLeads) * 100}%` }} 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <div className="font-medium">Closed</div>
              <div>{Math.round((leadsByStatus.closed / totalLeads) * 100)}%</div>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500" 
                style={{ width: `${(leadsByStatus.closed / totalLeads) * 100}%` }} 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

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

      <div className="grid gap-4 md:grid-cols-2">
        <SalesFunnel loading={loading} />
        <RecentActivity loading={loading} />
      </div>
    </div>
  );
};

export default Index;
