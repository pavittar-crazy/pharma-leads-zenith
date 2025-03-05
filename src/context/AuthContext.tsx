import React, { createContext, useState, useContext, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

// Trial user constant
const TRIAL_USER = {
  id: "trial-user-id",
  email: "trial@example.com",
  name: "Trial User"
};

// Define mock trial user
const TRIAL_USER_MOCK = {
  id: "trial-user-123",
  email: "trial@example.com",
  name: "Trial User",
  role: "trial"
};

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

type AuthState = 'LOADING' | 'SIGNED_OUT' | 'SIGNED_IN' | 'TOKEN_REFRESHED';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  authState: AuthState;
  signIn: (email: string, password: string) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signUp: (email: string, password: string, metadata?: any) => Promise<{
    error: any | null;
    data: any | null;
  }>;
  signOut: () => Promise<void>;
  userRole: string | null;
  isAdmin: boolean;
  continueAsTrial: () => void;
  isTrialUser: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  authState: 'LOADING',
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
  continueAsTrial: () => {},
  isTrialUser: false,
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

// Define admin user
const ADMIN_USER = {
  id: "admin-user-id",
  email: "admin@gmail.com",
  name: "Admin User",
  password: "admin123"
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authState, setAuthState] = useState<AuthState>('LOADING');
  const [isTrialUser, setIsTrialUser] = useState(false);

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
        setIsTrialUser(parsedAuth.isTrialUser || false);
        setAuthState('SIGNED_IN');
      } else {
        // Auto sign-in for demo purposes
        setUser(mockUser);
        setSession(mockSession);
        setUserRole('admin');
        setIsAdmin(true);
        setIsTrialUser(false);
        setAuthState('SIGNED_IN');

        // Store auth state
        localStorage.setItem('crm_auth', JSON.stringify({
          user: mockUser,
          session: mockSession,
          userRole: 'admin',
          isAdmin: true,
          isTrialUser: false
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

  useEffect(() => {
    console.log("Auth state changed:", authState);
  }, [authState]);

  const signIn = async (email: string, password: string) => {
    // Simulate auth for demo
    if (email && password) {
      // Check for admin login
      if (email === ADMIN_USER.email && password === ADMIN_USER.password) {
        const adminUserObj = {
          ...mockUser,
          id: ADMIN_USER.id,
          email: ADMIN_USER.email,
          user_metadata: {
            ...mockUser.user_metadata,
            first_name: ADMIN_USER.name.split(' ')[0],
            last_name: ADMIN_USER.name.split(' ')[1] || '',
          }
        };

        const adminSession = { ...mockSession, user: adminUserObj };

        setUser(adminUserObj);
        setSession(adminSession);
        setUserRole('admin');
        setIsAdmin(true);
        setIsTrialUser(false);
        setAuthState('SIGNED_IN');

        // Store auth state
        localStorage.setItem('crm_auth', JSON.stringify({
          user: adminUserObj,
          session: adminSession,
          userRole: 'admin',
          isAdmin: true,
          isTrialUser: false
        }));

        return { data: { user: adminUserObj, session: adminSession }, error: null };
      }

      // Regular user login
      const user = { ...mockUser, email };
      const session = { ...mockSession, user };

      setUser(user);
      setSession(session);
      setUserRole('user');
      setIsAdmin(false);
      setIsTrialUser(false);
      setAuthState('SIGNED_IN');

      // Store auth state
      localStorage.setItem('crm_auth', JSON.stringify({
        user,
        session,
        userRole: 'user',
        isAdmin: false,
        isTrialUser: false
      }));

      return { data: { user, session }, error: null };
    }

    return { 
      data: null, 
      error: { message: 'Invalid email or password' } 
    };
  };

  const signUp = async (email: string, password: string, metadata: any = {}) => {
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
      setIsTrialUser(false);
      setAuthState('SIGNED_IN');

      // Store auth state
      localStorage.setItem('crm_auth', JSON.stringify({
        user,
        session,
        userRole: 'user',
        isAdmin: false,
        isTrialUser: false
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
    setIsTrialUser(false);
    setAuthState('SIGNED_OUT');
    localStorage.removeItem('crm_auth');
  };

  const continueAsTrial = () => {
    console.log("Continuing as trial user");
    const trialUserObj = {
      ...mockUser,
      id: TRIAL_USER.id,
      email: TRIAL_USER.email,
      user_metadata: {
        ...mockUser.user_metadata,
        first_name: TRIAL_USER.name.split(' ')[0],
        last_name: TRIAL_USER.name.split(' ')[1] || '',
      }
    };

    const trialSession = { ...mockSession, user: trialUserObj };

    setUser(trialUserObj);
    setSession(trialSession);
    setUserRole('trial');
    setIsAdmin(false);
    setIsTrialUser(true);
    setAuthState('SIGNED_IN');

    // Store auth state for trial user
    localStorage.setItem('crm_auth', JSON.stringify({
      user: trialUserObj,
      session: trialSession,
      userRole: 'trial',
      isAdmin: false,
      isTrialUser: true
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        authState,
        signIn,
        signUp,
        signOut,
        userRole,
        isAdmin,
        continueAsTrial,
        isTrialUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};