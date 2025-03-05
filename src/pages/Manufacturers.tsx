
import React, { useState, useEffect } from "react";
import { PlusCircle, Search, MapPin, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Manufacturer } from "@/types/supabase";
import { ManufacturerService } from "@/services/ManufacturerService";
import { Badge } from "@/components/ui/badge";

const Manufacturers: React.FC = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchManufacturers();
  }, []);

  const fetchManufacturers = async () => {
    try {
      setLoading(true);
      const { data, error } = await ManufacturerService.getManufacturers();

      if (error) {
        throw error;
      }

      setManufacturers(data || []);
    } catch (error: any) {
      console.error('Error fetching manufacturers:', error);
      toast({
        title: "Error fetching manufacturers",
        description: error.message || "Failed to load manufacturers data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Filter manufacturers based on search query
  const filteredManufacturers = manufacturers.filter(manufacturer => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      manufacturer.name?.toLowerCase().includes(query) ||
      manufacturer.location?.toLowerCase().includes(query) ||
      manufacturer.products?.some(p => p.toLowerCase().includes(query)) ||
      manufacturer.contact_person?.toLowerCase().includes(query) ||
      manufacturer.email?.toLowerCase().includes(query)
    );
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

      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search manufacturers..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : filteredManufacturers.length === 0 ? (
        <div className="text-center py-12 border rounded-md">
          <h3 className="text-lg font-medium mb-2">No manufacturers found</h3>
          <p className="text-muted-foreground mb-4">Get started by adding your first manufacturer</p>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Manufacturer
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredManufacturers.map((manufacturer) => (
            <Card key={manufacturer.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold">{manufacturer.name}</CardTitle>
                  <Badge variant={manufacturer.status === 'active' ? 'default' : 'secondary'}>
                    {manufacturer.status?.charAt(0).toUpperCase() + manufacturer.status?.slice(1)}
                  </Badge>
                </div>
                {manufacturer.contact_person && (
                  <p className="text-sm text-muted-foreground">{manufacturer.contact_person}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {manufacturer.location && (
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{manufacturer.location}</span>
                  </div>
                )}
                
                {manufacturer.products && manufacturer.products.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Products:</p>
                    <div className="flex flex-wrap gap-1">
                      {manufacturer.products.map((product, i) => (
                        <Badge key={i} variant="outline" className="bg-primary/5">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {manufacturer.certifications && manufacturer.certifications.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Certifications:</p>
                    <div className="flex flex-wrap gap-1">
                      {manufacturer.certifications.map((cert, i) => (
                        <Badge key={i} variant="outline" className="bg-secondary/10">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-2 pt-2">
                  {manufacturer.min_order_value !== null && (
                    <div className="text-sm">
                      <span className="font-medium">Min. Order: </span>
                      ₹{manufacturer.min_order_value?.toLocaleString()}
                    </div>
                  )}
                  {manufacturer.rating !== null && (
                    <div className="text-sm flex items-center gap-1 justify-end">
                      <span className="font-medium">Rating: </span>
                      <span className="flex items-center">
                        {manufacturer.rating?.toFixed(1)} ★
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
              <div className="px-6 py-2 bg-muted/30 flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    Contact
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="h-8 px-2">View Details</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Manufacturers;
