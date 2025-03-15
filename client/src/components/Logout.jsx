import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <span onClick={handleLogout} style={{ cursor: "pointer", color: "black" }}>
      Logout
    </span>
  );
};

export default Logout;
