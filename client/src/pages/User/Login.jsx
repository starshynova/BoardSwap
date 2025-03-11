import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import UserForm from "../../components/UserForm";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { performFetch, error } = useFetch("/users/login", (response) => {
    if (response?.success && response?.token) {
      localStorage.setItem("authToken", response.token);
      navigate("/landing");
    } else {
      setErrorMessage(response?.msg || "Login failed. Please try again.");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (validateForm(formData)) {
      await performFetch({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (data) => {
    const newErrors = {};
    let valid = true;

    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
      setIsLoading(false);
    }
  }, [error]);

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
        setFormData={setFormData}
        errors={errors}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        isLogin={true}
      />
    </div>
  );
};

export default Login;
