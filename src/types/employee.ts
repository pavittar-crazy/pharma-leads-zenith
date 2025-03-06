
export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  user_id: string;
  department: string | null;
  position: string | null;
  joining_date: string | null;
  manager_id: string | null;
  created_at: string;
  updated_at: string;
}

export type UserRole = "admin" | "sales" | "manager" | "employee";

export interface EmployeeWithDetails extends Employee {
  profile: UserProfile;
  role: UserRole;
}
