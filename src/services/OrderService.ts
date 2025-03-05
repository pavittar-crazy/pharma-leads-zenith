
import { supabase } from "@/integrations/supabase/client";
import { Order } from "@/types/supabase";

export const OrderService = {
  getOrders: async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      return { data: null, error };
    }
  },

  getOrder: async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error fetching order ${id}:`, error);
      return { data: null, error };
    }
  },

  createOrder: async (order: Omit<Order, 'id' | 'created_at' | 'updated_at' | 'user_id'>) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('orders')
        .insert([{ ...order, user_id: userData.user.id }])
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error('Error creating order:', error);
      return { data: null, error };
    }
  },

  updateOrder: async (id: string, order: Partial<Order>) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update(order)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      console.error(`Error updating order ${id}:`, error);
      return { data: null, error };
    }
  },

  deleteOrder: async (id: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error(`Error deleting order ${id}:`, error);
      return { error };
    }
  }
};
