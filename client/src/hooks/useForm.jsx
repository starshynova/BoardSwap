import { useState, useEffect, useCallback } from "react";
import useFetch from "../../src/hooks/useFetch";
import { validateField, validateForm } from "../util/validations";

const useForm = (initialData, url, onSuccess = false) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSuccess = useCallback(
    (data) => {
      if (data?.success) {
        onSuccess(data);
        setFormData(initialData);
        setSuccessMessage(data.msg || "Success!");
        setErrorMessage("");
        setErrors({});
      } else {
        setErrorMessage(data.msg || data.error || "An error occurred.");
        setFormData((prev) => ({ ...prev, password: "" }));

        if (data.errors) {
          setErrors(data.errors);
        }
      }
    },
    [onSuccess, initialData],
  );

  const { isLoading, error, response, performFetch } = useFetch(
    url,
    handleSuccess,
  );

  useEffect(() => {
    if (response) {
      handleSuccess(response);
    }
    if (error) {
      setErrorMessage(error || "An unexpected error occurred.");
    }
  }, [error, response, handleSuccess]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value, setErrors);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");
      setErrors({});

      if (validateForm(formData, setErrors)) {
        performFetch({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }
    },
    [formData, performFetch],
  );

  return {
    formData,
    errors,
    errorMessage,
    successMessage,
    isLoading,
    handleInputChange,
    handleSubmit,
    setSuccessMessage,
    setErrorMessage,
  };
};

export default useForm;
