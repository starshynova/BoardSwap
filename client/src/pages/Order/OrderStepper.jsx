import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Grid from "@mui/material/Grid";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import ProductCard from "../../components/ProductCard";
import OrderForm from "./OrderForm";
import PropTypes from "prop-types";
import { Alert, Snackbar, StepLabel } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../context/AuthContext";
import DialogConfirmation from "./DialogConfirmation";

const steps = ["Order summary", "Details", "Order Payment"];

export default function OrderStepper({ cart, toggleCartItem }) {
  const [activeStep, setActiveStep] = useState(0);
  const [isOrderValid, setIsOrderValid] = useState(false);
  const [warning, setWarning] = useState("");
  const [orderData, setOrderData] = useState(null);
  const formRef = useRef();
  const token = localStorage.getItem("authToken");
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    if (token) {
      try {
        jwtDecode(token);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

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
    if (!orderData || !userId) return;

    if (orderData) {
      const orderPayload = {
        user_id: userId,
        items: cart.map((item) => ({
          ...item,
        })),
        total_price: parseFloat(totalAmount),
        address: orderData.address,
        city: orderData.city,
        email: orderData.email,
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        postcode: orderData.postcode,
      };

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

        for (const item of cart) {
          const itemResponse = await fetch(`/api/items/${item._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });

          if (!itemResponse.ok) {
            throw new Error(`Failed to fetch item ${item._id}`);
          }

          const fullItem = await itemResponse.json();

          const itemData = fullItem.result;

          if (
            !itemData.title ||
            !itemData.price ||
            !itemData.type ||
            !itemData.condition ||
            !itemData.seller_id
          ) {
            throw new Error(`Item ${item._id} is missing required fields`);
          }

          const updateUrl = `/api/items/${item._id}`;
          const updatePayload = { item: { ...itemData, status: "Sold" } };

          const updateResponse = await fetch(updateUrl, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatePayload),
          });

          if (!updateResponse.ok) {
            throw new Error(`Failed to update item ${item._id}`);
          }
        }
        localStorage.removeItem("orderForm");
        setOrderData(null);
        setIsOrderValid(false);
      } catch (error) {
        console.error("Error submitting order:", error);
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
              <>
                <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
                <DialogConfirmation></DialogConfirmation>
              </>
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
