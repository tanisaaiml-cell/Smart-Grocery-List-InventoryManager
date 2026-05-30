import { createContext, useContext, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("groceryUser")) || null);
  const [token, setToken] = useState(() => localStorage.getItem("groceryToken") || null);

  const saveSession = (data) => {
    setUser(data.user);
    setToken(data.token);
    localStorage.setItem("groceryUser", JSON.stringify(data.user));
    localStorage.setItem("groceryToken", data.token);
  };

  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);
    saveSession(data);
  };

  const login = async (payload) => {
    const { data } = await api.post("/auth/login", payload);
    saveSession(data);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("groceryUser");
    localStorage.removeItem("groceryToken");
  };

  const value = useMemo(() => ({ user, token, register, login, logout }), [user, token]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
