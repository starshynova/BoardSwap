import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import UserForm from "../../components/UserForm";
import { useRef, useEffect } from "react";

const CreateUser = () => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const {
    formData,
    errors,
    errorMessage,
    successMessage,
    isLoading,
    handleInputChange,
    handleSubmit,
    setErrorMessage,
  } = useForm({ name: "", email: "", password: "" }, "/users", (response) => {
    if (response?.success) {
      timeoutRef.current = setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setErrorMessage(response?.msg || "Registration failed.");
    }
  });

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
      />
    </div>
  );
};

export default CreateUser;
