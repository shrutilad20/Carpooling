// src/hooks/useAuth.js
import { useEffect, useState } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    if (token && email) {
      setUser({ email, role });
    }
    setLoading(false);
  }, []);

  const login = (email, role) => {
    localStorage.setItem("token", "mock_token");
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);

    setUser({ email, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");

    setUser(null);
  };

  return { user, loading, login, logout };
}
