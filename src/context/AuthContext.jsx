import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  
  const navigate = useNavigate();

  // Initialize from localStorage
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
      if (storedRole) {
        setRole(storedRole);
      }
    }
  }, []);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    // Remove old role to force re-selection or keep it? The prompt says select role after login
    // Let's clear role on fresh login so they must choose again
    setRole(null);
    localStorage.removeItem('role');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/login');
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem('role', selectedRole);
    if (selectedRole === 'buyer') {
      navigate('/buyer/dashboard');
    } else {
      navigate('/seller/dashboard');
    }
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('role', newRole);
    if (newRole === 'buyer') {
      navigate('/buyer/dashboard');
    } else {
      navigate('/seller/dashboard');
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout, selectRole, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};
