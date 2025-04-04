import { useUIContext } from "../../context/UIContext";

import OrderStepper from "./OrderStepper";
import Heading from "../../components/Heading";

export const Order = () => {
  const { cart, toggleCartItem } = useUIContext();
  console.log(cart);

  return (
    <div style={{ padding: "20px 80px" }}>
      <div>
        <Heading>Your Order</Heading>

        <OrderStepper cart={cart} toggleCartItem={toggleCartItem} />
      </div>
    </div>
  );
};
