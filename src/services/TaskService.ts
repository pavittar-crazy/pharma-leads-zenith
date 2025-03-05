
import { supabase } from "@/integrations/supabase/client";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  assigned_by: string;
  assigned_to: string;
  lead_id: string | null;
  status: string;
  priority: string;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskCreateInput {
  title: string;
  description?: string;
  assigned_to: string;
  lead_id?: string;
  status?: string;
  priority?: string;
  due_date?: string;
}

export interface TaskUpdateInput {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  due_date?: string;
}

export const TaskService = {
  async getTasks() {
    return supabase
      .from('tasks')
      .select(`
        *,
        lead:leads(name, company),
        assigned_by_user:profiles!tasks_assigned_by_fkey(first_name, last_name),
        assigned_to_user:profiles!tasks_assigned_to_fkey(first_name, last_name)
      `)
      .order('created_at', { ascending: false });
  },

  async getTaskById(id: string) {
    return supabase
      .from('tasks')
      .select(`
        *,
        lead:leads(name, company),
        assigned_by_user:profiles!tasks_assigned_by_fkey(first_name, last_name),
        assigned_to_user:profiles!tasks_assigned_to_fkey(first_name, last_name)
      `)
      .eq('id', id)
      .single();
  },

  async createTask(taskData: TaskCreateInput) {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    return supabase
      .from('tasks')
      .insert({
        ...taskData,
        assigned_by: user.user.id
      })
      .select();
  },

  async updateTask(id: string, taskData: TaskUpdateInput) {
    return supabase
      .from('tasks')
      .update(taskData)
      .eq('id', id)
      .select();
  },

  async deleteTask(id: string) {
    return supabase
      .from('tasks')
      .delete()
      .eq('id', id);
  },

  async getTasksAssignedToMe() {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    return supabase
      .from('tasks')
      .select(`
        *,
        lead:leads(name, company),
        assigned_by_user:profiles!tasks_assigned_by_fkey(first_name, last_name)
      `)
      .eq('assigned_to', user.user.id)
      .order('due_date', { ascending: true });
  },

  async getTasksAssignedByMe() {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    return supabase
      .from('tasks')
      .select(`
        *,
        lead:leads(name, company),
        assigned_to_user:profiles!tasks_assigned_to_fkey(first_name, last_name)
      `)
      .eq('assigned_by', user.user.id)
      .order('created_at', { ascending: false });
  }
};
