import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../../components/UserForm";
import useFetch from "../../hooks/useFetch";

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { isLoading, error, performFetch } = useFetch("/users", () => {
    setSuccessMessage("Account created successfully!");
    setFormData({
      name: "",
      email: "",
      password: "",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  });

  const navigate = useNavigate();

  const validateField = (fieldName, value) => {
    let errorMessage = "";

    switch (fieldName) {
      case "name":
        if (!value.trim()) {
          errorMessage = "Name is required";
        }
        break;
      case "email":
        if (!value.trim() || !/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "Invalid email format";
        }
        break;
      case "password":
        if (!value.trim() || value.length < 6) {
          errorMessage = "Password must be at least 8 characters";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const validateForm = (data) => {
    const newErrors = {};
    let valid = true;

    // Validate required fields (frontend validation)
    if (!data.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!data.password.trim() || data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (validateForm(formData)) {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };

      performFetch(options);
    }
  };

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
        errorMessage={error || errorMessage}
        successMessage={successMessage}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default CreateUser;
