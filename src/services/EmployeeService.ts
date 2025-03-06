
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, Employee, EmployeeWithDetails, UserRole } from '../types/supabase';

// Define a type to check if a value is a SelectQueryError
type SelectQueryError<T> = { error: true } & String;

// Function to check if an object is a SelectQueryError
function isSelectQueryError(obj: any): obj is SelectQueryError<any> {
  return obj && typeof obj === 'object' && 'error' in obj;
}

// Function to create a default profile when there's an error
function createDefaultProfile(): UserProfile {
  return {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    avatar_url: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
}

// Function to create a default user role
function createDefaultUserRole(): UserRole {
  return 'employee' as UserRole;
}

export async function getEmployees(): Promise<EmployeeWithDetails[]> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select(`
        *,
        profile:profiles(*),
        user_roles(role)
      `);

    if (error) {
      console.error('Error fetching employees:', error);
      return [];
    }

    // Transform the data to match our expected types
    const employees: EmployeeWithDetails[] = data.map(employee => {
      // Handle profile relation error
      const profile = isSelectQueryError(employee.profile) 
        ? createDefaultProfile() 
        : {
            id: employee.profile.id || '',
            first_name: employee.profile.first_name || '',
            last_name: employee.profile.last_name || '',
            email: employee.profile.email || '',
            avatar_url: employee.profile.avatar_url || '',
            created_at: employee.profile.created_at || '',
            updated_at: employee.profile.updated_at || ''
          };
      
      // Handle user_roles relation error
      let role: UserRole = createDefaultUserRole();
      if (!isSelectQueryError(employee.user_roles) && Array.isArray(employee.user_roles) && employee.user_roles.length > 0) {
        // Ensure the role is a valid UserRole
        const roleValue = employee.user_roles[0]?.role;
        if (roleValue === 'admin' || roleValue === 'sales' || roleValue === 'manager' || roleValue === 'employee') {
          role = roleValue;
        }
      }

      return {
        id: employee.id,
        user_id: employee.user_id,
        department: employee.department || '',
        position: employee.position || '',
        manager_id: employee.manager_id || '',
        joining_date: employee.joining_date || '',
        created_at: employee.created_at,
        updated_at: employee.updated_at,
        profile,
        role
      };
    });

    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return [];
  }
}

export async function getEmployeeById(id: string): Promise<EmployeeWithDetails | null> {
  try {
    const { data, error } = await supabase
      .from('employees')
      .select(`
        *,
        profile:profiles(*),
        user_roles(role)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching employee:', error);
      return null;
    }

    // Handle profile relation error
    const profile = isSelectQueryError(data.profile) 
      ? createDefaultProfile() 
      : {
          id: data.profile.id || '',
          first_name: data.profile.first_name || '',
          last_name: data.profile.last_name || '',
          email: data.profile.email || '',
          avatar_url: data.profile.avatar_url || '',
          created_at: data.profile.created_at || '',
          updated_at: data.profile.updated_at || ''
        };
    
    // Handle user_roles relation error
    let role: UserRole = createDefaultUserRole();
    if (!isSelectQueryError(data.user_roles) && Array.isArray(data.user_roles) && data.user_roles.length > 0) {
      // Ensure the role is a valid UserRole
      const roleValue = data.user_roles[0]?.role;
      if (roleValue === 'admin' || roleValue === 'sales' || roleValue === 'manager' || roleValue === 'employee') {
        role = roleValue;
      }
    }

    return {
      id: data.id,
      user_id: data.user_id,
      department: data.department || '',
      position: data.position || '',
      manager_id: data.manager_id || '',
      joining_date: data.joining_date || '',
      created_at: data.created_at,
      updated_at: data.updated_at,
      profile,
      role
    };
  } catch (error) {
    console.error('Error fetching employee:', error);
    return null;
  }
}

export async function addEmployee(employee: {
  user_id: string;
  department: string;
  position: string;
  manager_id?: string;
  joining_date: string;
  profile: {
    first_name: string;
    last_name: string;
    email: string;
    avatar_url?: string;
  };
  role: UserRole;
}): Promise<boolean> {
  try {
    // Start by inserting into profiles
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: employee.user_id, // Use the same ID as the user_id
        first_name: employee.profile.first_name,
        last_name: employee.profile.last_name,
        email: employee.profile.email,
        avatar_url: employee.profile.avatar_url || ''
      })
      .select()
      .single();

    if (profileError) {
      console.error('Error adding profile:', profileError);
      return false;
    }

    // Insert into employees
    const { data: employeeData, error: employeeError } = await supabase
      .from('employees')
      .insert({
        user_id: employee.user_id,
        department: employee.department,
        position: employee.position,
        manager_id: employee.manager_id,
        joining_date: employee.joining_date
      })
      .select()
      .single();

    if (employeeError) {
      console.error('Error adding employee:', employeeError);
      return false;
    }

    // Validate and ensure role is a valid UserRole
    let validRole: UserRole;
    if (employee.role === 'admin' || employee.role === 'sales' || employee.role === 'manager' || employee.role === 'employee') {
      validRole = employee.role;
    } else {
      validRole = 'employee'; // Default to employee if role is invalid
    }

    // Insert into user_roles
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: employee.user_id,
        role: validRole
      });

    if (roleError) {
      console.error('Error adding user role:', roleError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error adding employee:', error);
    return false;
  }
}

export async function updateEmployee(id: string, updates: Partial<EmployeeWithDetails>): Promise<boolean> {
  try {
    // Update the employee table
    if (updates.department || updates.position || updates.manager_id || updates.joining_date) {
      const { error: employeeError } = await supabase
        .from('employees')
        .update({
          department: updates.department,
          position: updates.position,
          manager_id: updates.manager_id,
          joining_date: updates.joining_date
        })
        .eq('id', id);

      if (employeeError) {
        console.error('Error updating employee:', employeeError);
        return false;
      }
    }

    // Update the profile if needed
    if (updates.profile) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: updates.profile.first_name,
          last_name: updates.profile.last_name,
          email: updates.profile.email,
          avatar_url: updates.profile.avatar_url
        })
        .eq('id', updates.user_id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
        return false;
      }
    }

    // Update the role if needed
    if (updates.role) {
      // Ensure role is a valid UserRole
      let validRole: UserRole;
      if (updates.role === 'admin' || updates.role === 'sales' || updates.role === 'manager' || updates.role === 'employee') {
        validRole = updates.role;
      } else {
        validRole = 'employee'; // Default to employee if role is invalid
      }

      const { error: roleError } = await supabase
        .from('user_roles')
        .update({
          role: validRole
        })
        .eq('user_id', updates.user_id);

      if (roleError) {
        console.error('Error updating user role:', roleError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error updating employee:', error);
    return false;
  }
}

export async function deleteEmployee(id: string): Promise<boolean> {
  try {
    // Get the employee first to get the user_id
    const { data: employee, error: fetchError } = await supabase
      .from('employees')
      .select('user_id')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error('Error fetching employee for deletion:', fetchError);
      return false;
    }

    // Delete from user_roles
    const { error: roleError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', employee.user_id);

    if (roleError) {
      console.error('Error deleting user role:', roleError);
    }

    // Delete from employees
    const { error: employeeError } = await supabase
      .from('employees')
      .delete()
      .eq('id', id);

    if (employeeError) {
      console.error('Error deleting employee:', employeeError);
      return false;
    }

    // Do not delete profile as it might be needed for historical data
    return true;
  } catch (error) {
    console.error('Error deleting employee:', error);
    return false;
  }
}
