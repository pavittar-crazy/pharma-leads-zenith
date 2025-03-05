
import { v4 as uuidv4 } from 'uuid';

// Define types for our CRM data
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
    source: 'Referral',
    score: 85,
    lastContact: new Date().toISOString(),
    notes: 'Interested in bulk orders for hospital pharmacy',
    priority: 'high',
    location: 'Mumbai',
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
    source: 'Conference',
    score: 72,
    lastContact: new Date().toISOString(),
    notes: 'Follow up next week about vitamin packages',
    priority: 'medium',
    location: 'Delhi',
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
    location: 'Mumbai, Maharashtra',
    products: ['Antibiotics', 'Analgesics', 'Anti-inflammatory'],
    minOrderValue: 10000,
    certifications: ['ISO', 'GMP'],
    rating: 4.5,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    name: 'NatureCare Pharma',
    contactPerson: 'Anita Desai',
    email: 'anita@naturecare.com',
    phone: '+91 88776 65544',
    location: 'Ahmedabad, Gujarat',
    products: ['Ayurvedic Medicines', 'Herbal Supplements'],
    minOrderValue: 5000,
    certifications: ['Ayush Premium'],
    rating: 4.2,
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const sampleProducts: Product[] = [
  {
    id: uuidv4(),
    name: 'Pavitol 500mg',
    manufacturerId: 'MediChem Industries',
    category: 'Pain Relief',
    price: 120,
    description: 'Effective pain relief for moderate to severe pain',
    inStock: true,
    minOrderQuantity: 100,
    leadTime: 7
  },
  {
    id: uuidv4(),
    name: 'ImmuBoost Plus',
    manufacturerId: 'NatureCare Pharma',
    category: 'Supplements',
    price: 350,
    description: 'Immunity boosting multivitamin supplement',
    inStock: true,
    minOrderQuantity: 50,
    leadTime: 5
  }
];

const sampleOrders: Order[] = [
  {
    id: uuidv4(),
    clientId: sampleLeads[0].id,
    clientName: sampleLeads[0].name,
    clientCompany: sampleLeads[0].company,
    products: [
      {
        id: sampleProducts[0].id,
        name: sampleProducts[0].name,
        quantity: 100,
        price: sampleProducts[0].price
      }
    ],
    totalValue: 100 * sampleProducts[0].price,
    status: 'confirmed',
    manufacturerId: 'MediChem Industries',
    paymentStatus: 'paid',
    orderDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// CRM Service
export const CRMService = {
  initializeData: () => {
    // Initialize leads if not exists
    if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
      localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(sampleLeads));
    }
    
    // Initialize manufacturers if not exists
    if (!localStorage.getItem(STORAGE_KEYS.MANUFACTURERS)) {
      localStorage.setItem(STORAGE_KEYS.MANUFACTURERS, JSON.stringify(sampleManufacturers));
    }
    
    // Initialize products if not exists
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(sampleProducts));
    }
    
    // Initialize orders if not exists
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(sampleOrders));
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
    const index = manufacturers.findIndex(m => m.id === id);
    
    if (index !== -1) {
      manufacturers[index] = {
        ...manufacturers[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.MANUFACTURERS, JSON.stringify(manufacturers));
      return manufacturers[index];
    }
    
    return null;
  },
  
  deleteManufacturer: (id: string) => {
    const manufacturers = CRMService.getManufacturers();
    const filtered = manufacturers.filter(m => m.id !== id);
    
    localStorage.setItem(STORAGE_KEYS.MANUFACTURERS, JSON.stringify(filtered));
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
    const index = orders.findIndex(o => o.id === id);
    
    if (index !== -1) {
      orders[index] = {
        ...orders[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
      return orders[index];
    }
    
    return null;
  },
  
  deleteOrder: (id: string) => {
    const orders = CRMService.getOrders();
    const filtered = orders.filter(o => o.id !== id);
    
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(filtered));
    return true;
  },
  
  // Product methods
  getProducts: (): Product[] => {
    const products = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    return products ? JSON.parse(products) : [];
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
    const index = documents.findIndex(d => d.id === id);
    
    if (index !== -1) {
      documents[index] = {
        ...documents[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
      return documents[index];
    }
    
    return null;
  },
  
  deleteDocument: (id: string) => {
    const documents = CRMService.getDocuments();
    const filtered = documents.filter(d => d.id !== id);
    
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(filtered));
    return true;
  }
};
