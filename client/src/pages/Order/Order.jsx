import { Typography } from "@mui/material";
import { useUIContext } from "../../context/UIContext";
// import ProductCard from "../components/ProductCard";
// import PaymentForm from "../components/PaymentForm/PaymentForm";
// import HorizontalNonLinearStepper from "../components/Stepper";
import OrderStepper from "./OrderStepper";

export const Order = () => {
  const { cart, toggleCartItem } = useUIContext();

  return (
    <div style={{ padding: "20px 80px" }}>
      <div>
        <Typography variant="h4" gutterBottom>
          Checkout Process
        </Typography>
        <OrderStepper cart={cart} toggleCartItem={toggleCartItem} />
      </div>
    </div>
  );
};
