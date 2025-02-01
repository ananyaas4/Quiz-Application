import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post("https://holly-elite-condor.glitch.me/login", {
        username,
        password,
      });

      if (response.data.success) {
        const userData = {
          userId: response.data.userId,
          username: response.data.username,
          token: response.data.token,
        };

        // Store user in state and localStorage
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);