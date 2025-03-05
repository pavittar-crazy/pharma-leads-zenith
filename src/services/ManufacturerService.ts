
import { supabase } from "@/integrations/supabase/client";
import { Manufacturer } from "@/types/supabase";

export const ManufacturerService = {
  getManufacturers: async () => {
    try {
      const { data, error } = await supabase
        .from('manufacturers')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching manufacturers:', error);
      return { data: null, error };
    }
  },

  getManufacturer: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('manufacturers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching manufacturer ${id}:`, error);
      return { data: null, error };
    }
  },

  createManufacturer: async (manufacturer: Omit<Manufacturer, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('manufacturers')
        .insert([{ ...manufacturer, user_id: userData.user.id }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating manufacturer:', error);
      return { data: null, error };
    }
  },

  updateManufacturer: async (id: string, manufacturer: Partial<Manufacturer>) => {
    try {
      const { data, error } = await supabase
        .from('manufacturers')
        .update(manufacturer)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error updating manufacturer ${id}:`, error);
      return { data: null, error };
    }
  },

  deleteManufacturer: async (id: string) => {
    try {
      const { error } = await supabase
        .from('manufacturers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error(`Error deleting manufacturer ${id}:`, error);
      return { error };
    }
  }
};
