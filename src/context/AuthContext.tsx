
import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";

interface UserMetadata {
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signUp: (email: string, password: string, metadata: UserMetadata) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
  userRole: string | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAuthenticated: false,
  signIn: async () => ({
    error: null,
    data: null,
  }),
  signUp: async () => ({
    error: null,
    data: null,
  }),
  signOut: async () => {},
  userRole: null,
  isAdmin: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Get current session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error fetching session:", error);
          setLoading(false);
          return;
        }

        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          setIsAuthenticated(true);
          
          // Fetch user role from database
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', currentSession.user.id)
            .single();
          
          if (roleError) {
            console.error("Error fetching user role:", roleError);
          } else if (roleData) {
            setUserRole(roleData.role);
            setIsAdmin(roleData.role === 'admin');
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error in fetchSession:", error);
        setLoading(false);
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log("Auth state changed:", event);
      setSession(newSession);
      setUser(newSession?.user || null);
      setIsAuthenticated(!!newSession);

      if (newSession?.user) {
        // Fetch user role when auth state changes
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', newSession.user.id)
          .single();
        
        if (roleError) {
          console.error("Error fetching user role on auth change:", roleError);
        } else if (roleData) {
          setUserRole(roleData.role);
          setIsAdmin(roleData.role === 'admin');
        }
      } else {
        setUserRole(null);
        setIsAdmin(false);
      }
    });

    // Set a maximum timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log('Auth check timeout reached, forcing loading to false');
        setLoading(false);
      }
    }, 5000);

    return () => {
      authListener.subscription.unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) return { error, data: null };
      
      if (data.session && data.user) {
        // Fetch user role after successful sign in
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', data.user.id)
          .single();
        
        if (roleError) {
          console.error("Error fetching user role after sign in:", roleError);
        } else if (roleData) {
          setUserRole(roleData.role);
          setIsAdmin(roleData.role === 'admin');
        }
      }

      return { data, error: null };
    } catch (error) {
      console.error("Sign in error:", error);
      return { error, data: null };
    }
  };

  const signUp = async (email: string, password: string, metadata: UserMetadata) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      return { data, error };
    } catch (error) {
      console.error("Sign up error:", error);
      return { error, data: null };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUserRole(null);
      setIsAdmin(false);
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        userRole,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
