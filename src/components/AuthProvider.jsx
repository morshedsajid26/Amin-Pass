"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthContext = createContext({});

export function AuthProvider({ children, role }) {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const name = role === "staff" ? "token" : "accessToken";
    const t = Cookies.get(name);
    setToken(t || null);

    if (!t) {
      if (role === "business") router.replace("/businessowner/signin");
      else if (role === "system") router.replace("/systemowner/signin");
      else router.replace("/staff/login");
    }
  }, [role]);

  const logout = () => {
    if (role === "staff") Cookies.remove("token", { path: "/" });
    else Cookies.remove("accessToken", { path: "/" });
    setToken(null);

    if (role === "business") router.replace("/businessowner/signin");
    else if (role === "system") router.replace("/systemowner/signin");
    else router.replace("/staff/login");
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
