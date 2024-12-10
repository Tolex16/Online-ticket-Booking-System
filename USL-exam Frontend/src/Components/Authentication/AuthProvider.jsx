import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

// Function to retrieve the JWT token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Function to check if a JWT token is expired
const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch (err) {
    // Failed to decode token
    return true;
  }
};

const useIsAuthenticated = () => {
  const getTokenCallback = useCallback(() => getToken(), []);
  return useCallback(() => {
    const token = getTokenCallback();
    return token && !isTokenExpired(token);
  }, [getTokenCallback]);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  const setIsAuthenticated = (value) => {
    setIsAuthenticatedState(value);
  };

  // Initialize authentication state
  const isAuthenticated = useIsAuthenticated();
  useEffect(() => {
    setIsAuthenticated(isAuthenticated());
  }, [isAuthenticated]);

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: isAuthenticatedState, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
