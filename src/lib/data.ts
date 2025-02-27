
export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: "new" | "contacted" | "negotiation" | "qualified" | "closed" | "lost";
  source: string;
  score: number;
  lastContact: string;
  nextFollowUp?: string;
  notes?: string;
  assignedTo?: string;
  priority: "high" | "medium" | "low";
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
  status: "active" | "inactive";
}

export interface Order {
  id: string;
  client: {
    id: string;
    name: string;
    company: string;
  };
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalValue: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  manufacturer: string;
  paymentStatus: "pending" | "partial" | "complete";
  orderDate: string;
  deliveryDate?: string;
  lastUpdated: string;
  trackingInfo?: string;
}

export interface SalesRep {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  phone: string;
  role: string;
  region: string;
  totalSales: number;
  leadsConverted: number;
  target: number;
  performance: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  manufacturers: string[];
  minPrice: number;
  maxPrice: number;
  moq: number;
  leadTime: number;
  certificates: string[];
}

// Mock data for leads
export const mockLeads: Lead[] = [
  {
    id: "1",
    name: "Amit Sharma",
    company: "MediCorp Pharmaceuticals",
    email: "asharma@medicorp.com",
    phone: "+91 98765 43210",
    location: "Mumbai, MH",
    status: "new",
    source: "LinkedIn",
    score: 85,
    lastContact: "2023-10-12",
    priority: "high",
    notes: "Interested in bulk antibiotics supply",
  },
  {
    id: "2",
    name: "Priya Patel",
    company: "LifeCare Drugs",
    email: "priya@lifecare.in",
    phone: "+91 87654 32109",
    location: "Ahmedabad, GJ",
    status: "contacted",
    source: "IndiaMART",
    score: 72,
    lastContact: "2023-10-14",
    priority: "medium",
    notes: "Follow up on pricing discussion",
  },
  {
    id: "3",
    name: "Rajiv Mehta",
    company: "Wellness Pharma",
    email: "rajiv@wellnesspharma.com",
    phone: "+91 76543 21098",
    location: "Pune, MH",
    status: "negotiation",
    source: "Referral",
    score: 91,
    lastContact: "2023-10-08",
    priority: "high",
    nextFollowUp: "2023-10-20",
    notes: "Discussing contract terms for long-term supply",
  },
  {
    id: "4",
    name: "Sunita Gupta",
    company: "Global Health Solutions",
    email: "sunita@ghsolutions.in",
    phone: "+91 65432 10987",
    location: "Delhi, DL",
    status: "closed",
    source: "Conference",
    score: 95,
    lastContact: "2023-10-05",
    priority: "medium",
    notes: "Deal closed for 3-month supply contract",
  },
  {
    id: "5",
    name: "Vikram Reddy",
    company: "PureCare Pharmaceuticals",
    email: "vikram@purecare.com",
    phone: "+91 54321 09876",
    location: "Hyderabad, TG",
    status: "lost",
    source: "TradeIndia",
    score: 45,
    lastContact: "2023-09-28",
    priority: "low",
    notes: "Chose competitor due to pricing concerns",
  },
  {
    id: "6",
    name: "Nisha Kapoor",
    company: "Nova Medical Supplies",
    email: "nisha@novamedical.in",
    phone: "+91 43210 98765",
    location: "Bangalore, KA",
    status: "new",
    source: "Website",
    score: 78,
    lastContact: "2023-10-15",
    priority: "high",
    nextFollowUp: "2023-10-22",
    notes: "Interested in cardiovascular products",
  },
  {
    id: "7",
    name: "Sanjay Verma",
    company: "Healthway Industries",
    email: "sverma@healthway.com",
    phone: "+91 32109 87654",
    location: "Chennai, TN",
    status: "contacted",
    source: "Email Campaign",
    score: 68,
    lastContact: "2023-10-11",
    priority: "medium",
    notes: "Sent catalog of products",
  },
  {
    id: "8",
    name: "Ananya Singh",
    company: "VitaPlus Pharmaceuticals",
    email: "asingh@vitaplus.in",
    phone: "+91 21098 76543",
    location: "Kolkata, WB",
    status: "negotiation",
    source: "IndiaMART",
    score: 88,
    lastContact: "2023-10-09",
    priority: "high",
    nextFollowUp: "2023-10-19",
    notes: "Discussing bulk order of vitamins",
  },
  {
    id: "9",
    name: "Kiran Kumar",
    company: "Medi Solutions Ltd",
    email: "kiran@medisol.com",
    phone: "+91 98123 45678",
    location: "Jaipur, RJ",
    status: "qualified",
    source: "Trade Show",
    score: 82,
    lastContact: "2023-10-07",
    priority: "high",
    nextFollowUp: "2023-10-21",
    notes: "Qualified lead, ready for proposal",
  },
  {
    id: "10",
    name: "Deepak Sharma",
    company: "CureFast Pharmaceuticals",
    email: "deepak@curefast.in",
    phone: "+91 87321 65432",
    location: "Lucknow, UP",
    status: "contacted",
    source: "LinkedIn",
    score: 65,
    lastContact: "2023-10-13",
    priority: "medium",
    notes: "Initial discussion on product range",
  },
];

