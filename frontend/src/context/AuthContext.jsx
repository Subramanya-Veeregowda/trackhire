import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("lookjobs_user");
    return raw ? JSON.parse(raw) : null;
  });

  const login = (payload) => {
    localStorage.setItem("lookjobs_token", payload.token);
    localStorage.setItem("lookjobs_user", JSON.stringify({ name: payload.name, email: payload.email }));
    setUser({ name: payload.name, email: payload.email });
  };

  const logout = () => {
    localStorage.removeItem("lookjobs_token");
    localStorage.removeItem("lookjobs_user");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
