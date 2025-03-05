
import { supabase } from "@/integrations/supabase/client";

export interface Event {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  start_time: string;
  end_time: string;
  all_day: boolean;
  lead_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventCreateInput {
  title: string;
  description?: string;
  start_time: string;
  end_time: string;
  all_day?: boolean;
  lead_id?: string;
}

export interface EventUpdateInput {
  title?: string;
  description?: string;
  start_time?: string;
  end_time?: string;
  all_day?: boolean;
  lead_id?: string;
}

export const EventService = {
  async getEvents(startDate?: string, endDate?: string) {
    let query = supabase
      .from('events')
      .select(`
        *,
        lead:leads(name, company),
        user:profiles(first_name, last_name)
      `)
      .order('start_time', { ascending: true });
    
    if (startDate) {
      query = query.gte('start_time', startDate);
    }
    
    if (endDate) {
      query = query.lte('end_time', endDate);
    }
    
    return query;
  },

  async getEventById(id: string) {
    return supabase
      .from('events')
      .select(`
        *,
        lead:leads(name, company),
        user:profiles(first_name, last_name)
      `)
      .eq('id', id)
      .single();
  },

  async createEvent(eventData: EventCreateInput) {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    return supabase
      .from('events')
      .insert({
        ...eventData,
        user_id: user.user.id
      })
      .select();
  },

  async updateEvent(id: string, eventData: EventUpdateInput) {
    return supabase
      .from('events')
      .update(eventData)
      .eq('id', id)
      .select();
  },

  async deleteEvent(id: string) {
    return supabase
      .from('events')
      .delete()
      .eq('id', id);
  },

  async getMyEvents(startDate?: string, endDate?: string) {
    const { data: user } = await supabase.auth.getUser();
    
    if (!user.user) {
      throw new Error('User not authenticated');
    }

    let query = supabase
      .from('events')
      .select(`
        *,
        lead:leads(name, company)
      `)
      .eq('user_id', user.user.id)
      .order('start_time', { ascending: true });
    
    if (startDate) {
      query = query.gte('start_time', startDate);
    }
    
    if (endDate) {
      query = query.lte('end_time', endDate);
    }
    
    return query;
  }
};
