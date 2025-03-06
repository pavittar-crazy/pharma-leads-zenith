
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

export interface Employee {
  id: string;
  user_id: string;
  manager_id?: string;
  department?: string;
  position?: string;
  joining_date?: string;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'sales' | 'manager' | 'employee';
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeWithDetails extends Employee {
  profile?: UserProfile;
  role?: UserRole;
}

export class EmployeeService {
  static async getEmployees(): Promise<EmployeeWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select(`
          *,
          profiles:profiles(*),
          user_roles:user_roles(*)
        `)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching employees:', error);
        return [];
      }
      
      return data.map(employee => ({
        ...employee,
        profile: employee.profiles,
        role: employee.user_roles[0]
      }));
    } catch (error) {
      console.error('Error in getEmployees:', error);
      return [];
    }
  }

  static async getEmployee(id: string): Promise<EmployeeWithDetails | null> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select(`
          *,
          profiles:profiles(*),
          user_roles:user_roles(*)
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching employee:', error);
        return null;
      }
      
      return {
        ...data,
        profile: data.profiles,
        role: data.user_roles[0]
      };
    } catch (error) {
      console.error('Error in getEmployee:', error);
      return null;
    }
  }

  static async updateEmployee(id: string, updates: Partial<Employee>): Promise<EmployeeWithDetails | null> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .update({
          manager_id: updates.manager_id,
          department: updates.department,
          position: updates.position,
          joining_date: updates.joining_date
        })
        .eq('id', id)
        .select();
      
      if (error) {
        console.error('Error updating employee:', error);
        return null;
      }
      
      return this.getEmployee(id);
    } catch (error) {
      console.error('Error in updateEmployee:', error);
      return null;
    }
  }

  static async updateEmployeeRole(userId: string, role: 'admin' | 'sales' | 'manager' | 'employee'): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role })
        .eq('user_id', userId);
      
      if (error) {
        console.error('Error updating employee role:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in updateEmployeeRole:', error);
      return false;
    }
  }

  static async deleteEmployee(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting employee:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error in deleteEmployee:', error);
      return false;
    }
  }

  // Mock functions for demo purposes
  static mockData: {
    employees: EmployeeWithDetails[];
  } = {
    employees: [
      {
        id: uuidv4(),
        user_id: uuidv4(),
        manager_id: undefined,
        department: 'Sales',
        position: 'Sales Manager',
        joining_date: '2022-01-15',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profile: {
          id: uuidv4(),
          first_name: 'Ankit',
          last_name: 'Sharma',
          email: 'ankit@example.com',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        role: {
          id: uuidv4(),
          user_id: uuidv4(),
          role: 'admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      },
      {
        id: uuidv4(),
        user_id: uuidv4(),
        manager_id: undefined,
        department: 'Marketing',
        position: 'Marketing Director',
        joining_date: '2022-02-10',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        profile: {
          id: uuidv4(),
          first_name: 'Preeti',
          last_name: 'Gupta',
          email: 'preeti@example.com',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        role: {
          id: uuidv4(),
          user_id: uuidv4(),
          role: 'admin',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      }
    ]
  };
}
