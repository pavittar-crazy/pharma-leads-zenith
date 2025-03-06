import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, ExternalLink } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useCRM } from '../context/CRMContext';
import { Manufacturer } from '../services/crmService';

const Manufacturers: React.FC = () => {
  const { manufacturers, addManufacturer, updateManufacturer, deleteManufacturer } = useCRM();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentManufacturer, setCurrentManufacturer] = useState<Manufacturer | null>(null);

  const filteredManufacturers = manufacturers.filter(manufacturer => {
    const matchesSearch =
      manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manufacturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manufacturer.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || manufacturer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddManufacturer = (data: Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt'>) => {
    addManufacturer({
      name: data.name,
      contactPerson: data.contactPerson,
      email: data.email,
      phone: data.phone,
      address: data.address,
      products: data.products || [],
      certifications: data.certifications || [],
      min_order_value: data.min_order_value,
      rating: data.rating,
      status: data.status,
      notes: data.notes,
      user_id: data.user_id
    });
    setIsAddDialogOpen(false);
  };

  const handleUpdateManufacturer = async (id: string, updates: Partial<Manufacturer>) => {
    await updateManufacturer(id, updates);
    setIsEditDialogOpen(false);
    setCurrentManufacturer(null);
  };

  const handleDeleteManufacturer = async (id: string) => {
    await deleteManufacturer(id);
    setIsDeleteDialogOpen(false);
  };

  const openEditDialog = (manufacturer: Manufacturer) => {
    setCurrentManufacturer(manufacturer);
    setIsEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setCurrentManufacturer(null);
  };

  const openDeleteDialog = (manufacturer: Manufacturer) => {
    setCurrentManufacturer(manufacturer);
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setCurrentManufacturer(null);
  };

  return (
    <div className="container py-6 space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manufacturers</h1>
          <p className="text-muted-foreground">
            Manage your manufacturers and their details
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
            <h3 className="text-lg font-medium mb-2">No manufacturers yet</h3>
            <p className="text-muted-foreground mb-4">
              Start by adding your first manufacturer to the system
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
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredManufacturers.map((manufacturer) => (
                <TableRow key={manufacturer.id}>
                  <TableCell>
                    <div className="font-medium">{manufacturer.name}</div>
                    <div className="text-sm text-muted-foreground">{manufacturer.address}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{manufacturer.contactPerson}</div>
                    <div className="text-sm text-muted-foreground">{manufacturer.email}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {manufacturer.products.map((product, index) => (
                        <Badge key={index} variant="outline">{product}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={manufacturer.status === 'active' ? 'default' : 'secondary'}>
                      {manufacturer.status.charAt(0).toUpperCase() + manufacturer.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(manufacturer)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => openDeleteDialog(manufacturer)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/manufacturers/${manufacturer.id}`}>
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formData = new FormData(form);
            const data = {
              name: formData.get('name') as string,
              contactPerson: formData.get('contactPerson') as string,
              email: formData.get('email') as string,
              phone: formData.get('phone') as string,
              address: formData.get('address') as string,
              products: (formData.get('products') as string).split(',').map(p => p.trim()).filter(p => p !== ''),
              certifications: (formData.get('certifications') as string).split(',').map(c => c.trim()).filter(c => c !== ''),
              min_order_value: Number(formData.get('min_order_value') as string),
              rating: Number(formData.get('rating') as string),
              status: formData.get('status') as string,
              notes: formData.get('notes') as string,
              user_id: ''
            };
            handleAddManufacturer(data as Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt'>);
          }}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input id="contactPerson" name="contactPerson" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="products">Products (comma separated)</Label>
              <Input id="products" name="products" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certifications">Certifications (comma separated)</Label>
              <Input id="certifications" name="certifications" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min_order_value">Min Order Value</Label>
                <Input type="number" id="min_order_value" name="min_order_value" defaultValue={0} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating</Label>
                <Input type="number" id="rating" name="rating" min="1" max="5" defaultValue={3} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" rows={3} />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Manufacturer
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Manufacturer Detail View */}
      {currentManufacturer && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Manufacturer</DialogTitle>
              <DialogDescription>
                Update manufacturer information.
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              if (currentManufacturer) {
                updateManufacturer(currentManufacturer.id, currentManufacturer);
                setIsEditDialogOpen(false);
              }
            }}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={currentManufacturer.name}
                  onChange={(e) => setCurrentManufacturer({
                    ...currentManufacturer,
                    name: e.target.value
                  })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={currentManufacturer.contactPerson}
                    onChange={(e) => setCurrentManufacturer({
                      ...currentManufacturer,
                      contactPerson: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={currentManufacturer.email}
                    onChange={(e) => setCurrentManufacturer({
                      ...currentManufacturer,
                      email: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={currentManufacturer.phone}
                    onChange={(e) => setCurrentManufacturer({
                      ...currentManufacturer,
                      phone: e.target.value
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={currentManufacturer.address}
                    onChange={(e) => setCurrentManufacturer({
                      ...currentManufacturer,
                      address: e.target.value
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="products">Products (comma separated)</Label>
                <Input
                  id="products"
                  value={currentManufacturer.products.join(', ')}
                  onChange={(e) => setCurrentManufacturer({
                    ...currentManufacturer,
                    products: e.target.value.split(',').map(p => p.trim()).filter(p => p !== '')
                  })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={currentManufacturer.status}
                    onValueChange={(value) => setCurrentManufacturer({
                      ...currentManufacturer,
                      status: value
                    })}
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
                
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={currentManufacturer.rating}
                    onChange={(e) => setCurrentManufacturer({
                      ...currentManufacturer,
                      rating: Number(e.target.value)
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={currentManufacturer.notes}
                  onChange={(e) => setCurrentManufacturer({
                    ...currentManufacturer,
                    notes: e.target.value
                  })}
                  rows={3}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

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
            <Button variant="outline" onClick={closeDeleteDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => {
              if (currentManufacturer) {
                handleDeleteManufacturer(currentManufacturer.id);
              }
            }}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Manufacturers;
