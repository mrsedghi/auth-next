'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

type User = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
  };
};

type AuthContextType = {
  user: User | null;
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for user data on initial load
    const storedUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
      const data = await response.json();
      const userData = data.results[0];
      
      setUser({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        picture: userData.picture
      });
      
      localStorage.setItem('user', JSON.stringify({
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        picture: userData.picture
      }));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}