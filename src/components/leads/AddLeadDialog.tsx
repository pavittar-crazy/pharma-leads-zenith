
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
import { Lead } from '@/services/crmService';

const AddLeadDialog: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void;
  onLeadAdded: (lead: Lead) => void;
}> = ({ isOpen, onClose, onLeadAdded }) => {
  const { addLead } = useCRM();
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    location: '',
    status: 'new',
    source: '',
    score: 0,
    priority: 'medium',
    products: [] as string[],
    value: 0,
    notes: '',
    lastContact: new Date().toISOString()
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'score' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newLead = await addLead({
        ...formData,
        user_id: '', // This will be set in the service
        value: formData.value,
        products: formData.products,
        notes: formData.notes,
        last_contact: formData.lastContact,
        next_follow_up: null
      });
      
      onLeadAdded(newLead);
      onClose();
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        location: '',
        status: 'new',
        source: '',
        score: 0,
        priority: 'medium',
        products: [],
        value: 0,
        notes: '',
        lastContact: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error adding lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Lead</DialogTitle>
          <DialogDescription>
            Enter the details for this new lead. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                name="company" 
                value={formData.company} 
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input 
                id="source" 
                name="source" 
                value={formData.source} 
                onChange={handleChange} 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                name="status" 
                value={formData.status} 
                onValueChange={(value) => setFormData({...formData, status: value as Lead['status']})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                name="priority" 
                value={formData.priority} 
                onValueChange={(value) => setFormData({...formData, priority: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="score">Score (0-100)</Label>
              <Input 
                id="score" 
                name="score" 
                type="number" 
                min="0" 
                max="100" 
                value={formData.score} 
                onChange={handleChange} 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="value">Value (₹)</Label>
              <Input 
                id="value" 
                name="value" 
                type="number" 
                min="0" 
                value={formData.value} 
                onChange={(e) => setFormData({...formData, value: Number(e.target.value)})} 
              />
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
              {isSubmitting ? 'Adding...' : 'Add Lead'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLeadDialog;
