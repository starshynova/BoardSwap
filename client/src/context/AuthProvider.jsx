import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || null,
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");

    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(storedUserId);
    if (storedUserName) setUserName(storedUserName);
  }, []);

  const login = (token, user) => {
    if (user?.id && user?.name) {
      setToken(token);
      setUserId(user.id);
      setUserName(user.name);

      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name);
    } else {
      console.error("Login failed: Invalid user data.");
    }
  };

  const logout = () => {
    setToken(null);
    setUserId(null);
    setUserName(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  };

  return (
    <AuthContext.Provider value={{ token, userId, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
