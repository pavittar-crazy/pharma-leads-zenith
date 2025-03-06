
import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useCRM } from '@/context/CRMContext';
import { Lead, Order, OrderProduct } from '@/services/crmService';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

const AddOrderDialog: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  onOrderAdded: (order: Order) => void;
}> = ({ isOpen, onClose, onOrderAdded }) => {
  const { addOrder, leads } = useCRM();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [products, setProducts] = useState<OrderProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    status: 'pending',
    paymentStatus: 'unpaid',
    orderDate: format(new Date(), 'yyyy-MM-dd')
  });

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedLead(null);
      setProducts([]);
      setFormData({
        status: 'pending',
        paymentStatus: 'unpaid',
        orderDate: format(new Date(), 'yyyy-MM-dd')
      });
    }
  }, [isOpen]);

  const handleLeadChange = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    setSelectedLead(lead || null);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: crypto.randomUUID(),
        name: '',
        quantity: 1,
        price: 0
      }
    ]);
  };

  const updateProduct = (index: number, field: string, value: string | number) => {
    const updatedProducts = [...products];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    setProducts(updatedProducts);
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return products.reduce((sum, product) => sum + (product.quantity * product.price), 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLead || products.length === 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const newOrder = await addOrder({
        leadId: selectedLead.id,
        leadName: selectedLead.name,
        products: products,
        totalAmount: calculateTotal(),
        status: formData.status as Order['status'],
        paymentStatus: formData.paymentStatus as Order['paymentStatus'],
        user_id: '' // This will be set in the service
      });
      
      onOrderAdded(newOrder);
      onClose();
    } catch (error) {
      console.error('Error adding order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>
            Add a new order for a lead. Make sure to include all required products.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="leadId">Select Client</Label>
              <Select 
                value={selectedLead?.id || ''} 
                onValueChange={handleLeadChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a client" />
                </SelectTrigger>
                <SelectContent>
                  {leads.map(lead => (
                    <SelectItem key={lead.id} value={lead.id}>
                      {lead.name} ({lead.company})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Products</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={addProduct}
                  className="text-xs h-8"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Product
                </Button>
              </div>

              {products.length === 0 ? (
                <Card>
                  <CardContent className="p-4 text-center text-muted-foreground">
                    No products added. Click "Add Product" to start building the order.
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {products.map((product, index) => (
                    <div key={product.id} className="flex items-center gap-2 border p-3 rounded-md">
                      <div className="flex-1">
                        <Input
                          placeholder="Product name"
                          value={product.name}
                          onChange={(e) => updateProduct(index, 'name', e.target.value)}
                        />
                      </div>
                      <div className="w-20">
                        <Input
                          type="number"
                          min="1"
                          placeholder="Qty"
                          value={product.quantity}
                          onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="w-24">
                        <Input
                          type="number"
                          min="0"
                          placeholder="Price"
                          value={product.price}
                          onChange={(e) => updateProduct(index, 'price', parseFloat(e.target.value) || 0)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeProduct(index)}
                        className="h-9 w-9"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <div className="flex justify-end p-2">
                    <div className="text-sm font-medium">
                      Total: ₹{calculateTotal().toLocaleString()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Order Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => setFormData({...formData, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
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
                  value={formData.paymentStatus} 
                  onValueChange={(value) => setFormData({...formData, paymentStatus: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="orderDate">Order Date</Label>
                <Input
                  id="orderDate"
                  type="date"
                  value={formData.orderDate}
                  onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || !selectedLead || products.length === 0}
            >
              {isSubmitting ? 'Creating...' : 'Create Order'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;
