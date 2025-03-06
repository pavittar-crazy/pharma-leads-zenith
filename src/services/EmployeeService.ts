
import { supabase } from '@/integrations/supabase/client';

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface Employee {
  id: string;
  user_id: string;
  department: string | null;
  position: string | null;
  manager_id: string | null;
  joining_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface EmployeeWithDetails extends Employee {
  profile: UserProfile;
  role: string;
}

export const EmployeeService = {
  async getEmployees(): Promise<EmployeeWithDetails[]> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select(`
          *,
          profiles(*),
          user_roles(*)
        `);

      if (error) {
        console.error('Error fetching employees:', error);
        return [];
      }

      return data.map(item => ({
        id: item.id,
        user_id: item.user_id,
        department: item.department,
        position: item.position,
        manager_id: item.manager_id,
        joining_date: item.joining_date,
        created_at: item.created_at,
        updated_at: item.updated_at,
        profile: item.profiles ? {
          id: item.profiles.id || '',
          first_name: item.profiles.first_name,
          last_name: item.profiles.last_name,
          email: item.profiles.email,
          avatar_url: item.profiles.avatar_url,
          created_at: item.profiles.created_at || '',
          updated_at: item.profiles.updated_at || ''
        } : {
          id: '',
          first_name: null,
          last_name: null,
          email: null,
          avatar_url: null,
          created_at: '',
          updated_at: ''
        },
        role: item.user_roles ? item.user_roles.role : 'employee'
      }));
    } catch (error) {
      console.error('Error in getEmployees:', error);
      return [];
    }
  },

  async getEmployeeById(id: string): Promise<EmployeeWithDetails | null> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select(`
          *,
          profiles(*),
          user_roles(*)
        `)
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching employee:', error);
        return null;
      }

      return {
        id: data.id,
        user_id: data.user_id,
        department: data.department,
        position: data.position,
        manager_id: data.manager_id,
        joining_date: data.joining_date,
        created_at: data.created_at,
        updated_at: data.updated_at,
        profile: data.profiles ? {
          id: data.profiles.id || '',
          first_name: data.profiles.first_name,
          last_name: data.profiles.last_name,
          email: data.profiles.email,
          avatar_url: data.profiles.avatar_url,
          created_at: data.profiles.created_at || '',
          updated_at: data.profiles.updated_at || ''
        } : {
          id: '',
          first_name: null,
          last_name: null,
          email: null,
          avatar_url: null,
          created_at: '',
          updated_at: ''
        },
        role: data.user_roles ? data.user_roles.role : 'employee'
      };
    } catch (error) {
      console.error('Error in getEmployeeById:', error);
      return null;
    }
  },

  async addEmployee(employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>): Promise<Employee | null> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([{
          user_id: employee.user_id,
          department: employee.department,
          position: employee.position,
          manager_id: employee.manager_id,
          joining_date: employee.joining_date
        }])
        .select();

      if (error) {
        console.error('Error adding employee:', error);
        return null;
      }

      return data[0];
    } catch (error) {
      console.error('Error in addEmployee:', error);
      return null;
    }
  },

  async updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee | null> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .update({
          department: updates.department,
          position: updates.position,
          manager_id: updates.manager_id,
          joining_date: updates.joining_date
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating employee:', error);
        return null;
      }

      return data[0];
    } catch (error) {
      console.error('Error in updateEmployee:', error);
      return null;
    }
  },

  async deleteEmployee(id: string): Promise<boolean> {
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
  },

  async getRoles(): Promise<UserRole[]> {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*');

      if (error) {
        console.error('Error fetching roles:', error);
        return [];
      }

      return data.map(role => ({
        id: role.id,
        user_id: role.user_id,
        role: role.role,
        created_at: role.created_at,
        updated_at: role.updated_at
      }));
    } catch (error) {
      console.error('Error in getRoles:', error);
      return [];
    }
  },

  async addRole(role: Omit<UserRole, 'id' | 'created_at' | 'updated_at'>): Promise<UserRole | null> {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .insert([{
          user_id: role.user_id,
          role: role.role
        }])
        .select();

      if (error) {
        console.error('Error adding role:', error);
        return null;
      }

      return {
        id: data[0].id,
        user_id: data[0].user_id,
        role: data[0].role,
        created_at: data[0].created_at,
        updated_at: data[0].updated_at
      };
    } catch (error) {
      console.error('Error in addRole:', error);
      return null;
    }
  },

  async updateRole(id: string, updates: Partial<UserRole>): Promise<UserRole | null> {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .update({
          role: updates.role
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating role:', error);
        return null;
      }

      return {
        id: data[0].id,
        user_id: data[0].user_id,
        role: data[0].role,
        created_at: data[0].created_at,
        updated_at: data[0].updated_at
      };
    } catch (error) {
      console.error('Error in updateRole:', error);
      return null;
    }
  },

  async deleteRole(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting role:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteRole:', error);
      return false;
    }
  }
};
