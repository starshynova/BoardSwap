import {
  TextField,
  Button,
  Box,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserForm = ({
  formData,
  errors,
  isLoading,
  errorMessage,
  successMessage,
  handleSubmit,
  handleInputChange,
  isLogin = false,
}) => {
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(calculatePasswordStrength(formData.password));
    }
  }, [formData.password]);

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;
    return score;
  };

  const progressBarColors = [
    "error",
    "warning",
    "warning",
    "primary",
    "success",
  ];

  const passwordStrengthLabels = [
    "Very Weak",
    "Weak",
    "Medium",
    "Strong",
    "Very Strong",
  ];

  const getProgressBarColor = (strength) =>
    progressBarColors[strength] || "error";
  const getPasswordStrengthLabel = (strength) =>
    passwordStrengthLabels[strength] || "Very Weak";

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "350px",
        mx: "auto",
        mt: 5,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        {isLogin ? "Login to Your Account" : "Register"}
      </Typography>

      {errorMessage && (
        <Typography color="error" variant="body2" textAlign="center">
          {errorMessage}
        </Typography>
      )}

      {successMessage && !isLogin && (
        <Typography color="success" variant="body2" textAlign="center">
          {successMessage}
        </Typography>
      )}

      {!isLogin && (
        <TextField
          label="Name"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleInputChange}
          error={!!errors.name}
          helperText={errors.name}
          sx={{
            backgroundColor: "#D6F9FA",
            borderRadius: "5px",
            "& .MuiInputBase-input": {
              color: "#000000",
            },
          }}
        />
      )}

      <TextField
        label="Email"
        name="email"
        type="email"
        fullWidth
        margin="normal"
        value={formData.email}
        onChange={handleInputChange}
        error={!!errors.email}
        helperText={errors.email}
        sx={{
          backgroundColor: "#D6F9FA",
          borderRadius: "5px",
          "& .MuiInputBase-input": {
            color: "#000000",
          },
        }}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        fullWidth
        margin="normal"
        value={formData.password}
        onChange={handleInputChange}
        error={!!errors.password}
        helperText={errors.password}
        required
        sx={{
          backgroundColor: "#D6F9FA",
          borderRadius: "5px",
          "& .MuiInputBase-input": {
            color: "#000000",
          },
          "& .MuiInputLabel-asterisk": {
            color: "red",
          },
        }}
      />

      {!isLogin && formData.password && (
        <>
          <LinearProgress
            variant="determinate"
            value={passwordStrength * 25}
            color={getProgressBarColor(passwordStrength)}
            sx={{ mb: 1 }}
          />
          <Typography
            variant="body2"
            color={passwordStrength < 3 ? "error" : "success"}
            textAlign="center"
          >
            {getPasswordStrengthLabel(passwordStrength)}
          </Typography>
        </>
      )}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: "#47CAD1",
          borderRadius: "10px",
        }}
        disabled={isLoading}
      >
        {isLogin ? "Login" : "Sign Up"}
      </Button>

      <Typography variant="body2" textAlign="center" mt={2}>
        {isLogin ? "Don't have an account? " : "Do you have an account? "}
        <Link
          to={isLogin ? "/register" : "/login"}
          style={{ color: "#47CAD1" }}
        >
          {isLogin ? "Register" : "Log in"}
        </Link>
      </Typography>
    </Box>
  );
};

UserForm.propTypes = {
  formData: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  successMessage: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
};

export default UserForm;
