import { createContext, useState, useContext } from "react";
import { loginPOST, logout } from "@/services/auth";
import jwt from "jsonwebtoken";

export const userCtx = createContext();
export const authCtx = createContext();

export const useUser = () => useContext(userCtx);
export const useAuth = () => useContext(authCtx);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginPOST(username, password);
      const decoded = jwt.decode(data.access);
      setUser({ username: decoded.username, id: decoded.user_id });
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
    logout();
  };

  return (
    <authCtx.Provider
      value={{
        login: handleLogin,
        logout: handleLogout,
        error,
        loading,
      }}
    >
      <userCtx.Provider value={user}>{props.children}</userCtx.Provider>
    </authCtx.Provider>
  );
};
