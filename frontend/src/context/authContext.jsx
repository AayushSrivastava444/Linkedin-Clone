import React, { useState, createContext } from 'react';

export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000";
  const [userData, setUserData] = useState(null); // added state

  const value = {
    serverUrl,
    userData,
    setUserData,
  };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;
