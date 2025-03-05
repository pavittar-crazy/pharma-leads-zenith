
import React, { useState } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Input
} from "@/components/ui/input";
import { 
  Label
} from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { useCRM } from '@/context/CRMContext';

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddOrderDialog: React.FC<AddOrderDialogProps> = ({ open, onOpenChange }) => {
  const { addOrder, leads, manufacturers, products } = useCRM();
  const [orderProducts, setOrderProducts] = useState([
    { id: '', name: '', quantity: 1, price: 0 }
  ]);
  const [newOrder, setNewOrder] = useState({
    clientId: '',
    clientName: '',
    clientCompany: '',
    manufacturerId: '',
    totalValue: 0,
    status: 'pending',
    paymentStatus: 'pending',
    orderDate: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewOrder(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    if (field === 'clientId') {
      const selectedLead = leads.find(lead => lead.id === value);
      if (selectedLead) {
        setNewOrder(prev => ({
          ...prev,
          clientId: value,
          clientName: selectedLead.name,
          clientCompany: selectedLead.company
        }));
      }
    } else {
      setNewOrder(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleProductChange = (index: number, field: string, value: string | number) => {
    const updatedProducts = [...orderProducts];
    updatedProducts[index] = { ...updatedProducts[index], [field]: value };
    
    if (field === 'id') {
      const selectedProduct = products.find(p => p.id === value);
      if (selectedProduct) {
        updatedProducts[index].name = selectedProduct.name;
        updatedProducts[index].price = selectedProduct.price;
      }
    }
    
    setOrderProducts(updatedProducts);
    calculateTotal(updatedProducts);
  };

  const addProductRow = () => {
    setOrderProducts([...orderProducts, { id: '', name: '', quantity: 1, price: 0 }]);
  };

  const removeProductRow = (index: number) => {
    if (orderProducts.length > 1) {
      const updatedProducts = orderProducts.filter((_, i) => i !== index);
      setOrderProducts(updatedProducts);
      calculateTotal(updatedProducts);
    }
  };

  const calculateTotal = (products = orderProducts) => {
    const total = products.reduce((sum, product) => {
      return sum + (product.quantity * product.price);
    }, 0);
    setNewOrder(prev => ({ ...prev, totalValue: total }));
  };

  const handleSubmit = () => {
    addOrder({
      ...newOrder,
      products: orderProducts
    });
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setNewOrder({
      clientId: '',
      clientName: '',
      clientCompany: '',
      manufacturerId: '',
      totalValue: 0,
      status: 'pending',
      paymentStatus: 'pending',
      orderDate: new Date().toISOString().split('T')[0],
    });
    setOrderProducts([{ id: '', name: '', quantity: 1, price: 0 }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Order</DialogTitle>
          <DialogDescription>
            Fill in the details for the new order. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="clientId" className="text-right">
              Client
            </Label>
            <Select 
              value={newOrder.clientId} 
              onValueChange={(value) => handleSelectChange('clientId', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select client" />
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="manufacturerId" className="text-right">
              Manufacturer
            </Label>
            <Select 
              value={newOrder.manufacturerId} 
              onValueChange={(value) => handleSelectChange('manufacturerId', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select manufacturer" />
              </SelectTrigger>
              <SelectContent>
                {manufacturers.map(manufacturer => (
                  <SelectItem key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select 
              value={newOrder.status} 
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="paymentStatus" className="text-right">
              Payment
            </Label>
            <Select 
              value={newOrder.paymentStatus} 
              onValueChange={(value) => handleSelectChange('paymentStatus', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select payment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="partial">Partial</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="orderDate" className="text-right">
              Order Date
            </Label>
            <Input
              id="orderDate"
              type="date"
              value={newOrder.orderDate}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          
          <div className="border-t pt-4 mt-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Products</h3>
              <Button 
                variant="outline"
                size="sm"
                onClick={addProductRow}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
            
            {orderProducts.map((product, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 mb-3 items-center">
                <div className="col-span-5">
                  <Select 
                    value={product.id} 
                    onValueChange={(value) => handleProductChange(index, 'id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(p => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name} (${p.price})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value))}
                    placeholder="Qty"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    step="0.01"
                    value={product.price}
                    onChange={(e) => handleProductChange(index, 'price', parseFloat(e.target.value))}
                    placeholder="Price"
                    disabled={!!product.id}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    value={`$${(product.quantity * product.price).toFixed(2)}`}
                    disabled
                  />
                </div>
                <div className="col-span-1 flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProductRow(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end mt-4">
              <div className="w-1/3">
                <div className="flex justify-between">
                  <span className="font-medium">Total:</span>
                  <span className="font-medium">${newOrder.totalValue.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            Create Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderDialog;
