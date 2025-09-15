import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Decode token and check expiry
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);

        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser({ id: decoded.id });
          localStorage.setItem("token", token);
        }
      } catch (error) {
        console.error("Invalid token", error);
        logout();
      }
    }
  }, [token]);

  const loginUser = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginUser, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
