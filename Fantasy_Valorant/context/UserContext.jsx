import React, { createContext, useContext, useState, useEffect } from 'react';
import { loaduser } from '../services/Authservice';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user on component mount
    const fetchUser = async () => {
      const userData = await loaduser();
      setUser(userData);
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
