import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../api/axios";
import { CircularProgress } from "@mui/material";

const AuthUserContext = createContext();

export const useAuthUserContext = () => {
  return useContext(AuthUserContext);
};

export const AuthUserProvider = (props) => {
  console.log("AuthUserProvider");
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  // 認証済みかを確認する
  useEffect(() => {
    (async () => {
      await setLoading(true);
      const response = await axios
        .get("/me", { withCredentials: true })
        .catch((error) => {
          console.error(error);
        });
      if (response) {
        await setUser(response.data.user);
      }
      await setLoading(false);
    })();
  }, []);

  const login = (newUser, callback: () => void) => {
    setUser(newUser);
    callback();
  };

  const logout = (callback: () => void) => {
    setUser(null);
    callback();
  };

  // ロード画面を表示する
  if (loading) {
    return (
      <>
        <CircularProgress />
      </>
    );
  }
  const values = { user, login, logout };
  return (
    <AuthUserContext.Provider value={values}>
      {!loading && props.children}
    </AuthUserContext.Provider>
  );
};
