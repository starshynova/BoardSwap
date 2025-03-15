import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/login" replace />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
