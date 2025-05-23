import { useReducer, useState } from "react";
import { TextField, Button, Box, Typography, Card } from "@mui/material";
import {
  validateCardholderName,
  validateExpiryDate,
  validateCardNumber,
  validateCVV,
} from "./validators";
import PropTypes from "prop-types";
import formStyle from "../../util/formStyle";
import DialogConfirmation from "../../pages/Order/DialogConfirmation";

const initialState = {
  formData: {
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  },
  errors: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

const PaymentForm = ({ onPaymentSuccess }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { formData, errors } = state;
  const [openDialog, setOpenDialog] = useState(false);

  const handleChange = (e) => {
    dispatch({
      type: "UPDATE_FIELD",
      field: e.target.name,
      value: e.target.value,
    });
  };

  const handleCardNumberChange = (e) => {
    let cardNumber = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formattedNumber = cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    dispatch({
      type: "UPDATE_FIELD",
      field: "cardNumber",
      value: formattedNumber,
    });
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    dispatch({ type: "UPDATE_FIELD", field: "expiryDate", value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {};

    if (
      !formData.cardholderName ||
      !validateCardholderName(formData.cardholderName)
    ) {
      tempErrors.cardholderName =
        "Cardholder name must contain only letters and spaces";
    }
    if (!validateCardNumber(formData.cardNumber.replace(/\s/g, ""))) {
      tempErrors.cardNumber = "Card number must be 16 digits";
    }
    const expiryValidation = validateExpiryDate(formData.expiryDate);
    if (expiryValidation !== true) {
      tempErrors.expiryDate = expiryValidation;
    }
    if (!validateCVV(formData.cvv)) {
      tempErrors.cvv = "CVV must be 3 digits";
    }

    if (Object.keys(tempErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors: tempErrors });
      return;
    }

    dispatch({ type: "RESET_FORM" });

    onPaymentSuccess();

    setTimeout(() => {
      setOpenDialog(true);
    }, 500);
  };

  return (
    <>
      <Card sx={{ ...formStyle.boxSmall, my: "40px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Payment Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              name="cardholderName"
              label="Cardholder Name"
              variant="outlined"
              fullWidth
              value={formData.cardholderName}
              onChange={handleChange}
              error={!!errors.cardholderName}
              helperText={errors.cardholderName}
              sx={formStyle.input}
            />
          </Box>
          <Box mb={2}>
            <TextField
              name="cardNumber"
              label="Card Number"
              variant="outlined"
              fullWidth
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              inputProps={{ maxLength: 19 }}
              sx={formStyle.input}
            />
          </Box>
          <Box sx={formStyle.boxForSmallFields}>
            <TextField
              name="expiryDate"
              label="MM/YY"
              variant="outlined"
              fullWidth
              value={formData.expiryDate}
              onChange={handleExpiryDateChange}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
              inputProps={{ maxLength: 5 }}
              sx={formStyle.inputSmall}
            />
            <TextField
              name="cvv"
              label="CVV"
              variant="outlined"
              fullWidth
              type="password"
              value={formData.cvv}
              onChange={handleChange}
              error={!!errors.cvv}
              helperText={errors.cvv}
              inputProps={{ maxLength: 3 }}
              sx={formStyle.inputSmall}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={formStyle.buttonWide}
            size="large"
            fullWidth
          >
            Pay Now
          </Button>
        </form>
      </Card>
      <DialogConfirmation
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />
    </>
  );
};

PaymentForm.propTypes = {
  onPaymentSuccess: PropTypes.func.isRequired,
};

export default PaymentForm;
