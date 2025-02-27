
import React, { useState } from "react";
import {
  PlusCircle,
  Search,
  ChevronRight,
  Star,
  MapPin,
  Phone,
  Mail,
  Check,
  X,
  Filter,
  ArrowUpDown,
  Package
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockManufacturers, mockProducts } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Manufacturers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedManufacturers = [...mockManufacturers]
    .filter(manufacturer => {
      // Filter based on search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          manufacturer.name.toLowerCase().includes(query) ||
          manufacturer.location.toLowerCase().includes(query) ||
          manufacturer.products.some(p => p.toLowerCase().includes(query))
        );
      }
      return true;
    })
    .filter(manufacturer => {
      // Filter based on active tab
      if (activeTab === "all") return true;
      return manufacturer.status === activeTab;
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      
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

  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manufacturers</h1>
          <p className="text-muted-foreground">
            Manage and track your pharmaceutical manufacturers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            <span>Add Manufacturer</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search manufacturers..."
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
          <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[200px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Manufacturer
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead>Products</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("location")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Location
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("minOrderValue")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Min. Order
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Certifications</TableHead>
              <TableHead className="hidden lg:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("rating")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Rating
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="hidden lg:table-cell">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 hover:bg-transparent p-0 h-auto font-medium"
                >
                  Status
                  <ArrowUpDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedManufacturers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No manufacturers found. Try adjusting your search.
                </TableCell>
              </TableRow>
            ) : (
              sortedManufacturers.map((manufacturer) => (
                <TableRow key={manufacturer.id} className="group transition-colors hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${manufacturer.name}`} alt={manufacturer.name} />
                        <AvatarFallback>{manufacturer.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-0.5">
                        <p className="font-medium text-sm">{manufacturer.name}</p>
                        <p className="text-xs text-muted-foreground">{manufacturer.contactPerson}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {manufacturer.products.slice(0, 2).map((product, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/5">
                          {product}
                        </Badge>
                      ))}
                      {manufacturer.products.length > 2 && (
                        <Badge variant="outline">+{manufacturer.products.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                      {manufacturer.location}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="font-medium">₹{(manufacturer.minOrderValue/1000).toFixed(0)}K</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {manufacturer.certifications.slice(0, 2).map((cert, index) => (
                        <Badge key={index} variant="outline" className="bg-secondary">
                          {cert}
                        </Badge>
                      ))}
                      {manufacturer.certifications.length > 2 && (
                        <Badge variant="outline">+{manufacturer.certifications.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="ml-1 text-sm">{manufacturer.rating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Badge
                      className={manufacturer.status === "active" ? "badge-success" : "badge-neutral"}
                    >
                      {manufacturer.status === "active" ? (
                        <Check className="mr-1 h-3 w-3" />
                      ) : (
                        <X className="mr-1 h-3 w-3" />
                      )}
                      {manufacturer.status.charAt(0).toUpperCase() + manufacturer.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Products by Manufacturer</CardTitle>
          <CardDescription>
            View all products available from your manufacturers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Manufacturers</TableHead>
                  <TableHead className="hidden md:table-cell">Price Range</TableHead>
                  <TableHead className="hidden lg:table-cell">MOQ</TableHead>
                  <TableHead className="hidden lg:table-cell">Lead Time</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockProducts.slice(0, 5).map((product) => (
                  <TableRow key={product.id} className="group transition-colors hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="rounded-full p-1.5 bg-primary/10">
                          <Package className="h-4 w-4 text-primary" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        {product.manufacturers.slice(0, 2).map((manufacturer, index) => (
                          <span key={index} className="text-xs">
                            {manufacturer}
                          </span>
                        ))}
                        {product.manufacturers.length > 2 && (
                          <span className="text-xs text-muted-foreground">
                            +{product.manufacturers.length - 2} more
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ₹{product.minPrice.toFixed(2)} - ₹{product.maxPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {product.moq.toLocaleString()} units
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {product.leadTime} days
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4">
          <Button variant="outline" size="sm" className="w-full">View All Products</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Manufacturers;
