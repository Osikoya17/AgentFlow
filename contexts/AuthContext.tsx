
import React, { createContext, useState, ReactNode, useContext, useEffect, useCallback } from 'react';
import { AuthContextType } from '../types';
import { NavigationContext } from './NavigationContext';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('agentflow-auth') === 'true';
    }
    return false;
  });
  // navigation can be (NavigationContextType | undefined)
  const navigation = useContext(NavigationContext);


  useEffect(() => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('agentflow-auth', String(isAuthenticated));
    }
  }, [isAuthenticated]);

  const loginUser = useCallback(() => {
    setIsAuthenticated(true); // setIsAuthenticated is stable
    if (navigation) {
      navigation.navigateTo('dashboard');
    } else {
        // This case should ideally not happen if AuthProvider is always a child of NavigationProvider
        console.warn("AuthProvider: NavigationContext not available at loginUser call time.");
    }
  }, [navigation, setIsAuthenticated]);

  const logoutUser = useCallback(() => {
    setIsAuthenticated(false); // setIsAuthenticated is stable
    if (navigation) {
      navigation.navigateTo('login');
    } else {
        // This case should ideally not happen
        console.warn("AuthProvider: NavigationContext not available at logoutUser call time.");
    }
  }, [navigation, setIsAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
