import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    <AuthContext.Provider
      value={{
        userId,
        setUserId,
        isUserLoggedIn,
        setLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

