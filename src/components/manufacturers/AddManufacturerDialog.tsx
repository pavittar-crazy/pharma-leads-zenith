
import React, { useState } from 'react';
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
import { Textarea } from "@/components/ui/textarea";
import { useCRM } from '@/context/CRMContext';
import { Manufacturer } from '@/services/crmService';

const AddManufacturerDialog: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  onManufacturerAdded: (manufacturer: Manufacturer) => void;
}> = ({ isOpen, onClose, onManufacturerAdded }) => {
  const { addManufacturer } = useCRM();
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    products: [] as string[],
    certifications: [] as string[],
    min_order_value: 0,
    rating: 5,
    status: 'active',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productsArray = e.target.value.split(',').map(p => p.trim()).filter(p => p);
    setFormData(prev => ({
      ...prev,
      products: productsArray
    }));
  };

  const handleCertificationsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const certsArray = e.target.value.split(',').map(c => c.trim()).filter(c => c);
    setFormData(prev => ({
      ...prev,
      certifications: certsArray
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newManufacturer = await addManufacturer({
        ...formData,
        user_id: '' // This will be set in the service
      });
      
      onManufacturerAdded(newManufacturer);
      onClose();
      setFormData({
        name: '',
        contactPerson: '',
        email: '',
        phone: '',
        address: '',
        products: [],
        certifications: [],
        min_order_value: 0,
        rating: 5,
        status: 'active',
        notes: ''
      });
    } catch (error) {
      console.error('Error adding manufacturer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Manufacturer</DialogTitle>
          <DialogDescription>
            Enter the details for this new pharmaceutical manufacturer.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Manufacturer Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input 
                id="contactPerson" 
                name="contactPerson" 
                value={formData.contactPerson} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea 
              id="address" 
              name="address" 
              value={formData.address} 
              onChange={handleChange} 
              rows={2} 
              required 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="products">Products (comma separated)</Label>
              <Input 
                id="products" 
                name="products" 
                value={formData.products.join(', ')} 
                onChange={handleProductsChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications (comma separated)</Label>
              <Input 
                id="certifications" 
                name="certifications" 
                value={formData.certifications.join(', ')} 
                onChange={handleCertificationsChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="min_order_value">Minimum Order Value (₹)</Label>
              <Input 
                id="min_order_value" 
                name="min_order_value" 
                type="number" 
                min="0" 
                value={formData.min_order_value} 
                onChange={(e) => setFormData({...formData, min_order_value: parseInt(e.target.value) || 0})} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (1-10)</Label>
              <Input 
                id="rating" 
                name="rating" 
                type="number" 
                min="1" 
                max="10" 
                value={formData.rating} 
                onChange={(e) => setFormData({...formData, rating: parseInt(e.target.value) || 5})} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                name="status" 
                value={formData.status} 
                onValueChange={(value) => setFormData({...formData, status: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              rows={3} 
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Manufacturer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddManufacturerDialog;
