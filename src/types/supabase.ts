
export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  user_id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  status: string;
  source: string | null;
  score: number;
  last_contact: string;
  next_follow_up: string | null;
  notes: string | null;
  priority: string;
  created_at: string;
  updated_at: string;
}

export interface Manufacturer {
  id: string;
  user_id: string;
  name: string;
  location: string | null;
  products: string[] | null;
  min_order_value: number | null;
  certifications: string[] | null;
  contact_person: string | null;
  email: string | null;
  phone: string | null;
  rating: number | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  lead_id: string | null;
  manufacturer_id: string | null;
  products: any | null;
  total_value: number | null;
  status: string;
  payment_status: string;
  order_date: string;
  delivery_date: string | null;
  tracking_info: string | null;
  created_at: string;
  updated_at: string;
}
