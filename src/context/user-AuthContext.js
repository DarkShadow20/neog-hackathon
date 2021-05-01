import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <AuthContext.Provider
      value={{
        userName,
        setUserName,
        isUserLoggedIn,
        setLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};