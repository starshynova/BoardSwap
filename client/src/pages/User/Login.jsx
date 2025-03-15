import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import UserForm from "../../components/UserForm";

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (data) => {
    if (data?.success && data?.accessToken) {
      localStorage.setItem("authToken", data.accessToken);

      setTimeout(() => {
        navigate("/");
        window.location.reload(); // To update the navbar
      }, 2000);
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
