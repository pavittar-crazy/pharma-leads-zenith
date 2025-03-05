
import React from "react";
import { Users, TrendingUp, CheckCircle, AlertTriangle, Building2, PackageSearch } from "lucide-react";
import StatCard from "@/components/common/StatCard";

interface DashboardCardsProps {
  loading?: boolean;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ loading = true }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Leads"
        value={loading ? "" : "0"}
        icon={<Users className="h-4 w-4" />}
        loading={loading}
      />
      <StatCard
        title="Sales This Month"
        value={loading ? "" : "₹0"}
        icon={<TrendingUp className="h-4 w-4" />}
        loading={loading}
      />
      <StatCard
        title="Active Manufacturers"
        value={loading ? "" : "0"}
        icon={<Building2 className="h-4 w-4" />}
        loading={loading}
      />
      <StatCard
        title="Pending Orders"
        value={loading ? "" : "0"}
        icon={<PackageSearch className="h-4 w-4" />}
        description="requiring attention"
        loading={loading}
      />
      <StatCard
        title="Completed Orders"
        value={loading ? "" : "0"}
        icon={<CheckCircle className="h-4 w-4" />}
        loading={loading}
      />
      <StatCard
        title="Expiring Leads"
        value={loading ? "" : "0"}
        icon={<AlertTriangle className="h-4 w-4" />}
        description="needing follow-up"
        loading={loading}
      />
    </div>
  );
};

export default DashboardCards;
