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

interface AuthContextType {
  session: string | null;
  setSession: (session: string | null) => void;
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
  const [session, setSessionState] = useState<string | null>(null);

  // Update the session state and local storage
  const setSession = (newSession: string | null) => {
    if (newSession === null) {
      clearSession(); // Remove from localStorage
      return;
    }
    setCurrentSession(newSession); // Save to localStorage

    setSessionState(newSession); // Update React state
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