// Mock data for manufacturers
export const mockManufacturers: Manufacturer[] = [
  {
    id: "1",
    name: "Pharma Solutions Ltd",
    location: "Mumbai, Maharashtra",
    products: ["Antibiotics", "Analgesics", "Anti-inflammatory"],
    minOrderValue: 100000,
    certifications: ["ISO 9001", "GMP", "WHO-GMP"],
    contactPerson: "Rajesh Kumar",
    email: "rajesh@pharmasol.com",
    phone: "+91 98765 12345",
    rating: 4.8,
    status: "active",
  },
  {
    id: "2",
    name: "MedChem Industries",
    location: "Ahmedabad, Gujarat",
    products: ["Antibiotics", "Cardiovascular", "Antidiabetic"],
    minOrderValue: 80000,
    certifications: ["ISO 9001", "FDA Approved"],
    contactPerson: "Suresh Patel",
    email: "suresh@medchem.in",
    phone: "+91 87654 23456",
    rating: 4.5,
    status: "active",
  },
  {
    id: "3",
    name: "BioTech Pharmaceuticals",
    location: "Hyderabad, Telangana",
    products: ["Biologics", "Vaccines", "Immunosuppressants"],
    minOrderValue: 150000,
    certifications: ["ISO 9001", "GMP", "USFDA"],
    contactPerson: "Anand Reddy",
    email: "anand@biotech.com",
    phone: "+91 76543 34567",
    rating: 4.9,
    status: "active",
  },
  {
    id: "4",
    name: "Wellness Chemicals",
    location: "Pune, Maharashtra",
    products: ["Vitamins", "Minerals", "Supplements"],
    minOrderValue: 50000,
    certifications: ["ISO 9001", "FSSAI"],
    contactPerson: "Manish Deshmukh",
    email: "manish@wellnesschem.in",
    phone: "+91 65432 45678",
    rating: 4.2,
    status: "active",
  },
  {
    id: "5",
    name: "HealthCare Formulations",
    location: "Chennai, Tamil Nadu",
    products: ["Dermatological", "Ophthalmics", "Topical"],
    minOrderValue: 75000,
    certifications: ["ISO 9001", "GMP"],
    contactPerson: "Ramesh Iyer",
    email: "ramesh@hcf.com",
    phone: "+91 54321 56789",
    rating: 4.3,
    status: "active",
  },
  {
    id: "6",
    name: "Global Pharma Corp",
    location: "Delhi, NCR",
    products: ["Generics", "Antibiotics", "Antivirals"],
    minOrderValue: 120000,
    certifications: ["ISO 9001", "WHO-GMP", "EU-GMP"],
    contactPerson: "Vikram Singh",
    email: "vikram@globalpharma.in",
    phone: "+91 43210 67890",
    rating: 4.7,
    status: "active",
  },
  {
    id: "7",
    name: "NatureHerbs Ltd",
    location: "Dehradun, Uttarakhand",
    products: ["Herbal", "Ayurvedic", "Natural Supplements"],
    minOrderValue: 40000,
    certifications: ["ISO 9001", "AYUSH"],
    contactPerson: "Alok Sharma",
    email: "alok@natureherbs.com",
    phone: "+91 32109 78901",
    rating: 4.0,
    status: "inactive",
  },
  {
    id: "8",
    name: "SynthMed Laboratories",
    location: "Bangalore, Karnataka",
    products: ["Synthetic Drugs", "APIs", "Intermediates"],
    minOrderValue: 200000,
    certifications: ["ISO 9001", "GMP", "USFDA"],
    contactPerson: "Prakash Rao",
    email: "prakash@synthmed.in",
    phone: "+91 21098 89012",
    rating: 4.6,
    status: "active",
  },
];

