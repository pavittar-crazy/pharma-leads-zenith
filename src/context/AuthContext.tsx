
import React, { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
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
          setUser(data.session?.user || null);
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
    const { data: authListener } = supabase.auth.onAuthStateChange((event, newSession) => {
      console.log("Auth state changed:", event);
      setSession(newSession);
      setUser(newSession?.user || null);
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
    }, 10000); // 10 seconds timeout
    
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
