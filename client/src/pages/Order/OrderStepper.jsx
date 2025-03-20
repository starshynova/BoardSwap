import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Fragment, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import ProductCard from "../../components/ProductCard";
import OrderForm from "./OrderForm";
import PropTypes from "prop-types";
import { Alert, Snackbar, StepLabel } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const steps = ["Order summary", "Details", "Order Payment"];

export default function OrderStepper({ cart, toggleCartItem }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isOrderValid, setIsOrderValid] = useState(false);
  const [warning, setWarning] = useState("");
  const [orderData, setOrderData] = useState(null);
  const formRef = useRef();
  const token = localStorage.getItem("authToken");
  console.log("token", token);

  if (token) {
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;
    localStorage.setItem("user_id", userId);
  }

  const handleNavigation = (step) => () => {
    if (activeStep === 1 && !isOrderValid && step > activeStep) {
      setWarning("Please fill out the order details before proceeding.");
      return;
    }

    if (activeStep === 1 && step > activeStep) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }

    setWarning("");
    setActiveStep(step);
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  }, [cart]);

  const handlePaymentSuccess = async () => {
    if (orderData) {
      console.log("Submitting Order:", orderData);
      console.log("local storage", localStorage);

      const userId = localStorage.getItem("user_id");
      const orderPayload = {
        buyer_id: userId,
        items: cart.map((item) => ({
          ...item,
        })),
        total_price: totalAmount,
        ...orderData,
      };

      console.log("Submitting Order:", orderPayload);

      try {
        const response = await fetch("/api/orders/create", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        });
        if (!response.ok) {
          throw new Error("Failed to submit order");
        }

        const result = await response.json();
        console.log("Order submitted successfully:", result);

        localStorage.removeItem("orderForm");
        setOrderData(null);
        setIsOrderValid(false);
      } catch (error) {
        console.error("Error submitting order:", error);
        alert("Failed to submit order. Please try again.");
      }
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        {warning && (
          <Snackbar
            open={warning}
            autoHideDuration={3000}
            onClose={() => setWarning(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <Alert onClose={() => setWarning(false)} severity="warning">
              Please fill out the Form before proceeding.
            </Alert>
          </Snackbar>
        )}
      </Box>

      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepButton onClick={handleNavigation(index)}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label.Mui-active": {
                    color: "black !important",
                    fontWeight: "bold !important",
                  },
                }}
              >
                {label}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        <Fragment>
          <Box sx={{ mt: 2, mb: 1, py: 1 }}>
            {activeStep === 0 && (
              <Fragment>
                <Typography variant="h6">
                  Items in cart: {cart.length}
                </Typography>
                <Typography variant="h6">
                  Total amount: €{totalAmount}
                </Typography>
                <Grid container spacing={2}>
                  {cart.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      isInCart={cart.some((item) => item._id === product._id)}
                      toggleCartItem={toggleCartItem}
                    />
                  ))}
                </Grid>
              </Fragment>
            )}
            {activeStep === 1 && (
              <OrderForm
                setIsOrderValid={setIsOrderValid}
                setOrderData={setOrderData}
                formRef={formRef}
              />
            )}
            {activeStep === 2 && (
              <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
            )}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleNavigation(activeStep - 1)}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNavigation(activeStep + 1)}
              sx={{ mr: 1 }}
              disabled={activeStep === 2}
            >
              Next
            </Button>
          </Box>
        </Fragment>
      </div>
    </Box>
  );
}

OrderStepper.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  toggleCartItem: PropTypes.func.isRequired,
};
