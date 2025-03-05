
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
import { Plus } from 'lucide-react';
import { useCRM } from '@/context/CRMContext';

interface AddManufacturerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddManufacturerDialog: React.FC<AddManufacturerDialogProps> = ({ open, onOpenChange }) => {
  const { addManufacturer } = useCRM();
  const [newManufacturer, setNewManufacturer] = useState({
    name: '',
    location: '',
    products: [] as string[],
    minOrderValue: 0,
    certifications: [] as string[],
    contactPerson: '',
    email: '',
    phone: '',
    rating: 0,
    status: 'active',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewManufacturer(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setNewManufacturer(prev => ({ ...prev, [field]: value }));
  };

  const handleNumberChange = (field: string, value: string) => {
    setNewManufacturer(prev => ({ ...prev, [field]: Number(value) }));
  };

  const handleSubmit = () => {
    addManufacturer(newManufacturer);
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setNewManufacturer({
      name: '',
      location: '',
      products: [] as string[],
      minOrderValue: 0,
      certifications: [] as string[],
      contactPerson: '',
      email: '',
      phone: '',
      rating: 0,
      status: 'active',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Manufacturer</DialogTitle>
          <DialogDescription>
            Enter the details for the new manufacturer. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={newManufacturer.name}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              value={newManufacturer.location}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactPerson" className="text-right">
              Contact Person
            </Label>
            <Input
              id="contactPerson"
              value={newManufacturer.contactPerson}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={newManufacturer.email}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <Input
              id="phone"
              value={newManufacturer.phone}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="minOrderValue" className="text-right">
              Min Order Value
            </Label>
            <Input
              id="minOrderValue"
              type="number"
              min="0"
              step="0.01"
              value={newManufacturer.minOrderValue}
              onChange={(e) => handleNumberChange('minOrderValue', e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <Input
              id="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={newManufacturer.rating}
              onChange={(e) => handleNumberChange('rating', e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select 
              value={newManufacturer.status} 
              onValueChange={(value) => handleSelectChange('status', value)}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="products" className="text-right">
              Products
            </Label>
            <Input
              id="products"
              placeholder="Enter comma-separated products"
              value={newManufacturer.products.join(', ')}
              onChange={(e) => {
                const productsArray = e.target.value.split(',').map(p => p.trim()).filter(Boolean);
                setNewManufacturer(prev => ({ ...prev, products: productsArray }));
              }}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="certifications" className="text-right">
              Certifications
            </Label>
            <Input
              id="certifications"
              placeholder="Enter comma-separated certifications"
              value={newManufacturer.certifications.join(', ')}
              onChange={(e) => {
                const certsArray = e.target.value.split(',').map(c => c.trim()).filter(Boolean);
                setNewManufacturer(prev => ({ ...prev, certifications: certsArray }));
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" onClick={handleSubmit}>
            <Plus className="h-4 w-4 mr-2" />
            Add Manufacturer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddManufacturerDialog;
