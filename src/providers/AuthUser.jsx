import React, { createContext, useContext, useState } from "react";

const AuthUserContext = createContext();

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider = (props) => {
  const [user, setUser] = useState(null);

  const login = (newUser, callback: () => void) => {
    setUser(newUser);
    callback();
  };

  const logout = (callback: () => void) => {
    setUser(null);
    callback();
  };

  const value = { user, login, logout };
  return (
    <AuthUserContext.Provider value={value}>
      {props.children}
    </AuthUserContext.Provider>
  );
};
