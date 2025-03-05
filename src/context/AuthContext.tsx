import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

// Mock user interfaces to simulate Supabase types
interface User {
  id: string;
  email: string;
  user_metadata: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    company?: string;
  };
}

interface Session {
  user: User;
  access_token: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signUp: (email: string, password: string, metadata: any) => Promise<{
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

// Mock user for demo purposes
const mockUser: User = {
  id: uuidv4(),
  email: 'demo@pavittar-pharma.com',
  user_metadata: {
    first_name: 'Rishul',
    last_name: 'Chanana',
    company: 'Pavittar Pharmaceuticals'
  }
};

const mockSession: Session = {
  user: mockUser,
  access_token: 'mock-token-for-demo'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log('Fetching session...');

    // Simulate fetching a session
    const fetchSession = async () => {
      // For demo, check if we have a stored auth state
      const storedAuth = localStorage.getItem('crm_auth');

      if (storedAuth) {
        const parsedAuth = JSON.parse(storedAuth);
        setUser(parsedAuth.user);
        setSession(parsedAuth.session);
        setUserRole(parsedAuth.userRole);
        setIsAdmin(parsedAuth.isAdmin);
      } else {
        // Auto sign-in for demo purposes
        setUser(mockUser);
        setSession(mockSession);
        setUserRole('admin');
        setIsAdmin(true);

        // Store auth state
        localStorage.setItem('crm_auth', JSON.stringify({
          user: mockUser,
          session: mockSession,
          userRole: 'admin',
          isAdmin: true
        }));
      }

      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };

    fetchSession();

    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log('Auth check timeout reached, forcing loading to false');
        setLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate authentication for demo
    if (email && password) {
      const user = { ...mockUser, email };
      const session = { ...mockSession, user };

      setUser(user);
      setSession(session);
      setUserRole('admin');
      setIsAdmin(true);

      // Store auth state
      localStorage.setItem('crm_auth', JSON.stringify({
        user,
        session,
        userRole: 'admin',
        isAdmin: true
      }));

      return { data: { user, session }, error: null };
    }

    return { 
      data: null, 
      error: { message: 'Invalid email or password' } 
    };
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    // Simulate sign up for demo
    if (email && password) {
      const user = { 
        ...mockUser, 
        email, 
        user_metadata: metadata 
      };
      const session = { ...mockSession, user };

      setUser(user);
      setSession(session);
      setUserRole('user');
      setIsAdmin(false);

      // Store auth state
      localStorage.setItem('crm_auth', JSON.stringify({
        user,
        session,
        userRole: 'user',
        isAdmin: false
      }));

      return { data: { user, session }, error: null };
    }

    return { 
      data: null, 
      error: { message: 'Unable to create account' } 
    };
  };

  const signOut = async () => {
    setUser(null);
    setSession(null);
    setUserRole(null);
    setIsAdmin(false);
    localStorage.removeItem('crm_auth');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
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