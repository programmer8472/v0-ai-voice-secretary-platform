'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserRole } from './types';
import { mockUsers, mockTenants } from './mock-data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  currentTenant: typeof mockTenants[0] | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const currentTenant = user?.tenantId
    ? mockTenants.find((t) => t.id === user.tenantId) || null
    : null;

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Find user by email (mock authentication)
    const foundUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      return true;
    }

    // Default to platform admin for demo purposes
    if (email) {
      setUser(mockUsers[0]);
      return true;
    }

    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  // For demo: allow switching between roles
  const switchRole = useCallback((role: UserRole) => {
    const userWithRole = mockUsers.find((u) => u.role === role);
    if (userWithRole) {
      setUser(userWithRole);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
        currentTenant,
      }}
    >
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
