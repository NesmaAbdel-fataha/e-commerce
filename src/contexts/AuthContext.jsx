import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const AUTH_KEY = "auth_token";

function getInitialAuth() {
  return Boolean(localStorage.getItem(AUTH_KEY));
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(getInitialAuth);

  const login = ({ token }) => {
    localStorage.setItem(AUTH_KEY, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}


