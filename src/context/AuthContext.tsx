
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'sales' | 'manager' | 'employee';
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  userRole: string | null;
  isAdmin: boolean;
  signUp: (email: string, password: string, metadata?: { first_name?: string; last_name?: string }) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authChecked, setAuthChecked] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const getUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        return null;
      }

      return data?.role;
    } catch (error) {
      console.error('Unexpected error fetching user role:', error);
      return null;
    }
  };

  const checkIsAdmin = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .rpc('is_admin');

      if (error) {
        console.error('Error checking admin status:', error);
        return false;
      }

      return data || false;
    } catch (error) {
      console.error('Unexpected error checking admin status:', error);
      return false;
    }
  };

  useEffect(() => {
    // Check if there's an active session
    const fetchSession = async () => {
      try {
        setLoading(true);
        console.log("Fetching session...");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error fetching session:", error);
        } else {
          console.log("Session fetched:", data.session ? "Found" : "None");
          setSession(data.session);
          
          if (data.session?.user) {
            setUser(data.session.user);
            const role = await getUserRole(data.session.user.id);
            setUserRole(role);
            const adminStatus = await checkIsAdmin(data.session.user.id);
            setIsAdmin(adminStatus);
          } else {
            setUser(null);
            setUserRole(null);
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.error("Unexpected error fetching session:", error);
      } finally {
        setLoading(false);
        setAuthChecked(true);
      }
    };

    fetchSession();

    // Set up a listener for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event);
      setSession(newSession);
      
      if (newSession?.user) {
        setUser(newSession.user);
        const role = await getUserRole(newSession.user.id);
        setUserRole(role);
        const adminStatus = await checkIsAdmin(newSession.user.id);
        setIsAdmin(adminStatus);
      } else {
        setUser(null);
        setUserRole(null);
        setIsAdmin(false);
      }
      
      setLoading(false);
      setAuthChecked(true);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Add a safety timeout to ensure loading state doesn't get stuck
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading && !authChecked) {
        console.log("Auth check timeout reached, forcing loading to false");
        setLoading(false);
      }
    }, 3000); // Reduced to 3 seconds timeout
    
    return () => clearTimeout(timeout);
  }, [loading, authChecked]);

  const signUp = async (
    email: string, 
    password: string, 
    metadata?: { first_name?: string; last_name?: string }
  ) => {
    try {
      console.log("Signing up user with email:", email);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });
      
      if (!error) {
        toast({
          title: "Account created successfully",
          description: "Please check your email to verify your account.",
        });
      } else {
        console.error("Error in signup:", error);
      }
      
      return { error };
    } catch (error) {
      console.error("Error signing up:", error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Signing in user with email:", email);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error("Error in signin:", error);
      } else {
        console.log("Sign in successful");
      }
      
      return { error };
    } catch (error) {
      console.error("Error signing in:", error);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out user");
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setUserRole(null);
      setIsAdmin(false);
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    session,
    isAuthenticated: !!user,
    loading,
    userRole,
    isAdmin,
    signUp,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
