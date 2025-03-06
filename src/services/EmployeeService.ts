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

export type UserRole = 'admin' | 'manager' | 'sales' | 'employee';

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
  role: UserRole;
}

export async function getEmployees(): Promise<EmployeeWithDetails[]> {
  try {
    // Get employees with profiles and roles
    const { data, error } = await supabase
      .from('employees')
      .select(`
        *,
        profiles:user_id(id, first_name, last_name, email, avatar_url, created_at, updated_at),
        user_roles:user_id(role)
      `);

    if (error) {
      console.error('Error fetching employees:', error);
      return [];
    }

    // Map and format the data to match our expected types
    const employees = data.map(item => {
      // Handle the case when profiles or user_roles have errors
      const profile = item.profiles && typeof item.profiles === 'object' && !('error' in item.profiles) 
        ? item.profiles as unknown as UserProfile 
        : {
            id: 'unknown',
            first_name: 'Unknown',
            last_name: 'User',
            email: null,
            avatar_url: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };
        
      const roleObj = item.user_roles && typeof item.user_roles === 'object' && !('error' in item.user_roles)
        ? item.user_roles
        : { role: 'employee' };
        
      const role = (typeof roleObj.role === 'string' ? roleObj.role : 'employee') as UserRole;

      return {
        id: item.id,
        user_id: item.user_id,
        department: item.department,
        position: item.position,
        manager_id: item.manager_id,
        joining_date: item.joining_date,
        created_at: item.created_at,
        updated_at: item.updated_at,
        profile,
        role
      };
    });

    return employees;
  } catch (error) {
    console.error('Error in getEmployees:', error);
    return [];
  }
}

export async function getEmployeeById(id: string): Promise<EmployeeWithDetails | null> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select(`
        *,
        profiles:user_id(id, first_name, last_name, email, avatar_url, created_at, updated_at),
        user_roles:user_id(role)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching employee:', error);
      return null;
    }

    // Handle the case when profiles or user_roles have errors
    const profile = data.profiles && typeof data.profiles === 'object' && !('error' in data.profiles) 
      ? data.profiles as unknown as UserProfile 
      : {
          id: 'unknown',
          first_name: 'Unknown',
          last_name: 'User',
          email: null,
          avatar_url: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
      
    const roleObj = data.user_roles && typeof data.user_roles === 'object' && !('error' in data.user_roles)
      ? data.user_roles
      : { role: 'employee' };
      
    const role = (typeof roleObj.role === 'string' ? roleObj.role : 'employee') as UserRole;

    return {
      id: data.id,
      user_id: data.user_id,
      department: data.department,
      position: data.position,
      manager_id: data.manager_id,
      joining_date: data.joining_date,
      created_at: data.created_at,
      updated_at: data.updated_at,
      profile,
      role
    };
  } catch (error) {
    console.error('Error in getEmployeeById:', error);
    return null;
  }
}

export async function updateEmployee(id: string, updates: Partial<Employee>): Promise<EmployeeWithDetails | null> {
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
      
    return getEmployeeById(id);
  } catch (error) {
    console.error('Error in updateEmployee:', error);
    return null;
  }
}

export async function updateEmployeeRole(userId: string, role: 'admin' | 'manager' | 'sales' | 'employee'): Promise<boolean> {
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

export async function deleteEmployee(id: string): Promise<boolean> {
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

export async function mockData(): Promise<EmployeeWithDetails[]> {
  return [
    {
      id: '1',
      user_id: '1',
      department: 'Sales',
      position: 'Sales Manager',
      manager_id: null,
      joining_date: '2022-01-15',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profile: {
        id: '1',
        first_name: 'Ankit',
        last_name: 'Sharma',
        email: 'ankit@example.com',
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      role: {
        id: '1',
        user_id: '1',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    },
    {
      id: '2',
      user_id: '2',
      department: 'Marketing',
      position: 'Marketing Director',
      manager_id: null,
      joining_date: '2022-02-10',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      profile: {
        id: '2',
        first_name: 'Preeti',
        last_name: 'Gupta',
        email: 'preeti@example.com',
        avatar_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      role: {
        id: '2',
        user_id: '2',
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
    }
  ];
}
