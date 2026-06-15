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
      let parsedUser = JSON.parse(storedUser);
      setIsAuthenticated(true);
      setUser(parsedUser);
      if (storedRole) {
        setRole(storedRole);
      }
      
      // Auto-sync with backend if _id is missing
      if (!parsedUser._id) {
        fetch('http://localhost:5000/api/users/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: parsedUser.email, name: parsedUser.name, role: storedRole })
        })
        .then(res => res.json())
        .then(fullUser => {
          if (fullUser && fullUser._id) {
            setUser(fullUser);
            localStorage.setItem('user', JSON.stringify(fullUser));
          }
        })
        .catch(err => console.error('Failed to sync user', err));
      }
    }
  }, []);

  const login = (userData) => {
    // Optimistically set partial user
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    setRole(null);
    localStorage.removeItem('role');

    // Sync with backend immediately
    fetch('http://localhost:5000/api/users/sync', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userData.email, name: userData.name })
    })
    .then(res => res.json())
    .then(fullUser => {
      if (fullUser && fullUser._id) {
        setUser(fullUser);
        localStorage.setItem('user', JSON.stringify(fullUser));
      }
    })
    .catch(err => console.error('Failed to sync user on login', err));
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

  const updateUser = (updatedData) => {
    setUser(updatedData);
    localStorage.setItem('user', JSON.stringify(updatedData));
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
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout, selectRole, switchRole, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
