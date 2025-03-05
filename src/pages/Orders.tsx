
import React, { useState, useEffect } from "react";
import { PlusCircle, Search, Info, Calendar, Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Order } from "@/types/supabase";
import { OrderService } from "@/services/OrderService";
import { Badge } from "@/components/ui/badge";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await OrderService.getOrders();

      if (error) {
        throw error;
      }

      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Error fetching orders",
        description: error.message || "Failed to load order data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      order.id?.toLowerCase().includes(query) ||
      order.status?.toLowerCase().includes(query) ||
      order.payment_status?.toLowerCase().includes(query)
    );
  });

  // Count orders by status
  const orderStats = orders.reduce((acc, order) => {
    if (order.status) {
      acc[order.status] = (acc[order.status] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const getStatusBadge = (status: string | null) => {
    if (!status) return null;
    
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "processing":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Processing</Badge>;
      case "shipped":
        return <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Delivered</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string | null) => {
    if (!status) return null;
    
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400">Pending</Badge>;
      case "partial":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400">Partial</Badge>;
      case "complete":
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400">Complete</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">
            Track and manage all your product orders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>New Order</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Orders
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All orders in the system
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <div className="badge-warning">{orderStats.pending || 0}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.pending || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Requiring attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              In Transit
            </CardTitle>
            <div className="badge-primary">{orderStats.shipped || 0}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.shipped || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently shipping
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed
            </CardTitle>
            <div className="badge-success">{orderStats.delivered || 0}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderStats.delivered || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search orders..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>
            Manage your orders and track their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 border rounded-md">
              <h3 className="text-lg font-medium mb-2">No orders found</h3>
              <p className="text-muted-foreground mb-4">Get started by creating your first order</p>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Order
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-sm font-semibold">Order #{order.id.slice(-8)}</CardTitle>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>
                        {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'No date'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm">
                        <span className="font-medium block text-xs text-muted-foreground">Payment:</span>
                        {getPaymentStatusBadge(order.payment_status)}
                      </div>
                      {order.total_value !== null && (
                        <div className="text-sm text-right">
                          <span className="font-medium block text-xs text-muted-foreground">Total:</span>
                          <span className="font-semibold">₹{Number(order.total_value).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {order.products && (
                      <div className="space-y-1">
                        <span className="text-xs font-medium text-muted-foreground">Products:</span>
                        <div className="text-sm">
                          {typeof order.products === 'object' && order.products !== null
                            ? Object.keys(order.products).length + ' items'
                            : 'No product details'}
                        </div>
                      </div>
                    )}

                    {order.delivery_date && (
                      <div className="text-sm">
                        <span className="font-medium text-xs text-muted-foreground block">Expected Delivery:</span>
                        {new Date(order.delivery_date).toLocaleDateString()}
                      </div>
                    )}
                  </CardContent>
                  <div className="px-6 py-2 bg-muted/30 flex justify-between items-center">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Update
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">View Details</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
