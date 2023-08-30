import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    // this shouldn't really be a 'magic string' / default value
  const [authToken, setAuthToken] = useState('mysecrettoken');
  console.log(authToken, 'authToken in AuthContext.js');

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
