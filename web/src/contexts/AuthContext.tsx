// src/contexts/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  clearSession,
  getCurrentSession,
  setCurrentSession,
} from '../utils/currentSession';

interface Session {
  token: string;
  expires: number;
}

interface AuthContextType {
  session: Session | null;
  setSession: (session: Session | null) => void;
  clearSession: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSessionState] = useState<Session | null>(null);

  // Update the session state and local storage
  const setSession = (newSession: Session | null) => {
    console.log('Context set session: ', newSession);
    if (newSession) {
      console.log('NEW SESSION TRUEEEEEEEEEE: ', newSession.token);
      setCurrentSession(newSession.token); // Save to localStorage
    } else {
      console.log('NEW SESSION FAAAAAAAAAAALLLLLSSSSSSSSSSSSE');

      clearSession(); // Remove from localStorage
    }
    setSessionState(newSession); // Update React state
    console.log('Updated session: ', newSession);
  };

  const handleClearSession = () => {
    setSession(null);
  };

  useEffect(() => {
    const currentSession = getCurrentSession();
    if (currentSession) {
      setSessionState(currentSession);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, setSession, clearSession: handleClearSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
