import React, { createContext, useState, useEffect, useContext } from "react";
import { signInWithAzureAD } from "lib/api/auth/azure";

type IAuth = {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
  };
  accessToken: string;
};

const AuthContext = createContext<IAuth>({
  isAuthenticated: false,
  user: { id: "", name: "" },
  accessToken: "",
});

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState<IAuth>();

  useEffect(() => {
    async function authenticate() {
      try {
        const _auth = await signInWithAzureAD();

        setAuth({
          isAuthenticated: true,
          user: _auth.user,
          accessToken: _auth.accessToken,
        });
      } catch (error) {
        console.error("Error in authenticate: ", error);
      }
    }
    authenticate();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
