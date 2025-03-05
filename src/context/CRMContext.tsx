import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  CRMService, 
  Lead, 
  Manufacturer, 
  Order, 
  Product,
  Document // Assuming a Document type exists
} from '../services/crmService';

interface CRMContextType {
  leads: Lead[];
  manufacturers: Manufacturer[];
  orders: Order[];
  products: Product[];
  documents: Document[]; // Added documents
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateLead: (id: string, updates: Partial<Lead>) => void;
  deleteLead: (id: string) => void;
  addManufacturer: (manufacturer: Omit<Manufacturer, 'id' | 'createdAt'>) => void;
  updateManufacturer: (id: string, updates: Partial<Manufacturer>) => void;
  deleteManufacturer: (id: string) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateOrder: (id: string, updates: Partial<Order>) => void;
  deleteOrder: (id: string) => void;
  addDocument: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => void; // Added document methods
  updateDocument: (id: string, updates: Partial<Document>) => void; // Added document methods
  deleteDocument: (id: string) => void; // Added document methods
  refreshData: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

export const CRMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]); // Added documents state

  const refreshData = () => {
    setLeads(CRMService.getLeads());
    setManufacturers(CRMService.getManufacturers());
    setOrders(CRMService.getOrders());
    setProducts(CRMService.getProducts());
    setDocuments(CRMService.getDocuments()); // Added documents refresh
  };

  useEffect(() => {
    CRMService.initializeData();
    refreshData();
  }, []);

  const addLead = (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    CRMService.addLead(lead);
    refreshData();
  };

  const updateLead = (id: string, updates: Partial<Lead>) => {
    CRMService.updateLead(id, updates);
    refreshData();
  };

  const deleteLead = (id: string) => {
    CRMService.deleteLead(id);
    refreshData();
  };

  const addManufacturer = (manufacturer: Omit<Manufacturer, 'id' | 'createdAt'>) => {
    CRMService.addManufacturer(manufacturer);
    refreshData();
  };

  const updateManufacturer = (id: string, updates: Partial<Manufacturer>) => {
    CRMService.updateManufacturer(id, updates);
    refreshData();
  };

  const deleteManufacturer = (id: string) => {
    CRMService.deleteManufacturer(id);
    refreshData();
  };

  const addProduct = (product: Omit<Product, 'id'>) => {
    CRMService.addProduct(product);
    refreshData();
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    CRMService.updateProduct(id, updates);
    refreshData();
  };

  const deleteProduct = (id: string) => {
    CRMService.deleteProduct(id);
    refreshData();
  };

  const addOrder = (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    CRMService.addOrder(order);
    refreshData();
  };

  const updateOrder = (id: string, updates: Partial<Order>) => {
    CRMService.updateOrder(id, updates);
    refreshData();
  };

  const deleteOrder = (id: string) => {
    CRMService.deleteOrder(id);
    refreshData();
  };

  const addDocument = (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => { // Added document methods
    CRMService.addDocument(document); // Assuming CRMService.addDocument exists
    refreshData();
  };

  const updateDocument = (id: string, updates: Partial<Document>) => { // Added document methods
    CRMService.updateDocument(id, updates); // Assuming CRMService.updateDocument exists
    refreshData();
  };

  const deleteDocument = (id: string) => { // Added document methods
    CRMService.deleteDocument(id); // Assuming CRMService.deleteDocument exists
    refreshData();
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