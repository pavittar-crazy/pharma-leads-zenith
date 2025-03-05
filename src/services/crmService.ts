
import { v4 as uuidv4 } from 'uuid';

// Define types for our CRM data
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed';
  value: number;
  products: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  products: string[];
  status: 'active' | 'inactive';
  notes: string;
  createdAt: string;
}

export interface Order {
  id: string;
  leadId: string;
  leadName: string;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid';
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  price: number;
  stock: number;
  description: string;
}

// Initialize local storage or get existing data
const getStorageData = <T>(key: string, initialValue: T[]): T[] => {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return initialValue;
  }
};

// Save data to local storage
const setStorageData = <T>(key: string, value: T[]): void => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
};

// Sample data
const sampleLeads: Lead[] = [
  {
    id: uuidv4(),
    name: 'Dr. Rajesh Kumar',
    company: 'City Hospital',
    email: 'rajesh.kumar@cityhospital.com',
    phone: '+91 98765 43210',
    status: 'qualified',
    value: 50000,
    products: ['Antibiotics', 'Pain Relief'],
    notes: 'Interested in bulk orders for hospital pharmacy',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'Dr. Priya Sharma',
    company: 'Wellness Clinic',
    email: 'priya.s@wellnessclinic.com',
    phone: '+91 87654 32109',
    status: 'contacted',
    value: 25000,
    products: ['Vitamins', 'Supplements'],
    notes: 'Follow up next week about vitamin packages',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const sampleManufacturers: Manufacturer[] = [
  {
    id: uuidv4(),
    name: 'MediChem Industries',
    contactPerson: 'Vikram Mehta',
    email: 'vikram@medichem.com',
    phone: '+91 99887 76655',
    address: '123 Industrial Area, Mumbai, Maharashtra',
    products: ['Antibiotics', 'Analgesics', 'Anti-inflammatory'],
    status: 'active',
    notes: 'Primary supplier for antibiotics',
    createdAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'NatureCare Pharma',
    contactPerson: 'Anita Desai',
    email: 'anita@naturecare.com',
    phone: '+91 88776 65544',
    address: '456 Pharma Park, Ahmedabad, Gujarat',
    products: ['Ayurvedic Medicines', 'Herbal Supplements'],
    status: 'active',
    notes: 'Specializes in natural remedies',
    createdAt: new Date().toISOString()
  }
];

const sampleProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Pavitol 500mg',
    manufacturer: 'MediChem Industries',
    category: 'Pain Relief',
    price: 120,
    stock: 1000,
    description: 'Effective pain relief for moderate to severe pain'
  },
  {
    id: uuidv4(),
    name: 'ImmuBoost Plus',
    manufacturer: 'NatureCare Pharma',
    category: 'Supplements',
    price: 350,
    stock: 500,
    description: 'Immunity boosting multivitamin supplement'
  }
];

