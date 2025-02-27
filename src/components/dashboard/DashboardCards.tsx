
import React from "react";
import { Users, TrendingUp, CheckCircle, AlertTriangle, Building2, PackageSearch } from "lucide-react";
import StatCard from "@/components/common/StatCard";

interface DashboardCardsProps {
  loading?: boolean;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ loading = false }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Leads"
        value={loading ? "" : "1,248"}
        icon={<Users className="h-4 w-4" />}
        trend={{ value: 12, isPositive: true }}
        loading={loading}
      />
      <StatCard
        title="Sales This Month"
        value={loading ? "" : "₹24.5L"}
        icon={<TrendingUp className="h-4 w-4" />}
        trend={{ value: 8, isPositive: true }}
        loading={loading}
      />
      <StatCard
        title="Active Manufacturers"
        value={loading ? "" : "47"}
        icon={<Building2 className="h-4 w-4" />}
        trend={{ value: 5, isPositive: true }}
        description="from last quarter"
        loading={loading}
      />
      <StatCard
        title="Pending Orders"
        value={loading ? "" : "23"}
        icon={<PackageSearch className="h-4 w-4" />}
        description="requiring attention"
        loading={loading}
      />
      <StatCard
        title="Completed Orders"
        value={loading ? "" : "86"}
        icon={<CheckCircle className="h-4 w-4" />}
        trend={{ value: 14, isPositive: true }}
        loading={loading}
      />
      <StatCard
        title="Expiring Leads"
        value={loading ? "" : "17"}
        icon={<AlertTriangle className="h-4 w-4" />}
        description="needing follow-up"
        loading={loading}
      />
    </div>
  );
};

export default DashboardCards;
