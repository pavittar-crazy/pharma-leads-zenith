
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  products: string[];
  value: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  location: string;
  products: string[];
  certifications: string[];
  min_order_value: number;
  rating: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  category: string;
  price: number;
  stock: number;
}

export interface OrderProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  leadId: string;
  leadName: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  url: string;
  type: string;
  relatedTo: string;
  relatedId: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
}

export class CRMService {
  static mockData: {
    leads: Lead[];
    manufacturers: Manufacturer[];
    products: Product[];
    orders: Order[];
    documents: Document[];
  } = {
    leads: [],
    manufacturers: [],
    products: [],
    orders: [],
    documents: []
  };

  static initializeData() {
    // Initialize with empty arrays, data will be fetched from Supabase
  }

  // Leads
  static async getLeads(): Promise<Lead[]> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching leads:', error);
        return [];
      }
      
      return data.map(lead => ({
        ...lead,
        id: lead.id,
        products: lead.products || [],
        value: lead.value || 0,
        createdAt: lead.created_at,
        updatedAt: lead.updated_at
      }));
    } catch (error) {
      console.error('Error in getLeads:', error);
      return [];
    }
  }

  static async addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Promise<Lead> {
    try {
      // Make sure user_id is included
      const newLead = {
        ...lead,
        user_id: (await supabase.auth.getUser()).data.user?.id || '',
        products: lead.products || [],
        value: lead.value || 0
      };

      const { data, error } = await supabase
        .from('leads')
        .insert([{
          name: newLead.name,
          company: newLead.company,
          email: newLead.email,
          phone: newLead.phone,
          status: newLead.status,
          products: newLead.products,
          value: newLead.value,
          notes: newLead.notes,
          user_id: newLead.user_id
        }])
        .select();

      if (error) {
        console.error('Error adding lead:', error);
        throw error;
      }

      return {
        ...data[0],
        products: data[0].products || [],
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at
      };
    } catch (error) {
      console.error('Error in addLead:', error);
      throw error;
    }
  }

  static async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update({
          name: updates.name,
          company: updates.company,
          email: updates.email,
          phone: updates.phone,
          status: updates.status,
          products: updates.products,
          value: updates.value,
          notes: updates.notes
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating lead:', error);
        throw error;
      }

      return {
        ...data[0],
        products: data[0].products || [],
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at
      };
    } catch (error) {
      console.error('Error in updateLead:', error);
      throw error;
    }
  }

  static async deleteLead(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting lead:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteLead:', error);
      return false;
    }
  }

  // Manufacturers
  static async getManufacturers(): Promise<Manufacturer[]> {
    try {
      const { data, error } = await supabase
        .from('manufacturers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching manufacturers:', error);
        return [];
      }
      
      return data.map(manufacturer => ({
        ...manufacturer,
        id: manufacturer.id,
        contactPerson: manufacturer.contact_person,
        min_order_value: manufacturer.min_order_value || 0,
        products: manufacturer.products || [],
        certifications: manufacturer.certifications || [],
        createdAt: manufacturer.created_at,
        updatedAt: manufacturer.updated_at
      }));
    } catch (error) {
      console.error('Error in getManufacturers:', error);
      return [];
    }
  }

  static async addManufacturer(manufacturer: Omit<Manufacturer, 'id' | 'createdAt'>): Promise<Manufacturer> {
    try {
      // Make sure user_id is included
      const newManufacturer = {
        ...manufacturer,
        user_id: (await supabase.auth.getUser()).data.user?.id || '',
        products: manufacturer.products || [],
        certifications: manufacturer.certifications || []
      };

      const { data, error } = await supabase
        .from('manufacturers')
        .insert([{
          name: newManufacturer.name,
          contact_person: newManufacturer.contactPerson,
          email: newManufacturer.email,
          phone: newManufacturer.phone,
          location: newManufacturer.location,
          products: newManufacturer.products,
          certifications: newManufacturer.certifications,
          min_order_value: newManufacturer.min_order_value,
          rating: newManufacturer.rating,
          status: newManufacturer.status,
          user_id: newManufacturer.user_id
        }])
        .select();

      if (error) {
        console.error('Error adding manufacturer:', error);
        throw error;
      }

      return {
        ...data[0],
        contactPerson: data[0].contact_person,
        min_order_value: data[0].min_order_value || 0,
        products: data[0].products || [],
        certifications: data[0].certifications || [],
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at
      };
    } catch (error) {
      console.error('Error in addManufacturer:', error);
      throw error;
    }
  }

  static async updateManufacturer(id: string, updates: Partial<Manufacturer>): Promise<Manufacturer> {
    try {
      const { data, error } = await supabase
        .from('manufacturers')
        .update({
          name: updates.name,
          contact_person: updates.contactPerson,
          email: updates.email,
          phone: updates.phone,
          location: updates.location,
          products: updates.products,
          certifications: updates.certifications,
          min_order_value: updates.min_order_value,
          rating: updates.rating,
          status: updates.status
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating manufacturer:', error);
        throw error;
      }

      return {
        ...data[0],
        contactPerson: data[0].contact_person,
        min_order_value: data[0].min_order_value || 0,
        products: data[0].products || [],
        certifications: data[0].certifications || [],
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at
      };
    } catch (error) {
      console.error('Error in updateManufacturer:', error);
      throw error;
    }
  }

  static async deleteManufacturer(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('manufacturers')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting manufacturer:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteManufacturer:', error);
      return false;
    }
  }

  // Products
  static getProducts(): Product[] {
    // Mock implementation for now
    return this.mockData.products;
  }

  static addProduct(product: Omit<Product, 'id'>): Product {
    const newProduct = {
      ...product,
      id: uuidv4()
    };
    this.mockData.products.push(newProduct);
    return newProduct;
  }

  static updateProduct(id: string, updates: Partial<Product>): Product | null {
    const index = this.mockData.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    
    const updatedProduct = {
      ...this.mockData.products[index],
      ...updates
    };
    this.mockData.products[index] = updatedProduct;
    return updatedProduct;
  }

  static deleteProduct(id: string): boolean {
    const index = this.mockData.products.findIndex(p => p.id === id);
    if (index === -1) return false;
    
    this.mockData.products.splice(index, 1);
    return true;
  }

  // Orders
  static async getOrders(): Promise<Order[]> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*, leads!orders_lead_id_fkey(name)')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching orders:', error);
        return [];
      }
      
      return data.map(order => ({
        ...order,
        id: order.id,
        leadId: order.lead_id,
        leadName: order.leads?.name || 'Unknown',
        products: order.products || [],
        totalAmount: order.total_value || 0,
        paymentStatus: order.payment_status,
        createdAt: order.created_at,
        updatedAt: order.updated_at
      }));
    } catch (error) {
      console.error('Error in getOrders:', error);
      return [];
    }
  }

  static async addOrder(order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    try {
      // Make sure user_id is included
      const newOrder = {
        ...order,
        user_id: (await supabase.auth.getUser()).data.user?.id || ''
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([{
          lead_id: newOrder.leadId,
          products: newOrder.products,
          total_value: newOrder.totalAmount,
          status: newOrder.status,
          payment_status: newOrder.paymentStatus,
          user_id: newOrder.user_id
        }])
        .select();

      if (error) {
        console.error('Error adding order:', error);
        throw error;
      }

      // Fetch lead name
      let leadName = 'Unknown';
      if (data[0].lead_id) {
        const { data: leadData } = await supabase
          .from('leads')
          .select('name')
          .eq('id', data[0].lead_id)
          .single();
        
        if (leadData) {
          leadName = leadData.name;
        }
      }

      return {
        ...data[0],
        leadId: data[0].lead_id,
        leadName,
        products: data[0].products || [],
        totalAmount: data[0].total_value || 0,
        paymentStatus: data[0].payment_status,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at
      };
    } catch (error) {
      console.error('Error in addOrder:', error);
      throw error;
    }
  }

  static async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({
          lead_id: updates.leadId,
          products: updates.products,
          total_value: updates.totalAmount,
          status: updates.status,
          payment_status: updates.paymentStatus
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating order:', error);
        throw error;
      }

      // Fetch lead name
      let leadName = 'Unknown';
      if (data[0].lead_id) {
        const { data: leadData } = await supabase
          .from('leads')
          .select('name')
          .eq('id', data[0].lead_id)
          .single();
        
        if (leadData) {
          leadName = leadData.name;
        }
      }

      return {
        ...data[0],
        leadId: data[0].lead_id,
        leadName,
        products: data[0].products || [],
        totalAmount: data[0].total_value || 0,
        paymentStatus: data[0].payment_status,
        createdAt: data[0].created_at,
        updatedAt: data[0].updated_at
      };
    } catch (error) {
      console.error('Error in updateOrder:', error);
      throw error;
    }
  }

  static async deleteOrder(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting order:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteOrder:', error);
      return false;
    }
  }

  // Documents
  static getDocuments(): Document[] {
    return this.mockData.documents;
  }

  static addDocument(document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>): Document {
    const now = new Date().toISOString();
    const newDocument = {
      ...document,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now
    };
    this.mockData.documents.push(newDocument);
    return newDocument;
  }

  static updateDocument(id: string, updates: Partial<Document>): Document | null {
    const index = this.mockData.documents.findIndex(d => d.id === id);
    if (index === -1) return null;
    
    const updatedDocument = {
      ...this.mockData.documents[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.mockData.documents[index] = updatedDocument;
    return updatedDocument;
  }

  static deleteDocument(id: string): boolean {
    const index = this.mockData.documents.findIndex(d => d.id === id);
    if (index === -1) return false;
    
    this.mockData.documents.splice(index, 1);
    return true;
  }
}
