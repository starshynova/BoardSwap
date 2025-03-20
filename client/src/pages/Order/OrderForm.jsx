import { useForm } from "react-hook-form";
import { TextField, Container, Typography, Box } from "@mui/material";
import theme from "../../components/theme";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const OrderForm = ({ setIsOrderValid, setOrderData, formRef }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [formData, setFormData] = useState(() => {
    return JSON.parse(localStorage.getItem("orderForm")) || {};
  });

  useEffect(() => {
    Object.keys(formData).forEach((key) => {
      setValue(key, formData[key], { shouldValidate: true });
    });
  }, [formData, setValue]);

  useEffect(() => {
    setIsOrderValid(isValid);
  }, [isValid, setIsOrderValid]);

  const saveOrderData = (data) => {
    console.log("Saving order data:", data);
    setOrderData(data);
    localStorage.setItem("orderForm", JSON.stringify(data));
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValue(name, value, { shouldValidate: true });
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      localStorage.setItem("orderForm", JSON.stringify(newData));
      return newData;
    });
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Order Form
      </Typography>
      <Box
        component="form"
        ref={formRef}
        onSubmit={handleSubmit(saveOrderData)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <TextField
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          sx={{ input: { color: theme.palette.text.secondary } }}
          onChange={onInputChange}
        />

        <TextField
          label="First Name"
          {...register("firstName", { required: "First name is required" })}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          fullWidth
          sx={{ input: { color: theme.palette.text.secondary } }}
          onChange={onInputChange}
        />

        <TextField
          label="Last Name"
          {...register("lastName", { required: "Last name is required" })}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
          sx={{ input: { color: theme.palette.text.secondary } }}
          onChange={onInputChange}
        />

        <TextField
          label="Address"
          {...register("address", { required: "Address is required" })}
          error={!!errors.address}
          helperText={errors.address?.message}
          fullWidth
          sx={{ input: { color: theme.palette.text.secondary } }}
          onChange={onInputChange}
        />

        <TextField
          label="Postcode"
          {...register("postcode", { required: "Postcode is required" })}
          error={!!errors.postcode}
          helperText={errors.postcode?.message}
          fullWidth
          sx={{ input: { color: theme.palette.text.secondary } }}
          onChange={onInputChange}
        />

        <TextField
          label="City"
          {...register("city", { required: "City is required" })}
          error={!!errors.city}
          helperText={errors.city?.message}
          fullWidth
          sx={{ input: { color: theme.palette.text.secondary } }}
          onChange={onInputChange}
        />
      </Box>
    </Container>
  );
};

OrderForm.propTypes = {
  setIsOrderValid: PropTypes.func.isRequired,
  setOrderData: PropTypes.func.isRequired,
  formRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

export default OrderForm;
