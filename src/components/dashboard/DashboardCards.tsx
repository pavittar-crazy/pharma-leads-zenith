
import React, { useEffect, useState } from "react";
import { Users, TrendingUp, CheckCircle, AlertTriangle, Building2, PackageSearch } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { supabase } from "@/integrations/supabase/client";

interface DashboardCardsProps {
  loading?: boolean;
}

interface DashboardStats {
  totalLeads: number;
  salesThisMonth: number;
  activeManufacturers: number;
  pendingOrders: number;
  completedOrders: number;
  expiringLeads: number;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ loading: initialLoading = true }) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    salesThisMonth: 0,
    activeManufacturers: 0,
    pendingOrders: 0,
    completedOrders: 0,
    expiringLeads: 0
  });
  const [loading, setLoading] = useState(initialLoading);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);

        // Get total leads
        const { count: totalLeads, error: leadsError } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true });

        if (leadsError) throw leadsError;

        // Get active manufacturers
        const { count: activeManufacturers, error: manufacturersError } = await supabase
          .from('manufacturers')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'active');

        if (manufacturersError) throw manufacturersError;

        // Get pending orders
        const { count: pendingOrders, error: pendingOrdersError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        if (pendingOrdersError) throw pendingOrdersError;

        // Get completed orders
        const { count: completedOrders, error: completedOrdersError } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'delivered');

        if (completedOrdersError) throw completedOrdersError;

        // Calculate total sales this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const { data: salesData, error: salesError } = await supabase
          .from('orders')
          .select('total_value')
          .gte('created_at', startOfMonth.toISOString());

        if (salesError) throw salesError;

        const salesThisMonth = salesData.reduce((sum, order) => sum + (Number(order.total_value) || 0), 0);

        // Get expiring leads (leads with a follow-up date in the next 7 days)
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);

        const { count: expiringLeads, error: expiringLeadsError } = await supabase
          .from('leads')
          .select('*', { count: 'exact', head: true })
          .gte('next_follow_up', today.toISOString())
          .lt('next_follow_up', nextWeek.toISOString());

        if (expiringLeadsError) throw expiringLeadsError;

        setStats({
          totalLeads: totalLeads || 0,
          salesThisMonth,
          activeManufacturers: activeManufacturers || 0,
          pendingOrders: pendingOrders || 0,
          completedOrders: completedOrders || 0,
          expiringLeads: expiringLeads || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Leads"
        value={loading ? "" : stats.totalLeads.toString()}
        icon={<Users className="h-4 w-4" />}
        loading={loading}
      />
      <StatCard
        title="Sales This Month"
        value={loading ? "" : `₹${stats.salesThisMonth.toLocaleString()}`}
        icon={<TrendingUp className="h-4 w-4" />}
        loading={loading}
      />
      <StatCard
        title="Active Manufacturers"
        value={loading ? "" : stats.activeManufacturers.toString()}
        icon={<Building2 className="h-4 w-4" />}
        loading={loading}
      />
      <StatCard
        title="Pending Orders"
        value={loading ? "" : stats.pendingOrders.toString()}
        icon={<PackageSearch className="h-4 w-4" />}
        description="requiring attention"
        loading={loading}
      />
      <StatCard
        title="Completed Orders"
        value={loading ? "" : stats.completedOrders.toString()}
        icon={<CheckCircle className="h-4 w-4" />}
        loading={loading}
      />
      <StatCard
        title="Expiring Leads"
        value={loading ? "" : stats.expiringLeads.toString()}
        icon={<AlertTriangle className="h-4 w-4" />}
        description="needing follow-up"
        loading={loading}
      />
    </div>
  );
};

export default DashboardCards;
