import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  // Initialize from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated") || sessionStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    const storedRole = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (storedAuth === "true" && storedUser) {
      let parsedUser = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUser(parsedUser);
      if (storedRole) {
        setRole(storedRole);
      }

      // Auto-sync with backend if _id is missing
      if (!parsedUser._id) {
        fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/sync`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: parsedUser.email, name: parsedUser.name, role: storedRole })
        })
          .then((res) => res.json())
          .then((fullUser) => {
            if (fullUser && fullUser._id) {
              setUser(fullUser);
              localStorage.setItem("user", JSON.stringify(fullUser));
            }
          })
          .catch((err) => console.error("Failed to sync user", err));
      }
    }
  }, []);

  const login = (userData) => {
    return new Promise((resolve, reject) => {
      // Optimistically set partial user
      setIsAuthenticated(true);
      setUser(userData);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("user", JSON.stringify(userData));
      setRole(null);
      localStorage.removeItem("role");

      // Sync with backend immediately
      fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/users/sync`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userData.email,
          name: userData.name,
          googleId: userData.googleId,
          picture: userData.picture
        })
      })
        .then((res) => res.json())
        .then((fullUser) => {
          if (fullUser && fullUser._id) {
            setUser(fullUser);
            localStorage.setItem("user", JSON.stringify(fullUser));
            resolve(fullUser);
          } else {
            resolve(userData); // Fallback
          }
        })
        .catch((err) => {
          console.error("Failed to sync user on login", err);
          resolve(userData); // Still resolve to let them in optimistically
        });
    });
  };

  const loginWithPassword = async (email, password, rememberMe) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (res.ok) {
        setIsAuthenticated(true);
        setUser(data);
        if (data.role) setRole(data.role);

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("isAuthenticated", "true");
        storage.setItem("user", JSON.stringify(data));
        if (data.role) storage.setItem("role", data.role);

        return { success: true, user: data };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error("Login error", err);
      return { success: false, message: "Network error. Please try again." };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    sessionStorage.removeItem("isAuthenticated");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    navigate("/login");
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("role", selectedRole);
    if (selectedRole === "buyer") {
      navigate("/buyer/dashboard");
    } else {
      navigate("/seller/dashboard");
    }
  };

  const updateUser = (updatedData) => {
    setUser(updatedData);
    localStorage.setItem("user", JSON.stringify(updatedData));
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem("role", newRole);
    if (newRole === "buyer") {
      navigate("/buyer/dashboard");
    } else {
      navigate("/seller/dashboard");
    }
  };

  return <AuthContext.Provider value={{ isAuthenticated, user, role, login, loginWithPassword, logout, selectRole, switchRole, updateUser }}>{children}</AuthContext.Provider>;
};
