import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("contentops_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("contentops_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const userData = { email: found.email, name: found.name };
      setUser(userData);
      localStorage.setItem("contentops_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("contentops_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem("contentops_users", JSON.stringify(users));
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem("contentops_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("contentops_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