const sampleOrders: Order[] = [
  {
    id: uuidv4(),
    leadId: sampleLeads[0].id,
    leadName: sampleLeads[0].name,
    products: [
      {
        id: sampleProducts[0].id,
        name: sampleProducts[0].name,
        quantity: 100,
        price: sampleProducts[0].price
      }
    ],
    totalAmount: 100 * sampleProducts[0].price,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Initialize data with samples if no data exists
const initializeData = () => {
  const leads = getStorageData<Lead>('crm_leads', []);
  const manufacturers = getStorageData<Manufacturer>('crm_manufacturers', []);
  const orders = getStorageData<Order>('crm_orders', []);
  const products = getStorageData<Product>('crm_products', []);
  
  if (leads.length === 0) {
    setStorageData('crm_leads', sampleLeads);
  }
  
  if (manufacturers.length === 0) {
    setStorageData('crm_manufacturers', sampleManufacturers);
  }
  
  if (orders.length === 0) {
    setStorageData('crm_orders', sampleOrders);
  }
  
  if (products.length === 0) {
    setStorageData('crm_products', sampleProducts);
  }
};

// CRM Service
export const CRMService = {
  initializeData,
  
  // Lead operations
  getLeads: (): Lead[] => {
    return getStorageData<Lead>('crm_leads', []);
  },
  
  getLead: (id: string): Lead | undefined => {
    const leads = getStorageData<Lead>('crm_leads', []);
    return leads.find(lead => lead.id === id);
  },
  
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>): Lead => {
    const leads = getStorageData<Lead>('crm_leads', []);
    const newLead: Lead = {
      ...lead,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    leads.push(newLead);
    setStorageData('crm_leads', leads);
    return newLead;
  },
  
  updateLead: (id: string, updates: Partial<Lead>): Lead | null => {
    const leads = getStorageData<Lead>('crm_leads', []);
    const index = leads.findIndex(lead => lead.id === id);
    
    if (index === -1) return null;
    
    const updatedLead = {
      ...leads[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    leads[index] = updatedLead;
    setStorageData('crm_leads', leads);
    return updatedLead;
  },
  
  deleteLead: (id: string): boolean => {
    const leads = getStorageData<Lead>('crm_leads', []);
    const filtered = leads.filter(lead => lead.id !== id);
    
    if (filtered.length === leads.length) return false;
    
    setStorageData('crm_leads', filtered);
    return true;
  },
  
  // Manufacturer operations
  getManufacturers: (): Manufacturer[] => {
    return getStorageData<Manufacturer>('crm_manufacturers', []);
  },
  
  getManufacturer: (id: string): Manufacturer | undefined => {
    const manufacturers = getStorageData<Manufacturer>('crm_manufacturers', []);
    return manufacturers.find(manufacturer => manufacturer.id === id);
  },
  
  addManufacturer: (manufacturer: Omit<Manufacturer, 'id' | 'createdAt'>): Manufacturer => {
    const manufacturers = getStorageData<Manufacturer>('crm_manufacturers', []);
    const newManufacturer: Manufacturer = {
      ...manufacturer,
      id: uuidv4(),
      createdAt: new Date().toISOString()
    };
    
    manufacturers.push(newManufacturer);
    setStorageData('crm_manufacturers', manufacturers);
    return newManufacturer;
  },
  
  updateManufacturer: (id: string, updates: Partial<Manufacturer>): Manufacturer | null => {
    const manufacturers = getStorageData<Manufacturer>('crm_manufacturers', []);
    const index = manufacturers.findIndex(manufacturer => manufacturer.id === id);
    
    if (index === -1) return null;
    
    const updatedManufacturer = {
      ...manufacturers[index],
      ...updates
    };
    
    manufacturers[index] = updatedManufacturer;
    setStorageData('crm_manufacturers', manufacturers);
    return updatedManufacturer;
  },
  
  deleteManufacturer: (id: string): boolean => {
    const manufacturers = getStorageData<Manufacturer>('crm_manufacturers', []);
    const filtered = manufacturers.filter(manufacturer => manufacturer.id !== id);
    
    if (filtered.length === manufacturers.length) return false;
    
    setStorageData('crm_manufacturers', filtered);
    return true;
  },
  
  // Product operations
  getProducts: (): Product[] => {
    return getStorageData<Product>('crm_products', []);
  },
  
  addProduct: (product: Omit<Product, 'id'>): Product => {
    const products = getStorageData<Product>('crm_products', []);
    const newProduct: Product = {
      ...product,
      id: uuidv4()
    };
    
    products.push(newProduct);
    setStorageData('crm_products', products);
    return newProduct;
  },
  
  updateProduct: (id: string, updates: Partial<Product>): Product | null => {
    const products = getStorageData<Product>('crm_products', []);
    const index = products.findIndex(product => product.id === id);
    
    if (index === -1) return null;
    
    const updatedProduct = {
      ...products[index],
      ...updates
    };
    
    products[index] = updatedProduct;
    setStorageData('crm_products', products);
    return updatedProduct;
  },
  
  deleteProduct: (id: string): boolean => {
    const products = getStorageData<Product>('crm_products', []);
    const filtered = products.filter(product => product.id !== id);
    
    if (filtered.length === products.length) return false;
    
    setStorageData('crm_products', filtered);
    return true;
  },
  
  // Order operations
  getOrders: (): Order[] => {
    return getStorageData<Order>('crm_orders', []);
  },
  
  getOrder: (id: string): Order | undefined => {
    const orders = getStorageData<Order>('crm_orders', []);
    return orders.find(order => order.id === id);
  },
  
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order => {
    const orders = getStorageData<Order>('crm_orders', []);
    const newOrder: Order = {
      ...order,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    orders.push(newOrder);
    setStorageData('crm_orders', orders);
    return newOrder;
  },
  
  updateOrder: (id: string, updates: Partial<Order>): Order | null => {
    const orders = getStorageData<Order>('crm_orders', []);
    const index = orders.findIndex(order => order.id === id);
    
    if (index === -1) return null;
    
    const updatedOrder = {
      ...orders[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    orders[index] = updatedOrder;
    setStorageData('crm_orders', orders);
    return updatedOrder;
  },
  
  deleteOrder: (id: string): boolean => {
    const orders = getStorageData<Order>('crm_orders', []);
    const filtered = orders.filter(order => order.id !== id);
    
    if (filtered.length === orders.length) return false;
    
    setStorageData('crm_orders', orders);
    return true;
  }
};
import { v4 as uuidv4 } from 'uuid';

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  source: string;
  score: number;
  lastContact: string;
  nextFollowUp?: string;
  notes?: string;
  assignedTo?: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
}

export interface Manufacturer {
  id: string;
  name: string;
  location: string;
  products: string[];
  minOrderValue: number;
  certifications: string[];
  contactPerson: string;
  email: string;
  phone: string;
  rating: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  manufacturerId: string;
  category: string;
  inStock: boolean;
  minOrderQuantity: number;
  leadTime: number;
  imageUrl?: string;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  clientCompany: string;
  products: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  totalValue: number;
  status: string;
  manufacturerId: string;
  paymentStatus: string;
  orderDate: string;
  deliveryDate?: string;
  trackingInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  relatedTo: string;
  relatedId: string;
  fileUrl: string;
  size: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEYS = {
  LEADS: 'crm_leads',
  MANUFACTURERS: 'crm_manufacturers',
  PRODUCTS: 'crm_products',
  ORDERS: 'crm_orders',
  DOCUMENTS: 'crm_documents',
};

export const CRMService = {
  initializeData: () => {
    // Initialize leads if not exists
    if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify([]));
    }
    
    // Initialize manufacturers if not exists
    if (!localStorage.getItem(STORAGE_KEYS.MANUFACTURERS)) {
      localStorage.setItem(STORAGE_KEYS.MANUFACTURERS, JSON.stringify([]));
    }
    
    // Initialize products if not exists
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([]));
    }
    
    // Initialize orders if not exists
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    }

    // Initialize documents if not exists
    if (!localStorage.getItem(STORAGE_KEYS.DOCUMENTS)) {
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify([]));
    }
  },
  
  // Lead methods
  getLeads: (): Lead[] => {
    const leads = localStorage.getItem(STORAGE_KEYS.LEADS);
    return leads ? JSON.parse(leads) : [];
  },
  
  addLead: (lead: Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>) => {
    const leads = CRMService.getLeads();
    const now = new Date().toISOString();
    
    const newLead: Lead = {
      ...lead,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify([...leads, newLead]));
    return newLead;
  },
  
  updateLead: (id: string, updates: Partial<Lead>) => {
    const leads = CRMService.getLeads();
    const leadIndex = leads.findIndex(lead => lead.id === id);
    
    if (leadIndex !== -1) {
      leads[leadIndex] = {
        ...leads[leadIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
      return leads[leadIndex];
    }
    
    return null;
  },
  
  deleteLead: (id: string) => {
    const leads = CRMService.getLeads();
    const filteredLeads = leads.filter(lead => lead.id !== id);
    
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(filteredLeads));
    return true;
  },
  
  // Manufacturer methods
  getManufacturers: (): Manufacturer[] => {
    const manufacturers = localStorage.getItem(STORAGE_KEYS.MANUFACTURERS);
    return manufacturers ? JSON.parse(manufacturers) : [];
  },
  
  addManufacturer: (manufacturer: Omit<Manufacturer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const manufacturers = CRMService.getManufacturers();
    const now = new Date().toISOString();
    
    const newManufacturer: Manufacturer = {
      ...manufacturer,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    
    localStorage.setItem(STORAGE_KEYS.MANUFACTURERS, JSON.stringify([...manufacturers, newManufacturer]));
    return newManufacturer;
  },
  
  updateManufacturer: (id: string, updates: Partial<Manufacturer>) => {
    const manufacturers = CRMService.getManufacturers();
    const manufacturerIndex = manufacturers.findIndex(manufacturer => manufacturer.id === id);
    
    if (manufacturerIndex !== -1) {
      manufacturers[manufacturerIndex] = {
        ...manufacturers[manufacturerIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.MANUFACTURERS, JSON.stringify(manufacturers));
      return manufacturers[manufacturerIndex];
    }
    
    return null;
  },
  
  deleteManufacturer: (id: string) => {
    const manufacturers = CRMService.getManufacturers();
    const filteredManufacturers = manufacturers.filter(manufacturer => manufacturer.id !== id);
    
    localStorage.setItem(STORAGE_KEYS.MANUFACTURERS, JSON.stringify(filteredManufacturers));
    return true;
  },
  
  // Product methods
  getProducts: (): Product[] => {
    const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return products ? JSON.parse(products) : [];
  },
  
  addProduct: (product: Omit<Product, 'id'>) => {
    const products = CRMService.getProducts();
    
    const newProduct: Product = {
      ...product,
      id: uuidv4(),
    };
    
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([...products, newProduct]));
    return newProduct;
  },
  
  updateProduct: (id: string, updates: Partial<Product>) => {
    const products = CRMService.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    
    if (productIndex !== -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...updates,
      };
      
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
      return products[productIndex];
    }
    
    return null;
  },
  
  deleteProduct: (id: string) => {
    const products = CRMService.getProducts();
    const filteredProducts = products.filter(product => product.id !== id);
    
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filteredProducts));
    return true;
  },
  
  // Order methods
  getOrders: (): Order[] => {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  },
  
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
    const orders = CRMService.getOrders();
    const now = new Date().toISOString();
    
    const newOrder: Order = {
      ...order,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([...orders, newOrder]));
    return newOrder;
  },
  
  updateOrder: (id: string, updates: Partial<Order>) => {
    const orders = CRMService.getOrders();
    const orderIndex = orders.findIndex(order => order.id === id);
    
    if (orderIndex !== -1) {
      orders[orderIndex] = {
        ...orders[orderIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      return orders[orderIndex];
    }
    
    return null;
  },
  
  deleteOrder: (id: string) => {
    const orders = CRMService.getOrders();
    const filteredOrders = orders.filter(order => order.id !== id);
    
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(filteredOrders));
    return true;
  },

  // Document methods
  getDocuments: (): Document[] => {
    const documents = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return documents ? JSON.parse(documents) : [];
  },
  
  addDocument: (document: Omit<Document, 'id' | 'createdAt' | 'updatedAt'>) => {
    const documents = CRMService.getDocuments();
    const now = new Date().toISOString();
    
    const newDocument: Document = {
      ...document,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    };
    
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify([...documents, newDocument]));
    return newDocument;
  },
  
  updateDocument: (id: string, updates: Partial<Document>) => {
    const documents = CRMService.getDocuments();
    const documentIndex = documents.findIndex(document => document.id === id);
    
    if (documentIndex !== -1) {
      documents[documentIndex] = {
        ...documents[documentIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
      return documents[documentIndex];
    }
    
    return null;
  },
  
  deleteDocument: (id: string) => {
    const documents = CRMService.getDocuments();
    const filteredDocuments = documents.filter(document => document.id !== id);
    
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(filteredDocuments));
    return true;
  }
};
