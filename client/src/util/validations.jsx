export const validateField = (fieldName, value, setErrors) => {
  let errorMessage = "";

  switch (fieldName) {
    case "email":
      if (!value.trim() || !/\S+@\S+\.\S+/.test(value)) {
        errorMessage = "Invalid email format";
      }
      break;
    case "password":
      if (!value.trim()) {
        errorMessage = "Password is required";
      }
      break;
    case "name":
      if (value.trim() === "") {
        errorMessage = "Name is required";
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
export const validateForm = (data, setErrors) => {
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

  if (data.name && data.name.trim() === "") {
    newErrors.name = "Name is required";
    valid = false;
  }

  setErrors(newErrors);
  return valid;
};
