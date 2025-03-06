import { supabase } from "../integrations/supabase/client";
import { UserProfile, Employee, EmployeeWithDetails, UserRole } from "../types/employee";

export class EmployeeService {
  static async getEmployees(): Promise<Employee[]> {
    try {
      const { data: employees, error } = await supabase
        .from("employees")
        .select("*");

      if (error) {
        console.error("Error fetching employees:", error);
        return [];
      }

      return employees;
    } catch (error) {
      console.error("Error in getEmployees:", error);
      return [];
    }
  }

  static async addEmployee(employee: Omit<Employee, 'id' | 'created_at' | 'updated_at'>): Promise<Employee | null> {
    try {
      const { data, error } = await supabase
        .from("employees")
        .insert([employee])
        .select()
        .single();

      if (error) {
        console.error("Error adding employee:", error);
        return null;
      }

      return data as Employee;
    } catch (error) {
      console.error("Error in addEmployee:", error);
      return null;
    }
  }

  static async updateEmployee(id: string, updates: Partial<Employee>): Promise<Employee | null> {
    try {
      const { data, error } = await supabase
        .from("employees")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating employee:", error);
        return null;
      }

      return data as Employee;
    } catch (error) {
      console.error("Error in updateEmployee:", error);
      return null;
    }
  }

  static async deleteEmployee(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from("employees")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting employee:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error in deleteEmployee:", error);
      return false;
    }
  }

  static async getEmployeesWithDetails(): Promise<EmployeeWithDetails[]> {
    try {
      const { data: employees, error } = await supabase
        .from("employees")
        .select(`
          *,
          profiles:user_id(*),
          user_roles:user_id(role)
        `);

      if (error) {
        console.error("Error fetching employees with details:", error);
        return [];
      }

      return employees.map(employee => {
        // Using type assertions to handle the nested objects
        const profile = employee.profiles as unknown as UserProfile;
        const userRoleData = employee.user_roles as unknown as { role: string }[] | null;
        
        const role = userRoleData && userRoleData.length > 0 
          ? (userRoleData[0].role as UserRole) 
          : "employee" as UserRole;

        return {
          id: employee.id,
          user_id: employee.user_id,
          department: employee.department,
          position: employee.position,
          joining_date: employee.joining_date,
          manager_id: employee.manager_id,
          created_at: employee.created_at,
          updated_at: employee.updated_at,
          profile: {
            id: profile.id,
            first_name: profile.first_name,
            last_name: profile.last_name,
            email: profile.email,
            avatar_url: profile.avatar_url,
            created_at: profile.created_at,
            updated_at: profile.updated_at
          },
          role
        };
      });
    } catch (error) {
      console.error("Error in getEmployeesWithDetails:", error);
      return [];
    }
  }

  static async getManagers(): Promise<Employee[]> {
    try {
      const { data: employees, error } = await supabase
        .from("employees")
        .select("*")
        .contains('position', ['manager']);

      if (error) {
        console.error("Error fetching employees:", error);
        return [];
      }

      return employees;
    } catch (error) {
      console.error("Error in getEmployees:", error);
      return [];
    }
  }

  static async getEmployeeDetails(id: string): Promise<EmployeeWithDetails | null> {
    try {
      const { data: employee, error } = await supabase
        .from("employees")
        .select(`
          *,
          profiles:user_id(*),
          user_roles:user_id(role)
        `)
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching employee details:", error);
        return null;
      }

      // Using type assertions to handle the nested objects
      const profile = employee.profiles as unknown as UserProfile;
      const userRoleData = employee.user_roles as unknown as { role: string }[] | null;
      
      const role = userRoleData && userRoleData.length > 0 
        ? (userRoleData[0].role as UserRole) 
        : "employee" as UserRole;

      return {
        id: employee.id,
        user_id: employee.user_id,
        department: employee.department,
        position: employee.position,
        joining_date: employee.joining_date,
        manager_id: employee.manager_id,
        created_at: employee.created_at,
        updated_at: employee.updated_at,
        profile: {
          id: profile.id,
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          avatar_url: profile.avatar_url,
          created_at: profile.created_at,
          updated_at: profile.updated_at
        },
        role
      };
    } catch (error) {
      console.error("Error in getEmployeeDetails:", error);
      return null;
    }
  }

  static async getRoles(userId: string): Promise<UserRole | null> {
    try {
      const { data: existingRoles, error: fetchError } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", userId);

      if (fetchError) {
        console.error("Error fetching existing roles:", fetchError);
        return null;
      }

      if (existingRoles && existingRoles.length > 0) {
        return existingRoles[0].role as UserRole;
      }

      return null
    } catch (error) {
      console.error("Error in assignRole:", error);
      return null;
    }
  }

  static async assignRole(userId: string, role: UserRole): Promise<boolean> {
    try {
      // Check if role already exists
      const { data: existingRoles, error: fetchError } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", userId);

      if (fetchError) {
        console.error("Error fetching existing roles:", fetchError);
        return false;
      }

      if (existingRoles && existingRoles.length > 0) {
        // Update existing role
        const { error: updateError } = await supabase
          .from("user_roles")
          .update({ role })
          .eq("user_id", userId);

        if (updateError) {
          console.error("Error updating role:", updateError);
          return false;
        }
      } else {
        // Insert new role
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert([{ user_id: userId, role }]);

        if (insertError) {
          console.error("Error inserting role:", insertError);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Error in assignRole:", error);
      return false;
    }
  }

  static async getProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      return data as UserProfile;
    } catch (error) {
      console.error("Error in getProfile:", error);
      return null;
    }
  }
}
