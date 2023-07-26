import { createContext, useState } from "react";
import { login } from "@/services/auth/login";

export const userCtx = createContext({
  user: null,
  error: null,
  loading: false,
});

export const authCtx = createContext({
  login: () => {},
  logout: () => {},
});

export const useUser = () => useContext(authCtx);
export const useAuth = () => useContext(authCtx);

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(username, password);
      setUser(data.user);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <authCtx.Provider>
      <authCtx.Provider value={{ user, error, loading }}>
        {props.children}
      </authCtx.Provider>
    </authCtx.Provider>
  );
};
