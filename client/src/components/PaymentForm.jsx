import { useForm, Controller } from "react-hook-form";
import { TextField, Button, Box, Typography, Card } from "@mui/material";

const PaymentForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Payment Data:", data);
    alert("Payment Submitted Successfully!");
  };

  return (
    <Card sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5, boxShadow: 3 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Payment Details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <Controller
            name="cardholderName"
            control={control}
            rules={{ required: "Cardholder name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Cardholder Name"
                variant="outlined"
                fullWidth
                error={!!errors.cardholderName}
                helperText={errors.cardholderName?.message}
              />
            )}
          />
        </Box>
        <Box mb={2}>
          <Controller
            name="cardNumber"
            control={control}
            rules={{
              required: "Card number is required",
              pattern: { value: /^[0-9]{16}$/, message: "Invalid card number" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Card Number"
                variant="outlined"
                fullWidth
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
                inputProps={{ maxLength: 16 }}
              />
            )}
          />
        </Box>
        <Box display="flex" gap={2} mb={2}>
          <Controller
            name="expiryDate"
            control={control}
            rules={{ required: "Expiration date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="MM/YY"
                variant="outlined"
                fullWidth
                error={!!errors.expiryDate}
                helperText={errors.expiryDate?.message}
                inputProps={{ maxLength: 5 }}
              />
            )}
          />
          <Controller
            name="cvv"
            control={control}
            rules={{
              required: "CVV is required",
              pattern: { value: /^[0-9]{3}$/, message: "Invalid CVV" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="CVV"
                variant="outlined"
                fullWidth
                error={!!errors.cvv}
                helperText={errors.cvv?.message}
                inputProps={{ maxLength: 3 }}
              />
            )}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Pay Now
        </Button>
      </form>
    </Card>
  );
};

export default PaymentForm;
