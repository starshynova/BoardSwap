import { useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import UserForm from "../../components/UserForm";
import { jwtDecode } from "jwt-decode";
// import { Typography } from "@mui/material";
import ExploreGamesButton from "../../components/ExploreGamesButton";
import Heading from "../../components/Heading";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [showWelcome, setShowWelcome] = useState(true);
  const [welcomeText, setWelcomeText] = useState("Welcome Back");

  useEffect(() => {
    if (location.state?.from === "/order") {
      setWelcomeText("Please login to complete your order");
    }
  }, [location.state]);

  const handleSuccess = (data) => {
    if (data?.success && data?.token) {
      let user = null;

      try {
        const decoded = jwtDecode(data.token);
        user = {
          id: decoded.id,
          name: decoded.name || "User",
        };
      } catch (error) {
        console.error("Failed to decode token:", error);
      }

      if (user) {
        login(data.token, user);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);
        setShowWelcome(false);

        setTimeout(() => {
          if (location.state?.from === "/order") {
            navigate("/order", { replace: true });
          } else {
            navigate("/", { replace: true });
          }
          window.location.reload();
        }, 2000);
      } else {
        console.error("User ID or name is missing from token.");
      }
    } else {
      console.error("Invalid login response:", data);
    }
  };

  const {
    formData,
    errors,
    errorMessage,
    successMessage,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useForm(
    { email: "", password: "" },
    "/users/login",
    handleSuccess,
    "login",
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        flexDirection: "column",
        padding: "24px",
      }}
    >
      {showWelcome && <Heading>{welcomeText}</Heading>}

      <UserForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        errorMessage={errorMessage}
        successMessage={successMessage}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLogin={true}
      />

      <div>
        <ExploreGamesButton />
      </div>
    </div>
  );
};

export default Login;
