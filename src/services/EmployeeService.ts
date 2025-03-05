
import { supabase } from "@/integrations/supabase/client";

export interface Employee {
  id: string;
  user_id: string;
  manager_id: string | null;
  department: string | null;
  position: string | null;
  joining_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployeeWithProfile extends Employee {
  profile: {
    first_name: string | null;
    last_name: string | null;
    email: string | null;
    avatar_url: string | null;
  };
  role: string | null;
}

export interface EmployeeUpdateInput {
  manager_id?: string | null;
  department?: string | null;
  position?: string | null;
  joining_date?: string | null;
}

export const EmployeeService = {
  async getEmployees() {
    return supabase
      .from('employees')
      .select(`
        *,
        profile:profiles(first_name, last_name, email, avatar_url),
        manager:employees(
          id,
          profile:profiles(first_name, last_name)
        ),
        role:user_roles(role)
      `)
      .order('created_at', { ascending: false });
  },

  async getEmployeeById(id: string) {
    return supabase
      .from('employees')
      .select(`
        *,
        profile:profiles(first_name, last_name, email, avatar_url),
        manager:employees(
          id,
          profile:profiles(first_name, last_name)
        ),
        role:user_roles(role)
      `)
      .eq('id', id)
      .single();
  },

  async updateEmployee(id: string, employeeData: EmployeeUpdateInput) {
    return supabase
      .from('employees')
      .update(employeeData)
      .eq('id', id)
      .select();
  },

  async updateEmployeeRole(userId: string, role: string) {
    // This is an admin-only operation due to RLS policies
    return supabase
      .from('user_roles')
      .update({ role })
      .eq('user_id', userId)
      .eq('role', role) // Update only the specific role
      .select();
  },

  async getMyProfile() {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    return supabase
      .from('employees')
      .select(`
        *,
        profile:profiles(first_name, last_name, email, avatar_url),
        manager:employees(
          id,
          profile:profiles(first_name, last_name)
        ),
        role:user_roles(role)
      `)
      .eq('user_id', user.user.id)
      .single();
  }
};
