import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");

    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  const login = (token, user) => {
    if (user?.id) {
      setToken(token);
      setUserId(user.id);

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user.id);
    } else {
      console.error("Login failed: Invalid user data.");
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
