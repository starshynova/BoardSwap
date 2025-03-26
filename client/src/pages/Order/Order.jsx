import { Typography } from "@mui/material";
import { useUIContext } from "../../context/UIContext";

import OrderStepper from "./OrderStepper";

export const Order = () => {
  const { cart, toggleCartItem } = useUIContext();
  console.log(cart);

  return (
    <div style={{ padding: "20px 80px" }}>
      <div>
        <Typography variant="h4" gutterBottom>
          Your Order
        </Typography>
        <OrderStepper cart={cart} toggleCartItem={toggleCartItem} />
      </div>
    </div>
  );
};