// Mock data for orders
export const mockOrders: Order[] = [
  {
    id: "ORD001",
    client: {
      id: "1",
      name: "Amit Sharma",
      company: "MediCorp Pharmaceuticals",
    },
    products: [
      {
        name: "Amoxicillin 500mg",
        quantity: 10000,
        price: 5.5,
      },
      {
        name: "Ceftriaxone 1g",
        quantity: 5000,
        price: 12.75,
      },
    ],
    totalValue: 118750,
    status: "processing",
    manufacturer: "Pharma Solutions Ltd",
    paymentStatus: "partial",
    orderDate: "2023-10-02",
    lastUpdated: "2023-10-16",
  },
  {
    id: "ORD002",
    client: {
      id: "3",
      name: "Rajiv Mehta",
      company: "Wellness Pharma",
    },
    products: [
      {
        name: "Metformin 850mg",
        quantity: 20000,
        price: 3.2,
      },
    ],
    totalValue: 64000,
    status: "shipped",
    manufacturer: "MedChem Industries",
    paymentStatus: "complete",
    orderDate: "2023-09-25",
    deliveryDate: "2023-10-25",
    lastUpdated: "2023-10-12",
    trackingInfo: "SHIP123456789",
  },
  {
    id: "ORD003",
    client: {
      id: "4",
      name: "Sunita Gupta",
      company: "Global Health Solutions",
    },
    products: [
      {
        name: "Influenza Vaccine",
        quantity: 2000,
        price: 85,
      },
    ],
    totalValue: 170000,
    status: "delivered",
    manufacturer: "BioTech Pharmaceuticals",
    paymentStatus: "complete",
    orderDate: "2023-09-15",
    deliveryDate: "2023-10-05",
    lastUpdated: "2023-10-05",
    trackingInfo: "SHIP987654321",
  },
  {
    id: "ORD004",
    client: {
      id: "6",
      name: "Nisha Kapoor",
      company: "Nova Medical Supplies",
    },
    products: [
      {
        name: "Multivitamin Complex",
        quantity: 15000,
        price: 7.8,
      },
      {
        name: "Calcium + Vitamin D3",
        quantity: 10000,
        price: 6.5,
      },
    ],
    totalValue: 182000,
    status: "pending",
    manufacturer: "Wellness Chemicals",
    paymentStatus: "pending",
    orderDate: "2023-10-14",
    lastUpdated: "2023-10-14",
  },
  {
    id: "ORD005",
    client: {
      id: "8",
      name: "Ananya Singh",
      company: "VitaPlus Pharmaceuticals",
    },
    products: [
      {
        name: "Antifungal Cream",
        quantity: 8000,
        price: 9.25,
      },
    ],
    totalValue: 74000,
    status: "processing",
    manufacturer: "HealthCare Formulations",
    paymentStatus: "partial",
    orderDate: "2023-10-08",
    lastUpdated: "2023-10-15",
  },
  {
    id: "ORD006",
    client: {
      id: "2",
      name: "Priya Patel",
      company: "LifeCare Drugs",
    },
    products: [
      {
        name: "Generic Paracetamol",
        quantity: 30000,
        price: 2.1,
      },
      {
        name: "Generic Ibuprofen",
        quantity: 25000,
        price: 2.8,
      },
    ],
    totalValue: 133000,
    status: "shipped",
    manufacturer: "Global Pharma Corp",
    paymentStatus: "complete",
    orderDate: "2023-09-30",
    deliveryDate: "2023-10-20",
    lastUpdated: "2023-10-13",
    trackingInfo: "SHIP456789123",
  },
];

