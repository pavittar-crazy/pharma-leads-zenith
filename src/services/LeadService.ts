
import { supabase } from "@/integrations/supabase/client";
import { Lead } from "@/types/supabase";

export const LeadService = {
  getLeads: async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching leads:', error);
      return { data: null, error };
    }
  },

  getLead: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching lead ${id}:`, error);
      return { data: null, error };
    }
  },

  createLead: async (lead: Omit<Lead, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('leads')
        .insert([{ ...lead, user_id: userData.user.id }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating lead:', error);
      return { data: null, error };
    }
  },

  updateLead: async (id: string, lead: Partial<Lead>) => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .update(lead)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error updating lead ${id}:`, error);
      return { data: null, error };
    }
  },

  deleteLead: async (id: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error(`Error deleting lead ${id}:`, error);
      return { error };
    }
  }
};
