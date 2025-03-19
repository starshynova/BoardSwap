import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import UserForm from "../../components/UserForm";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSuccess = (data) => {
    if (data?.success && data?.token) {
      let user = null;

      try {
        const decoded = jwtDecode(data.token);
        user = { id: decoded.id };
      } catch (error) {
        console.error("Failed to decode token:", error);
      }

      if (user) {
        login(data.token, user);
        localStorage.setItem("userId", user.id);

        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 2000);
      } else {
        console.error("User ID is missing from token.");
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
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
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
    </div>
  );
};

export default Login;