// Mock data for sales representatives
export const mockSalesReps: SalesRep[] = [
  {
    id: "1",
    name: "Vijay Kumar",
    email: "vijay@pharmaleads.com",
    phone: "+91 97865 43210",
    role: "Senior Sales Executive",
    region: "North India",
    totalSales: 2450000,
    leadsConverted: 24,
    target: 3000000,
    performance: 82,
  },
  {
    id: "2",
    name: "Sneha Desai",
    email: "sneha@pharmaleads.com",
    phone: "+91 86754 32109",
    role: "Sales Executive",
    region: "West India",
    totalSales: 1850000,
    leadsConverted: 19,
    target: 2000000,
    performance: 93,
  },
  {
    id: "3",
    name: "Rahul Khanna",
    email: "rahul@pharmaleads.com",
    phone: "+91 75643 21098",
    role: "Sales Executive",
    region: "South India",
    totalSales: 1650000,
    leadsConverted: 17,
    target: 2000000,
    performance: 83,
  },
  {
    id: "4",
    name: "Meera Rajan",
    email: "meera@pharmaleads.com",
    phone: "+91 64532 10987",
    role: "Sales Executive",
    region: "East India",
    totalSales: 1250000,
    leadsConverted: 13,
    target: 1500000,
    performance: 83,
  },
  {
    id: "5",
    name: "Amit Verma",
    email: "amitv@pharmaleads.com",
    phone: "+91 53421 09876",
    role: "Junior Sales Executive",
    region: "Central India",
    totalSales: 980000,
    leadsConverted: 10,
    target: 1200000,
    performance: 82,
  },
];

// Sample product data
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    manufacturers: ["Pharma Solutions Ltd", "Global Pharma Corp"],
    minPrice: 5.2,
    maxPrice: 5.8,
    moq: 5000,
    leadTime: 14,
    certificates: ["WHO-GMP", "FDA Approved"],
  },
  {
    id: "2",
    name: "Metformin 850mg",
    category: "Antidiabetic",
    manufacturers: ["MedChem Industries"],
    minPrice: 3.0,
    maxPrice: 3.5,
    moq: 10000,
    leadTime: 10,
    certificates: ["ISO 9001", "GMP"],
  },
  {
    id: "3",
    name: "Influenza Vaccine",
    category: "Vaccines",
    manufacturers: ["BioTech Pharmaceuticals"],
    minPrice: 80,
    maxPrice: 90,
    moq: 1000,
    leadTime: 21,
    certificates: ["USFDA", "WHO-GMP"],
  },
  {
    id: "4",
    name: "Multivitamin Complex",
    category: "Vitamins",
    manufacturers: ["Wellness Chemicals", "NatureHerbs Ltd"],
    minPrice: 7.5,
    maxPrice: 8.2,
    moq: 5000,
    leadTime: 7,
    certificates: ["FSSAI", "ISO 9001"],
  },
  {
    id: "5",
    name: "Antifungal Cream",
    category: "Dermatological",
    manufacturers: ["HealthCare Formulations"],
    minPrice: 9.0,
    maxPrice: 9.5,
    moq: 3000,
    leadTime: 12,
    certificates: ["GMP", "ISO 9001"],
  },
  {
    id: "6",
    name: "Generic Paracetamol",
    category: "Analgesics",
    manufacturers: ["Global Pharma Corp", "SynthMed Laboratories"],
    minPrice: 2.0,
    maxPrice: 2.3,
    moq: 20000,
    leadTime: 5,
    certificates: ["ISO 9001", "GMP"],
  },
  {
    id: "7",
    name: "Ceftriaxone 1g",
    category: "Antibiotics",
    manufacturers: ["Pharma Solutions Ltd", "MedChem Industries"],
    minPrice: 12.5,
    maxPrice: 13.2,
    moq: 2000,
    leadTime: 15,
    certificates: ["WHO-GMP", "ISO 9001"],
  },
  {
    id: "8",
    name: "Calcium + Vitamin D3",
    category: "Supplements",
    manufacturers: ["Wellness Chemicals", "NatureHerbs Ltd"],
    minPrice: 6.2,
    maxPrice: 6.8,
    moq: 5000,
    leadTime: 8,
    certificates: ["FSSAI", "AYUSH"],
  },
];
