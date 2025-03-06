
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CRMService, 
  Lead, 
  Manufacturer, 
  Order, 
  Product,
  Document
} from '../services/crmService';
import { toast } from "@/hooks/use-toast";

interface CRMContextType {
  leads: Lead[];
  manufacturers: Manufacturer[];
  orders: Order[];
  products: Product[];
  documents: Document[];
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Lead>;
  updateLead: (id: string, updates: Partial<Lead>) => Promise<Lead>;
  deleteLead: (id: string) => Promise<boolean>;
  addManufacturer: (manufacturer: Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Manufacturer>;
  updateManufacturer: (id: string, updates: Partial<Manufacturer>) => Promise<Manufacturer>;
  deleteManufacturer: (id: string) => Promise<boolean>;
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => Product | null;
  deleteProduct: (id: string) => boolean;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  updateOrder: (id: string, updates: Partial<Order>) => Promise<Order>;
  deleteOrder: (id: string) => Promise<boolean>;
  addDocument: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => Document;
  updateDocument: (id: string, updates: Partial<Document>) => Document | null;
  deleteDocument: (id: string) => boolean;
  refreshData: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);

  const refreshData = async () => {
    try {
      const fetchedLeads = await CRMService.getLeads();
      const fetchedManufacturers = await CRMService.getManufacturers();
      const fetchedOrders = await CRMService.getOrders();
      
      setLeads(fetchedLeads);
      setManufacturers(fetchedManufacturers);
      setOrders(fetchedOrders);
      setProducts(CRMService.getProducts());
      setDocuments(CRMService.getDocuments());
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast({
        title: "Error",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    CRMService.initializeData();
    refreshData();
  }, []);

  const addLead = async (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newLead = await CRMService.addLead(lead);
      console.log("New lead created:", newLead);
      
      // Immediately update the local state before refreshing data
      setLeads(prevLeads => [...prevLeads, newLead]);
      
      toast({
        title: "Success",
        description: "Lead added successfully",
      });
      
      // Refresh data to ensure everything is synced
      await refreshData();
      return newLead;
    } catch (error) {
      console.error("Error adding lead:", error);
      toast({
        title: "Error",
        description: "Failed to add lead. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateLead = async (id: string, updates: Partial<Lead>) => {
    try {
      const updatedLead = await CRMService.updateLead(id, updates);
      toast({
        title: "Success",
        description: "Lead updated successfully",
      });
      await refreshData();
      return updatedLead;
    } catch (error) {
      console.error("Error updating lead:", error);
      toast({
        title: "Error",
        description: "Failed to update lead. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteLead = async (id: string) => {
    try {
      const result = await CRMService.deleteLead(id);
      if (result) {
        toast({
          title: "Success",
          description: "Lead deleted successfully",
        });
      }
      await refreshData();
      return result;
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast({
        title: "Error",
        description: "Failed to delete lead. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const addManufacturer = async (manufacturer: Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newManufacturer = await CRMService.addManufacturer(manufacturer);
    await refreshData();
    return newManufacturer;
  };

  const updateManufacturer = async (id: string, updates: Partial<Manufacturer>) => {
    const updatedManufacturer = await CRMService.updateManufacturer(id, updates);
    await refreshData();
    return updatedManufacturer;
  };

  const deleteManufacturer = async (id: string) => {
    const result = await CRMService.deleteManufacturer(id);
    await refreshData();
    return result;
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = CRMService.addProduct(product);
    refreshData();
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProduct = CRMService.updateProduct(id, updates);
    refreshData();
    return updatedProduct;
  };

  const deleteProduct = (id: string) => {
    const result = CRMService.deleteProduct(id);
    refreshData();
    return result;
  };

  const addOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newOrder = await CRMService.addOrder(order);
    await refreshData();
    return newOrder;
  };

  const updateOrder = async (id: string, updates: Partial<Order>) => {
    const updatedOrder = await CRMService.updateOrder(id, updates);
    await refreshData();
    return updatedOrder;
  };

  const deleteOrder = async (id: string) => {
    const result = await CRMService.deleteOrder(id);
    await refreshData();
    return result;
  };

  const addDocument = (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newDocument = CRMService.addDocument(document);
    refreshData();
    return newDocument;
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    const updatedDocument = CRMService.updateDocument(id, updates);
    refreshData();
    return updatedDocument;
  };

  const deleteDocument = (id: string) => {
    const result = CRMService.deleteDocument(id);
    refreshData();
    return result;
  };

  return (
    <CRMContext.Provider
      value={{
        leads,
        manufacturers,
        orders,
        products,
        documents,
        addLead,
        updateLead,
        deleteLead,
        addManufacturer,
        updateManufacturer,
        deleteManufacturer,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        updateOrder,
        deleteOrder,
        addDocument,
        updateDocument,
        deleteDocument,
        refreshData
      }}
    >
      {children}
    </CRMContext.Provider>
  );
};

export const useCRM = (): CRMContextType => {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error('useCRM must be used within a CRMProvider');
  }
  return context;
};
