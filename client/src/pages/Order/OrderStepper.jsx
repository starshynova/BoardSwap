import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Fragment, useMemo, useState } from "react";
import Grid from "@mui/material/Grid";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import ProductCard from "../../components/ProductCard";
import OrderForm from "./OrderForm";

const steps = ["Order summary", "Details", "Order Payment"];

import PropTypes from "prop-types";
import { StepLabel } from "@mui/material";

export default function OrderStepper({ cart, toggleCartItem }) {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleStep = (step) => () => setActiveStep(step);

  const handleComplete = () => {
    setCompleted((prev) => ({ ...prev, [activeStep]: true }));
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };
  const totalAmount = useMemo(() => {
    return cart.reduce((total, product) => total + product.price, 0).toFixed(2);
  }, [cart]);

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton onClick={handleStep(index)}>
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
        {allStepsCompleted() ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - your order is confirmed!
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </Fragment>
        ) : (
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
              {activeStep === 1 && <OrderForm />}
              {activeStep === 2 && <PaymentForm />}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length && !completed[activeStep] && (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? "Finish"
                    : "Complete Step"}
                </Button>
              )}
            </Box>
          </Fragment>
        )}
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
