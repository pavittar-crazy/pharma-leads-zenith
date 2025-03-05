
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  Building, 
  Phone, 
  Mail
} from 'lucide-react';
import { 
  Badge,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Textarea
} from '../components/ui';
import { useCRM } from '../context/CRMContext';
import { Manufacturer } from '../services/crmService';

interface ManufacturerFormProps {
  onSubmit: (data: Omit<Manufacturer, 'id' | 'createdAt'>) => void;
  initialData?: Partial<Manufacturer>;
  onCancel: () => void;
}

const ManufacturerForm: React.FC<ManufacturerFormProps> = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Manufacturer>>(initialData || {
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    products: [],
    status: 'active',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productString = e.target.value;
    setFormData({
      ...formData,
      products: productString.split(',').map(p => p.trim()).filter(p => p !== '')
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Omit<Manufacturer, 'id' | 'createdAt'>);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Manufacturer Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name || ''} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input 
            id="contactPerson" 
            name="contactPerson" 
            value={formData.contactPerson || ''} 
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
            value={formData.email || ''} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input 
            id="phone" 
            name="phone" 
            value={formData.phone || ''} 
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
          value={formData.address || ''} 
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
            value={formData.products?.join(', ') || ''} 
            onChange={handleProductChange} 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            name="status" 
            value={formData.status} 
            onValueChange={(value) => setFormData({...formData, status: value as Manufacturer['status']})}
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
          value={formData.notes || ''} 
          onChange={handleChange} 
          rows={3} 
        />
      </div>
      
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {initialData?.id ? 'Update Manufacturer' : 'Add Manufacturer'}
        </Button>
      </DialogFooter>
    </form>
  );
};

const Manufacturers: React.FC = () => {
  const { manufacturers, addManufacturer, updateManufacturer, deleteManufacturer } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingManufacturer, setEditingManufacturer] = useState<Manufacturer | null>(null);
  const [manufacturerToDelete, setManufacturerToDelete] = useState<Manufacturer | null>(null);
  
  const filteredManufacturers = manufacturers.filter(manufacturer => {
    const matchesSearch = 
      manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      manufacturer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manufacturer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || manufacturer.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleAddManufacturer = (manufacturerData: Omit<Manufacturer, 'id' | 'createdAt'>) => {
    addManufacturer(manufacturerData);
    setIsAddDialogOpen(false);
  };
  
  const handleEditManufacturer = (manufacturerData: Omit<Manufacturer, 'id' | 'createdAt'>) => {
    if (editingManufacturer) {
      updateManufacturer(editingManufacturer.id, manufacturerData);
      setEditingManufacturer(null);
      setIsEditDialogOpen(false);
    }
  };
  
  const handleDeleteClick = (manufacturer: Manufacturer) => {
    setManufacturerToDelete(manufacturer);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (manufacturerToDelete) {
      deleteManufacturer(manufacturerToDelete.id);
      setManufacturerToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };
  
  const openEditDialog = (manufacturer: Manufacturer) => {
    setEditingManufacturer(manufacturer);
    setIsEditDialogOpen(true);
  };
  
  return (
    <div className="container py-6 space-y-8 max-w-7xl page-enter">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manufacturers</h1>
          <p className="text-muted-foreground">
            Manage your pharmaceutical manufacturers and suppliers
          </p>
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add Manufacturer</span>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-2/3 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search manufacturers..." 
            className="pl-9" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-1/3">
          <Select 
            value={statusFilter} 
            onValueChange={setStatusFilter}
          >
            <SelectTrigger>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter by Status</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {manufacturers.length === 0 ? (
        <Card>
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <Building className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No manufacturers yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first manufacturer
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add your first manufacturer
            </Button>
          </CardContent>
        </Card>
      ) : filteredManufacturers.length === 0 ? (
        <Card>
          <CardContent className="p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-medium mb-2">No results found</h3>
            <p className="text-muted-foreground">
              Try changing your search term or filter
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredManufacturers.map((manufacturer) => (
            <Card key={manufacturer.id} className="card-hover">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-medium">{manufacturer.name}</h3>
                    <p className="text-sm text-muted-foreground">{manufacturer.contactPerson}</p>
                  </div>
                  <Badge variant={manufacturer.status === 'active' ? 'outline' : 'secondary'}>
                    {manufacturer.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{manufacturer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{manufacturer.email}</span>
                  </div>
                  <div className="flex gap-2 text-sm">
                    <Building className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span>{manufacturer.address}</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label className="text-xs text-muted-foreground">Products</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {manufacturer.products.map((product, index) => (
                      <Badge key={index} variant="outline">{product}</Badge>
                    ))}
                    {manufacturer.products.length === 0 && (
                      <span className="text-sm text-muted-foreground">No products listed</span>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(manufacturer)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(manufacturer)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {/* Add Manufacturer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Manufacturer</DialogTitle>
            <DialogDescription>
              Enter the details of the new manufacturer. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <ManufacturerForm 
            onSubmit={handleAddManufacturer} 
            onCancel={() => setIsAddDialogOpen(false)} 
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Manufacturer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Manufacturer</DialogTitle>
            <DialogDescription>
              Update the manufacturer information. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingManufacturer && (
            <ManufacturerForm 
              initialData={editingManufacturer} 
              onSubmit={handleEditManufacturer} 
              onCancel={() => {
                setIsEditDialogOpen(false);
                setEditingManufacturer(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this manufacturer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Manufacturers;
