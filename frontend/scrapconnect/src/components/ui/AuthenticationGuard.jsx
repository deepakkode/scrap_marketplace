import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export default function AuthenticationGuard({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if(raw){ try{ setUser(JSON.parse(raw)); }catch{} }
    setLoading(false);
  }, []);

  const login = (data) => { localStorage.setItem("user", JSON.stringify(data)); setUser(data); };
  const logout = () => { localStorage.removeItem("user"); setUser(null); navigate("/login-screen"); };
  const register = (data) => login(data);

  const value = { user, isAuthenticated: !!user, login, logout, register };

  if(loading){
    return <div className="min-h-screen flex items-center justify-center"><div>Loading…</div></div>;
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
