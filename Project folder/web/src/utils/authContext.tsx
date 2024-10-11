import React, { createContext, useContext, useEffect } from "react";
import { checkLocalStorageLoggedInStatus } from "../pages/common";
import { getCurrentUserService } from "../services";

import token from "@/utils/token";

const AuthContext = createContext(null);

export const AuthProvider = (props:any) => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loginStatus = await checkLocalStorageLoggedInStatus();
      const { status, cls, msg, payload } = await getCurrentUserService();
      if (!status) return;

      setIsLoggedIn(loginStatus);
      setCurrentUser(payload);
    };

    checkLoginStatus();
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    token.removeAll();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
