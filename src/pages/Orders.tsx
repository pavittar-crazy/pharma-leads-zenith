
import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  TruckIcon,
  PackageCheck,
  FileText,
  AlertCircle,
  Calendar,
  MoreHorizontal,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockOrders } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Orders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const itemsPerPage = 5;

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredOrders = mockOrders
    .filter(order => {
      // Filter based on search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          order.id.toLowerCase().includes(query) ||
          order.client.name.toLowerCase().includes(query) ||
          order.client.company.toLowerCase().includes(query) ||
          order.manufacturer.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .filter(order => {
      // Filter based on active tab
      if (activeTab === "all") return true;
      return order.status === activeTab;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
      if (sortField === "client") {
        // Special case for nested property
        const aValue = a.client.name;
        const bValue = b.client.name;
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const currentOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Order status stats
  const orderStats = mockOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="badge-warning"><Clock className="mr-1 h-3 w-3" /> Pending</Badge>;
      case "processing":
        return <Badge className="badge-info"><CheckCircle2 className="mr-1 h-3 w-3" /> Processing</Badge>;
      case "shipped":
        return <Badge className="badge-primary"><TruckIcon className="mr-1 h-3 w-3" /> Shipped</Badge>;
      case "delivered":
        return <Badge className="badge-success"><PackageCheck className="mr-1 h-3 w-3" /> Delivered</Badge>;
      case "cancelled":
        return <Badge className="badge-danger"><XCircle className="mr-1 h-3 w-3" /> Cancelled</Badge>;
      default:
        return <Badge className="badge-neutral">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
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

  const getOrderProgress = (status: string) => {
    switch (status) {
      case "pending":
        return 25;
      case "processing":
        return 50;
      case "shipped":
        return 75;
      case "delivered":
        return 100;
      case "cancelled":
        return 0;
      default:
        return 0;
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
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockOrders.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockOrders.filter(order => 
                new Date(order.orderDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length} new this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Orders
            </CardTitle>
            <Badge className="badge-warning">{orderStats.pending || 0}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(orderStats.pending || 0)}</div>
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
            <Badge className="badge-primary">{orderStats.shipped || 0}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(orderStats.shipped || 0)}</div>
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
            <Badge className="badge-success">{orderStats.delivered || 0}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(orderStats.delivered || 0)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Successfully delivered
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order List</CardTitle>
          <CardDescription>
            Manage your orders and track their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[100px]">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("id")}
                      className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                    >
                      Order ID
                      <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("client")}
                      className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                    >
                      Client
                      <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("status")}
                      className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                    >
                      Status
                      <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden md:table-cell">Progress</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("orderDate")}
                      className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                    >
                      Order Date
                      <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">
                    <Button
                      variant="ghost"
                      onClick={() => handleSort("totalValue")}
                      className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                    >
                      Total
                      <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                    </Button>
                  </TableHead>
                  <TableHead className="hidden lg:table-cell">Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentOrders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No orders found. Try adjusting your search or filters.
                    </TableCell>
                  </TableRow>
                ) : (
                  currentOrders.map((order) => (
                    <TableRow key={order.id} className="group transition-colors hover:bg-muted/30">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${order.client.name}`} alt={order.client.name} />
                            <AvatarFallback>{order.client.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="font-medium text-sm">{order.client.name}</p>
                            <p className="text-xs text-muted-foreground">{order.client.company}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-col gap-1">
                          <Progress value={getOrderProgress(order.status)} className="h-2" />
                          <span className="text-xs text-muted-foreground">{getOrderProgress(order.status)}% Complete</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-1 text-sm">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          {new Date(order.orderDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <span className="font-medium">₹{(order.totalValue/100000).toFixed(2)}L</span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {getPaymentStatusBadge(order.paymentStatus)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem className="cursor-pointer">View details</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Update status</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Send invoice</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-destructive">Cancel order</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 0 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <p className="text-sm whitespace-nowrap">Rows per page:</p>
                  <Select
                    value="5"
                    onValueChange={(value) => {
                      // This would typically update itemsPerPage and reset currentPage
                      // For the demo, we'll just log it
                      console.log("Changed items per page to:", value);
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder="5" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 10, 25, 50].map((size) => (
                        <SelectItem key={size} value={size.toString()}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm mx-2">
                    Page{" "}
                    <strong>
                      {currentPage} of {totalPages}
                    </strong>
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
