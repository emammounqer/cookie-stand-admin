import { createContext, useState, useContext } from "react";
import { loginPOST } from "@/services/auth";
import jwt from "jsonwebtoken";

export const userCtx = createContext();
export const authCtx = createContext();

export const useUser = () => useContext(userCtx);
export const useAuth = () => useContext(authCtx);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);
    console.log(username, password);
    try {
      const data = await loginPOST(username, password);
      setToken(data.access);
      const decoded = jwt.decode(data.access);
      console.log(decoded);
      setUser(decoded.username);
    } catch (error) {
      console.error({ error });
      setError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <authCtx.Provider
      value={{
        login: handleLogin,
        logout: handleLogout,
        error,
        loading,
        token,
      }}
    >
      <userCtx.Provider value={user}>{props.children}</userCtx.Provider>
    </authCtx.Provider>
  );
};
