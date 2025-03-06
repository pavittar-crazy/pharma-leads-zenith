
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { useCRM } from '@/context/CRMContext';
import { Lead, OrderProduct } from '@/services/crmService';

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderAdded?: () => void;
}

const AddOrderDialog: React.FC<AddOrderDialogProps> = ({ open, onOpenChange, onOrderAdded }) => {
  const { leads, addOrder } = useCRM();
  const [selectedLead, setSelectedLead] = useState<string>('');
  const [orderStatus, setOrderStatus] = useState<'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'>('pending');
  const [paymentStatus, setPaymentStatus] = useState<'unpaid' | 'partial' | 'paid'>('unpaid');
  const [products, setProducts] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open && leads.length > 0) {
      setSelectedLead(leads[0].id);
    }
  }, [open, leads]);

  const handleProductsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducts(e.target.value);
  };

  const parseProducts = (): OrderProduct[] => {
    if (!products.trim()) return [];
    
    // Parse comma-separated product names and details
    return products.split(',').map((product, index) => {
      const trimmedProduct = product.trim();
      // Basic format: Assume simple product names with default pricing
      return {
        id: `temp-${index}`,
        name: trimmedProduct,
        quantity: 1,
        price: 1000 // Default price
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLead) {
      toast({
        title: "Error",
        description: "Please select a lead",
        variant: "destructive",
      });
      return;
    }
    
    const parsedProducts = parseProducts();
    if (parsedProducts.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one product",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const selectedLeadData = leads.find(lead => lead.id === selectedLead);
      
      const totalAmount = parsedProducts.reduce((sum, product) => sum + (product.quantity * product.price), 0);
      
      const newOrder = await addOrder({
        leadId: selectedLead,
        leadName: selectedLeadData?.name || '',
        products: parsedProducts,
        totalAmount,
        status: orderStatus,
        paymentStatus,
        user_id: ''
      });
      
      toast({
        title: "Success",
        description: "Order added successfully",
      });
      
      setSelectedLead(leads.length > 0 ? leads[0].id : '');
      setOrderStatus('pending');
      setPaymentStatus('unpaid');
      setProducts('');
      
      onOpenChange(false);
      if (onOrderAdded) onOrderAdded();
    } catch (error) {
      console.error("Error adding order:", error);
      toast({
        title: "Error",
        description: "Failed to add order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
          <DialogDescription>
            Create a new order for a lead.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lead">Lead</Label>
            {leads.length > 0 ? (
              <Select 
                value={selectedLead} 
                onValueChange={setSelectedLead}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lead" />
                </SelectTrigger>
                <SelectContent>
                  {leads.map(lead => (
                    <SelectItem key={lead.id} value={lead.id}>
                      {lead.name} - {lead.company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="text-sm text-muted-foreground">
                No leads available. Please add leads first.
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="products">Products (comma separated)</Label>
            <Input
              id="products"
              placeholder="E.g. Product A, Product B, Product C"
              value={products}
              onChange={handleProductsChange}
            />
            <p className="text-xs text-muted-foreground">
              Enter product names separated by commas
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderStatus">Order Status</Label>
              <Select 
                value={orderStatus} 
                onValueChange={(value) => setOrderStatus(value as typeof orderStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select 
                value={paymentStatus} 
                onValueChange={(value) => setPaymentStatus(value as typeof paymentStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !selectedLead || products.trim() === ''}
            >
              {isSubmitting ? 'Adding...' : 'Add Order'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;
